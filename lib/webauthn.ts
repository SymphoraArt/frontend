import { NextRequest, NextResponse } from "next/server";
import { hkdfSync } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

/**
 * App-side WebAuthn passkeys for STEP-UP 2FA. Opt-in: a user who registers a
 * passkey must re-verify with it before sensitive actions (delete work,
 * withdrawals). Gates OUR endpoints via OUR session — independent of the wallet
 * vendor. See migrations/2026-07-11-webauthn.sql and app/api/auth/passkey/*.
 */
export const RP_NAME = "Enki Art";
const CHALLENGE_TTL_S = 300;
const STEPUP_TTL_S = 300;

// SECURITY: the expected origin/RP MUST NOT come from the request (the Origin
// header is attacker-controllable on a plain JSON POST), or WebAuthn's
// anti-phishing binding becomes tautological. Pin it to server config:
// WEBAUTHN_ORIGIN (+ optional WEBAUTHN_RP_ID), defaulting to localhost:3008 for
// dev. Prod MUST set WEBAUTHN_ORIGIN to the real origin.
export function rp(): { rpID: string; origin: string } {
  const origin = (process.env.WEBAUTHN_ORIGIN || "http://localhost:3008").replace(/\/$/, "");
  const rpID = process.env.WEBAUTHN_RP_ID || new URL(origin).hostname;
  return { rpID, origin };
}

// Passkeys key on the STABLE users.id, not the volatile session wallet_address
// (which is users.id before a wallet is attached and the address after).
export async function resolveStableUserId(
  supabase: ReturnType<typeof getSupabaseServerClient>,
  walletAddress: string,
): Promise<string | null> {
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(walletAddress)) {
    return walletAddress;
  }
  const { data } = await supabase
    .from("user_wallets")
    .select("user_id")
    .ilike("address", walletAddress)
    .is("removed_at", null)
    .maybeSingle();
  return data?.user_id ?? null;
}

// Step-up proof is a short-lived signed token, NOT server state: stepup/verify
// mints it, the sensitive endpoint verifies it (bound to user + scope). The
// signing key is HKDF-derived from AUTH_PEPPER so it needs no extra env and is
// domain-separated from the password pepper.
function stepUpKey(): Uint8Array {
  const p = process.env.AUTH_PEPPER;
  if (!p) throw new Error("AUTH_PEPPER not configured");
  return new Uint8Array(hkdfSync("sha256", Buffer.from(p, "base64"), new Uint8Array(0), Buffer.from("enki-stepup-v1"), 32));
}

export async function mintStepUpToken(userId: string, scope: string): Promise<string> {
  return new SignJWT({ scope })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${STEPUP_TTL_S}s`)
    .sign(stepUpKey());
}

async function verifyStepUpToken(token: string, userId: string, scope: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, stepUpKey());
    return payload.sub === userId && payload.scope === scope;
  } catch {
    return false;
  }
}

// Throws on DB error so callers FAIL CLOSED — a failed enrollment lookup must
// never be read as "no passkey" and silently skip 2FA.
export async function userHasPasskey(
  supabase: ReturnType<typeof getSupabaseServerClient>,
  userId: string,
): Promise<boolean> {
  const { count, error } = await supabase
    .from("webauthn_credentials")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) throw error;
  return (count ?? 0) > 0;
}

/**
 * Gate a sensitive action behind step-up 2FA. Opt-in: if the user has NO
 * passkey enrolled, the action proceeds (2FA not set up). If they DO, a valid
 * X-StepUp-Token for this scope is required — pass a resource-bound scope
 * (e.g. `delete-work:${id}`) so one passkey tap can't authorize others.
 * Returns null when allowed, or a NextResponse to return when blocked. Fails
 * CLOSED: any error looking up enrollment blocks the action.
 */
export async function requireStepUp(
  req: NextRequest,
  userId: string,
  scope: string,
): Promise<NextResponse | null> {
  const supabase = getSupabaseServerClient();
  let enrolled: boolean;
  try {
    enrolled = await userHasPasskey(supabase, userId);
  } catch {
    return NextResponse.json({ error: "Could not verify security settings" }, { status: 503 });
  }
  if (!enrolled) return null; // no passkey → not enforced
  const token = req.headers.get("X-StepUp-Token");
  if (token && (await verifyStepUpToken(token, userId, scope))) return null;
  return NextResponse.json({ error: "Step-up verification required", scope, stepUp: true }, { status: 401 });
}

// ── challenge cookie (single-use, httpOnly; no DB row needed) ──────────────
const COOKIE_PATH = "/api/auth/passkey";

export function setChallengeCookie(res: NextResponse, name: string, challenge: string) {
  res.cookies.set(name, challenge, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: COOKIE_PATH,
    maxAge: CHALLENGE_TTL_S,
  });
}

export function readChallengeCookie(req: NextRequest, name: string): string | undefined {
  return req.cookies.get(name)?.value;
}

export function clearChallengeCookie(res: NextResponse, name: string) {
  res.cookies.set(name, "", { path: COOKIE_PATH, maxAge: 0 });
}
