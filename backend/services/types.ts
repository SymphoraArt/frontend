/**
 * Types and interfaces for image generation services
 *
 * PR #54 review changes:
 *   - modelFamily is REQUIRED (determines which key pool to use)
 *   - numImages clamped to 1 (Multi endpoint batch is a future feature)
 */

/** Available model families. Determines which key pool is used for routing. */
export type ModelFamily = 'nano-banana-pro' | 'gpt-image-2';

export interface ImageGenerationRequest {
  prompt: string;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  /** Always 1. Platform ships with single image generation. */
  numImages?: 1;
  /** Exact model version string pinned per host */
  modelVersion?: string;
  imageSize?: '1K' | '2K' | '4K';
  safetySettings?: any[];
}

export interface ImageGenerationResult {
  success: boolean;
  imageUrls?: string[];
  imageBuffers?: Buffer[];
  error?: string;
  generationTime?: number;
  retryable?: boolean;
  /** Machine-readable error code from provider (PR #54 #12) */
  errorCode?: string;
  metadata?: {
    model: string;
    aspectRatio: string;
    resolution: string;
    finishReason?: string;
    safetyRatings?: any[];
  };
}

export interface GenerationSettings {
  aspectRatio?: string;
  /** Always 1 at launch */
  numImages?: 1;
  modelVersion?: string;
  /** Which model family the user selected and paid for */
  modelFamily?: ModelFamily;
  additionalParams?: Record<string, any>;
}

