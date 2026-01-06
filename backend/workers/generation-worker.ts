/**
 * Generation Background Worker
 *
 * Processes AI image generation requests asynchronously using a polling mechanism.
 * Runs continuously to handle the generation queue and retry failed requests.
 */

import { processPendingGenerations, retryFailedGenerations, getGenerationStats } from '../services/generation-processor.js';

// Worker configuration
const PENDING_CHECK_INTERVAL = 30 * 1000; // 30 seconds
const RETRY_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const STATS_LOG_INTERVAL = 2 * 60 * 1000; // 2 minutes

let workerStarted = false;
let pendingInterval: NodeJS.Timeout | null = null;
let retryInterval: NodeJS.Timeout | null = null;
let statsInterval: NodeJS.Timeout | null = null;

/**
 * Starts the generation background worker
 */
export function startGenerationWorker(): void {
  if (workerStarted) {
    console.log('⚠️ Generation worker already running');
    return;
  }

  console.log('🚀 Starting generation background worker...');
  workerStarted = true;

  // Process pending generations every 30 seconds
  pendingInterval = setInterval(async () => {
    try {
      await processPendingGenerations();
    } catch (error) {
      console.error('💥 Error in pending generation processor:', error);
    }
  }, PENDING_CHECK_INTERVAL);

  // Retry failed generations every 5 minutes
  retryInterval = setInterval(async () => {
    try {
      await retryFailedGenerations();
    } catch (error) {
      console.error('💥 Error in failed generation retry processor:', error);
    }
  }, RETRY_CHECK_INTERVAL);

  // Log statistics every 2 minutes
  statsInterval = setInterval(async () => {
    try {
      const stats = await getGenerationStats();
      if (stats) {
        console.log('📊 Generation Stats:', {
          total: stats.total,
          pending: stats.pending,
          generating: stats.generating,
          completed: stats.completed,
          failed: stats.failed
        });
      }
    } catch (error) {
      console.error('💥 Error fetching generation stats:', error);
    }
  }, STATS_LOG_INTERVAL);

  console.log('✅ Generation worker started successfully');
  console.log(`⏰ Processing intervals:`);
  console.log(`  - Pending generations: every ${PENDING_CHECK_INTERVAL / 1000}s`);
  console.log(`  - Failed retries: every ${RETRY_CHECK_INTERVAL / 1000}s`);
  console.log(`  - Stats logging: every ${STATS_LOG_INTERVAL / 1000}s`);
}

/**
 * Stops the generation background worker
 */
export function stopGenerationWorker(): void {
  if (!workerStarted) {
    console.log('⚠️ Generation worker not running');
    return;
  }

  console.log('🛑 Stopping generation background worker...');

  if (pendingInterval) {
    clearInterval(pendingInterval);
    pendingInterval = null;
  }

  if (retryInterval) {
    clearInterval(retryInterval);
    retryInterval = null;
  }

  if (statsInterval) {
    clearInterval(statsInterval);
    statsInterval = null;
  }

  workerStarted = false;
  console.log('✅ Generation worker stopped');
}

/**
 * Gets the current status of the generation worker
 */
export function getWorkerStatus(): {
  running: boolean;
  intervals: {
    pending: number;
    retry: number;
    stats: number;
  };
} {
  return {
    running: workerStarted,
    intervals: {
      pending: PENDING_CHECK_INTERVAL,
      retry: RETRY_CHECK_INTERVAL,
      stats: STATS_LOG_INTERVAL
    }
  };
}

/**
 * Manually triggers processing of pending generations (for testing/debugging)
 */
export async function triggerPendingProcessing(): Promise<void> {
  console.log('🔧 Manually triggering pending generation processing...');
  try {
    await processPendingGenerations();
    console.log('✅ Manual processing completed');
  } catch (error) {
    console.error('❌ Manual processing failed:', error);
    throw error;
  }
}

/**
 * Manually triggers retry of failed generations (for testing/debugging)
 */
export async function triggerFailedRetry(): Promise<void> {
  console.log('🔧 Manually triggering failed generation retry...');
  try {
    await retryFailedGenerations();
    console.log('✅ Manual retry completed');
  } catch (error) {
    console.error('❌ Manual retry failed:', error);
    throw error;
  }
}

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n📴 Received SIGINT, shutting down gracefully...');
  stopGenerationWorker();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n📴 Received SIGTERM, shutting down gracefully...');
  stopGenerationWorker();
  process.exit(0);
});

// Start worker when module is imported (only in production/worker environment)
// This can be controlled via environment variable
if (process.env.START_GENERATION_WORKER === 'true') {
  startGenerationWorker();
}
