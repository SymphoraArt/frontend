/**
 * Central Generation Router
 *
 * Implements the core architecture mandated by PR #54 review:
 *   - Model-family pinned routing (no cross-model failover)
 *   - FIFO queueing when pool is saturated (instead of failing)
 *   - Tier 1 + Tier 2 Moderation pipeline
 *   - Wallet violation tracking
 *
 * ⚠️ SINGLE-INSTANCE CONSTRAINT: Concurrency and Queueing rely on in-memory state.
 * Do NOT run multiple backend instances before migrating to Redis.
 */

import { moderatePrompt, type ModerationResult, CLIENT_BLOCK_MESSAGE } from './content-moderation.js';
import { isWalletBlacklisted, recordViolation } from './wallet-blacklist.js';
import { concurrencyTracker, type KeyHealth } from './concurrency-tracker.js';
import { loadProviderConfig, maskApiKey, type RoutingConfig } from './provider-config.js';
import { generateImageWithWaveSpeed } from './wavespeed-image-generation.js';
import { generateImageWithOpenAI } from './openai-image-generation.js';
import { generateImagesWithGemini } from './gemini-image-generation.js';
import { enqueue, dequeue } from './generation-queue.js';
import type { ImageGenerationRequest, ImageGenerationResult, ModelFamily } from './types.js';

// Side-effect import: registers omni-moderation as Tier 2 in content-moderation.ts
import './openai-moderation.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

let config: RoutingConfig | null = null;

// Initialize metrics
let totalRequests = 0;
let totalModBlocked = 0;
let totalBlacklistBlocked = 0;

// ---------------------------------------------------------------------------
// Main Entry Point
// ---------------------------------------------------------------------------

/**
 * Main entry point for generating images.
 * Handles moderation, blacklists, queueing, routing, and provider fallbacks.
 */
export async function routeImageGeneration(
  request: ImageGenerationRequest & { walletAddress?: string; modelFamily?: ModelFamily },
  onQueued?: () => void
): Promise<ImageGenerationResult> {
  const startTime = Date.now();
  totalRequests++;

  // Load configuration if not yet loaded
  if (!config) {
    config = loadProviderConfig();

    // Register all keys from all pools with the concurrency tracker
    for (const pool of config.pools.values()) {
      for (const key of pool.keys) {
        concurrencyTracker.registerKey(key.id, pool.maxConcurrencyPerKey);
      }
    }
  }

  // --- Step 1: Content Moderation ---
  const moderation = await moderatePrompt(request.prompt);
  if (!moderation.allowed) {
    totalModBlocked++;

    if (request.walletAddress) {
      recordViolation(
        request.walletAddress,
        `Tier ${moderation.tier}: ${moderation.reason}`,
        request.prompt,
        moderation.severity || 'strike'
      ).catch((err) =>
        console.error('[GenerationRouter] Failed to record violation:', err)
      );
    }

    console.warn(
      `[GenerationRouter] Prompt BLOCKED (Tier ${moderation.tier}, ` +
      `severity: ${moderation.severity}): ${moderation.reason}`
    );

    return {
      success: false,
      error: CLIENT_BLOCK_MESSAGE,
      generationTime: Date.now() - startTime,
    };
  }

  // --- Step 2: Wallet Blacklist Check ---
  if (request.walletAddress) {
    const blacklisted = await isWalletBlacklisted(request.walletAddress);
    if (blacklisted) {
      totalBlacklistBlocked++;
      console.warn(`[GenerationRouter] Wallet ${request.walletAddress} is blacklisted.`);
      return {
        success: false,
        error: 'Your wallet has been banned for repeated content policy violations.',
        generationTime: Date.now() - startTime,
      };
    }
  }

  // --- Step 3: Determine Model Pool ---
  const modelFamily: ModelFamily = request.modelFamily || config.defaultFamily;
  const pool = config.pools.get(modelFamily);

  if (!pool) {
    return {
      success: false,
      error: `Model family '${modelFamily}' is not configured or unavailable.`,
      generationTime: Date.now() - startTime,
    };
  }

  console.log(`[GenerationRouter] Routing to pool: ${modelFamily} (${pool.keys.length} keys)`);

  // --- Step 4: Acquire Slot & Queueing ---
  let availableKeyId: string | null = null;
  let didWaitInQueue = false;

  // Try to find an available key immediately
  availableKeyId = concurrencyTracker.findAvailableKey(pool.keyIds);

  if (!availableKeyId) {
    console.log(`[GenerationRouter] Pool ${modelFamily} at capacity. Enqueueing request.`);
    didWaitInQueue = true;
    if (onQueued) onQueued(); // Signal client that request is queued

    // Enqueue returns a promise that resolves when a slot frees up
    const acquired = await enqueue(modelFamily);
    if (!acquired) {
      // Aborted by safety valve (timeout) or queue full
      return {
        success: false,
        error: 'Generation queue timed out. Please try again later.',
        errorCode: 'queue_timeout',
        generationTime: Date.now() - startTime,
        retryable: true,
      };
    }

    // Try finding the key again now that we've been dequeued
    availableKeyId = concurrencyTracker.findAvailableKey(pool.keyIds);

    // Rare race condition: if it somehow got stolen, we fail-safe
    if (!availableKeyId) {
      return {
        success: false,
        error: 'Failed to acquire slot after queue wait. System under heavy load.',
        generationTime: Date.now() - startTime,
        retryable: true,
      };
    }
  }

  // Atomically acquire the slot
  if (!concurrencyTracker.acquireSlot(availableKeyId)) {
    return {
      success: false,
      error: 'Concurrency slot acquisition failed. System under heavy load.',
      generationTime: Date.now() - startTime,
      retryable: true,
    };
  }

  // Find the exact config for the acquired key
  const keyConfig = pool.keys.find(k => k.id === availableKeyId)!;

  console.log(
    `[GenerationRouter] Acquired slot on key ${availableKeyId} ` +
    `(${keyConfig.provider}, pool: ${modelFamily})`
  );

  // --- Step 5: Provider Execution ---
  try {
    // Override the model version for the exact pinned version configured for this key
    const providerRequest = {
      ...request,
      modelVersion: keyConfig.modelVersion,
    };

    let result: ImageGenerationResult;

    switch (keyConfig.provider) {
      case 'wavespeed':
        result = await generateImageWithWaveSpeed(providerRequest, keyConfig.apiKey);
        break;
      case 'openai':
        result = await generateImageWithOpenAI(providerRequest, keyConfig.apiKey);
        break;
      case 'gemini':
        // Using existing gemini provider wrapper
        result = await generateImagesWithGemini(providerRequest);
        break;
      default:
        throw new Error(`Unknown provider: ${keyConfig.provider}`);
    }

    // Handle provider safety blocks (Tier 3)
    if (
      !result.success &&
      (result.metadata?.finishReason === 'SAFETY' ||
       result.errorCode === 'moderation_blocked' ||
       result.errorCode === 'content_policy_violation' ||
       result.errorCode === 'safety_system')
    ) {
      console.warn(`[GenerationRouter] Provider ${keyConfig.provider} SAFETY block`);

      if (request.walletAddress) {
        recordViolation(
          request.walletAddress,
          `Tier 3 (${keyConfig.provider} safety block): ${result.error}`,
          request.prompt,
          'strike'
        ).catch(err => console.error('[GenerationRouter] Failed to record violation:', err));
      }

      // Return generic client message
      result.error = CLIENT_BLOCK_MESSAGE;
    }

    // Rate limit backoff (if provider returns 429)
    if (
      !result.success &&
      (result.error?.includes('rate limit') || result.error?.includes('429'))
    ) {
      console.warn(`[GenerationRouter] Provider ${keyConfig.provider} returned 429. Cooldown key.`);
      concurrencyTracker.cooldownKey(availableKeyId, 60_000); // 60s cooldown
    }

    // Inject our metadata
    return {
      ...result,
      metadata: {
        ...result.metadata,
        model: keyConfig.modelVersion,
        aspectRatio: request.aspectRatio || '1:1',
        resolution: '1K',
      }
    };
  } catch (error: any) {
    console.error(`[GenerationRouter] Unexpected execution error: ${error.message}`);
    return {
      success: false,
      error: 'Unexpected generation error',
      generationTime: Date.now() - startTime,
      retryable: true,
    };
  } finally {
    // ALWAYS release the slot
    concurrencyTracker.releaseSlot(availableKeyId, true);

    // Dequeue the next waiting request in this pool if any
    // This fixes the "ratelimit sudden stoppage error" by ensuring
    // the queue keeps flowing whenever a slot frees up.
    dequeue(modelFamily);
  }
}

// ---------------------------------------------------------------------------
// Health and Metrics
// ---------------------------------------------------------------------------

export function getRouterMetrics() {
  if (!config) return null;

  const poolStats: Record<string, any> = {};
  for (const [family, pool] of config.pools.entries()) {
    poolStats[family] = concurrencyTracker.getGroupStats(pool.keyIds);
  }

  return {
    totalRequests,
    totalModBlocked,
    totalBlacklistBlocked,
    activeKeys: concurrencyTracker.getAllHealth(),
    poolStats,
  };
}

// For testing
export function __testing_resetRouter() {
  config = null;
  totalRequests = 0;
  totalModBlocked = 0;
  totalBlacklistBlocked = 0;
}
