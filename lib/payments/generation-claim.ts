/**
 * The ONE place a generation may claim a payment intent.
 *
 * Two payment models exist in this codebase and both can move money:
 *
 *   prepaid     status 'confirmed'  — the transfer already settled on chain
 *                                     before the image was made. Claiming it
 *                                     is all there is to do; failure means
 *                                     giving the claim back.
 *   authorized  status 'generating' — a signed but unbroadcast transaction is
 *                                     held. Nothing has moved. It is captured
 *                                     after the image is stored, or voided.
 *
 * They are routed through a single function on purpose. Two independent claim
 * paths against one row is exactly how a double charge happens: each would be
 * individually correct and together they would broadcast a held transaction
 * for an intent whose funds had already settled.
 *
 * The modes are mutually exclusive by status, and an intent carrying the
 * markers of both is REFUSED rather than resolved. Guessing which one it is
 * would be guessing whether to charge again.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { redeemGenerationIntent } from "@/lib/payments/generation-redemption";

const TABLE = "generation_payment_intents";

export type ClaimMode = "prepaid" | "authorized";

export type ClaimResult =
  | { ok: true; mode: ClaimMode; resolution: string; modelFamily: string }
  | { ok: false; status: 402 | 404 | 409 | 500; error: string };

interface ModeRow {
  status: string | null;
  authorized_at: string | null;
  captured_at: string | null;
  voided_at: string | null;
}

/**
 * Which model this row is in, or null when it is neither or — dangerously —
 * both. Exported because this single decision is what stands between one
 * charge and two.
 */
export function modeOf(row: ModeRow): ClaimMode | "ambiguous" | null {
  const looksAuthorized = Boolean(row.authorized_at);
  const looksPrepaid = row.status === "confirmed";
  if (looksAuthorized && looksPrepaid) return "ambiguous";
  if (looksAuthorized) return "authorized";
  if (looksPrepaid) return "prepaid";
  return null;
}

export async function claimForGeneration(
  supabase: SupabaseClient,
  { intentId, buyerWallet }: { intentId: string; buyerWallet: string },
): Promise<ClaimResult> {
  const { data: row, error } = await supabase
    .from(TABLE)
    .select("status, authorized_at, captured_at, voided_at")
    .eq("id", intentId)
    .eq("buyer_wallet", buyerWallet)
    .maybeSingle();

  if (error) {
    console.error("[payments/claim] lookup failed:", error.message);
    return { ok: false, status: 500, error: "Failed to claim payment intent" };
  }
  if (!row) return { ok: false, status: 404, error: "Payment intent not found" };

  const mode = modeOf(row as ModeRow);

  if (mode === "ambiguous") {
    // Settled funds AND a held signature on one row. Whichever way we read it,
    // one of the two gets charged a second time. Refuse and let a human look.
    console.error("[payments/claim] intent is both confirmed and authorised:", intentId);
    return { ok: false, status: 409, error: "Payment intent is in an inconsistent state" };
  }

  // Prepaid keeps its own well-tested one-shot claim, including the stale-claim
  // rescue for a process that died between claiming and delivering.
  if (mode === "prepaid") {
    const redeemed = await redeemGenerationIntent(supabase, { intentId, buyerWallet });
    return redeemed.ok ? { ...redeemed, mode: "prepaid" } : redeemed;
  }

  if (mode !== "authorized") {
    return { ok: false, status: 402, error: "Payment intent is not ready" };
  }

  // Terminal states first, so the refusal says something true rather than
  // falling through to the generic "already used".
  if ((row as ModeRow).captured_at) {
    return { ok: false, status: 409, error: "Payment intent already used" };
  }
  if ((row as ModeRow).voided_at) {
    return { ok: false, status: 409, error: "Payment intent was cancelled" };
  }

  // One-shot claim, same shape as the prepaid path: consumed_at is the
  // in-flight marker and only an unclaimed row can flip it, so two concurrent
  // requests cannot both start generating against one signature.
  const now = new Date().toISOString();
  const { data: claimed, error: claimError } = await supabase
    .from(TABLE)
    .update({ consumed_at: now, updated_at: now })
    .eq("id", intentId)
    .eq("buyer_wallet", buyerWallet)
    .not("authorized_at", "is", null)
    .is("captured_at", null)
    .is("voided_at", null)
    .is("consumed_at", null)
    .select("resolution, model_family")
    .maybeSingle();

  if (claimError) {
    console.error("[payments/claim] authorised claim failed:", claimError.message);
    return { ok: false, status: 500, error: "Failed to claim payment intent" };
  }
  if (!claimed) {
    return { ok: false, status: 409, error: "Payment intent already used" };
  }

  return {
    ok: true,
    mode: "authorized",
    resolution: claimed.resolution as string,
    modelFamily: claimed.model_family as string,
  };
}
