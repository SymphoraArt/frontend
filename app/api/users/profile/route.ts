/**
 * Own-profile editing (Kev's profile page).
 *
 *   POST multipart/form-data → { handle, bio, avatarUrl, coverUrl }
 *     fields: bio (string), handle (string, rename allowed, 409 if taken)
 *     files:  avatar, cover (png/jpeg/webp, client downscales before upload)
 *
 * Images land in the public Supabase Storage bucket "profiles" (created on
 * first use); URLs are stored on users.avatar_url / users.cover_image_url —
 * both columns verified live 2026-07-12.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { resolveSessionUserId } from "@/lib/session-user";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import { normalizeHandle, usableHandle } from "@/lib/handle-rules";

export const runtime = "nodejs";

const BUCKET = "profiles";
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_BIO_LEN = 280;
const IMAGE_EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

type Supabase = ReturnType<typeof getSupabaseServerClient>;

async function ensureBucket(supabase: Supabase) {
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error && !/exist/i.test(error.message)) throw new Error("Storage unavailable");
}

async function uploadImage(supabase: Supabase, userId: string, kind: "avatar" | "cover", file: File) {
  const ext = IMAGE_EXT[file.type];
  if (!ext) throw new Error("Use a PNG, JPG or WebP image");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Image is too big (max 8 MB)");
  const path = `${userId}/${kind}-${Date.now()}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(BUCKET).upload(path, buf, {
    contentType: file.type,
    upsert: true,
  });
  if (error) throw new Error("Upload failed, please try again");
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function POST(req: NextRequest) {
  const limit = checkRequestRateLimit(rateLimitKey(req, "profile:update"), 10, 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const supabase = getSupabaseServerClient();
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const updates: Record<string, string | null> = {};

  const bio = form.get("bio");
  if (typeof bio === "string") {
    const trimmed = bio.trim().slice(0, MAX_BIO_LEN);
    updates.bio = trimmed || null; // empty → fall back to the default line client-side
  }

  const rawHandle = form.get("handle");
  if (typeof rawHandle === "string" && rawHandle.trim()) {
    const handle = normalizeHandle(rawHandle);
    if (!usableHandle(handle)) {
      return NextResponse.json({ error: "3–20 characters: letters, numbers or _" }, { status: 400 });
    }
    updates.handle = handle;
  }

  const avatar = form.get("avatar");
  const cover = form.get("cover");
  try {
    if (avatar instanceof File || cover instanceof File) await ensureBucket(supabase);
    if (avatar instanceof File) updates.avatar_url = await uploadImage(supabase, userId, "avatar", avatar);
    if (cover instanceof File) updates.cover_image_url = await uploadImage(supabase, userId, "cover", cover);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 400 });
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to save" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select("handle, bio, avatar_url, cover_image_url")
    .maybeSingle();
  if (error) {
    const dup = error.code === "23505";
    return NextResponse.json(
      { error: dup ? "That name is already taken" : "Could not save" },
      { status: dup ? 409 : 500 }
    );
  }
  if (!data) return NextResponse.json({ error: "No user for session" }, { status: 404 });

  return NextResponse.json({
    handle: data.handle ?? null,
    bio: data.bio ?? null,
    avatarUrl: data.avatar_url ?? null,
    coverUrl: data.cover_image_url ?? null,
  });
}
