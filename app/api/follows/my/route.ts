/**
 * GET /api/follows/my?userKey=... – List wallet addresses the current user follows.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import { getEnkiFollowedWallets } from "@/backend/storage-enki";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userKey = searchParams.get("userKey") ?? searchParams.get("userId");
    if (!userKey) {
      return NextResponse.json({ error: "userKey required" }, { status: 400 });
    }
    const list = await getEnkiFollowedWallets(userKey);
    return NextResponse.json({ following: list });
  } catch (e) {
    console.error("Follows my error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list follows" },
      { status: 500 }
    );
  }
}
