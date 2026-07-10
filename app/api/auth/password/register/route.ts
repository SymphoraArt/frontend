/**
 * POST /api/auth/password/register  { email, password } → { token, expiresAt, email }
 *
 * Creates a user with an Argon2id+pepper password (see lib/password-auth) and
 * mints a session. The wallet itself is a Dynamic non-custodial embedded wallet
 * provisioned from this session's JWT after login — Enki never holds keys.
 */
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { hashPassword } from "@/lib/password-auth";
import { mintUserSession } from "@/lib/user-session";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const bodySchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(200),
});

export async function POST(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "auth:register:ip"), 10, 10 * 60 * 1000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  const email = parsed.data.email.trim().toLowerCase();

  const supabase = getSupabaseServerClient();
  const { data: existing } = await supabase.from("users").select("id").eq("email", email).maybeSingle();
  if (existing) return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });

  const { hash, salt } = hashPassword(parsed.data.password);
  const username = `${email.split("@")[0].slice(0, 20)}_${randomBytes(3).toString("hex")}`;

  const { data: user, error } = await supabase
    .from("users")
    .insert({ email, username, pw_hash: hash, pw_salt: salt })
    .select("id")
    .single();
  if (error || !user) {
    console.error("[auth/register] insert failed:", error?.message);
    return NextResponse.json({ error: "Could not create account" }, { status: 500 });
  }

  const session = await mintUserSession(user.id);
  return NextResponse.json({ email, ...session });
}
