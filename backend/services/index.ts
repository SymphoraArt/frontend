/**
 * AIgency Backend Services
 *
 * Central export point for all backend services including image generation,
 * rate limiting, retry logic, variable substitution, and encryption.
 */

// TODO: Re-enable Gemini integration imports when files are available
// Image Generation Types
// export type {
//   ImageGenerationRequest,
//   ImageGenerationResult,
//   GenerationSettings
// } from './types';

// Google Gemini Image Generation
// export {
//   generateImagesWithGemini,
//   generateMultipleImagesWithGemini,
//   detectTextRequirement,
//   estimateGeminiCost,
//   getRecommendedModel
// } from './gemini-image-generation';

// Rate Limiting
// export {
//   generateWithRateLimit,
//   getRateLimiterStats,
//   isRateLimitDepleted,
//   estimateWaitTime,
//   updateRateLimitTier,
//   limiter
// } from './gemini-rate-limiter';

// Retry & Error Handling
// export {
//   withRetry,
//   generateWithRetry,
//   generateWithRetryAndCircuitBreaker,
//   batchWithRetry,
//   getRecommendedRetryConfig,
//   geminiCircuitBreaker,
//   RETRY_CONFIGS
// } from './gemini-retry-handler';

// export type { RetryConfig } from './gemini-retry-handler';

// Variable Substitution
export {
  substituteVariables,
  substituteVariablesWithPrompt
} from './variable-substitution';

export type { SubstitutionResult } from './variable-substitution';

// Generation Encryption
export {
  encryptFinalPrompt,
  decryptFinalPrompt,
  prepareEncryptedPromptForDB,
  hasCompleteEncryptionMetadata,
  safeDecryptFinalPrompt
} from './generation-encryption';
