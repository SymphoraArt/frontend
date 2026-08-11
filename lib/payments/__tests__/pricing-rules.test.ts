import { describe, expect, it } from "vitest";
import { computeGenerationSplit, PRICING_POLICY } from "@/lib/payments/generation-pricing";
import { applyRuleToSplit } from "@/lib/payments/pricing-rules";

// artist 1 USDC + model 0.07 USDC → fee 10% of subtotal (addOn) = 107_000
// micro PLATFORM fee, plus the flat network fee inside enkiFeeMicro.
const base = () => computeGenerationSplit(1_000_000, 70_000);
const NET = PRICING_POLICY.networkFeeMicro;
const PLATFORM = 107_000;

describe("applyRuleToSplit", () => {
  it("fee_percent_off discounts the platform fee only — network fee and artist untouched", () => {
    const s = applyRuleToSplit(base(), {
      id: "r1", name: "half fee", effect: { type: "fee_percent_off", value: 50 },
    });
    expect(s.artistAmountMicro).toBe(1_000_000);
    expect(s.modelCostMicro).toBe(70_000);
    // Half off the PLATFORM part; the network fee is a passed-through cost,
    // not margin, and a campaign that waived it would have Enki paying the
    // chain out of pocket on every discounted sale.
    expect(s.enkiFeeMicro).toBe(NET + PLATFORM - Math.floor(PLATFORM / 2));
    expect(s.networkFeeMicro).toBe(NET);
    expect(s.enkiTotalMicro).toBe(s.modelCostMicro + s.enkiFeeMicro);
    expect(s.totalMicro).toBe(s.artistAmountMicro + s.enkiTotalMicro);
  });

  it("fee_percent_off 100 zeroes the platform fee, keeps model cost AND network fee", () => {
    const s = applyRuleToSplit(base(), {
      id: "r2", name: "no fee", effect: { type: "fee_percent_off", value: 100 },
    });
    expect(s.enkiFeeMicro).toBe(NET);
    expect(s.enkiTotalMicro).toBe(70_000 + NET);
    expect(s.totalMicro).toBe(1_070_000 + NET);
  });

  it("clamps out-of-range percentages", () => {
    const over = applyRuleToSplit(base(), { id: "r3", name: "x", effect: { type: "fee_percent_off", value: 250 } });
    expect(over.enkiFeeMicro).toBe(NET); // 250% clamps to 100% — of the platform part
    const under = applyRuleToSplit(base(), { id: "r4", name: "y", effect: { type: "fee_percent_off", value: -5 } });
    expect(under.enkiFeeMicro).toBe(base().enkiFeeMicro);
  });

  it("free_generation waives the whole Enki leg, network fee included", () => {
    // A "free" generation that still bills half a cent is not free, it is a
    // support ticket — the promo is Enki's to absorb entirely.
    const s = applyRuleToSplit(base(), {
      id: "r5", name: "free", effect: { type: "free_generation", uses_per_day: 3 },
    });
    expect(s.artistAmountMicro).toBe(1_000_000);
    expect(s.modelCostMicro).toBe(0);
    expect(s.enkiFeeMicro).toBe(0);
    expect(s.networkFeeMicro).toBe(0);
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
