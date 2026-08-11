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
 * ── Four instalments, capped at half ────────────────────────────────────
 * Kev, 2026-08-07: spread it over four payouts so no single one carries much
 * weight. An instalment is therefore a quarter of what was FRONTED, not a
 * quarter of what remains — a quarter of the remainder is Zeno's staircase
 * and never arrives.
 *
 * The half-of-the-share cap stays on top of it. An artist whose first sale
 * paid out nothing at all would reasonably decide the payouts are broken, and
 * would be right to. Whichever is smaller wins, so a large share clears the
 * cost in exactly four and a small one simply takes longer — it never takes
 * more than half of anything.
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

/** Kev, 2026-08-07: spread the fronted cost over this many payouts. */
export const RECOVERY_INSTALMENTS = 4;

/**
 * Split one revenue share into the artist's part and the recovered part.
 *
 * Takes the smallest of: one instalment, half the share, and whatever is left
 * to recover. The last of those is what stops the final instalment
 * overshooting into money we were never owed.
 *
 * `frontedTotal` is the ORIGINAL amount and is REQUIRED, not defaulted to the
 * remainder. Defaulting it recomputes the instalment from what is left every
 * time, which is Zeno's staircase: 62500, 71875, 78906, 84179 … approaching
 * the debt and never reaching it. A caller that forgets the argument should
 * fail to compile, not quietly deduct forever.
 */
export function splitForRecovery(
  frontedRemaining: number,
  shareMicro: number,
  frontedTotal: number,
): ShareSplit {
  assertMicro("frontedRemaining", frontedRemaining);
  assertMicro("shareMicro", shareMicro);
  assertMicro("frontedTotal", frontedTotal);
  if (shareMicro < 0) {
    throw new Error(`shareMicro must not be negative, got: ${shareMicro}`);
  }

  // The ledger can legitimately read back over-recovered: two sales authorised
  // at the same moment both plan against the same balance. Clamping keeps that
  // our problem — the artist is simply paid in full — while the negative
  // balance stays in the ledger where it can be seen and paid back.
  const remaining = Math.max(0, frontedRemaining);

  // ceil(), so four instalments cover the whole cost. floor() would leave a
  // few micro behind and turn "four payments" into five.
  const instalment = Math.ceil(Math.max(0, frontedTotal) / RECOVERY_INSTALMENTS);

  // floor(), so the odd micro of an odd share goes to the ARTIST. That is what
  // makes "never more than half" true of integers and not merely of arithmetic.
  const toRecovery = Math.min(remaining, instalment, Math.floor(shareMicro / 2));

  return {
    toArtist: shareMicro - toRecovery,
    toRecovery,
    newRemaining: remaining - toRecovery,
  };
}
