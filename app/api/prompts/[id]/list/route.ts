/**
 * POST /api/prompts/[id]/list
 * List a prompt for sale on the marketplace
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { storage } from "@/backend/storage";
import { requireAuth, verifyPromptOwnership, checkRateLimit } from "@/lib/auth";
import { queueReconciliation } from "@/lib/reconciliation-queue";
import { sendAlert } from "@/lib/alerting";
import { z } from "zod";

const listPromptSchema = z.object({
  priceUsdCents: z.number()
    .int()
    .min(0, 'Price cannot be negative')
    .max(999999, 'Maximum price is $9,999.99')
    .refine(
      (val) => val === 0 || val >= 5,
      { message: 'Price must be $0 (free) or at least $0.05 to cover transaction costs' }
    ),
  licenseType: z.enum(['personal', 'commercial', 'exclusive']),
  description: z.string().max(2000).optional(),
  category: z.string().max(100).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: promptId } = await params;

    // Parse request body
    const body = await request.json();
    const validation = listPromptSchema.safeParse(body);

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

    const { priceUsdCents, licenseType, description, category } = validation.data;

    // Additional business logic validation
    // Personal license limited to $100.00 for reasonable pricing
    if (priceUsdCents > 10000 && licenseType === 'personal') {
      return NextResponse.json(
        {
          success: false,
          error: 'Personal license is limited to $100.00. Use commercial or exclusive license for higher prices.'
        },
        { status: 400 }
      );
    }

    // Determine if this is a free prompt
    const isFree = priceUsdCents === 0;

    // Authenticate user (REQUIRED for listing)
    const authUser = await requireAuth(request);

    // Rate limiting: max 10 listing operations per hour per user
    if (!checkRateLimit(authUser.userId, 'list', 10, 3600000)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please wait before listing another prompt.' },
        { status: 429 }
      );
    }

    // Verify prompt ownership
    const ownsPrompt = await verifyPromptOwnership(promptId, authUser.userId, storage);
    if (!ownsPrompt) {
      return NextResponse.json(
        { success: false, error: "You don't own this prompt or it doesn't exist" },
        { status: 403 }
      );
    }

    const prompt = await storage.getPrompt(promptId);
    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt not found" },
        { status: 404 }
      );
    }

    // Update prompt with marketplace fields
    // Free prompts are automatically categorized and don't require payment
    // Note: Some marketplace-specific fields (licenseType, isListed, etc.) may need to be stored in Supabase separately
    const updatedPrompt = await storage.updatePrompt(promptId, {
      price: priceUsdCents, // Schema uses 'price' field
      category,
      // Additional fields that don't exist in schema would need to be stored elsewhere
      // licenseType, isListed, listingStatus, etc. would be stored in Supabase marketplace_prompts table
    });

    if (!updatedPrompt) {
      return NextResponse.json(
        { success: false, error: "Failed to update prompt" },
        { status: 500 }
      );
    }

    // Update user earnings record (increment prompts listed count)
    const supabase = getSupabaseServerClient();

    // Use SQL increment to avoid race conditions
    const { error: earningsError } = await supabase.rpc('increment_user_prompts_listed', {
      p_user_id: authUser.userId,
    });

    if (earningsError) {
      console.error('Error updating user earnings (listing count):', {
        userId: authUser.userId,
        promptId,
        error: earningsError,
      });

      // Queue for reconciliation (this is less critical than purchase earnings)
      await queueReconciliation({
        taskType: 'earnings_update',
        entityId: promptId,
        entityType: 'user',
        payload: {
          userId: authUser.userId,
          operation: 'increment_listed_count',
          promptId,
        },
        maxAttempts: 3, // Fewer retries for listing count
      });

      // Send alert (lower severity than purchase earnings)
      await sendAlert('earnings_update_failed', {
        severity: 'medium',
        message: `Failed to update listed count for user ${authUser.userId}`,
        metadata: {
          userId: authUser.userId,
          promptId,
          operation: 'listing',
          error: earningsError instanceof Error ? earningsError.message : String(earningsError),
        },
      });

      // Don't fail the request - listing succeeded, just stats update failed
      console.warn('⚠️  Listed count reconciliation queued. Listing succeeded but stats not updated.');
    }

    return NextResponse.json({
      success: true,
      prompt: {
        id: updatedPrompt.id,
        title: updatedPrompt.title,
        price: updatedPrompt.price || priceUsdCents,
        // Note: licenseType and listing metadata would come from Supabase marketplace_prompts table
      },
      message: 'Prompt listed successfully'
    });

  } catch (error) {
    console.error('Error listing prompt:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}