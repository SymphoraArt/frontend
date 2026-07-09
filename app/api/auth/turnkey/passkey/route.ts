/**
 * POST /api/auth/turnkey/passkey
 *
 * Non-custodial onboarding (Plan A). Creates a Turnkey sub-organization whose
 * SOLE root user is the end-user's own passkey — no Enki/parent key is placed
 * in `rootUsers`, and email auth/recovery is disabled, so after creation the
 * parent org has read-only visibility and CAN NEVER authorize a signature for
 * the wallet. This replaces the email-OTP creation paths (auth/turnkey/init +
 * verify), where the root user had zero credentials and the wallet was
 * therefore controllable only through Enki's parent key (custodial).
 *
 * No email is collected here (product decision): the passkey is the whole
 * identity, so there is nothing to prove ownership of and no squatting/
 * takeover surface. Recovery is via the user's device-synced passkey; email
 * can be added later, self-service, signed by the user's own passkey.
 *
 * The parent API key authorizes ONLY the create_sub_organization activity
 * (Turnkey requires a parent stamp, or anyone could create sub-orgs in our
 * org) — it is not a member of the new sub-org.
 *
 *   Body: { encodedChallenge, attestation:{ credentialId, clientDataJson,
 *           attestationObject, transports } }
 *   Response: { walletAddress, subOrganizationId, sessionToken, expiresAt }
 *
 * Requires migrations/2026-07-08-turnkey-email-nullable.sql.
 */
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { TurnkeyServerClient, DEFAULT_SOLANA_ACCOUNTS } from "@turnkey/sdk-server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const TURNKEY_BASE_URL = "https://api.turnkey.com";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

const bodySchema = z.object({
  encodedChallenge: z.string().min(1).max(4096),
  attestation: z.object({
    credentialId: z.string().min(1).max(4096),
    clientDataJson: z.string().min(1).max(8192),
    attestationObject: z.string().min(1).max(16384),
    transports: z.array(z.string().max(64)).min(1).max(8),
  }),
});

function getTurnkeyClient() {
  const apiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.TURNKEY_API_PRIVATE_KEY;
  const organizationId = process.env.TURNKEY_ORGANIZATION_ID;
  if (!apiPublicKey || !apiPrivateKey || !organizationId) {
    throw new Error("Turnkey env vars not configured");
  }
  const stamper = new ApiKeyStamper({ apiPublicKey, apiPrivateKey });
  return new TurnkeyServerClient({ stamper, apiBaseUrl: TURNKEY_BASE_URL, organizationId });
}

async function createAuthSession(supabase: ReturnType<typeof getSupabaseServerClient>, walletAddress: string) {
  const sessionToken = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  // wallet_address lowercased here (EVM-style normalization); turnkey_users
  // keeps the case-exact base58, so downstream reads bridge via .ilike.
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
  // Sub-org creation costs Enki real money; cap per IP.
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "turnkey:passkey:ip"), 10, 10 * 60 * 1000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.issues }, { status: 400 });
  }
  const { encodedChallenge, attestation } = parsed.data;

  const supabase = getSupabaseServerClient();

  try {
    const client = getTurnkeyClient();
    const result = await client.createSubOrganization({
      organizationId: process.env.TURNKEY_ORGANIZATION_ID!,
      subOrganizationName: `user-${randomBytes(8).toString("hex")}`,
      rootQuorumThreshold: 1,
      // The passkey is the user's sole credential. Email auth/recovery is
      // disabled so no server-initiated flow can ever authenticate as the
      // root user — the passkey (and only the passkey) controls the wallet.
      disableEmailAuth: true,
      disableEmailRecovery: true,
      disableOtpEmailAuth: true,
      disableSmsAuth: true,
      rootUsers: [
        {
          userName: "Enki user",
          userEmail: "",
          apiKeys: [],
          oauthProviders: [],
          authenticators: [
            {
              authenticatorName: "Device Passkey",
              challenge: encodedChallenge,
              attestation: {
                credentialId: attestation.credentialId,
                clientDataJson: attestation.clientDataJson,
                attestationObject: attestation.attestationObject,
                transports: attestation.transports as (
                  | "AUTHENTICATOR_TRANSPORT_BLE"
                  | "AUTHENTICATOR_TRANSPORT_INTERNAL"
                  | "AUTHENTICATOR_TRANSPORT_NFC"
                  | "AUTHENTICATOR_TRANSPORT_USB"
                  | "AUTHENTICATOR_TRANSPORT_HYBRID"
                )[],
              },
            },
          ],
        },
      ],
      wallet: { walletName: "Solana Wallet", accounts: DEFAULT_SOLANA_ACCOUNTS },
    });

    const subOrgId = result.subOrganizationId;
    const walletId = result.wallet?.walletId;
    const walletAddress = result.wallet?.addresses?.[0];
    if (!subOrgId || !walletAddress) {
      throw new Error("Sub-org creation returned no wallet");
    }

    // Identity is the (unique) wallet address; email stays null until the
    // user opts into recovery later. Two concurrent onboards mint distinct
    // passkeys → distinct wallets → no collision.
    const { error: dbError } = await supabase.from("turnkey_users").insert({
      email: null,
      sub_organization_id: subOrgId,
      wallet_address: walletAddress,
      wallet_id: walletId ?? null,
    });
    if (dbError) {
      console.error("[turnkey/passkey] persist failed:", dbError.message);
      return NextResponse.json({ error: "Failed to create wallet" }, { status: 500 });
    }

    const session = await createAuthSession(supabase, walletAddress);
    return NextResponse.json({ walletAddress, subOrganizationId: subOrgId, ...session });
  } catch (error) {
    console.error("[turnkey/passkey] onboarding failed:", error);
    return NextResponse.json({ error: "Failed to create wallet" }, { status: 500 });
  }
}
