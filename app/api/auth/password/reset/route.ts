/**
 * POST /api/auth/password/reset  { token, password } → { token, expiresAt }
 *
 * Consumes a single-use reset token, sets the new Argon2id+pepper password, and
 * logs the user in. The token is deleted immediately (one-shot).
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { hashPassword } from "@/lib/password-auth";
import { mintUserSession } from "@/lib/user-session";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const bodySchema = z.object({
  token: z.string().min(1).max(128),
  password: z.string().min(8).max(200),
});

export async function POST(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "auth:reset:ip"), 20, 10 * 60 * 1000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const supabase = getSupabaseServerClient();
  const { data: row } = await supabase
    .from("password_reset_tokens")
    .select("token, user_id, expires_at")
    .eq("token", parsed.data.token)
    .maybeSingle();

  if (!row || new Date(row.expires_at).getTime() <= Date.now()) {
    return NextResponse.json({ error: "This reset link is invalid or expired" }, { status: 400 });
  }

  const { hash, salt } = hashPassword(parsed.data.password);
  const { data: updated, error } = await supabase
    .from("password_credentials")
    .update({ pw_hash: hash, pw_salt: salt, updated_at: new Date().toISOString() })
    .eq("user_id", row.user_id)
    .select("email")
    .single();
  if (error) {
    console.error("[auth/reset] update failed:", error.message);
    return NextResponse.json({ error: "Could not reset password" }, { status: 500 });
  }
  await supabase.from("password_reset_tokens").delete().eq("token", row.token);

  // Evict every existing session for this user — a reset must lock out anyone
  // (e.g. a phished session) who was already in. Sessions key on the users.id
  // bridge before a wallet is attached and on the wallet address after, so
  // collect both.
  const { data: wallets } = await supabase
    .from("user_wallets")
    .select("address")
    .eq("user_id", row.user_id)
    .is("removed_at", null);
  const keys = [row.user_id, ...(wallets ?? []).map((w) => w.address)];
  await supabase.from("auth_sessions").delete().in("wallet_address", keys);

  const session = await mintUserSession(row.user_id);
  return NextResponse.json({ email: updated?.email ?? undefined, ...session });
}
