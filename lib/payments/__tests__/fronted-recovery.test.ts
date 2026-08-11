/**
 * The promise in Terms of Use Section 7, pinned as arithmetic.
 *
 * Three things must hold for every share this function ever sees, and the
 * rest of the file is boundaries around them:
 *   - nothing is created or destroyed: toArtist + toRecovery === share
 *   - the artist always gets at least half, so no sale ever pays out nothing
 *   - one deduction never exceeds one instalment — Kev, 2026-08-07: the cost
 *     is spread over RECOVERY_INSTALMENTS payouts, and an instalment is a
 *     quarter of what was FRONTED, not of what remains. A quarter of the
 *     remainder is Zeno's staircase and never arrives.
 *
 * The half rule is why floor() and not round() or ceil(): on an odd share the
 * spare micro has to fall to the artist, and a version that rounds the other
 * way passes every "about half" assertion while breaking the promise.
 */
import { describe, expect, it } from "vitest";
import { splitForRecovery, RECOVERY_INSTALMENTS } from "@/lib/payments/fronted-recovery";

/** ~$0.15 at the rate the Terms quote, in micro-USDC. */
const FRONTED = 150_000;
/** One instalment of it: ceil(150_000 / 4). */
const INSTALMENT = Math.ceil(FRONTED / RECOVERY_INSTALMENTS);

describe("splitForRecovery", () => {
  it("takes one instalment, not half, when the share is large", () => {
    // Half of 100_000 would be 50_000; the instalment (37_500) is smaller and
    // wins. This is the line Kev moved on 2026-08-07 — a big first sale no
    // longer carries a third of the debt in one go.
    expect(splitForRecovery(FRONTED, 100_000, FRONTED)).toEqual({
      toArtist: 62_500,
      toRecovery: 37_500,
      newRemaining: 112_500,
    });
  });

  it("takes half, not the instalment, when the share is small", () => {
    // Half of 20_000 is 10_000, below the 37_500 instalment. The cap that
    // guarantees every sale pays out something still binds first.
    expect(splitForRecovery(FRONTED, 20_000, FRONTED)).toEqual({
      toArtist: 10_000,
      toRecovery: 10_000,
      newRemaining: 140_000,
    });
  });

  it("computes the instalment from the ORIGINAL amount, not the remainder", () => {
    // The Zeno trap: were the instalment ceil(remaining / 4), it would shrink
    // every sale and the debt would never clear. With 112_500 left of the
    // original 150_000, the deduction must still be the full 37_500.
    const split = splitForRecovery(112_500, 100_000, FRONTED);
    expect(split.toRecovery).toBe(INSTALMENT);
    expect(split.newRemaining).toBe(75_000);
  });

  it("takes only the remainder on the last instalment, never the full one", () => {
    // 10_000 left; instalment and half-share are both larger. Taking either
    // would recover money we were never owed.
    expect(splitForRecovery(10_000, 100_000, FRONTED)).toEqual({
      toArtist: 90_000,
      toRecovery: 10_000,
      newRemaining: 0,
    });
  });

  it("pays a covered artist in full", () => {
    expect(splitForRecovery(0, 100_000, FRONTED)).toEqual({
      toArtist: 100_000,
      toRecovery: 0,
      newRemaining: 0,
    });
  });

  it("has nothing to split when the share is zero", () => {
    expect(splitForRecovery(FRONTED, 0, FRONTED)).toEqual({
      toArtist: 0,
      toRecovery: 0,
      newRemaining: FRONTED,
    });
  });

  it("gives the odd micro of an odd share to the artist", () => {
    expect(splitForRecovery(FRONTED, 3, FRONTED)).toEqual({
      toArtist: 2,
      toRecovery: 1,
      newRemaining: 149_999,
    });
    // One micro is not divisible: the artist keeps it and we recover nothing.
    expect(splitForRecovery(FRONTED, 1, FRONTED)).toEqual({
      toArtist: 1,
      toRecovery: 0,
      newRemaining: FRONTED,
    });
  });

  it("clears $0.15 in exactly four large sales and then stops deducting", () => {
    // The whole promise end to end: four instalments, then untouched payouts.
    let remaining = FRONTED;
    const deducted: number[] = [];
    for (let sale = 0; sale < 5; sale++) {
      const split = splitForRecovery(remaining, 100_000, FRONTED);
      deducted.push(split.toRecovery);
      remaining = split.newRemaining;
    }
    expect(deducted).toEqual([37_500, 37_500, 37_500, 37_500, 0]);
    expect(remaining).toBe(0);
  });

  it("covers the whole cost in four instalments even when it does not divide evenly", () => {
    // 150_001 / 4 = 37_500.25 → ceil to 37_501. With floor(), the fourth
    // instalment would leave a micro behind and "four payments" would be five.
    let remaining = 150_001;
    for (let sale = 0; sale < RECOVERY_INSTALMENTS; sale++) {
      remaining = splitForRecovery(remaining, 1_000_000, 150_001).newRemaining;
    }
    expect(remaining).toBe(0);
  });

  it("never pays less than half and never exceeds instalment or balance, for any inputs", () => {
    const shares = [0, 1, 2, 3, 7, 999, 1_000, 100_001, 5_000_000];
    const balances = [0, 1, 2, 149, 150_000, 9_999_999];
    for (const share of shares) {
      for (const balance of balances) {
        const { toArtist, toRecovery, newRemaining } = splitForRecovery(balance, share, FRONTED);
        expect(toArtist + toRecovery).toBe(share);
        expect(toArtist).toBeGreaterThanOrEqual(share / 2);
        expect(toRecovery).toBeLessThanOrEqual(share / 2);
        expect(toRecovery).toBeLessThanOrEqual(INSTALMENT);
        expect(toRecovery).toBeLessThanOrEqual(Math.max(0, balance));
        expect(newRemaining).toBe(Math.max(0, balance) - toRecovery);
        expect(newRemaining).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("pays in full against an over-recovered balance instead of paying extra", () => {
    // Two sales settling at once can take more than we fronted. The artist is
    // owed that back, but it must not turn into a bigger payout leg here —
    // the buyer signed for a fixed total, and inflating the artist's leg would
    // break the split invariant paymentLegs() enforces.
    expect(splitForRecovery(-25_000, 100_000, FRONTED)).toEqual({
      toArtist: 100_000,
      toRecovery: 0,
      newRemaining: 0,
    });
  });

  it("refuses amounts that are not whole micro-USDC", () => {
    expect(() => splitForRecovery(FRONTED, 100_000.5, FRONTED)).toThrow(/integer/);
    expect(() => splitForRecovery(1.5, 100_000, FRONTED)).toThrow(/integer/);
    expect(() => splitForRecovery(FRONTED, Number.NaN, FRONTED)).toThrow(/integer/);
    expect(() => splitForRecovery(FRONTED, Number.MAX_SAFE_INTEGER + 1, FRONTED)).toThrow(/integer/);
    expect(() => splitForRecovery(FRONTED, -1, FRONTED)).toThrow(/negative/);
    expect(() => splitForRecovery(FRONTED, 100_000, 0.5 as number)).toThrow(/integer/);
  });
});
