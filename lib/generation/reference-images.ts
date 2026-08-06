import { createHash } from "crypto";

/**
 * Put reference images somewhere durable, once.
 *
 * They live in the browser as data URLs and have never been stored: the editor
 * held them in localStorage/IndexedDB, the paid route could not even accept
 * them, and nothing recorded which image produced which picture. So a
 * generation could not be explained afterwards, let alone re-run.
 *
 * Uploading them here rather than inlining them into the workflow blob is the
 * whole point: the same reference used across twenty generations is one object
 * and twenty rows pointing at it, not twenty copies of the same base64.
 */

export interface StoredReference {
  url: string;
  mimeType: string;
  bytes: number;
  /** sha256 of the decoded bytes — how we recognise the same image again. */
  contentHash: string;
}

/** data URL or bare base64 → bytes + mime type. */
function decode(input: string): { buffer: Buffer; mimeType: string } | null {
  if (!input || typeof input !== "string") return null;
  // [\s\S] rather than the `s` flag — the build target rejects es2018 regex
  // flags, which broke a Vercel build once already.
  const match = input.match(/^data:([\s\S]+?);base64,([\s\S]*)$/);
  const b64 = match ? match[2] : input.trim();
  if (!b64) return null;
  try {
    const buffer = Buffer.from(b64, "base64");
    return buffer.length ? { buffer, mimeType: match?.[1] ?? "image/png" } : null;
  } catch {
    return null;
  }
}

/**
 * Best-effort: a reference we cannot store must cost us the record of that one
 * image, never the generation the user already paid for. Entries that fail
 * come back as null so the caller keeps the positions — "@Image 2" has to keep
 * meaning the second one.
 */
export async function storeReferenceImages(
  inputs: string[],
  userId: string,
): Promise<(StoredReference | null)[]> {
  if (!inputs.length || !process.env.BLOB_READ_WRITE_TOKEN) {
    return inputs.map(() => null);
  }

  const { put } = await import("@vercel/blob");

  return Promise.all(
    inputs.map(async (input) => {
      const decoded = decode(input);
      if (!decoded) return null;
      try {
        const contentHash = createHash("sha256").update(decoded.buffer).digest("hex");
        const ext = decoded.mimeType.split("/")[1]?.replace(/[^a-z0-9]/gi, "") || "png";
        // Keyed by content hash, so re-uploading the same reference overwrites
        // itself instead of accumulating copies.
        const { url } = await put(`references/${userId}/${contentHash}.${ext}`, decoded.buffer, {
          access: "public",
          contentType: decoded.mimeType,
          addRandomSuffix: false,
        });
        return { url, mimeType: decoded.mimeType, bytes: decoded.buffer.length, contentHash };
      } catch (error) {
        console.warn(
          "[references] could not store one:",
          error instanceof Error ? error.message : error,
        );
        return null;
      }
    }),
  );
}
