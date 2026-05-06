/**
 * POST /api/prompts/[id]/purchase
 * Purchase and unlock a prompt from the marketplace
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { storage } from "@/backend/storage";
import { paymentEngine } from "@/backend/x402-engine";
import { PAYMENT_CHAINS } from "@/shared/payment-config";
import { requireAuth, checkRateLimit } from "@/lib/auth";
import { validatePromptForPurchase, revalidatePromptBeforePurchase, validateListingStatusBeforePurchase } from "@/lib/prompt-consistency";
import { verifyPaymentOnChain, recordPaymentVerification } from "@/backend/payment-verification";
import { generateAccessToken } from "@/lib/content-access-tokens";
import { queueEarningsReconciliation, queuePromptStatsReconciliation } from "@/lib/reconciliation-queue";
import { sendEarningsAlert, sendPromptStatsAlert } from "@/lib/alerting";
import type { ChainKey } from "@/shared/payment-config";
import { z } from "zod";

const purchasePromptSchema = z.object({
  chain: z.string().optional().default('base-sepolia'),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: promptId } = await params;

    // Parse request body
    const body = await request.json();
    const validation = purchasePromptSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.issues
        },
        { status: 400 }
      );
    }

    const { chain } = validation.data;

    // Authenticate user (REQUIRED for purchases)
    const authUser = await requireAuth(request);

    // Rate limiting: max 5 purchases per minute per user
    if (!checkRateLimit(authUser.userId, 'purchase', 5, 60000)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please wait before making another purchase.' },
        { status: 429 }
      );
    }

    // Validate prompt exists and is available for purchase (includes idempotency check)
    let validationResult;
    try {
      validationResult = await validatePromptForPurchase(promptId, authUser.userId);
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: error instanceof Error ? error.message : "Prompt validation failed" 
        },
        { status: error instanceof Error && error.message.includes('not found') ? 404 : 400 }
      );
    }

    const { prompt, alreadyPurchased, existingPurchaseId } = validationResult;

    // If already purchased, generate new access token instead of returning content
    if (alreadyPurchased) {
      // Verify prompt still exists
      const promptCheck = await storage.getPrompt(promptId);
      if (!promptCheck) {
        // Prompt was deleted after purchase - this is a consistency issue
        return NextResponse.json(
          { 
            success: false, 
            error: 'Prompt content no longer available. Please contact support.',
            purchaseId: existingPurchaseId 
          },
          { status: 410 } // 410 Gone - resource existed but is no longer available
        );
      }

      // Generate new access token for existing purchase
      const accessToken = await generateAccessToken(
        promptId,
        authUser.userId,
        existingPurchaseId,
        3600 // 1 hour expiration
      );

      const variables = await storage.getVariablesByPromptId(promptId);

      return NextResponse.json({
        success: true,
        accessToken: accessToken.token,
        expiresAt: accessToken.expiresAt,
        expiresIn: accessToken.expiresIn,
        variables: variables,
        alreadyPurchased: true,
        message: "You already own this prompt - new access token generated",
        contentUrl: `/api/prompts/${promptId}/content/secure?token=${accessToken.token}`,
      });
    }

    const priceUsdCents = prompt.priceUsdCents || 0;
    const isFree = priceUsdCents === 0;

    // Handle free prompts - skip payment flow entirely
    if (isFree) {
      console.log('🆓 Free prompt purchase - skipping payment flow:', {
        promptId,
        userId: authUser.userId,
        title: prompt.title,
      });

      // Re-validate prompt exists (for consistency)
      try {
        await revalidatePromptBeforePurchase(promptId);
      } catch (error) {
        return NextResponse.json(
          { 
            success: false, 
            error: error instanceof Error ? error.message : 'Prompt validation failed' 
          },
          { status: 410 } // 410 Gone
        );
      }

      // For free prompts, we still record the "purchase" (access grant) but with $0
      // This allows tracking of free prompt usage and analytics
      const creatorId = prompt.userId || prompt.artistId;
      if (!creatorId) {
        return NextResponse.json(
          { success: false, error: 'Prompt creator not found' },
          { status: 500 }
        );
      }

      // CRITICAL: Final validation right before database write for free prompts
      // Check if prompt was unlisted during the revalidation step
      const finalValidation = await validateListingStatusBeforePurchase(promptId);
      if (!finalValidation.isValid) {
        console.warn('Free prompt was unlisted before access recording:', {
          promptId,
          userId: authUser.userId,
          error: finalValidation.error,
        });

        // For free prompts, we can be more lenient - still grant access if prompt exists
        // But log the inconsistency for monitoring
        if (!finalValidation.prompt) {
          // Prompt was deleted - don't grant access
          return NextResponse.json(
            { 
              success: false, 
              error: finalValidation.error || 'Prompt is no longer available'
            },
            { status: 410 }
          );
        }
        // If prompt exists but was unlisted, we'll still grant access for free prompts
        // This is less critical than paid prompts since no payment was involved
      }

      // Record free prompt access (no payment, no earnings)
      const supabase = getSupabaseServerClient();
      const { data: purchaseResult, error: atomicError } = await supabase
        .rpc('record_prompt_purchase', {
          p_prompt_id: promptId,
          p_buyer_id: authUser.userId,
          p_seller_id: creatorId,
          p_amount_usd_cents: 0, // Free prompt
          p_platform_fee_cents: 0,
          p_creator_earnings_cents: 0,
          p_transaction_hash: null, // No transaction for free prompts
          p_chain_id: null,
          p_chain_name: null,
          p_payment_scheme: 'exact',
          p_prompt_title: prompt.title || null,
          p_prompt_preview_image_url: prompt.previewImageUrl || null,
        });

      if (atomicError) {
        // Check if error is a unique constraint violation (duplicate access)
        if (atomicError.code === '23505' || atomicError.message?.includes('unique') || atomicError.message?.includes('duplicate')) {
          // Already accessed - generate new access token
          const supabaseClient = getSupabaseServerClient();
          const { data: existingPurchase } = await supabaseClient
            .from('prompt_purchases')
            .select('id')
            .eq('prompt_id', promptId)
            .eq('buyer_id', authUser.userId)
            .eq('status', 'completed')
            .single();

          const accessToken = await generateAccessToken(
            promptId,
            authUser.userId,
            existingPurchase?.id,
            3600 // 1 hour expiration
          );

          const variables = await storage.getVariablesByPromptId(promptId);

          return NextResponse.json({
            success: true,
            accessToken: accessToken.token,
            expiresAt: accessToken.expiresAt,
            expiresIn: accessToken.expiresIn,
            variables: variables,
            alreadyPurchased: true,
            isFree: true,
            message: "You already have access to this free prompt - new access token generated",
            contentUrl: `/api/prompts/${promptId}/content/secure?token=${accessToken.token}`,
          });
        }

        // Other error - log and return
        console.error('Error recording free prompt access:', atomicError);
        return NextResponse.json(
          { success: false, error: 'Failed to record free prompt access' },
          { status: 500 }
        );
      }

      // Free prompt access granted - generate access token
      const accessToken = await generateAccessToken(
        promptId,
        authUser.userId,
        purchaseResult?.[0]?.purchase_id,
        3600 // 1 hour expiration
      );

      const variables = await storage.getVariablesByPromptId(promptId);

      // Update prompt stats (non-critical, queue if fails)
      try {
        const newTotalSales = (prompt.totalSales || 0) + 1;
        await storage.updatePrompt(promptId, {
          totalSales: newTotalSales,
          updatedAt: new Date().toISOString(),
        } as any);
      } catch (statsError) {
        console.warn('Failed to update prompt stats for free prompt:', statsError);
        // Queue reconciliation with current stats
        await queuePromptStatsReconciliation({
          promptId,
          totalSales: (prompt.totalSales || 0) + 1,
          totalRevenue: prompt.totalRevenue || 0, // Free prompts have $0 revenue
          attemptCount: 0,
        });
      }

      return NextResponse.json({
        success: true,
        accessToken: accessToken.token,
        expiresAt: accessToken.expiresAt,
        expiresIn: accessToken.expiresIn,
        variables: variables,
        isFree: true,
        message: "Free prompt unlocked successfully",
        contentUrl: `/api/prompts/${promptId}/content/secure?token=${accessToken.token}`,
      });
    }

    // Paid prompt - proceed with payment flow
    // Calculate revenue split
    const platformFeeCents = Math.floor(priceUsdCents * 0.20); // 20%
    const creatorEarningsCents = priceUsdCents - platformFeeCents; // 80%

    // Re-validate prompt exists right before payment
    // This prevents race condition where prompt is deleted between initial check and purchase
    try {
      await revalidatePromptBeforePurchase(promptId);
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: error instanceof Error ? error.message : 'Prompt validation failed before payment' 
        },
        { status: 410 } // 410 Gone
      );
    }

    // Process X402 payment
    const priceUsd = (priceUsdCents / 100).toFixed(2);
    const priceString = `$${priceUsd}`;

    const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
    if (!serverWalletAddress) {
      return NextResponse.json(
        { success: false, error: 'Payment configuration error' },
        { status: 500 }
      );
    }

    const paymentResult = await paymentEngine.settle({
      resourceUrl: `${request.nextUrl.origin}/api/prompts/${promptId}/purchase`,
      method: 'POST',
      paymentHeader: request.headers.get('X-Payment') || undefined,
      chainKey: chain as keyof typeof PAYMENT_CHAINS,
      price: priceString,
      description: `Unlock prompt: ${prompt.title}`,
      payToAddress: serverWalletAddress,
      category: 'prompt-purchase',
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        paymentResult.body || { success: false, error: 'Payment required' },
        {
          status: paymentResult.status,
          headers: paymentResult.headers
        }
      );
    }

    // Final validation before recording purchase (after payment)
    // This is the last chance to catch if prompt was deleted during payment processing
    try {
      await revalidatePromptBeforePurchase(promptId);
    } catch (error) {
      // Payment succeeded but prompt was deleted - critical error
      console.error('CRITICAL: Payment succeeded but prompt was deleted:', {
        promptId,
        userId: authUser.userId,
        txHash: paymentResult.metadata?.txHash,
      });
      
      // TODO: In production, trigger a refund or reconciliation process here
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment processed but prompt is no longer available. Please contact support for a refund.',
          transactionHash: paymentResult.metadata?.txHash 
        },
        { status: 500 }
      );
    }

    // Verify payment on-chain before recording purchase
    // This ensures the transaction actually occurred and matches expected parameters
    if (paymentResult.metadata?.txHash) {
      const verification = await verifyPaymentOnChain({
        txHash: paymentResult.metadata.txHash,
        chainKey: chain as string,
        expectedRecipient: serverWalletAddress,
        expectedAmountUSDC: priceUsdCents,
        tolerancePercent: 1, // 1% tolerance for rounding
      });

      if (!verification.verified) {
        console.error('❌ Payment verification failed:', {
          txHash: paymentResult.metadata.txHash,
          error: verification.error,
          promptId,
          userId: authUser.userId,
        });

        // Payment verification failed - do not record purchase
        // In production, you might want to trigger a refund here
        return NextResponse.json(
          {
            success: false,
            error: verification.error || 'Payment verification failed. Please contact support.',
            transactionHash: paymentResult.metadata.txHash
          },
          { status: 402 } // 402 Payment Required (but verification failed)
        );
      }

      console.log('✅ Payment verified on-chain:', {
        txHash: paymentResult.metadata.txHash,
        promptId,
        amount: priceString,
        onChainData: verification.onChainData,
      });
    } else {
      // No transaction hash - this shouldn't happen with X402, but log it
      console.warn('⚠️  Payment succeeded but no transaction hash in metadata:', {
        promptId,
        userId: authUser.userId,
        metadata: paymentResult.metadata,
      });
    }

    // CRITICAL: Final validation right before database write
    // This is the LAST check to prevent race condition where creator unlists during payment verification
    // Even though we checked after payment, there's a window during on-chain verification
    const finalValidation = await validateListingStatusBeforePurchase(promptId);
    if (!finalValidation.isValid) {
      // Payment succeeded and verified, but prompt was unlisted - critical error
      console.error('CRITICAL: Payment verified but prompt was unlisted before purchase recording:', {
        promptId,
        userId: authUser.userId,
        txHash: paymentResult.metadata?.txHash,
        error: finalValidation.error,
      });

      // Payment has been processed and verified - this is a critical state
      // In production, you would trigger a refund process here
      // For now, we reject the purchase and log for manual review
      return NextResponse.json(
        { 
          success: false, 
          error: finalValidation.error || 'Prompt was unlisted during purchase. Payment has been processed. Please contact support for a refund.',
          transactionHash: paymentResult.metadata?.txHash,
          requiresRefund: true, // Flag for monitoring/refund system
        },
        { status: 410 } // 410 Gone - resource was available but is no longer
      );
    }

    // Record purchase atomically using stored procedure
    // This ensures purchase recording and earnings updates happen in a single transaction
    const creatorId = prompt.userId || prompt.artistId;
    if (!creatorId) {
      return NextResponse.json(
        { success: false, error: 'Prompt creator not found' },
        { status: 500 }
      );
    }

    // Use atomic stored procedure to record purchase and update earnings
    // The function handles duplicate prevention using unique constraint
    // Include denormalized prompt data to prevent N+1 queries
    const supabase = getSupabaseServerClient();
    const { data: purchaseResult, error: atomicError } = await supabase
      .rpc('record_prompt_purchase', {
        p_prompt_id: promptId,
        p_buyer_id: authUser.userId,
        p_seller_id: creatorId,
        p_amount_usd_cents: priceUsdCents,
        p_platform_fee_cents: platformFeeCents,
        p_creator_earnings_cents: creatorEarningsCents,
        p_transaction_hash: paymentResult.metadata?.txHash || null,
        p_chain_id: PAYMENT_CHAINS[chain as keyof typeof PAYMENT_CHAINS]?.id || 84532,
        p_chain_name: PAYMENT_CHAINS[chain as keyof typeof PAYMENT_CHAINS]?.name || 'Base Sepolia',
        p_payment_scheme: 'exact',
        p_prompt_title: prompt.title || null, // Denormalize to prevent N+1 queries
        p_prompt_preview_image_url: prompt.previewImageUrl || null, // Denormalize preview image
      });

    if (atomicError) {
      // Check if error is a unique constraint violation (duplicate purchase)
      // PostgreSQL error code 23505 = unique_violation
      if (atomicError.code === '23505' || atomicError.message?.includes('unique') || atomicError.message?.includes('duplicate')) {
        console.log('⚠️  Duplicate purchase detected (unique constraint):', {
          promptId,
          userId: authUser.userId,
          error: atomicError.message,
        });

        // Get existing purchase ID
        const supabaseClient = getSupabaseServerClient();
        const { data: existingPurchase } = await supabaseClient
          .from('prompt_purchases')
          .select('id')
          .eq('prompt_id', promptId)
          .eq('buyer_id', authUser.userId)
          .eq('status', 'completed')
          .single();

        // Generate new access token for existing purchase
        const accessToken = await generateAccessToken(
          promptId,
          authUser.userId,
          existingPurchase?.id,
          3600 // 1 hour expiration
        );

        const variables = await storage.getVariablesByPromptId(promptId);

        return NextResponse.json({
          success: true,
          accessToken: accessToken.token,
          expiresAt: accessToken.expiresAt,
          expiresIn: accessToken.expiresIn,
          variables: variables,
          alreadyPurchased: true,
          message: "Purchase already recorded - new access token generated",
          contentUrl: `/api/prompts/${promptId}/content/secure?token=${accessToken.token}`,
        });
      }

      console.error('Error in atomic purchase recording:', atomicError);
      return NextResponse.json(
        { success: false, error: 'Failed to record purchase transaction' },
        { status: 500 }
      );
    }

    // Check result from atomic function
    if (!purchaseResult || purchaseResult.length === 0) {
      console.error('Unexpected result from atomic purchase function');
      return NextResponse.json(
        { success: false, error: 'Unexpected error during purchase recording' },
        { status: 500 }
      );
    }

    const result = purchaseResult[0];

    // Check if purchase already exists (idempotency)
    // The function returns error_message='Purchase already exists' for duplicates
    if (result.error_message && result.error_message.includes('already exists')) {
      // Purchase already exists - generate new access token (idempotent)
      const existingPurchaseId = result.purchase_id;
      const accessToken = await generateAccessToken(
        promptId,
        authUser.userId,
        existingPurchaseId,
        3600 // 1 hour expiration
      );

      const variables = await storage.getVariablesByPromptId(promptId);

      return NextResponse.json({
        success: true,
        accessToken: accessToken.token,
        expiresAt: accessToken.expiresAt,
        expiresIn: accessToken.expiresIn,
        variables: variables,
        alreadyPurchased: true,
        message: "Purchase already recorded - new access token generated",
        contentUrl: `/api/prompts/${promptId}/content/secure?token=${accessToken.token}`,
      });
    }

    // Check if earnings update failed
    if (!result.earnings_updated) {
      console.error('CRITICAL: Purchase recorded but earnings update failed:', {
        promptId,
        creatorId,
        amountCents: creatorEarningsCents,
        purchaseId: result.purchase_id,
        error: result.error_message,
      });

      // Queue for reconciliation
      if (result.purchase_id) {
        await queueEarningsReconciliation({
          purchaseId: result.purchase_id,
          creatorId,
          amountCents: creatorEarningsCents,
          attemptCount: 0,
        });

        // Send alert
        await sendEarningsAlert({
          promptId,
          creatorId,
          amountCents: creatorEarningsCents,
          purchaseId: result.purchase_id,
          error: result.error_message || 'Earnings update failed in atomic function',
        });
      }

      // Still succeed purchase (user got content) but ensure reconciliation happens
      // Log critical error for immediate attention
      console.error('⚠️  CRITICAL: Earnings reconciliation queued. Purchase succeeded but creator earnings not updated.');
    }

    // Success - purchase and earnings updated atomically
    if (!result.purchase_id) {
      console.error('Purchase succeeded but no purchase_id returned');
      return NextResponse.json(
        { success: false, error: 'Unexpected error: purchase ID missing' },
        { status: 500 }
      );
    }

    // Update prompt statistics in MongoDB
    // Note: This is a separate database, so we handle it separately
    // If this fails, the Supabase transaction is already committed
    // We log the error but don't fail the request since the purchase is already recorded
    try {
      // Update prompt statistics (MongoDB allows flexible fields)
      const newTotalSales = (prompt.totalSales || 0) + 1;
      const newTotalRevenue = (prompt.totalRevenue || 0) + priceUsdCents;

      await (storage.updatePrompt as any)(promptId, {
        totalSales: newTotalSales,
        totalRevenue: newTotalRevenue,
        updatedAt: new Date().toISOString(),
      });
    } catch (mongoError) {
      // Log error and queue for reconciliation
      console.error('Error updating prompt stats in MongoDB (non-critical):', {
        promptId,
        totalSales: (prompt.totalSales || 0) + 1,
        totalRevenue: (prompt.totalRevenue || 0) + priceUsdCents,
        error: mongoError instanceof Error ? mongoError.message : String(mongoError),
      });

      // Queue for reconciliation
      await queuePromptStatsReconciliation({
        promptId,
        totalSales: (prompt.totalSales || 0) + 1,
        totalRevenue: (prompt.totalRevenue || 0) + priceUsdCents,
        attemptCount: 0,
      });

      // Send alert
      await sendPromptStatsAlert({
        promptId,
        totalSales: (prompt.totalSales || 0) + 1,
        totalRevenue: (prompt.totalRevenue || 0) + priceUsdCents,
        error: mongoError,
      });

      // Purchase still succeeds - MongoDB update can be reconciled later
      console.warn('⚠️  Prompt stats reconciliation queued. Purchase succeeded but stats not updated in MongoDB.');
    }

    // Generate time-limited access token instead of returning decrypted content directly
    // This prevents content from being exposed in HTTP response and allows access control
    const purchaseId = result.purchase_id;
    const accessToken = await generateAccessToken(
      promptId,
      authUser.userId,
      purchaseId,
      3600 // 1 hour expiration
    );

    // Get variables (safe to return - not encrypted)
    const variables = await storage.getVariablesByPromptId(promptId);

    return NextResponse.json({
      success: true,
      accessToken: accessToken.token,
      expiresAt: accessToken.expiresAt,
      expiresIn: accessToken.expiresIn,
      variables: variables,
      purchase: {
        transactionHash: paymentResult.metadata?.txHash,
        amountPaid: priceString,
        creatorEarnings: `$${(creatorEarningsCents / 100).toFixed(2)}`,
        platformFee: `$${(platformFeeCents / 100).toFixed(2)}`,
        chainId: PAYMENT_CHAINS[chain as keyof typeof PAYMENT_CHAINS]?.id || 84532,
        chainName: PAYMENT_CHAINS[chain as keyof typeof PAYMENT_CHAINS]?.name || 'Base Sepolia',
      },
      // Include secure content endpoint URL for convenience
      contentUrl: `/api/prompts/${promptId}/content/secure?token=${accessToken.token}`,
    }, {
      headers: paymentResult.headers,
    });

  } catch (error) {
    console.error('Error purchasing prompt:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}