import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";

type GenerateImageBody = {
  prompt?: string;
  aspectRatio?: string;
  resolution?: string;
  useUptoPayment?: boolean; // Enable upto payment scheme for dynamic pricing
};

/**
 * Enhance prompt using Gemini API and track token usage
 * Returns enhanced prompt and token usage for pricing
 */
async function enhancePromptWithGemini(prompt: string): Promise<{
  enhancedPrompt: string;
  tokensUsed: number;
  inputTokens: number;
  outputTokens: number;
}> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return {
      enhancedPrompt: prompt,
      tokensUsed: 0,
      inputTokens: 0,
      outputTokens: 0,
    };
  }

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
    usageMetadata?: {
      promptTokenCount?: number;
      candidatesTokenCount?: number;
      totalTokenCount?: number;
    };
  };
  
  const data = (await res.json()) as GeminiResponse;
  const text: unknown = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const enhancedPrompt = typeof text === "string" && text.trim() ? text.trim() : prompt;
  
  // Extract token usage
  const usage = data.usageMetadata || {};
  const inputTokens = usage.promptTokenCount || 0;
  const outputTokens = usage.candidatesTokenCount || 0;
  const tokensUsed = usage.totalTokenCount || (inputTokens + outputTokens);

  return {
    enhancedPrompt,
    tokensUsed,
    inputTokens,
    outputTokens,
  };
}

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const chain = (searchParams.get('chain') || 'base-sepolia') as ChainKey;
  const paymentHeader = request.headers.get('X-Payment');

  try {
    const body = (await request.json()) as GenerateImageBody;
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
    if (!serverWalletAddress) {
      return NextResponse.json(
        { error: 'SERVER_WALLET_ADDRESS is not configured' },
        { status: 500 }
      );
    }

    // Construct full URL for X402 payment (requires absolute URL)
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    
    if (!baseUrl) {
      const protocol = requestUrl.protocol || 'http:';
      const host = requestUrl.host || requestUrl.hostname || 'localhost:3000';
      baseUrl = `${protocol}//${host}`;
    }
    
    baseUrl = baseUrl.replace(/\/$/, '');
    const resourceUrl = `${baseUrl}${requestUrl.pathname}${requestUrl.search}`;
    
    // Validate URL format
    try {
      const testUrl = new URL(resourceUrl);
      if (!testUrl.protocol || !testUrl.host) {
        throw new Error('Invalid URL: missing protocol or host');
      }
    } catch (urlError) {
      console.error('❌ Invalid resourceUrl constructed:', resourceUrl);
      return NextResponse.json(
        { error: 'Failed to construct payment URL', details: urlError instanceof Error ? urlError.message : String(urlError) },
        { status: 500 }
      );
    }

    // Determine if we should use upto payment scheme
    // Use upto if: Gemini is enabled AND user requested it OR it's the default
    const useUpto = body.useUptoPayment !== false && Boolean(process.env.GEMINI_API_KEY);
    
    // Pricing configuration
    const prices: Record<string, string> = {
      '1K': '$0.05',
      '2K': '$0.10',
      '4K': '$0.25',
    };
    const basePrice = prices[body.resolution || '2K'] || '$0.10';

    // For upto scheme: max price is base price + 50% buffer for Gemini tokens
    // Min price is base price (for Pollinations image generation)
    const maxPrice = useUpto 
      ? `$${(parseFloat(basePrice.replace('$', '')) * 1.5).toFixed(2)}`
      : basePrice;
    const minPrice = basePrice;

    // Gemini pricing: $0.00001 per token (very affordable)
    const GEMINI_PRICE_PER_TOKEN = 0.00001;

    console.log('💳 X402 Payment Request:', {
      resourceUrl,
      method: 'POST',
      chain,
      scheme: useUpto ? 'upto' : 'exact',
      price: useUpto ? `${minPrice} - ${maxPrice}` : basePrice,
      hasPaymentHeader: !!paymentHeader,
      serverWallet: serverWalletAddress?.slice(0, 10) + '...',
    });

    let paymentResult;
    let enhancedPrompt = prompt;
    let usedGemini = false;
    let geminiTokens = 0;

    if (useUpto) {
      // Use upto payment scheme: verify first, do work, then settle with actual price
      paymentResult = await paymentEngine.settleWithUpto(
        {
          resourceUrl: resourceUrl,
          method: 'POST',
          paymentHeader: paymentHeader || undefined,
          chainKey: chain,
          scheme: 'upto',
          maxPrice: maxPrice,
          minPrice: minPrice,
          description: `Generate ${body.resolution || '2K'} image with AI enhancement`,
          payToAddress: serverWalletAddress,
          category: 'image-generation',
        },
        async () => {
          // This callback does the expensive work and returns actual price
          try {
            // Enhance prompt with Gemini
            const geminiResult = await enhancePromptWithGemini(prompt);
            enhancedPrompt = geminiResult.enhancedPrompt;
            geminiTokens = geminiResult.tokensUsed;
            usedGemini = geminiTokens > 0;

            // Calculate actual price: base price + Gemini token cost
            const geminiCost = geminiTokens * GEMINI_PRICE_PER_TOKEN;
            const basePriceUsd = parseFloat(basePrice.replace('$', ''));
            const actualPriceUsd = basePriceUsd + geminiCost;
            const actualPrice = `$${actualPriceUsd.toFixed(4)}`;

            console.log('💰 Gemini token usage:', {
              tokens: geminiTokens,
              inputTokens: geminiResult.inputTokens,
              outputTokens: geminiResult.outputTokens,
              geminiCost: `$${geminiCost.toFixed(4)}`,
              basePrice,
              actualPrice,
            });

            return {
              actualPrice,
              metadata: {
                geminiTokens,
                geminiInputTokens: geminiResult.inputTokens,
                geminiOutputTokens: geminiResult.outputTokens,
                geminiCost: `$${geminiCost.toFixed(4)}`,
                basePrice,
              },
            };
          } catch (error) {
            // If Gemini fails, fall back to base price
            console.error('⚠️ Gemini enhancement failed, using base price:', error);
            enhancedPrompt = prompt;
            usedGemini = false;
            return {
              actualPrice: basePrice,
              metadata: {
                geminiError: error instanceof Error ? error.message : String(error),
              },
            };
          }
        }
      );
    } else {
      // Use exact payment scheme (original behavior)
      paymentResult = await paymentEngine.settle({
        resourceUrl: resourceUrl,
        method: 'POST',
        paymentHeader: paymentHeader || undefined,
        chainKey: chain,
        price: basePrice,
        description: `Generate ${body.resolution || '2K'} image`,
        payToAddress: serverWalletAddress,
        category: 'image-generation',
      });

      // If payment successful, enhance prompt (but don't track tokens for pricing)
      if (paymentResult.success) {
        try {
          const geminiResult = await enhancePromptWithGemini(prompt);
          if (geminiResult.enhancedPrompt !== prompt) {
            enhancedPrompt = geminiResult.enhancedPrompt;
            usedGemini = true;
            geminiTokens = geminiResult.tokensUsed;
          }
        } catch {
          // Gemini enhancement failed, use original prompt
          enhancedPrompt = prompt;
          usedGemini = false;
        }
      }
    }

    console.log('💳 X402 Payment Result:', {
      success: paymentResult.success,
      status: paymentResult.status,
      scheme: useUpto ? 'upto' : 'exact',
      hasMetadata: !!paymentResult.metadata,
      txHash: paymentResult.metadata?.txHash,
      actualPrice: paymentResult.metadata?.actualPrice,
    });

    // If payment not successful, return payment response
    if (!paymentResult.success) {
      return NextResponse.json(
        paymentResult.body || { error: 'Payment required' },
        { status: paymentResult.status, headers: paymentResult.headers }
      );
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
        geminiTokens: usedGemini ? geminiTokens : undefined,
        paymentScheme: useUpto ? 'upto' : 'exact',
        metadata: {
          ...paymentResult.metadata,
          ...(useUpto && {
            maxPrice,
            minPrice,
            actualPrice: paymentResult.metadata?.actualPrice,
          }),
        },
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
