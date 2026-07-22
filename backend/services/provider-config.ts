/**
 * Provider Configuration - Per-Model-Family Key Pools
 *
 * PR #54 review redesign (section 2.1-2.2):
 *   - Routing is by MODEL FAMILY, not by flat tier order
 *   - No cross-generator failover (user paid for a specific model)
 *   - Failover is only between vendors serving the SAME model
 *
 * Pool architecture:
 *   nano-banana-pro: WaveSpeed keys (Multi-T2I) -> Gemini host (same model)
 *   gpt-image-2:     OpenAI keys -> WaveSpeed host (serves GPT Image 2)
 *
 * Security: API keys are loaded from server-side environment variables ONLY.
 *           They are never exposed to the client or logged in full.
 */

import type { ModelFamily } from './types.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProviderKeyConfig {
  /** Unique ID for this specific key (e.g., "wavespeed_0", "openai_1") */
  id: string;
  /** The actual API key value */
  apiKey: string;
  /** Provider vendor name */
  provider: 'wavespeed' | 'openai' | 'gemini';
  /** Exact model version string to pin on this vendor */
  modelVersion: string;
}

export interface PoolConfig {
  /** Which model family this pool serves */
  modelFamily: ModelFamily;
  /** Human-readable label */
  label: string;
  /** Ordered list of vendor key configs (priority order within the pool) */
  keys: ProviderKeyConfig[];
  /** All key IDs for concurrency tracker */
  keyIds: string[];
  /** Max concurrent requests per key */
  maxConcurrencyPerKey: number;
  /** Cost per image in USD (for the primary vendor) */
  costPerImage: number;
  /** Request timeout in ms */
  timeoutMs: number;
}

export interface RoutingConfig {
  /** Model family -> pool mapping */
  pools: Map<ModelFamily, PoolConfig>;
  /** Total number of API keys across all pools */
  totalKeys: number;
  /** Default model family if none specified */
  defaultFamily: ModelFamily;
}

// ---------------------------------------------------------------------------
// Configuration Loader
// ---------------------------------------------------------------------------

/**
 * Parses a comma-separated list of API keys from an environment variable.
 */
function parseKeyList(envValue: string | undefined): string[] {
  if (!envValue) return [];
  return envValue
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

/**
 * Loads the per-model-family pool configuration from environment variables.
 *
 * Environment variables:
 *   WAVESPEED_API_KEYS          - Comma-separated WaveSpeed API keys
 *   WAVESPEED_MAX_CONCURRENCY   - Max concurrent per WaveSpeed key (default: 5)
 *   OPENAI_API_KEYS             - Comma-separated OpenAI API keys
 *   OPENAI_MAX_CONCURRENCY      - Max concurrent per OpenAI key (default: 5)
 *   GOOGLE_GEMINI_API_KEY       - Single Gemini API key
 *   GEMINI_MAX_CONCURRENCY      - Max concurrent for Gemini (default: 2)
 */
export function loadProviderConfig(): RoutingConfig {
  const pools = new Map<ModelFamily, PoolConfig>();
  let totalKeys = 0;

  // Parse all key pools
  const wavespeedKeys = parseKeyList(process.env.WAVESPEED_API_KEYS);
  const wavespeedMaxConcurrency = parseInt(process.env.WAVESPEED_MAX_CONCURRENCY || '5', 10);
  const openaiKeys = parseKeyList(process.env.OPENAI_API_KEYS);
  const openaiMaxConcurrency = parseInt(process.env.OPENAI_MAX_CONCURRENCY || '5', 10);
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  const geminiMaxConcurrency = parseInt(process.env.GEMINI_MAX_CONCURRENCY || '2', 10);

  // =========================================================================
  // Pool: nano-banana-pro
  //   Primary: WaveSpeed Multi-T2I ($0.07/img)
  //   Fallback: Gemini host (same underlying model, $0.134/img)
  // =========================================================================
  {
    const keys: ProviderKeyConfig[] = [];

    // WaveSpeed keys (primary)
    for (let i = 0; i < wavespeedKeys.length; i++) {
      keys.push({
        id: `ws_nbp_${i}`,
        apiKey: wavespeedKeys[i],
        provider: 'wavespeed',
        modelVersion: 'wavespeed-ai/nano-banana-pro/multi-t2i',
      });
    }

    // Gemini key (fallback - same model, different vendor)
    if (geminiKey) {
      keys.push({
        id: 'gemini_nbp_0',
        apiKey: geminiKey,
        provider: 'gemini',
        // Gemini 3 Pro Image maps to nano-banana-pro
        modelVersion: 'gemini-3-pro-image-preview',
      });
    }

    if (keys.length > 0) {
      const maxConcurrency = Math.max(wavespeedMaxConcurrency, geminiMaxConcurrency);
      pools.set('nano-banana-pro', {
        modelFamily: 'nano-banana-pro',
        label: 'Nano Banana Pro (WaveSpeed -> Gemini)',
        keys,
        keyIds: keys.map(k => k.id),
        maxConcurrencyPerKey: maxConcurrency,
        costPerImage: 0.07,
        timeoutMs: 120_000,
      });
      totalKeys += keys.length;
      console.log(
        `[ProviderConfig] Pool nano-banana-pro: ${keys.length} keys ` +
        `(${wavespeedKeys.length} WaveSpeed + ${geminiKey ? 1 : 0} Gemini)`
      );
    }
  }

  // =========================================================================
  // Pool: gpt-image-2
  //   Primary: OpenAI keys ($0.04-0.08/img)
  //   Fallback: WaveSpeed host (serves GPT Image 2)
  // =========================================================================
  {
    const keys: ProviderKeyConfig[] = [];

    // OpenAI keys (primary)
    for (let i = 0; i < openaiKeys.length; i++) {
      keys.push({
        id: `oai_gpt2_${i}`,
        apiKey: openaiKeys[i],
        provider: 'openai',
        modelVersion: 'gpt-image-2',
      });
    }

    // WaveSpeed keys (fallback - WaveSpeed also serves GPT Image 2)
    for (let i = 0; i < wavespeedKeys.length; i++) {
      keys.push({
        id: `ws_gpt2_${i}`,
        apiKey: wavespeedKeys[i],
        provider: 'wavespeed',
        modelVersion: 'openai/gpt-image-2',
      });
    }

    if (keys.length > 0) {
      const maxConcurrency = Math.max(openaiMaxConcurrency, wavespeedMaxConcurrency);
      pools.set('gpt-image-2', {
        modelFamily: 'gpt-image-2',
        label: 'GPT Image 2 (OpenAI -> WaveSpeed)',
        keys,
        keyIds: keys.map(k => k.id),
        maxConcurrencyPerKey: maxConcurrency,
        costPerImage: 0.06,
        timeoutMs: 120_000,
      });
      totalKeys += keys.length;
      console.log(
        `[ProviderConfig] Pool gpt-image-2: ${keys.length} keys ` +
        `(${openaiKeys.length} OpenAI + ${wavespeedKeys.length} WaveSpeed)`
      );
    }
  }

  if (totalKeys === 0) {
    console.error(
      '[ProviderConfig] CRITICAL: No API keys configured for any pool! ' +
      'Set WAVESPEED_API_KEYS, OPENAI_API_KEYS, or GOOGLE_GEMINI_API_KEY.'
    );
  }

  // Default family: use whatever has keys configured
  const defaultFamily: ModelFamily = pools.has('nano-banana-pro')
    ? 'nano-banana-pro'
    : 'gpt-image-2';

  console.log(
    `[ProviderConfig] Loaded ${pools.size} pool(s) with ${totalKeys} total key(s). ` +
    `Default: ${defaultFamily}`
  );

  return { pools, totalKeys, defaultFamily };
}

/**
 * Returns a masked version of an API key for logging (first 4 + last 4 chars).
 */
export function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 8) return '****';
  return `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
}
