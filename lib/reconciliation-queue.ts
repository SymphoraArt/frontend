/**
 * Reconciliation Queue System
 * Queues failed operations for retry and reconciliation
 */

import { getSupabaseServerClient } from '@/lib/supabaseServer';
import type { ReconciliationTaskRow } from '@/shared/types';

export interface ReconciliationTask {
  id?: string;
  taskType: 'earnings_update' | 'prompt_stats_update' | 'purchase_recording';
  entityId: string; // purchase ID, prompt ID, etc.
  entityType: 'purchase' | 'prompt' | 'user';
  payload: Record<string, unknown>;
  attemptCount: number;
  maxAttempts: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  createdAt?: string;
  updatedAt?: string;
  nextRetryAt?: string;
}

/**
 * Queue a reconciliation task for retry
 */
export async function queueReconciliation(
  task: Omit<ReconciliationTask, 'id' | 'status' | 'attemptCount' | 'createdAt' | 'updatedAt'>
): Promise<string | null> {
  try {
    const supabase = getSupabaseServerClient();

    // Calculate next retry time (exponential backoff)
    const backoffSeconds = Math.min(300 * Math.pow(2, 0), 3600); // Max 1 hour (attemptCount defaults to 0 for new tasks)
    const nextRetryAt = new Date(Date.now() + backoffSeconds * 1000).toISOString();

    const { data, error } = await supabase
      .from('reconciliation_queue')
      .insert({
        task_type: task.taskType,
        entity_id: task.entityId,
        entity_type: task.entityType,
        payload: task.payload,
        attempt_count: 0, // New tasks start with 0 attempts
        max_attempts: task.maxAttempts || 5,
        status: 'pending',
        next_retry_at: nextRetryAt,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      // Table might not exist yet - log but don't fail
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('⚠️  Reconciliation queue table does not exist. Run: npm run reconciliation:migrate');
        console.warn('   Task details logged for manual reconciliation:', {
          taskType: task.taskType,
          entityId: task.entityId,
          entityType: task.entityType,
          payload: task.payload,
        });
      } else {
        console.error('Failed to queue reconciliation task:', error);
      }
      return null;
    }

    console.log(`✅ Reconciliation task queued: ${task.taskType} for ${task.entityType} ${task.entityId}`);
    return data.id;
  } catch (error) {
    console.error('Error queueing reconciliation:', error);
    return null;
  }
}

/**
 * Queue earnings reconciliation
 */
export async function queueEarningsReconciliation(params: {
  purchaseId: string;
  creatorId: string;
  amountCents: number;
  attemptCount?: number;
}): Promise<string | null> {
  return queueReconciliation({
    taskType: 'earnings_update',
    entityId: params.purchaseId,
    entityType: 'purchase',
    payload: {
      creatorId: params.creatorId,
      amountCents: params.amountCents,
      purchaseId: params.purchaseId,
    },
    maxAttempts: 5,
  });
}

/**
 * Queue prompt stats reconciliation
 */
export async function queuePromptStatsReconciliation(params: {
  promptId: string;
  totalSales: number;
  totalRevenue: number;
  attemptCount?: number;
}): Promise<string | null> {
  return queueReconciliation({
    taskType: 'prompt_stats_update',
    entityId: params.promptId,
    entityType: 'prompt',
    payload: {
      promptId: params.promptId,
      totalSales: params.totalSales,
      totalRevenue: params.totalRevenue,
    },
    maxAttempts: 5,
  });
}

/**
 * Get pending reconciliation tasks
 */
export async function getPendingReconciliationTasks(limit: number = 10): Promise<ReconciliationTask[]> {
  try {
    const supabase = getSupabaseServerClient();

    // Fetch pending tasks and filter by attempt_count < max_attempts in JavaScript
    // since Supabase JS client doesn't support raw SQL comparisons
    const { data, error } = await supabase
      .from('reconciliation_queue')
      .select('*')
      .eq('status', 'pending')
      .lte('next_retry_at', new Date().toISOString())
      .order('created_at', { ascending: true })
      .limit(limit * 2); // Fetch more to account for filtering

    if (error) {
      console.error('Error fetching pending reconciliation tasks:', error);
      return [];
    }

    // Filter tasks where attempt_count < max_attempts
    const filteredTasks = (data || []).filter((task: ReconciliationTaskRow) => 
      task.attempt_count < task.max_attempts
    ).slice(0, limit);

    return filteredTasks.map((task: ReconciliationTaskRow): ReconciliationTask => ({
      id: task.id,
      taskType: task.task_type as ReconciliationTask['taskType'],
      entityId: task.entity_id,
      entityType: task.entity_type as ReconciliationTask['entityType'],
      payload: task.payload as Record<string, unknown>,
      attemptCount: task.attempt_count,
      maxAttempts: task.max_attempts,
      status: task.status as ReconciliationTask['status'],
      error: task.error,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
      nextRetryAt: task.next_retry_at,
    }));
  } catch (error) {
    console.error('Error getting pending tasks:', error);
    return [];
  }
}