/**
 * The books for the payout-account setup cost Enki fronts for artists.
 *
 * Append-only (migrations/2026-08-07-artist-cost-ledger.sql): a fronting entry
 * when we pay to create an artist's token account, a recovery entry for each
 * instalment taken out of their revenue shares, and the balance derived from
 * both. Nothing is ever updated, so the history is the balance rather than a
 * story about it.
 *
 * The two ways this could quietly wrong an artist are duplicate entries, and
 * both are refused by a unique index rather than by care here: one fronting
 * per payout account, one recovery per intent. A duplicate insert comes back
 * as 23505 and is reported as `false` — already on the books, nothing to do.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

const TABLE = "artist_cost_ledger";

/** Postgres unique_violation. The signal that an entry is already recorded. */
const UNIQUE_VIOLATION = "23505";

/**
 * Rent-exempt deposit for a 165-byte SPL token account: 2,039,280 lamports,
 * measured 2026-08-06. Constant rather than an RPC round trip in the
 * authorise path, because it changes only if the cluster's rent parameters
 * do. recordFronted still takes the lamports as an argument, so the day a
 * caller can report what it actually paid, the ledger records that instead of
 * this.
 */
export const ATA_RENT_LAMPORTS = 2_039_280;

/** One artist payout account: an ATA is (owner, mint), and so is this debt. */
export interface PayoutAccount {
  /** Case-exact base58 — see exactWallet(); a lowercased address is a different account. */
  artistWallet: string;
  mint: string;
}

/**
 * How much of the fronted cost is still to recover, in micro-USDC.
 *
 * Zero when nothing was ever fronted. Can come back NEGATIVE when two sales
 * settled against the same balance at once; that is a debt owed back to the
 * artist and is deliberately not clamped here, so it stays visible to whoever
 * reads it. splitForRecovery() treats it as zero.
 *
 * A failed read returns 0 rather than throwing: the caller is in the middle of
 * authorising a payment, and the choice is between Enki forgoing $0.15 and an
 * artist's sale failing outright over a bookkeeping query.
 */
export async function outstandingMicro(
  supabase: SupabaseClient,
  { artistWallet, mint }: PayoutAccount,
): Promise<number> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("entry, micro")
    .eq("artist_wallet", artistWallet)
    .eq("mint", mint);

  if (error) {
    console.error("[payments/fronted] could not read the ledger:", error.message);
    return 0;
  }

  return (data ?? []).reduce(
    (sum, row) => sum + (row.entry === "fronted" ? Number(row.micro) : -Number(row.micro)),
    0,
  );
}

/**
 * Put the setup cost on an artist's books. Returns false when it was already
 * there — the cost is one time per payout account, and a re-created token
 * account is Enki's to absorb, not theirs to pay twice.
 *
 * Call this only once the account creation is actually paid for, i.e. after
 * the transaction that carries it is broadcast. A fronting recorded for a
 * payment that was later voided would charge an artist for an account that
 * was never created.
 */
export async function recordFronted(
  supabase: SupabaseClient,
  {
    artistWallet,
    mint,
    micro,
    lamports,
    intentId,
  }: PayoutAccount & { micro: number; lamports: number; intentId: string },
): Promise<boolean> {
  const { error } = await supabase.from(TABLE).insert({
    artist_wallet: artistWallet,
    mint,
    entry: "fronted",
    micro,
    lamports,
    intent_id: intentId,
  });

  if (error) {
    if (error.code === UNIQUE_VIOLATION) return false;
    console.error("[payments/fronted] could not record the fronted cost:", error.message);
    return false;
  }
  return true;
}

/**
 * Record one instalment, after the payment carrying it has been broadcast.
 *
 * Returns false when this intent's instalment is already on the books: the
 * post-capture write is retryable, and a retry must not deduct twice from a
 * share that only moved once. The unique index is what decides that, not the
 * caller's memory of whether it already ran.
 *
 * The amount is whatever splitForRecovery() returned when the transaction was
 * built — never recomputed here. The money has already moved; the ledger's job
 * is to record what happened, including an over-recovery, not to correct it.
 */
export async function recordRecovery(
  supabase: SupabaseClient,
  {
    artistWallet,
    mint,
    micro,
    intentId,
  }: PayoutAccount & { micro: number; intentId: string },
): Promise<boolean> {
  const { error } = await supabase.from(TABLE).insert({
    artist_wallet: artistWallet,
    mint,
    entry: "recovered",
    micro,
    intent_id: intentId,
  });

  if (error) {
    if (error.code === UNIQUE_VIOLATION) return false;
    // Loud: the artist's share was already reduced on chain, so a lost entry
    // means they are owed money the books no longer know about.
    console.error("[payments/fronted] RECOVERY TAKEN BUT NOT RECORDED:", intentId, error.message);
    return false;
  }
  return true;
}
