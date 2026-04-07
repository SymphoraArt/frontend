/**
 * GET /api/profile/[wallet] – Public profile (avatar, banner, bio, showWalletInProfile) + public prompts.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import {
  getEnkiProfileByWallet,
  getEnkiPromptsByCreator,
} from "@/backend/storage-enki";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ wallet: string }> }
) {
  try {
    await connectDB();
    const { wallet } = await context.params;
    const normalized = wallet?.trim();
    if (!normalized) {
      return NextResponse.json({ error: "Wallet is required" }, { status: 400 });
    }

    const [profile, prompts, userPrefs] = await Promise.all([
      getEnkiProfileByWallet(normalized),
      getEnkiPromptsByCreator(normalized),
      (async () => {
        try {
          const supabase = getSupabaseServerClient();
          const { data: user } = await supabase
            .from("users")
            .select("preferences")
            .eq("wallet_address", normalized.toLowerCase())
            .maybeSingle();
          const prefs = (user?.preferences as { showWalletInProfile?: boolean } | null) ?? {};
          return prefs.showWalletInProfile ?? true;
        } catch {
          return true;
        }
      })(),
    ]);

    const publicPrompts = prompts.map((p) => ({
      id: p.id,
      _id: p._id?.toString(),
      creator: p.creator,
      type: p.type,
      title: p.title,
      description: p.description,
      category: p.category,
      pricing: p.pricing,
      showcaseImages: p.showcaseImages ?? [],
      stats: p.stats ?? {
        totalGenerations: 0,
        bookmarks: 0,
        likes: 0,
        reviews: { total: 0, averageRating: 0, distribution: {} },
      },
      createdAt: p.createdAt,
      isFeatured: p.isFeatured,
    }));

    return NextResponse.json({
      profile: profile
        ? {
            wallet: profile.wallet,
            avatarUrl: profile.avatarUrl,
            bannerUrl: profile.bannerUrl,
            bio: profile.bio,
            updatedAt: profile.updatedAt,
            showWalletInProfile: userPrefs,
          }
        : {
            wallet: normalized,
            avatarUrl: null,
            bannerUrl: null,
            bio: null,
            updatedAt: null,
            showWalletInProfile: userPrefs,
          },
      prompts: publicPrompts,
    });
  } catch (e) {
    console.error("Profile GET error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to load profile" },
      { status: 500 }
    );
  }
}
