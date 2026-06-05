import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import { deductBalance, creditBalance, normalizeUserId } from "@/lib/billing-db";
import {
  generateAndUploadImage,
  priceForResolution,
} from "@/backend/services/generate-image-core";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * POST /api/generate  { prompt, aspectRatio?, resolution?, address? }
 *
 * Platform-paid generation. We charge the user's persisted USD balance
 * (turnkey_users.balance) and the platform's own API keys pay for the actual
 * image generation — NO on-chain payment, NO Turnkey signing.
 *
 * User identity: resolved from the X-Session-Token (Turnkey email session) when
 * present, otherwise from the `address` in the body.
 */
async function resolveWallet(
  req: NextRequest,
  bodyAddress: string | null
): Promise<string | null> {
  const supabase = getSupabaseServerClientSafe();

  // Identity candidate: session token (preferred) else the client-provided address.
  let candidate: string | null = null;
  const sessionToken = req.headers.get("X-Session-Token");
  if (sessionToken && supabase) {
    const { data } = await supabase
      .from("auth_sessions")
      .select("wallet_address, expires_at")
      .eq("token", sessionToken)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();
    if (data?.wallet_address) candidate = data.wallet_address as string;
  }
  if (!candidate) candidate = normalizeUserId(bodyAddress);
  if (!candidate) return null;

  // auth_sessions stores a lowercased copy, but turnkey_users keeps the original
  // base58 case (Solana addresses are case-sensitive). Resolve the canonical
  // wallet_address so balance lookups match the right row.
  if (supabase) {
    const { data } = await supabase
      .from("turnkey_users")
      .select("wallet_address")
      .ilike("wallet_address", candidate)
      .maybeSingle();
    if (data?.wallet_address) return data.wallet_address as string;
  }
  return candidate;
}

export async function POST(req: NextRequest) {
  let body: {
    prompt?: unknown;
    aspectRatio?: unknown;
    resolution?: unknown;
    address?: unknown;
    referenceImages?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  if (prompt.length > 4000) return NextResponse.json({ error: "Prompt too long" }, { status: 400 });

  const aspectRatio = typeof body.aspectRatio === "string" ? body.aspectRatio : "1:1";
  const resolution = typeof body.resolution === "string" ? body.resolution : "2K";
  const bodyAddress = typeof body.address === "string" ? body.address : null;
  // Up to 4 reference images for image-guided generation.
  const referenceImages = Array.isArray(body.referenceImages)
    ? body.referenceImages.filter((x): x is string => typeof x === "string").slice(0, 4)
    : [];

  const wallet = await resolveWallet(req, bodyAddress);
  if (!wallet) {
    return NextResponse.json({ error: "Sign in to generate." }, { status: 401 });
  }

  const price = priceForResolution(resolution);

  // 1) Charge the user's balance up front.
  let charged: { ok: boolean; balance: number };
  try {
    charged = await deductBalance(wallet, price);
  } catch (e) {
    console.error("[/api/generate] balance error:", e);
    return NextResponse.json({ error: "Could not read balance." }, { status: 502 });
  }
  if (!charged.ok) {
    return NextResponse.json(
      {
        error: "Insufficient balance",
        code: "INSUFFICIENT_BALANCE",
        balance: charged.balance,
        needed: price,
      },
      { status: 402 }
    );
  }

  // 2) Generate (platform pays). Refund the charge if generation fails.
  try {
    const { imageUrl, model } = await generateAndUploadImage({
      prompt,
      aspectRatio,
      resolution,
      referenceImages,
    });
    return NextResponse.json({ imageUrl, model, balance: charged.balance, prompt });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[/api/generate] generation failed, refunding:", message);
    let balance = charged.balance;
    try {
      balance = await creditBalance(wallet, price);
    } catch (refundErr) {
      console.error("[/api/generate] refund failed:", refundErr);
    }
    return NextResponse.json(
      { error: "Generation failed. You were not charged.", balance, retryable: true },
      { status: 500 }
    );
  }
}
