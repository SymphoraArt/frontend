/**
 * Pollinations.ai Image Generation Service
 * 
 * Completely FREE, no API key required.
 * Uses Pollinations.ai's public API for image generation.
 * 
 * Supported models: flux, turbo
 * Rate limits: Fair use (typically ~10 req/min)
 */

import type { ImageGenerationResult } from './types';

interface PollinationsRequest {
  prompt: string;
  width?: number;
  height?: number;
  model?: string;
  seed?: number;
  nologo?: boolean;
  enhance?: boolean;
}

/**
 * Get dimensions from aspect ratio string
 */
function getDimensions(aspectRatio: string, resolution: string): { width: number; height: number } {
  // Base size from resolution.
  //
  // Capped at 768 on purpose. Measured 2026-08-12: asking for 1024x1280
  // ("4K") and 768x960 ("2K") both come back as 686x858 — the free tier caps
  // around 0.59 megapixels — but the 1024 request took roughly TWICE as long
  // server-side (11.4s vs 5.9s) for byte-identical dimensions. The larger
  // request bought the user nothing but a longer wait.
  //
  // The labels above this layer still promise more than the free provider can
  // deliver; that is a product decision (see the free/paid contingent work),
  // not something this adapter can honestly fix by asking louder.
  const baseSize = resolution === '1K' ? 512 : 768;

  switch (aspectRatio) {
    case '16:9':
      return { width: Math.round(baseSize * (16 / 9)), height: baseSize };
    case '9:16':
      return { width: baseSize, height: Math.round(baseSize * (16 / 9)) };
    case '4:3':
      return { width: Math.round(baseSize * (4 / 3)), height: baseSize };
    case '3:4':
      return { width: baseSize, height: Math.round(baseSize * (4 / 3)) };
    case '4:5':
      return { width: baseSize, height: Math.round(baseSize * (5 / 4)) };
    case '2:3':
      return { width: baseSize, height: Math.round(baseSize * (3 / 2)) };
    case '2.39:1':
      return { width: Math.round(baseSize * 2.39), height: baseSize };
    case '1:2.39':
      return { width: baseSize, height: Math.round(baseSize * 2.39) };
    case '1:1':
    default:
      return { width: baseSize, height: baseSize };
  }
}

/**
 * Generate image using Pollinations.ai (FREE, no API key)
 */
export async function generateImageWithPollinations(
  prompt: string,
  aspectRatio: string = '1:1',
  resolution: string = '2K',
): Promise<ImageGenerationResult> {
  const startTime = Date.now();

  try {
    if (!prompt || prompt.trim().length === 0) {
      return {
        success: false,
        error: 'Prompt is required',
        generationTime: Date.now() - startTime,
      };
    }

    const { width, height } = getDimensions(aspectRatio, resolution);

    // Pollinations.ai URL-based API - returns image directly
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 999999);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&enhance=true&model=flux`;

    console.log(`[Pollinations] Generating image: ${width}x${height}`);
    console.log(`[Pollinations] Prompt: ${prompt.substring(0, 100)}...`);

    // Fetch the image to get the buffer (Pollinations returns the image directly)
    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      // 429 is the free tier's normal answer to a burst — measured
      // 2026-08-12, three requests in a row after a handful of renders. It is
      // the most retryable failure there is, and reporting it as a plain
      // server error made the route answer 500 and the user read "generation
      // failed" for something that works again seconds later.
      const rateLimited = response.status === 429;
      return {
        success: false,
        error: rateLimited
          ? 'The free generator is busy right now. Try again in a moment.'
          : `Pollinations API error: ${response.status} ${response.statusText}`,
        generationTime: Date.now() - startTime,
        retryable: rateLimited || response.status >= 500,
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const generationTime = Date.now() - startTime;
    console.log(`[Pollinations] Generation completed in ${generationTime}ms (${buffer.length} bytes)`);

    return {
      success: true,
      imageBuffers: [buffer],
      generationTime,
      metadata: {
        model: 'pollinations-flux',
        aspectRatio,
        resolution,
      },
    };

  } catch (error: any) {
    const generationTime = Date.now() - startTime;
    console.error('[Pollinations] Generation error:', error);

    return {
      success: false,
      error: error.message || 'Image generation failed',
      generationTime,
      retryable: true,
    };
  }
}
