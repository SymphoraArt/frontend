/**
 * Concurrency Tracker Tests
 *
 * Verifies the pessimistic concurrency control algorithm:
 * - Slot acquisition respects max concurrency limits
 * - Slot release properly decrements counters
 * - Cooldown blocks acquisition for the specified duration
 * - findAvailableKey returns the first available key in priority order
 * - Group stats accurately reflect the state of multiple keys
 * - Edge cases: releasing unknown keys, double releases, etc.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ConcurrencyTracker } from '../concurrency-tracker';

describe('ConcurrencyTracker', () => {
  let tracker: ConcurrencyTracker;

  beforeEach(() => {
    tracker = new ConcurrencyTracker();
  });

  // ========================================================================
  // Key Registration
  // ========================================================================

  describe('registerKey', () => {
    it('registers a key with the given max concurrency', () => {
      tracker.registerKey('key_1', 5);
      const health = tracker.getKeyHealth('key_1');
      expect(health).not.toBeNull();
      expect(health!.maxConcurrency).toBe(5);
      expect(health!.activeCount).toBe(0);
      expect(health!.available).toBe(true);
    });

    it('throws if maxConcurrency is less than 1', () => {
      expect(() => tracker.registerKey('key_bad', 0)).toThrow();
      expect(() => tracker.registerKey('key_bad', -1)).toThrow();
    });

    it('allows re-registering a key (resets state)', () => {
      tracker.registerKey('key_1', 5);
      tracker.acquireSlot('key_1');
      expect(tracker.getActiveCount('key_1')).toBe(1);

      tracker.registerKey('key_1', 10);
      expect(tracker.getActiveCount('key_1')).toBe(0);
      expect(tracker.getKeyHealth('key_1')!.maxConcurrency).toBe(10);
    });
  });

  // ========================================================================
  // Slot Acquisition
  // ========================================================================

  describe('acquireSlot', () => {
    it('acquires a slot when under max concurrency', () => {
      tracker.registerKey('key_1', 3);
      expect(tracker.acquireSlot('key_1')).toBe(true);
      expect(tracker.getActiveCount('key_1')).toBe(1);
    });

    it('acquires multiple slots up to max concurrency', () => {
      tracker.registerKey('key_1', 3);
      expect(tracker.acquireSlot('key_1')).toBe(true);
      expect(tracker.acquireSlot('key_1')).toBe(true);
      expect(tracker.acquireSlot('key_1')).toBe(true);
      expect(tracker.getActiveCount('key_1')).toBe(3);
    });

    it('refuses acquisition when at max concurrency (pre-emptive block)', () => {
      tracker.registerKey('key_1', 2);
      tracker.acquireSlot('key_1');
      tracker.acquireSlot('key_1');

      // Third request should be refused
      expect(tracker.acquireSlot('key_1')).toBe(false);
      expect(tracker.getActiveCount('key_1')).toBe(2); // No increment
    });

    it('returns false for unknown keys', () => {
      expect(tracker.acquireSlot('nonexistent')).toBe(false);
    });

    it('refuses acquisition during cooldown', () => {
      tracker.registerKey('key_1', 5);
      tracker.cooldownKey('key_1', 60_000);
      expect(tracker.acquireSlot('key_1')).toBe(false);
    });

    it('allows acquisition after cooldown expires', () => {
      tracker.registerKey('key_1', 5);
      // Set cooldown that already expired (1ms ago)
      tracker.cooldownKey('key_1', -1);
      expect(tracker.acquireSlot('key_1')).toBe(true);
    });
  });

  // ========================================================================
  // Slot Release
  // ========================================================================

  describe('releaseSlot', () => {
    it('decrements active count on successful release', () => {
      tracker.registerKey('key_1', 5);
      tracker.acquireSlot('key_1');
      tracker.acquireSlot('key_1');
      expect(tracker.getActiveCount('key_1')).toBe(2);

      tracker.releaseSlot('key_1', true);
      expect(tracker.getActiveCount('key_1')).toBe(1);
    });

    it('tracks successful completions', () => {
      tracker.registerKey('key_1', 5);
      tracker.acquireSlot('key_1');
      tracker.releaseSlot('key_1', true);

      const health = tracker.getKeyHealth('key_1')!;
      expect(health.totalServed).toBe(1);
      expect(health.totalFailures).toBe(0);
      expect(health.lastSuccessAt).not.toBeNull();
    });

    it('tracks failures separately', () => {
      tracker.registerKey('key_1', 5);
      tracker.acquireSlot('key_1');
      tracker.releaseSlot('key_1', false);

      const health = tracker.getKeyHealth('key_1')!;
      expect(health.totalServed).toBe(0);
      expect(health.totalFailures).toBe(1);
      expect(health.lastFailureAt).not.toBeNull();
    });

    it('never goes below 0 active count (safety)', () => {
      tracker.registerKey('key_1', 5);
      tracker.releaseSlot('key_1', true);
      tracker.releaseSlot('key_1', true);
      expect(tracker.getActiveCount('key_1')).toBe(0);
    });

    it('makes slot available again after release', () => {
      tracker.registerKey('key_1', 1);
      tracker.acquireSlot('key_1');
      expect(tracker.acquireSlot('key_1')).toBe(false); // At capacity

      tracker.releaseSlot('key_1', true);
      expect(tracker.acquireSlot('key_1')).toBe(true); // Slot freed
    });
  });

  // ========================================================================
  // Cooldown
  // ========================================================================

  describe('cooldownKey', () => {
    it('blocks acquisition during cooldown', () => {
      tracker.registerKey('key_1', 5);
      tracker.cooldownKey('key_1', 60_000);

      expect(tracker.acquireSlot('key_1')).toBe(false);
      const health = tracker.getKeyHealth('key_1')!;
      expect(health.available).toBe(false);
      expect(health.cooldownUntil).not.toBeNull();
    });
  });

  // ========================================================================
  // findAvailableKey (The Traffic Cop)
  // ========================================================================

  describe('findAvailableKey', () => {
    it('returns the first available key in priority order', () => {
      tracker.registerKey('key_1', 2);
      tracker.registerKey('key_2', 2);
      tracker.registerKey('key_3', 2);

      expect(tracker.findAvailableKey(['key_1', 'key_2', 'key_3'])).toBe('key_1');
    });

    it('skips keys at max capacity', () => {
      tracker.registerKey('key_1', 1);
      tracker.registerKey('key_2', 2);
      tracker.acquireSlot('key_1'); // key_1 full

      expect(tracker.findAvailableKey(['key_1', 'key_2'])).toBe('key_2');
    });

    it('skips keys in cooldown', () => {
      tracker.registerKey('key_1', 5);
      tracker.registerKey('key_2', 5);
      tracker.cooldownKey('key_1', 60_000);

      expect(tracker.findAvailableKey(['key_1', 'key_2'])).toBe('key_2');
    });

    it('returns null if ALL keys are at capacity', () => {
      tracker.registerKey('key_1', 1);
      tracker.registerKey('key_2', 1);
      tracker.acquireSlot('key_1');
      tracker.acquireSlot('key_2');

      expect(tracker.findAvailableKey(['key_1', 'key_2'])).toBeNull();
    });

    it('returns null for empty key list', () => {
      expect(tracker.findAvailableKey([])).toBeNull();
    });

    it('handles viral spike scenario (10 concurrent requests, 2 keys with 5 max each)', () => {
      tracker.registerKey('key_1', 5);
      tracker.registerKey('key_2', 5);

      // Simulate 10 requests arriving simultaneously
      const results: string[] = [];
      for (let i = 0; i < 10; i++) {
        const key = tracker.findAvailableKey(['key_1', 'key_2']);
        if (key) {
          tracker.acquireSlot(key);
          results.push(key);
        }
      }

      // All 10 should be routed (5 to key_1, 5 to key_2)
      expect(results).toHaveLength(10);
      expect(results.filter((k) => k === 'key_1')).toHaveLength(5);
      expect(results.filter((k) => k === 'key_2')).toHaveLength(5);

      // 11th request should fail
      expect(tracker.findAvailableKey(['key_1', 'key_2'])).toBeNull();
    });
  });

  // ========================================================================
  // Group Stats
  // ========================================================================

  describe('getGroupStats', () => {
    it('aggregates stats across multiple keys', () => {
      tracker.registerKey('ws_1', 5);
      tracker.registerKey('ws_2', 5);
      tracker.registerKey('ws_3', 5);

      tracker.acquireSlot('ws_1');
      tracker.acquireSlot('ws_1');
      tracker.acquireSlot('ws_2');

      const stats = tracker.getGroupStats(['ws_1', 'ws_2', 'ws_3']);
      expect(stats.totalActive).toBe(3);
      expect(stats.totalCapacity).toBe(15);
      expect(stats.availableSlots).toBe(12);
      expect(stats.keysInCooldown).toBe(0);
    });

    it('counts keys in cooldown', () => {
      tracker.registerKey('ws_1', 5);
      tracker.registerKey('ws_2', 5);
      tracker.cooldownKey('ws_1', 60_000);

      const stats = tracker.getGroupStats(['ws_1', 'ws_2']);
      expect(stats.keysInCooldown).toBe(1);
    });
  });

  // ========================================================================
  // getAllHealth
  // ========================================================================

  describe('getAllHealth', () => {
    it('returns health for all registered keys', () => {
      tracker.registerKey('key_1', 5);
      tracker.registerKey('key_2', 3);

      const health = tracker.getAllHealth();
      expect(Object.keys(health)).toHaveLength(2);
      expect(health['key_1'].maxConcurrency).toBe(5);
      expect(health['key_2'].maxConcurrency).toBe(3);
    });
  });

  // ========================================================================
  // Reset
  // ========================================================================

  describe('reset', () => {
    it('clears all tracking state', () => {
      tracker.registerKey('key_1', 5);
      tracker.acquireSlot('key_1');
      tracker.reset();

      expect(tracker.getKeyHealth('key_1')).toBeNull();
      expect(tracker.getActiveCount('key_1')).toBe(0);
    });
  });
});
