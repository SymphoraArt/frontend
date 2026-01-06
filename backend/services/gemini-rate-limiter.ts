/**
 * Rate Limiter for Google Gemini Image Generation
 *
 * Implements rate limiting to comply with Gemini API quotas:
 *
 * Free Tier:
 * - 2 images per minute (IPM)
 * - 10 requests per minute (RPM)
 * - 250 requests per day (RPD)
 *
 * Paid Tier 1:
 * - 10 images per minute (IPM)
 * - 150-300 requests per minute (RPM)
 * - Unlimited daily quota
 *
 * Usage:
 * ```typescript
 * import { generateWithRateLimit } from './gemini-rate-limiter';
 *
 * const result = await generateWithRateLimit({
 *   prompt: 'A beautiful sunset',
 *   aspectRatio: '16:9'
 * });
 * ```
 */

import Bottleneck from 'bottleneck';
import { generateImagesWithGemini, generateMultipleImagesWithGemini } from './gemini-image-generation';
import type { ImageGenerationRequest, ImageGenerationResult } from './types';

// Determine tier from environment variable
const GEMINI_TIER = process.env.GEMINI_TIER || 'free'; // 'free' or 'paid'

// Rate limit configuration based on tier
const RATE_LIMITS = {
  free: {
    maxConcurrent: 1, // Process one at a time
    minTime: 30000,   // 30 seconds between requests = 2/minute
    reservoir: 250,   // Daily request limit
    reservoirRefreshAmount: 250,
    reservoirRefreshInterval: 24 * 60 * 60 * 1000 // 24 hours
  },
  paid: {
    maxConcurrent: 2, // Process two at a time
    minTime: 6000,    // 6 seconds between requests = 10/minute
    reservoir: 10000, // High daily limit (effectively unlimited)
    reservoirRefreshAmount: 10000,
    reservoirRefreshInterval: 24 * 60 * 60 * 1000
  }
};

const config = RATE_LIMITS[GEMINI_TIER as keyof typeof RATE_LIMITS] || RATE_LIMITS.free;

/**
 * Bottleneck limiter instance for Gemini API
 *
 * Automatically handles rate limiting and request queuing
 */
const limiter = new Bottleneck({
  maxConcurrent: config.maxConcurrent,
  minTime: config.minTime,
  reservoir: config.reservoir,
  reservoirRefreshAmount: config.reservoirRefreshAmount,
  reservoirRefreshInterval: config.reservoirRefreshInterval,

  // Retry configuration
  retryOnce: true,

  // Exponential backoff for retries
  id: 'gemini-rate-limiter',
  datastore: 'local',

  // Track stats
  trackDoneStatus: true,
});

// Log rate limiter events
limiter.on('failed', async (error, jobInfo) => {
  console.error('[Gemini Rate Limiter] Job failed:', {
    error: error.message,
    retryCount: jobInfo.retryCount
  });

  // Retry on rate limit errors (429)
  if (error.message?.includes('rate limit') || error.message?.includes('429')) {
    const retryAfter = 30000; // 30 seconds
    console.log(`[Gemini Rate Limiter] Retrying after ${retryAfter}ms`);
    return retryAfter;
  }

  // Don't retry on other errors
  return undefined;
});

// Note: Bottleneck doesn't have a 'retry' event in the type definitions
// Retry logic is handled in the 'failed' event handler above

limiter.on('depleted', (empty) => {
  if (empty) {
    console.warn('[Gemini Rate Limiter] Rate limit depleted! Requests will be queued.');
  }
});

limiter.on('done', (info) => {
  console.log('[Gemini Rate Limiter] Job completed:', {
    id: info.options.id,
    retryCount: info.retryCount
  });
});

/**
 * Generate images with automatic rate limiting
 *
 * This wraps the Gemini generation function with rate limiting
 * to ensure compliance with API quotas.
 *
 * @param request - Image generation request
 * @returns Generation result
 */
export async function generateWithRateLimit(
  request: ImageGenerationRequest
): Promise<ImageGenerationResult> {
  const jobId = `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  console.log(`[Gemini Rate Limiter] Scheduling job: ${jobId}`);
  console.log(`[Gemini Rate Limiter] Current stats:`, {
    queued: limiter.counts().QUEUED,
    running: limiter.counts().RUNNING,
    executing: limiter.counts().EXECUTING
  });

  try {
    // Check if multiple images requested
    const numImages = request.numImages || 1;

    if (numImages > 1) {
      // Use the rate limiter to schedule the multi-image generation
      return await limiter.schedule(
        { id: jobId },
        () => generateMultipleImagesWithGemini(request)
      );
    } else {
      // Single image generation
      return await limiter.schedule(
        { id: jobId },
        () => generateImagesWithGemini(request)
      );
    }
  } catch (error: any) {
    console.error(`[Gemini Rate Limiter] Job ${jobId} failed:`, error);

    return {
      success: false,
      error: error.message || 'Rate limited generation failed',
      retryable: true
    };
  }
}

/**
 * Gets current rate limiter statistics
 *
 * Useful for monitoring and debugging
 */
export function getRateLimiterStats() {
  const counts = limiter.counts();

  return {
    tier: GEMINI_TIER,
    config: {
      maxConcurrent: config.maxConcurrent,
      minTime: config.minTime,
      imagesPerMinute: 60000 / config.minTime,
      dailyLimit: config.reservoir
    },
    current: {
      queued: counts.QUEUED,
      running: counts.RUNNING,
      executing: counts.EXECUTING,
      done: counts.DONE
    }
  };
}

/**
 * Checks if rate limiter is currently depleted
 *
 * @returns true if rate limit is exhausted
 */
export function isRateLimitDepleted(): boolean {
  const counts = limiter.counts();
  return counts.QUEUED > 0 && counts.EXECUTING >= config.maxConcurrent;
}

/**
 * Estimates wait time for next available slot
 *
 * @returns Estimated wait time in milliseconds
 */
export async function estimateWaitTime(): Promise<number> {
  const counts = limiter.counts();

  if (counts.QUEUED === 0 && counts.EXECUTING < config.maxConcurrent) {
    return 0; // Can run immediately
  }

  // Estimate based on queue size and min time
  const queuePosition = counts.QUEUED + 1;
  const executingSlots = Math.max(0, counts.EXECUTING);
  const waitTime = (queuePosition / config.maxConcurrent) * config.minTime;

  return Math.ceil(waitTime);
}

/**
 * Clears the rate limiter queue
 *
 * WARNING: Only use this for testing or emergency situations
 */
export function clearRateLimiterQueue(): void {
  console.warn('[Gemini Rate Limiter] Clearing queue (emergency stop)');
  limiter.stop({ dropWaitingJobs: true });
}

/**
 * Updates rate limit configuration dynamically
 *
 * Use this when upgrading from free to paid tier
 *
 * @param tier - 'free' or 'paid'
 */
export function updateRateLimitTier(tier: 'free' | 'paid'): void {
  const newConfig = RATE_LIMITS[tier];

  console.log(`[Gemini Rate Limiter] Updating tier to: ${tier}`);

  limiter.updateSettings({
    maxConcurrent: newConfig.maxConcurrent,
    minTime: newConfig.minTime,
    reservoir: newConfig.reservoir,
    reservoirRefreshAmount: newConfig.reservoirRefreshAmount
  });

  console.log('[Gemini Rate Limiter] New settings:', {
    maxConcurrent: newConfig.maxConcurrent,
    imagesPerMinute: 60000 / newConfig.minTime,
    dailyLimit: newConfig.reservoir
  });
}

// Export limiter for advanced usage
export { limiter };
