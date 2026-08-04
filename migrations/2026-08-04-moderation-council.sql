-- Moderation council — the tables the admin panel already expects.
--
-- app/api/admin/route.ts and lib/ip-hash.ts were written against these tables
-- but the tables were never created, so every council tab shows a setup notice
-- and IP capture no-ops. Column names/types below were derived from the live
-- callers (probed 2026-08-04): the code is the contract here.
--
-- Verified live before writing (PostgREST + service key):
--   users, auth_sessions, bans, strikes, appeals  -> EXIST (reused, not recreated)
--   ip_bans, mod_proposals, mod_proposal_votes,
--   moderation_policy, admin_prefs                -> MISSING (created here)
--   auth_sessions has NO ip_hash column           -> added additively below
--
-- Re-runnable: every statement is guarded. No CHECK is added to any existing
-- column (migration 004's mistake), and no existing table is altered beyond a
-- single additive column.

-- ── Policy singleton (id is always 1) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS moderation_policy (
  id                smallint    PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  owner_user_id     uuid        NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  council_enabled   boolean     NOT NULL DEFAULT false,
  quorum            smallint    NOT NULL DEFAULT 1 CHECK (quorum >= 1),
  proposal_ttl_days smallint    NOT NULL DEFAULT 7 CHECK (proposal_ttl_days >= 1),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- ── Proposals (a council member proposes an action against a user) ──────────
CREATE TABLE IF NOT EXISTS mod_proposals (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  kind            text        NOT NULL,
  target_user_id  uuid        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_ip_hash  text,
  days            smallint,
  violation       text        NOT NULL,
  proposed_by     uuid        NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  quorum          smallint    NOT NULL,          -- snapshotted at creation
  status          text        NOT NULL DEFAULT 'pending',
  expires_at      timestamptz NOT NULL,
  decided_at      timestamptz,
  executed_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mod_proposals_open_idx
  ON mod_proposals (status, expires_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS mod_proposals_target_idx
  ON mod_proposals (target_user_id, created_at DESC);

-- ── Votes (one per member per proposal — the code upserts on this pair) ─────
CREATE TABLE IF NOT EXISTS mod_proposal_votes (
  proposal_id   uuid        NOT NULL REFERENCES mod_proposals(id) ON DELETE CASCADE,
  voter_user_id uuid        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vote          text        NOT NULL CHECK (vote IN ('confirm', 'deny')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (proposal_id, voter_user_id)
);

-- ── Per-admin notification addresses (encrypted at rest, lib/crypto envelope) ──
CREATE TABLE IF NOT EXISTS admin_prefs (
  user_id          uuid        PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  notify_email_ct  text,
  notify_email_iv  text,
  notify_email_tag text,
  notify_email_kid text,
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- ── IP bans (hashes only — a raw IP is never stored anywhere) ───────────────
CREATE TABLE IF NOT EXISTS ip_bans (
  ip_hash       text        PRIMARY KEY,          -- HMAC-SHA256(ip, AUTH_PEPPER)
  reason        text        NOT NULL,
  issued_by     uuid        NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  proposal_id   uuid        REFERENCES mod_proposals(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  lifted_at     timestamptz,
  lifted_by     uuid        REFERENCES users(id) ON DELETE SET NULL,
  lifted_reason text
);
CREATE INDEX IF NOT EXISTS ip_bans_active_idx ON ip_bans (ip_hash) WHERE lifted_at IS NULL;

-- ── Session IP hash (additive; enforcement reads it at login/register) ──────
ALTER TABLE auth_sessions ADD COLUMN IF NOT EXISTS ip_hash text;
CREATE INDEX IF NOT EXISTS auth_sessions_ip_hash_idx ON auth_sessions (ip_hash) WHERE ip_hash IS NOT NULL;

-- ── RLS: these tables are server-only. No client ever touches them. ─────────
ALTER TABLE moderation_policy  ENABLE ROW LEVEL SECURITY;
ALTER TABLE mod_proposals      ENABLE ROW LEVEL SECURITY;
ALTER TABLE mod_proposal_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_prefs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE ip_bans            ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['moderation_policy','mod_proposals','mod_proposal_votes','admin_prefs','ip_bans']
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'public' AND tablename = t AND policyname = 'Service role access only'
    ) THEN
      EXECUTE format(
        'CREATE POLICY "Service role access only" ON public.%I FOR ALL TO service_role USING (true) WITH CHECK (true)', t);
    END IF;
    -- RLS does not apply to the table owner, so also remove the API roles' grants.
    EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated', t);
  END LOOP;
END $$;

-- ── Seed the policy row. Owner = the first admin; council starts OFF, so a
--    single proposal executes immediately (quorum 1) until you turn it on. ──
INSERT INTO moderation_policy (id, owner_user_id, council_enabled, quorum, proposal_ttl_days)
SELECT 1, u.id, false, 1, 7
FROM users u
WHERE u.is_admin = true OR u.role IN ('admin', 'owner')
ORDER BY u.created_at
LIMIT 1
ON CONFLICT (id) DO NOTHING;
