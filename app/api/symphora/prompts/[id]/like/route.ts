/**
 * POST /api/symphora/prompts/[id]/like – Like a prompt (body: { userId }).
 * DELETE – Remove like.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import {
  likeSymphoraPrompt,
  unlikeSymphoraPrompt,
  hasUserLikedSymphoraPrompt,
  getSymphoraPromptLikeCount,
} from "@/backend/storage-symphora";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json().catch(() => ({}));
    const userId = body.userId ?? body.userKey;
    if (!id || !userId) {
      return NextResponse.json(
        { error: "id and userId are required" },
        { status: 400 }
      );
    }

    const result = await likeSymphoraPrompt(id, userId);
    return NextResponse.json({
      liked: result.liked,
      likesCount: result.likesCount,
    });
  } catch (e) {
    console.error("Symphora like error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to like" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") ?? searchParams.get("userKey");
    if (!id || !userId) {
      return NextResponse.json(
        { error: "id and userId (query) are required" },
        { status: 400 }
      );
    }

    const result = await unlikeSymphoraPrompt(id, userId);
    return NextResponse.json({
      liked: result.liked,
      likesCount: result.likesCount,
    });
  } catch (e) {
    console.error("Symphora unlike error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to unlike" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") ?? searchParams.get("userKey");

    const likesCount = await getSymphoraPromptLikeCount(id);
    const hasLiked = userId ? await hasUserLikedSymphoraPrompt(id, userId) : false;

    return NextResponse.json({ likesCount, hasLiked });
  } catch (e) {
    console.error("Symphora like status error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to get like status" },
      { status: 500 }
    );
  }
}
