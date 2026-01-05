// app/api/generations/route.ts
import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { getSupabaseServerClient } from "@/app/lib/supabaseServer";
import { substituteVariables } from "@/backend/services/variable-substitution";
import { encryptPrompt } from "@/backend/encryption";
import { verifyPayment, distributePlatformFee, calculateTotalWithFee } from "@/backend/services/payment-verification";
import {
  createGenerationSchema,
  getGenerationsQuerySchema,
  validateBody,
  validateQuery,
  createErrorResponse,
  createSuccessResponse
} from "@/app/middleware/validation";

export async function GET(req: Request) {
  // Skip execution during build
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      !process.env.DATABASE_URL;
  
  if (isBuildTime) {
    return createSuccessResponse({ generations: [], total: 0, limit: 20, offset: 0 });
  }

  try {
    const { searchParams } = new URL(req.url);

    // Validate query parameters
    const queryParams = Object.fromEntries(searchParams.entries());
    const queryValidation = validateQuery(getGenerationsQuerySchema, queryParams);
    if (!queryValidation.success) {
      const errorMessages = queryValidation.errorMessages;
      return createErrorResponse('Invalid query parameters', 400, errorMessages);
    }

    const queryData = queryValidation.data as { limit: number; offset: number; status?: string };
    const limit = queryData.limit ?? 20;
    const offset = queryData.offset ?? 0;
    const userId = searchParams.get("userId");

    if (!userId) {
      return createErrorResponse('userId is required', 400);
    }

    const supabase = getSupabaseServerClient();
    const { data, error, count } = await supabase
      .from("generations")
      .select("*", { count: 'exact' })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset || 0, (offset || 0) + (limit || 20) - 1);

    if (error) {
      console.error('Database error:', error);
      return createErrorResponse('Failed to fetch generations', 500, error.message);
    }

    return createSuccessResponse({
      generations: Array.isArray(data) ? data : [],
      total: count || 0,
      limit,
      offset
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('Error fetching generations:', message);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function POST(req: Request) {
  // Skip execution during build
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      !process.env.DATABASE_URL;
  
  if (isBuildTime) {
    return createErrorResponse('Build time - route not executable', 503);
  }

  try {
    const body = await req.json();

    // Validate request body
    const validation = validateBody(createGenerationSchema, body);
    if (!validation.success) {
      const errorMessages = validation.errorMessages;
      return createErrorResponse('Validation failed', 400, errorMessages);
    }

    const {
      promptId,
      variableValues,
      settings,
      userId,
      transactionHash
    } = validation.data;

    if (!userId) {
      return createErrorResponse('userId is required', 400);
    }

    // 2. Fetch prompt from database to get template and variable definitions
    const supabase = getSupabaseServerClient();
    const { data: promptData, error: promptError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', promptId)
      .single();

    if (promptError || !promptData) {
      return createErrorResponse('Prompt not found', 404);
    }

    // Type assertion for prompt data
    const prompt = promptData as any;

    // 3. Substitute variables
    const substitution = await substituteVariables(
      prompt.template || prompt.content || '',
      variableValues,
      prompt.variables || [] // Variable definitions from prompt
    );

    if (!substitution.success) {
      return createErrorResponse('Variable substitution failed', 400, substitution.errors);
    }

    // 4. Encrypt final prompt for storage
    const encryptedFinalPrompt = encryptPrompt(substitution.finalPrompt!);

    // 5. Prepare generation data
    const generationData = {
      user_id: userId,
      prompt_id: promptId,
      final_prompt: encryptedFinalPrompt.encrypted,
      final_prompt_iv: encryptedFinalPrompt.iv,
      final_prompt_auth_tag: encryptedFinalPrompt.authTag,
      variable_values: variableValues,
      settings: settings || {},
      transaction_hash: transactionHash || null,
      payment_verified: !transactionHash, // For now, assume free if no transaction hash
      amount_paid: null, // TODO: Get from prompt price when payment verification is implemented
      status: 'payment_verified', // TODO: Implement proper payment verification flow
      image_urls: [],
    };

    // 6. Store in database
    const { data: insertedData, error } = await supabase
      .from('generations')
      .insert([generationData] as any)
      .select('id, user_id, prompt_id, status, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return createErrorResponse('Failed to create generation', 500, error.message);
    }

    if (!insertedData) {
      return createErrorResponse('Failed to create generation - no data returned', 500);
    }

    const insertedGeneration = insertedData as any;

    // 7. Handle payment verification
    let paymentVerified = false;
    let amountPaid: string | null = null;

    if (transactionHash) {
      console.log(`💳 Verifying payment for generation ${insertedGeneration.id}...`);

      // Fetch prompt from database to get price and creator address
      const { data: promptDataForPayment, error: promptError } = await supabase
        .from('prompts')
        .select('price, creator_address, user_id')
        .eq('id', promptId)
        .single();

      if (promptError || !promptDataForPayment) {
        console.error('Failed to fetch prompt:', promptError);
        return createErrorResponse('Prompt not found', 404);
      }

      // Type assertion for prompt payment data
      const promptPayment = promptDataForPayment as any;

      // Get expected amount from prompt price (default to 0 if not set)
      const expectedAmount = promptPayment.price ? promptPayment.price.toString() : '0';
      const recipientAddress = promptPayment.creator_address || promptPayment.user_id;

      if (!recipientAddress) {
        return createErrorResponse('Creator address not found for prompt', 400);
      }

      const verification = await verifyPayment(
        transactionHash,
        expectedAmount,
        recipientAddress,
        process.env.NODE_ENV !== 'production' // Use testnet in development
      );

      if (!verification.verified) {
        console.error(`❌ Payment verification failed for ${insertedGeneration.id}:`, verification.error);

        // Update generation with failed payment status
        await supabase
          .from('generations')
          // @ts-ignore - Supabase types not fully configured
          .update({
            payment_verified: false,
            error_message: `Payment verification failed: ${verification.error}`,
            status: 'failed',
            updated_at: new Date().toISOString()
          } as any)
          .eq('id', insertedGeneration.id);

        return createErrorResponse('Payment verification failed', 402, verification.error);
      }

      console.log(`✅ Payment verified for generation ${insertedGeneration.id}: ${verification.amountPaid} LYX`);
      paymentVerified = true;
      amountPaid = verification.amountPaid!;

      // Distribute platform fee (async, don't block response)
      distributePlatformFee(insertedGeneration.id, amountPaid, process.env.NODE_ENV !== 'production')
        .then(result => {
          if (result.success) {
            console.log(`✅ Platform fee distributed for generation ${insertedGeneration.id}: ${result.feeAmount} LYX`);
          } else {
            console.error(`⚠️ Platform fee distribution failed for ${insertedGeneration.id}:`, result.error);
          }
        })
        .catch(error => {
          console.error(`💥 Platform fee distribution error for ${insertedGeneration.id}:`, error);
        });

    } else {
      // Free generation
      console.log(`🆓 Free generation ${insertedGeneration.id} - no payment required`);
      paymentVerified = true;
    }

    // 7. Update generation with payment status and trigger processing
    await supabase
      .from('generations')
      // @ts-ignore - Supabase types not fully configured
      .update({
        payment_verified: paymentVerified,
        amount_paid: amountPaid,
        status: paymentVerified ? 'payment_verified' : 'pending',
        updated_at: new Date().toISOString()
      } as any)
      .eq('id', insertedGeneration.id);

    console.log(`🚀 Generation ${insertedGeneration.id} ready for processing (payment: ${paymentVerified ? 'verified' : 'pending'})`);

    // 7. Trigger background processing asynchronously
    // This will be picked up by the generation worker
    console.log(`🚀 Generation ${insertedGeneration.id} ready for background processing`);

    // 8. Return generation ID and status
    return createSuccessResponse({
      success: true,
      generationId: insertedGeneration.id,
      status: insertedGeneration.status,
      message: 'Generation created and variables substituted successfully'
    }, 201);

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('Generation creation error:', message);
    return createErrorResponse('Internal server error', 500);
  }
}

// Get generation statistics - removed as GET_STATS is not a valid Next.js route handler
// Use GET with ?stats=true query parameter instead

// Legacy support - redirect old API calls
export async function DELETE(req: Request) {
  return createErrorResponse("DELETE method not supported for enhanced generations API", 405);
}
