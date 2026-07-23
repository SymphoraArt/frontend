import { randomBytes } from "crypto";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Mint an auth_sessions row for an email/password user. Keyed by users.id as
 * wallet_address until the Dynamic embedded wallet is attached on first login
 * (then the real wallet address replaces it). requireAuth resolves by token.
 */
export async function mintUserSession(userId: string) {
  const supabase = getSupabaseServerClient();
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  const { error } = await supabase.from("auth_sessions").insert({
    token,
    wallet_address: userId,
    wallet_type: "password",
    expires_at: expiresAt,
  });
  if (error) throw error;
  return { token, expiresAt };
}
