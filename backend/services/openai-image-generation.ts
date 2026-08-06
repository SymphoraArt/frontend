/**
 * OpenAI image generation (gpt-image-2).
 *
 * The odd one out: Gemini and WaveSpeed take an aspect RATIO, OpenAI takes
 * PIXELS as "WIDTHxHEIGHT". So the ratio and the quality tier have to be
 * turned into a concrete size that satisfies the model's constraints, which
 * are strict and stated in the docs:
 *
 *   both edges divisible by 16
 *   long edge / short edge no more than 3:1
 *   max edge 3840
 *   total pixels between 655,360 and 8,294,400
 *
 * Getting that arithmetic wrong is a 400 AFTER the payment settles, which is
 * the failure mode this codebase keeps producing — so the size is computed and
 * then clamped, never assumed.
 *
 * `quality` is the real price lever here, not the size: at 1024x1024 OpenAI
 * charges roughly $0.006 low, $0.053 medium, $0.211 high — a 35x spread. It
 * maps from our 1K/2K/4K tier, which is the only quality control the UI has.
 */
import type { ImageGenerationRequest, ImageGenerationResult } from './types';
import { readImageDimensions } from './gemini-image-generation';

const ENDPOINT = 'https://api.openai.com/v1/images/generations';

/** Hard limits from the API docs. Verified against them, not guessed. */
const MIN_PIXELS = 655_360;
const MAX_PIXELS = 8_294_400;
const MAX_EDGE = 3840;
const STEP = 16;

/** Target pixel counts per tier, inside the allowed band. */
const TIER_PIXELS: Record<string, number> = {
  '1K': 1_100_000,
  '2K': 4_200_000,
  '4K': MAX_PIXELS,
};

/** low | medium | high — the price lever, mapped from our tier. */
const TIER_QUALITY: Record<string, 'low' | 'medium' | 'high'> = {
  '1K': 'low',
  '2K': 'medium',
  '4K': 'high',
};

function parseRatio(ratio: string | undefined): number {
  const m = (ratio ?? '1:1').match(/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/);
  if (!m) return 1;
  const w = Number(m[1]);
  const h = Number(m[2]);
  if (!w || !h) return 1;
  // The model refuses anything beyond 3:1 either way, so clamp rather than
  // send a request we already know will be rejected.
  return Math.min(3, Math.max(1 / 3, w / h));
}

const roundTo = (n: number, step: number) => Math.max(step, Math.round(n / step) * step);

/**
 * Ratio + tier -> a size the model will accept. Exported for tests: the
 * arithmetic is the part that fails expensively.
 */
export function sizeFor(ratio: string | undefined, tier: string | undefined): string {
  const r = parseRatio(ratio);
  let target = TIER_PIXELS[tier ?? '2K'] ?? TIER_PIXELS['2K'];

  const build = (pixels: number) => {
    const h = Math.sqrt(pixels / r);
    return { w: roundTo(h * r, STEP), h: roundTo(h, STEP) };
  };

  let { w, h } = build(target);

  // Long edge first: shrinking for the edge cap can drop us under the pixel
  // floor, so the floor is enforced afterwards and not before.
  const longest = Math.max(w, h);
  if (longest > MAX_EDGE) {
    const scale = MAX_EDGE / longest;
    w = roundTo(w * scale, STEP);
    h = roundTo(h * scale, STEP);
  }

  while (w * h > MAX_PIXELS) {
    target *= 0.95;
    ({ w, h } = build(target));
  }
  while (w * h < MIN_PIXELS) {
    target *= 1.05;
    ({ w, h } = build(target));
    if (Math.max(w, h) > MAX_EDGE) break;
  }

  return `${w}x${h}`;
}

export async function generateImagesWithOpenAI(
  request: ImageGenerationRequest,
): Promise<ImageGenerationResult> {
  const startTime = Date.now();
  const apiKey = (process.env.OPENAI_API_KEYS || process.env.OPENAI_API_KEY || '')
    .split(',')[0]
    ?.trim();
  if (!apiKey) {
    return { success: false, error: 'OPENAI_API_KEY is not set', generationTime: 0, retryable: false };
  }

  const model = request.modelVersion || 'gpt-image-2';
  const size = sizeFor(request.aspectRatio, request.imageSize);
  const quality = TIER_QUALITY[request.imageSize ?? '2K'] ?? 'medium';

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        prompt: request.prompt,
        size,
        quality,
        n: 1,
        // Half the bytes of png for the same picture, which the gallery pays
        // for on every view.
        output_format: 'jpeg',
        // input_fidelity is deliberately omitted: gpt-image-2 always runs high
        // fidelity and rejects the parameter.
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return {
        success: false,
        error: `OpenAI rejected the request (${res.status}): ${body.slice(0, 300)}`,
        generationTime: Date.now() - startTime,
        retryable: res.status === 429 || res.status >= 500,
      };
    }

    const json = (await res.json()) as { data?: { b64_json?: string; url?: string }[] };
    const first = json.data?.[0];
    // gpt-image models always answer with base64 — there is no url to follow.
    if (!first?.b64_json) {
      return {
        success: false,
        error: 'OpenAI returned no image data',
        generationTime: Date.now() - startTime,
        retryable: true,
      };
    }

    const buffer = Buffer.from(first.b64_json, 'base64');
    const measured = readImageDimensions(buffer);

    return {
      success: true,
      imageBuffers: [buffer],
      generationTime: Date.now() - startTime,
      metadata: {
        model,
        aspectRatio: request.aspectRatio || '1:1',
        // Measured, never echoed: the requested size and the delivered one are
        // different facts, and only one of them is true about the image.
        resolution: measured ? `${measured.width}x${measured.height}` : null,
        requestedSize: size,
        bytes: buffer.length,
        format: measured?.format ?? null,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: `OpenAI error: ${error instanceof Error ? error.message : 'unknown'}`,
      generationTime: Date.now() - startTime,
      retryable: true,
    };
  }
}
