/**
 * Google Gemini (Nano Banana) Image Generation Service
 *
 * Integrates with Gemini 2.5 Flash Image and Gemini 3 Pro Image models
 * for high-quality image generation with best-in-class text rendering.
 *
 * Models:
 * - gemini-2.5-flash-image: Fast, efficient ($0.039/image)
 * - gemini-3-pro-image-preview: High-fidelity with "Thinking" mode ($0.134/image)
 *
 * Rate Limits (Free Tier):
 * - 2 images per minute
 * - 250 requests per day
 *
 * Rate Limits (Paid Tier 1):
 * - 10 images per minute
 * - Unlimited daily quota
 */

import { GoogleGenAI, Modality } from '@google/genai';
import type { ImageGenerationRequest, ImageGenerationResult } from './types';

// Initialize Gemini AI client
let ai: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    // Support both GEMINI_API_KEY and GOOGLE_GEMINI_API_KEY for compatibility
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'GOOGLE_GEMINI_API_KEY or GEMINI_API_KEY environment variable is not set. ' +
        'Get your API key from https://aistudio.google.com/apikey'
      );
    }

    ai = new GoogleGenAI({ apiKey });
  }

  return ai;
}

/**
 * Generates images using Google Gemini (Nano Banana)
 *
 * @param request - Generation request parameters
 * @returns URLs or buffers of generated images
 *
 * @example
 * ```typescript
 * const result = await generateImagesWithGemini({
 *   prompt: 'A futuristic city with neon lights',
 *   aspectRatio: '16:9',
 *   numImages: 1
 * });
 *
 * if (result.success) {
 *   console.log('Generated images:', result.imageUrls);
 * }
 * ```
 */
export async function generateImagesWithGemini(
  request: ImageGenerationRequest
): Promise<ImageGenerationResult> {
  const startTime = Date.now();

  try {
    // 1. Validate request
    const validation = validateRequest(request);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
        generationTime: Date.now() - startTime
      };
    }

    // 2. Get Gemini client
    const client = getGeminiClient();

    // 3. Determine model to use
    const model = request.modelVersion || 'gemini-2.5-flash-image';

    // 4. Build generation config
    const config: any = {
      responseModalities: [Modality.IMAGE], // Request image output
      imageConfig: {
        aspectRatio: request.aspectRatio || '1:1',
      }
    };

    // Only add imageSize if model is Gemini 3 Pro (supports 1K, 2K, 4K)
    if (model === 'gemini-3-pro-image-preview' && request.imageSize) {
      config.imageConfig.imageSize = request.imageSize;
    }

    // Add safety settings if provided
    if (request.safetySettings) {
      config.safetySettings = request.safetySettings;
    }

    console.log(`[Gemini] Generating image with model: ${model}`);
    console.log(`[Gemini] Prompt: ${request.prompt.substring(0, 100)}...`);

    // 5. Generate image
    // Contents must be an array with role and parts structure
    const response = await client.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: request.prompt
            }
          ]
        }
      ],
      config
    });

    // 6. Extract image data
    const imageBuffers: Buffer[] = [];
    let finishReason: string | undefined;
    let safetyRatings: any[] | undefined;

    if (!response.candidates || response.candidates.length === 0) {
      return {
        success: false,
        error: 'No images generated. The request may have been blocked by safety filters.',
        generationTime: Date.now() - startTime
      };
    }

    for (const candidate of response.candidates) {
      finishReason = candidate.finishReason;
      safetyRatings = candidate.safetyRatings;

      // Check if generation was blocked
      if (finishReason === 'SAFETY') {
        return {
          success: false,
          error: 'Image generation blocked by safety filters. Please modify your prompt.',
          generationTime: Date.now() - startTime,
          metadata: {
            model,
            aspectRatio: request.aspectRatio || '1:1',
            resolution: request.imageSize || '1K',
            finishReason,
            safetyRatings
          }
        };
      }

      // Extract image data from parts
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data && typeof part.inlineData.data === 'string') {
            const buffer = Buffer.from(part.inlineData.data, 'base64');
            imageBuffers.push(buffer);
            console.log(`[Gemini] Extracted image: ${buffer.length} bytes`);
          }
        }
      }
    }

    if (imageBuffers.length === 0) {
      return {
        success: false,
        error: 'No image data received from Gemini API',
        generationTime: Date.now() - startTime
      };
    }

    const generationTime = Date.now() - startTime;
    console.log(`[Gemini] Generation completed in ${generationTime}ms`);

    return {
      success: true,
      imageBuffers,
      generationTime,
      metadata: {
        model,
        aspectRatio: request.aspectRatio || '1:1',
        resolution: request.imageSize || '1K',
        finishReason,
        safetyRatings
      }
    };

  } catch (error: any) {
    const generationTime = Date.now() - startTime;
    console.error('[Gemini] Generation error:', error);

    // Handle specific error types
    if (error.status === 429 || error.message?.includes('rate limit')) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again in a moment.',
        generationTime,
        retryable: true
      };
    }

    if (error.status === 401 || error.message?.includes('API key')) {
      return {
        success: false,
        error: 'Invalid API key. Please check GOOGLE_GEMINI_API_KEY environment variable.',
        generationTime,
        retryable: false
      };
    }

    if (error.status === 400) {
      return {
        success: false,
        error: `Invalid request: ${error.message}`,
        generationTime,
        retryable: false
      };
    }

    if (error.status >= 500) {
      return {
        success: false,
        error: 'Gemini service error. Please try again later.',
        generationTime,
        retryable: true
      };
    }

    return {
      success: false,
      error: error.message || 'Image generation failed',
      generationTime,
      retryable: true
    };
  }
}

/**
 * Generates multiple images by making parallel requests to Gemini
 *
 * Note: Gemini generates 1 image per request, so we make multiple requests
 * in parallel to generate multiple images.
 *
 * @param request - Generation request with numImages > 1
 * @returns Combined results from all generations
 */
export async function generateMultipleImagesWithGemini(
  request: ImageGenerationRequest
): Promise<ImageGenerationResult> {
  const numImages = request.numImages || 1;

  if (numImages === 1) {
    return generateImagesWithGemini(request);
  }

  console.log(`[Gemini] Generating ${numImages} images in parallel`);

  // Generate multiple images in parallel
  const promises = Array.from({ length: numImages }, () =>
    generateImagesWithGemini({ ...request, numImages: 1 })
  );

  const results = await Promise.all(promises);

  // Combine results
  const allImageBuffers: Buffer[] = [];
  const errors: string[] = [];
  let totalTime = 0;
  let anyRetryable = false;

  for (const result of results) {
    if (result.success && result.imageBuffers) {
      allImageBuffers.push(...result.imageBuffers);
    } else if (result.error) {
      errors.push(result.error);
      if (result.retryable) {
        anyRetryable = true;
      }
    }
    totalTime = Math.max(totalTime, result.generationTime || 0);
  }

  // If we got at least some images, consider it a success
  if (allImageBuffers.length > 0) {
    return {
      success: true,
      imageBuffers: allImageBuffers,
      generationTime: totalTime,
      error: errors.length > 0
        ? `Generated ${allImageBuffers.length}/${numImages} images. Errors: ${errors.join('; ')}`
        : undefined
    };
  }

  // All generations failed
  return {
    success: false,
    error: `All generations failed: ${errors.join('; ')}`,
    generationTime: totalTime,
    retryable: anyRetryable
  };
}

/**
 * Validates image generation request
 */
function validateRequest(request: ImageGenerationRequest): { valid: boolean; error?: string } {
  if (!request.prompt || request.prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt is required and cannot be empty' };
  }

  if (request.prompt.length > 5000) {
    return { valid: false, error: 'Prompt is too long (max 5000 characters)' };
  }

  const validAspectRatios = ['1:1', '16:9', '9:16', '4:3', '3:4'];
  if (request.aspectRatio && !validAspectRatios.includes(request.aspectRatio)) {
    return {
      valid: false,
      error: `Invalid aspect ratio. Must be one of: ${validAspectRatios.join(', ')}`
    };
  }

  if (request.numImages && (request.numImages < 1 || request.numImages > 4)) {
    return {
      valid: false,
      error: 'Number of images must be between 1 and 4'
    };
  }

  const validImageSizes = ['1K', '2K', '4K'];
  if (request.imageSize && !validImageSizes.includes(request.imageSize)) {
    return {
      valid: false,
      error: `Invalid image size. Must be one of: ${validImageSizes.join(', ')}`
    };
  }

  return { valid: true };
}

/**
 * Checks if a prompt requires text rendering (better with Gemini)
 *
 * Use this to decide when to use Gemini vs cheaper alternatives like FAL.ai
 *
 * @param prompt - The prompt text
 * @returns true if prompt likely requires text rendering
 */
export function detectTextRequirement(prompt: string): boolean {
  const textKeywords = [
    'text', 'sign', 'label', 'typography', 'words',
    'letters', 'title', 'caption', 'writing', 'quote',
    'message', 'banner', 'poster', 'billboard', 'book',
    'newspaper', 'magazine', 'graffiti', 'tattoo'
  ];

  const lowerPrompt = prompt.toLowerCase();
  return textKeywords.some(keyword => lowerPrompt.includes(keyword));
}

/**
 * Estimates the cost of a Gemini image generation
 *
 * @param model - The model to use
 * @param imageSize - The image resolution
 * @param numImages - Number of images to generate
 * @returns Estimated cost in USD
 */
export function estimateGeminiCost(
  model: string = 'gemini-2.5-flash-image',
  imageSize: string = '1K',
  numImages: number = 1
): number {
  let costPerImage = 0;

  if (model === 'gemini-2.5-flash-image') {
    // 1290 tokens per image at $30/1M tokens
    costPerImage = (1290 / 1_000_000) * 30; // $0.0387
  } else if (model === 'gemini-3-pro-image-preview') {
    // Vertex AI pricing
    const tokenCounts: Record<string, number> = {
      '1K': 1120,
      '2K': 1120,
      '4K': 2000
    };
    const tokens = tokenCounts[imageSize] || 1120;
    costPerImage = (tokens / 1_000_000) * 120; // $0.134 for 1K/2K, $0.240 for 4K
  }

  return costPerImage * numImages;
}

/**
 * Gets recommended model based on prompt and budget
 *
 * @param prompt - The prompt text
 * @param premium - Whether this is a premium/paid prompt
 * @returns Recommended model name
 */
export function getRecommendedModel(prompt: string, premium: boolean = false): string {
  const needsText = detectTextRequirement(prompt);

  // If prompt needs text rendering or is premium, use better model
  if (needsText || premium) {
    return 'gemini-2.5-flash-image';
  }

  // For standard prompts, recommend using FAL.ai instead (cheaper)
  // But if forced to use Gemini, use the flash model
  return 'gemini-2.5-flash-image';
}

// Export for testing
export const __testing__ = {
  validateRequest,
  detectTextRequirement,
  estimateGeminiCost,
  getRecommendedModel
};
