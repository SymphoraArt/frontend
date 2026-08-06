import { describe, it, expect } from "vitest";
import sharp from "sharp";
import { readImageDimensions } from "@/backend/services/gemini-image-generation";

/**
 * The parser exists so a generation record states the size the model actually
 * produced instead of the size that was requested. If it is wrong, the record
 * lies in a new way — so it is checked against sharp on real encoded bytes
 * rather than against hand-built headers, which would only prove the test and
 * the parser share an assumption.
 */

async function png(w: number, h: number): Promise<Buffer> {
  return sharp({ create: { width: w, height: h, channels: 3, background: "#334455" } }).png().toBuffer();
}
async function jpeg(w: number, h: number): Promise<Buffer> {
  return sharp({ create: { width: w, height: h, channels: 3, background: "#334455" } }).jpeg().toBuffer();
}

describe("readImageDimensions", () => {
  it("agrees with sharp on PNG, including the non-square case", async () => {
    for (const [w, h] of [[1024, 1024], [1344, 768], [768, 1344], [17, 4096]]) {
      const buf = await png(w, h);
      const truth = await sharp(buf).metadata();
      expect(readImageDimensions(buf)).toEqual({ width: truth.width, height: truth.height, format: "png" });
    }
  });

  it("agrees with sharp on JPEG — the format gemini-3-pro returns", async () => {
    for (const [w, h] of [[1024, 1024], [2048, 2048], [4096, 4096], [1536, 672]]) {
      const buf = await jpeg(w, h);
      const truth = await sharp(buf).metadata();
      expect(readImageDimensions(buf)).toEqual({ width: truth.width, height: truth.height, format: "jpeg" });
    }
  });

  it("walks past JPEG segments that precede the frame header", async () => {
    // EXIF/ICC put multi-kilobyte segments before SOF; a parser that peeks at a
    // fixed offset passes the simple case above and fails here.
    const buf = await sharp({ create: { width: 640, height: 480, channels: 3, background: "#112233" } })
      .withMetadata({ exif: { IFD0: { Copyright: "x".repeat(2000) } } })
      .jpeg()
      .toBuffer();
    expect(readImageDimensions(buf)).toEqual({ width: 640, height: 480, format: "jpeg" });
  });

  it("returns null rather than guessing on input it cannot read", async () => {
    expect(readImageDimensions(undefined)).toBeNull();
    expect(readImageDimensions(Buffer.alloc(0))).toBeNull();
    expect(readImageDimensions(Buffer.from("not an image at all, just text"))).toBeNull();
    // A valid PNG signature with the rest truncated away.
    expect(readImageDimensions(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0]))).toBeNull();
  });

  it("is mutation-tested: a wrong answer fails the assertion", async () => {
    // Guards the guard — if readImageDimensions silently returned a constant,
    // the checks above would still pass for 1024x1024. This one would not.
    const wide = await png(1344, 768);
    const tall = await png(768, 1344);
    expect(readImageDimensions(wide)).not.toEqual(readImageDimensions(tall));
    expect(readImageDimensions(wide)!.width).toBeGreaterThan(readImageDimensions(wide)!.height);
  });
});
