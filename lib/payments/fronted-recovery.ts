/**
 * Deducting the fronted payout-account cost from an artist's revenue share.
 *
 * Terms of Use, Section 7: "A one time network setup cost for the payout
 * account (currently about $0.15; it varies with network conditions) is
 * deducted in halves from an artist's first revenue shares until covered."
 *
 * Pure on purpose. The split has to be decided BEFORE the transaction is
 * built — the amounts are baked into the instructions the buyer signs — so it
 * must be a function of two numbers and nothing else: no clock, no client, no
 * database round trip inside the decision.
 *
 * ── Why half, and never more ────────────────────────────────────────────
 * An artist whose first sale paid out nothing at all would reasonably decide
 * the payouts are broken, and would be right to. Capping the deduction at
 * half means every sale pays something from the very first one, while
 * ~$0.15 still clears within a handful of sales.
 *
 * ── Why the buyer is untouched ──────────────────────────────────────────
 * This only ever moves money BETWEEN the legs of a payment: the artist's leg
 * shrinks by toRecovery and Enki's grows by the same amount, so the total the
 * buyer signed for is unchanged. The landing page states it plainly — the
 * cost is taken "from your first sales until covered, never from buyers" —
 * and any caller that raises the total instead has broken that promise.
 */

/** One artist revenue share, divided. All amounts are integer micro-USDC. */
export interface ShareSplit {
  /** Paid to the artist on chain. Never less than half of the share. */
  toArtist: number;
  /** Withheld against the fronted cost. Never more than half of the share. */
  toRecovery: number;
  /** What is still recoverable afterwards. Never negative. */
  newRemaining: number;
}

function assertMicro(name: string, value: unknown): asserts value is number {
  if (typeof value !== "number" || !Number.isSafeInteger(value)) {
    throw new Error(`${name} must be an integer number of micro-USDC, got: ${value}`);
  }
}

/**
 * Split one revenue share into the artist's part and the recovered part.
 *
 * Deducts half of the share, or the whole of what is left to recover if that
 * is smaller — so the last instalment takes only the remainder and never
 * overshoots into money we were never owed.
 */
export function splitForRecovery(frontedRemaining: number, shareMicro: number): ShareSplit {
  assertMicro("frontedRemaining", frontedRemaining);
  assertMicro("shareMicro", shareMicro);
  if (shareMicro < 0) {
    throw new Error(`shareMicro must not be negative, got: ${shareMicro}`);
  }

  // The ledger can legitimately read back over-recovered: two sales authorised
  // at the same moment both plan against the same balance. Clamping keeps that
  // our problem — the artist is simply paid in full — while the negative
  // balance stays in the ledger where it can be seen and paid back.
  const remaining = Math.max(0, frontedRemaining);

  // floor(), so the odd micro of an odd share goes to the ARTIST. That is what
  // makes "never more than half" true of integers and not merely of arithmetic.
  const toRecovery = Math.min(remaining, Math.floor(shareMicro / 2));

  return {
    toArtist: shareMicro - toRecovery,
    toRecovery,
    newRemaining: remaining - toRecovery,
  };
}
