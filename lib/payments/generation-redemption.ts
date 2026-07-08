/**
 * One-shot redemption of confirmed payment intents (backlog #2, step 4).
 *
 * A confirmed intent buys exactly one generation. Three markers make that
 * crash-safe (docs/PAYMENT-SECURITY-PATTERNS.md #2 — atomic conditional
 * UPDATEs, never check-then-write):
 *
 *   consumed_at  — set atomically when a generation claims the intent
 *   fulfilled_at — set when the paid image was actually delivered
 *   release      — consumed_at cleared when generation fails in-process
 *
 * If the process dies between claim and delivery (deploy, OOM, platform
 * kill), the intent is left consumed-but-unfulfilled; once the claim is
 * provably stale the next redeem re-claims it atomically, so the buyer is
 * never stranded with a paid, unusable intent.
 *
 * Requires migrations/2026-07-08-payment-intents-delta.sql.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

// A consumed-but-unfulfilled claim older than this is provably dead: the
// generate route's function budget (maxDuration 120s) has long expired.
const STALE_CLAIM_MS = 3 * 60_000;

export type RedemptionResult =
  | { ok: true; resolution: string; modelFamily: string }
  | { ok: false; status: 402 | 404 | 409 | 500; error: string };

export async function redeemGenerationIntent(
  supabase: SupabaseClient,
  { intentId, buyerWallet }: { intentId: string; buyerWallet: string },
): Promise<RedemptionResult> {
  // Atomic one-shot claim: only this buyer's confirmed, never-consumed
  // intent can flip. Anything else falls through to the diagnosis below.
  const claim = async () => {
    const now = new Date().toISOString();
    return supabase
      .from("generation_payment_intents")
      .update({ consumed_at: now, updated_at: now })
      .eq("id", intentId)
      .eq("buyer_wallet", buyerWallet)
      .eq("status", "confirmed")
      .is("consumed_at", null)
      .select("resolution, model_family")
      .maybeSingle();
  };

  const { data: claimed, error } = await claim();
  if (error) {
    console.error("[payments/redeem] claim failed:", error.message);
    return { ok: false, status: 500, error: "Failed to redeem payment intent" };
  }
  if (claimed) {
    return { ok: true, resolution: claimed.resolution, modelFamily: claimed.model_family };
  }

  // Diagnose the refusal — scoped to the same buyer, so nothing leaks about
  // other buyers' intents.
  const { data: intent } = await supabase
    .from("generation_payment_intents")
    .select("status, consumed_at, fulfilled_at")
    .eq("id", intentId)
    .eq("buyer_wallet", buyerWallet)
    .maybeSingle();
  if (!intent) {
    return { ok: false, status: 404, error: "Payment intent not found" };
  }

  if (intent.consumed_at) {
    // Delivered intents are never reusable; a fresh claim is a generation
    // still in flight. Only a provably dead claim (stale + unfulfilled —
    // the process died between claim and delivery) may be re-claimed, again
    // as a single conditional UPDATE so two rescuers can't both win.
    const stale =
      !intent.fulfilled_at &&
      new Date(intent.consumed_at).getTime() < Date.now() - STALE_CLAIM_MS;
    if (stale) {
      const now = new Date().toISOString();
      const { data: reclaimed, error: reclaimError } = await supabase
        .from("generation_payment_intents")
        .update({ consumed_at: now, updated_at: now })
        .eq("id", intentId)
        .eq("buyer_wallet", buyerWallet)
        .eq("status", "confirmed")
        .is("fulfilled_at", null)
        .lt("consumed_at", new Date(Date.now() - STALE_CLAIM_MS).toISOString())
        .select("resolution, model_family")
        .maybeSingle();
      if (reclaimError) {
        console.error("[payments/redeem] re-claim failed:", reclaimError.message);
        return { ok: false, status: 500, error: "Failed to redeem payment intent" };
      }
      if (reclaimed) {
        console.warn("[payments/redeem] rescued stale claim:", intentId);
        return { ok: true, resolution: reclaimed.resolution, modelFamily: reclaimed.model_family };
      }
    }
    return { ok: false, status: 409, error: "Payment intent already used" };
  }

  if (intent.status === "confirmed") {
    // The first claim raced a concurrent release (failed generation gave the
    // intent back between our UPDATE and this SELECT) — it is redeemable
    // right now, so try the same one-shot claim once more.
    const { data: retried, error: retryError } = await claim();
    if (retryError) {
      console.error("[payments/redeem] claim retry failed:", retryError.message);
      return { ok: false, status: 500, error: "Failed to redeem payment intent" };
    }
    if (retried) {
      return { ok: true, resolution: retried.resolution, modelFamily: retried.model_family };
    }
    return { ok: false, status: 409, error: "Payment intent already used" };
  }

  return { ok: false, status: 402, error: "Payment intent is not confirmed" };
}

/**
 * Best-effort with bounded retries, never throws: a failed generation must
 * not strand the buyer's paid intent, but a failed release must not mask the
 * original error either. If all attempts fail, the stale-claim rescue above
 * unstrands the intent after STALE_CLAIM_MS.
 */
export async function releaseGenerationIntent(
  supabase: SupabaseClient,
  intentId: string,
): Promise<void> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const { error } = await supabase
      .from("generation_payment_intents")
      .update({ consumed_at: null, updated_at: new Date().toISOString() })
      .eq("id", intentId)
      .eq("status", "confirmed")
      .not("consumed_at", "is", null)
      .is("fulfilled_at", null);
    if (!error) return;
    console.error(`[payments/redeem] release attempt ${attempt}/3 failed:`, intentId, error.message);
    if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
  }
  console.error("[payments/redeem] release exhausted retries (stale-claim rescue will unstrand):", intentId);
}

/**
 * Delivery marker, same bounded-retry contract. Without it a delivered
 * generation would look like a dead claim after STALE_CLAIM_MS and the
 * stale-claim rescue would hand out a second image for one payment — the
 * retries make that window practically unreachable.
 */
export async function fulfillGenerationIntent(
  supabase: SupabaseClient,
  intentId: string,
): Promise<void> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const now = new Date().toISOString();
    const { error } = await supabase
      .from("generation_payment_intents")
      .update({ fulfilled_at: now, updated_at: now })
      .eq("id", intentId)
      .is("fulfilled_at", null);
    if (!error) return;
    console.error(`[payments/redeem] fulfill attempt ${attempt}/3 failed:`, intentId, error.message);
    if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
  }
  console.error("[payments/redeem] fulfill exhausted retries (intent may be double-redeemable after stale window):", intentId);
}
