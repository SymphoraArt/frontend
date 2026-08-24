import { describe, it, expect } from "vitest";
import {
  apiBoostPricePerImage,
  apiPricePerImage,
  computeGenerationPrice,
  effectiveQuality,
  PLATFORM_FEE_PERCENT,
} from "@/lib/pricing";
import { getModelCostMicro } from "@/lib/payments/generation-pricing";

/**
 * Prices = the REAL cost of the host that will run (Kev: "ECHTE KOSTEN").
 * gpt-image-2 routes BY QUALITY since 2026-08-24 — OpenAI direct below high,
 * WaveSpeed flat at high — and has no boost any more. The exact-number
 * assertions are the tripwire for the day a table row moves unnoticed.
 * OpenAI cells measured 2026-08-24 (metered bench, billed output tokens).
 */
describe("apiPricePerImage — gpt routes by quality", () => {
  it("low and medium run OpenAI direct: the measured token costs", () => {
    expect(apiPricePerImage("gpt-image-2", "2K", "low")).toBe(0.012);
    expect(apiPricePerImage("gpt-image-2", "4K", "low")).toBe(0.02);
    expect(apiPricePerImage("gpt-image-2", "2K", "medium")).toBe(0.107);
    expect(apiPricePerImage("gpt-image-2", "4K", "medium")).toBe(0.178);
  });

  it("high runs WaveSpeed: its flat price, far below OpenAI's high", () => {
    expect(apiPricePerImage("gpt-image-2", "2K", "high")).toBe(0.167);
    expect(apiPricePerImage("gpt-image-2", "4K", "high")).toBe(0.25);
  });

  it("routing saves money on EVERY quality against a single-host ladder", () => {
    // Below high, OpenAI direct undercuts WaveSpeed's flat price...
    expect(apiPricePerImage("gpt-image-2", "2K", "medium")).toBeLessThan(0.167);
    expect(apiPricePerImage("gpt-image-2", "2K", "low")).toBeLessThan(0.167);
    // ...and at high, WaveSpeed's flat price undercuts OpenAI's measured
    // $0.428/$0.712 — which is why high does NOT run OpenAI.
    expect(apiPricePerImage("gpt-image-2", "2K", "high")).toBeLessThan(0.428);
    expect(apiPricePerImage("gpt-image-2", "4K", "high")).toBeLessThan(0.712);
  });

  it("an unstated quality prices at the tier default the server renders with", () => {
    expect(effectiveQuality("1K")).toBe("low");
    expect(effectiveQuality("2K")).toBe("medium");
    expect(effectiveQuality("4K")).toBe("high");
    expect(apiPricePerImage("gpt-image-2", "2K")).toBe(apiPricePerImage("gpt-image-2", "2K", "medium"));
    expect(apiPricePerImage("gpt-image-2", "4K")).toBe(apiPricePerImage("gpt-image-2", "4K", "high"));
    expect(apiPricePerImage("gpt-image-2", "1K")).toBe(apiPricePerImage("gpt-image-2", "1K", "low"));
  });

  it("non-gpt models ignore quality — their hosts have no such lever", () => {
    expect(apiPricePerImage("nano-banana-pro", "2K", "high")).toBe(apiPricePerImage("nano-banana-pro", "2K"));
  });
});

describe("apiBoostPricePerImage", () => {
  it("nano boost is Gemini direct: $0.134 at 2K, $0.24 at 4K (confirmed vs the official page)", () => {
    expect(apiBoostPricePerImage("nano-banana-pro", "2K")).toBe(0.134);
    expect(apiBoostPricePerImage("nano-banana-pro", "4K")).toBe(0.24);
    // 1K prices as 2K everywhere (toResolutionTier), boost included.
    expect(apiBoostPricePerImage("nano-banana-pro", "1K")).toBe(0.134);
  });

  it("gpt has NO boost: the flag answers the routed normal price (Kev, 2026-08-24)", () => {
    for (const q of ["low", "medium", "high"] as const) {
      expect(apiBoostPricePerImage("gpt-image-2", "2K", q)).toBe(apiPricePerImage("gpt-image-2", "2K", q));
      expect(apiBoostPricePerImage("gpt-image-2", "4K", q)).toBe(apiPricePerImage("gpt-image-2", "4K", q));
    }
  });

  it("models without a boost route answer their normal price", () => {
    expect(apiBoostPricePerImage("flux", "2K")).toBe(apiPricePerImage("flux", "2K"));
  });
});

describe("computeGenerationPrice", () => {
  it("prices the boost route per image, fee on top, count applied", () => {
    const p = computeGenerationPrice("nano-banana-pro", "4K", 3, { boost: true });
    expect(p.perImage).toBe(0.24);
    expect(p.apiSubtotal).toBeCloseTo(0.72, 10);
    expect(p.total).toBeCloseTo(0.72 * (1 + PLATFORM_FEE_PERCENT), 10);
  });

  it("without boost the ladder price is unchanged for nano", () => {
    const p = computeGenerationPrice("nano-banana-pro", "4K", 1);
    expect(p.perImage).toBe(apiPricePerImage("nano-banana-pro", "4K"));
  });

  it("gpt quality feeds the NORMAL price — the route depends on it", () => {
    expect(computeGenerationPrice("gpt-image-2", "2K", 1, { quality: "high" }).perImage).toBe(0.167);
    expect(computeGenerationPrice("gpt-image-2", "2K", 1, { quality: "low" }).perImage).toBe(0.012);
    // No quality: the tier default, same as the server will render.
    expect(computeGenerationPrice("gpt-image-2", "4K", 1).perImage).toBe(0.25);
  });
});

describe("getModelCostMicro (the CHARGED leg)", () => {
  it("boost swaps the model-cost leg to the boost route, in exact micro", () => {
    expect(getModelCostMicro("nano-banana-pro", "4K", { boost: true })).toBe(240_000);
  });

  it("gpt charges the quality-routed host, boost flag or not", () => {
    expect(getModelCostMicro("gpt-image-2", "2K", { quality: "medium" })).toBe(107_000);
    expect(getModelCostMicro("gpt-image-2", "4K", { quality: "high" })).toBe(250_000);
    expect(getModelCostMicro("gpt-image-2", "4K", { boost: true, quality: "high" })).toBe(250_000);
  });

  it("no opts means the tier-default quality — matching what would render", () => {
    expect(getModelCostMicro("nano-banana-pro", "4K")).toBe(240_000);
    expect(getModelCostMicro("gpt-image-2", "2K")).toBe(107_000);
    expect(getModelCostMicro("nano-banana-pro", "4K", { boost: false })).toBe(
      getModelCostMicro("nano-banana-pro", "4K"),
    );
  });

  it("boost defaults the missing resolution to 2K, matching the quote route's default", () => {
    expect(getModelCostMicro("nano-banana-pro", undefined, { boost: true })).toBe(134_000);
  });
});
