/**
 * POST /api/profile/upload – Upload avatar or banner image; returns { url }. Body: FormData with file + userKey + type (avatar|banner).
 */

import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: "Invalid file type. Use PNG, JPEG, or WebP." };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large (max 5MB). Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }
  return { valid: true };
}

async function uploadToBlob(file: File, userId: string, type: string): Promise<string> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!blobToken) {
    const base64 = buffer.toString("base64");
    return `data:${file.type};base64,${base64}`;
  }

  const { put } = await import("@vercel/blob");
  const timestamp = Date.now();
  const ext = file.name.split(".").pop() || "png";
  const filename = `profile/${userId}/${type}_${timestamp}.${ext}`;

  const { url } = await put(filename, buffer, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });
  return url;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const userKey = (formData.get("userKey") ?? formData.get("userId"))?.toString?.()?.trim();
    const type = (formData.get("type") ?? "avatar").toString() as string;

    if (!file || !userKey) {
      return NextResponse.json(
        { error: "file and userKey (or userId) are required" },
        { status: 400 }
      );
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const kind = type === "banner" ? "banner" : "avatar";
    const url = await uploadToBlob(file, userKey, kind);

    return NextResponse.json({ url });
  } catch (e) {
    console.error("Profile upload error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 500 }
    );
  }
}
