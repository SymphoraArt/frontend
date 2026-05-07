import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";
import { isSolanaChain } from "@/shared/payment-config";
import {
  buildSolana402Response,
  checkAndRecordSolanaSignature,
  parseSolanaPaymentHeader,
  verifySolanaUsdcTransfer,
} from "@/backend/solana-x402-verifier";
import { generateImagesWithGemini } from "@/backend/services/gemini-image-generation";
import type { ImageGenerationRequest } from "@/backend/services/types";

const SOLANA_GENERATION_TIMEOUT_MS = 90_000;

type GenerateImageBody = {
  prompt?: string;
  aspectRatio?: string;
  resolution?: string;
  useUptoPayment?: boolean; // Enable upto payment scheme for dynamic pricing
  modelIds?: string[];
  ratio?: string;
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

function redactIdentifier(value?: string | null, prefix = 8, suffix = 6): string | undefined {
  if (!value) return undefined;
  if (value.length <= prefix + suffix) return "[redacted]";
  return `${value.slice(0, prefix)}...${value.slice(-suffix)}`;
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeout);
        reject(error);
      }
    );
  });
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

    // --- SECURITY GUARDS ---
    // 1. Prompt length cap
    if (prompt.length > 4000) {
      return NextResponse.json({ error: "Prompt too long" }, { status: 400 });
    }

    // 2. Variable injection guard
    const bracketCount = (prompt.match(/\[/g) || []).length;
    if (bracketCount > 20) {
      return NextResponse.json({ error: "Too many variables" }, { status: 400 });
    }

    // 3. Ratio validation
    // Mock DB for now
    const mockModels: Record<string, string[]> = {
      "nano-banana-pro": ["1:1", "4:5", "3:2", "16:9", "9:16", "21:9"],
      "gpt-image-2": ["1:1", "16:9", "9:16"],
      "midjourney-v7": ["1:1", "4:5", "3:2", "16:9", "9:16"],
    };
    if (body.modelIds && body.modelIds.length > 0 && body.ratio && body.ratio !== "Any ratio") {
      const allowed = body.modelIds.some(id => mockModels[id]?.includes(body.ratio as string));
      if (!allowed) {
        return NextResponse.json({ error: "Ratio not allowed for selected model(s)" }, { status: 400 });
      }
    }

    // 4. Rate limiting (Placeholder)
    // TODO: Implement rate limiting (e.g., using @upstash/ratelimit or express-rate-limit)
    // max 10 generations per user per minute
    // --- END SECURITY GUARDS ---

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
    // Check for both GEMINI_API_KEY and GOOGLE_GEMINI_API_KEY for compatibility
    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY);
    const useUpto = body.useUptoPayment !== false && hasGeminiKey;
    
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

    const isSolanaPayment = isSolanaChain(chain);

    console.log('💳 X402 Payment Request:', {
      resourceUrl,
      method: 'POST',
      chain,
      scheme: isSolanaPayment ? 'solana-exact' : useUpto ? 'upto' : 'exact',
      price: useUpto ? `${minPrice} - ${maxPrice}` : basePrice,
      hasPaymentHeader: !!paymentHeader || !!request.headers.get("X-PAYMENT"),
      serverWallet: serverWalletAddress?.slice(0, 10) + '...',
    });

    let paymentResult;
    let enhancedPrompt = prompt;
    let usedGemini = false;
    let geminiTokens = 0;

    if (isSolanaPayment) {
      const solanaChain = chain as "solana" | "solana-devnet";
      const solanaPlatformWallet = process.env.SOLANA_PLATFORM_WALLET;
      if (!solanaPlatformWallet) {
        return NextResponse.json(
          { error: 'SOLANA_PLATFORM_WALLET is not configured' },
          { status: 500 }
        );
      }

      const solanaPaymentHeader = request.headers.get("X-PAYMENT");
      if (!solanaPaymentHeader) {
        const solana402 = buildSolana402Response({
          chainKey: solanaChain,
          resource: resourceUrl,
          description: `Generate ${body.resolution || "2K"} image`,
          priceUsdc: basePrice,
          payTo: solanaPlatformWallet,
          mimeType: "application/json",
        });
        return NextResponse.json(solana402.body, { status: 402, headers: solana402.headers });
      }

      const payload = parseSolanaPaymentHeader(solanaPaymentHeader);
      if (!payload) {
        return NextResponse.json({ error: "Invalid Solana payment header" }, { status: 402 });
      }

      const minAmountMicro = Math.round(parseFloat(basePrice.replace("$", "")) * 1_000_000);
      const verification = await verifySolanaUsdcTransfer({
        signature: payload.signature,
        chainKey: solanaChain,
        recipientAddress: solanaPlatformWallet,
        minAmountMicro,
      });

      if (!verification.verified) {
        return NextResponse.json(
          { error: `Solana payment verification failed: ${verification.error}` },
          { status: 402 }
        );
      }

      const replayCheck = await checkAndRecordSolanaSignature(
        payload.signature,
        solanaChain,
        "image-generation"
      );
      if (!replayCheck.isNew) {
        return NextResponse.json(
          { error: replayCheck.error || "Transaction signature has already been used" },
          { status: 402 }
        );
      }

      console.log("✅ Solana payment verified:", {
        signature: redactIdentifier(payload.signature),
        buyer: redactIdentifier(verification.buyerAddress, 6, 4),
        amountPaid: verification.amountPaid,
      });

      paymentResult = {
        success: true,
        status: 200,
        headers: {},
        metadata: {
          solanaTxSignature: redactIdentifier(payload.signature),
          chainKey: solanaChain,
          chainName: "Solana",
        },
      };

      try {
        const geminiResult = await enhancePromptWithGemini(prompt);
        if (geminiResult.enhancedPrompt !== prompt) {
          enhancedPrompt = geminiResult.enhancedPrompt;
          usedGemini = true;
          geminiTokens = geminiResult.tokensUsed;
        }
      } catch {
        enhancedPrompt = prompt;
        usedGemini = false;
      }
    } else if (useUpto) {
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

    // Generate image using Grok testing only
    console.log('🎨 Generating image with Grok...');

    const xaiKey = process.env.XAI_API_KEY;
    if (!xaiKey) throw new Error("XAI_API_KEY not set");

    const xaiRequest = fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xaiKey}`,
      },
      body: JSON.stringify({
        model: "grok-imagine-image",
        prompt: enhancedPrompt,
        n: 1,
      }),
    });
    const xaiResponse = isSolanaPayment
      ? await withTimeout(
          xaiRequest,
          SOLANA_GENERATION_TIMEOUT_MS,
          "Image generation timed out after payment. Please try again with a shorter prompt or lower resolution."
        )
      : await xaiRequest;

    if (!xaiResponse.ok) {
      const errTxt = await xaiResponse.text();
      console.error('❌ Grok image generation failed:', errTxt);
      return NextResponse.json({ error: 'Grok Image generation failed', retryable: true }, { status: 500 });
    }

    const xaiData = await xaiResponse.json();
    const grokUrl = xaiData.data?.[0]?.url;

    if (!grokUrl) {
      return NextResponse.json({ error: 'No image URL returned from Grok', retryable: true }, { status: 500 });
    }

    // Fetch the image to get a buffer
    const imgRes = await fetch(grokUrl);
    if (!imgRes.ok) throw new Error("Failed to download image from Grok");
    const arrayBuffer = await imgRes.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const geminiResult = {
      success: true,
      imageBuffers: [imageBuffer],
      metadata: { model: 'grok-imagine-image' },
      generationTime: 0
    };

    // Upload image buffer to Vercel Blob storage
    let imageUrl: string;
    try {
      const { put } = await import('@vercel/blob');
      const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
      
      if (!blobToken) {
        console.warn('⚠️ BLOB_READ_WRITE_TOKEN not set, using data URL fallback');
        // Fallback to data URL if blob storage not configured
        const base64 = geminiResult.imageBuffers[0].toString('base64');
        imageUrl = `data:image/png;base64,${base64}`;
      } else {
        // Create unique filename
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 9);
        const filename = `generations/${timestamp}_${randomSuffix}.png`;

        // Upload to Vercel Blob
        const { url } = await put(filename, geminiResult.imageBuffers[0], {
          access: 'public',
          contentType: 'image/png',
          addRandomSuffix: false,
        });

        imageUrl = url;
        console.log(`✅ Image uploaded to blob storage: ${url}`);
      }
    } catch (uploadError: any) {
      console.error('❌ Failed to upload image to blob storage:', uploadError);
      // Fallback to data URL if upload fails
      const base64 = geminiResult.imageBuffers[0].toString('base64');
      imageUrl = `data:image/png;base64,${base64}`;
      console.warn('⚠️ Using data URL fallback due to upload error');
    }

    // Return image with payment metadata and headers
    return NextResponse.json(
      {
        imageUrl,
        prompt: enhancedPrompt,
        provider: "gemini",
        model: geminiResult.metadata?.model || 'gemini-3-pro-image-preview',
        usedGemini,
        geminiTokens: usedGemini ? geminiTokens : undefined,
        generationTime: geminiResult.generationTime,
        paymentScheme: isSolanaPayment ? 'solana-exact' : useUpto ? 'upto' : 'exact',
        metadata: {
          ...paymentResult.metadata,
          ...(useUpto && {
            maxPrice,
            minPrice,
            actualPrice: paymentResult.metadata?.actualPrice,
          }),
          geminiMetadata: geminiResult.metadata,
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
