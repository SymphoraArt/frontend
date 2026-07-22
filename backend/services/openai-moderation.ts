/**
 * OpenAI Omni-Moderation Service (Tier 2)
 *
 * Replaces the broken Tier 2 context system (PR #54 review #1, #2, #6).
 *
 * Uses POST /v1/moderations with model "omni-moderation-latest":
 *   - FREE endpoint, does not count against OpenAI usage limits
 *   - Multilingual: catches German/non-English evasion (PR #54 #3)
 *   - Semantic: catches "flat chested barely legal teen" etc.
 *   - Text categories: sexual, sexual/minors, violence, self-harm, harassment
 *   - ~100-300ms latency per prompt
 *
 * Failure behaviour (PR #54 review decision):
 *   - Text moderation API down -> FAIL OPEN (allow + log warning)
 *   - This is safe because Tier 1 catches the hardcoded blocklist,
 *     and Tier 3 (provider safety) catches the rest downstream.
 *
 * Reuses existing OPENAI_API_KEYS from env. Picks the first available key
 * since moderation is free and doesn't count against rate limits.
 *
 * ⚠️ SINGLE-INSTANCE CONSTRAINT: This module is stateless (no shared state),
 * so it works correctly with multiple instances. No Redis dependency.
 */

import type { ViolationSeverity } from './content-moderation.js';
import { registerTier2 } from './content-moderation.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const OPENAI_MODERATION_URL = 'https://api.openai.com/v1/moderations';
const MODERATION_MODEL = 'omni-moderation-latest';
const REQUEST_TIMEOUT_MS = 10_000; // 10s - moderation is fast

/**
 * Thresholds for enforcement actions (PR #54 review, section 3).
 * Scores are 0.0-1.0 from OpenAI.
 */
const THRESHOLDS = {
  // sexual/minors >= 0.7 -> instant permanent ban
  SEXUAL_MINORS_INSTANT_BAN: 0.7,
  // sexual/minors 0.2-0.7 -> human review queue
  SEXUAL_MINORS_HUMAN_REVIEW: 0.2,
  // Other categories: general block threshold
  GENERAL_BLOCK: 0.7,
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OmniModerationResponse {
  id: string;
  model: string;
  results: Array<{
    flagged: boolean;
    categories: Record<string, boolean>;
    category_scores: Record<string, number>;
  }>;
}

interface OmniModerationResult {
  blocked: boolean;
  category: string | null;
  severity: ViolationSeverity | null;
  scores: Record<string, number>;
}

// ---------------------------------------------------------------------------
// API Key Resolution
// ---------------------------------------------------------------------------

/**
 * Gets an OpenAI API key for moderation.
 * Picks the first key from OPENAI_API_KEYS since moderation is free
 * and doesn't count against rate limits.
 */
function getModerationApiKey(): string | null {
  const keys = process.env.OPENAI_API_KEYS;
  if (!keys) return null;

  const keyList = keys.split(',').map(k => k.trim()).filter(k => k.length > 0);
  return keyList[0] || null;
}

// ---------------------------------------------------------------------------
// Core Moderation Logic
// ---------------------------------------------------------------------------

/**
 * Calls the OpenAI Omni-Moderation API and returns the moderation result.
 *
 * @param prompt - The normalised prompt text to check
 * @returns OmniModerationResult with block decision, category, severity, and scores
 */
async function checkOmniModeration(prompt: string): Promise<OmniModerationResult> {
  const apiKey = getModerationApiKey();

  if (!apiKey) {
    console.warn('[OmniModeration] No OpenAI API key available, skipping Tier 2');
    return { blocked: false, category: null, severity: null, scores: {} };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_MODERATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODERATION_MODEL,
        input: prompt,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`OpenAI moderation API error (${response.status}): ${errorText}`);
    }

    const data: OmniModerationResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn('[OmniModeration] Empty response from API');
      return { blocked: false, category: null, severity: null, scores: {} };
    }

    const result = data.results[0];
    const scores = result.category_scores || {};

    // --- Evaluate thresholds per PR #54 review section 3 ---

    // Priority 1: sexual/minors (most severe)
    const sexualMinorsScore = scores['sexual/minors'] || 0;

    if (sexualMinorsScore >= THRESHOLDS.SEXUAL_MINORS_INSTANT_BAN) {
      return {
        blocked: true,
        category: 'sexual/minors',
        severity: 'instant_ban',
        scores,
      };
    }

    if (sexualMinorsScore >= THRESHOLDS.SEXUAL_MINORS_HUMAN_REVIEW) {
      return {
        blocked: true,
        category: 'sexual/minors',
        severity: 'human_review',
        scores,
      };
    }

    // Priority 2: Check other categories at general threshold
    // Only BLOCK on categories that matter for an image platform.
    // Soft AI blocks (other categories) -> block + log, NO strike.
    const blockCategories: Array<{ key: string; severity: ViolationSeverity }> = [
      { key: 'sexual', severity: 'log_only' },
      { key: 'violence/graphic', severity: 'log_only' },
      { key: 'self-harm/intent', severity: 'log_only' },
      { key: 'self-harm/instructions', severity: 'log_only' },
    ];

    for (const { key, severity } of blockCategories) {
      const score = scores[key] || 0;
      if (score >= THRESHOLDS.GENERAL_BLOCK) {
        return {
          blocked: true,
          category: key,
          severity,
          scores,
        };
      }
    }

    // Not flagged by any threshold
    return {
      blocked: false,
      category: null,
      severity: null,
      scores,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      console.error(`[OmniModeration] Request timed out after ${REQUEST_TIMEOUT_MS}ms`);
    } else {
      console.error(`[OmniModeration] API error: ${err.message}`);
    }

    // FAIL OPEN for text moderation (PR #54 review decision)
    // Tier 1 and Tier 3 still provide coverage.
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Self-registration
// ---------------------------------------------------------------------------
// Register with content-moderation.ts on import so the pipeline
// calls omni-moderation as Tier 2.
// ---------------------------------------------------------------------------

registerTier2(checkOmniModeration);

// ---------------------------------------------------------------------------
// Exports for testing
// ---------------------------------------------------------------------------

export const __testing__ = {
  checkOmniModeration,
  getModerationApiKey,
  THRESHOLDS,
};
