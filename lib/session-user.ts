import type { SupabaseClient } from "@supabase/supabase-js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * X-Session-Token → users.id. auth_sessions.wallet_address is either the
 * user's UUID (fresh email-login bridge) or a wallet address that maps to a
 * user via user_wallets. Returns null for missing/expired sessions.
 */
export async function resolveSessionUserId(supabase: SupabaseClient, token: string | null): Promise<string | null> {
  if (!token) return null;
  const { data: session } = await supabase
    .from("auth_sessions")
    .select("wallet_address")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (!session) return null;
  if (UUID.test(session.wallet_address)) return session.wallet_address;
  const { data: row } = await supabase
    .from("user_wallets")
    .select("user_id")
    .eq("address", session.wallet_address)
    .is("removed_at", null)
    .maybeSingle();
  return row?.user_id ?? null;
}
