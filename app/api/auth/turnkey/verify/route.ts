import { NextRequest, NextResponse } from "next/server";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { TurnkeyServerClient, DEFAULT_SOLANA_ACCOUNTS } from "@turnkey/sdk-server";
import { generateP256KeyPair } from "@turnkey/crypto";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { randomBytes } from "crypto";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const TURNKEY_BASE_URL = "https://api.turnkey.com";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function getTurnkeyClient(organizationId: string) {
  const apiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.TURNKEY_API_PRIVATE_KEY;
  const defaultOrgId = process.env.TURNKEY_ORGANIZATION_ID;

  if (!apiPublicKey || !apiPrivateKey || !defaultOrgId) {
    throw new Error("Turnkey env vars not configured");
  }

  const stamper = new ApiKeyStamper({ apiPublicKey, apiPrivateKey });
  return new TurnkeyServerClient({
    stamper,
    apiBaseUrl: TURNKEY_BASE_URL,
    organizationId,
  });
}

function generateEphemeralPublicKeyHex(): string {
  return generateP256KeyPair().publicKeyUncompressed;
}

export async function POST(req: NextRequest) {
  let otpId: string, otpCode: string;
  try {
    ({ otpId, otpCode } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!otpId || !otpCode) {
    return NextResponse.json({ error: "otpId and otpCode are required" }, { status: 400 });
  }

  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "turnkey:otp:verify:ip"), 30, 10 * 60 * 1000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);
  const otpLimit = checkRequestRateLimit(rateLimitKey(req, "turnkey:otp:verify:otp", otpId), 5, 10 * 60 * 1000);
  if (!otpLimit.allowed) return rateLimitResponse(otpLimit.retryAfterSeconds);

  const supabase = getSupabaseServerClient();

  // Resolve email and organizationId from server-side OTP session (not client-provided)
  // This prevents email substitution attacks.
  const { data: session } = await supabase
    .from("otp_sessions")
    .select("email, organization_id, expires_at")
    .eq("otp_id", otpId)
    .maybeSingle();

  if (!session || new Date(session.expires_at) < new Date()) {
    return NextResponse.json({ error: "OTP session expired or not found" }, { status: 401 });
  }

  const { email: normalizedEmail, organization_id: organizationId } = session;
  const parentOrgId = process.env.TURNKEY_ORGANIZATION_ID!;

  // Verify the OTP with Turnkey
  try {
    const client = getTurnkeyClient(organizationId);
    await client.otpAuth({
      organizationId,
      otpId,
      otpCode,
      targetPublicKey: generateEphemeralPublicKeyHex(),
    });
  } catch (error) {
    console.error("Turnkey otpAuth error:", error);
    return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 401 });
  }

  // Clean up consumed OTP session
  await supabase.from("otp_sessions").delete().eq("otp_id", otpId);

  // Check if user already exists (server-side, not client-controlled)
  const { data: existingUser } = await supabase
    .from("turnkey_users")
    .select("wallet_address, sub_organization_id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (existingUser) {
    const session = await createAuthSession(existingUser.wallet_address, "turnkey");
    return NextResponse.json({
      walletAddress: existingUser.wallet_address,
      subOrganizationId: existingUser.sub_organization_id,
      sessionToken: session.sessionToken,
      expiresAt: session.expiresAt,
      isReturning: true,
    });
  }

  // New user — create sub-org with a Solana wallet
  try {
    const parentClient = getTurnkeyClient(parentOrgId);

    // The platform API key must be a root user of the sub-org so the server can
    // sign on the user's behalf (custodial / no-popup model). Without this, the
    // parent key is not a voter inside the sub-org and signing fails with
    // ORGANIZATION_MISMATCH.
    const serverApiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY!;

    const subOrgResult = await parentClient.createSubOrganization({
      organizationId: parentOrgId,
      subOrganizationName: `user:${normalizedEmail}`,
      rootUsers: [
        {
          userName: normalizedEmail,
          userEmail: normalizedEmail,
          apiKeys: [],
          authenticators: [],
          oauthProviders: [],
        },
        {
          userName: "Enki Server",
          userEmail: "",
          apiKeys: [
            {
              apiKeyName: "enki-server-signer",
              publicKey: serverApiPublicKey,
              curveType: "API_KEY_CURVE_P256",
            },
          ],
          authenticators: [],
          oauthProviders: [],
        },
      ],
      // Threshold 1 → the server key alone can authorize signing.
      rootQuorumThreshold: 1,
      wallet: {
        walletName: "Solana Wallet",
        accounts: DEFAULT_SOLANA_ACCOUNTS,
      },
    });

    const subOrgId = subOrgResult.subOrganizationId;
    const walletId = subOrgResult.wallet?.walletId;
    const walletAddress = subOrgResult.wallet?.addresses?.[0];

    if (!walletAddress || !subOrgId) {
      throw new Error("Sub-org creation did not return wallet address");
    }

    const { error: dbError } = await supabase.from("turnkey_users").insert({
      email: normalizedEmail,
      sub_organization_id: subOrgId,
      wallet_address: walletAddress,
      wallet_id: walletId ?? null,
    });

    if (dbError) {
      // Likely a race condition — another request created this user simultaneously
      console.error("Failed to persist Turnkey user:", dbError);
      // Fetch the record that won the race
      const { data: raceWinner } = await supabase
        .from("turnkey_users")
        .select("wallet_address, sub_organization_id")
        .eq("email", normalizedEmail)
        .maybeSingle();
      if (raceWinner) {
        const session = await createAuthSession(raceWinner.wallet_address, "turnkey");
        return NextResponse.json({
          walletAddress: raceWinner.wallet_address,
          subOrganizationId: raceWinner.sub_organization_id,
          sessionToken: session.sessionToken,
          expiresAt: session.expiresAt,
          isReturning: true,
        });
      }
    }

    const session = await createAuthSession(walletAddress, "turnkey");
    return NextResponse.json({
      walletAddress,
      subOrganizationId: subOrgId,
      sessionToken: session.sessionToken,
      expiresAt: session.expiresAt,
      isReturning: false,
    });
  } catch (error) {
    console.error("Turnkey createSubOrganization error:", error);
    return NextResponse.json({ error: "Failed to create wallet" }, { status: 500 });
  }
}

async function createAuthSession(walletAddress: string, walletType: string) {
  const supabase = getSupabaseServerClient();
  const sessionToken = randomBytes(32).toString("hex");
  const normalizedWallet = walletAddress.toLowerCase();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  const { error } = await supabase.from("auth_sessions").insert({
    token: sessionToken,
    wallet_address: normalizedWallet,
    wallet_type: walletType,
    expires_at: expiresAt,
  });
  if (error) throw error;

  return { sessionToken, expiresAt };
}
