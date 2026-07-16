-- Guardian recovery EXECUTION flow (Kev's design, 2026-07-12):
-- owner starts a request on /reset-password → each confirmed EMAIL guardian
-- gets a 7-digit code by mail → guardian enters it on /guardian → at the
-- approval threshold the owner may set a new password.
--
-- ⚠ recovery_requests already EXISTS in the live DB (verified: id, user_id,
-- created_at, status) — this migration ALTERs it. Run once. Idempotent.

ALTER TABLE recovery_requests ADD COLUMN IF NOT EXISTS owner_key_hash text;   -- proves the same browser that started the request completes it
ALTER TABLE recovery_requests ADD COLUMN IF NOT EXISTS expires_at timestamptz;
ALTER TABLE recovery_requests DROP CONSTRAINT IF EXISTS recovery_requests_status_check;
ALTER TABLE recovery_requests ADD CONSTRAINT recovery_requests_status_check
  CHECK (status IN ('pending', 'approved', 'completed', 'expired', 'cancelled')) NOT VALID;
CREATE INDEX IF NOT EXISTS recovery_requests_user_idx ON recovery_requests (user_id);

-- One row per (request, guardian): the emailed code (hashed) + approval mark.
CREATE TABLE IF NOT EXISTS recovery_approvals (
  request_id       uuid NOT NULL REFERENCES recovery_requests(id) ON DELETE CASCADE,
  guardian_id      uuid NOT NULL REFERENCES recovery_guardians(id) ON DELETE CASCADE,
  code_hash        text NOT NULL,
  approved_at      timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  last_reminded_at timestamptz,          -- reminder mails: when we last nudged
  PRIMARY KEY (request_id, guardian_id)
);
-- Idempotent for DBs where the table pre-exists without the reminder columns.
ALTER TABLE recovery_approvals ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE recovery_approvals ADD COLUMN IF NOT EXISTS last_reminded_at timestamptz;

-- Owner preference: after how many days a guardian who hasn't answered gets
-- a reminder mail to please unlock the account (Settings → Recovery & 2FA).
ALTER TABLE recovery_settings ADD COLUMN IF NOT EXISTS reminder_days int NOT NULL DEFAULT 3;

ALTER TABLE recovery_approvals ENABLE ROW LEVEL SECURITY;
