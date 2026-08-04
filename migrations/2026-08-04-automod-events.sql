-- Automated moderation — the evidence trail and the human-review queue.
--
-- Deliberately NOT a second ban system. Live probing (2026-08-04) confirmed
-- `bans`, `strikes` and `appeals` already exist, so enforcement reuses them;
-- PR #54's parallel `wallet_violations` / `wallet_blacklist` tables are not
-- created. This table only records WHAT the filter decided and WHY, and holds
-- the queue of cases a human still has to look at.
--
-- Design decisions this encodes (Kev, 2026-08-04):
--  * The AI classifier decides; the word list is a narrow pre-filter that may
--    block but may never ban on its own. `severity` records which path fired.
--  * Ambiguous hits ("nude girl statue") are BLOCKED but go to human review —
--    never an automatic permanent ban.
--  * Evidence is stored as a hash (repeat-offender detection without holding
--    harmful text in the clear) PLUS the text encrypted at rest with the
--    lib/crypto envelope, readable only by moderators/legal.
--  * user_id is NULLABLE on purpose: /api/generate-free is unauthenticated, so
--    anonymous hits are attributed by hashed IP only.

CREATE TABLE IF NOT EXISTS automod_events (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who (server-derived only; never a client-supplied wallet field)
  user_id       uuid        REFERENCES users(id) ON DELETE SET NULL,
  ip_hash       text,                              -- HMAC-SHA256(ip, AUTH_PEPPER)
  surface       text        NOT NULL,              -- 'generate-image' | 'generate-free' | 'upload' | ...

  -- What the filter decided
  decision      text        NOT NULL CHECK (decision IN ('block', 'allow')),
  severity      text        NOT NULL CHECK (severity IN ('ban', 'review', 'strike', 'log')),
  tier          smallint    CHECK (tier IN (1, 2)),   -- 1 = word list, 2 = AI classifier
  category      text,                              -- 'csam' | 'sexual/minors' | 'violence' | ...
  matched_rules text[],                            -- rule ids that fired (server logs only)
  scores        jsonb,                             -- classifier category scores

  -- Evidence: hash for dedup/repeat offenders, ciphertext for the actual text
  prompt_hash   text        NOT NULL,              -- sha256 of the normalised prompt
  evidence_ct   text,
  evidence_iv   text,
  evidence_tag  text,
  evidence_kid  text,

  -- Human review (the middle band lands here; nothing auto-bans out of it)
  review_state  text        NOT NULL DEFAULT 'none'
                            CHECK (review_state IN ('none', 'pending', 'upheld', 'overturned')),
  reviewed_by   uuid        REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at   timestamptz,
  review_notes  text,

  -- What enforcement followed (reuses the existing tables, no duplication)
  ban_id        uuid        REFERENCES bans(id)    ON DELETE SET NULL,
  strike_id     uuid        REFERENCES strikes(id) ON DELETE SET NULL,

  created_at    timestamptz NOT NULL DEFAULT now()
);

-- The review queue: oldest pending case first.
CREATE INDEX IF NOT EXISTS automod_events_review_idx
  ON automod_events (created_at) WHERE review_state = 'pending';
-- Repeat-offender lookups and per-user history.
CREATE INDEX IF NOT EXISTS automod_events_user_idx
  ON automod_events (user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS automod_events_ip_idx
  ON automod_events (ip_hash, created_at DESC) WHERE ip_hash IS NOT NULL;
-- Same prompt resubmitted (by anyone) — the signal a word list cannot give us.
CREATE INDEX IF NOT EXISTS automod_events_hash_idx
  ON automod_events (prompt_hash, created_at DESC);
-- False-positive measurement: how much are we blocking, and of what.
CREATE INDEX IF NOT EXISTS automod_events_decision_idx
  ON automod_events (decision, category, created_at DESC);

-- Server-only, like every other moderation table.
ALTER TABLE automod_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'automod_events'
      AND policyname = 'Service role access only'
  ) THEN
    CREATE POLICY "Service role access only" ON public.automod_events
      FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;

REVOKE ALL ON public.automod_events FROM anon, authenticated;
