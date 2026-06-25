/**
 * OpenAI GPT Image Generation Service (Tier 2 Backup)
 *
 * Integrates with OpenAI's Images API using the gpt-image-1 model.
 * This serves as the primary backup when all WaveSpeed keys are saturated.
 *
 * API key is passed per-call by the generation router (never stored globally).
 * This enables multi-key rotation for OpenAI keys as well.
 *
 * Pricing: ~$0.04-$0.08 per image depending on size/quality
 *
 * Security: All calls are routed through our backend server.
 *           No API keys are ever exposed to the client (per the Twitter video lesson).
 */

import type { ImageGenerationRequest, ImageGenerationResult } from './types.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const OPENAI_API_BASE = 'https://api.openai.com/v1';
const DEFAULT_MODEL = 'gpt-image-1';

/** Timeout for the generation request (ms) */
const REQUEST_TIMEOUT_MS = 120_000; // 2 minutes

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Maps our aspect ratio to OpenAI's size parameter.
 * OpenAI supports: 1024x1024, 1536x1024, 1024x1536, auto
 */
function mapAspectRatioToSize(aspectRatio: string): string {
  const sizeMap: Record<string, string> = {
    '1:1':  '1024x1024',
    '16:9': '1536x1024',
    '9:16': '1024x1536',
    '4:3':  '1536x1024',  // Closest match
    '3:4':  '1024x1536',  // Closest match
  };
  return sizeMap[aspectRatio] || '1024x1024';
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generates an image using OpenAI's GPT Image API.
 *
 * @param request - The generation request parameters
 * @param apiKey  - The OpenAI API key (injected by the router, NOT from env)
 * @returns Standard ImageGenerationResult
 */
export async function generateImageWithOpenAI(
  request: ImageGenerationRequest,
  apiKey: string
): Promise<ImageGenerationResult> {
  const startTime = Date.now();

  if (!apiKey) {
    return {
      success: false,
      error: 'OpenAI API key is required',
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
    const size = mapAspectRatioToSize(request.aspectRatio || '1:1');

    console.log(`[OpenAI] Generating image: ${size}`);
    console.log(`[OpenAI] Prompt: "${request.prompt.substring(0, 100)}..."`);

    // Build the request payload
    const payload = {
      model: DEFAULT_MODEL,
      prompt: request.prompt,
      n: 1,
      size,
      response_format: 'b64_json' as const,
    };

    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${OPENAI_API_BASE}/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Unknown error');
        let parsedError: string;
        try {
          const errorJson = JSON.parse(errorBody);
          parsedError = errorJson.error?.message || errorBody;
        } catch {
          parsedError = errorBody;
        }

        // Rate limiting
        if (response.status === 429) {
          return {
            success: false,
            error: 'OpenAI rate limit exceeded',
            generationTime: Date.now() - startTime,
            retryable: true,
          };
        }

        // Auth errors
        if (response.status === 401 || response.status === 403) {
          return {
            success: false,
            error: `OpenAI authentication failed: ${response.status}`,
            generationTime: Date.now() - startTime,
            retryable: false,
          };
        }

        // Content policy violations (safety block)
        if (
          response.status === 400 &&
          (parsedError.toLowerCase().includes('safety') ||
           parsedError.toLowerCase().includes('content policy') ||
           parsedError.toLowerCase().includes('rejected'))
        ) {
          return {
            success: false,
            error: `OpenAI content policy violation: ${parsedError}`,
            generationTime: Date.now() - startTime,
            retryable: false,
            metadata: {
              model: DEFAULT_MODEL,
              aspectRatio: request.aspectRatio || '1:1',
              resolution: size,
              finishReason: 'SAFETY',
            },
          };
        }

        return {
          success: false,
          error: `OpenAI generation failed (${response.status}): ${parsedError}`,
          generationTime: Date.now() - startTime,
          retryable: response.status >= 500,
        };
      }

      // Parse the response
      const responseData = await response.json();

      if (!responseData.data || responseData.data.length === 0) {
        return {
          success: false,
          error: 'OpenAI returned no image data',
          generationTime: Date.now() - startTime,
          retryable: true,
        };
      }

      // Extract image buffers from base64 responses
      const imageBuffers: Buffer[] = [];
      for (const imageData of responseData.data) {
        if (imageData.b64_json) {
          const buffer = Buffer.from(imageData.b64_json, 'base64');
          imageBuffers.push(buffer);
          console.log(`[OpenAI] Image received: ${buffer.length} bytes`);
        }
      }

      if (imageBuffers.length === 0) {
        return {
          success: false,
          error: 'OpenAI response contained no valid image data',
          generationTime: Date.now() - startTime,
          retryable: true,
        };
      }

      const generationTime = Date.now() - startTime;
      console.log(`[OpenAI] Generation completed in ${generationTime}ms`);

      return {
        success: true,
        imageBuffers,
        generationTime,
        metadata: {
          model: DEFAULT_MODEL,
          aspectRatio: request.aspectRatio || '1:1',
          resolution: size,
        },
      };
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error: any) {
    const generationTime = Date.now() - startTime;
    console.error('[OpenAI] Generation error:', error);

    // Timeout
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: `OpenAI generation timed out after ${REQUEST_TIMEOUT_MS / 1000}s`,
        generationTime,
        retryable: true,
      };
    }

    // Network errors
    const isNetworkError =
      error.message?.includes('ECONNREFUSED') ||
      error.message?.includes('ECONNRESET') ||
      error.message?.includes('ETIMEDOUT') ||
      error.message?.includes('fetch failed');

    return {
      success: false,
      error: error.message || 'OpenAI generation failed',
      generationTime,
      retryable: isNetworkError,
    };
  }
}
