/**
 * GET /api/symphora/prompts/[id] – Get one prompt by ID (for detail / generator page).
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import { getEnkiPromptById } from "@/backend/storage-enki";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const prompt = await getEnkiPromptById(id);
    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: prompt.id,
      _id: prompt._id?.toString(),
      creator: prompt.creator,
      type: prompt.type,
      title: prompt.title,
      description: prompt.description,
      category: prompt.category,
      aiSettings: prompt.aiSettings,
      promptData: prompt.promptData,
      pricing: prompt.pricing,
      showcaseImages: prompt.showcaseImages ?? [],
      stats: prompt.stats ?? { totalGenerations: 0, bookmarks: 0, likes: 0, reviews: { total: 0, averageRating: 0, distribution: {} } },
      createdAt: prompt.createdAt,
      updatedAt: prompt.updatedAt,
      isFeatured: prompt.isFeatured,
    });
  } catch (e) {
    console.error("Symphora prompt get error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to get prompt" },
      { status: 500 }
    );
  }
}
