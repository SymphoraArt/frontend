/**
 * POST /api/auth/password/login  { email, password } → { token, expiresAt, email }
 *
 * Verifies the Argon2id+pepper password and mints a session. Generic error on
 * any failure so we never reveal whether an email exists.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { verifyPassword } from "@/lib/password-auth";
import { mintUserSession } from "@/lib/user-session";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const bodySchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(1).max(200),
});

export async function POST(req: NextRequest) {
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "auth:login:ip"), 20, 10 * 60 * 1000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  const email = parsed.data.email.trim().toLowerCase();

  const emailLimit = checkRequestRateLimit(rateLimitKey(req, "auth:login:email", email), 10, 10 * 60 * 1000);
  if (!emailLimit.allowed) return rateLimitResponse(emailLimit.retryAfterSeconds);

  const supabase = getSupabaseServerClient();
  const { data: user } = await supabase
    .from("users")
    .select("id, pw_hash, pw_salt")
    .eq("email", email)
    .maybeSingle();

  if (!user?.pw_hash || !user.pw_salt || !verifyPassword(parsed.data.password, user.pw_hash, user.pw_salt)) {
    return NextResponse.json({ error: "Wrong email or password" }, { status: 401 });
  }

  const session = await mintUserSession(user.id);
  return NextResponse.json({ email, ...session });
}
