/**
 * POST /api/estimate-generation-cost
 * Returns precise estimated cost for a generation (API price + platform fee).
 * Uses same Gemini enhancement as actual generation so estimate matches charge.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import { getPreciseEnhancementEstimate } from "@/lib/generation-pricing";
import { estimateGeminiCost } from "@/backend/services/gemini-image-generation";
import { applyFee, getFeePercent, resolveSpecialty, type UserSpecialty } from "@/lib/fee-config";

type Body = {
  prompt?: string;
  resolution?: string;
  model?: string;
  userId?: string;
  /** If false, cost is image-only (no enhancement tokens). Default true. */
  useEnhancement?: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body;
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const resolution = body.resolution === "1K" ? "1K" : body.resolution === "4K" ? "4K" : "2K";
    const model = body.model === "gemini-2.5-flash-image" ? "gemini-2.5-flash-image" : "gemini-3-pro-image-preview";
    const useEnhancement = body.useEnhancement !== false;
    const userId = typeof body?.userId === "string" ? body.userId.trim() : undefined;

    let specialty: UserSpecialty = "normal";
    if (userId) {
      const supabase = getSupabaseServerClientSafe();
      if (supabase) {
        let user: { preferences?: unknown } | null = null;
        const byId = await supabase
          .from("users")
          .select("id, preferences, wallet_address")
          .eq("id", userId)
          .maybeSingle();
        if (byId.data) user = byId.data;
        if (!user) {
          const byWallet = await supabase
            .from("users")
            .select("id, preferences, wallet_address")
            .eq("wallet_address", userId.toLowerCase())
            .maybeSingle();
          if (byWallet.data) user = byWallet.data;
        }
        specialty = resolveSpecialty(userId, user?.preferences as { specialty?: string } | undefined);
      } else {
        specialty = resolveSpecialty(userId, undefined);
      }
    }

    const imageCostUsd = estimateGeminiCost(model, resolution, 1);
    let enhancementCostUsd = 0;
    let geminiTokens = 0;
    let enhancementInputTokens = 0;
    let enhancementOutputTokens = 0;
    let fromCountTokensApi = false;
    if (useEnhancement && prompt) {
      const precise = await getPreciseEnhancementEstimate(prompt);
      enhancementCostUsd = precise.costUsd;
      geminiTokens = precise.totalTokens;
      enhancementInputTokens = precise.inputTokens;
      enhancementOutputTokens = precise.outputTokens;
      fromCountTokensApi = precise.fromCountTokensApi;
    }
    const apiPriceUsd = Math.round((imageCostUsd + enhancementCostUsd) * 1e6) / 1e6;
    const feePercent = getFeePercent(specialty);
    const totalUsd = Math.round(applyFee(apiPriceUsd, specialty) * 10000) / 10000;
    const feeUsd = Math.round((totalUsd - apiPriceUsd) * 10000) / 10000;

    return NextResponse.json({
      apiPriceUsd: Math.round(apiPriceUsd * 10000) / 10000,
      feePercent,
      feeUsd,
      totalUsd,
      currency: "USD",
      geminiTokens,
      enhancementInputTokens,
      enhancementOutputTokens,
      enhancementCostUsd: Math.round(enhancementCostUsd * 1e6) / 1e6,
      imageCostUsd: Math.round(imageCostUsd * 1e6) / 1e6,
      fromCountTokensApi,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
