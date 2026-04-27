import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";
import {
  estimateGeminiCost,
  computeImageCostFromUsage,
} from "@/backend/services/gemini-image-generation";
import {
  generateWithRateLimit,
  generateWithRetryAndCircuitBreaker,
  RETRY_CONFIGS,
} from "@/backend/services";
import type { ImageGenerationRequest, ImageGenerationResult } from "@/backend/services/types";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import { computeEnhancementCostUsd } from "@/lib/generation-pricing";
import { applyFee, resolveSpecialty, type UserSpecialty } from "@/lib/fee-config";

type GenerateImageBody = {
  prompt?: string;
  prompts?: string[];
  aspectRatio?: string;
  resolution?: string;
  referenceImage?: string;
  referenceImages?: string[];
  useUptoPayment?: boolean;
  /** Prompt enhancement is disabled server-side. */
  useEnhancement?: boolean;
  userId?: string;
};

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const chain = (searchParams.get('chain') || 'base-sepolia') as ChainKey;
  const paymentHeader = request.headers.get('X-Payment');

  try {
    const body = (await request.json()) as GenerateImageBody;
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const prompts =
      Array.isArray(body?.prompts) && body.prompts.length > 0
        ? body.prompts
            .filter((p): p is string => typeof p === "string")
            .map((p) => p.trim())
            .filter(Boolean)
            .slice(0, 4)
        : [];
    const promptBatch = prompts.length > 0 ? prompts : prompt ? [prompt] : [];

    if (promptBatch.length === 0) {
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
    // Check for both GEMINI_API_KEY and GOOGLE_GEMINI_API_KEY for compatibility
    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY);
    const useUpto = body.useUptoPayment !== false && hasGeminiKey;

    // Specialty fee: normal 7%, family 1%, admin 0%
    let specialty: UserSpecialty = "normal";
    if (body.userId) {
      const supabase = getSupabaseServerClientSafe();
      if (supabase) {
        let user: { preferences?: unknown } | null = null;
        const byId = await supabase
          .from("users")
          .select("id, preferences, wallet_address")
          .eq("id", body.userId)
          .maybeSingle();
        if (byId.data) user = byId.data;
        if (!user) {
          const byWallet = await supabase
            .from("users")
            .select("id, preferences, wallet_address")
            .eq("wallet_address", body.userId.toLowerCase())
            .maybeSingle();
          if (byWallet.data) user = byWallet.data;
        }
        specialty = resolveSpecialty(body.userId, user?.preferences as { specialty?: string } | undefined);
      } else {
        specialty = resolveSpecialty(body.userId, undefined);
      }
    }

    const resolution = body.resolution || "2K";
    const resolutionKey = resolution === "1K" ? "1K" : resolution === "4K" ? "4K" : "2K";
    const model = "gemini-2.5-flash-image";
    const resolutionSupportedByModel =
      model === "gemini-2.5-flash-image" || model === "gemini-3-pro-image-preview";
    // Hard-disable enhancement to avoid extra text-model calls (e.g. gemini-1.5-flash 404)
    const useEnhancement = false;
    const requestedCount = Math.max(1, Math.min(4, promptBatch.length));
    const estimatedImageCostUsd = estimateGeminiCost(model, resolutionKey, requestedCount);
    const estimatedTotalUsd = estimatedImageCostUsd + (useEnhancement ? 0.01 * requestedCount : 0);
    const basePriceWithFeeUsd = applyFee(estimatedTotalUsd, specialty);
    const basePrice = `$${basePriceWithFeeUsd.toFixed(4)}`;

    const maxPriceUsd = useUpto ? estimatedTotalUsd * 1.5 : estimatedTotalUsd;
    const maxPriceWithFeeUsd = applyFee(maxPriceUsd, specialty);
    const maxPrice = useUpto ? `$${maxPriceWithFeeUsd.toFixed(4)}` : basePrice;
    const minPrice = basePrice;

    console.log('💳 X402 Payment Request:', {
      resourceUrl,
      method: 'POST',
      chain,
      scheme: useUpto ? 'upto' : 'exact',
      price: useUpto ? `${minPrice} - ${maxPrice}` : basePrice,
      hasPaymentHeader: !!paymentHeader,
      serverWallet: serverWalletAddress?.slice(0, 10) + '...',
      requestedAspectRatio: body.aspectRatio || '1:1',
      requestedResolution: resolutionKey,
      resolutionApplied: resolutionSupportedByModel,
    });

    let paymentResult;
    let usedGemini = false;
    let geminiTokens = 0;
    const imageSize = resolutionKey === '1K' ? '1K' : resolutionKey === '4K' ? '4K' : '2K';
    const aspectRatio = (body.aspectRatio || '1:1') as '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
    const referenceImages = Array.isArray(body.referenceImages)
      ? body.referenceImages.filter(
          (img): img is string => typeof img === "string" && img.length > 0
        )
      : undefined;
    const referenceImage =
      typeof body.referenceImage === "string" ? body.referenceImage : referenceImages?.[0];

    type GeneratedRun = {
      sourcePrompt: string;
      enhancedPrompt: string;
      result: ImageGenerationResult;
      imageCostUsd: number;
      enhancementCostUsd: number;
      enhancementTokens: number;
    };

    const runSingleGeneration = async (inputPrompt: string): Promise<GeneratedRun> => {
      const enhancementInputTokens = 0;
      const enhancementOutputTokens = 0;
      const enhancedPrompt = inputPrompt;
      const enhancementTokens = 0;

      const imageRequest: ImageGenerationRequest = {
        prompt: enhancedPrompt,
        aspectRatio,
        numImages: 1,
        modelVersion: model,
        imageSize: imageSize as '1K' | '2K' | '4K',
        referenceImage,
        referenceImages,
      };

      const imageResult = await generateWithRetryAndCircuitBreaker(
        generateWithRateLimit,
        imageRequest,
        RETRY_CONFIGS.rateLimitError
      );

      if (!imageResult.success || !imageResult.imageBuffers?.length) {
        const error = new Error(imageResult.error || "Image generation failed");
        (error as Error & { retryable?: boolean }).retryable = imageResult.retryable;
        throw error;
      }

      const imageCostUsd = imageResult.metadata?.usageMetadata
        ? computeImageCostFromUsage(imageResult.metadata.usageMetadata, model)
        : estimateGeminiCost(model, resolutionKey, 1);
      const enhancementCostUsd = computeEnhancementCostUsd(
        enhancementInputTokens,
        enhancementOutputTokens
      );

      return {
        sourcePrompt: inputPrompt,
        enhancedPrompt,
        result: imageResult,
        imageCostUsd,
        enhancementCostUsd,
        enhancementTokens,
      };
    };

    let capturedRuns: GeneratedRun[] | null = null;

    if (useUpto) {
      // Upto: do enhancement + image generation in callback so we have usageMetadata for exact cost
      paymentResult = await paymentEngine.settleWithUpto(
        {
          resourceUrl: resourceUrl,
          method: 'POST',
          paymentHeader: paymentHeader || undefined,
          chainKey: chain,
          scheme: 'upto',
          maxPrice: maxPrice,
          minPrice: minPrice,
          description: `Generate ${requestedCount} ${(body.resolution || '2K')} image${requestedCount === 1 ? '' : 's'} with AI`,
          payToAddress: serverWalletAddress,
          category: 'image-generation',
        },
        async () => {
          try {
            const runs: GeneratedRun[] = [];
            for (const promptForRun of promptBatch) {
              runs.push(await runSingleGeneration(promptForRun));
            }
            capturedRuns = runs;

            const imageCostUsd = runs.reduce((sum, run) => sum + run.imageCostUsd, 0);
            const enhancementCostUsd = runs.reduce((sum, run) => sum + run.enhancementCostUsd, 0);
            const apiPriceUsd = imageCostUsd + enhancementCostUsd;
            geminiTokens = runs.reduce((sum, run) => sum + run.enhancementTokens, 0);
            usedGemini = geminiTokens > 0;
            const actualPriceUsd = applyFee(apiPriceUsd, specialty);
            const actualPrice = `$${actualPriceUsd.toFixed(4)}`;

            console.log('💰 Exact API cost:', {
              imageCostUsd,
              geminiTokens,
              apiPriceUsd,
              actualPriceWithFee: actualPrice,
            });

            return {
              actualPrice,
              metadata: {
                geminiTokens,
                imageCostUsd,
                apiPriceUsd,
              },
            };
          } catch (error) {
            console.error('⚠️ Upto callback failed:', error);
            usedGemini = false;
            capturedRuns = null;
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
      // Exact payment: user pays estimated price (from Google token pricing)
      paymentResult = await paymentEngine.settle({
        resourceUrl: resourceUrl,
        method: 'POST',
        paymentHeader: paymentHeader || undefined,
        chainKey: chain,
        price: basePrice,
        description: `Generate ${requestedCount} ${(body.resolution || '2K')} image${requestedCount === 1 ? '' : 's'} with AI`,
        payToAddress: serverWalletAddress,
        category: 'image-generation',
      });
    }

    console.log('💳 X402 Payment Result:', {
      success: paymentResult.success,
      status: paymentResult.status,
      scheme: useUpto ? 'upto' : 'exact',
      hasMetadata: !!paymentResult.metadata,
      txHash: paymentResult.metadata?.txHash,
      actualPrice: paymentResult.metadata?.actualPrice,
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        paymentResult.body || { error: 'Payment required' },
        { status: paymentResult.status, headers: paymentResult.headers }
      );
    }

    let finalRuns: GeneratedRun[] = [];
    const preparedRuns = capturedRuns as GeneratedRun[] | null;
    if (preparedRuns && preparedRuns.length === promptBatch.length) {
      finalRuns = preparedRuns;
    } else {
      console.log(`🎨 Generating ${promptBatch.length} image(s) with Gemini...`);
      try {
        for (const promptForRun of promptBatch) {
          finalRuns.push(await runSingleGeneration(promptForRun));
        }
        geminiTokens = finalRuns.reduce((sum, run) => sum + run.enhancementTokens, 0);
        usedGemini = geminiTokens > 0;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const retryable = Boolean((error as Error & { retryable?: boolean }).retryable);
        console.error('❌ Gemini image generation failed:', message);
        const errorText = message.toLowerCase();
        const isRateLimit =
          errorText.includes('rate limit') ||
          errorText.includes('429') ||
          errorText.includes('quota') ||
          errorText.includes('too many requests');
        const failureStatus = retryable ? (isRateLimit ? 429 : 503) : 500;
        return NextResponse.json(
          {
            error: message || 'Image generation failed',
            retryable,
          },
          {
            status: failureStatus,
            headers: retryable ? { "Retry-After": "30" } : undefined,
          }
        );
      }
    }

    if (finalRuns.length === 0) {
      return NextResponse.json(
        { error: "No images were generated." },
        { status: 500 }
      );
    }

    const uploadBuffer = async (buffer: Buffer) => {
      try {
        const { put } = await import('@vercel/blob');
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
        if (!blobToken) {
          const base64 = buffer.toString('base64');
          return `data:image/png;base64,${base64}`;
        }
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 9);
        const filename = `generations/${timestamp}_${randomSuffix}.png`;
        const { url } = await put(filename, buffer, {
          access: 'public',
          contentType: 'image/png',
          addRandomSuffix: false,
        });
        return url;
      } catch {
        const base64 = buffer.toString('base64');
        return `data:image/png;base64,${base64}`;
      }
    };

    const firstResult = finalRuns[0].result;
    if (!firstResult.success || !firstResult.imageBuffers || firstResult.imageBuffers.length === 0) {
      const errorText = (firstResult.error || '').toLowerCase();
      const isRateLimit =
        errorText.includes('rate limit') ||
        errorText.includes('429') ||
        errorText.includes('quota') ||
        errorText.includes('too many requests');
      const failureStatus = firstResult.retryable
        ? (isRateLimit ? 429 : 503)
        : 500;
      return NextResponse.json(
        { 
          error: firstResult.error || 'Image generation failed',
          retryable: firstResult.retryable,
        },
        {
          status: failureStatus,
          headers: firstResult.retryable ? { "Retry-After": "30" } : undefined,
        }
      );
    }
    const imageUrls = await Promise.all(
      finalRuns.map((run) => uploadBuffer(run.result.imageBuffers![0]))
    );
    const promptsUsed = finalRuns.map((run) => run.enhancedPrompt);
    const imageMetadata = finalRuns.map((run) => run.result.metadata ?? {});

    // Return image with payment metadata and headers
    return NextResponse.json(
      {
        imageUrl: imageUrls[0],
        imageUrls,
        prompt: promptsUsed[0],
        prompts: promptsUsed,
        provider: "gemini",
        model: firstResult.metadata?.model || 'gemini-2.5-flash-image',
        usedGemini,
        geminiTokens: usedGemini ? geminiTokens : undefined,
        generationTime: firstResult.generationTime,
        paymentScheme: useUpto ? 'upto' : 'exact',
        metadata: {
          ...paymentResult.metadata,
          requestedAspectRatio: aspectRatio,
          requestedResolution: resolutionKey,
          resolutionApplied: resolutionSupportedByModel,
          resolutionNote: "Requested resolution was sent to Gemini.",
          ...(useUpto && {
            maxPrice,
            minPrice,
            actualPrice: paymentResult.metadata?.actualPrice,
          }),
          geminiMetadata: imageMetadata,
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
