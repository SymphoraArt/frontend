/**
 * GET /api/symphora/prompts/my?userKey=... – List current user's prompts (for My Prompts).
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import { getSymphoraPromptsByCreator } from "@/backend/storage-symphora";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userKey = searchParams.get("userKey") ?? searchParams.get("userId");
    if (!userKey) {
      return NextResponse.json(
        { error: "userKey or userId is required" },
        { status: 400 }
      );
    }

    const prompts = await getSymphoraPromptsByCreator(userKey);

    return NextResponse.json({
      prompts: prompts.map((p) => ({
        id: p.id,
        _id: p._id?.toString(),
        creator: p.creator,
        type: p.type,
        title: p.title,
        description: p.description,
        category: p.category,
        pricing: p.pricing,
        showcaseImages: p.showcaseImages ?? [],
        stats: p.stats ?? { totalGenerations: 0, bookmarks: 0, likes: 0, reviews: { total: 0, averageRating: 0, distribution: {} } },
        createdAt: p.createdAt,
        isFeatured: p.isFeatured,
      })),
    });
  } catch (e) {
    console.error("Symphora my prompts error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list prompts" },
      { status: 500 }
    );
  }
}
