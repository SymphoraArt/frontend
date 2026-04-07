/**
 * PATCH /api/profile – Update own profile (avatarUrl, bannerUrl, bio). Requires userKey in body.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import { upsertEnkiProfile } from "@/backend/storage-enki";

const BIO_MAX = 280;

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const userKey =
      (body.userKey ?? body.userId ?? body.wallet ?? req.headers.get("x-user-id"))?.trim?.();
    if (!userKey) {
      return NextResponse.json(
        { error: "userKey (wallet) is required in body or X-User-Id header" },
        { status: 400 }
      );
    }

    await connectDB();

    const updates: { avatarUrl?: string | null; bannerUrl?: string | null; bio?: string | null } =
      {};
    if (body.avatarUrl !== undefined) updates.avatarUrl = body.avatarUrl ?? null;
    if (body.bannerUrl !== undefined) updates.bannerUrl = body.bannerUrl ?? null;
    if (body.bio !== undefined) {
      const bio = typeof body.bio === "string" ? body.bio.slice(0, BIO_MAX) : null;
      updates.bio = bio ?? null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No profile fields to update" }, { status: 400 });
    }

    const profile = await upsertEnkiProfile(userKey, updates);

    return NextResponse.json({
      profile: {
        wallet: profile.wallet,
        avatarUrl: profile.avatarUrl,
        bannerUrl: profile.bannerUrl,
        bio: profile.bio,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (e) {
    console.error("Profile PATCH error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update profile" },
      { status: 500 }
    );
  }
}
