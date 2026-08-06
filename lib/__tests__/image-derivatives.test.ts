import { describe, it, expect } from "vitest";
import sharp from "sharp";
import { makeDerivatives, tryMakeDerivatives } from "@/lib/imageDerivatives";

/**
 * The point of derivatives is that a gallery stops shipping originals. So the
 * tests assert the SIZE relationship, not just that something came back — a
 * "preview" that is bigger than the original would pass a shape-only check and
 * defeat the entire feature.
 */

/** Noise, not flat colour: a flat image compresses to nothing and would make
 *  any size comparison meaningless. */
async function photoish(w: number, h: number): Promise<Buffer> {
  return sharp({
    create: {
      width: w,
      height: h,
      channels: 3,
      background: "#000000",
      noise: { type: "gaussian", mean: 128, sigma: 60 },
    },
  })
    .png()
    .toBuffer();
}

describe("image derivatives", () => {
  it("produces a preview and a thumbnail that are far smaller than the original", async () => {
    const original = await photoish(2048, 2048);
    const d = await makeDerivatives(original);

    expect(d.width).toBe(2048);
    expect(d.height).toBe(2048);

    // The whole reason this exists.
    expect(d.preview.bytes).toBeLessThan(original.length);
    expect(d.thumb.bytes).toBeLessThan(d.preview.bytes);

    expect(d.preview.contentType).toBe("image/webp");
    expect(d.thumb.contentType).toBe("image/webp");
  }, 60_000);

  it("bounds the long edge, and keeps the aspect ratio", async () => {
    const d = await makeDerivatives(await photoish(4096, 2304)); // 16:9
    expect(Math.max(d.preview.width, d.preview.height)).toBeLessThanOrEqual(1280);
    expect(Math.max(d.thumb.width, d.thumb.height)).toBeLessThanOrEqual(384);

    const src = 4096 / 2304;
    expect(d.preview.width / d.preview.height).toBeCloseTo(src, 1);
    expect(d.thumb.width / d.thumb.height).toBeCloseTo(src, 1);
  }, 60_000);

  it("never upscales — a small original must not grow a bigger 'preview'", async () => {
    const d = await makeDerivatives(await photoish(200, 120));
    expect(d.preview.width).toBe(200);
    expect(d.preview.height).toBe(120);
  }, 60_000);

  it("really is WebP, not a renamed buffer", async () => {
    const d = await makeDerivatives(await photoish(800, 600));
    expect((await sharp(d.preview.buffer).metadata()).format).toBe("webp");
    expect((await sharp(d.thumb.buffer).metadata()).format).toBe("webp");
  }, 60_000);

  it("degrades to null on junk instead of failing the upload", async () => {
    expect(await tryMakeDerivatives(Buffer.from("this is not an image"))).toBeNull();
    expect(await tryMakeDerivatives(Buffer.alloc(0))).toBeNull();
  }, 60_000);
});
