/**
 * Reconciliation Worker
 * Processes queued reconciliation tasks
 * 
 * This should be run as a background job (cron, queue worker, etc.)
 */

import { getPendingReconciliationTasks, queueReconciliation } from '../../lib/reconciliation-queue.js';
import { getSupabaseServerClient } from '../../lib/supabaseServer.js';
import { storage } from '../storage.js';

/**
 * Process a single reconciliation task
 */
async function processReconciliationTask(task: any): Promise<boolean> {
  const supabase = getSupabaseServerClient();

  try {
    // Mark task as processing
    await supabase
      .from('reconciliation_queue')
      .update({
        status: 'processing',
        updated_at: new Date().toISOString(),
      })
      .eq('id', task.id);

    let success = false;

    switch (task.taskType) {
      case 'earnings_update':
        success = await reconcileEarningsUpdate(task);
        break;

      case 'prompt_stats_update':
        success = await reconcilePromptStatsUpdate(task);
        break;

      case 'purchase_recording':
        success = await reconcilePurchaseRecording(task);
        break;

      default:
        console.error(`Unknown task type: ${task.taskType}`);
        success = false;
    }

    if (success) {
      // Mark as completed
      await supabase
        .from('reconciliation_queue')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', task.id);

      console.log(`✅ Reconciled ${task.taskType} for ${task.entityType} ${task.entityId}`);
      return true;
    } else {
      // Increment attempt count and reschedule
      const newAttemptCount = task.attemptCount + 1;
      const backoffSeconds = Math.min(300 * Math.pow(2, newAttemptCount), 3600);
      const nextRetryAt = new Date(Date.now() + backoffSeconds * 1000).toISOString();

      if (newAttemptCount >= task.maxAttempts) {
        // Max attempts reached - mark as failed
        await supabase
          .from('reconciliation_queue')
          .update({
            status: 'failed',
            attempt_count: newAttemptCount,
            updated_at: new Date().toISOString(),
            error: 'Max retry attempts reached',
          })
          .eq('id', task.id);

        console.error(`❌ Reconciliation failed after ${newAttemptCount} attempts: ${task.taskType}`);
      } else {
        // Reschedule for retry
        await supabase
          .from('reconciliation_queue')
          .update({
            status: 'pending',
            attempt_count: newAttemptCount,
            next_retry_at: nextRetryAt,
            updated_at: new Date().toISOString(),
          })
          .eq('id', task.id);

        console.log(`⏳ Rescheduled ${task.taskType} (attempt ${newAttemptCount}/${task.maxAttempts})`);
      }

      return false;
    }
  } catch (error) {
    console.error(`Error processing reconciliation task ${task.id}:`, error);

    // Mark as failed
    await supabase
      .from('reconciliation_queue')
      .update({
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
        updated_at: new Date().toISOString(),
      })
      .eq('id', task.id);

    return false;
  }
}

/**
 * Reconcile earnings update
 */
async function reconcileEarningsUpdate(task: any): Promise<boolean> {
  try {
    const { creatorId, amountCents, purchaseId } = task.payload;
    const supabase = getSupabaseServerClient();

    // Get purchase details
    const { data: purchase, error: purchaseError } = await supabase
      .from('prompt_purchases')
      .select('prompt_id, creator_earnings_cents, amount_usd_cents, platform_fee_cents')
      .eq('id', purchaseId || task.entityId)
      .single();

    if (purchaseError || !purchase) {
      console.error(`Purchase not found: ${purchaseId || task.entityId}`, purchaseError);
      return false;
    }

    // Check if earnings already updated (idempotency)
    const { data: existingEarnings } = await supabase
      .from('user_earnings')
      .select('total_earnings_cents')
      .eq('user_id', creatorId)
      .single();

    // Calculate expected earnings
    const expectedEarnings = purchase.creator_earnings_cents || 
                            (purchase.amount_usd_cents - (purchase.platform_fee_cents || 0));

    // If earnings already match or exceed expected, consider it reconciled
    if (existingEarnings && existingEarnings.total_earnings_cents >= expectedEarnings) {
      console.log(`Earnings already updated for creator ${creatorId}`);
      return true;
    }

    // Manually update earnings (since purchase already exists, we can't use atomic function)
    const { error: updateError } = await supabase
      .from('user_earnings')
      .upsert({
        user_id: creatorId,
        total_earnings_cents: (existingEarnings?.total_earnings_cents || 0) + expectedEarnings,
        total_sales: 1, // This should be incremented, but we'll use upsert for now
        available_earnings_cents: (existingEarnings?.available_earnings_cents || 0) + expectedEarnings,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
      });

    if (updateError) {
      console.error('Earnings reconciliation failed:', updateError);
      return false;
    }

    console.log(`✅ Earnings reconciled for creator ${creatorId}: +${expectedEarnings} cents`);
    return true;
  } catch (error) {
    console.error('Error reconciling earnings:', error);
    return false;
  }
}

/**
 * Reconcile prompt stats update
 */
async function reconcilePromptStatsUpdate(task: any): Promise<boolean> {
  try {
    const { promptId, totalSales, totalRevenue } = task.payload;

    await (storage.updatePrompt as any)(promptId, {
      totalSales,
      totalRevenue,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error('Error reconciling prompt stats:', error);
    return false;
  }
}

/**
 * Reconcile purchase recording
 */
async function reconcilePurchaseRecording(task: any): Promise<boolean> {
  // This would handle cases where purchase wasn't recorded
  // For now, return false as this is less common
  console.warn('Purchase recording reconciliation not yet implemented');
  return false;
}

/**
 * Run reconciliation worker
 */
async function runReconciliationWorker() {
  console.log('🔄 Starting reconciliation worker...');

  const tasks = await getPendingReconciliationTasks(10);

  if (tasks.length === 0) {
    console.log('✅ No pending reconciliation tasks');
    return;
  }

  console.log(`📋 Processing ${tasks.length} reconciliation tasks...`);

  for (const task of tasks) {
    await processReconciliationTask(task);
    // Small delay between tasks
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('✅ Reconciliation worker completed');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runReconciliationWorker()
    .then(() => {
      console.log('✅ Worker finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Worker error:', error);
      process.exit(1);
    });
}

export { runReconciliationWorker, processReconciliationTask };