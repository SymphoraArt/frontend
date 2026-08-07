import { createHmac } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

/** First client IP from the proxy headers (dev/localhost: ::1 or null). */
/**
 * Only the headers are read, so the parameter is typed by what is used rather
 * than by NextRequest. Route handlers that take a plain `Request` — several
 * do — could otherwise not report a moderation event at all.
 */
export function getClientIp(req: { headers: { get(name: string): string | null } }): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || null;
}

/**
 * Deterministic salted hash — raw IPs are never stored or compared (GDPR).
 * Same IP → same hash, so ip_bans can match without ever knowing the address.
 * Returns null when AUTH_PEPPER is unset (capture simply stays off).
 */
export function hashIp(ip: string | null): string | null {
  const pepper = process.env.AUTH_PEPPER;
  if (!ip || !pepper) return null;
  return createHmac("sha256", pepper).update(ip).digest("hex");
}

/** Active ip_bans row for this hash? Tolerates the table not existing yet. */
export async function isIpBanned(supabase: SupabaseClient, ipHash: string | null): Promise<boolean> {
  if (!ipHash) return false;
  const { data, error } = await supabase.from("ip_bans")
    .select("ip_hash").eq("ip_hash", ipHash).is("lifted_at", null).limit(1);
  return !error && (data?.length ?? 0) > 0;
}
