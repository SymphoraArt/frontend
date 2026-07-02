-- ============================================================================
-- ACCESS REQUESTS (landing page "Request access" applications)
-- Run this once in the Supabase Dashboard -> SQL Editor.
-- (Also appended to combined-supabase-migrations.sql for fresh setups.)
--
-- One row per applicant email; re-applying updates the row, status is kept.
-- Written by /api/access-request (service role).
-- ============================================================================

CREATE TABLE IF NOT EXISTS access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  about TEXT NOT NULL,               -- "Describe yourself briefly" answer
  socials TEXT,                      -- optional social link
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_access_requests_status ON access_requests(status);
CREATE INDEX IF NOT EXISTS idx_access_requests_created ON access_requests(created_at DESC);

ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename   = 'access_requests'
      AND policyname  = 'Service role can manage access requests'
  ) THEN
    CREATE POLICY "Service role can manage access requests"
      ON access_requests FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;
