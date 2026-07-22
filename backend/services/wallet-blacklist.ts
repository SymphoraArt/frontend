/**
 * Wallet Blacklist Service
 *
 * Tracks content moderation violations per wallet address and enforces
 * staged strike rules per PR #54 review (section 3).
 *
 * Enforcement tiers:
 *   instant_ban   -> CSAM hit or sexual/minors >= 0.7 -> immediate permanent ban
 *   human_review  -> sexual/minors 0.2-0.7 -> block + flag for human review
 *   strike        -> Standard Tier 1 hit or provider SAFETY -> 3 strikes = ban
 *   log_only      -> Soft AI block (other categories) -> block + log, NO strike
 *
 * Violation storage privacy (PR #54 review #10):
 *   Prompts are stored as SHA-256 hash + first 100 chars only.
 *   Full-text retention for CSAM evidence is a pending legal question.
 *
 * Storage: Supabase (wallet_violations + wallet_blacklist tables).
 * Fallback: In-memory cache for reads to avoid hitting DB on every request.
 *
 * ⚠️ SINGLE-INSTANCE CONSTRAINT: This module uses an in-memory Map for the
 * blacklist cache. Do NOT run a second instance or move to serverless before
 * migrating this cache to Redis (Upstash / Redis Cloud / self-host).
 * With N instances, fresh bans stay invisible up to cache TTL (5 min).
 */

import { createHash } from 'crypto';
import { getSupabaseClient } from '../database/db.js';
import type { ViolationSeverity } from './content-moderation.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Number of STRIKES before auto-blacklist (log_only does not count) */
const AUTO_BLACKLIST_THRESHOLD = parseInt(
  process.env.WALLET_BLACKLIST_THRESHOLD || '3',
  10
);

/** In-memory cache TTL in ms (5 minutes) */
const CACHE_TTL_MS = 5 * 60 * 1000;

// ---------------------------------------------------------------------------
// In-memory cache
// ---------------------------------------------------------------------------
// We cache blacklist lookups in memory so we don't hit Supabase on every
// single generation request. The cache is invalidated after TTL or when
// we explicitly add a new blacklist entry.
//
// ⚠️ SINGLE-INSTANCE CONSTRAINT (see module doc)
// ---------------------------------------------------------------------------

interface CacheEntry {
  blacklisted: boolean;
  cachedAt: number;
}

const blacklistCache = new Map<string, CacheEntry>();

function getCachedStatus(wallet: string): boolean | null {
  const entry = blacklistCache.get(wallet.toLowerCase());
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
    blacklistCache.delete(wallet.toLowerCase());
    return null;
  }
  return entry.blacklisted;
}

function setCachedStatus(wallet: string, blacklisted: boolean): void {
  blacklistCache.set(wallet.toLowerCase(), {
    blacklisted,
    cachedAt: Date.now(),
  });
}

// ---------------------------------------------------------------------------
// Violation Privacy Helpers
// ---------------------------------------------------------------------------

/**
 * Creates a privacy-safe prompt snippet for violation storage.
 * Stores SHA-256 hash + first 100 chars (PR #54 review #10).
 */
function createPromptSnippet(prompt: string): string {
  const hash = createHash('sha256').update(prompt).digest('hex').substring(0, 16);
  const truncated = prompt.substring(0, 100);
  return `[${hash}] ${truncated}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Checks if a wallet address is blacklisted.
 *
 * Uses in-memory cache first, falls back to Supabase lookup.
 * Returns false (not blacklisted) if the database is unavailable,
 * to avoid blocking legitimate users due to infra issues.
 */
export async function isWalletBlacklisted(walletAddress: string): Promise<boolean> {
  if (!walletAddress) return false;

  const normalizedWallet = walletAddress.toLowerCase();

  // Check cache first
  const cached = getCachedStatus(normalizedWallet);
  if (cached !== null) {
    return cached;
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('wallet_blacklist')
      .select('wallet_address')
      .eq('wallet_address', normalizedWallet)
      .maybeSingle();

    if (error) {
      console.error('[Wallet Blacklist] DB lookup error:', error.message);
      // Fail open: don't block legitimate users because DB is down
      return false;
    }

    const isBlacklisted = !!data;
    setCachedStatus(normalizedWallet, isBlacklisted);
    return isBlacklisted;
  } catch (err: any) {
    console.error('[Wallet Blacklist] Unexpected error:', err.message);
    return false;
  }
}

/**
 * Records a content moderation violation with staged enforcement.
 *
 * Enforcement rules (PR #54 review, section 3):
 *   instant_ban  -> immediate permanent blacklist
 *   human_review -> flag for human review (no auto-action)
 *   strike       -> increment strike count, auto-ban at threshold
 *   log_only     -> log the violation, NO strike increment
 *
 * @param walletAddress - The offending wallet
 * @param reason - Why it was flagged (e.g., "Tier 1: csam")
 * @param prompt - The offending prompt (stored as hash + 100 chars)
 * @param severity - Enforcement severity from moderation
 */
export async function recordViolation(
  walletAddress: string,
  reason: string,
  prompt: string,
  severity: ViolationSeverity = 'strike'
): Promise<void> {
  if (!walletAddress) return;

  const normalizedWallet = walletAddress.toLowerCase();
  const promptSnippet = createPromptSnippet(prompt);

  try {
    const supabase = getSupabaseClient();

    // Insert violation record (always, regardless of severity)
    const { error: insertError } = await supabase
      .from('wallet_violations')
      .insert({
        wallet_address: normalizedWallet,
        reason: `[${severity}] ${reason}`,
        prompt_snippet: promptSnippet,
      });

    if (insertError) {
      console.error('[Wallet Blacklist] Failed to record violation:', insertError.message);
      return;
    }

    console.warn(
      `[Wallet Blacklist] Violation recorded for ${normalizedWallet}: ` +
      `severity=${severity}, reason=${reason}`
    );

    // --- Apply staged enforcement ---

    if (severity === 'instant_ban') {
      // Immediate permanent blacklist
      await blacklistWallet(
        normalizedWallet,
        `Instant ban: ${reason}`
      );
      return;
    }

    if (severity === 'human_review') {
      // Flag for human review - insert into a review queue table
      // For launch: just log prominently. Admin reviews violation logs.
      console.error(
        `[HUMAN REVIEW REQUIRED] Wallet ${normalizedWallet}: ${reason}. ` +
        `Prompt snippet: ${promptSnippet}`
      );
      return;
    }

    if (severity === 'strike') {
      // Count strikes (only 'strike' severity counts toward threshold)
      const { count, error: countError } = await supabase
        .from('wallet_violations')
        .select('id', { count: 'exact', head: true })
        .eq('wallet_address', normalizedWallet)
        .like('reason', '[strike]%');

      if (countError) {
        console.error('[Wallet Blacklist] Failed to count strikes:', countError.message);
        return;
      }

      if (count !== null && count >= AUTO_BLACKLIST_THRESHOLD) {
        await blacklistWallet(
          normalizedWallet,
          `Auto-blacklisted after ${count} strikes`
        );
      }
      return;
    }

    // severity === 'log_only' -> no further action
  } catch (err: any) {
    console.error('[Wallet Blacklist] Unexpected error recording violation:', err.message);
  }
}

/**
 * Explicitly blacklists a wallet address.
 *
 * Idempotent: calling this on an already-blacklisted wallet is a no-op.
 */
export async function blacklistWallet(
  walletAddress: string,
  reason: string
): Promise<void> {
  if (!walletAddress) return;

  const normalizedWallet = walletAddress.toLowerCase();

  try {
    const supabase = getSupabaseClient();

    // Upsert to handle idempotency
    const { error } = await supabase
      .from('wallet_blacklist')
      .upsert(
        {
          wallet_address: normalizedWallet,
          reason,
          blacklisted_at: new Date().toISOString(),
        },
        { onConflict: 'wallet_address' }
      );

    if (error) {
      console.error('[Wallet Blacklist] Failed to blacklist wallet:', error.message);
      return;
    }

    // Update cache immediately
    setCachedStatus(normalizedWallet, true);

    console.warn(
      `[Wallet Blacklist] BLACKLISTED wallet ${normalizedWallet}: ${reason}`
    );
  } catch (err: any) {
    console.error('[Wallet Blacklist] Unexpected error blacklisting wallet:', err.message);
  }
}

/**
 * Gets the violation count for a wallet (for admin dashboards).
 */
export async function getViolationCount(walletAddress: string): Promise<number> {
  if (!walletAddress) return 0;

  try {
    const supabase = getSupabaseClient();
    const { count, error } = await supabase
      .from('wallet_violations')
      .select('id', { count: 'exact', head: true })
      .eq('wallet_address', walletAddress.toLowerCase());

    if (error) {
      console.error('[Wallet Blacklist] Failed to get violation count:', error.message);
      return 0;
    }

    return count ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Clears the in-memory cache. Useful for testing.
 */
export function clearBlacklistCache(): void {
  blacklistCache.clear();
}
