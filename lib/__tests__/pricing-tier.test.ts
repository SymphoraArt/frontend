import { describe, it, expect } from "vitest";
import { toResolutionTier, apiPricePerImage } from "@/lib/pricing";

/**
 * The case that was live-wrong: the editor surfaces send a lowercase "4k".
 * The old body compared against "4K" only, so it priced that request as 2K
 * while the WaveSpeed adapter's own map fell back to '1k' and rendered the
 * smallest tier. One input, two different wrong answers.
 */
describe("toResolutionTier", () => {
  it("prices a lowercase 4k as 4K", () => {
    expect(toResolutionTier("4k")).toBe("4K");
    expect(toResolutionTier(" 4K ")).toBe("4K");
  });

  it("keeps 2K and treats 1K as 2K, which is what Google charges", () => {
    // 1120 tokens for both 1K and 2K on gemini-3-pro-image — same price.
    expect(toResolutionTier("2K")).toBe("2K");
    expect(toResolutionTier("2k")).toBe("2K");
    expect(toResolutionTier("1K")).toBe("2K");
  });

  it("does not read junk as the expensive tier", () => {
    for (const junk of ["", "8K", "forty", undefined]) {
      expect(toResolutionTier(junk)).toBe("2K");
    }
  });

  it("carries the case repair into the actual price", () => {
    expect(apiPricePerImage("nano-banana-pro", "4k")).toBe(
      apiPricePerImage("nano-banana-pro", "4K")
    );
    expect(apiPricePerImage("nano-banana-pro", "4k")).toBeGreaterThan(
      apiPricePerImage("nano-banana-pro", "2K")
    );
  });
});
