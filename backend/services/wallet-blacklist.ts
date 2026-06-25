/**
 * Wallet Blacklist Service
 *
 * Tracks content moderation violations per wallet address and automatically
 * blacklists wallets that exceed a configurable violation threshold.
 *
 * Storage: Supabase (wallet_violations + wallet_blacklist tables).
 * Fallback: In-memory cache for reads to avoid hitting DB on every request.
 *
 * Architecture decision: We log the violating wallet address so we can
 * blacklist repeat offenders. This was a specific requirement from Kev
 * (brainstorm3.txt): "we can then even maybe blacklist people or entire wallets."
 */

import { getSupabaseClient } from '../database/db.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Number of violations before auto-blacklist */
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
 * Records a content moderation violation for a wallet address.
 *
 * If the wallet exceeds the auto-blacklist threshold, it is automatically
 * blacklisted. The prompt snippet is stored (first 200 chars) for audit.
 *
 * @param walletAddress - The offending wallet
 * @param reason - Why it was flagged (e.g., "Tier 1: csam")
 * @param prompt - The offending prompt (truncated for storage)
 */
export async function recordViolation(
  walletAddress: string,
  reason: string,
  prompt: string
): Promise<void> {
  if (!walletAddress) return;

  const normalizedWallet = walletAddress.toLowerCase();
  // Truncate prompt to avoid storing massive payloads
  const promptSnippet = prompt.substring(0, 200);

  try {
    const supabase = getSupabaseClient();

    // Insert violation record
    const { error: insertError } = await supabase
      .from('wallet_violations')
      .insert({
        wallet_address: normalizedWallet,
        reason,
        prompt_snippet: promptSnippet,
      });

    if (insertError) {
      console.error('[Wallet Blacklist] Failed to record violation:', insertError.message);
      return;
    }

    console.warn(
      `[Wallet Blacklist] Violation recorded for ${normalizedWallet}: ${reason}`
    );

    // Check total violations for auto-blacklist
    const { count, error: countError } = await supabase
      .from('wallet_violations')
      .select('id', { count: 'exact', head: true })
      .eq('wallet_address', normalizedWallet);

    if (countError) {
      console.error('[Wallet Blacklist] Failed to count violations:', countError.message);
      return;
    }

    if (count !== null && count >= AUTO_BLACKLIST_THRESHOLD) {
      await blacklistWallet(
        normalizedWallet,
        `Auto-blacklisted after ${count} content violations`
      );
    }
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
