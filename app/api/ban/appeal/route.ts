/**
 * POST /api/ban/appeal  { statement } — a banned user files ONE pending
 * appeal per ban. Lands in the admin panel (strikes tab) and in every
 * admin's notification inbox. Decisions are audited via appeals.decided_by/
 * decided_at/decision_notes; an approval lifts the ban (admin route).
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { resolveSessionUserWithBan } from "@/lib/session-user";
import { notifyAdmins } from "@/lib/admin-notify";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "ban:appeal:ip"), 5, 60 * 60 * 1000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const supabase = getSupabaseServerClient();
  const { userId, ban } = await resolveSessionUserWithBan(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!ban) return NextResponse.json({ error: "This account isn't banned." }, { status: 400 });

  let body: { statement?: unknown };
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const statement = typeof body.statement === "string" ? body.statement.trim() : "";
  if (statement.length < 20 || statement.length > 2000) {
    return NextResponse.json({ error: "Tell us your side in 20–2000 characters." }, { status: 400 });
  }

  const { data: existing } = await supabase.from("appeals")
    .select("id").eq("user_id", userId).eq("target_uuid", ban.id).eq("status", "pending").limit(1);
  if (existing?.length) {
    return NextResponse.json({ error: "Your appeal is already with the council." }, { status: 409 });
  }

  const { error } = await supabase.from("appeals").insert({
    user_id: userId, target_type: "ban", target_uuid: ban.id,
    user_statement: statement, status: "pending",
  });
  if (error) return NextResponse.json({ error: "Could not file the appeal" }, { status: 500 });

  const { data: u } = await supabase.from("users").select("handle").eq("id", userId).maybeSingle();
  const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_ORIGIN || "";
  await notifyAdmins(supabase, {
    subject: `[Enki Admin] Ban appeal from @${(u?.handle as string) ?? "unnamed"}`,
    text: [
      `@${(u?.handle as string) ?? "an account"} appeals their ban.`,
      "",
      `Ban reason: ${ban.reason ?? "—"}`,
      `Their statement: ${statement}`,
      "",
      `Approve or deny in the admin panel (Strikes & bans tab)${origin ? `: ${origin}/admin` : "."}`,
      "An approval lifts the ban automatically.",
    ].join("\n"),
  });
  return NextResponse.json({ ok: true });
}
