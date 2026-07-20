/**
 * Admin panel API — the ONLY door to moderation data.
 *
 *   GET  → one payload for every tab (imports, reports, feedback, friends,
 *          hunters, strikes+bans+appeals, recovery). Small beta-scale lists.
 *   POST → { resource, action, ... } mutations, each scoped + audited via
 *          decided_by/issued_by columns.
 *
 * Server-side gate on EVERY request: session → users.role ∈ {admin, mod}.
 * (The client gate in /admin is cosmetic — this check is the real wall.)
 * All tables verified live 2026-07-20 via PostgREST OpenAPI probe.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { resolveSessionUserId } from "@/lib/session-user";
import { decryptString, type EncryptedPayload } from "@/lib/crypto";

type Supabase = ReturnType<typeof getSupabaseServerClient>;

async function requireAdmin(supabase: Supabase, req: NextRequest): Promise<{ userId: string } | NextResponse> {
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { data } = await supabase.from("users").select("role").eq("id", userId).maybeSingle();
  const role = (data?.role as string) ?? "user";
  if (role !== "admin" && role !== "mod") {
    return NextResponse.json({ error: "Admins only" }, { status: 403 });
  }
  return { userId };
}

/** Tolerant field decrypt: encrypted columns may use no AAD or an id AAD. */
function tryDecrypt(ct: unknown, iv: unknown, tag: unknown, kid: unknown, aads: (string | undefined)[]): string | null {
  if (typeof ct !== "string" || typeof iv !== "string" || typeof tag !== "string" || !ct) return null;
  const payload: EncryptedPayload = { encrypted: ct, iv, authTag: tag, kid: typeof kid === "string" ? kid : undefined };
  for (const aad of aads) {
    try { return decryptString(payload, aad); } catch { /* try next */ }
  }
  return null;
}

const handleMap = async (supabase: Supabase, ids: string[]): Promise<Map<string, string>> => {
  const uniq = [...new Set(ids.filter(Boolean))];
  if (!uniq.length) return new Map();
  const { data } = await supabase.from("users").select("id, handle").in("id", uniq);
  return new Map((data ?? []).map((u) => [String(u.id), (u.handle as string) ?? "unnamed"]));
};

export async function GET(req: NextRequest) {
  const supabase = getSupabaseServerClient();
  const gate = await requireAdmin(supabase, req);
  if (gate instanceof NextResponse) return gate;

  const [imp, rep, fb, fr, hu, st, ba, ap, rec] = await Promise.all([
    supabase.from("hunt_submissions")
      .select("id, hunter_user_id, source_url, suggested_title, suggested_tags, submitted_at")
      .eq("status", "pending").order("submitted_at", { ascending: false }).limit(100),
    supabase.from("reports")
      .select("id, reporter_user_id, target_type, target_uuid, reason, details, severity, status, created_at")
      .in("status", ["open", "pending"]).order("created_at", { ascending: false }).limit(100),
    supabase.from("feedback_submissions")
      .select("id, user_id, submitter_name, submitter_email_ct, submitter_email_iv, submitter_email_tag, submitter_email_kid, description, category, severity, payout_cents, paid_at, created_at")
      .order("created_at", { ascending: false }).limit(100),
    supabase.from("friends_whitelist")
      .select("id, label, address, address_type, chain_key, notes, added_at")
      .eq("is_active", true).order("added_at", { ascending: false }).limit(200),
    supabase.from("hunter_stats")
      .select("user_id, total_submissions, approved_count, rejected_count, duplicate_count, earnings_cents")
      .order("approved_count", { ascending: false }).limit(50),
    supabase.from("strikes")
      .select("id, user_id, reason, severity, created_at")
      .is("revoked_at", null).order("created_at", { ascending: false }).limit(200),
    supabase.from("bans")
      .select("id, user_id, reason, scope, expires_at, created_at")
      .is("lifted_at", null).limit(100),
    supabase.from("appeals")
      .select("id, user_id, user_statement, status, created_at")
      .eq("status", "pending").order("created_at", { ascending: false }).limit(100),
    supabase.from("recovery_requests")
      .select("id, user_id, claimed_handle, claimed_wallet, contact_email_ct, contact_email_iv, contact_email_tag, contact_email_kid, explanation_ct, explanation_iv, explanation_tag, explanation_kid, layer, status, rejection_reason, created_at")
      .order("created_at", { ascending: false }).limit(50),
  ]);

  // attachments per feedback + evidence per recovery request
  const fbIds = (fb.data ?? []).map((r) => String(r.id));
  const recIds = (rec.data ?? []).map((r) => String(r.id));
  const [att, evi] = await Promise.all([
    fbIds.length ? supabase.from("feedback_attachments").select("feedback_id").in("feedback_id", fbIds) : Promise.resolve({ data: [] }),
    recIds.length ? supabase.from("recovery_request_evidence").select("request_id, kind, matched, value_url").in("request_id", recIds) : Promise.resolve({ data: [] }),
  ]);
  const attCount = new Map<string, number>();
  for (const a of (att.data ?? []) as { feedback_id: string }[]) {
    attCount.set(String(a.feedback_id), (attCount.get(String(a.feedback_id)) ?? 0) + 1);
  }
  const eviByReq = new Map<string, { kind: string; matched: boolean | null }[]>();
  for (const e of (evi.data ?? []) as { request_id: string; kind: string; matched: boolean | null }[]) {
    const k = String(e.request_id);
    (eviByReq.get(k) ?? eviByReq.set(k, []).get(k)!).push({ kind: e.kind, matched: e.matched });
  }

  // handles for hunters, strikes/bans/appeals users, reporters + report targets
  const strikeUsers = (st.data ?? []).map((r) => String(r.user_id));
  const banUsers = (ba.data ?? []).map((r) => String(r.user_id));
  const appealUsers = (ap.data ?? []).map((r) => String(r.user_id));
  const handles = await handleMap(supabase, [
    ...(imp.data ?? []).map((r) => String(r.hunter_user_id)),
    ...(hu.data ?? []).map((r) => String(r.user_id)),
    ...(rep.data ?? []).map((r) => String(r.reporter_user_id)),
    ...(rep.data ?? []).filter((r) => r.target_type !== "prompt").map((r) => String(r.target_uuid)),
    ...strikeUsers, ...banUsers, ...appealUsers,
  ]);
  const promptTargets = (rep.data ?? []).filter((r) => r.target_type === "prompt").map((r) => String(r.target_uuid));
  const promptTitles = new Map<string, string>();
  if (promptTargets.length) {
    const { data } = await supabase.from("prompts").select("id, title").in("id", promptTargets);
    for (const p of data ?? []) promptTitles.set(String(p.id), (p.title as string) ?? "Untitled");
  }

  // strikes tab: one row per user with active strikes, ban state and appeal
  const banByUser = new Map<string, { reason: string | null; permanent: boolean }>();
  for (const b of (ba.data ?? []) as { user_id: string; reason: string | null; expires_at: string | null }[]) {
    banByUser.set(String(b.user_id), { reason: b.reason, permanent: !b.expires_at });
  }
  const appealByUser = new Map<string, { id: string; note: string | null }>();
  for (const a of (ap.data ?? []) as { id: string; user_id: string; user_statement: string | null }[]) {
    appealByUser.set(String(a.user_id), { id: String(a.id), note: a.user_statement });
  }
  const strikeRows = new Map<string, { userId: string; strikes: { id: string; reason: string | null }[] }>();
  for (const s of (st.data ?? []) as { id: string; user_id: string; reason: string | null }[]) {
    const k = String(s.user_id);
    (strikeRows.get(k) ?? strikeRows.set(k, { userId: k, strikes: [] }).get(k)!).strikes.push({ id: String(s.id), reason: s.reason });
  }
  for (const k of [...banByUser.keys(), ...appealByUser.keys()]) {
    if (!strikeRows.has(k)) strikeRows.set(k, { userId: k, strikes: [] });
  }

  return NextResponse.json({
    imports: (imp.data ?? []).map((r) => ({
      id: String(r.id),
      name: (r.suggested_title as string) || "Untitled",
      url: (r.source_url as string) ?? null,
      hunter: handles.get(String(r.hunter_user_id)) ?? "unknown",
      tags: Array.isArray(r.suggested_tags) ? (r.suggested_tags as string[]).slice(0, 4) : [],
      at: r.submitted_at,
    })),
    reports: (rep.data ?? []).map((r) => ({
      id: String(r.id),
      target: r.target_type === "prompt"
        ? (promptTitles.get(String(r.target_uuid)) ?? "Deleted prompt")
        : "@" + (handles.get(String(r.target_uuid)) ?? "unknown"),
      type: (r.target_type as string) === "prompt" ? "prompt" : "profile",
      reason: (r.reason as string) ?? "—",
      details: (r.details as string) ?? null,
      reporter: handles.get(String(r.reporter_user_id)) ?? "anon",
      severity: (r.severity as number | string | null) ?? null,
      at: r.created_at,
    })),
    feedback: (fb.data ?? []).map((r) => ({
      id: String(r.id),
      name: (r.submitter_name as string) || "Anonymous",
      email: tryDecrypt(r.submitter_email_ct, r.submitter_email_iv, r.submitter_email_tag, r.submitter_email_kid,
        [undefined, String(r.id), r.user_id ? String(r.user_id) : undefined]),
      desc: (r.description as string) ?? "",
      images: attCount.get(String(r.id)) ?? 0,
      paid: r.paid_at !== null,
      payoutCents: (r.payout_cents as number | null) ?? null,
      at: r.created_at,
    })),
    friends: (fr.data ?? []).map((r) => ({
      id: String(r.id),
      name: (r.label as string) ?? "—",
      address: (r.address as string) ?? "",
      type: (r.address_type as string) ?? "EOA",
      chain: (r.chain_key as string) ?? "solana",
      notes: (r.notes as string) ?? null,
    })),
    hunters: (hu.data ?? []).map((r) => ({
      handle: handles.get(String(r.user_id)) ?? "unknown",
      total: (r.total_submissions as number) ?? 0,
      approved: (r.approved_count as number) ?? 0,
      denied: ((r.rejected_count as number) ?? 0) + ((r.duplicate_count as number) ?? 0),
      earningsCents: (r.earnings_cents as number) ?? 0,
    })),
    strikes: [...strikeRows.values()].map((row) => ({
      userId: row.userId,
      handle: handles.get(row.userId) ?? "unknown",
      strikes: row.strikes,
      banned: banByUser.has(row.userId),
      permanent: banByUser.get(row.userId)?.permanent ?? false,
      note: row.strikes[0]?.reason ?? banByUser.get(row.userId)?.reason ?? null,
      appeal: appealByUser.get(row.userId) ?? null,
    })),
    recovery: (rec.data ?? []).map((r) => ({
      id: String(r.id),
      handle: (r.claimed_handle as string) ?? "unknown",
      wallet: (r.claimed_wallet as string) ?? null,
      contact: tryDecrypt(r.contact_email_ct, r.contact_email_iv, r.contact_email_tag, r.contact_email_kid,
        [undefined, String(r.id), r.user_id ? String(r.user_id) : undefined]),
      explanation: tryDecrypt(r.explanation_ct, r.explanation_iv, r.explanation_tag, r.explanation_kid,
        [undefined, String(r.id), r.user_id ? String(r.user_id) : undefined]),
      evidence: eviByReq.get(String(r.id)) ?? [],
      layer: (r.layer as string | number | null) ?? null,
      status: (r.status as string) ?? "pending",
      at: r.created_at,
    })),
  });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerClient();
  const gate = await requireAdmin(supabase, req);
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  let body: {
    resource?: string; action?: string; id?: string; ids?: string[];
    reason?: string; name?: string; address?: string; type?: string; notes?: string; status?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const now = new Date().toISOString();
  const fail = (e: { message?: string } | null, what: string) =>
    NextResponse.json({ error: `Could not ${what}${e?.message ? ": " + e.message : ""}` }, { status: 500 });

  // ── pending imports ──
  if (body.resource === "imports") {
    const ids = Array.isArray(body.ids) ? body.ids : body.id ? [body.id] : [];
    if (!ids.length) return NextResponse.json({ error: "id required" }, { status: 400 });
    if (body.action === "approve") {
      const { error } = await supabase.from("hunt_submissions")
        .update({ status: "approved", decided_at: now, decided_by: userId })
        .in("id", ids).eq("status", "pending");
      return error ? fail(error, "approve") : NextResponse.json({ ok: true });
    }
    if (body.action === "reject") {
      const { error } = await supabase.from("hunt_submissions")
        .update({ status: "rejected", rejection_reason: (body.reason ?? "Other").slice(0, 200), decided_at: now, decided_by: userId })
        .in("id", ids).eq("status", "pending");
      return error ? fail(error, "reject") : NextResponse.json({ ok: true });
    }
  }

  // ── reports ──
  if (body.resource === "reports" && body.id) {
    if (body.action === "resolve" || body.action === "dismiss") {
      const { error } = await supabase.from("reports")
        .update({ status: body.action === "resolve" ? "resolved" : "dismissed", decided_by: userId, decided_at: now })
        .eq("id", body.id);
      return error ? fail(error, body.action) : NextResponse.json({ ok: true });
    }
  }

  // ── feedback ──
  if (body.resource === "feedback" && body.action === "markPaid" && body.id) {
    const { data: cur } = await supabase.from("feedback_submissions").select("payout_cents").eq("id", body.id).maybeSingle();
    const { error } = await supabase.from("feedback_submissions")
      .update({ paid_at: now, payout_cents: cur?.payout_cents ?? 10000, reviewer_id: userId })
      .eq("id", body.id).is("paid_at", null);
    return error ? fail(error, "mark paid") : NextResponse.json({ ok: true });
  }

  // ── friends whitelist ──
  if (body.resource === "friends") {
    if (body.action === "add") {
      const label = (body.name ?? "").trim(), address = (body.address ?? "").trim();
      if (!label || !address) return NextResponse.json({ error: "Name and address are required" }, { status: 400 });
      const { data, error } = await supabase.from("friends_whitelist")
        .insert({
          label: label.slice(0, 80), address: address.slice(0, 120),
          address_type: ["EOA", "Collection", "Multi-sig"].includes(body.type ?? "") ? body.type : "EOA",
          notes: (body.notes ?? "").trim().slice(0, 200) || null,
          chain_key: "solana", is_active: true, added_by: userId,
        })
        .select("id").single();
      return error ? fail(error, "add the entry") : NextResponse.json({ ok: true, id: String(data.id) });
    }
    if (body.action === "remove" && body.id) {
      // soft delete — the row stays for the audit trail
      const { error } = await supabase.from("friends_whitelist").update({ is_active: false }).eq("id", body.id);
      return error ? fail(error, "remove the entry") : NextResponse.json({ ok: true });
    }
  }

  // ── strikes ──
  if (body.resource === "strikes" && body.action === "revoke" && body.id) {
    const { error } = await supabase.from("strikes")
      .update({ revoked_at: now, revoked_by: userId, revoke_reason: "Revoked from the admin panel" })
      .eq("id", body.id).is("revoked_at", null);
    return error ? fail(error, "revoke the strike") : NextResponse.json({ ok: true });
  }

  // ── recovery requests ──
  if (body.resource === "recovery" && body.action === "setStatus" && body.id) {
    const status = body.status ?? "";
    if (!["pending", "needs_info", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Unknown status" }, { status: 400 });
    }
    const patch: Record<string, unknown> = { status };
    if (status === "approved" || status === "rejected") { patch.decided_by = userId; patch.decided_at = now; }
    if (status === "rejected") patch.rejection_reason = (body.reason ?? "Rejected from the admin panel").slice(0, 200);
    const { error } = await supabase.from("recovery_requests").update(patch).eq("id", body.id);
    return error ? fail(error, "update the request") : NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Bad request" }, { status: 400 });
}
