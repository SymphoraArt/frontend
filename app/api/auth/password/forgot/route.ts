/**
 * POST /api/auth/password/forgot  { email } → { ok: true } (always)
 *
 * Issues a single-use reset token (30 min). Always returns ok so an attacker
 * can't probe which emails exist. SEAM: wire the email provider where marked;
 * in dev the reset link is logged server-side.
 */
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const RESET_TTL_MS = 30 * 60 * 1000;
const bodySchema = z.object({ email: z.string().email().max(320) });

export async function POST(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "auth:forgot:ip"), 10, 10 * 60 * 1000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: true });
  const email = parsed.data.email.trim().toLowerCase();

  const supabase = getSupabaseServerClient();
  const { data: user } = await supabase.from("users").select("id").eq("email", email).maybeSingle();
  if (user) {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + RESET_TTL_MS).toISOString();
    await supabase.from("password_reset_tokens").insert({ token, user_id: user.id, expires_at: expiresAt });

    const link = `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/reset-password?token=${token}`;
    // TODO(email): send `link` to `email` via the email provider.
    if (process.env.NODE_ENV !== "production") console.log("[auth/forgot] reset link:", link);
  }

  return NextResponse.json({ ok: true });
}
