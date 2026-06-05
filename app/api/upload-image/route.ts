import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Persists images to Vercel Blob and returns durable https URLs.
 *
 * Used when releasing a prompt: the verify renders are often returned
 * as base64 `data:` URLs (free tier) which must not be stored in the
 * DB directly. We upload each to Blob and hand back the public URL so
 * it can be saved as a showcase image. Inputs that are already https
 * URLs are passed through untouched.
 */

const MAX_IMAGES = 12;

function parseDataUrl(input: string): { buffer: Buffer; contentType: string } | null {
  // NOTE: do NOT run a `(.+)$` regex over the payload — base64 images are
  // multi-MB and the backtracking engine throws "Maximum call stack size
  // exceeded". Split on the first comma and only regex the short header.
  if (!input.startsWith("data:")) return null;
  const comma = input.indexOf(",");
  if (comma === -1) return null;
  const header = input.slice(5, comma); // strip leading "data:"
  if (!/;base64$/i.test(header)) return null;
  const contentType = header.slice(0, -";base64".length);
  if (!/^image\/[a-zA-Z0-9.+-]+$/.test(contentType)) return null;
  return {
    contentType,
    buffer: Buffer.from(input.slice(comma + 1), "base64"),
  };
}

function extFor(contentType: string): string {
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  return "png";
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { images?: unknown };
    const images = Array.isArray(body.images)
      ? body.images.filter((x): x is string => typeof x === "string")
      : [];

    if (images.length === 0) {
      return NextResponse.json({ error: "images is required" }, { status: 400 });
    }
    if (images.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `Too many images (max ${MAX_IMAGES}).` },
        { status: 400 }
      );
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    let put: typeof import("@vercel/blob").put | null = null;
    if (blobToken) {
      ({ put } = await import("@vercel/blob"));
    }

    const urls = await Promise.all(
      images.map(async (img) => {
        // Already a hosted URL — pass through.
        if (/^https?:\/\//.test(img)) return img;

        const parsed = parseDataUrl(img);
        // Unknown/blob: URLs can't be persisted server-side; drop them.
        if (!parsed) return null;

        // No blob token configured — fall back to storing the data URL
        // so the feature still works in local/dev environments.
        if (!put) return img;

        const filename = `showcase/${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}.${extFor(parsed.contentType)}`;
        const { url } = await put(filename, parsed.buffer, {
          access: "public",
          contentType: parsed.contentType,
          addRandomSuffix: false,
        });
        return url;
      })
    );

    return NextResponse.json({ urls: urls.filter((u): u is string => Boolean(u)) });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Upload failed";
    console.error("/api/upload-image POST failed:", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
