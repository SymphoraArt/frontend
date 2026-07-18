import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { resolveSessionUserId } from "@/lib/session-user";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

// People search for starting DMs: case-insensitive substring match on handle
// (citext) or display name. Authed-only; self and deleted accounts excluded.
export async function GET(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "users:search"), 30, 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const supabase = getSupabaseServerClient();
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  // Strip or()-syntax breakers and PostgREST's `*`→`%` alias, then ESCAPE like
  // wildcards instead of deleting them — underscores are legal in handles.
  const cleaned = (req.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 40).replace(/[,()*]/g, "");
  if (cleaned.length < 2) return NextResponse.json({ users: [] });
  const q = cleaned.replace(/[\\%_]/g, (c) => `\\${c}`);

  const { data, error } = await supabase
    .from("users")
    .select("id, handle, display_name, avatar_url")
    .or(`handle.ilike.%${q}%,display_name.ilike.%${q}%`)
    .neq("id", userId)
    .is("deleted_at", null)
    .not("handle", "is", null)
    .limit(8);
  if (error) return NextResponse.json({ users: [] });

  return NextResponse.json({
    users: (data ?? []).map((u) => ({ id: u.id, handle: u.handle, name: u.display_name, avatarUrl: u.avatar_url })),
  });
}
