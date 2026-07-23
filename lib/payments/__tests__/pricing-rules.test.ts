import { describe, expect, it } from "vitest";
import { computeGenerationSplit } from "@/lib/payments/generation-pricing";
import { applyRuleToSplit } from "@/lib/payments/pricing-rules";

// artist 1 USDC + model 0.07 USDC → fee 10% of subtotal (addOn) = 107_000 micro
const base = () => computeGenerationSplit(1_000_000, 70_000);

describe("applyRuleToSplit", () => {
  it("fee_percent_off reduces only the Enki fee, artist untouched", () => {
    const s = applyRuleToSplit(base(), {
      id: "r1", name: "half fee", effect: { type: "fee_percent_off", value: 50 },
    });
    expect(s.artistAmountMicro).toBe(1_000_000);
    expect(s.modelCostMicro).toBe(70_000);
    expect(s.enkiFeeMicro).toBe(base().enkiFeeMicro - Math.floor(base().enkiFeeMicro / 2));
    expect(s.enkiTotalMicro).toBe(s.modelCostMicro + s.enkiFeeMicro);
    expect(s.totalMicro).toBe(s.artistAmountMicro + s.enkiTotalMicro);
  });

  it("fee_percent_off 100 zeroes the fee, keeps model cost", () => {
    const s = applyRuleToSplit(base(), {
      id: "r2", name: "no fee", effect: { type: "fee_percent_off", value: 100 },
    });
    expect(s.enkiFeeMicro).toBe(0);
    expect(s.enkiTotalMicro).toBe(70_000);
    expect(s.totalMicro).toBe(1_070_000);
  });

  it("clamps out-of-range percentages", () => {
    const over = applyRuleToSplit(base(), { id: "r3", name: "x", effect: { type: "fee_percent_off", value: 250 } });
    expect(over.enkiFeeMicro).toBe(0);
    const under = applyRuleToSplit(base(), { id: "r4", name: "y", effect: { type: "fee_percent_off", value: -5 } });
    expect(under.enkiFeeMicro).toBe(base().enkiFeeMicro);
  });

  it("free_generation waives the Enki leg but never the artist share", () => {
    const s = applyRuleToSplit(base(), {
      id: "r5", name: "free", effect: { type: "free_generation", uses_per_day: 3 },
    });
    expect(s.artistAmountMicro).toBe(1_000_000);
    expect(s.modelCostMicro).toBe(0);
    expect(s.enkiFeeMicro).toBe(0);
    expect(s.enkiTotalMicro).toBe(0);
    expect(s.totalMicro).toBe(1_000_000);
  });

  it("free_generation on a free prompt makes the total zero", () => {
    const s = applyRuleToSplit(computeGenerationSplit(0, 70_000), {
      id: "r6", name: "free", effect: { type: "free_generation" },
    });
    expect(s.totalMicro).toBe(0); // pay route must short-circuit zero-total intents
  });
});
