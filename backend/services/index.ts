/**
 * AIgency Backend Services
 *
 * Central export point for all backend services including image generation,
 * rate limiting, retry logic, and utility functions.
 */

// Image Generation Types
export type {
  ImageGenerationRequest,
  ImageGenerationResult,
  GenerationSettings
} from './types';

// Google Gemini Image Generation
export {
  generateImagesWithGemini,
  generateMultipleImagesWithGemini,
  detectTextRequirement,
  estimateGeminiCost,
  getRecommendedModel
} from './gemini-image-generation';

// Rate Limiting
export {
  generateWithRateLimit,
  getRateLimiterStats,
  isRateLimitDepleted,
  estimateWaitTime,
  updateRateLimitTier,
  limiter
} from './gemini-rate-limiter';

// Retry & Error Handling
export {
  withRetry,
  generateWithRetry,
  generateWithRetryAndCircuitBreaker,
  batchWithRetry,
  getRecommendedRetryConfig,
  geminiCircuitBreaker,
  RETRY_CONFIGS
} from './gemini-retry-handler';

export type { RetryConfig } from './gemini-retry-handler';

// Variable Substitution (if exists)
// export { substituteVariables } from './variable-substitution';
