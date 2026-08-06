import { NextRequest, NextResponse, after } from "next/server";
import { generateImageWithPollinations } from "@/backend/services/pollinations-image-generation";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import { moderate, CLIENT_BLOCK_MESSAGE } from "@/lib/moderation";
import { recordModerationEvent } from "@/lib/moderation-enforcement";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import { recordGeneration, resolveRecordingUserId } from "@/lib/generation/record";
import { resolveModelByName } from "@/lib/generation/models";
import { stripWorkflowImages } from "@/lib/generation/workflow";
import { storeReferenceImages } from "@/lib/generation/reference-images";
import { readImageDimensions } from "@/backend/services/gemini-image-generation";

/**
 * Free image generation endpoint (dev/testing)
 *
 * Uses Pollinations.ai (free, no API key needed)
 * No payment required, no database needed.
 *
 * UNAUTHENTICATED — and therefore the easiest possible abuse vector: an
 * attacker needs no account at all. Today it is shielded only by the
 * private-beta proxy gate; the moment TEAM_ACCESS_CODE is unset at launch it
 * becomes a fully open image generator. So it gets the same moderation as the
 * paid path, plus a per-IP rate limit, and violations are attributed by hashed
 * IP since there is no session to key on.
 *
 * POST /api/generate-free
 * Body: { prompt, aspectRatio?, resolution?, workflow? }
 * Reference images are refused here — the free model is text-only.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }
    if (prompt.length > 4000) {
      return NextResponse.json({ error: "Prompt too long" }, { status: 400 });
    }

    // Reference images cannot work here and must not look as if they do.
    //
    // The free path is Pollinations, which is text-to-image only — there is no
    // image input to give them to. The editor was posting them anyway and this
    // route was reading nothing: a user attached fourteen references, watched a
    // generation succeed, and got a picture that had never seen one of them.
    // Say so instead.
    if (Array.isArray(body?.referenceImages) && body.referenceImages.some(Boolean)) {
      return NextResponse.json(
        { error: "Reference images need a paid generation — the free model is text-only." },
        { status: 422 },
      );
    }

    // No session here, so the limit is per IP.
    const limit = checkRequestRateLimit(rateLimitKey(request, "generate-free"), 10, 60_000);
    if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

    const verdict = await moderate({ prompt, surface: "generate-free", signal: request.signal });
    after(recordModerationEvent(verdict, { surface: "generate-free", request, prompt }));
    if (!verdict.allowed) {
      return NextResponse.json({ error: CLIENT_BLOCK_MESSAGE }, { status: 422 });
    }

    // Never log the prompt itself — this is shared log output, and a blocked
    // prompt is exactly the text we must not spray around in the clear.
    console.log('🎨 Free generation request:', {
      chars: prompt.length,
      aspectRatio: body.aspectRatio || '1:1',
      resolution: body.resolution || '2K',
    });

    // Generate image using Pollinations.ai (free)
    const result = await generateImageWithPollinations(
      prompt,
      body.aspectRatio || '1:1',
      body.resolution || '2K',
    );

    if (!result.success || !result.imageBuffers || result.imageBuffers.length === 0) {
      console.error('❌ Image generation failed:', result.error);
      return NextResponse.json(
        { error: result.error || 'Image generation failed' },
        { status: 500 }
      );
    }

    // Convert to base64 data URL (no blob storage needed)
    const base64 = result.imageBuffers[0].toString('base64');
    const imageUrl = `data:image/png;base64,${base64}`;

    console.log(`✅ Image generated successfully in ${result.generationTime}ms`);

    // Free does not mean unrecorded. The node editor generates through here,
    // so without this its graphs would be lost exactly like every generation
    // was before the recorder existed. Signed-out callers are not recorded —
    // there is nobody to show the row back to.
    {
      const supabase = getSupabaseServerClientSafe();
      const recUserId = await resolveRecordingUserId(supabase, request);
      if (supabase && recUserId) {
        const stripped = stripWorkflowImages(body?.workflow ?? {});
        const model = await resolveModelByName(supabase, "Flux (free)");
        const dims = readImageDimensions(result.imageBuffers[0]);
        after(
          recordGeneration(supabase, {
            userId: recUserId,
            promptId: null,
            finalPrompt: prompt,
            // Pollinations rewrites the prompt itself (`enhance=true`) and
            // never returns the result, so the best we can honestly record is
            // what we sent.
            effectivePrompt: prompt,
            variableValues: {},
            model,
            route: model.normal,
            boost: false,
            aspectRatio: body.aspectRatio || "1:1",
            resolution: body.resolution || "2K",
            // The service generates one and throws it away — the only seed in
            // the whole stack, and it never reaches us.
            seed: null,
            output: dims
              ? {
                  width: dims.width,
                  height: dims.height,
                  bytes: result.imageBuffers[0].length,
                  format: dims.format,
                }
              : null,
            generationMs: result.generationTime ?? null,
            workflow: stripped.workflow,
            workflowTexts: stripped.texts,
            references: await storeReferenceImages(stripped.images, recUserId),
          }),
        );
      }
    }

    return NextResponse.json({
      imageUrl,
      prompt,
      provider: "pollinations",
      model: "flux",
      generationTime: result.generationTime,
      free: true,
    });

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Generate free image error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
