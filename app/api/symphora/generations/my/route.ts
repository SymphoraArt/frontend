/**
 * GET /api/symphora/generations/my?userKey=... – List current user's generations (for My Gallery).
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import { getSymphoraGenerationsByUser } from "@/backend/storage-symphora";

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

    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10), 100);
    const generations = await getSymphoraGenerationsByUser(userKey, limit);

    return NextResponse.json({
      generations: generations.map((g) => ({
        id: g.id,
        _id: g._id?.toString(),
        user: g.user,
        prompt: g.prompt,
        variableValues: g.variableValues,
        generatedImage: g.generatedImage,
        usedSettings: g.usedSettings,
        status: g.status,
        createdAt: g.createdAt,
        completedAt: g.completedAt,
      })),
    });
  } catch (e) {
    console.error("Symphora my generations error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list generations" },
      { status: 500 }
    );
  }
}
