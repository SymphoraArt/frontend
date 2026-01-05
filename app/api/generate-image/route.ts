import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";

type GenerateImageBody = {
  prompt?: string;
  aspectRatio?: string;
  resolution?: string;
};

async function maybeEnhancePrompt(prompt: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return prompt;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(
    key
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Rewrite the following text-to-image prompt to be more vivid and detailed while preserving intent. Return ONLY the rewritten prompt text, no quotes, no markdown.\n\nPROMPT:\n${prompt}`,
            },
          ],
        },
      ],
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Gemini error: ${res.status} ${t}`);
  }

  type GeminiResponse = {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: unknown }> };
    }>;
  };
  const data = (await res.json()) as GeminiResponse;
  const text: unknown = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string" || !text.trim()) return prompt;
  return text.trim();
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chain = (searchParams.get('chain') || 'base-sepolia') as ChainKey;
  const paymentHeader = request.headers.get('X-Payment');

  try {
    const body = (await request.json()) as GenerateImageBody;
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    
    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    // Determine price based on resolution
    const prices: Record<string, string> = {
      '1K': '$0.05',
      '2K': '$0.10',
      '4K': '$0.25',
    };
    const price = prices[body.resolution || '2K'] || '$0.10';

    const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
    if (!serverWalletAddress) {
      return NextResponse.json(
        { error: 'SERVER_WALLET_ADDRESS is not configured' },
        { status: 500 }
      );
    }

    // Process payment first (X402)
    const paymentResult = await paymentEngine.settle({
      resourceUrl: '/api/generate-image',
      method: 'POST',
      paymentHeader: paymentHeader || undefined,
      chainKey: chain,
      price,
      description: `Generate ${body.resolution || '2K'} image`,
      payToAddress: serverWalletAddress,
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
    // (optional) enhance prompt via text Gemini key, then use Pollinations
    let enhancedPrompt = prompt;
    let usedGemini = false;
    try {
      const maybe = await maybeEnhancePrompt(prompt);
      if (maybe && maybe !== prompt) {
        enhancedPrompt = maybe;
        usedGemini = Boolean(process.env.GEMINI_API_KEY);
      }
    } catch {
      enhancedPrompt = prompt;
      usedGemini = false;
    }

    // Add aspect ratio and resolution to prompt if provided
    if (body.aspectRatio) {
      enhancedPrompt += ` (aspect ratio: ${body.aspectRatio})`;
    }
    if (body.resolution) {
      enhancedPrompt += ` (resolution: ${body.resolution})`;
    }

    // Generate image using Pollinations API
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      enhancedPrompt
    )}?width=1024&height=1024&nologo=true`;

    // Return image with payment metadata and headers
    return NextResponse.json(
      {
        imageUrl,
        prompt: enhancedPrompt,
        provider: "pollinations",
        usedGemini,
        metadata: paymentResult.metadata,
      },
      {
        status: 200,
        headers: paymentResult.headers,
      }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Generate image error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
