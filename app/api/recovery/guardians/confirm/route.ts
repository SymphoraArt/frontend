/**
 * Guardian confirmation (public — the guardian is NOT a signed-in user).
 *
 *   GET  ?token= → { guardianType, maskedValue, inviterHandle } for the page
 *   POST { token, signature? } → marks the guardian confirmed
 *
 * Wallet guardians must sign the canonical message with the invited wallet
 * (ed25519, verified here). Email guardians confirm by possessing the link —
 * the token only ever travels to the address the owner chose.
 */
import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import { ed25519 } from "@noble/curves/ed25519";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import { guardianMessage } from "@/lib/guardian-message";
import { notifyEvent } from "@/lib/notifications";

function mask(type: string, value: string) {
  if (type === "wallet") return `${value.slice(0, 6)}…${value.slice(-6)}`;
  const [local, domain] = value.split("@");
  return `${local.slice(0, 2)}…@${domain}`;
}

export async function GET(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "guardians:confirm:get"), 20, 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "token required" }, { status: 400 });

  const supabase = getSupabaseServerClient();
  const { data: g } = await supabase
    .from("recovery_guardians")
    .select("guardian_type, value, status, user_id")
    .eq("invite_token", token)
    .maybeSingle();
  if (!g) return NextResponse.json({ error: "This link isn't valid (or was removed)" }, { status: 404 });

  const { data: user } = await supabase.from("users").select("handle").eq("id", g.user_id).maybeSingle();

  return NextResponse.json({
    guardianType: g.guardian_type,
    maskedValue: mask(g.guardian_type, g.value),
    status: g.status,
    inviterHandle: user?.handle ?? "an Enki Art user",
  });
}

export async function POST(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "guardians:confirm"), 10, 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  let body: { token?: string; signature?: string; decline?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const token = body.token ?? "";
  if (!token) return NextResponse.json({ error: "token required" }, { status: 400 });

  const supabase = getSupabaseServerClient();
  const { data: g } = await supabase
    .from("recovery_guardians")
    .select("id, guardian_type, value, status, user_id")
    .eq("invite_token", token)
    .maybeSingle();
  if (!g) return NextResponse.json({ error: "This link isn't valid (or was removed)" }, { status: 404 });
  if (g.status === "confirmed") return NextResponse.json({ ok: true, already: true });

  // Declining removes the row entirely — the owner sees the guardian
  // disappear from their list. Possessing the link is proof enough here,
  // same as an email accept.
  if (body.decline) {
    // Atomic transition: only the request that actually removes a pending row
    // notifies — a mail-scanner prefetch + human click won't double-fire.
    const { data: deleted, error } = await supabase
      .from("recovery_guardians")
      .delete()
      .eq("id", g.id)
      .eq("status", "pending")
      .select("id");
    if (error) return NextResponse.json({ error: "Could not decline" }, { status: 500 });
    if (!deleted?.length) return NextResponse.json({ ok: true, already: true });
    await notifyEvent(supabase, {
      userId: String(g.user_id),
      kind: "guardian_declined",
      title: `${mask(g.guardian_type, g.value)} declined your guardian invite`,
      body: "Pick someone else in Settings, under Recovery & 2FA.",
      targetType: "guardian",
      targetId: g.id,
    });
    return NextResponse.json({ ok: true, declined: true });
  }

  let signature: string | null = null;
  if (g.guardian_type === "wallet") {
    signature = body.signature ?? null;
    if (!signature) return NextResponse.json({ error: "Signature required" }, { status: 400 });
    let valid = false;
    try {
      const pubKey = new PublicKey(g.value).toBytes();
      const sigBytes = Buffer.from(signature, "base64");
      const msgBytes = new TextEncoder().encode(guardianMessage(token));
      valid = ed25519.verify(sigBytes, msgBytes, pubKey);
    } catch {
      valid = false;
    }
    if (!valid) {
      return NextResponse.json(
        { error: "The signature doesn't match the invited wallet. Sign with the exact wallet that was invited." },
        { status: 403 }
      );
    }
  }

  // Atomic transition (only a pending→confirmed change notifies once).
  const { data: updated, error } = await supabase
    .from("recovery_guardians")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString(), confirmed_signature: signature })
    .eq("id", g.id)
    .eq("status", "pending")
    .select("id");
  if (error) return NextResponse.json({ error: "Could not confirm" }, { status: 500 });
  if (!updated?.length) return NextResponse.json({ ok: true, already: true });
  await notifyEvent(supabase, {
    userId: String(g.user_id),
    kind: "guardian_confirmed",
    title: `${mask(g.guardian_type, g.value)} is now your guardian`,
    body: "They accepted the invite. Your recovery just got stronger.",
    targetType: "guardian",
    targetId: g.id,
  });
  return NextResponse.json({ ok: true });
}
