import { describe, it, expect } from "vitest";
import { sizeFor } from "@/backend/services/openai-image-generation";

/**
 * The size arithmetic is the part that fails expensively: a size outside
 * OpenAI's constraints is a 400 AFTER the payment has settled. So these check
 * the constraints themselves across every ratio and tier we offer, rather than
 * a handful of expected strings.
 *
 * From the docs: both edges divisible by 16, long/short ratio at most 3:1,
 * max edge 3840, total pixels between 655,360 and 8,294,400.
 */

const RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"];
const TIERS = ["1K", "2K", "4K"];

const parse = (s: string) => {
  const [w, h] = s.split("x").map(Number);
  return { w, h };
};

describe("sizeFor", () => {
  it("satisfies every OpenAI constraint, for every ratio and tier we offer", () => {
    for (const ratio of RATIOS) {
      for (const tier of TIERS) {
        const { w, h } = parse(sizeFor(ratio, tier));
        const where = `${ratio} @ ${tier} -> ${w}x${h}`;

        expect(w % 16, `${where}: width not a multiple of 16`).toBe(0);
        expect(h % 16, `${where}: height not a multiple of 16`).toBe(0);
        expect(Math.max(w, h), `${where}: edge over 3840`).toBeLessThanOrEqual(3840);
        expect(w * h, `${where}: under the pixel floor`).toBeGreaterThanOrEqual(655_360);
        expect(w * h, `${where}: over the pixel ceiling`).toBeLessThanOrEqual(8_294_400);

        const shape = Math.max(w, h) / Math.min(w, h);
        expect(shape, `${where}: past the 3:1 shape limit`).toBeLessThanOrEqual(3.001);
      }
    }
  });

  it("keeps the requested shape rather than quietly squaring it", () => {
    const wide = parse(sizeFor("16:9", "2K"));
    expect(wide.w).toBeGreaterThan(wide.h);
    expect(wide.w / wide.h).toBeCloseTo(16 / 9, 1);

    const tall = parse(sizeFor("9:16", "2K"));
    expect(tall.h).toBeGreaterThan(tall.w);

    const square = parse(sizeFor("1:1", "2K"));
    expect(square.w).toBe(square.h);
  });

  it("gives a bigger image for a higher tier", () => {
    const px = (s: string) => { const { w, h } = parse(s); return w * h; };
    expect(px(sizeFor("1:1", "2K"))).toBeGreaterThan(px(sizeFor("1:1", "1K")));
    expect(px(sizeFor("1:1", "4K"))).toBeGreaterThan(px(sizeFor("1:1", "2K")));
  });

  it("clamps a shape the model would refuse instead of sending it", () => {
    // 10:1 is past the 3:1 limit — it must come back inside the limit, not as
    // a request we already know is a 400.
    const { w, h } = parse(sizeFor("10:1", "2K"));
    expect(Math.max(w, h) / Math.min(w, h)).toBeLessThanOrEqual(3.001);
  });

  it("falls back to something valid for junk input", () => {
    for (const bad of [undefined, "", "Any ratio", "abc", "0:0"]) {
      const { w, h } = parse(sizeFor(bad as string | undefined, "2K"));
      expect(w % 16).toBe(0);
      expect(h % 16).toBe(0);
      expect(w * h).toBeGreaterThanOrEqual(655_360);
      expect(w * h).toBeLessThanOrEqual(8_294_400);
    }
  });
});
