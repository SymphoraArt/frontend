/**
 * POST /api/auth/session
 *
 * One-time wallet signature + nonce verification.
 * On success, issues a 24-hour session token that clients send as
 * X-Session-Token on subsequent authenticated requests.
 */
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { isAddress, verifyMessage } from "viem";
import { PublicKey } from "@solana/web3.js";
import { ed25519 } from "@noble/curves/ed25519";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import { APP_NAME } from "@/shared/app-config";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const NONCE_WINDOW_MS = 10 * 60 * 1000;      // nonce must be <= 10 min old

async function verifySolana(publicKeyBase58: string, signatureBase64: string, message: string): Promise<boolean> {
  try {
    const pubKeyBytes = new PublicKey(publicKeyBase58).toBytes();
    const sigBytes = Buffer.from(signatureBase64, "base64");
    const msgBytes = new TextEncoder().encode(message);
    return ed25519.verify(sigBytes, msgBytes, pubKeyBytes);
  } catch {
    return false;
  }
}

async function verifyEvm(walletAddress: string, signature: string, message: string): Promise<boolean> {
  try {
    return await verifyMessage({
      address: walletAddress as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "auth:session:ip"), 20, 60_000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  let body: {
    walletAddress?: unknown;
    walletType?: unknown;
    signature?: unknown;
    message?: unknown;
    timestamp?: unknown;
    nonce?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const walletAddress = typeof body.walletAddress === "string" ? body.walletAddress.trim() : "";
  const walletType = body.walletType === "solana" ? "solana" : "evm";
  const signature = typeof body.signature === "string" ? body.signature.trim() : "";
  const message = typeof body.message === "string" ? body.message : "";
  const timestamp = typeof body.timestamp === "number" ? body.timestamp : Number(body.timestamp);
  const nonce = typeof body.nonce === "string" ? body.nonce.trim() : "";

  if (!walletAddress || !signature || !message || !nonce || isNaN(timestamp)) {
    return NextResponse.json(
      { error: "walletAddress, signature, message, timestamp, and nonce are required" },
      { status: 400 }
    );
  }

  // Validate wallet address format
  if (walletType === "solana") {
    try { new PublicKey(walletAddress); } catch {
      return NextResponse.json({ error: "Invalid Solana address" }, { status: 400 });
    }
  } else if (!isAddress(walletAddress)) {
    return NextResponse.json({ error: "Invalid EVM address" }, { status: 400 });
  }

  // Timestamp freshness (10-minute window to allow clock skew on first sign)
  if (Math.abs(Date.now() - timestamp) > NONCE_WINDOW_MS) {
    return NextResponse.json({ error: "Signature timestamp expired. Please re-authenticate." }, { status: 401 });
  }

  // Message must reference the wallet and nonce
  if (!message.toLowerCase().includes(walletAddress.toLowerCase())) {
    return NextResponse.json({ error: "Message does not reference the claimed wallet" }, { status: 401 });
  }
  if (!message.includes(nonce)) {
    return NextResponse.json({ error: "Message does not reference the issued nonce" }, { status: 401 });
  }
  // Message must reference the app name
  if (!message.includes(APP_NAME)) {
    return NextResponse.json({ error: "Message references an unknown application" }, { status: 401 });
  }

  // Verify cryptographic signature
  const normalizedWallet = walletAddress.toLowerCase();
  const valid =
    walletType === "solana"
      ? await verifySolana(walletAddress, signature, message)
      : await verifyEvm(walletAddress, signature, message);

  if (!valid) {
    return NextResponse.json({ error: "Invalid wallet signature" }, { status: 401 });
  }

  const supabase = getSupabaseServerClient();

  // Consume the nonce (atomic — rejects replays)
  const { data: consumed, error: nonceError } = await supabase.rpc("consume_auth_nonce", {
    p_wallet_address: normalizedWallet,
    p_nonce: nonce,
  });
  if (nonceError || !consumed) {
    return NextResponse.json(
      { error: "Nonce is invalid, expired, or already used. Request a new nonce." },
      { status: 401 }
    );
  }

  // Create session
  const sessionToken = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  const { error: sessionError } = await supabase.from("auth_sessions").insert({
    token: sessionToken,
    wallet_address: normalizedWallet,
    wallet_type: walletType,
    expires_at: expiresAt,
  });
  if (sessionError) {
    console.error("Failed to create auth session:", sessionError);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  // Ensure user + wallet row exist
  const { data: walletRow } = await supabase
    .from("user_wallets")
    .select("user_id")
    .eq("address", normalizedWallet)
    .is("removed_at", null)
    .maybeSingle();

  if (!walletRow?.user_id) {
    const userInsert = await supabase.from("users").insert({}).select("id").single();
    if (!userInsert.error && userInsert.data?.id) {
      await supabase.from("user_wallets").insert({
        user_id: userInsert.data.id,
        address: normalizedWallet,
        chain_family: walletType === "solana" ? "solana" : "evm",
        wallet_type: "external_eoa",
        is_primary: true,
      }).select();
    }
  }

  return NextResponse.json({ sessionToken, expiresAt, walletAddress: normalizedWallet, walletType });
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("X-Session-Token");
  if (!token) return NextResponse.json({ error: "No session token" }, { status: 400 });

  const supabase = getSupabaseServerClient();
  await supabase.from("auth_sessions").delete().eq("token", token);
  return NextResponse.json({ ok: true });
}
