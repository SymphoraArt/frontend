import { describe, it, expect } from "vitest";
import { sizeFor } from "@/backend/services/openai-image-generation";

/**
 * Each case here is a silent downgrade that used to reach a paying buyer.
 * The load-bearing property is that a tier the adapter cannot read makes the
 * call FAIL rather than quietly render something smaller.
 */
describe("openai sizeFor", () => {
  it("gives 4K roughly twice the pixels of 2K", () => {
    const px = (s: string) => s.split("x").reduce((a, b) => a * Number(b), 1);
    expect(px(sizeFor("16:9", "4K"))).toBeGreaterThan(px(sizeFor("16:9", "2K")) * 1.7);
  });

  it("reads a lowercase 4k as 4K instead of halving it", () => {
    // The old body fell through to the 2K pixel target: 4,200,000 against
    // 8,294,400 — about half the pixels, at the 4K price.
    expect(sizeFor("16:9", "4k")).toBe(sizeFor("16:9", "4K"));
  });

  it("still defaults an ABSENT tier to 2K, which is documented", () => {
    expect(sizeFor("16:9", undefined)).toBe(sizeFor("16:9", "2K"));
  });

  it("refuses a present-but-unreadable tier instead of guessing", () => {
    expect(() => sizeFor("16:9", "8K")).toThrow(/Unsupported resolution tier/);
    expect(() => sizeFor("16:9", "huge")).toThrow(/Unsupported resolution tier/);
  });

  it("never exceeds the documented ceiling", () => {
    // Max edge 3840, max total 8,294,400 px per the images guide.
    for (const ratio of ["1:1", "16:9", "9:16", "4:5", "3:2"]) {
      const [w, h] = sizeFor(ratio, "4K").split("x").map(Number);
      expect(Math.max(w, h)).toBeLessThanOrEqual(3840);
      expect(w * h).toBeLessThanOrEqual(8_294_400);
    }
  });
});
