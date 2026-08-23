/**
 * Likes on a prompt, on the existing reactions table (probed live
 * 2026-08-22: id, target_type, target_uuid, user_id, reaction_type).
 *
 *   GET  → { count, mine }   mine = whether the session user likes it
 *   POST → { count, mine }   toggles the session user's like
 *
 * One row per user per prompt (reaction_type "like"); the toggle is a
 * select-then-delete/insert, and the response always carries the fresh
 * count so the UI never has to guess.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { resolveSessionUserId } from "@/lib/session-user";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const LIKE = { target_type: "prompt", reaction_type: "like" } as const;

async function countFor(supabase: ReturnType<typeof getSupabaseServerClient>, id: string): Promise<number> {
  const { count } = await supabase
    .from("reactions")
    .select("id", { count: "exact", head: true })
    .eq("target_type", LIKE.target_type)
    .eq("reaction_type", LIKE.reaction_type)
    .eq("target_uuid", id);
  return count ?? 0;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseServerClient();
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  let mine = false;
  if (userId) {
    const { data } = await supabase
      .from("reactions")
      .select("id")
      .eq("target_type", LIKE.target_type)
      .eq("reaction_type", LIKE.reaction_type)
      .eq("target_uuid", id)
      .eq("user_id", userId)
      .maybeSingle();
    mine = !!data;
  }
  return NextResponse.json({ count: await countFor(supabase, id), mine });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const limit = checkRequestRateLimit(rateLimitKey(req, "prompt-like"), 30, 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const supabase = getSupabaseServerClient();
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { data: existing } = await supabase
    .from("reactions")
    .select("id")
    .eq("target_type", LIKE.target_type)
    .eq("reaction_type", LIKE.reaction_type)
    .eq("target_uuid", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase.from("reactions").delete().eq("id", existing.id).eq("user_id", userId);
    if (error) {
      console.warn("[likes] delete failed:", error.message);
      return NextResponse.json({ error: "Couldn't remove the like" }, { status: 503 });
    }
    return NextResponse.json({ count: await countFor(supabase, id), mine: false });
  }
  const { error } = await supabase
    .from("reactions")
    .insert({ target_type: LIKE.target_type, reaction_type: LIKE.reaction_type, target_uuid: id, user_id: userId });
  if (error) {
    // The table predates the repo's migrations, so an unknown CHECK
    // constraint would surface exactly here — the log carries the truth.
    console.warn("[likes] insert failed:", error.message);
    return NextResponse.json({ error: "Couldn't save the like" }, { status: 503 });
  }
  return NextResponse.json({ count: await countFor(supabase, id), mine: true });
}
