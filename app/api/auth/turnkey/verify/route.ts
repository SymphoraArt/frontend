import { NextRequest, NextResponse } from "next/server";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { TurnkeyBrowserClient, DEFAULT_SOLANA_ACCOUNTS } from "@turnkey/sdk-browser";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { generateKeyPairSync } from "crypto";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";

const TURNKEY_BASE_URL = "https://api.turnkey.com";

function getTurnkeyClient(organizationId: string) {
  const apiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.TURNKEY_API_PRIVATE_KEY;
  const defaultOrgId = process.env.TURNKEY_ORGANIZATION_ID;

  if (!apiPublicKey || !apiPrivateKey || !defaultOrgId) {
    throw new Error("Turnkey env vars not configured");
  }

  const stamper = new ApiKeyStamper({ apiPublicKey, apiPrivateKey });
  return new TurnkeyBrowserClient({
    stamper,
    apiBaseUrl: TURNKEY_BASE_URL,
    organizationId,
  });
}

/**
 * Generate an ephemeral P-256 public key (compressed, hex) for use as
 * targetPublicKey in otpAuth. We only care that the call succeeds — we don't
 * decrypt the returned credential bundle.
 */
function generateEphemeralPublicKeyHex(): string {
  const { publicKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
  const spki = publicKey.export({ type: "spki", format: "der" });
  // SPKI for P-256: last 65 bytes are the uncompressed point (0x04 || x || y)
  const uncompressed = spki.slice(spki.length - 65);
  const x = uncompressed.slice(1, 33);
  const y = uncompressed.slice(33, 65);
  const prefix = y[31] & 1 ? 0x03 : 0x02;
  return Buffer.concat([Buffer.from([prefix]), x]).toString("hex");
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
    return NextResponse.json({
      walletAddress: existingUser.wallet_address,
      subOrganizationId: existingUser.sub_organization_id,
    });
  }

  // New user — create sub-org with a Solana wallet
  try {
    const parentClient = getTurnkeyClient(parentOrgId);

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
      ],
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
        return NextResponse.json({
          walletAddress: raceWinner.wallet_address,
          subOrganizationId: raceWinner.sub_organization_id,
        });
      }
    }

    return NextResponse.json({ walletAddress, subOrganizationId: subOrgId });
  } catch (error) {
    console.error("Turnkey createSubOrganization error:", error);
    return NextResponse.json({ error: "Failed to create wallet" }, { status: 500 });
  }
}
