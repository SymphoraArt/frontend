/**
 * WaveSpeed Multi T2I (Nano Banana Pro) Image Generation Service
 *
 * Tier 1 workhorse provider at $0.07/image via the Multi T2I endpoint.
 * This is the cheapest production-grade image generator in our stack.
 *
 * Integration approach:
 *   1. Submit a prediction request to WaveSpeed's API
 *   2. Poll the prediction status until completion or timeout
 *   3. Fetch the resulting image and return as a Buffer
 *
 * API Keys are passed per-call by the generation router (never stored globally).
 * This enables the multi-key concurrency rotation strategy.
 *
 * Reference: WaveSpeed API documentation
 */

import type { ImageGenerationRequest, ImageGenerationResult } from './types.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const WAVESPEED_API_BASE = 'https://api.wavespeed.ai/api/v3';
const DEFAULT_MODEL_ID = 'wavespeed-ai/flux-dev/image-to-image';
const TEXT_TO_IMAGE_MODEL = 'wavespeed-ai/flux-dev/text-to-image';

/** Maximum time to wait for a generation to complete (ms) */
const GENERATION_TIMEOUT_MS = 120_000; // 2 minutes

/** Polling interval when checking prediction status (ms) */
const POLL_INTERVAL_MS = 1_500;

/** Maximum number of poll attempts before timing out */
const MAX_POLL_ATTEMPTS = Math.ceil(GENERATION_TIMEOUT_MS / POLL_INTERVAL_MS);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WaveSpeedPredictionRequest {
  prompt: string;
  size?: string;
  num_images?: number;
  seed?: number;
}

interface WaveSpeedPredictionResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: {
    output?: string[];
    error?: string;
  };
  error?: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Maps our aspect ratio to WaveSpeed's size format.
 * WaveSpeed expects "widthxheight" strings.
 */
function mapAspectRatioToSize(aspectRatio: string): string {
  const sizeMap: Record<string, string> = {
    '1:1':  '1024x1024',
    '16:9': '1280x720',
    '9:16': '720x1280',
    '4:3':  '1024x768',
    '3:4':  '768x1024',
  };
  return sizeMap[aspectRatio] || '1024x1024';
}

/**
 * Sleeps for the specified number of milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches the image from a URL and returns it as a Buffer.
 */
async function fetchImageAsBuffer(imageUrl: string): Promise<Buffer> {
  const response = await fetch(imageUrl, {
    headers: { Accept: 'image/*' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generates an image using WaveSpeed Multi T2I (Nano Banana Pro).
 *
 * @param request - The generation request parameters
 * @param apiKey  - The WaveSpeed API key (injected by the router, NOT from env)
 * @returns Standard ImageGenerationResult
 */
export async function generateImageWithWaveSpeed(
  request: ImageGenerationRequest,
  apiKey: string
): Promise<ImageGenerationResult> {
  const startTime = Date.now();

  if (!apiKey) {
    return {
      success: false,
      error: 'WaveSpeed API key is required',
      generationTime: Date.now() - startTime,
      retryable: false,
    };
  }

  if (!request.prompt || request.prompt.trim().length === 0) {
    return {
      success: false,
      error: 'Prompt is required and cannot be empty',
      generationTime: Date.now() - startTime,
      retryable: false,
    };
  }

  try {
    // 1. Build the prediction payload
    const size = mapAspectRatioToSize(request.aspectRatio || '1:1');
    const payload: WaveSpeedPredictionRequest = {
      prompt: request.prompt,
      size,
      // Enforce n:1 at launch (PR #54 review #14)
      num_images: 1,
    };

    console.log(`[WaveSpeed] Submitting prediction: ${size}`);
    console.log(`[WaveSpeed] Prompt: "${request.prompt.substring(0, 100)}..."`);

    // 2. Submit the prediction
    const submitResponse = await fetch(`${WAVESPEED_API_BASE}/predictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model_id: TEXT_TO_IMAGE_MODEL,
        input: payload,
      }),
    });

    if (!submitResponse.ok) {
      const errorBody = await submitResponse.text().catch(() => 'Unknown error');

      // Check for rate limiting
      if (submitResponse.status === 429) {
        return {
          success: false,
          error: 'WaveSpeed rate limit exceeded',
          generationTime: Date.now() - startTime,
          retryable: true,
        };
      }

      // Check for auth errors
      if (submitResponse.status === 401 || submitResponse.status === 403) {
        return {
          success: false,
          error: `WaveSpeed authentication failed: ${submitResponse.status}`,
          generationTime: Date.now() - startTime,
          retryable: false,
        };
      }

      return {
        success: false,
        error: `WaveSpeed submission failed (${submitResponse.status}): ${errorBody}`,
        generationTime: Date.now() - startTime,
        retryable: submitResponse.status >= 500,
      };
    }

    const prediction: WaveSpeedPredictionResponse = await submitResponse.json();
    const predictionId = prediction.id;

    if (!predictionId) {
      return {
        success: false,
        error: 'WaveSpeed returned no prediction ID',
        generationTime: Date.now() - startTime,
        retryable: true,
      };
    }

    console.log(`[WaveSpeed] Prediction submitted: ${predictionId}`);

    // 3. Poll for completion
    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
      await sleep(POLL_INTERVAL_MS);

      const statusResponse = await fetch(
        `${WAVESPEED_API_BASE}/predictions/${predictionId}/status`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      if (!statusResponse.ok) {
        console.warn(`[WaveSpeed] Status check failed (${statusResponse.status}), retrying...`);
        continue;
      }

      const status: WaveSpeedPredictionResponse = await statusResponse.json();

      if (status.status === 'completed') {
        const outputUrls = status.result?.output;
        if (!outputUrls || outputUrls.length === 0) {
          return {
            success: false,
            error: 'WaveSpeed completed but returned no output images',
            generationTime: Date.now() - startTime,
            retryable: true,
          };
        }

        // 4. Fetch the image as a buffer
        const imageBuffers: Buffer[] = [];
        for (const url of outputUrls) {
          const buffer = await fetchImageAsBuffer(url);
          imageBuffers.push(buffer);
          console.log(`[WaveSpeed] Image fetched: ${buffer.length} bytes`);
        }

        const generationTime = Date.now() - startTime;
        console.log(`[WaveSpeed] Generation completed in ${generationTime}ms`);

        return {
          success: true,
          imageBuffers,
          generationTime,
          metadata: {
            model: 'wavespeed-nano-banana-pro',
            aspectRatio: request.aspectRatio || '1:1',
            resolution: size,
          },
        };
      }

      if (status.status === 'failed') {
        const errorMsg = status.result?.error || status.error || 'Generation failed';

        // Check if it's a safety/content block
        const isSafetyBlock =
          errorMsg.toLowerCase().includes('safety') ||
          errorMsg.toLowerCase().includes('content policy') ||
          errorMsg.toLowerCase().includes('nsfw');

        return {
          success: false,
          error: `WaveSpeed generation failed: ${errorMsg}`,
          generationTime: Date.now() - startTime,
          retryable: !isSafetyBlock,
          metadata: {
            model: 'wavespeed-nano-banana-pro',
            aspectRatio: request.aspectRatio || '1:1',
            resolution: size,
            finishReason: isSafetyBlock ? 'SAFETY' : 'ERROR',
          },
        };
      }

      // Still processing, continue polling
      if (attempt % 10 === 0) {
        console.log(`[WaveSpeed] Still processing... (${attempt * POLL_INTERVAL_MS / 1000}s elapsed)`);
      }
    }

    // Timed out
    return {
      success: false,
      error: `WaveSpeed generation timed out after ${GENERATION_TIMEOUT_MS / 1000}s`,
      generationTime: Date.now() - startTime,
      retryable: true,
    };
  } catch (error: any) {
    const generationTime = Date.now() - startTime;
    console.error('[WaveSpeed] Generation error:', error);

    // Network errors are retryable
    const isNetworkError =
      error.message?.includes('ECONNREFUSED') ||
      error.message?.includes('ECONNRESET') ||
      error.message?.includes('ETIMEDOUT') ||
      error.message?.includes('fetch failed');

    return {
      success: false,
      error: error.message || 'WaveSpeed generation failed',
      generationTime,
      retryable: isNetworkError,
    };
  }
}
