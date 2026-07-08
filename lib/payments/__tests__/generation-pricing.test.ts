/**
 * Money-math invariants for server-built payments (backlog #2).
 *
 * These run on every PR — the CI gate is only as real as these tests. They
 * pin the fee policy Kev decided (10% on model cost AND artist price) so a
 * silent policy drift turns the gate red instead of shipping.
 */
import { describe, expect, it } from "vitest";
import {
  PRICING_POLICY,
  UnknownModelError,
  computeGenerationSplit,
  getModelCostMicro,
  splitToBreakdown,
  usdToMicro,
} from "@/lib/payments/generation-pricing";

describe("usdToMicro", () => {
  it("converts USD to integer micro-USDC exactly", () => {
    expect(usdToMicro(0.07)).toBe(70_000);
    expect(usdToMicro(0)).toBe(0);
    expect(usdToMicro(1)).toBe(1_000_000);
  });

  it("rejects negative and non-finite input", () => {
    expect(() => usdToMicro(-0.01)).toThrow();
    expect(() => usdToMicro(NaN)).toThrow();
    expect(() => usdToMicro(Infinity)).toThrow();
  });
});

describe("computeGenerationSplit", () => {
  it("pins the decided fee policy: 10% on artist price + model cost, add-on", () => {
    expect(PRICING_POLICY.enkiFeeBps).toBe(1000);
    expect(PRICING_POLICY.feeBase).toBe("subtotal");
    expect(PRICING_POLICY.feeMode).toBe("addOn");
  });

  it("holds the invariant artist + enki === total for any amounts", () => {
    const cases: Array<[number, number]> = [
      [0, 70_000],
      [1_000_000, 70_000],
      [123_457, 60_000],
      [5_000_000, 211_000],
    ];
    for (const [artist, model] of cases) {
      const s = computeGenerationSplit(artist, model);
      expect(s.artistAmountMicro + s.enkiTotalMicro).toBe(s.totalMicro);
    }
  });

  it("fees exactly 10% of the subtotal, floored to the buyer's favor", () => {
    // $1 premium prompt + $0.07 model → fee on $1.07
    const s = computeGenerationSplit(1_000_000, 70_000);
    expect(s.enkiFeeMicro).toBe(107_000);
    expect(s.artistAmountMicro).toBe(1_000_000); // addOn: artist keeps the listed price
    expect(s.totalMicro).toBe(1_177_000);
  });

  it("free prompts have no artist leg", () => {
    const s = computeGenerationSplit(0, 70_000);
    expect(s.artistAmountMicro).toBe(0);
    expect(s.enkiTotalMicro).toBe(77_000);
    expect(s.totalMicro).toBe(77_000);
  });

  it("rejects fractional or negative micro amounts", () => {
    expect(() => computeGenerationSplit(0.5, 70_000)).toThrow();
    expect(() => computeGenerationSplit(-1, 70_000)).toThrow();
    expect(() => computeGenerationSplit(0, Number.MAX_SAFE_INTEGER + 1)).toThrow();
  });
});

describe("getModelCostMicro", () => {
  it("throws UnknownModelError for unknown model families", () => {
    expect(() => getModelCostMicro("no-such-model", "2K")).toThrow(UnknownModelError);
  });
});

describe("splitToBreakdown", () => {
  it("serializes amounts as strings with the fee-policy snapshot", () => {
    const b = splitToBreakdown(computeGenerationSplit(0, 70_000));
    expect(b.totalAmount).toBe("77000");
    expect(b.currency).toBe("USDC");
    expect(b.decimals).toBe(6);
    expect(b.feePolicy).toEqual({
      feeBps: PRICING_POLICY.enkiFeeBps,
      feeBase: PRICING_POLICY.feeBase,
      feeMode: PRICING_POLICY.feeMode,
    });
  });
});
