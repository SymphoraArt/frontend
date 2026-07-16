-- Account deletion with guardian co-approval (Kev, 2026-07-14).
-- Mirrors the recovery flow: if the user has confirmed guardians, enough of
-- them must approve before the account is soft-deleted (users.deleted_at).
-- Run once in the Supabase SQL editor. Idempotent.

CREATE TABLE IF NOT EXISTS deletion_requests (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status         text NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'completed', 'cancelled', 'expired')),
  owner_key_hash text NOT NULL,             -- only the initiating browser can finalize
  created_at     timestamptz NOT NULL DEFAULT now(),
  expires_at     timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS deletion_requests_user_idx ON deletion_requests (user_id);

-- One row per (request, guardian): possessing the emailed approve link is the
-- proof (same trust model as the guardian accept/decline flow — no code).
CREATE TABLE IF NOT EXISTS deletion_approvals (
  request_id    uuid NOT NULL REFERENCES deletion_requests(id) ON DELETE CASCADE,
  guardian_id   uuid NOT NULL REFERENCES recovery_guardians(id) ON DELETE CASCADE,
  approve_token text NOT NULL,
  approved_at   timestamptz,
  PRIMARY KEY (request_id, guardian_id)
);
CREATE UNIQUE INDEX IF NOT EXISTS deletion_approvals_token_idx ON deletion_approvals (approve_token);

ALTER TABLE deletion_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE deletion_approvals ENABLE ROW LEVEL SECURITY;
