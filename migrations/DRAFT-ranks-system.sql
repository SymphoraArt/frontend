-- ╔══════════════════════════════════════════════════════════════════════╗
-- ║  DRAFT — DO NOT RUN YET (Kev, 2026-07-12)                              ║
-- ║  The rank ladder (names, tiers, requirement numbers) is to be designed ║
-- ║  with professional input first. This file is the ready-to-go technical ║
-- ║  skeleton; only the seed values below will change.                     ║
-- ╚══════════════════════════════════════════════════════════════════════╝
--
-- Column names below were VERIFIED against the live Supabase on 2026-07-12:
--   generations:      user_id ✓
--   prompts:          creator_id (NOT user_id!), is_free_showcase, price_usd_cents (NOT price)
--   prompt_purchases: seller_id, buyer_id, status, amount_usd_cents ✓
--   marketplace_prompts, user_earnings: DO NOT EXIST in the live DB —
--     earnings are computed from prompt_purchases instead.

-- ── Ranks (achievements, computed — separate axis from roles) ───────────────
-- requirements: JSONB { "<metric>": <min value> } — ALL must be met (AND).
-- Metric names MUST match the user_metrics view columns below.
CREATE TABLE IF NOT EXISTS ranks (
  key          text PRIMARY KEY,
  label        text NOT NULL,
  sort_order   int  NOT NULL UNIQUE,  -- progression order; highest matching rank wins
  icon         text,
  requirements jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS rank_key text;
DO $$ BEGIN
  ALTER TABLE users ADD CONSTRAINT users_rank_key_fkey FOREIGN KEY (rank_key) REFERENCES ranks(key);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- PLACEHOLDER ladder — replace with the professionally designed one:
-- INSERT INTO ranks (key, label, sort_order, icon, requirements) VALUES
--   ('newcomer', 'Newcomer', 0,  '🌱', '{}'),
--   ('creator',  'Creator',  10, '✏️', '{"prompts_created": 1}'),
--   ('artist',   'Artist',   30, '🎨', '{"prompts_created": 10, "prompts_sold": 5, "generations": 100}')
-- ON CONFLICT (key) DO NOTHING;

-- ── Metric indexes (count-on-read strategy: O(log N + k), no counters) ──────
CREATE INDEX IF NOT EXISTS generations_user_idx        ON generations (user_id);
CREATE INDEX IF NOT EXISTS prompts_creator_idx         ON prompts (creator_id);
CREATE INDEX IF NOT EXISTS prompt_purchases_seller_idx ON prompt_purchases (seller_id) WHERE status = 'completed';
CREATE INDEX IF NOT EXISTS prompt_purchases_buyer_idx  ON prompt_purchases (buyer_id)  WHERE status = 'completed';

-- ── Metrics: ONE place that defines every metric name ───────────────────────
CREATE OR REPLACE VIEW user_metrics AS
SELECT
  u.id AS user_id,
  (SELECT count(*) FROM prompts p WHERE p.creator_id = u.id)                                              AS prompts_created,
  (SELECT count(*) FROM prompts p WHERE p.creator_id = u.id
     AND (p.is_free_showcase OR COALESCE(p.price_usd_cents, 0) = 0))                                      AS free_prompts,
  (SELECT count(*) FROM generations g WHERE g.user_id = u.id)                                             AS generations,
  (SELECT count(*) FROM prompt_purchases pp WHERE pp.seller_id = u.id AND pp.status = 'completed')        AS prompts_sold,
  (SELECT count(*) FROM prompt_purchases pp WHERE pp.buyer_id  = u.id AND pp.status = 'completed')        AS prompts_bought,
  COALESCE((SELECT sum(pp.amount_usd_cents) FROM prompt_purchases pp
            WHERE pp.seller_id = u.id AND pp.status = 'completed'), 0)                                    AS earnings_cents
  -- comments / followers / ratings: add once their tables exist
FROM users u;

-- ── Rank assignment (schedule nightly via pg_cron once ranks go live) ───────
CREATE OR REPLACE FUNCTION assign_ranks() RETURNS void AS $$
  UPDATE users u SET rank_key = sub.best
  FROM (
    SELECT m.user_id, (
      SELECT r.key FROM ranks r
      WHERE NOT EXISTS (
        SELECT 1 FROM jsonb_each_text(r.requirements) req
        WHERE (to_jsonb(m) ->> req.key) IS NULL
           OR (to_jsonb(m) ->> req.key)::numeric < req.value::numeric
      )
      ORDER BY r.sort_order DESC
      LIMIT 1
    ) AS best
    FROM user_metrics m
  ) sub
  WHERE u.id = sub.user_id AND u.rank_key IS DISTINCT FROM sub.best;
$$ LANGUAGE sql;

-- Manual full re-run (after tuning requirements):  SELECT assign_ranks();
-- (Deliberately NO scheduled job — ranks assign themselves via the triggers
--  below, instantly on the action itself. Kev, 2026-07-12.)

-- ── LEVEL UP — automatic, event-driven rank assignment ───────────────────────
-- Every rank-relevant INSERT (generation, purchase, prompt creation — later
-- ratings/follows/comments the same way) re-evaluates ONLY that user, right
-- when the action happens. A rank change = a LEVEL UP: it updates users.rank_key
-- AND writes a rank_events row — that's the queue the LUKSO trophy-dropper
-- will consume later (drop trophy → mark consumed_at).

CREATE TABLE IF NOT EXISTS rank_events (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  old_rank    text,
  new_rank    text NOT NULL REFERENCES ranks(key),
  created_at  timestamptz NOT NULL DEFAULT now(),
  consumed_at timestamptz              -- set by the LUKSO trophy drop job
);
CREATE INDEX IF NOT EXISTS rank_events_unconsumed_idx ON rank_events (created_at) WHERE consumed_at IS NULL;

-- Per-user variant of assign_ranks: cheap enough to run inside a trigger.
CREATE OR REPLACE FUNCTION assign_rank_for(p_user uuid) RETURNS void AS $$
DECLARE
  v_old text;
  v_new text;
BEGIN
  SELECT u.rank_key INTO v_old FROM users u WHERE u.id = p_user;
  SELECT r.key INTO v_new
  FROM ranks r
  WHERE NOT EXISTS (
    SELECT 1 FROM user_metrics m, jsonb_each_text(r.requirements) req
    WHERE m.user_id = p_user
      AND ((to_jsonb(m) ->> req.key) IS NULL
        OR (to_jsonb(m) ->> req.key)::numeric < req.value::numeric)
  )
  ORDER BY r.sort_order DESC
  LIMIT 1;
  IF v_new IS NOT NULL AND v_new IS DISTINCT FROM v_old THEN
    UPDATE users SET rank_key = v_new WHERE id = p_user;
    INSERT INTO rank_events (user_id, old_rank, new_rank) VALUES (p_user, v_old, v_new);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- One tiny trigger function per source table (they differ only in which
-- column holds the user). Add ratings/follows triggers the same way later.
CREATE OR REPLACE FUNCTION trg_rank_on_user_id() RETURNS trigger AS $$
BEGIN PERFORM assign_rank_for(NEW.user_id); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_rank_on_creator_id() RETURNS trigger AS $$
BEGIN PERFORM assign_rank_for(NEW.creator_id); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_rank_on_purchase() RETURNS trigger AS $$
BEGIN
  PERFORM assign_rank_for(NEW.seller_id);  -- sale counts for the seller…
  PERFORM assign_rank_for(NEW.buyer_id);   -- …and the purchase for the buyer
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS rank_after_generation ON generations;
CREATE TRIGGER rank_after_generation AFTER INSERT ON generations
  FOR EACH ROW EXECUTE FUNCTION trg_rank_on_user_id();

DROP TRIGGER IF EXISTS rank_after_prompt ON prompts;
CREATE TRIGGER rank_after_prompt AFTER INSERT ON prompts
  FOR EACH ROW EXECUTE FUNCTION trg_rank_on_creator_id();  -- prompts.creator_id!

DROP TRIGGER IF EXISTS rank_after_purchase ON prompt_purchases;
CREATE TRIGGER rank_after_purchase AFTER INSERT ON prompt_purchases
  FOR EACH ROW EXECUTE FUNCTION trg_rank_on_purchase();

-- The trophy-dropper later polls:
--   SELECT * FROM rank_events WHERE consumed_at IS NULL ORDER BY created_at LIMIT 50;
-- …mints the LSP7/LSP8 trophy on LUKSO, then:
--   UPDATE rank_events SET consumed_at = now() WHERE id = ANY(...);

ALTER TABLE ranks ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_events ENABLE ROW LEVEL SECURITY;
