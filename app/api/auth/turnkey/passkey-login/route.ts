/**
 * POST /api/auth/turnkey/passkey-login
 *
 * Returning-user login for non-custodial passkey wallets (Plan A). The client
 * produces a passkey-stamped `whoami` request against the PARENT org id;
 * Turnkey resolves the request to the sub-organization that owns the signing
 * credential and verifies the WebAuthn signature. We forward the signed
 * request VERBATIM (body + stamp header) and trust only Turnkey's response —
 * so a device switch or new browser always lands in the user's EXISTING
 * sub-org/wallet, never a fresh one.
 *
 * No Enki key touches the user's wallet here: the parent API key is not used
 * at all — verification is done by Turnkey against the user's own passkey.
 *
 *   Body: { signedWhoami: { body: string, stamp: { stampHeaderName, stampHeaderValue } } }
 *   Response: { walletAddress, subOrganizationId, sessionToken, expiresAt }
 */
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const TURNKEY_BASE_URL = "https://api.turnkey.com";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

const bodySchema = z.object({
  signedWhoami: z.object({
    body: z.string().min(1).max(4096),
    stamp: z.object({
      stampHeaderName: z.string().min(1).max(128),
      stampHeaderValue: z.string().min(1).max(16384),
    }),
  }),
});

async function createAuthSession(supabase: ReturnType<typeof getSupabaseServerClient>, walletAddress: string) {
  const sessionToken = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  // Same normalization as the passkey signup route: sessions store lowercase,
  // turnkey_users keeps case-exact base58 (bridged via .ilike downstream).
  const { error } = await supabase.from("auth_sessions").insert({
    token: sessionToken,
    wallet_address: walletAddress.toLowerCase(),
    wallet_type: "turnkey",
    expires_at: expiresAt,
  });
  if (error) throw error;
  return { sessionToken, expiresAt };
}

export async function POST(req: NextRequest) {
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "turnkey:passkey-login:ip"), 30, 10 * 60 * 1000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  const { signedWhoami } = parsed.data;

  // The stamped body must be the whoami shape targeting OUR parent org — the
  // stamp signs these exact bytes, so we forward them verbatim rather than
  // re-serializing (any re-encoding would invalidate the signature).
  const parentOrgId = process.env.TURNKEY_ORGANIZATION_ID;
  if (!parentOrgId) {
    return NextResponse.json({ error: "Turnkey not configured" }, { status: 500 });
  }
  try {
    const stamped = JSON.parse(signedWhoami.body) as { organizationId?: string };
    if (stamped.organizationId !== parentOrgId) {
      return NextResponse.json({ error: "Invalid login request" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid login request" }, { status: 400 });
  }

  try {
    const whoamiRes = await fetch(`${TURNKEY_BASE_URL}/public/v1/query/whoami`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [signedWhoami.stamp.stampHeaderName]: signedWhoami.stamp.stampHeaderValue,
      },
      body: signedWhoami.body,
    });
    if (!whoamiRes.ok) {
      return NextResponse.json({ error: "Passkey verification failed" }, { status: 401 });
    }
    const whoami = (await whoamiRes.json()) as { organizationId?: string };
    const subOrgId = whoami.organizationId;

    // Turnkey resolves the credential to its sub-org; the parent org id coming
    // back would mean the stamp was NOT a user passkey — reject.
    if (!subOrgId || subOrgId === parentOrgId) {
      return NextResponse.json({ error: "Passkey verification failed" }, { status: 401 });
    }

    const supabase = getSupabaseServerClient();
    const { data: tkUser } = await supabase
      .from("turnkey_users")
      .select("wallet_address, sub_organization_id")
      .eq("sub_organization_id", subOrgId)
      .maybeSingle();
    if (!tkUser?.wallet_address) {
      return NextResponse.json({ error: "No account found for this passkey" }, { status: 404 });
    }

    const session = await createAuthSession(supabase, tkUser.wallet_address);
    return NextResponse.json({
      walletAddress: tkUser.wallet_address,
      subOrganizationId: tkUser.sub_organization_id,
      ...session,
    });
  } catch (error) {
    console.error("[turnkey/passkey-login] failed:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
