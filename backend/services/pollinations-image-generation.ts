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
  // Base size from resolution
  const baseSize = resolution === '4K' ? 1024 : resolution === '2K' ? 768 : 512;

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

    /* Pollinations now gates generation behind API tokens + x402 micro-
       payments; anonymous traffic is throttled to ~1 queued request per
       IP and otherwise returns 402. A free token (https://auth.pollinations.ai)
       lifts the limit. Configure it via POLLINATIONS_TOKEN. The optional
       POLLINATIONS_REFERRER helps identify the app on the anonymous tier. */
    const token = process.env.POLLINATIONS_TOKEN?.trim();
    const referrer = process.env.POLLINATIONS_REFERRER?.trim();

    // Pollinations.ai URL-based API - returns image directly
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 999999);
    const params = new URLSearchParams({
      width: String(width),
      height: String(height),
      seed: String(seed),
      model: 'flux',
    });
    // `nologo` requires a paid tier — only request it when authenticated.
    if (token) params.set('nologo', 'true');
    if (referrer) params.set('referrer', referrer);
    if (token) params.set('token', token);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?${params.toString()}`;

    console.log(`[Pollinations] Generating image: ${width}x${height}${token ? ' (token)' : ' (anonymous)'}`);
    console.log(`[Pollinations] Prompt: ${prompt.substring(0, 100)}...`);

    // Fetch the image to get the buffer (Pollinations returns the image directly)
    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      if (response.status === 402) {
        return {
          success: false,
          error: token
            ? 'Pollinations rejected the request (402). The token may be invalid or out of quota.'
            : 'Pollinations now requires an API token for image generation (402 Payment Required). Create a free token at https://auth.pollinations.ai and set POLLINATIONS_TOKEN in your environment.',
          generationTime: Date.now() - startTime,
          retryable: false,
        };
      }
      return {
        success: false,
        error: `Pollinations API error: ${response.status} ${response.statusText}`,
        generationTime: Date.now() - startTime,
        retryable: response.status >= 500 || response.status === 429,
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
