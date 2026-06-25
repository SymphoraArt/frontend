/**
 * Pessimistic Concurrency Tracker
 *
 * Implements the pre-emptive API key routing algorithm described in
 * api_algo_improvements.md. Instead of waiting for a 429 error to failover,
 * we proactively track active connections per key and refuse to send new
 * requests to keys that are at capacity.
 *
 * Algorithm (from brainstorm):
 *   1. Define max concurrency per key (e.g., 5 concurrent requests)
 *   2. When a request arrives, check the active count for each key
 *   3. If key is at max, immediately skip to the next key (NO request sent)
 *   4. On completion, decrement the active count (in a `finally` block)
 *
 * This mathematically prevents rate-limit crashes.
 *
 * Implementation:
 *   - Uses an in-memory Map for the Friday launch (single Node.js process)
 *   - Node.js is single-threaded, so Map operations are atomic
 *   - Redis upgrade is a drop-in replacement for multi-instance deployment
 *
 * Security: This module contains no secrets. It is a pure state machine.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KeyHealth {
  /** Unique key identifier (e.g., "wavespeed_key_1") */
  keyId: string;
  /** Current number of active (in-flight) requests */
  activeCount: number;
  /** Maximum concurrent requests allowed */
  maxConcurrency: number;
  /** Whether the key is currently available for new requests */
  available: boolean;
  /** Total requests served since startup */
  totalServed: number;
  /** Total failures since startup */
  totalFailures: number;
  /** Timestamp of the last successful request */
  lastSuccessAt: number | null;
  /** Timestamp of the last failure */
  lastFailureAt: number | null;
  /** If the key is in cooldown (e.g., after a hard error), when it expires */
  cooldownUntil: number | null;
}

interface KeyState {
  activeCount: number;
  maxConcurrency: number;
  totalServed: number;
  totalFailures: number;
  lastSuccessAt: number | null;
  lastFailureAt: number | null;
  cooldownUntil: number | null;
}

// ---------------------------------------------------------------------------
// Concurrency Tracker
// ---------------------------------------------------------------------------

export class ConcurrencyTracker {
  private keys: Map<string, KeyState> = new Map();

  /**
   * Registers a key with a given max concurrency limit.
   * Must be called during initialization before any requests are routed.
   *
   * @param keyId - Unique identifier for this API key
   * @param maxConcurrency - Maximum concurrent requests this key can handle
   */
  registerKey(keyId: string, maxConcurrency: number): void {
    if (maxConcurrency < 1) {
      throw new Error(`maxConcurrency must be >= 1, got ${maxConcurrency}`);
    }
    this.keys.set(keyId, {
      activeCount: 0,
      maxConcurrency,
      totalServed: 0,
      totalFailures: 0,
      lastSuccessAt: null,
      lastFailureAt: null,
      cooldownUntil: null,
    });
  }

  /**
   * Attempts to acquire a slot on the specified key.
   *
   * This is the core of the pessimistic concurrency algorithm:
   *   - If the key has available capacity, atomically increment and return true
   *   - If the key is at capacity or in cooldown, return false immediately
   *
   * The caller MUST call releaseSlot() when the request completes (success or failure).
   *
   * @param keyId - The key to acquire a slot on
   * @returns true if a slot was acquired, false if at capacity
   */
  acquireSlot(keyId: string): boolean {
    const state = this.keys.get(keyId);
    if (!state) {
      console.error(`[ConcurrencyTracker] Unknown key: ${keyId}`);
      return false;
    }

    // Check if in cooldown
    if (state.cooldownUntil !== null && Date.now() < state.cooldownUntil) {
      return false;
    }

    // Clear expired cooldown
    if (state.cooldownUntil !== null && Date.now() >= state.cooldownUntil) {
      state.cooldownUntil = null;
    }

    // Pre-emptive check: refuse if at max concurrency
    if (state.activeCount >= state.maxConcurrency) {
      return false;
    }

    // Acquire the slot (atomic in single-threaded Node.js)
    state.activeCount++;
    return true;
  }

  /**
   * Releases a slot on the specified key.
   *
   * MUST be called in a `finally` block after every acquireSlot() that returned true.
   * Failure to call this will permanently reduce the key's available capacity.
   *
   * @param keyId - The key to release a slot on
   * @param success - Whether the request succeeded (for metrics)
   */
  releaseSlot(keyId: string, success: boolean = true): void {
    const state = this.keys.get(keyId);
    if (!state) {
      console.error(`[ConcurrencyTracker] Cannot release unknown key: ${keyId}`);
      return;
    }

    // Decrement (never go below 0)
    state.activeCount = Math.max(0, state.activeCount - 1);

    if (success) {
      state.totalServed++;
      state.lastSuccessAt = Date.now();
    } else {
      state.totalFailures++;
      state.lastFailureAt = Date.now();
    }
  }

  /**
   * Puts a key into cooldown (e.g., after a hard 429 or account suspension).
   *
   * During cooldown, acquireSlot() will return false for this key.
   * Existing in-flight requests are NOT interrupted.
   *
   * @param keyId - The key to put into cooldown
   * @param durationMs - How long the cooldown lasts (default: 60 seconds)
   */
  cooldownKey(keyId: string, durationMs: number = 60_000): void {
    const state = this.keys.get(keyId);
    if (!state) {
      console.error(`[ConcurrencyTracker] Cannot cooldown unknown key: ${keyId}`);
      return;
    }

    state.cooldownUntil = Date.now() + durationMs;
    console.warn(
      `[ConcurrencyTracker] Key ${keyId} in cooldown for ${durationMs / 1000}s`
    );
  }

  /**
   * Gets the current active count for a key.
   */
  getActiveCount(keyId: string): number {
    return this.keys.get(keyId)?.activeCount ?? 0;
  }

  /**
   * Gets the health status of a specific key.
   */
  getKeyHealth(keyId: string): KeyHealth | null {
    const state = this.keys.get(keyId);
    if (!state) return null;

    const now = Date.now();
    const inCooldown = state.cooldownUntil !== null && now < state.cooldownUntil;

    return {
      keyId,
      activeCount: state.activeCount,
      maxConcurrency: state.maxConcurrency,
      available: !inCooldown && state.activeCount < state.maxConcurrency,
      totalServed: state.totalServed,
      totalFailures: state.totalFailures,
      lastSuccessAt: state.lastSuccessAt,
      lastFailureAt: state.lastFailureAt,
      cooldownUntil: state.cooldownUntil,
    };
  }

  /**
   * Gets health status for ALL registered keys (for dashboards/monitoring).
   */
  getAllHealth(): Record<string, KeyHealth> {
    const health: Record<string, KeyHealth> = {};
    for (const keyId of this.keys.keys()) {
      const h = this.getKeyHealth(keyId);
      if (h) health[keyId] = h;
    }
    return health;
  }

  /**
   * Returns the first available key ID from the provided list.
   * This is the main routing function -- the "traffic cop."
   *
   * @param keyIds - Ordered list of key IDs to try (priority order)
   * @returns The first available key ID, or null if all are at capacity
   */
  findAvailableKey(keyIds: string[]): string | null {
    for (const keyId of keyIds) {
      const state = this.keys.get(keyId);
      if (!state) continue;

      // Skip keys in cooldown
      if (state.cooldownUntil !== null && Date.now() < state.cooldownUntil) {
        continue;
      }

      // Clear expired cooldown
      if (state.cooldownUntil !== null && Date.now() >= state.cooldownUntil) {
        state.cooldownUntil = null;
      }

      if (state.activeCount < state.maxConcurrency) {
        return keyId;
      }
    }
    return null;
  }

  /**
   * Returns summary stats for a group of keys (e.g., all WaveSpeed keys).
   */
  getGroupStats(keyIds: string[]): {
    totalActive: number;
    totalCapacity: number;
    availableSlots: number;
    keysInCooldown: number;
  } {
    let totalActive = 0;
    let totalCapacity = 0;
    let keysInCooldown = 0;

    for (const keyId of keyIds) {
      const state = this.keys.get(keyId);
      if (!state) continue;

      totalActive += state.activeCount;
      totalCapacity += state.maxConcurrency;

      if (state.cooldownUntil !== null && Date.now() < state.cooldownUntil) {
        keysInCooldown++;
      }
    }

    return {
      totalActive,
      totalCapacity,
      availableSlots: totalCapacity - totalActive,
      keysInCooldown,
    };
  }

  /**
   * Resets all tracking state. For testing only.
   */
  reset(): void {
    this.keys.clear();
  }
}

// ---------------------------------------------------------------------------
// Singleton instance
// ---------------------------------------------------------------------------
// Exported as a singleton so all parts of the application share the same
// concurrency state. This is critical -- if two modules have separate trackers,
// the pre-emptive routing algorithm breaks.
// ---------------------------------------------------------------------------

export const concurrencyTracker = new ConcurrencyTracker();
