/**
 * Generation Queue - Per-Pool FIFO Queue
 *
 * Implements the queuing system mandated by PR #54 review (section 2.3):
 *   - When all keys in a pool are at capacity, requests enter a FIFO queue
 *   - Requests fire as soon as any key in the pool frees up
 *   - Safety valve: configurable timeout (~3 min) aborts stalled requests
 *   - Returns "queued" status to the client for polling
 *
 * ⚠️ SINGLE-INSTANCE CONSTRAINT: This module uses an in-memory queue.
 * Do NOT run a second instance or move to serverless before migrating
 * to Redis (Upstash / Redis Cloud / self-host).
 */

import type { ModelFamily } from './types.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Safety valve timeout: abort if the entire pool stays unavailable (ms) */
const SAFETY_VALVE_TIMEOUT_MS = parseInt(
  process.env.QUEUE_SAFETY_VALVE_MS || '180000', // 3 minutes
  10
);

/** Maximum queue depth per pool (prevent memory exhaustion) */
const MAX_QUEUE_DEPTH = 100;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type QueueStatus = 'queued' | 'processing' | 'completed' | 'aborted';

export interface QueueEntry {
  id: string;
  modelFamily: ModelFamily;
  enqueuedAt: number;
  status: QueueStatus;
  resolve: (acquired: boolean) => void;
  timeoutHandle: ReturnType<typeof setTimeout>;
}

export interface QueueStats {
  modelFamily: ModelFamily;
  depth: number;
  oldestEntryAge: number | null;
  maxDepth: number;
}

// ---------------------------------------------------------------------------
// Queue State
// ---------------------------------------------------------------------------

const queues = new Map<ModelFamily, QueueEntry[]>();

let entryCounter = 0;

function getQueue(family: ModelFamily): QueueEntry[] {
  let q = queues.get(family);
  if (!q) {
    q = [];
    queues.set(family, q);
  }
  return q;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Enqueues a request to wait for a slot in the specified model family's pool.
 *
 * Returns a Promise that resolves to `true` when a slot becomes available,
 * or `false` if the safety valve fires (timeout) or queue is full.
 *
 * @param modelFamily - The model family pool to queue for
 * @returns Promise<boolean> - true if slot acquired, false if aborted
 */
export function enqueue(modelFamily: ModelFamily): Promise<boolean> {
  const queue = getQueue(modelFamily);

  // Reject if queue is full
  if (queue.length >= MAX_QUEUE_DEPTH) {
    console.warn(
      `[Queue] ${modelFamily} queue FULL (${queue.length}/${MAX_QUEUE_DEPTH}), rejecting`
    );
    return Promise.resolve(false);
  }

  return new Promise<boolean>((resolve) => {
    const id = `q_${++entryCounter}`;

    // Safety valve: abort after timeout
    const timeoutHandle = setTimeout(() => {
      const idx = queue.findIndex(e => e.id === id);
      if (idx !== -1) {
        queue.splice(idx, 1);
        console.warn(
          `[Queue] ${modelFamily} entry ${id} ABORTED by safety valve ` +
          `(${SAFETY_VALVE_TIMEOUT_MS / 1000}s timeout)`
        );
        resolve(false);
      }
    }, SAFETY_VALVE_TIMEOUT_MS);

    const entry: QueueEntry = {
      id,
      modelFamily,
      enqueuedAt: Date.now(),
      status: 'queued',
      resolve,
      timeoutHandle,
    };

    queue.push(entry);

    console.log(
      `[Queue] ${modelFamily}: request ${id} queued (position ${queue.length})`
    );
  });
}

/**
 * Signals that a slot has freed up in the specified model family's pool.
 * Dequeues the next waiting request (FIFO) and resolves its promise.
 *
 * Call this from the concurrency tracker's releaseSlot callback.
 *
 * @param modelFamily - The model family pool where a slot freed up
 * @returns true if a queued request was dequeued, false if queue was empty
 */
export function dequeue(modelFamily: ModelFamily): boolean {
  const queue = getQueue(modelFamily);

  if (queue.length === 0) {
    return false;
  }

  const entry = queue.shift()!;
  clearTimeout(entry.timeoutHandle);
  entry.status = 'processing';

  console.log(
    `[Queue] ${modelFamily}: dequeued ${entry.id} ` +
    `(waited ${Date.now() - entry.enqueuedAt}ms, ${queue.length} remaining)`
  );

  entry.resolve(true);
  return true;
}

/**
 * Gets the current queue stats for a model family.
 */
export function getQueueStats(modelFamily: ModelFamily): QueueStats {
  const queue = getQueue(modelFamily);
  return {
    modelFamily,
    depth: queue.length,
    oldestEntryAge: queue.length > 0 ? Date.now() - queue[0].enqueuedAt : null,
    maxDepth: MAX_QUEUE_DEPTH,
  };
}

/**
 * Gets queue depths for all model families.
 */
export function getAllQueueStats(): QueueStats[] {
  const families: ModelFamily[] = ['nano-banana-pro', 'gpt-image-2'];
  return families.map(f => getQueueStats(f));
}

/**
 * Resets all queues (for testing only).
 */
export function resetQueues(): void {
  for (const [, queue] of queues) {
    for (const entry of queue) {
      clearTimeout(entry.timeoutHandle);
      entry.resolve(false);
    }
  }
  queues.clear();
  entryCounter = 0;
}
