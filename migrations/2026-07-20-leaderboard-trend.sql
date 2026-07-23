-- Hall of Fame v2 — real trend data for the sparkline/delta columns
-- (Kev, 2026-07-20). Companion to 2026-07-14-hall-of-fame.sql (verified live:
-- leaderboard_generations/_earnings exist). Run once in the Supabase SQL
-- editor. Idempotent — safe to run repeatedly.
--
-- Daily buckets per creator, only for the creators actually on the board
-- (the API passes the ranked ids), so the scan stays tiny. SECURITY INVOKER
-- + pinned search_path, grants service_role-only — same hardening pattern
-- as 2026-07-15-security-hardening.sql.

CREATE OR REPLACE FUNCTION leaderboard_gen_series(p_creators uuid[], p_since timestamptz)
RETURNS TABLE (creator_id uuid, day date, n bigint)
LANGUAGE sql STABLE SET search_path = public
AS $$
  SELECT p.creator_id, g.created_at::date, count(*)::bigint
  FROM generations g
  JOIN prompts p ON p.id = g.prompt_id
  WHERE g.deleted_at IS NULL
    AND g.created_at >= p_since
    AND p.creator_id = ANY(p_creators)
  GROUP BY 1, 2;
$$;

CREATE OR REPLACE FUNCTION leaderboard_earn_series(p_creators uuid[], p_since timestamptz)
RETURNS TABLE (creator_id uuid, day date, cents bigint)
LANGUAGE sql STABLE SET search_path = public
AS $$
  SELECT seller_id, completed_at::date, sum(creator_earnings_cents)::bigint
  FROM prompt_purchases
  WHERE status = 'completed'
    AND seller_id = ANY(p_creators)
    AND completed_at >= p_since
  GROUP BY 1, 2;
$$;

REVOKE ALL ON FUNCTION leaderboard_gen_series(uuid[], timestamptz) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION leaderboard_earn_series(uuid[], timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION leaderboard_gen_series(uuid[], timestamptz) TO service_role;
GRANT EXECUTE ON FUNCTION leaderboard_earn_series(uuid[], timestamptz) TO service_role;
