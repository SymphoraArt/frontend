import { generateImagesWithGemini } from "@/backend/services/gemini-image-generation";
import type { ImageGenerationRequest } from "@/backend/services/types";

/**
 * Platform-paid image generation core.
 *
 * This is the same image pipeline the x402 route uses (Grok if XAI_API_KEY is
 * set, otherwise Gemini, then upload to Vercel Blob) WITHOUT any payment /
 * on-chain logic. The platform's own API keys pay for the generation; callers
 * are responsible for charging the user's balance separately.
 */

/**
 * Nano Banana Pro — Gemini 3 Pro Image. This is the model the platform offers
 * (the DB "Nano Banana Pro" model maps here). The cheaper `gemini-2.5-flash-image`
 * is plain "Nano Banana" and is NOT used for paid renders.
 */
export const NANO_BANANA_PRO_MODEL = "gemini-3-pro-image-preview";

export interface GenerateCoreParams {
  prompt: string;
  aspectRatio?: string;
  resolution?: string;
  /** Data URLs / base64 reference images for image-guided generation (Gemini). */
  referenceImages?: string[];
}

export interface GenerateCoreResult {
  imageUrl: string;
  model: string;
}

async function uploadImage(buffer: Buffer): Promise<string> {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      return `data:image/png;base64,${buffer.toString("base64")}`;
    }
    const { put } = await import("@vercel/blob");
    const filename = `generations/${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}.png`;
    const { url } = await put(filename, buffer, {
      access: "public",
      contentType: "image/png",
      addRandomSuffix: false,
    });
    return url;
  } catch (err) {
    console.error("[generate-core] blob upload failed, using data URL:", err);
    return `data:image/png;base64,${buffer.toString("base64")}`;
  }
}

export async function generateAndUploadImage(
  params: GenerateCoreParams
): Promise<GenerateCoreResult> {
  const prompt = params.prompt.trim();
  if (!prompt) throw new Error("prompt is required");

  const aspectRatio = params.aspectRatio || "1:1";
  const resolution = params.resolution || "2K";
  const referenceImages = (params.referenceImages || []).filter(Boolean);

  // Grok (xAI) when configured, otherwise Gemini. Grok's images endpoint is
  // text-only, so when the user supplies reference images we route to Gemini
  // (Nano Banana) which supports image-guided generation.
  const xaiKey = process.env.XAI_API_KEY;
  if (xaiKey && referenceImages.length === 0) {
    const res = await fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xaiKey}`,
      },
      body: JSON.stringify({ model: "grok-imagine-image", prompt, n: 1 }),
    });
    if (!res.ok) {
      const errTxt = await res.text().catch(() => "");
      throw new Error(`Grok image generation failed: ${errTxt}`);
    }
    const data = await res.json();
    const grokUrl = data.data?.[0]?.url;
    if (!grokUrl) throw new Error("No image URL returned from Grok");
    const imgRes = await fetch(grokUrl);
    if (!imgRes.ok) throw new Error("Failed to download image from Grok");
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    return { imageUrl: await uploadImage(buffer), model: "grok-imagine-image" };
  }

  // Gemini occasionally returns a candidate with no image part (an empty /
  // soft-refusal response), especially with reference images. That's transient,
  // so we retry once before giving up — otherwise a perfectly good prompt fails
  // and the caller has to refund + manually retry.
  let result = await generateImagesWithGemini({
    prompt,
    aspectRatio: aspectRatio as ImageGenerationRequest["aspectRatio"],
    imageSize: resolution as ImageGenerationRequest["imageSize"],
    numImages: 1,
    referenceImages,
    modelVersion: NANO_BANANA_PRO_MODEL,
  });
  // Only retry transient/empty failures — never a hard refusal (SAFETY) or a
  // non-retryable validation error.
  if ((!result.success || !result.imageBuffers?.length) && result.retryable !== false) {
    console.warn(
      `[generate-core] empty/failed Gemini response (\"${result.error}\") — retrying once`
    );
    result = await generateImagesWithGemini({
      prompt,
      aspectRatio: aspectRatio as ImageGenerationRequest["aspectRatio"],
      imageSize: resolution as ImageGenerationRequest["imageSize"],
      numImages: 1,
      referenceImages,
      modelVersion: NANO_BANANA_PRO_MODEL,
    });
  }
  if (!result.success || !result.imageBuffers?.length) {
    throw new Error(result.error || "Image generation failed");
  }
  return {
    imageUrl: await uploadImage(result.imageBuffers[0]),
    model: result.metadata?.model || NANO_BANANA_PRO_MODEL,
  };
}

/** Per-resolution price in whole USD (mirrors the x402 route's pricing). */
export function priceForResolution(resolution?: string): number {
  const prices: Record<string, number> = { "1K": 0.05, "2K": 0.1, "4K": 0.25 };
  return prices[resolution || "2K"] ?? 0.1;
}
