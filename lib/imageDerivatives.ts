import sharp from "sharp";

/**
 * Preview and thumbnail renditions for a generated or uploaded image.
 *
 * The gallery was serving originals into every grid cell. Measured
 * 2026-08-06 against the real providers: a 2K image is 3.0 MB (Gemini, JPEG)
 * or 7.0 MB (WaveSpeed, PNG), and 4K reaches 8.8 MB and 21.1 MB. A grid of
 * twenty of those is a quarter-gigabyte for pictures shown at 300px.
 *
 * So one upload becomes three objects, the way Higgsfield and everyone else
 * does it:
 *   original   untouched, what the download button hands over
 *   preview    WebP ~1280px — what the detail view shows, and what a
 *              right-click actually saves
 *   thumb      WebP ~384px — the grid
 *
 * ── Why WebP, and why effort 2 ──────────────────────────────────────────
 * WebP at q80 is roughly a fifth of the equivalent PNG. Encode — not decode,
 * not resize — is about 70% of the CPU here, and sharp's default effort of 4
 * buys ~5% smaller files for ~40% more CPU. On a 1-vCPU serverless function
 * that trade is wrong, so effort is pinned at 2.
 */

// One vCPU on Vercel, and concurrent invocations share it. libvips' cache is
// dead weight in a process that handles one image and exits.
sharp.concurrency(1);
sharp.cache(false);

export interface Derivative {
  buffer: Buffer;
  width: number;
  height: number;
  bytes: number;
  contentType: "image/webp";
}

export interface Derivatives {
  preview: Derivative;
  thumb: Derivative;
  /** Dimensions of the ORIGINAL, measured while decoding it anyway. */
  width: number;
  height: number;
}

const PREVIEW_EDGE = 1280;
const THUMB_EDGE = 384;

async function encode(input: sharp.Sharp, edge: number, quality: number): Promise<Derivative> {
  const { data, info } = await input
    // `withoutEnlargement` so a small original is never upscaled into a
    // "preview" heavier than the thing it previews.
    .resize({ width: edge, height: edge, fit: "inside", withoutEnlargement: true })
    .webp({ quality, effort: 2 })
    .toBuffer({ resolveWithObject: true });
  return {
    buffer: data,
    width: info.width,
    height: info.height,
    bytes: data.length,
    contentType: "image/webp",
  };
}

/**
 * Decode once, branch twice. Two independent sharp pipelines would decode the
 * same multi-megabyte image twice for no reason.
 */
export async function makeDerivatives(original: Buffer): Promise<Derivatives> {
  const base = sharp(original, { failOn: "none" });
  const meta = await base.metadata();

  const [preview, thumb] = await Promise.all([
    encode(base.clone(), PREVIEW_EDGE, 80),
    encode(base.clone(), THUMB_EDGE, 75),
  ]);

  return { preview, thumb, width: meta.width ?? 0, height: meta.height ?? 0 };
}

/**
 * Same thing, but never throws. Derivatives are an optimisation: a corrupt or
 * exotic input must cost us the smaller renditions, not the upload itself.
 */
export async function tryMakeDerivatives(original: Buffer): Promise<Derivatives | null> {
  try {
    return await makeDerivatives(original);
  } catch {
    return null;
  }
}
