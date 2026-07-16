-- Prompt engagement: view counter + comments/ratings (Kev, 2026-07-12).
-- Run once in the Supabase SQL editor. Idempotent.

-- ── Views & opens ────────────────────────────────────────────────────────────
-- Two counters per prompt (Kev's call, plain counters on the row):
--   views = the card was VISIBLE on the timeline/gallery (impression)
--   opens = someone actually OPENED the prompt
-- Both are single atomic UPDATEs (no read-modify-write race); the routes
-- dedupe per viewer for a short window so refresh-spam doesn't inflate them.
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS views bigint NOT NULL DEFAULT 0;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS opens bigint NOT NULL DEFAULT 0;

-- Timeline impressions arrive batched (one call per screenful, not per card).
CREATE OR REPLACE FUNCTION increment_prompt_views_batch(p_prompts text[]) RETURNS void AS $$
  UPDATE prompts SET views = views + 1 WHERE id::text = ANY(p_prompts);
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION increment_prompt_opens(p_prompt text) RETURNS void AS $$
  UPDATE prompts SET opens = opens + 1 WHERE id::text = p_prompt;
$$ LANGUAGE sql;

-- ── Comments & ratings ───────────────────────────────────────────────────────
-- One table, one row per entry (Kev's design):
--   pure comment      → body set, rating NULL
--   rating            → rating set (1–5), body NULL
--   rating + comment  → both set
-- One RATING per user per prompt (partial unique index); plain comments are
-- unlimited. prompt_id is text to match the payment tables' convention
-- (generation_payment_intents.prompt_id is text; no FK because prompts.id's
-- exact type predates our migrations).
CREATE TABLE IF NOT EXISTS prompt_comments (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id  text NOT NULL,
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating     int CHECK (rating BETWEEN 1 AND 5),
  body       text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (rating IS NOT NULL OR (body IS NOT NULL AND length(btrim(body)) > 0))
);

CREATE INDEX IF NOT EXISTS prompt_comments_prompt_idx ON prompt_comments (prompt_id, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS prompt_comments_one_rating_per_user
  ON prompt_comments (prompt_id, user_id) WHERE rating IS NOT NULL;

-- RLS on, no policies: server routes (service role) only.
ALTER TABLE prompt_comments ENABLE ROW LEVEL SECURITY;
