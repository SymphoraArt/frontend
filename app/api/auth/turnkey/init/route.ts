import { NextRequest, NextResponse } from "next/server";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { TurnkeyBrowserClient } from "@turnkey/sdk-browser";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const TURNKEY_BASE_URL = "https://api.turnkey.com";
const OTP_SESSION_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getTurnkeyClient() {
  const apiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.TURNKEY_API_PRIVATE_KEY;
  const organizationId = process.env.TURNKEY_ORGANIZATION_ID;

  if (!apiPublicKey || !apiPrivateKey || !organizationId) {
    throw new Error("Turnkey env vars not configured");
  }

  const stamper = new ApiKeyStamper({ apiPublicKey, apiPrivateKey });
  return new TurnkeyBrowserClient({
    stamper,
    apiBaseUrl: TURNKEY_BASE_URL,
    organizationId,
  });
}

export async function POST(req: NextRequest) {
  let email: string;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const orgId = process.env.TURNKEY_ORGANIZATION_ID;
  if (!orgId) {
    return NextResponse.json({ error: "Turnkey not configured" }, { status: 500 });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const supabase = getSupabaseServerClient();

  // Check if user already has a Turnkey sub-org
  const { data: existingUser } = await supabase
    .from("turnkey_users")
    .select("sub_organization_id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  // Use sub-org ID for existing users, parent org for new users
  const targetOrgId = existingUser?.sub_organization_id ?? orgId;

  try {
    const client = getTurnkeyClient();
    const result = await client.initOtpAuth({
      organizationId: targetOrgId,
      otpType: "OTP_TYPE_EMAIL",
      contact: normalizedEmail,
    });

    const otpId = result.otpId;

    // Store OTP session server-side — ties the otpId to the email it was issued for.
    // This prevents email substitution attacks in the verify route.
    await supabase.from("otp_sessions").upsert({
      otp_id: otpId,
      email: normalizedEmail,
      organization_id: targetOrgId,
      expires_at: new Date(Date.now() + OTP_SESSION_TTL_MS).toISOString(),
    });

    return NextResponse.json({ otpId });
  } catch (error) {
    console.error("Turnkey initOtpAuth error:", error);
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 });
  }
}
