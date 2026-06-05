/**
 * Types and interfaces for image generation services
 */

export interface ImageGenerationRequest {
  prompt: string;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  numImages?: number; // 1-4
  modelVersion?: string;
  imageSize?: '1K' | '2K' | '4K';
  safetySettings?: any[];
  /**
   * Optional reference images for image-guided generation / editing. Each entry
   * is a data URL ("data:image/png;base64,...") or a raw base64 string. They are
   * sent to Gemini as inlineData parts alongside the text prompt.
   */
  referenceImages?: string[];
}

export interface ImageGenerationResult {
  success: boolean;
  imageUrls?: string[];
  imageBuffers?: Buffer[];
  error?: string;
  generationTime?: number;
  retryable?: boolean;
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
  numImages?: number;
  modelVersion?: string;
  additionalParams?: Record<string, any>;
}
