/**
 * The life of one generation authorisation.
 *
 * Kev, 2026-08-06: "once the image goes through, we will receive the money.
 * otherwise it will be sent back." Taken literally that rules out a refund
 * worker, because a refund presupposes a charge that should not have happened.
 * So nothing is charged until the image exists.
 *
 * The buyer signs a Solana transfer built on a durable nonce and we hold it
 * unbroadcast. That signature is an authorisation, not a payment, and it ends
 * exactly one of two ways:
 *
 *   capture  we broadcast it        the image was delivered
 *   void     we advance the nonce   nothing was, or ever will be, charged
 *
 * Both are claimed with a conditional UPDATE that demands the other be unset,
 * so a race has a loser rather than two winners. Broadcasting AND flushing the
 * same nonce is the one outcome this file exists to make impossible.
 *
 * ── The abort condition ─────────────────────────────────────────────────
 * The authorisation dies at the first terminal state that is not delivery.
 * There is deliberately no deadline on the order: a durable nonce does not
 * expire, and inventing an expiry for it would kill slow-but-legitimate
 * generations while leaving finished ones armed.
 *
 * What replaces it is a heartbeat. The running job says "still here" every
 * HEARTBEAT_INTERVAL_MS; an authorisation whose job has gone quiet for
 * HEARTBEAT_GRACE_MS is abandoned and gets voided by whoever notices. This is
 * state-driven in the way a deadline is not: the clock measures SILENCE, never
 * elapsed work, so a generation may take as long as it takes.
 *
 * And silence really is proof of death here rather than a guess — past the
 * route's maxDuration the platform has already killed the process. The grace
 * is three missed beats, not a guessed duration.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { encryptString, decryptString } from "@/lib/crypto";

const TABLE = "generation_payment_intents";

/** How often a running generation renews its claim. */
export const HEARTBEAT_INTERVAL_MS = 15_000;

/**
 * Three missed beats. Below that a GC pause or a slow DB write could void a
 * live job out from under itself; far above it, an orphaned authorisation
 * lingers for no reason. It is a liveness threshold, not a business rule —
 * nothing about the product changes if it moves.
 */
export const HEARTBEAT_GRACE_MS = 3 * HEARTBEAT_INTERVAL_MS;

export type VoidReason =
  | "provider_failed"
  | "rejected"
  | "cancelled"
  | "abandoned"
  | "expired";

export interface HeldAuthorization {
  intentId: string;
  /** The signed, unbroadcast transaction, base64. */
  signedTx: string;
  nonceAccount: string | null;
  totalMicro: number;
}

/** Bind the ciphertext to its row: a signed tx copied into another intent will not open. */
const aadFor = (intentId: string) => `intent:${intentId}`;

const nowIso = () => new Date().toISOString();
const staleCutoff = () => new Date(Date.now() - HEARTBEAT_GRACE_MS).toISOString();

/**
 * Record the buyer's signature and start beating in one write.
 *
 * heartbeat_at is set together with authorized_at on purpose: an authorised
 * row that never beat once would be invisible to a sweeper keyed on the
 * heartbeat, and a signature nobody is working on is exactly the thing that
 * must not survive.
 */
export async function storeAuthorization(
  supabase: SupabaseClient,
  {
    intentId,
    buyerWallet,
    signedTx,
    nonceAccount,
    nonceAuthority,
  }: {
    intentId: string;
    buyerWallet: string;
    signedTx: string;
    nonceAccount: string;
    nonceAuthority: string;
  },
): Promise<boolean> {
  const sealed = encryptString(signedTx, aadFor(intentId));
  const now = nowIso();

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      authorized_at: now,
      heartbeat_at: now,
      nonce_account: nonceAccount,
      nonce_authority: nonceAuthority,
      authorized_tx_ct: sealed.encrypted,
      authorized_tx_iv: sealed.iv,
      authorized_tx_tag: sealed.authTag,
      authorized_tx_kid: sealed.kid ?? "field-v1",
      status: "generating",
      updated_at: now,
    })
    .eq("id", intentId)
    .eq("buyer_wallet", buyerWallet)
    // Only a fresh quote may be authorised. Re-signing something already
    // captured or voided must not resurrect it.
    .is("authorized_at", null)
    .is("captured_at", null)
    .is("voided_at", null)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[payments/auth] could not store the authorisation:", error.message);
    return false;
  }
  return Boolean(data);
}

/**
 * Renew the claim. Returns false when the row is no longer ours to work on —
 * swept as abandoned, cancelled, or already terminal.
 *
 * A false here means STOP: something else has taken the decision, and carrying
 * on would produce an image against an authorisation that has been flushed.
 */
export async function beat(supabase: SupabaseClient, intentId: string): Promise<boolean> {
  const now = nowIso();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ heartbeat_at: now, updated_at: now })
    .eq("id", intentId)
    .not("authorized_at", "is", null)
    .is("captured_at", null)
    .is("voided_at", null)
    .select("id")
    .maybeSingle();

  if (error) {
    // A dropped beat is not proof of anything — the grace covers two more.
    console.warn("[payments/auth] heartbeat failed:", error.message);
    return true;
  }
  return Boolean(data);
}

/**
 * Beat in the background for the length of a generation.
 *
 * `lost()` goes true the moment a beat is refused, which the caller should
 * check before delivering: past that point the authorisation is gone.
 */
export function startHeartbeat(
  supabase: SupabaseClient,
  intentId: string,
): { stop: () => void; lost: () => boolean } {
  let lost = false;
  const timer = setInterval(() => {
    void beat(supabase, intentId).then((ok) => {
      if (!ok) lost = true;
    });
  }, HEARTBEAT_INTERVAL_MS);
  // Never hold the process open for a heartbeat.
  if (typeof timer.unref === "function") timer.unref();

  return {
    stop: () => clearInterval(timer),
    lost: () => lost,
  };
}

/**
 * Claim the right to broadcast, and get the transaction to broadcast.
 *
 * null means we lost: something voided this authorisation first, and the nonce
 * it was built on is already spent. Broadcasting anyway would fail on-chain,
 * but the caller must not even try — a null here is the signal that the image
 * has to be handed over unpaid, which is the correct way for this to fail.
 *
 * Order matters at the call site: capture AFTER the image is durably stored.
 * The window between the two is one round-trip either way, and it should point
 * at losing our fee rather than losing the buyer's image.
 */
export async function captureAuthorization(
  supabase: SupabaseClient,
  intentId: string,
): Promise<HeldAuthorization | null> {
  const now = nowIso();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ captured_at: now, status: "captured", updated_at: now })
    .eq("id", intentId)
    .not("authorized_at", "is", null)
    .is("captured_at", null)
    .is("voided_at", null)
    .select("id, authorized_tx_ct, authorized_tx_iv, authorized_tx_tag, authorized_tx_kid, nonce_account, total_micro")
    .maybeSingle();

  if (error) {
    console.error("[payments/auth] capture failed:", error.message);
    return null;
  }
  if (!data) return null;

  return {
    intentId,
    signedTx: decryptString(
      {
        encrypted: data.authorized_tx_ct,
        iv: data.authorized_tx_iv,
        authTag: data.authorized_tx_tag,
        kid: data.authorized_tx_kid,
      },
      aadFor(intentId),
    ),
    nonceAccount: data.nonce_account,
    totalMicro: Number(data.total_micro),
  };
}

/**
 * Claim the right to flush the nonce, and get the nonce to flush.
 *
 * null means we lost — capture got there first, which can only happen if the
 * image was delivered. Nothing to undo.
 *
 * The DB write comes first and the on-chain advance second: a flushed nonce
 * with an unflushed row would let the sweeper try again forever, whereas a
 * flushed row with a live nonce is caught by the sweep. Both orders leak
 * something; only this one leaks a retry.
 */
export async function voidAuthorization(
  supabase: SupabaseClient,
  intentId: string,
  reason: VoidReason,
): Promise<{ intentId: string; nonceAccount: string | null } | null> {
  const now = nowIso();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ voided_at: now, void_reason: reason, status: "voided", updated_at: now })
    .eq("id", intentId)
    .not("authorized_at", "is", null)
    .is("captured_at", null)
    .is("voided_at", null)
    .select("id, nonce_account")
    .maybeSingle();

  if (error) {
    console.error("[payments/auth] void failed:", error.message);
    return null;
  }
  if (!data) return null;
  return { intentId, nonceAccount: data.nonce_account };
}

/**
 * Void a row ONLY IF it is still stale at the moment of the write.
 *
 * sweepAbandoned picks its victims with a heartbeat cutoff and then had to
 * kill them through voidAuthorization, whose WHERE knows nothing about
 * heartbeats. So a worker that beat successfully between the SELECT and the
 * UPDATE was killed anyway — exactly the race the sweep's own comment claimed
 * per-row voiding prevented. The predicate is repeated here verbatim, OR
 * branch included, so selection and execution agree; a NULL heartbeat does not
 * satisfy `lt`, which is why the second branch cannot be dropped.
 *
 * voidAuthorization stays heartbeat-blind on purpose: an explicit void
 * (provider failed, buyer cancelled) is a decision, not an observation, and
 * must not be second-guessed by a timestamp.
 */
async function voidIfStale(
  supabase: SupabaseClient,
  intentId: string,
  cutoff: string,
): Promise<{ intentId: string; nonceAccount: string | null } | null> {
  const now = nowIso();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ voided_at: now, void_reason: "abandoned" as VoidReason, status: "voided", updated_at: now })
    .eq("id", intentId)
    .not("authorized_at", "is", null)
    .is("captured_at", null)
    .is("voided_at", null)
    .or(`heartbeat_at.lt.${cutoff},and(heartbeat_at.is.null,authorized_at.lt.${cutoff})`)
    .select("id, nonce_account")
    .maybeSingle();

  if (error) {
    console.error("[payments/auth] stale void failed:", error.message);
    return null;
  }
  if (!data) return null;
  return { intentId, nonceAccount: data.nonce_account as string | null };
}

/**
 * Void every authorisation whose worker went quiet.
 *
 * Opportunistic, not scheduled: there is no cron on this deployment, so each
 * new generation sweeps a handful first — the same pattern generation_slots
 * uses. Under load that runs constantly; with no traffic there is also nobody
 * whose nonce could be misused.
 *
 * Each row is voided through voidIfStale rather than in one bulk UPDATE, so a
 * worker that woke up between the SELECT and the write keeps its claim. That
 * sentence used to name voidAuthorization and was simply false: its WHERE
 * carried no heartbeat condition, so the recheck it promised never happened.
 */
export async function sweepAbandoned(
  supabase: SupabaseClient,
  limit = 20,
): Promise<{ intentId: string; nonceAccount: string | null }[]> {
  const cutoff = staleCutoff();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id")
    .not("authorized_at", "is", null)
    .is("captured_at", null)
    .is("voided_at", null)
    // The null branch is defence in depth: storeAuthorization always writes a
    // first beat, so a null heartbeat on an authorised row is a bug, and this
    // makes the bug self-clearing instead of permanent.
    .or(`heartbeat_at.lt.${cutoff},and(heartbeat_at.is.null,authorized_at.lt.${cutoff})`)
    .limit(limit);

  if (error) {
    console.warn("[payments/auth] sweep failed:", error.message);
    return [];
  }

  const flushed: { intentId: string; nonceAccount: string | null }[] = [];
  for (const row of data ?? []) {
    // Re-checked at write time against the same cutoff the SELECT used, so a
    // beat that landed in between saves the row.
    const won = await voidIfStale(supabase, row.id as string, cutoff);
    if (won) flushed.push(won);
  }
  return flushed;
}
