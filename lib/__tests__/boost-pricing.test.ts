import { describe, it, expect } from "vitest";
import {
  apiBoostPricePerImage,
  apiPricePerImage,
  computeGenerationPrice,
  PLATFORM_FEE_PERCENT,
} from "@/lib/pricing";
import { getModelCostMicro } from "@/lib/payments/generation-pricing";

/**
 * Boost pricing = the boost ROUTE's real per-image cost (Kev, 2026-08-23:
 * "boost preis als ECHTE KOSTEN von den API costs"). The retired flat x2
 * failed in both directions, and the exact-number assertions here are the
 * tripwire for the day a table row moves without these tests noticing.
 */
describe("apiBoostPricePerImage", () => {
  it("nano boost is Gemini direct: $0.134 at 2K, $0.24 at 4K (measured 2026-08-06)", () => {
    expect(apiBoostPricePerImage("nano-banana-pro", "2K")).toBe(0.134);
    expect(apiBoostPricePerImage("nano-banana-pro", "4K")).toBe(0.24);
    // 1K prices as 2K everywhere (toResolutionTier), boost included.
    expect(apiBoostPricePerImage("nano-banana-pro", "1K")).toBe(0.134);
  });

  it("gpt boost is quality x size (measured 2026-08-24), defaulting to medium when no lever is set", () => {
    expect(apiBoostPricePerImage("gpt-image-2", "2K", "low")).toBe(0.012);
    expect(apiBoostPricePerImage("gpt-image-2", "2K", "high")).toBe(0.428);
    expect(apiBoostPricePerImage("gpt-image-2", "4K", "high")).toBe(0.712);
    expect(apiBoostPricePerImage("gpt-image-2", "2K")).toBe(
      apiBoostPricePerImage("gpt-image-2", "2K", "medium"),
    );
  });

  it("models without a boost route answer their normal price", () => {
    expect(apiBoostPricePerImage("flux", "2K")).toBe(apiPricePerImage("flux", "2K"));
  });

  it("is a real route price, NOT the retired x2: gpt high/4K costs MORE than double the ladder", () => {
    // The economic bug the change fixes: under flat x2 a boosted gpt high/4K
    // sold for 2 x ladder while the vendor charged more — every sale lost money.
    const flatX2 = apiPricePerImage("gpt-image-2", "4K") * 2;
    expect(apiBoostPricePerImage("gpt-image-2", "4K", "high")).toBeGreaterThan(flatX2);
    // ...and the same x2 overcharged cheap runs: gpt low/2K really costs less
    // than double the ladder.
    expect(apiBoostPricePerImage("gpt-image-2", "2K", "low")).toBeLessThan(
      apiPricePerImage("gpt-image-2", "2K") * 2,
    );
  });
});

describe("computeGenerationPrice with boost", () => {
  it("prices the boost route per image, fee on top, count applied", () => {
    const p = computeGenerationPrice("nano-banana-pro", "4K", 3, { boost: true });
    expect(p.perImage).toBe(0.24);
    expect(p.apiSubtotal).toBeCloseTo(0.72, 10);
    expect(p.total).toBeCloseTo(0.72 * (1 + PLATFORM_FEE_PERCENT), 10);
  });

  it("without boost the ladder price is unchanged", () => {
    const p = computeGenerationPrice("nano-banana-pro", "4K", 1);
    expect(p.perImage).toBe(apiPricePerImage("nano-banana-pro", "4K"));
  });

  it("gpt quality feeds the boosted price", () => {
    const high = computeGenerationPrice("gpt-image-2", "2K", 1, { boost: true, quality: "high" });
    const low = computeGenerationPrice("gpt-image-2", "2K", 1, { boost: true, quality: "low" });
    expect(high.perImage).toBe(0.428);
    expect(low.perImage).toBe(0.012);
  });
});

describe("getModelCostMicro with boost (the CHARGED leg)", () => {
  it("boost swaps the model-cost leg to the boost route, in exact micro", () => {
    expect(getModelCostMicro("nano-banana-pro", "4K", { boost: true })).toBe(240_000);
    expect(getModelCostMicro("gpt-image-2", "4K", { boost: true, quality: "high" })).toBe(712_000);
  });

  it("no opts means the normal ladder — existing quotes are untouched", () => {
    expect(getModelCostMicro("nano-banana-pro", "4K")).toBe(240_000);
    expect(getModelCostMicro("nano-banana-pro", "4K", { boost: false })).toBe(
      getModelCostMicro("nano-banana-pro", "4K"),
    );
  });

  it("boost defaults the missing resolution to 2K, matching the quote route's default", () => {
    expect(getModelCostMicro("nano-banana-pro", undefined, { boost: true })).toBe(134_000);
  });
});
