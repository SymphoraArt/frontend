/**
 * Alerting System
 * Sends alerts for critical errors and monitoring
 */

export interface Alert {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Send an alert to monitoring system
 */
export async function sendAlert(
  type: string,
  options: {
    severity: 'low' | 'medium' | 'high' | 'critical';
    message?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<void> {
  const alert: Alert = {
    type,
    severity: options.severity,
    message: options.message || `Alert: ${type}`,
    metadata: options.metadata,
    timestamp: new Date().toISOString(),
  };

  // Log alert (in production, this would send to monitoring service)
  const logLevel = options.severity === 'critical' || options.severity === 'high' 
    ? 'error' 
    : 'warn';

  console[logLevel](`🚨 ALERT [${options.severity.toUpperCase()}]: ${type}`, {
    message: alert.message,
    metadata: alert.metadata,
    timestamp: alert.timestamp,
  });

  // In production, you would:
  // - Send to monitoring service (e.g., Sentry, DataDog, CloudWatch)
  // - Send to Slack/Discord webhook
  // - Store in alerts database
  // - Trigger PagerDuty for critical alerts

  // For now, we'll also try to store in Supabase if table exists
  try {
    const { getSupabaseServerClient } = await import('@/lib/supabaseServer');
    const supabase = getSupabaseServerClient();

    // Try to insert alert (table may not exist yet)
    try {
      const { error } = await supabase
        .from('system_alerts')
        .insert({
          alert_type: type,
          severity: options.severity,
          message: alert.message,
          metadata: alert.metadata || {},
          created_at: alert.timestamp,
        });
      if (error) {
        // Table doesn't exist or other error - that's okay, we still logged it
      }
    } catch (err) {
      // Table doesn't exist - that's okay, we still logged it
    }
  } catch (error) {
    // Alerts table doesn't exist - that's fine, we logged it
  }
}

/**
 * Send critical alert for earnings update failure
 */
export async function sendEarningsAlert(params: {
  promptId: string;
  creatorId: string;
  amountCents: number;
  purchaseId?: string;
  error: unknown;
}): Promise<void> {
  await sendAlert('earnings_update_failed', {
    severity: 'high',
    message: `Failed to update creator earnings: ${params.creatorId} for purchase ${params.purchaseId || 'unknown'}`,
    metadata: {
      promptId: params.promptId,
      creatorId: params.creatorId,
      amountCents: params.amountCents,
      purchaseId: params.purchaseId,
      error: params.error instanceof Error ? params.error.message : String(params.error),
    },
  });
}

/**
 * Send alert for prompt stats update failure
 */
export async function sendPromptStatsAlert(params: {
  promptId: string;
  totalSales: number;
  totalRevenue: number;
  error: unknown;
}): Promise<void> {
  await sendAlert('prompt_stats_update_failed', {
    severity: 'medium',
    message: `Failed to update prompt stats: ${params.promptId}`,
    metadata: {
      promptId: params.promptId,
      totalSales: params.totalSales,
      totalRevenue: params.totalRevenue,
      error: params.error instanceof Error ? params.error.message : String(params.error),
    },
  });
}