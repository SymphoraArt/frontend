/**
 * GET /api/estimate-config?userId=...
 * Returns pricing constants for client-side real-time cost calculation (token-based).
 */

import { NextRequest, NextResponse } from "next/server";
import { estimateGeminiCost } from "@/backend/services/gemini-image-generation";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import { getFeePercent, resolveSpecialty, type UserSpecialty } from "@/lib/fee-config";
import { GEMINI_PRICE_PER_TOKEN } from "@/lib/generation-pricing";

const MODEL = "gemini-2.5-flash-image";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")?.trim() ?? undefined;

    const imageCostByResolution = {
      "1K": estimateGeminiCost(MODEL, "1K", 1),
      "2K": estimateGeminiCost(MODEL, "2K", 1),
      "4K": estimateGeminiCost(MODEL, "4K", 1),
    };

    let specialty: UserSpecialty = "normal";
    if (userId) {
      const supabase = getSupabaseServerClientSafe();
      let user: { preferences?: unknown } | null = null;
      if (supabase) {
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
      }
      specialty = resolveSpecialty(userId, user?.preferences as { specialty?: string } | undefined);
    }

    const feePercent = getFeePercent(specialty);

    return NextResponse.json({
      imageCostByResolution,
      pricePerToken: GEMINI_PRICE_PER_TOKEN,
      feePercent,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
