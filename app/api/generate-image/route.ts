import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type GenerateImageBody = {
  prompt: string;
  aspectRatio?: string;
  resolution?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateImageBody;

    if (!body.prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_GENAI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    let enhancedPrompt = body.prompt;
    if (body.aspectRatio) {
      enhancedPrompt += ` (aspect ratio: ${body.aspectRatio})`;
    }
    if (body.resolution) {
      enhancedPrompt += ` (resolution: ${body.resolution})`;
    }

    const response = await ai.models.generateContent({
      // model: "gemini-2.5-flash-image",
      model: "gemini-3-pro-image-preview",
      contents: enhancedPrompt,
    });

    let imageData: string | null = null;
    let mimeType: string = "image/png";

    if (
      response.candidates &&
      response.candidates[0] &&
      response.candidates[0].content &&
      response.candidates[0].content.parts
    ) {
      // @ts-ignore
      for (const part of response.candidates[0].content.parts) {
        // @ts-ignore
        if (part.inlineData) {
          // @ts-ignore
          imageData = part.inlineData.data;
          // @ts-ignore
          mimeType = part.inlineData.mimeType || "image/png";
          break;
        }
      }
    }

    if (!imageData) {
      return NextResponse.json(
        { error: "No image data found in response" },
        { status: 500 }
      );
    }

    const imageUrl = `data:${mimeType};base64,${imageData}`;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error("Generate image error:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: error.message },
      { status: 500 }
    );
  }
}
