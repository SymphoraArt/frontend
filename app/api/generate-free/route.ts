import { NextRequest, NextResponse, after } from "next/server";
import { generateImageWithPollinations } from "@/backend/services/pollinations-image-generation";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import { moderate, CLIENT_BLOCK_MESSAGE } from "@/lib/moderation";
import { recordModerationEvent } from "@/lib/moderation-enforcement";

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
 * Body: { prompt: string, aspectRatio?: string, resolution?: string }
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
