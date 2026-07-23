/**
 * The signed-in user's notification feed.
 *
 *   GET  → { items: [...], unseen: number }
 *          items = newest 30 (denormalized rows — no joins at read time);
 *          unseen = COUNT over the partial index (seen_at IS NULL), so the
 *          badge stays O(unread) regardless of table size.
 *   POST → marks everything seen (one indexed UPDATE); the badge clears.
 *
 * Writers go through lib/notifications.ts → notify_event() RPC.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { resolveSessionUserId } from "@/lib/session-user";

type Row = {
  id: string;
  kind: string;
  title: string;
  body: string | null;
  target_type: string | null;
  target_uuid: string | null;
  count: number | null;
  metadata: Record<string, unknown> | null;
  seen_at: string | null;
  created_at: string;
};

export async function GET(req: NextRequest) {
  const supabase = getSupabaseServerClient();
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const [list, unseen] = await Promise.all([
    supabase
      .from("notifications")
      .select("id, kind, title, body, target_type, target_uuid, count, metadata, seen_at, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(30),
    supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .is("seen_at", null),
  ]);
  if (list.error) {
    // Pre-migration: the columns/rpc may not exist yet — an empty feed beats a broken shell.
    return NextResponse.json({ items: [], unseen: 0 });
  }

  return NextResponse.json({
    items: ((list.data ?? []) as Row[]).map((r) => ({
      id: r.id,
      kind: r.kind,
      title: r.title,
      body: r.body,
      targetType: r.target_type,
      targetId: r.target_uuid,
      count: r.count ?? 1,
      meta: r.metadata ?? {},
      seen: r.seen_at !== null,
      createdAt: r.created_at,
    })),
    unseen: unseen.count ?? 0,
  });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerClient();
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  // Only mark seen up to what the client actually rendered (its newest item).
  // Anything inserted or re-surfaced after that snapshot stays unread — the
  // RPC bumps created_at on re-surface, so this cutoff catches those too.
  const { cutoff } = (await req.json().catch(() => ({}))) as { cutoff?: string };
  let q = supabase
    .from("notifications")
    .update({ seen_at: new Date().toISOString() })
    .eq("user_id", userId)
    .is("seen_at", null);
  if (typeof cutoff === "string" && !Number.isNaN(Date.parse(cutoff))) {
    q = q.lte("created_at", cutoff);
  }
  const { error } = await q;
  if (error) return NextResponse.json({ error: "Could not update" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
