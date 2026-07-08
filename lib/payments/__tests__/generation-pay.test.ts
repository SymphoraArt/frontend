/**
 * Money-moving guards for the pay endpoint. These pin the rules that keep the
 * on-chain transfer identical to the quoted intent: legs derive only from the
 * DB row, the split invariant is re-asserted, and the priority fee is the
 * capped p75 of live cluster fees — never a hardcoded number.
 */
import { describe, expect, it } from "vitest";
import {
  MAX_PRIORITY_FEE_MICROLAMPORTS,
  paymentLegs,
  priorityFeeMicroLamports,
} from "@/lib/payments/generation-pay";

const ARTIST = "Art1stWa11etBase58Case";
const ENKI = "EnkiP1atformWa11et";

function intent(over: Partial<Parameters<typeof paymentLegs>[0]> = {}) {
  return {
    artist_wallet: ARTIST,
    artist_amount_micro: 1_000_000,
    model_cost_micro: 70_000,
    enki_fee_micro: 107_000,
    total_micro: 1_177_000,
    ...over,
  };
}

describe("paymentLegs", () => {
  it("derives the artist leg and the Enki leg (model cost + fee) from the row", () => {
    expect(paymentLegs(intent(), ENKI)).toEqual([
      { recipient: ARTIST, amountMicro: 1_000_000 },
      { recipient: ENKI, amountMicro: 177_000 },
    ]);
  });

  it("free prompts collapse to a single Enki leg", () => {
    const legs = paymentLegs(
      intent({ artist_wallet: null, artist_amount_micro: 0, enki_fee_micro: 7_000, total_micro: 77_000 }),
      ENKI,
    );
    expect(legs).toEqual([{ recipient: ENKI, amountMicro: 77_000 }]);
  });

  it("rejects rows whose legs do not sum to total_micro", () => {
    expect(() => paymentLegs(intent({ total_micro: 1_177_001 }), ENKI)).toThrow(/invariant/i);
  });

  it("rejects an artist amount without an artist wallet", () => {
    expect(() => paymentLegs(intent({ artist_wallet: null }), ENKI)).toThrow(/artist wallet/i);
  });

  it("rejects zero totals and non-integer or negative amounts", () => {
    expect(() =>
      paymentLegs(
        intent({ artist_amount_micro: 0, artist_wallet: null, model_cost_micro: 0, enki_fee_micro: 0, total_micro: 0 }),
        ENKI,
      ),
    ).toThrow(/zero/i);
    expect(() => paymentLegs(intent({ artist_amount_micro: 0.5 }), ENKI)).toThrow(
      /non-negative integer/,
    );
    expect(() => paymentLegs(intent({ model_cost_micro: -1 }), ENKI)).toThrow(
      /non-negative integer/,
    );
    expect(() =>
      paymentLegs(intent({ total_micro: Number.MAX_SAFE_INTEGER + 1 }), ENKI),
    ).toThrow(/non-negative integer/);
  });

  it("rejects a missing Enki wallet", () => {
    expect(() => paymentLegs(intent(), "")).toThrow(/configured/i);
  });
});

describe("priorityFeeMicroLamports", () => {
  it("picks the p75 of recent fees regardless of sample order", () => {
    const recent = [700, 0, 400, 100, 500, 200, 600, 300].map((prioritizationFee) => ({
      prioritizationFee,
    }));
    expect(priorityFeeMicroLamports(recent)).toBe(500);
  });

  it("returns 0 on an idle fee market (no samples or all-zero)", () => {
    expect(priorityFeeMicroLamports([])).toBe(0);
    expect(priorityFeeMicroLamports([{ prioritizationFee: 0 }])).toBe(0);
  });

  it("caps spikes at MAX_PRIORITY_FEE_MICROLAMPORTS", () => {
    expect(priorityFeeMicroLamports([{ prioritizationFee: 50_000_000 }])).toBe(
      MAX_PRIORITY_FEE_MICROLAMPORTS,
    );
  });
});
