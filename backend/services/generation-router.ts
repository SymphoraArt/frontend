/**
 * Generation Router - The Unified Orchestrator
 *
 * This is the core of the API handling architecture discussed in all brainstorm
 * files and api_algo_improvements.md. It wires together:
 *
 *   1. Content Moderation (3-tier safety filter)
 *   2. Wallet Blacklist (repeat offender blocking)
 *   3. Pessimistic Concurrency Tracker (pre-emptive multi-key routing)
 *   4. Vertical Failover Chain (WaveSpeed -> OpenAI -> Gemini)
 *
 * Flow:
 *   Request -> Moderation -> Blacklist Check -> Route to Provider -> Generate -> Cleanup
 *
 * The user NEVER sees a "Failed" error as long as at least one provider
 * in the chain is available.
 *
 * Security:
 *   - All API keys remain server-side (never exposed to clients)
 *   - Moderation runs BEFORE payment settlement to avoid charging for blocked prompts
 *   - Wallet blacklisting prevents repeat abuse
 */

import { moderatePrompt, type ModerationResult } from './content-moderation.js';
import { isWalletBlacklisted, recordViolation } from './wallet-blacklist.js';
import { concurrencyTracker, type KeyHealth } from './concurrency-tracker.js';
import { loadProviderConfig, maskApiKey, type ProviderKeyConfig, type RoutingConfig } from './provider-config.js';
import { generateImageWithWaveSpeed } from './wavespeed-image-generation.js';
import { generateImageWithOpenAI } from './openai-image-generation.js';
import { generateImagesWithGemini } from './gemini-image-generation.js';
import type { ImageGenerationRequest, ImageGenerationResult } from './types.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RouterRequest {
  /** The user's prompt */
  prompt: string;
  /** The user's wallet address (for blacklist checks and violation logging) */
  walletAddress?: string;
  /** Aspect ratio */
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  /** Number of images (default: 1) */
  numImages?: number;
  /** Optional model preference (overrides routing) */
  modelVersion?: string;
  /** Image size for providers that support it */
  imageSize?: '1K' | '2K' | '4K';
}

export interface RouterResult {
  /** Whether generation succeeded */
  success: boolean;
  /** Image buffers if successful */
  imageBuffers?: Buffer[];
  /** Error message if failed */
  error?: string;
  /** Which provider handled the request */
  provider?: string;
  /** Which specific key was used (masked for logging) */
  keyUsed?: string;
  /** Total processing time including moderation */
  totalTimeMs: number;
  /** Moderation result */
  moderation: ModerationResult;
  /** Whether the prompt was blocked by the provider's native safety (Tier 3) */
  providerSafetyBlock?: boolean;
  /** Image metadata */
  metadata?: {
    model: string;
    aspectRatio: string;
    resolution: string;
    finishReason?: string;
  };
}

export interface RouterStatus {
  /** Whether the router is initialized */
  initialized: boolean;
  /** Provider tier status */
  tiers: Array<{
    provider: string;
    tierLabel: string;
    keyCount: number;
    totalActive: number;
    totalCapacity: number;
    availableSlots: number;
    keysInCooldown: number;
  }>;
  /** Total requests served since startup */
  totalRouted: number;
  /** Total requests blocked by moderation */
  totalModBlocked: number;
  /** Total requests blocked by blacklist */
  totalBlacklistBlocked: number;
  /** Total provider failovers */
  totalFailovers: number;
}

// ---------------------------------------------------------------------------
// Router State
// ---------------------------------------------------------------------------

let config: RoutingConfig | null = null;
let routerInitialized = false;

// Metrics
let totalRouted = 0;
let totalModBlocked = 0;
let totalBlacklistBlocked = 0;
let totalFailovers = 0;

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------

/**
 * Initializes the generation router.
 *
 * Must be called once at startup (e.g., in the generation worker or app.ts).
 * Loads provider config from env vars and registers all keys with the
 * concurrency tracker.
 */
export function initializeRouter(): void {
  if (routerInitialized) {
    console.warn('[GenerationRouter] Already initialized, skipping');
    return;
  }

  config = loadProviderConfig();

  // Register all keys with the concurrency tracker
  for (const tier of config.tiers) {
    for (const key of tier.keys) {
      concurrencyTracker.registerKey(key.id, tier.maxConcurrencyPerKey);
    }
    console.log(
      `[GenerationRouter] Registered ${tier.keys.length} ${tier.provider} key(s) ` +
      `with max ${tier.maxConcurrencyPerKey} concurrency each`
    );
  }

  routerInitialized = true;
  console.log(
    `[GenerationRouter] Initialized with ${config.tiers.length} tier(s), ` +
    `${config.totalKeys} total key(s)`
  );
}

// ---------------------------------------------------------------------------
// Core Routing Logic
// ---------------------------------------------------------------------------

/**
 * Dispatches a generation request to the appropriate provider.
 *
 * @param key - The selected API key config
 * @param request - The generation request
 * @returns ImageGenerationResult from the provider
 */
async function dispatchToProvider(
  key: ProviderKeyConfig,
  request: ImageGenerationRequest
): Promise<ImageGenerationResult> {
  switch (key.provider) {
    case 'wavespeed':
      return generateImageWithWaveSpeed(request, key.apiKey);

    case 'openai':
      return generateImageWithOpenAI(request, key.apiKey);

    case 'gemini':
      // Gemini uses the globally configured client (key is in env)
      return generateImagesWithGemini(request);

    default:
      return {
        success: false,
        error: `Unknown provider: ${key.provider}`,
        retryable: false,
      };
  }
}

/**
 * Routes a generation request through the full pipeline.
 *
 * This is the main entry point. It:
 *   1. Runs content moderation (Tier 1 + Tier 2)
 *   2. Checks wallet blacklist
 *   3. Finds an available key via pessimistic concurrency control
 *   4. Dispatches to the selected provider
 *   5. Handles provider safety blocks (Tier 3)
 *   6. Fails over to next tier if needed
 *   7. Guarantees slot cleanup via `finally`
 *
 * @param request - The router request
 * @returns RouterResult with full context
 */
export async function routeGeneration(request: RouterRequest): Promise<RouterResult> {
  const startTime = Date.now();

  // Ensure router is initialized
  if (!routerInitialized || !config) {
    initializeRouter();
    if (!config) {
      return {
        success: false,
        error: 'Generation router failed to initialize: no providers configured',
        totalTimeMs: Date.now() - startTime,
        moderation: {
          allowed: true,
          reason: null,
          tier: null,
          flaggedTerms: [],
          processingTimeMs: 0,
        },
      };
    }
  }

  // --- Step 1: Content Moderation ---
  const moderation = await moderatePrompt(request.prompt);
  if (!moderation.allowed) {
    totalModBlocked++;

    // Record violation if wallet is provided
    if (request.walletAddress) {
      // Fire-and-forget: don't block the response on DB write
      recordViolation(
        request.walletAddress,
        `Tier ${moderation.tier}: ${moderation.reason}`,
        request.prompt
      ).catch((err) =>
        console.error('[GenerationRouter] Failed to record violation:', err)
      );
    }

    console.warn(
      `[GenerationRouter] Prompt BLOCKED by moderation (Tier ${moderation.tier}): ` +
      `${moderation.reason}`
    );

    return {
      success: false,
      error: moderation.reason || 'Content blocked by moderation',
      totalTimeMs: Date.now() - startTime,
      moderation,
    };
  }

  // --- Step 2: Wallet Blacklist Check ---
  if (request.walletAddress) {
    const blacklisted = await isWalletBlacklisted(request.walletAddress);
    if (blacklisted) {
      totalBlacklistBlocked++;
      console.warn(
        `[GenerationRouter] BLACKLISTED wallet: ${request.walletAddress}`
      );
      return {
        success: false,
        error: 'Your account has been suspended due to repeated policy violations',
        totalTimeMs: Date.now() - startTime,
        moderation,
      };
    }
  }

  // --- Step 3: Build the generation request ---
  const genRequest: ImageGenerationRequest = {
    prompt: request.prompt,
    aspectRatio: request.aspectRatio || '1:1',
    numImages: request.numImages || 1,
    modelVersion: request.modelVersion,
    imageSize: request.imageSize,
  };

  // --- Step 4: Route through tiers with failover ---
  let lastError: string = 'No providers available';

  for (const tier of config!.tiers) {
    // Find an available key in this tier
    const availableKeyId = concurrencyTracker.findAvailableKey(tier.keyIds);
    if (!availableKeyId) {
      // All keys in this tier are at capacity; try next tier
      console.log(
        `[GenerationRouter] ${tier.tierLabel}: all keys at capacity, failing over`
      );
      totalFailovers++;
      continue;
    }

    // Find the actual key config
    const keyConfig = tier.keys.find((k) => k.id === availableKeyId);
    if (!keyConfig) {
      console.error(
        `[GenerationRouter] Key ${availableKeyId} not found in tier config`
      );
      continue;
    }

    // Acquire the slot
    const acquired = concurrencyTracker.acquireSlot(availableKeyId);
    if (!acquired) {
      // Race condition (extremely unlikely in single-threaded Node.js)
      console.warn(
        `[GenerationRouter] Failed to acquire slot for ${availableKeyId}, trying next`
      );
      continue;
    }

    try {
      console.log(
        `[GenerationRouter] Dispatching to ${tier.provider} ` +
        `(key: ${maskApiKey(keyConfig.apiKey)}, active: ${concurrencyTracker.getActiveCount(availableKeyId)})`
      );

      const result = await dispatchToProvider(keyConfig, genRequest);
      totalRouted++;

      // Check for provider safety block (Tier 3 moderation)
      if (
        !result.success &&
        result.metadata?.finishReason === 'SAFETY'
      ) {
        console.warn(
          `[GenerationRouter] Provider ${tier.provider} SAFETY block on prompt`
        );

        // Release the slot as failed
        concurrencyTracker.releaseSlot(availableKeyId, false);

        // Record violation for the wallet
        if (request.walletAddress) {
          recordViolation(
            request.walletAddress,
            `Tier 3 (${tier.provider} safety block): ${result.error}`,
            request.prompt
          ).catch((err) =>
            console.error('[GenerationRouter] Failed to record violation:', err)
          );
        }

        return {
          success: false,
          error: 'Image generation blocked by content safety filters',
          provider: tier.provider,
          keyUsed: maskApiKey(keyConfig.apiKey),
          totalTimeMs: Date.now() - startTime,
          moderation,
          providerSafetyBlock: true,
          metadata: result.metadata,
        };
      }

      if (result.success) {
        // Release the slot as successful
        concurrencyTracker.releaseSlot(availableKeyId, true);

        return {
          success: true,
          imageBuffers: result.imageBuffers,
          provider: tier.provider,
          keyUsed: maskApiKey(keyConfig.apiKey),
          totalTimeMs: Date.now() - startTime,
          moderation,
          metadata: result.metadata,
        };
      }

      // Generation failed but NOT a safety block -- try failover
      concurrencyTracker.releaseSlot(availableKeyId, false);
      lastError = result.error || 'Generation failed';

      // If rate-limited, put the key in cooldown
      if (result.error?.includes('rate limit')) {
        concurrencyTracker.cooldownKey(availableKeyId, 60_000);
      }

      console.warn(
        `[GenerationRouter] ${tier.provider} failed: ${lastError}. Trying next tier.`
      );
      totalFailovers++;
      // Continue to the next tier
    } catch (error: any) {
      // Unexpected error -- release slot and try next tier
      concurrencyTracker.releaseSlot(availableKeyId, false);
      lastError = error.message || 'Unexpected generation error';

      console.error(
        `[GenerationRouter] Unexpected error with ${tier.provider}: ${lastError}`
      );
      totalFailovers++;
      // Continue to the next tier
    }
  }

  // All tiers exhausted
  console.error(
    `[GenerationRouter] ALL PROVIDERS EXHAUSTED. Last error: ${lastError}`
  );

  return {
    success: false,
    error: `All generation providers are currently unavailable. Please try again in a moment. (${lastError})`,
    totalTimeMs: Date.now() - startTime,
    moderation,
  };
}

// ---------------------------------------------------------------------------
// Status / Health
// ---------------------------------------------------------------------------

/**
 * Returns the current status of the generation router.
 * Useful for admin dashboards and monitoring.
 */
export function getRouterStatus(): RouterStatus {
  const tiers =
    config?.tiers.map((tier) => {
      const stats = concurrencyTracker.getGroupStats(tier.keyIds);
      return {
        provider: tier.provider,
        tierLabel: tier.tierLabel,
        keyCount: tier.keys.length,
        totalActive: stats.totalActive,
        totalCapacity: stats.totalCapacity,
        availableSlots: stats.availableSlots,
        keysInCooldown: stats.keysInCooldown,
      };
    }) || [];

  return {
    initialized: routerInitialized,
    tiers,
    totalRouted,
    totalModBlocked,
    totalBlacklistBlocked,
    totalFailovers,
  };
}

/**
 * Resets the router (for testing only).
 */
export function resetRouter(): void {
  config = null;
  routerInitialized = false;
  totalRouted = 0;
  totalModBlocked = 0;
  totalBlacklistBlocked = 0;
  totalFailovers = 0;
  concurrencyTracker.reset();
}
