import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";
import {
  generateImagesWithGemini,
  estimateGeminiCost,
  computeImageCostFromUsage,
} from "@/backend/services/gemini-image-generation";
import type { ImageGenerationRequest, ImageGenerationResult } from "@/backend/services/types";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import { enhancePromptWithGemini, computeEnhancementCostUsd } from "@/lib/generation-pricing";
import { applyFee, resolveSpecialty, type UserSpecialty } from "@/lib/fee-config";

type GenerateImageBody = {
  prompt?: string;
  aspectRatio?: string;
  resolution?: string;
  useUptoPayment?: boolean;
  /** If false, skip prompt enhancement (use prompt as-is). Default true. */
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
    const model = "gemini-3-pro-image-preview";
    const useEnhancement = body.useEnhancement !== false;
    const estimatedImageCostUsd = estimateGeminiCost(model, resolutionKey, 1);
    const estimatedTotalUsd = estimatedImageCostUsd + (useEnhancement ? 0.01 : 0);
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
    });

    let paymentResult;
    let enhancedPrompt = prompt;
    let usedGemini = false;
    let geminiTokens = 0;
    /** Set by upto callback when we generate inside it (so we charge exact API cost). */
    let capturedGeminiResult: ImageGenerationResult | null = null;

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
          description: `Generate ${body.resolution || '2K'} image with AI enhancement`,
          payToAddress: serverWalletAddress,
          category: 'image-generation',
        },
        async () => {
          try {
            let enhancementInputTokens = 0;
            let enhancementOutputTokens = 0;
            if (useEnhancement) {
              const geminiResult = await enhancePromptWithGemini(prompt);
              enhancedPrompt = geminiResult.enhancedPrompt;
              geminiTokens = geminiResult.tokensUsed;
              enhancementInputTokens = geminiResult.inputTokens;
              enhancementOutputTokens = geminiResult.outputTokens;
              usedGemini = geminiTokens > 0;
            } else {
              enhancedPrompt = prompt;
            }

            const imageSize = resolutionKey === '1K' ? '1K' : resolutionKey === '4K' ? '4K' : '2K';
            const aspectRatio = (body.aspectRatio || '1:1') as '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
            const imgRequest: ImageGenerationRequest = {
              prompt: enhancedPrompt,
              aspectRatio,
              numImages: 1,
              modelVersion: model,
              imageSize: imageSize as '1K' | '2K' | '4K',
            };
            const imageResult = await generateImagesWithGemini(imgRequest);
            capturedGeminiResult = imageResult;

            if (!imageResult.success || !imageResult.imageBuffers?.length) {
              const err = imageResult.error || 'Image generation failed';
              throw new Error(err);
            }

            // Exact cost: image from usageMetadata, enhancement from official Gemini 1.5 Flash input/output pricing
            const imageCostUsd = imageResult.metadata?.usageMetadata
              ? computeImageCostFromUsage(imageResult.metadata.usageMetadata, model)
              : estimateGeminiCost(model, resolutionKey, 1);
            const enhancementCostUsd = computeEnhancementCostUsd(enhancementInputTokens, enhancementOutputTokens);
            const apiPriceUsd = imageCostUsd + enhancementCostUsd;
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
            enhancedPrompt = prompt;
            usedGemini = false;
            capturedGeminiResult = null;
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
        description: `Generate ${body.resolution || '2K'} image with AI`,
        payToAddress: serverWalletAddress,
        category: 'image-generation',
      });

      if (paymentResult.success && useEnhancement) {
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
      } else if (paymentResult.success) {
        enhancedPrompt = prompt;
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

    if (!paymentResult.success) {
      return NextResponse.json(
        paymentResult.body || { error: 'Payment required' },
        { status: paymentResult.status, headers: paymentResult.headers }
      );
    }

    // Use image from upto callback if we already generated there; otherwise generate now
    let geminiResult: ImageGenerationResult;
    if (useUpto && capturedGeminiResult?.success && capturedGeminiResult.imageBuffers?.length) {
      geminiResult = capturedGeminiResult;
    } else {
      console.log('🎨 Generating image with Gemini...');
      const imageSize = resolutionKey === '1K' ? '1K' : resolutionKey === '4K' ? '4K' : '2K';
      const aspectRatio = (body.aspectRatio || '1:1') as '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
      const geminiRequest: ImageGenerationRequest = {
        prompt: enhancedPrompt,
        aspectRatio,
        numImages: 1,
        modelVersion: model,
        imageSize: imageSize as '1K' | '2K' | '4K',
      };
      geminiResult = await generateImagesWithGemini(geminiRequest);
    }

    if (!geminiResult.success || !geminiResult.imageBuffers || geminiResult.imageBuffers.length === 0) {
      console.error('❌ Gemini image generation failed:', geminiResult.error);
      return NextResponse.json(
        { 
          error: geminiResult.error || 'Image generation failed',
          retryable: geminiResult.retryable,
        },
        { status: 500 }
      );
    }

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
        paymentScheme: useUpto ? 'upto' : 'exact',
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
