/**
 * GET /api/follows/check?userKey=...&wallet=... – Check if current user follows the given wallet.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import { isEnkiFollowing } from "@/backend/storage-enki";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userKey = searchParams.get("userKey") ?? searchParams.get("userId");
    const wallet = searchParams.get("wallet");
    if (!userKey || !wallet) {
      return NextResponse.json({ error: "userKey and wallet required" }, { status: 400 });
    }
    const following = await isEnkiFollowing(userKey, wallet);
    return NextResponse.json({ following });
  } catch (e) {
    console.error("Follows check error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to check follow" },
      { status: 500 }
    );
  }
}
