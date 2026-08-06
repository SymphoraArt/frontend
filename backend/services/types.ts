/**
 * Types and interfaces for image generation services
 */

export interface ImageGenerationRequest {
  prompt: string;
  /**
   * Every ratio gemini-2.5-flash-image accepts, verified by real API calls
   * (2026-08-06) rather than from the docs alone:
   *   1:1 1024x1024 · 2:3 832x1248 · 3:2 1248x832 · 3:4 864x1184
   *   4:3 1184x864  · 4:5 896x1152 · 5:4 1152x896 · 9:16 768x1344
   *   16:9 1344x768 · 21:9 1536x672
   * The union used to list only five, which rejected 4:5 — a ratio the live
   * models table offers users. Undefined means "let the provider decide".
   */
  aspectRatio?: '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '4:5' | '5:4' | '9:16' | '16:9' | '21:9';
  numImages?: number; // 1-4
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
  metadata?: {
    model: string;
    aspectRatio: string;
    /**
     * What actually came back — "2048x2048", measured from the image itself.
     * This used to echo the REQUESTED size, so a record could claim 2K for an
     * image the model never rendered at 2K. Null when the bytes could not be
     * read.
     */
    resolution: string | null;
    /** What we asked for, kept separately so the two can be compared. */
    requestedSize?: string | null;
    /** Actual byte length of the first image. */
    bytes?: number | null;
    /** Actual container format, "png" or "jpeg". */
    format?: string | null;
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
