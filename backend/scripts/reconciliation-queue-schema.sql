-- Reconciliation Queue Schema
-- Stores failed operations for retry and reconciliation

CREATE TABLE IF NOT EXISTS reconciliation_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- What needs to be reconciled
    task_type TEXT NOT NULL
        CHECK (task_type IN ('earnings_update', 'prompt_stats_update', 'purchase_recording')),
    entity_id TEXT NOT NULL,              -- ID of the entity (purchase ID, prompt ID, etc.)
    entity_type TEXT NOT NULL
        CHECK (entity_type IN ('purchase', 'prompt', 'user')),

    -- Task data
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Retry tracking
    attempt_count INTEGER NOT NULL DEFAULT 0,
    max_attempts INTEGER NOT NULL DEFAULT 5,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    error TEXT,                            -- Last error message

    -- Timing
    next_retry_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_reconciliation_pending 
ON reconciliation_queue(status, next_retry_at) 
WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_reconciliation_entity 
ON reconciliation_queue(entity_type, entity_id);

CREATE INDEX IF NOT EXISTS idx_reconciliation_type 
ON reconciliation_queue(task_type, status);

-- System Alerts Table (optional - for monitoring)
CREATE TABLE IF NOT EXISTS system_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    alert_type TEXT NOT NULL,
    severity TEXT NOT NULL
        CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Status
    acknowledged BOOLEAN DEFAULT FALSE,
    resolved BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for alerts
CREATE INDEX IF NOT EXISTS idx_alerts_severity_time 
ON system_alerts(severity, created_at DESC) 
WHERE resolved = FALSE;

CREATE INDEX IF NOT EXISTS idx_alerts_type 
ON system_alerts(alert_type, created_at DESC);

-- Add comments
COMMENT ON TABLE reconciliation_queue IS 'Queue for failed operations that need reconciliation';
COMMENT ON TABLE system_alerts IS 'System alerts and monitoring events';