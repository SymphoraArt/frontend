import type { SupabaseClient } from "@supabase/supabase-js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ActiveBan = { id: string; reason: string | null; expiresAt: string | null };

/**
 * X-Session-Token → users.id + active ban, WITHOUT blocking banned users.
 * Only the banned self-service surface (/api/ban/*) may act on a banned
 * session — everything else must go through resolveSessionUserId below.
 * auth_sessions.wallet_address is either the user's UUID (fresh email-login
 * bridge) or a wallet address that maps to a user via user_wallets.
 */
export async function resolveSessionUserWithBan(
  supabase: SupabaseClient,
  token: string | null,
): Promise<{ userId: string | null; ban: ActiveBan | null }> {
  if (!token) return { userId: null, ban: null };
  const { data: session } = await supabase
    .from("auth_sessions")
    .select("wallet_address")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (!session) return { userId: null, ban: null };
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
  if (!userId) return { userId: null, ban: null };
  return { userId, ban: await activeBanFor(supabase, userId) };
}

/** The user's newest active (unlifted, unexpired) full ban, or null. */
export async function activeBanFor(supabase: SupabaseClient, userId: string): Promise<ActiveBan | null> {
  const { data: bans } = await supabase
    .from("bans")
    .select("id, reason, expires_at")
    .eq("user_id", userId)
    .is("lifted_at", null)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("created_at", { ascending: false })
    .limit(1);
  const b = bans?.[0];
  return b ? { id: String(b.id), reason: (b.reason as string) ?? null, expiresAt: (b.expires_at as string) ?? null } : null;
}

/** Standard resolver: an active full ban means the session resolves to nobody. */
export async function resolveSessionUserId(supabase: SupabaseClient, token: string | null): Promise<string | null> {
  const { userId, ban } = await resolveSessionUserWithBan(supabase, token);
  return ban ? null : userId;
}
