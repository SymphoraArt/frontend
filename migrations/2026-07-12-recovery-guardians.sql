-- Social-recovery guardians — v2, adapted to the PRE-EXISTING table.
--
-- ⚠ A recovery_guardians table already exists in the live DB (old design with
-- guardian_user_id linking platform users; verified 2026-07-12: it has
-- id, user_id, guardian_type, status, confirmed_at, guardian_user_id).
-- A plain CREATE TABLE IF NOT EXISTS would silently do nothing, so this
-- migration ALTERs the existing table to what the guardians API needs.
-- Run once in the Supabase SQL editor. Idempotent.

-- Columns the API writes (wallet/email guardians via invite links):
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS value text;                -- Solana address or email
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS label text;
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS invite_token text;         -- random hex; the /guardian link
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS confirmed_signature text;  -- wallet guardians: base64 ed25519 sig
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
-- Invite-reminder engine: pending email guardians get nudged every 14 days,
-- up to 3 times, then go 'unresponsive' and we stop emailing (until re-invited).
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS reminder_count int NOT NULL DEFAULT 0;
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS last_reminded_at timestamptz;
-- Phone (SMS) guardians: hashed one-time code + escalating resend / ban state.
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS sms_code_hash text;
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS sms_last_sent_at timestamptz;
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS sms_resend_count int NOT NULL DEFAULT 0; -- resends in current cycle
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS sms_ban_count int NOT NULL DEFAULT 0;    -- completed 5-resend cycles
ALTER TABLE recovery_guardians ADD COLUMN IF NOT EXISTS sms_banned_until timestamptz;

-- Legacy encrypted-value columns (old design) are NOT NULL without defaults —
-- they blocked every API insert (23502, found 2026-07-13). The API stores the
-- plain value in "value" instead.
ALTER TABLE recovery_guardians ALTER COLUMN guardian_value_ct  DROP NOT NULL;
ALTER TABLE recovery_guardians ALTER COLUMN guardian_value_iv  DROP NOT NULL;
ALTER TABLE recovery_guardians ALTER COLUMN guardian_value_tag DROP NOT NULL;
ALTER TABLE recovery_guardians ALTER COLUMN guardian_value_kid DROP NOT NULL;

-- Status/type values used by the API ('pending' matches the column default;
-- shows orange in Settings until the guardian accepts, then 'confirmed' =
-- green). NOT VALID = legacy rows aren't checked, new writes are.
ALTER TABLE recovery_guardians DROP CONSTRAINT IF EXISTS recovery_guardians_status_check;
ALTER TABLE recovery_guardians ADD CONSTRAINT recovery_guardians_status_check
  CHECK (status IN ('pending', 'confirmed', 'unresponsive')) NOT VALID;
ALTER TABLE recovery_guardians DROP CONSTRAINT IF EXISTS recovery_guardians_guardian_type_check;
ALTER TABLE recovery_guardians ADD CONSTRAINT recovery_guardians_guardian_type_check
  CHECK (guardian_type IN ('wallet', 'email', 'authenticator', 'phone', 'user')) NOT VALID;
  -- 'authenticator' = your own TOTP (secret stored in guardian_value_ct/iv/tag/kid,
  -- encrypted); 'phone' = SMS (verification pending an SMS provider); 'user' = legacy.

-- Uniqueness the API relies on (409 on duplicates; token lookup). Partial /
-- nullable-safe so legacy rows without value/invite_token don't block it.
CREATE UNIQUE INDEX IF NOT EXISTS recovery_guardians_invite_token_key
  ON recovery_guardians (invite_token) WHERE invite_token IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS recovery_guardians_user_value_key
  ON recovery_guardians (user_id, value) WHERE value IS NOT NULL;
CREATE INDEX IF NOT EXISTS recovery_guardians_user_idx ON recovery_guardians (user_id);

-- Per-user recovery preferences (approval threshold). Did NOT exist (verified).
CREATE TABLE IF NOT EXISTS recovery_settings (
  user_id    uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  threshold  int NOT NULL DEFAULT 2 CHECK (threshold BETWEEN 1 AND 10),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS on, no policies: only our server routes (service_role) touch these.
ALTER TABLE recovery_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_settings ENABLE ROW LEVEL SECURITY;
