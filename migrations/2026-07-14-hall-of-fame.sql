-- Hall of Fame (leaderboard) — real data, DB-side aggregation (Kev, 2026-07-14).
-- Verified live 2026-07-14: prompt_purchases(seller_id, creator_earnings_cents,
-- status, completed_at, prompt_id), generations(prompt_id, created_at,
-- deleted_at), prompts(id, creator_id, title), users(id, handle).
-- Run once in the Supabase SQL editor. Idempotent.
--
-- Why RPCs + indexes: the leaderboard is a GROUP BY / SUM across whole tables,
-- which PostgREST can't express over joins. Doing it in the DB (indexed) keeps
-- it O(matching rows), not O(table) fetched into the app.

-- Per-user opt-out: hide me from the public Hall of Fame (Settings toggle).
ALTER TABLE users ADD COLUMN IF NOT EXISTS hide_from_leaderboard boolean NOT NULL DEFAULT false;

-- ── Indexes the two queries ride on ───────────────────────────────────────
-- Generations grouped by their prompt, filtered by recency (live rows only).
CREATE INDEX IF NOT EXISTS generations_prompt_created_idx
  ON generations (prompt_id, created_at) WHERE deleted_at IS NULL;
-- Join generations → creator.
CREATE INDEX IF NOT EXISTS prompts_creator_idx ON prompts (creator_id);
-- Earnings grouped by seller, filtered by completion time (completed only).
CREATE INDEX IF NOT EXISTS purchases_seller_completed_idx
  ON prompt_purchases (seller_id, completed_at) WHERE status = 'completed';

-- ── Generations leaderboard ───────────────────────────────────────────────
-- Per creator: total generations across ALL their prompts, plus the single
-- prompt of theirs with the most generations (the "top prompt").
CREATE OR REPLACE FUNCTION leaderboard_generations(p_since timestamptz, p_limit int DEFAULT 20)
RETURNS TABLE (creator_id uuid, handle text, total bigint, best_prompt_id uuid, best_prompt_title text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH gen AS (
    SELECT p.creator_id, g.prompt_id, count(*)::bigint AS n
    FROM generations g
    JOIN prompts p ON p.id = g.prompt_id
    WHERE g.deleted_at IS NULL
      AND (p_since IS NULL OR g.created_at >= p_since)
    GROUP BY p.creator_id, g.prompt_id
  ),
  per_creator AS (SELECT creator_id, sum(n) AS total FROM gen GROUP BY creator_id),
  best AS (
    SELECT DISTINCT ON (creator_id) creator_id, prompt_id, n
    FROM gen ORDER BY creator_id, n DESC, prompt_id
  )
  SELECT pc.creator_id, u.handle, pc.total, b.prompt_id, pr.title
  FROM per_creator pc
  JOIN users u ON u.id = pc.creator_id AND NOT coalesce(u.hide_from_leaderboard, false)
  LEFT JOIN best b ON b.creator_id = pc.creator_id
  LEFT JOIN prompts pr ON pr.id = b.prompt_id
  ORDER BY pc.total DESC, u.handle
  LIMIT greatest(1, least(p_limit, 100));
$$;

-- ── Earnings leaderboard ──────────────────────────────────────────────────
-- Per creator (seller): summed creator earnings, plus their top-earning prompt.
CREATE OR REPLACE FUNCTION leaderboard_earnings(p_since timestamptz, p_limit int DEFAULT 20)
RETURNS TABLE (creator_id uuid, handle text, total_cents bigint, best_prompt_id uuid, best_prompt_title text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH earn AS (
    SELECT seller_id, prompt_id, sum(creator_earnings_cents)::bigint AS cents
    FROM prompt_purchases
    WHERE status = 'completed'
      AND seller_id IS NOT NULL
      AND (p_since IS NULL OR completed_at >= p_since)
    GROUP BY seller_id, prompt_id
  ),
  per_creator AS (SELECT seller_id, sum(cents) AS total FROM earn GROUP BY seller_id),
  best AS (
    SELECT DISTINCT ON (seller_id) seller_id, prompt_id, cents
    FROM earn ORDER BY seller_id, cents DESC, prompt_id
  )
  SELECT pc.seller_id, u.handle, pc.total, b.prompt_id, pr.title
  FROM per_creator pc
  JOIN users u ON u.id = pc.seller_id AND NOT coalesce(u.hide_from_leaderboard, false)
  LEFT JOIN best b ON b.seller_id = pc.seller_id
  LEFT JOIN prompts pr ON pr.id = b.prompt_id
  ORDER BY pc.total DESC, u.handle
  LIMIT greatest(1, least(p_limit, 100));
$$;

-- Server (service_role) calls these. Supabase grants EXECUTE to anon AND
-- authenticated by default, so revoke both explicitly (FROM PUBLIC alone
-- leaves those role grants in place).
REVOKE ALL ON FUNCTION leaderboard_generations(timestamptz, int) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION leaderboard_earnings(timestamptz, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION leaderboard_generations(timestamptz, int) TO service_role;
GRANT EXECUTE ON FUNCTION leaderboard_earnings(timestamptz, int) TO service_role;
