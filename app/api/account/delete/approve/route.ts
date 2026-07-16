/**
 * Guardian approval of an account-deletion request (public — the guardian is
 * not signed in). Possessing the emailed token is the proof.
 *
 *   GET  ?token= → { requesterHandle, alreadyApproved }
 *   POST { token } → marks this guardian's approval
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

async function lookup(token: string) {
  const supabase = getSupabaseServerClient();
  const { data: appr } = await supabase
    .from("deletion_approvals")
    .select("request_id, guardian_id, approved_at")
    .eq("approve_token", token)
    .maybeSingle();
  if (!appr) return { supabase, appr: null, request: null };
  const { data: request } = await supabase
    .from("deletion_requests")
    .select("id, user_id, status, expires_at")
    .eq("id", appr.request_id)
    .maybeSingle();
  return { supabase, appr, request };
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "token required" }, { status: 400 });
  const { supabase, appr, request } = await lookup(token);
  if (!appr || !request) return NextResponse.json({ error: "This link isn't valid (or was withdrawn)" }, { status: 404 });
  const { data: user } = await supabase.from("users").select("handle").eq("id", request.user_id).maybeSingle();
  return NextResponse.json({
    requesterHandle: user?.handle ?? "an Enki Art user",
    alreadyApproved: appr.approved_at !== null,
    status: request.status,
  });
}

export async function POST(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "account:delete:approve"), 20, 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  let token: string;
  try {
    ({ token } = (await req.json()) as { token: string });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (!token) return NextResponse.json({ error: "token required" }, { status: 400 });

  const { supabase, appr, request } = await lookup(token);
  if (!appr || !request) return NextResponse.json({ error: "This link isn't valid (or was withdrawn)" }, { status: 404 });
  if (request.status !== "pending") return NextResponse.json({ error: "This request is already closed" }, { status: 409 });
  if (new Date(request.expires_at).getTime() <= Date.now()) return NextResponse.json({ error: "This request has expired" }, { status: 410 });
  if (appr.approved_at) return NextResponse.json({ ok: true, already: true });

  const { error } = await supabase
    .from("deletion_approvals")
    .update({ approved_at: new Date().toISOString() })
    .eq("approve_token", token)
    .is("approved_at", null);
  if (error) return NextResponse.json({ error: "Could not approve" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
