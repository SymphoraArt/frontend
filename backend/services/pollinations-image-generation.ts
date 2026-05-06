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
      return {
        success: false,
        error: `Pollinations API error: ${response.status} ${response.statusText}`,
        generationTime: Date.now() - startTime,
        retryable: response.status >= 500,
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
