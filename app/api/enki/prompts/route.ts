/**
 * POST /api/symphora/prompts – Save prompt (MySQL; Phase 2 will use MongoDB for scalability).
 * GET not used here; use /api/symphora/prompts/marketplace, /showroom, /my, or /[id].
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db-mysql";
import {
  buildEnkiPromptFromEditor,
  createEnkiPrompt,
  getEnkiPromptByCreatorAndTitle,
  updateEnkiPrompt,
} from "@/backend/storage-enki";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const creator = body.creator ?? body.userId ?? body.userKey;
    if (!creator || typeof creator !== "string") {
      return NextResponse.json(
        { error: "creator (wallet address) is required" },
        { status: 400 }
      );
    }
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }
    if (typeof body.content !== "string") {
      return NextResponse.json({ error: "content is required" }, { status: 400 });
    }

    const variables = Array.isArray(body.variables) ? body.variables : [];
    const uploadedPhotos = Array.isArray(body.uploadedPhotos)
      ? body.uploadedPhotos
      : [];

    const promptType =
      body.promptType === "showcase" ||
      body.promptType === "free-prompt" ||
      body.promptType === "paid-prompt"
        ? body.promptType
        : "paid-prompt";

    const titleTrimmed = (body.title as string).trim();
    const existing = await getEnkiPromptByCreatorAndTitle(creator, titleTrimmed);
    const promptId = body.promptId != null ? String(body.promptId).trim() : null;
    if (existing) {
      if (promptId && existing.id === promptId) {
        // Re-saving the same prompt: update it
        const data = buildEnkiPromptFromEditor({
          creator,
          title: titleTrimmed,
          content: body.content,
          category: body.category ?? "",
          promptType,
          price: typeof body.price === "number" ? body.price : 0,
          aspectRatio: body.aspectRatio ?? null,
          resolution: body.resolution ?? null,
          uploadedPhotos,
          variables,
          generatedImageUrl: body.generatedImageUrl ?? body.generatedImage ?? null,
          generatedImageUrls: Array.isArray(body.generatedImageUrls)
            ? body.generatedImageUrls.filter((img: unknown): img is string => typeof img === "string" && img.length > 0)
            : undefined,
          usePromptEnhancement: body.usePromptEnhancement !== false,
        });
        const updated = await updateEnkiPrompt(promptId, data);
        if (!updated) {
          return NextResponse.json(
            { error: "Failed to update prompt." },
            { status: 500 }
          );
        }
        return NextResponse.json({
          id: updated.id,
          title: updated.title,
          type: updated.type,
          message: "Prompt saved.",
        });
      }
      return NextResponse.json(
        { error: "A prompt with this title already exists. Please choose a different title." },
        { status: 409 }
      );
    }

    const data = buildEnkiPromptFromEditor({
      creator,
      title: titleTrimmed,
      content: body.content,
      category: body.category ?? "",
      promptType,
      price: typeof body.price === "number" ? body.price : 0,
      aspectRatio: body.aspectRatio ?? null,
      resolution: body.resolution ?? null,
      uploadedPhotos,
      variables,
      generatedImageUrl: body.generatedImageUrl ?? body.generatedImage ?? null,
      generatedImageUrls: Array.isArray(body.generatedImageUrls)
        ? body.generatedImageUrls.filter((img: unknown): img is string => typeof img === "string" && img.length > 0)
        : undefined,
      usePromptEnhancement: body.usePromptEnhancement !== false,
    });

    const prompt = await createEnkiPrompt(data);

    return NextResponse.json({
      id: prompt.id,
      title: prompt.title,
      type: prompt.type,
      message: "Prompt saved.",
    });
  } catch (e) {
    console.error("Symphora prompt create error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save prompt" },
      { status: 500 }
    );
  }
}
