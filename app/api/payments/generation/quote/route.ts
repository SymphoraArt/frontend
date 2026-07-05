/**
 * POST /api/payments/generation/quote
 *
 * First half of server-built payments (backlog #2). The client sends ONLY
 * identifiers — never a price, amount, or destination:
 *
 *   Body: { promptId: string, modelFamily: string, resolution?: "2K" | "4K" }
 *
 * The server loads the prompt price and artist wallet from its own DB,
 * takes the model cost from server-side pricing, and returns the full
 * split so the user can see exactly what they'd pay:
 *
 *   { quote: { promptId, modelFamily, resolution, expiresAt,
 *              artistWallet, breakdown: { artistAmount, modelCost, enkiFee,
 *              enkiTotal, totalAmount, currency, decimals, feePolicy } } }
 *
 * Amounts are integer micro-USDC serialized as strings.
 *
 * This endpoint is read-only. The companion confirm endpoint (next step)
 * will persist a payment intent (see migrations/generation_payment_intents.sql),
 * build the atomic two-transfer Solana tx server-side, sign it via Turnkey,
 * and broadcast — replacing the client-built x402 flow and retiring
 * /api/turnkey/sign-transaction from the payment path.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { requireAuth, checkRateLimit } from "@/lib/auth";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import {
  PRICING_POLICY,
  UnknownModelError,
  computeGenerationSplit,
  getModelCostMicro,
  splitToBreakdown,
  usdToMicro,
} from "@/lib/payments/generation-pricing";

const quoteSchema = z.object({
  promptId: z.string().min(1).max(128),
  modelFamily: z.string().min(1).max(64),
  resolution: z.enum(["2K", "4K"]).optional(),
});

export async function POST(req: NextRequest) {
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "payments:quote:ip"), 60, 60_000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  let authUser;
  try {
    authUser = await requireAuth(req);
  } catch {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  if (!checkRateLimit(authUser.userId, "payments:quote", 30, 60_000)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 },
    );
  }
  const { promptId, modelFamily, resolution } = parsed.data;

  const supabase = getSupabaseServerClient();

  // 1. Prompt price comes from the DB — never from the client.
  const { data: prompt, error: promptError } = await supabase
    .from("prompts")
    .select("id, price, user_id, prompt_type, is_free_showcase")
    .eq("id", promptId)
    .maybeSingle();
  if (promptError) {
    console.error("[payments/quote] prompt lookup failed:", promptError.message);
    return NextResponse.json({ error: "Failed to load prompt" }, { status: 500 });
  }
  if (!prompt) {
    return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
  }

  const isFree =
    prompt.prompt_type === "showcase" ||
    prompt.prompt_type === "free-prompt" ||
    prompt.is_free_showcase === true;
  const promptPriceUsd = typeof prompt.price === "number" ? prompt.price : 0;
  const artistPriceMicro = isFree ? 0 : usdToMicro(promptPriceUsd);

  // 2. Model cost comes from server-side pricing — never from the client.
  let modelCostMicro: number;
  try {
    modelCostMicro = getModelCostMicro(modelFamily, resolution);
  } catch (error) {
    if (error instanceof UnknownModelError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }

  // 3. Artist payout wallet comes from the DB — never from the client.
  //    Paid prompts without a configured artist wallet cannot be quoted:
  //    the split has nowhere to send the artist share.
  let artistWallet: string | null = null;
  if (artistPriceMicro > 0) {
    if (!prompt.user_id) {
      return NextResponse.json(
        { error: "Prompt has no associated creator" },
        { status: 422 },
      );
    }
    const { data: creator, error: creatorError } = await supabase
      .from("users")
      .select("wallet_address")
      .eq("id", prompt.user_id)
      .maybeSingle();
    if (creatorError) {
      console.error("[payments/quote] creator lookup failed:", creatorError.message);
      return NextResponse.json({ error: "Failed to load creator" }, { status: 500 });
    }
    artistWallet = creator?.wallet_address ?? null;
    if (!artistWallet || artistWallet === "legacy-unbound") {
      return NextResponse.json(
        { error: "Artist payout wallet not configured for this prompt" },
        { status: 422 },
      );
    }
  }

  const split = computeGenerationSplit(artistPriceMicro, modelCostMicro);
  const expiresAt = new Date(
    Date.now() + PRICING_POLICY.quoteTtlSeconds * 1000,
  ).toISOString();

  return NextResponse.json({
    quote: {
      promptId,
      modelFamily,
      resolution: resolution ?? "2K",
      buyerWallet: authUser.walletAddress,
      artistWallet,
      expiresAt,
      breakdown: splitToBreakdown(split),
    },
  });
}
