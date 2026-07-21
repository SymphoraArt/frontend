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
  let userId: string | null = null;
  if (UUID.test(session.wallet_address)) {
    userId = session.wallet_address;
  } else {
    const { data: row } = await supabase
      .from("user_wallets")
      .select("user_id")
      .eq("address", session.wallet_address)
      .is("removed_at", null)
      .maybeSingle();
    userId = row?.user_id ?? null;
  }
  if (!userId) return null;
  // Active full ban → the session resolves to nobody (locks every authed API).
  // A future user-facing appeal flow must NOT depend on this resolution.
  const { data: ban } = await supabase
    .from("bans")
    .select("id")
    .eq("user_id", userId)
    .is("lifted_at", null)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .limit(1);
  if (ban?.length) return null;
  return userId;
}
