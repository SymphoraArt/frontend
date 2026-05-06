import { NextRequest, NextResponse } from "next/server";
import { generateImageWithPollinations } from "@/backend/services/pollinations-image-generation";

/**
 * Free image generation endpoint (dev/testing)
 * 
 * Uses Pollinations.ai (free, no API key needed)
 * No payment required, no database needed.
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

    console.log('🎨 Free generation request:', {
      prompt: prompt.substring(0, 80) + '...',
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
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}
