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
import { getSupabaseServerClient, getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAuth, checkRateLimit } from "@/lib/auth";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import {
  fulfillGenerationIntent,
  redeemGenerationIntent,
  releaseGenerationIntent,
} from "@/lib/payments/generation-redemption";

// Above the 90s provider timeout: the in-process timeout (and the intent
// release it triggers) must fire BEFORE the platform kills the function,
// otherwise a paid, consumed intent is stranded with no release.
export const maxDuration = 120;

const SOLANA_GENERATION_TIMEOUT_MS = 90_000;

type GenerateImageBody = {
  prompt?: string;
  aspectRatio?: string;
  resolution?: string;
  useUptoPayment?: boolean; // Enable upto payment scheme for dynamic pricing
  modelIds?: string[];
  ratio?: string;
  // Server-built payments: id of a confirmed generation_payment_intents row.
  // When present, the x402 header flow is skipped entirely.
  intentId?: string;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

  // Set after a successful intent redemption (client captured then, so this
  // helper can never throw); every generation-failure path — including the
  // catch-all below — must release it so the buyer retries without paying
  // again.
  let consumedIntent: { supabase: SupabaseClient; id: string } | null = null;
  const releaseIfConsumed = async () => {
    if (consumedIntent) {
      await releaseGenerationIntent(consumedIntent.supabase, consumedIntent.id);
      consumedIntent = null;
    }
  };

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

    // 3. Ratio validation (fetched from DB)
    if (body.modelIds && body.modelIds.length > 0 && body.ratio && body.ratio !== "Any ratio") {
      try {
        const supabase = getSupabaseServerClientSafe();
        if (supabase) {
          const { data: models } = await supabase
            .from("models")
            .select("id, allowed_ratios")
            .in("id", body.modelIds);
          const allowed = (models || []).some((m: any) =>
            m.allowed_ratios?.includes(body.ratio as string)
          );
          if (!allowed) {
            return NextResponse.json({ error: "Ratio not allowed for selected model(s)" }, { status: 400 });
          }
        }
      } catch {
        /* skip validation if DB unavailable */
      }
    }

    // 4. Rate limiting (Placeholder)
    // TODO: Implement rate limiting (e.g., using @upstash/ratelimit or express-rate-limit)
    // max 10 generations per user per minute
    // --- END SECURITY GUARDS ---

    // Server-built payments (backlog #2, step 4): a confirmed intent replaces
    // the whole x402 header flow, so the x402 env/URL plumbing below is only
    // required on the legacy paths.
    const intentId = typeof body.intentId === "string" ? body.intentId.trim() : "";
    if (intentId && !UUID_RE.test(intentId)) {
      return NextResponse.json({ error: "intentId must be a UUID" }, { status: 400 });
    }
    // The paid resolution from the intent row overrides the request body.
    let paidResolution: string | null = null;

    let serverWalletAddress = "";
    let resourceUrl = "";
    if (!intentId) {
      const configuredWallet = process.env.SERVER_WALLET_ADDRESS;
      if (!configuredWallet) {
        return NextResponse.json(
          { error: 'SERVER_WALLET_ADDRESS is not configured' },
          { status: 500 }
        );
      }
      serverWalletAddress = configuredWallet;

      // Construct full URL for X402 payment (requires absolute URL)
      let baseUrl = process.env.NEXT_PUBLIC_APP_URL;

      if (!baseUrl) {
        const protocol = requestUrl.protocol || 'http:';
        const host = requestUrl.host || requestUrl.hostname || 'localhost:3000';
        baseUrl = `${protocol}//${host}`;
      }

      baseUrl = baseUrl.replace(/\/$/, '');
      resourceUrl = `${baseUrl}${requestUrl.pathname}${requestUrl.search}`;

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

    if (!intentId) {
      console.log('💳 X402 Payment Request:', {
        resourceUrl,
        method: 'POST',
        chain,
        scheme: isSolanaPayment ? 'solana-exact' : useUpto ? 'upto' : 'exact',
        price: useUpto ? `${minPrice} - ${maxPrice}` : basePrice,
        hasPaymentHeader: !!paymentHeader || !!request.headers.get("X-PAYMENT"),
        serverWallet: serverWalletAddress?.slice(0, 10) + '...',
      });
    }

    let paymentResult;
    let enhancedPrompt = prompt;
    let usedGemini = false;
    let geminiTokens = 0;

    if (intentId) {
      // --- SERVER-BUILT PAYMENT: redeem a confirmed intent ---
      // Identity comes from the session (the intent is bound to its buyer),
      // the paid resolution comes from the intent row — neither is taken
      // from the request. Redemption is a one-shot conditional UPDATE, so a
      // replayed intentId can never buy a second generation.
      const ipLimit = checkRequestRateLimit(rateLimitKey(request, "generate:intent:ip"), 120, 60_000);
      if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

      // Session token only — requireAuth's fallback (X-Wallet-Address
      // signature headers, no server nonce) is replayable and deliberately
      // not accepted on payment paths (same gate as payments/generation/pay).
      if (!request.headers.get("X-Session-Token")) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 });
      }
      let authUser;
      try {
        authUser = await requireAuth(request);
      } catch {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 });
      }
      if (!checkRateLimit(authUser.userId, "generate:intent", 60, 60_000)) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
      }
      const supabase = getSupabaseServerClient();
      const redemption = await redeemGenerationIntent(supabase, {
        intentId,
        buyerWallet: authUser.userId,
      });
      if (!redemption.ok) {
        return NextResponse.json({ error: redemption.error }, { status: redemption.status });
      }
      consumedIntent = { supabase, id: intentId };
      paidResolution = redemption.resolution;
      paymentResult = {
        success: true,
        status: 200,
        headers: {},
        metadata: {
          paymentIntentId: intentId,
          modelFamily: redemption.modelFamily,
          resolution: redemption.resolution,
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
    } else if (isSolanaPayment) {
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

      // Cross-path replay guard: the server-built intent flow writes its
      // confirmed tx signature into generation_payment_intents and returns it
      // to the client. That same on-chain payment could otherwise be replayed
      // HERE as an X-PAYMENT header to buy a second, free generation — the two
      // flows keep replay state in disjoint tables. Reject any signature that
      // already settled an intent.
      const replayDb = getSupabaseServerClientSafe();
      if (replayDb) {
        const { data: intentSig } = await replayDb
          .from("generation_payment_intents")
          .select("id")
          .eq("tx_signature", payload.signature)
          .maybeSingle();
        if (intentSig) {
          return NextResponse.json(
            { error: "Transaction signature has already been used" },
            { status: 402 }
          );
        }
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

    if (!intentId) {
      console.log('💳 X402 Payment Result:', {
        success: paymentResult.success,
        status: paymentResult.status,
        scheme: useUpto ? 'upto' : 'exact',
        hasMetadata: !!paymentResult.metadata,
        txHash: paymentResult.metadata?.txHash,
        actualPrice: paymentResult.metadata?.actualPrice,
      });
    }

    // If payment not successful, return payment response
    if (!paymentResult.success) {
      return NextResponse.json(
        paymentResult.body || { error: 'Payment required' },
        { status: paymentResult.status, headers: paymentResult.headers }
      );
    }

    let geminiResult;
    const xaiKey = process.env.XAI_API_KEY;
    // Intent payments are paid upfront like Solana x402 — bound the provider
    // call so a hung generation can't strand an already-paid request.
    const paidUpfront = isSolanaPayment || !!consumedIntent;

    if (xaiKey) {
      console.log('🎨 Generating image with Grok...');

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
      const xaiResponse = paidUpfront
        ? await withTimeout(
            xaiRequest,
            SOLANA_GENERATION_TIMEOUT_MS,
            "Image generation timed out after payment. Please try again with a shorter prompt or lower resolution."
          )
        : await xaiRequest;

      if (!xaiResponse.ok) {
        const errTxt = await xaiResponse.text();
        console.error('❌ Grok image generation failed:', errTxt);
        await releaseIfConsumed();
        return NextResponse.json({ error: 'Grok Image generation failed', retryable: true }, { status: 500 });
      }

      const xaiData = await xaiResponse.json();
      const grokUrl = xaiData.data?.[0]?.url;

      if (!grokUrl) {
        await releaseIfConsumed();
        return NextResponse.json({ error: 'No image URL returned from Grok', retryable: true }, { status: 500 });
      }

      // The download shares the paid-upfront bound — a stalled CDN read must
      // reject into the catch-all (which releases the intent), not hang past
      // the function budget.
      const download = fetch(grokUrl).then(async (res) => {
        if (!res.ok) throw new Error("Failed to download image from Grok");
        return res.arrayBuffer();
      });
      const arrayBuffer = paidUpfront
        ? await withTimeout(
            download,
            SOLANA_GENERATION_TIMEOUT_MS,
            "Image download timed out after payment. Please try again."
          )
        : await download;
      const imageBuffer = Buffer.from(arrayBuffer);

      geminiResult = {
        success: true,
        imageBuffers: [imageBuffer],
        metadata: { model: 'grok-imagine-image' },
        generationTime: 0
      };
    } else {
      console.log('🎨 XAI_API_KEY not set, generating image with Gemini...');
      const geminiRequest = generateImagesWithGemini({
        prompt: enhancedPrompt,
        aspectRatio: (body.aspectRatio || body.ratio || "1:1") as ImageGenerationRequest["aspectRatio"],
        // The paid resolution from the intent row wins over the request body.
        imageSize: (paidResolution || body.resolution || "2K") as ImageGenerationRequest["imageSize"],
        numImages: 1,
      });
      geminiResult = paidUpfront
        ? await withTimeout(
            geminiRequest,
            SOLANA_GENERATION_TIMEOUT_MS,
            "Image generation timed out after payment. Please try again with a shorter prompt or lower resolution."
          )
        : await geminiRequest;

      if (!geminiResult.success || !geminiResult.imageBuffers?.length) {
        await releaseIfConsumed();
        return NextResponse.json(
          { error: geminiResult.error || 'Gemini image generation failed', retryable: geminiResult.retryable ?? true },
          { status: 500 }
        );
      }
    }

    const generatedImageBuffer = geminiResult.imageBuffers?.[0];
    if (!generatedImageBuffer) {
      await releaseIfConsumed();
      return NextResponse.json({ error: 'No generated image buffer returned', retryable: true }, { status: 500 });
    }

    // Upload image buffer to Vercel Blob storage
    let imageUrl: string;
    try {
      const { put } = await import('@vercel/blob');
      const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
      
      if (!blobToken) {
        console.warn('⚠️ BLOB_READ_WRITE_TOKEN not set, using data URL fallback');
        // Fallback to data URL if blob storage not configured
        const base64 = generatedImageBuffer.toString('base64');
        imageUrl = `data:image/png;base64,${base64}`;
      } else {
        // Create unique filename
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 9);
        const filename = `generations/${timestamp}_${randomSuffix}.png`;

        // Upload to Vercel Blob
        const { url } = await put(filename, generatedImageBuffer, {
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
      const base64 = generatedImageBuffer.toString('base64');
      imageUrl = `data:image/png;base64,${base64}`;
      console.warn('⚠️ Using data URL fallback due to upload error');
    }

    // The paid image is delivered — mark the intent fulfilled so the
    // stale-claim rescue can never mistake it for a dead claim.
    if (consumedIntent) {
      await fulfillGenerationIntent(consumedIntent.supabase, consumedIntent.id);
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
        paymentScheme: consumedIntent ? 'intent' : isSolanaPayment ? 'solana-exact' : useUpto ? 'upto' : 'exact',
        metadata: {
          ...paymentResult.metadata,
          // x402 upto pricing fields would be misleading on intent-paid
          // responses — the intent path reports its own metadata above.
          ...(useUpto && !consumedIntent && {
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
    await releaseIfConsumed();
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
