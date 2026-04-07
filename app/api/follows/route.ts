/**
 * POST /api/follows – Follow a user (body: userKey, wallet).
 * DELETE /api/follows – Unfollow (body: userKey, wallet).
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import { addEnkiFollow, removeEnkiFollow } from "@/backend/storage-enki";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const userKey = (body.userKey ?? body.userId)?.trim?.();
    const wallet = (body.wallet ?? body.following)?.trim?.();
    if (!userKey || !wallet) {
      return NextResponse.json({ error: "userKey and wallet required" }, { status: 400 });
    }
    await connectDB();
    await addEnkiFollow(userKey, wallet);
    return NextResponse.json({ success: true, following: true });
  } catch (e) {
    console.error("Follow POST error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to follow" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const userKey = (body.userKey ?? body.userId)?.trim?.();
    const wallet = (body.wallet ?? body.following)?.trim?.();
    if (!userKey || !wallet) {
      return NextResponse.json({ error: "userKey and wallet required" }, { status: 400 });
    }
    await connectDB();
    await removeEnkiFollow(userKey, wallet);
    return NextResponse.json({ success: true, following: false });
  } catch (e) {
    console.error("Follow DELETE error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to unfollow" },
      { status: 500 }
    );
  }
}
