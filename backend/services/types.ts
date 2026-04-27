/**
 * Types and interfaces for image generation services
 */

export interface ImageGenerationRequest {
  prompt: string;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  numImages?: number; // 1-4
  modelVersion?: string;
  imageSize?: '1K' | '2K' | '4K';
  /** Single reference image as data URL (legacy). */
  referenceImage?: string;
  /** Multiple reference images as data URLs. */
  referenceImages?: string[];
  safetySettings?: any[];
}

/** Token usage from Gemini generateContent response (for exact cost calculation). */
export interface GeminiUsageMetadata {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  totalTokenCount?: number;
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
    requestedResolution?: string;
    resolutionApplied?: boolean;
    finishReason?: string;
    safetyRatings?: any[];
    /** Actual token usage from API (used for exact billing). */
    usageMetadata?: GeminiUsageMetadata;
  };
}

export interface GenerationSettings {
  aspectRatio?: string;
  numImages?: number;
  modelVersion?: string;
  additionalParams?: Record<string, any>;
}
