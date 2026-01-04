import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";
import { GoogleGenAI } from "@google/genai";

type GenerateImageBody = {
  prompt: string;
  aspectRatio?: string;
  resolution?: string;
};

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chain = (searchParams.get('chain') || 'base-sepolia') as ChainKey;
  const paymentHeader = request.headers.get('X-Payment');
  const body = (await request.json()) as GenerateImageBody;

  // Validate prompt
  if (!body.prompt) {
    return NextResponse.json(
      { error: "prompt is required" },
      { status: 400 }
    );
  }

  // Determine price based on resolution
  const prices: Record<string, string> = {
    '1K': '$0.05',
    '2K': '$0.10',
    '4K': '$0.25',
  };
  const price = prices[body.resolution || '2K'] || '$0.10';

  try {
    // Process payment first
    const paymentResult = await paymentEngine.settle({
      resourceUrl: '/api/generate-image',
      method: 'POST',
      paymentHeader: paymentHeader || undefined,
      chainKey: chain,
      price,
      description: `Generate ${body.resolution || '2K'} image`,
      payToAddress: process.env.SERVER_WALLET_ADDRESS!,
      category: 'image-generation',
    });

    // If payment not successful, return payment response
    if (!paymentResult.success) {
      return NextResponse.json(
        paymentResult.body || { error: 'Payment required' },
        { status: paymentResult.status, headers: paymentResult.headers }
      );
    }

    // Payment successful - proceed with image generation
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

    // Enhance prompt with aspect ratio and resolution if provided
    let enhancedPrompt = body.prompt;
    if (body.aspectRatio) {
      enhancedPrompt += ` (aspect ratio: ${body.aspectRatio})`;
    }
    if (body.resolution) {
      enhancedPrompt += ` (resolution: ${body.resolution})`;
    }

    // Generate image using Gemini
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

    // Return image with payment metadata and headers
    return NextResponse.json(
      { 
        imageUrl,
        metadata: paymentResult.metadata 
      },
      { 
        status: 200, 
        headers: paymentResult.headers 
      }
    );
  } catch (error: any) {
    console.error("Generate image error:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: error.message },
      { status: 500 }
    );
  }
}
