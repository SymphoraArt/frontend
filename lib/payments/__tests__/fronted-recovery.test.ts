/**
 * The promise in Terms of Use Section 7, pinned as arithmetic.
 *
 * Two things must hold for every share this function ever sees, and the rest
 * of the file is boundaries around them:
 *   - nothing is created or destroyed: toArtist + toRecovery === share
 *   - the artist always gets at least half, so no sale ever pays out nothing
 *
 * The second one is why floor() and not round() or ceil(): on an odd share
 * the spare micro has to fall to the artist, and a version that rounds the
 * other way passes every "about half" assertion while breaking the promise.
 */
import { describe, expect, it } from "vitest";
import { splitForRecovery } from "@/lib/payments/fronted-recovery";

/** ~$0.15 at the rate the Terms quote, in micro-USDC. */
const FRONTED = 150_000;

describe("splitForRecovery", () => {
  it("takes exactly half of an ordinary share", () => {
    expect(splitForRecovery(FRONTED, 100_000)).toEqual({
      toArtist: 50_000,
      toRecovery: 50_000,
      newRemaining: 100_000,
    });
  });

  it("clears the debt exactly when half the share is the whole remainder", () => {
    expect(splitForRecovery(50_000, 100_000)).toEqual({
      toArtist: 50_000,
      toRecovery: 50_000,
      newRemaining: 0,
    });
  });

  it("takes only the remainder on the last instalment, never the full half", () => {
    // 10_000 left, half the share would be 50_000. Taking the half would
    // recover 40_000 we were never owed.
    expect(splitForRecovery(10_000, 100_000)).toEqual({
      toArtist: 90_000,
      toRecovery: 10_000,
      newRemaining: 0,
    });
  });

  it("pays a covered artist in full", () => {
    expect(splitForRecovery(0, 100_000)).toEqual({
      toArtist: 100_000,
      toRecovery: 0,
      newRemaining: 0,
    });
  });

  it("has nothing to split when the share is zero", () => {
    expect(splitForRecovery(FRONTED, 0)).toEqual({
      toArtist: 0,
      toRecovery: 0,
      newRemaining: FRONTED,
    });
  });

  it("gives the odd micro of an odd share to the artist", () => {
    expect(splitForRecovery(FRONTED, 3)).toEqual({
      toArtist: 2,
      toRecovery: 1,
      newRemaining: 149_999,
    });
    // One micro is not divisible: the artist keeps it and we recover nothing.
    expect(splitForRecovery(FRONTED, 1)).toEqual({
      toArtist: 1,
      toRecovery: 0,
      newRemaining: FRONTED,
    });
  });

  it("clears $0.15 in three sales of $0.10 and then stops deducting", () => {
    // The whole promise end to end, at the numbers on the landing page.
    let remaining = FRONTED;
    const paid: number[] = [];
    for (let sale = 0; sale < 4; sale++) {
      const split = splitForRecovery(remaining, 100_000);
      paid.push(split.toArtist);
      remaining = split.newRemaining;
    }
    expect(paid).toEqual([50_000, 50_000, 50_000, 100_000]);
    expect(remaining).toBe(0);
  });

  it("never pays the artist less than half, for any share and any balance", () => {
    const shares = [0, 1, 2, 3, 7, 999, 1_000, 100_001, 5_000_000];
    const balances = [0, 1, 2, 149, 150_000, 9_999_999];
    for (const share of shares) {
      for (const balance of balances) {
        const { toArtist, toRecovery, newRemaining } = splitForRecovery(balance, share);
        expect(toArtist + toRecovery).toBe(share);
        expect(toArtist).toBeGreaterThanOrEqual(share / 2);
        expect(toRecovery).toBeLessThanOrEqual(share / 2);
        expect(toRecovery).toBeLessThanOrEqual(balance);
        expect(newRemaining).toBe(balance - toRecovery);
        expect(newRemaining).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("pays in full against an over-recovered balance instead of paying extra", () => {
    // Two sales settling at once can take more than we fronted. The artist is
    // owed that back, but it must not turn into a bigger payout leg here —
    // the buyer signed for a fixed total, and inflating the artist's leg would
    // break the split invariant paymentLegs() enforces.
    expect(splitForRecovery(-25_000, 100_000)).toEqual({
      toArtist: 100_000,
      toRecovery: 0,
      newRemaining: 0,
    });
  });

  it("refuses amounts that are not whole micro-USDC", () => {
    expect(() => splitForRecovery(FRONTED, 100_000.5)).toThrow(/integer/);
    expect(() => splitForRecovery(1.5, 100_000)).toThrow(/integer/);
    expect(() => splitForRecovery(FRONTED, Number.NaN)).toThrow(/integer/);
    expect(() => splitForRecovery(FRONTED, Number.MAX_SAFE_INTEGER + 1)).toThrow(/integer/);
    expect(() => splitForRecovery(FRONTED, -1)).toThrow(/negative/);
  });
});
