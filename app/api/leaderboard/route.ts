/**
 * Hall of Fame — public leaderboard.
 *
 *   GET ?metric=generations|earnings&period=week|month|all
 *     → { rows: [{ rank, handle, value, unit, bestPromptId, bestPromptTitle }] }
 *
 * DB-side aggregation via the leaderboard_generations / leaderboard_earnings
 * RPCs (see migrations/2026-07-14-hall-of-fame.sql). Degrades to an empty list
 * before the migration runs — the page shows a friendly empty state, never an error.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const DAY_MS = 24 * 60 * 60 * 1000;

type GenRow = { creator_id: string; handle: string | null; total: number; best_prompt_id: string | null; best_prompt_title: string | null };
type EarnRow = { creator_id: string; handle: string | null; total_cents: number; best_prompt_id: string | null; best_prompt_title: string | null };

export async function GET(req: NextRequest) {
  const metric = req.nextUrl.searchParams.get("metric") === "earnings" ? "earnings" : "generations";
  const period = req.nextUrl.searchParams.get("period") ?? "week";
  const since =
    period === "all" ? null
    : new Date(Date.now() - (period === "month" ? 30 : 7) * DAY_MS).toISOString();

  const supabase = getSupabaseServerClient();

  if (metric === "earnings") {
    const { data, error } = await supabase.rpc("leaderboard_earnings", { p_since: since, p_limit: 20 });
    if (error) return NextResponse.json({ rows: [] }); // pre-migration → empty
    const rows = ((data ?? []) as EarnRow[]).map((r, i) => ({
      rank: i + 1,
      handle: r.handle ?? "unnamed",
      value: (r.total_cents ?? 0) / 100,
      unit: "usd" as const,
      bestPromptId: r.best_prompt_id,
      bestPromptTitle: r.best_prompt_title,
    }));
    return NextResponse.json({ rows });
  }

  const { data, error } = await supabase.rpc("leaderboard_generations", { p_since: since, p_limit: 20 });
  if (error) return NextResponse.json({ rows: [] });
  const rows = ((data ?? []) as GenRow[]).map((r, i) => ({
    rank: i + 1,
    handle: r.handle ?? "unnamed",
    value: r.total ?? 0,
    unit: "gen" as const,
    bestPromptId: r.best_prompt_id,
    bestPromptTitle: r.best_prompt_title,
  }));
  return NextResponse.json({ rows });
}
