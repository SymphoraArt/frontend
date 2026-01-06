/**
 * Retry Handler for Google Gemini Image Generation
 *
 * Implements exponential backoff retry logic for handling transient errors
 * in Gemini API requests such as rate limits, network issues, and temporary
 * service disruptions.
 *
 * Features:
 * - Exponential backoff with jitter
 * - Configurable max retries
 * - Different retry strategies for different error types
 * - Detailed error logging
 */

import type { ImageGenerationRequest, ImageGenerationResult } from './types';

export interface RetryConfig {
  maxRetries?: number;           // Maximum number of retry attempts (default: 3)
  initialDelayMs?: number;       // Initial delay in milliseconds (default: 1000)
  maxDelayMs?: number;           // Maximum delay in milliseconds (default: 60000)
  backoffMultiplier?: number;    // Multiplier for exponential backoff (default: 2)
  jitterFactor?: number;         // Random jitter factor 0-1 (default: 0.1)
}

interface RetryState {
  attempt: number;
  lastError: Error | null;
  totalDelay: number;
}

const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 60000,
  backoffMultiplier: 2,
  jitterFactor: 0.1
};

/**
 * Executes a function with exponential backoff retry logic
 *
 * @param fn - Async function to execute
 * @param config - Retry configuration
 * @returns Result from function or throws last error
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const cfg = { ...DEFAULT_RETRY_CONFIG, ...config };
  const state: RetryState = {
    attempt: 0,
    lastError: null,
    totalDelay: 0
  };

  while (state.attempt <= cfg.maxRetries) {
    try {
      // Attempt the operation
      return await fn();
    } catch (error: any) {
      state.lastError = error;
      state.attempt++;

      // Check if we should retry
      if (!shouldRetry(error, state.attempt, cfg.maxRetries)) {
        console.error(`[Retry Handler] Max retries (${cfg.maxRetries}) exceeded or non-retryable error`);
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const delay = calculateDelay(state.attempt, cfg);
      state.totalDelay += delay;

      console.log(`[Retry Handler] Attempt ${state.attempt}/${cfg.maxRetries} failed: ${error.message}`);
      console.log(`[Retry Handler] Retrying in ${delay}ms... (total delay: ${state.totalDelay}ms)`);

      // Wait before retrying
      await sleep(delay);
    }
  }

  // Should never reach here, but TypeScript needs it
  throw state.lastError || new Error('Retry failed');
}

/**
 * Wraps Gemini image generation with retry logic
 *
 * @param generateFn - The generation function to wrap
 * @param request - Image generation request
 * @param config - Retry configuration
 * @returns Generation result
 */
export async function generateWithRetry(
  generateFn: (request: ImageGenerationRequest) => Promise<ImageGenerationResult>,
  request: ImageGenerationRequest,
  config: RetryConfig = {}
): Promise<ImageGenerationResult> {
  try {
    return await withRetry(
      () => generateFn(request),
      config
    );
  } catch (error: any) {
    // If all retries failed, return a failure result
    return {
      success: false,
      error: `Generation failed after ${config.maxRetries || 3} retries: ${error.message}`,
      retryable: false
    };
  }
}

/**
 * Determines if an error is retryable
 *
 * @param error - The error to check
 * @param currentAttempt - Current retry attempt number
 * @param maxRetries - Maximum allowed retries
 * @returns true if should retry
 */
function shouldRetry(error: any, currentAttempt: number, maxRetries: number): boolean {
  // Don't retry if we've exceeded max attempts
  if (currentAttempt > maxRetries) {
    return false;
  }

  // Check if error explicitly says it's retryable
  if (error.retryable === false) {
    return false;
  }

  // Retryable error types
  const retryableErrors = [
    // Rate limit errors
    'rate limit',
    '429',
    'quota exceeded',
    'too many requests',

    // Network errors
    'ECONNREFUSED',
    'ECONNRESET',
    'ETIMEDOUT',
    'ENOTFOUND',
    'network',
    'timeout',

    // Service errors
    'service unavailable',
    '503',
    'internal server error',
    '500',
    '502',
    '504',
    'gateway timeout',

    // Temporary Gemini errors
    'overloaded',
    'temporarily unavailable'
  ];

  const errorMessage = error.message?.toLowerCase() || '';
  const errorStatus = error.status?.toString() || '';

  return retryableErrors.some(
    retryableError =>
      errorMessage.includes(retryableError.toLowerCase()) ||
      errorStatus === retryableError
  );
}

/**
 * Calculates delay for next retry attempt using exponential backoff with jitter
 *
 * Formula: min(maxDelay, initialDelay * (backoffMultiplier ^ attempt)) + jitter
 *
 * @param attempt - Current attempt number (1-based)
 * @param config - Retry configuration
 * @returns Delay in milliseconds
 */
function calculateDelay(attempt: number, config: Required<RetryConfig>): number {
  // Exponential backoff: initialDelay * (backoffMultiplier ^ attempt)
  const exponentialDelay = config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt - 1);

  // Cap at maxDelay
  const cappedDelay = Math.min(exponentialDelay, config.maxDelayMs);

  // Add random jitter to prevent thundering herd
  const jitter = cappedDelay * config.jitterFactor * Math.random();

  return Math.floor(cappedDelay + jitter);
}

/**
 * Sleeps for specified milliseconds
 *
 * @param ms - Milliseconds to sleep
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Creates a retry configuration for specific error types
 */
export const RETRY_CONFIGS = {
  // For rate limit errors - longer delays
  rateLimitError: {
    maxRetries: 5,
    initialDelayMs: 5000,
    maxDelayMs: 120000,
    backoffMultiplier: 2,
    jitterFactor: 0.2
  } as RetryConfig,

  // For network errors - moderate delays
  networkError: {
    maxRetries: 3,
    initialDelayMs: 1000,
    maxDelayMs: 30000,
    backoffMultiplier: 2,
    jitterFactor: 0.1
  } as RetryConfig,

  // For service errors - quick retries
  serviceError: {
    maxRetries: 2,
    initialDelayMs: 500,
    maxDelayMs: 5000,
    backoffMultiplier: 3,
    jitterFactor: 0.1
  } as RetryConfig,

  // For production - balanced approach
  production: {
    maxRetries: 3,
    initialDelayMs: 2000,
    maxDelayMs: 60000,
    backoffMultiplier: 2,
    jitterFactor: 0.15
  } as RetryConfig,

  // For development - fail fast
  development: {
    maxRetries: 1,
    initialDelayMs: 500,
    maxDelayMs: 5000,
    backoffMultiplier: 2,
    jitterFactor: 0
  } as RetryConfig
};

/**
 * Gets recommended retry config based on error type
 *
 * @param error - The error to analyze
 * @returns Recommended retry configuration
 */
export function getRecommendedRetryConfig(error: any): RetryConfig {
  const errorMessage = error.message?.toLowerCase() || '';
  const errorStatus = error.status?.toString() || '';

  // Rate limit errors need longer backoff
  if (
    errorMessage.includes('rate limit') ||
    errorMessage.includes('429') ||
    errorStatus === '429'
  ) {
    return RETRY_CONFIGS.rateLimitError;
  }

  // Network errors need moderate backoff
  if (
    errorMessage.includes('network') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('ECONNREFUSED')
  ) {
    return RETRY_CONFIGS.networkError;
  }

  // Service errors need quick retries
  if (errorStatus === '500' || errorStatus === '503' || errorStatus === '502') {
    return RETRY_CONFIGS.serviceError;
  }

  // Default to production config
  return RETRY_CONFIGS.production;
}

/**
 * Batch retry handler - retries multiple operations in parallel
 *
 * @param operations - Array of async operations to execute
 * @param config - Retry configuration
 * @returns Array of results (successful or failed)
 */
export async function batchWithRetry<T>(
  operations: Array<() => Promise<T>>,
  config: RetryConfig = {}
): Promise<Array<T | Error>> {
  const results = await Promise.allSettled(
    operations.map(op => withRetry(op, config))
  );

  return results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return result.reason;
    }
  });
}

/**
 * Circuit breaker state for preventing cascading failures
 */
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000,
    private resetTime: number = 30000
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.resetTime) {
        this.state = 'half-open';
        console.log('[Circuit Breaker] Transitioning to half-open state');
      } else {
        throw new Error('Circuit breaker is OPEN - too many failures');
      }
    }

    try {
      const result = await fn();

      // Success - reset if in half-open state
      if (this.state === 'half-open') {
        this.state = 'closed';
        this.failureCount = 0;
        console.log('[Circuit Breaker] Circuit closed - service recovered');
      }

      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();

      if (this.failureCount >= this.threshold) {
        this.state = 'open';
        console.error(`[Circuit Breaker] Circuit OPENED after ${this.failureCount} failures`);
      }

      throw error;
    }
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime
    };
  }

  reset() {
    this.state = 'closed';
    this.failureCount = 0;
    this.lastFailureTime = 0;
    console.log('[Circuit Breaker] Circuit reset manually');
  }
}

// Export a global circuit breaker instance for Gemini
export const geminiCircuitBreaker = new CircuitBreaker(
  5,      // Open after 5 failures
  60000,  // 60 second timeout
  30000   // Try again after 30 seconds
);

/**
 * Generates images with both retry logic and circuit breaker protection
 *
 * @param generateFn - The generation function
 * @param request - Image generation request
 * @param config - Retry configuration
 * @returns Generation result
 */
export async function generateWithRetryAndCircuitBreaker(
  generateFn: (request: ImageGenerationRequest) => Promise<ImageGenerationResult>,
  request: ImageGenerationRequest,
  config: RetryConfig = {}
): Promise<ImageGenerationResult> {
  try {
    return await geminiCircuitBreaker.execute(() =>
      generateWithRetry(generateFn, request, config)
    );
  } catch (error: any) {
    console.error('[Retry Handler] Circuit breaker prevented execution:', error.message);

    return {
      success: false,
      error: `Service temporarily unavailable: ${error.message}`,
      retryable: true
    };
  }
}
