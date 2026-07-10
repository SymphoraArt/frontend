/**
 * Client-side auth header for session-protected API routes.
 *
 * Both wallet session types (Turnkey email + Solana sign-in) store a token
 * that lives in auth_sessions and is accepted by requireAuth via
 * X-Session-Token. This reads whichever session the browser holds so callers
 * (gallery delete, generation status PATCH, …) can prove ownership without
 * each component wiring up every auth hook.
 */
export function sessionAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const email = localStorage.getItem("enki_session_token");
  if (email) return { "X-Session-Token": email };
  const turnkey = localStorage.getItem("turnkey_session_token");
  if (turnkey) return { "X-Session-Token": turnkey };
  try {
    const raw = localStorage.getItem("solana-auth-session");
    if (raw) {
      const token = (JSON.parse(raw) as { sessionToken?: string }).sessionToken;
      if (token) return { "X-Session-Token": token };
    }
  } catch {
    /* ignore malformed session */
  }
  return {};
}
