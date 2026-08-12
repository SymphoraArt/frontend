/**
 * WaveSpeed image generation.
 *
 * WaveSpeed hosts the same models Google does — Nano Banana Pro among them —
 * at a lower price and a markedly higher latency. That trade is the product:
 * WaveSpeed is the normal path, and "boost" spends more to go direct.
 *
 * Measured 2026-08-06, same prompt, nano-banana-pro:
 *   WaveSpeed 1K  73.1s   2K  78.1s   4K  77.0s
 *   Gemini    1K  19.2s   2K  28.5s   4K  38.8s
 *
 * ── Why this is not PR #54's version ────────────────────────────────────
 * That one POSTs to /api/v3/predictions with {model_id, input}. The live API
 * rejects it ("page is required; page_size is required") — /predictions is a
 * listing endpoint. The model belongs in the PATH. Verified against the real
 * API before writing this. Its metadata also reported the model as
 * "wavespeed-nano-banana-pro" while actually running flux-dev.
 */
import type { ImageGenerationRequest, ImageGenerationResult } from './types';
import { readImageDimensions } from './gemini-image-generation';
import { referenceImageCount, referenceImagesUnsupported } from '@/lib/generation/provider-capabilities';

const API_BASE = 'https://api.wavespeed.ai/api/v3';

/** Poll cadence. Inference alone runs 60-75s, so a tight loop buys nothing. */
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_MS = 240_000;

/**
 * Accepted values, from the API's own rejection messages rather than the docs:
 *   resolution     ["1k", "2k", "4k"]
 *   output_format  ["png", "jpeg"]
 *   aspect_ratio   the same ten Gemini takes
 */
const RESOLUTION_MAP: Record<string, string> = { '1K': '1k', '2K': '2k', '4K': '4k' };

export interface WaveSpeedRequest extends ImageGenerationRequest {
  /**
   * png is WaveSpeed's default and roughly 2.4x the bytes of jpeg for the same
   * image (2K: 6.99 MB vs 3.00 MB). Default to jpeg — a gallery pays for every
   * one of those megabytes on every view.
   */
  outputFormat?: 'png' | 'jpeg';
}

export async function generateImagesWithWaveSpeed(
  request: WaveSpeedRequest,
): Promise<ImageGenerationResult> {
  const startTime = Date.now();
  const apiKey = process.env.WAVESPEED_API_KEY;
  if (!apiKey) {
    return { success: false, error: 'WAVESPEED_API_KEY is not set', generationTime: 0, retryable: false };
  }

  /* Reference images are REFUSED, not ignored.
   *
   * This adapter posts to a /text-to-image model id and builds an `input`
   * object with no image field in it, so anything attached is dropped on the
   * floor. Until 2026-08-12 it was dropped silently: the buyer paid, the
   * provider never saw the images, and the returned picture looked like a
   * plausible answer to the prompt, so nothing anywhere revealed the loss.
   *
   * Failing here rather than generating costs the buyer nothing — the caller
   * treats success:false as a failed generation and voids the authorisation
   * instead of capturing it — while generating would charge them for the wrong
   * thing. When the sibling image-input endpoint is wired, this guard comes out
   * and "wavespeed" joins PROVIDERS_WITH_IMAGE_INPUT in the same commit.
   */
  const refs = referenceImageCount(request.referenceImages);
  if (refs > 0) {
    return { ...referenceImagesUnsupported('this host', refs), generationTime: Date.now() - startTime };
  }

  const model = request.modelVersion || 'google/nano-banana-pro/text-to-image';

  try {
    const input: Record<string, unknown> = {
      prompt: request.prompt,
      output_format: request.outputFormat ?? 'jpeg',
    };
    if (request.aspectRatio) input.aspect_ratio = request.aspectRatio;
    if (request.imageSize) input.resolution = RESOLUTION_MAP[request.imageSize] ?? '1k';
    // Accepted by WaveSpeed's gpt-image-2 with exactly OpenAI's three values —
    // verified live. Models that do not know the field ignore it.
    if (request.quality) input.quality = request.quality;

    const submit = await fetch(`${API_BASE}/${model}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(input),
    });

    if (!submit.ok) {
      const body = await submit.text().catch(() => '');
      // Credit exhaustion also arrives as a 400, and it is not retryable —
      // hammering it just burns the caller's time.
      const outOfCredit = /insufficient credits/i.test(body);
      return {
        success: false,
        error: outOfCredit ? 'WaveSpeed account is out of credits' : `WaveSpeed rejected the request (${submit.status}): ${body.slice(0, 300)}`,
        generationTime: Date.now() - startTime,
        retryable: !outOfCredit && submit.status >= 500,
      };
    }

    const submitted = await submit.json();
    const id = submitted?.data?.id ?? submitted?.id;
    if (!id) {
      return { success: false, error: 'WaveSpeed returned no prediction id', generationTime: Date.now() - startTime, retryable: true };
    }

    const deadline = Date.now() + MAX_POLL_MS;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));

      let status: any;
      try {
        const res = await fetch(`${API_BASE}/predictions/${id}/result`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (!res.ok) continue;
        status = (await res.json())?.data ?? {};
      } catch {
        // A dropped connection mid-poll is common on a 70s job and says
        // nothing about the prediction — keep waiting.
        continue;
      }

      if (status.status === 'failed') {
        return { success: false, error: status.error || 'WaveSpeed generation failed', generationTime: Date.now() - startTime, retryable: true };
      }
      if (status.status !== 'completed') continue;

      const url = status.outputs?.[0];
      if (!url) {
        return { success: false, error: 'WaveSpeed completed without an output', generationTime: Date.now() - startTime, retryable: true };
      }

      const img = await fetch(url);
      if (!img.ok) {
        return { success: false, error: `Could not download the WaveSpeed image (${img.status})`, generationTime: Date.now() - startTime, retryable: true };
      }
      const buffer = Buffer.from(await img.arrayBuffer());
      const measured = readImageDimensions(buffer);

      return {
        success: true,
        imageBuffers: [buffer],
        generationTime: Date.now() - startTime,
        metadata: {
          // The model that actually ran, not a label. PR #54 recorded
          // "wavespeed-nano-banana-pro" while running flux-dev.
          model,
          aspectRatio: request.aspectRatio || '1:1',
          resolution: measured ? `${measured.width}x${measured.height}` : null,
          requestedSize: request.imageSize ?? null,
          bytes: buffer.length,
          format: measured?.format ?? null,
        },
      };
    }

    return { success: false, error: 'WaveSpeed timed out', generationTime: Date.now() - startTime, retryable: true };
  } catch (error: any) {
    return {
      success: false,
      error: `WaveSpeed error: ${error?.message ?? 'unknown'}`,
      generationTime: Date.now() - startTime,
      retryable: true,
    };
  }
}
