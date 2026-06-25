/**
 * Provider Configuration
 *
 * Centralized configuration for all API providers, loaded from environment
 * variables. This is the single source of truth for:
 *   - API key pools (comma-separated in env vars)
 *   - Max concurrency per key per provider
 *   - Cost per image per provider
 *   - Provider-specific timeouts
 *
 * Security: API keys are loaded from server-side environment variables ONLY.
 *           They are never exposed to the client or logged in full.
 *
 * Architecture note: Having separate env vars for each provider means Kev
 * can add/remove keys without touching any code -- just update .env.local.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProviderKeyConfig {
  /** Unique ID for this specific key (e.g., "wavespeed_0", "openai_1") */
  id: string;
  /** The actual API key value */
  apiKey: string;
  /** Provider name for logging (key value is never logged) */
  provider: 'wavespeed' | 'openai' | 'gemini';
}

export interface ProviderTierConfig {
  /** Provider name */
  provider: 'wavespeed' | 'openai' | 'gemini';
  /** Human-readable tier label */
  tierLabel: string;
  /** All key configs for this provider */
  keys: ProviderKeyConfig[];
  /** All key IDs for this provider (for concurrency tracker registration) */
  keyIds: string[];
  /** Max concurrent requests per key */
  maxConcurrencyPerKey: number;
  /** Cost per image in USD */
  costPerImage: number;
  /** Request timeout in ms */
  timeoutMs: number;
}

export interface RoutingConfig {
  /** Ordered list of provider tiers (priority order) */
  tiers: ProviderTierConfig[];
  /** Total number of API keys across all providers */
  totalKeys: number;
}

// ---------------------------------------------------------------------------
// Configuration Loader
// ---------------------------------------------------------------------------

/**
 * Parses a comma-separated list of API keys from an environment variable.
 * Trims whitespace and filters out empty strings.
 */
function parseKeyList(envValue: string | undefined): string[] {
  if (!envValue) return [];
  return envValue
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

/**
 * Loads the complete routing configuration from environment variables.
 *
 * Environment variables:
 *   WAVESPEED_API_KEYS          - Comma-separated WaveSpeed API keys
 *   WAVESPEED_MAX_CONCURRENCY   - Max concurrent requests per WaveSpeed key (default: 5)
 *   OPENAI_API_KEYS             - Comma-separated OpenAI API keys
 *   OPENAI_MAX_CONCURRENCY      - Max concurrent requests per OpenAI key (default: 5)
 *   GOOGLE_GEMINI_API_KEY       - Single Gemini API key (already exists in project)
 *   GEMINI_API_KEY              - Fallback Gemini key name
 *   GEMINI_MAX_CONCURRENCY      - Max concurrent requests for Gemini (default: 2)
 */
export function loadProviderConfig(): RoutingConfig {
  const tiers: ProviderTierConfig[] = [];

  // --- Tier 1: WaveSpeed (Nano Banana Pro) ---
  const wavespeedKeys = parseKeyList(process.env.WAVESPEED_API_KEYS);
  const wavespeedMaxConcurrency = parseInt(
    process.env.WAVESPEED_MAX_CONCURRENCY || '5',
    10
  );

  if (wavespeedKeys.length > 0) {
    const keys: ProviderKeyConfig[] = wavespeedKeys.map((apiKey, idx) => ({
      id: `wavespeed_${idx}`,
      apiKey,
      provider: 'wavespeed' as const,
    }));

    tiers.push({
      provider: 'wavespeed',
      tierLabel: 'Tier 1: WaveSpeed Nano Banana Pro ($0.07/img)',
      keys,
      keyIds: keys.map((k) => k.id),
      maxConcurrencyPerKey: wavespeedMaxConcurrency,
      costPerImage: 0.07,
      timeoutMs: 120_000,
    });

    console.log(
      `[ProviderConfig] Tier 1 (WaveSpeed): ${keys.length} keys, max ${wavespeedMaxConcurrency} concurrent each`
    );
  } else {
    console.warn('[ProviderConfig] No WaveSpeed API keys configured (WAVESPEED_API_KEYS)');
  }

  // --- Tier 2: OpenAI GPT Image ---
  const openaiKeys = parseKeyList(process.env.OPENAI_API_KEYS);
  const openaiMaxConcurrency = parseInt(
    process.env.OPENAI_MAX_CONCURRENCY || '5',
    10
  );

  if (openaiKeys.length > 0) {
    const keys: ProviderKeyConfig[] = openaiKeys.map((apiKey, idx) => ({
      id: `openai_${idx}`,
      apiKey,
      provider: 'openai' as const,
    }));

    tiers.push({
      provider: 'openai',
      tierLabel: 'Tier 2: OpenAI GPT Image ($0.04-0.08/img)',
      keys,
      keyIds: keys.map((k) => k.id),
      maxConcurrencyPerKey: openaiMaxConcurrency,
      costPerImage: 0.06,
      timeoutMs: 120_000,
    });

    console.log(
      `[ProviderConfig] Tier 2 (OpenAI): ${keys.length} keys, max ${openaiMaxConcurrency} concurrent each`
    );
  } else {
    console.warn('[ProviderConfig] No OpenAI API keys configured (OPENAI_API_KEYS)');
  }

  // --- Tier 3: Gemini (Ultimate Safety Net) ---
  const geminiKey =
    process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  const geminiMaxConcurrency = parseInt(
    process.env.GEMINI_MAX_CONCURRENCY || '2',
    10
  );

  if (geminiKey) {
    const keys: ProviderKeyConfig[] = [
      {
        id: 'gemini_0',
        apiKey: geminiKey,
        provider: 'gemini' as const,
      },
    ];

    tiers.push({
      provider: 'gemini',
      tierLabel: 'Tier 3: Gemini 3 Pro (Safety Net, $0.04-0.13/img)',
      keys,
      keyIds: keys.map((k) => k.id),
      maxConcurrencyPerKey: geminiMaxConcurrency,
      costPerImage: 0.04,
      timeoutMs: 120_000,
    });

    console.log(
      `[ProviderConfig] Tier 3 (Gemini): 1 key, max ${geminiMaxConcurrency} concurrent`
    );
  } else {
    console.warn('[ProviderConfig] No Gemini API key configured (GOOGLE_GEMINI_API_KEY)');
  }

  const totalKeys = tiers.reduce((sum, tier) => sum + tier.keys.length, 0);

  if (totalKeys === 0) {
    console.error(
      '[ProviderConfig] CRITICAL: No API keys configured for any provider! ' +
      'Set WAVESPEED_API_KEYS, OPENAI_API_KEYS, or GOOGLE_GEMINI_API_KEY.'
    );
  }

  console.log(
    `[ProviderConfig] Loaded ${tiers.length} tier(s) with ${totalKeys} total key(s)`
  );

  return { tiers, totalKeys };
}

/**
 * Returns a masked version of an API key for logging (first 4 + last 4 chars).
 * Never logs the full key.
 */
export function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 8) return '****';
  return `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
}
