/**
 * GET /api/symphora/prompts/showroom – List showcase prompts for Showroom.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import { getSymphoraPromptsForShowroom } from "@/backend/storage-symphora";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "24", 10), 50);
    const cursor = searchParams.get("cursor") ?? undefined;
    const category = searchParams.get("category") ?? undefined;

    const prompts = await getSymphoraPromptsForShowroom({
      limit,
      cursor,
      category,
    });

    return NextResponse.json({
      prompts: prompts.map((p) => ({
        id: p.id,
        _id: p._id?.toString(),
        creator: p.creator,
        type: p.type,
        title: p.title,
        description: p.description,
        category: p.category,
        showcaseImages: p.showcaseImages ?? [],
        stats: p.stats ?? { totalGenerations: 0, bookmarks: 0, likes: 0, reviews: { total: 0, averageRating: 0, distribution: {} } },
        createdAt: p.createdAt,
        isFeatured: p.isFeatured,
      })),
      nextCursor: prompts.length === limit ? prompts[prompts.length - 1]?.id : undefined,
    });
  } catch (e) {
    console.error("Symphora showroom list error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list prompts" },
      { status: 500 }
    );
  }
}
