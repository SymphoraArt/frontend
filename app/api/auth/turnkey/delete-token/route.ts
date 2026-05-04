/**
 * Issues a short-lived delete confirmation token after verifying a Turnkey OTP.
 * The DELETE /api/prompts/[id] route validates this token before deleting.
 */
import { NextRequest, NextResponse } from "next/server";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { TurnkeyBrowserClient } from "@turnkey/sdk-browser";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { generateKeyPairSync, randomBytes } from "crypto";

const TURNKEY_BASE_URL = "https://api.turnkey.com";
const TOKEN_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getTurnkeyClient(organizationId: string) {
  const apiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.TURNKEY_API_PRIVATE_KEY;
  if (!apiPublicKey || !apiPrivateKey) throw new Error("Turnkey env vars not configured");

  const stamper = new ApiKeyStamper({ apiPublicKey, apiPrivateKey });
  return new TurnkeyBrowserClient({
    stamper,
    apiBaseUrl: TURNKEY_BASE_URL,
    organizationId,
  });
}

function generateEphemeralPublicKeyHex(): string {
  const { publicKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
  const spki = publicKey.export({ type: "spki", format: "der" });
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

  const supabase = getSupabaseServerClient();

  // Resolve email and organizationId from server-side OTP session (not client-provided)
  const { data: session } = await supabase
    .from("otp_sessions")
    .select("email, organization_id, expires_at")
    .eq("otp_id", otpId)
    .maybeSingle();

  if (!session || new Date(session.expires_at) < new Date()) {
    return NextResponse.json({ error: "OTP session expired or not found" }, { status: 401 });
  }

  const { email: userEmail, organization_id: organizationId } = session;

  // Verify OTP with Turnkey
  try {
    const client = getTurnkeyClient(organizationId);
    await client.otpAuth({
      organizationId,
      otpId,
      otpCode,
      targetPublicKey: generateEphemeralPublicKeyHex(),
    });
  } catch {
    return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 401 });
  }

  // Consume the OTP session
  await supabase.from("otp_sessions").delete().eq("otp_id", otpId);

  // Issue a short-lived delete token tied to the verified email
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

  const { error } = await supabase.from("delete_confirm_tokens").insert({
    token,
    user_email: userEmail,
    expires_at: expiresAt,
  });

  if (error) {
    console.error("Failed to store delete token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  return NextResponse.json({ token });
}
