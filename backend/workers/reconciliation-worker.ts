/**
 * Reconciliation Worker
 *
 * Processes failed operations from the reconciliation queue
 * with exponential backoff retry logic.
 */

import { getSupabaseServerClient } from '@/lib/supabaseServer';

const MAX_BATCH_SIZE = 10;
const WORKER_INTERVAL_MS = 30000; // 30 seconds

interface FailedOperation {
  id: string;
  task_type: string;
  entity_id: string;
  entity_type: string;
  payload: any;
  attempt_count: number;
  max_attempts: number;
  error_message?: string;
  next_retry_at?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

/**
 * Calculate next retry time with exponential backoff
 * Formula: 2^attempt * base_delay (in milliseconds)
 */
function calculateNextRetryTime(attemptCount: number, baseDelayMs: number = 5000): Date {
  const exponentialDelay = Math.pow(2, attemptCount) * baseDelayMs;
  const maxDelay = 3600000; // 1 hour max
  const delay = Math.min(exponentialDelay, maxDelay);
  return new Date(Date.now() + delay);
}

/**
 * Process a single failed operation
 */
async function processFailedOperation(operation: FailedOperation): Promise<boolean> {
  const supabase = getSupabaseServerClient();

  try {
    console.log(`Processing failed operation ${operation.id} (attempt ${operation.attempt_count + 1}/${operation.max_attempts}):`, {
      taskType: operation.task_type,
      entityId: operation.entity_id,
      entityType: operation.entity_type,
    });

    // Mark as processing
    await supabase
      .from('failed_operations')
      .update({ status: 'processing', updated_at: new Date().toISOString() })
      .eq('id', operation.id);

    let success = false;

    // Handle different task types
    switch (operation.task_type) {
      case 'earnings_update':
        success = await retryEarningsUpdate(operation);
        break;

      case 'prompt_stats_update':
        success = await retryPromptStatsUpdate(operation);
        break;

      case 'purchase_recording':
        success = await retryPurchaseRecording(operation);
        break;

      default:
        console.warn(`Unknown task type: ${operation.task_type}`);
        success = false;
    }

    if (success) {
      // Mark as completed
      await supabase
        .from('failed_operations')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', operation.id);

      console.log(`✅ Successfully reconciled operation ${operation.id}`);
      return true;
    } else {
      // Increment attempt count and schedule next retry
      const newAttemptCount = operation.attempt_count + 1;

      if (newAttemptCount >= operation.max_attempts) {
        // Max attempts reached - mark as failed
        await supabase
          .from('failed_operations')
          .update({
            status: 'failed',
            attempt_count: newAttemptCount,
            updated_at: new Date().toISOString(),
            error_message: 'Max retry attempts exceeded',
          })
          .eq('id', operation.id);

        console.error(`❌ Operation ${operation.id} failed after ${newAttemptCount} attempts`);
        return false;
      } else {
        // Schedule next retry with exponential backoff
        const nextRetryAt = calculateNextRetryTime(newAttemptCount);

        await supabase
          .from('failed_operations')
          .update({
            status: 'pending',
            attempt_count: newAttemptCount,
            next_retry_at: nextRetryAt.toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', operation.id);

        console.log(`⏳ Scheduled retry for operation ${operation.id} at ${nextRetryAt.toISOString()}`);
        return false;
      }
    }
  } catch (error) {
    console.error(`Error processing operation ${operation.id}:`, error);

    // Update error message
    await supabase
      .from('failed_operations')
      .update({
        status: 'pending',
        error_message: error instanceof Error ? error.message : String(error),
        updated_at: new Date().toISOString(),
      })
      .eq('id', operation.id);

    return false;
  }
}

/**
 * Retry earnings update
 */
async function retryEarningsUpdate(operation: FailedOperation): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  const payload = operation.payload;

  try {
    if (payload.operation === 'increment_listed_count') {
      // Increment listed count
      const { error } = await supabase.rpc('increment_user_prompts_listed', {
        p_user_id: payload.userId,
      });

      return !error;
    } else if (payload.operation === 'increment_earnings') {
      // Increment earnings from purchase
      const { error } = await supabase
        .from('user_earnings')
        .update({
          total_earnings_cents: payload.totalEarningsCents,
          total_sales: payload.totalSales,
          available_earnings_cents: payload.availableEarningsCents,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', payload.userId);

      return !error;
    }

    return false;
  } catch (error) {
    console.error('Error in retryEarningsUpdate:', error);
    return false;
  }
}

/**
 * Retry prompt stats update (MongoDB)
 */
async function retryPromptStatsUpdate(operation: FailedOperation): Promise<boolean> {
  const payload = operation.payload;

  try {
    const { storage } = await import('@/backend/storage');

    const success = await storage.updatePrompt(payload.promptId, {
      totalSales: payload.totalSales,
      totalRevenue: payload.totalRevenue,
      updatedAt: new Date().toISOString(),
    } as any);

    return !!success;
  } catch (error) {
    console.error('Error in retryPromptStatsUpdate:', error);
    return false;
  }
}

/**
 * Retry purchase recording (critical - requires manual intervention if this fails)
 */
async function retryPurchaseRecording(operation: FailedOperation): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  const payload = operation.payload;

  try {
    // Try to record purchase atomically
    const { data, error } = await supabase.rpc('record_prompt_purchase', {
      p_prompt_id: payload.promptId,
      p_buyer_id: payload.buyerId,
      p_seller_id: payload.sellerId,
      p_amount_usd_cents: payload.amountUsdCents,
      p_platform_fee_cents: payload.platformFeeCents,
      p_creator_earnings_cents: payload.creatorEarningsCents,
      p_transaction_hash: payload.transactionHash,
      p_chain_id: payload.chainId,
      p_chain_name: payload.chainName,
      p_payment_scheme: payload.paymentScheme || 'exact',
      p_prompt_title: payload.promptTitle,
      p_prompt_preview_image_url: payload.promptPreviewImageUrl,
    });

    if (error) {
      // Check if it's a duplicate (already recorded)
      if (error.code === '23505' || error.message?.includes('unique')) {
        console.log(`Purchase already recorded for ${payload.promptId} by ${payload.buyerId}`);
        return true; // Consider this a success
      }
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in retryPurchaseRecording:', error);
    return false;
  }
}

/**
 * Fetch pending operations ready for retry
 */
async function fetchPendingOperations(limit: number = MAX_BATCH_SIZE): Promise<FailedOperation[]> {
  const supabase = getSupabaseServerClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('failed_operations')
    .select('*')
    .eq('status', 'pending')
    .or(`next_retry_at.is.null,next_retry_at.lte.${now}`)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching pending operations:', error);
    return [];
  }

  return data || [];
}

/**
 * Main worker loop
 */
export async function runReconciliationWorker() {
  console.log('🔄 Starting reconciliation worker...');

  while (true) {
    try {
      const operations = await fetchPendingOperations();

      if (operations.length > 0) {
        console.log(`Found ${operations.length} pending operations to process`);

        // Process operations sequentially (could be parallelized if needed)
        for (const operation of operations) {
          await processFailedOperation(operation);
        }
      }

      // Wait before next iteration
      await new Promise(resolve => setTimeout(resolve, WORKER_INTERVAL_MS));
    } catch (error) {
      console.error('Error in reconciliation worker loop:', error);
      // Wait before retrying to avoid rapid failure loops
      await new Promise(resolve => setTimeout(resolve, WORKER_INTERVAL_MS));
    }
  }
}

/**
 * Process all pending operations once (useful for manual triggers)
 */
export async function processAllPendingOperations(): Promise<{
  processed: number;
  succeeded: number;
  failed: number;
}> {
  const operations = await fetchPendingOperations(100); // Process up to 100

  let succeeded = 0;
  let failed = 0;

  for (const operation of operations) {
    const success = await processFailedOperation(operation);
    if (success) {
      succeeded++;
    } else {
      failed++;
    }
  }

  return {
    processed: operations.length,
    succeeded,
    failed,
  };
}

// If running as a standalone script
if (require.main === module) {
  runReconciliationWorker().catch(error => {
    console.error('Fatal error in reconciliation worker:', error);
    process.exit(1);
  });
}
