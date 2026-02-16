// app/api/generations/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { connectDB } from "@/backend/db-mysql";
import { getSymphoraPromptById } from "@/backend/storage-symphora";
import { substituteVariables } from "@/backend/services/variable-substitution";
import { encryptPrompt } from "@/backend/encryption";
import {
  createGenerationSchema,
  getGenerationsQuerySchema,
  validateBody,
  validateQuery,
  createErrorResponse,
  createSuccessResponse
} from "../../middleware/validation";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Validate query parameters
    const queryValidation = validateQuery(getGenerationsQuerySchema, searchParams);
    if (!queryValidation.success) {
      const errorMessages = queryValidation.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`);
      return createErrorResponse('Invalid query parameters', 400, errorMessages);
    }

    const { limit = 50, offset = 0 } = queryValidation.data;
    // Support both userKey (legacy) and userId
    const userId = searchParams.get("userId") || searchParams.get("userKey");

    if (!userId) {
      return createErrorResponse('userId or userKey is required', 400);
    }

    const supabase = getSupabaseServerClient();
    const { data, error, count } = await supabase
      .from("generations")
      .select("*", { count: 'exact' })
      .eq("user_key", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

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
  try {
    const url = new URL(req.url);
    const urlUserId = url.searchParams.get("userId")?.trim() || url.searchParams.get("userKey")?.trim();
    const urlPromptId = url.searchParams.get("promptId")?.trim();

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      body = {};
    }
    if (typeof body !== "object" || body === null) body = {};

    const bodyObj = body as Record<string, unknown>;
    if (urlPromptId && (bodyObj.promptId == null || bodyObj.promptId === "")) {
      bodyObj.promptId = urlPromptId;
    }
    if (urlUserId && (bodyObj.userId == null || bodyObj.userId === "") && (bodyObj.userKey == null || bodyObj.userKey === "")) {
      bodyObj.userId = urlUserId;
    }
    if (bodyObj.variableValues == null && bodyObj.promptId != null) {
      bodyObj.variableValues = [];
    }
    if (bodyObj.settings == null && bodyObj.promptId != null) {
      bodyObj.settings = {};
    }

    const headerUserId = req.headers.get("x-user-id")?.trim();

    const validation = validateBody(createGenerationSchema, bodyObj);
    if (!validation.success) {
      const errorMessages = validation.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`);
      console.error("[POST /api/generations] Validation failed:", errorMessages);
      return createErrorResponse('Validation failed', 400, errorMessages);
    }

    const {
      userId: bodyUserId,
      userKey: bodyUserKey,
      promptId,
      encryptedPrompt: bodyEncryptedPrompt,
      iv: bodyIv,
      authTag: bodyAuthTag,
      variableValues,
      settings,
      transactionHash
    } = validation.data;

    const userId = (bodyUserId ?? bodyUserKey ?? headerUserId ?? urlUserId ?? "").trim();
    if (!userId) {
      console.error("[POST /api/generations] Missing userId");
      return createErrorResponse('userId or userKey is required (send in body, X-User-Id header, or ?userId= query)', 400);
    }

    let encryptedContent = bodyEncryptedPrompt;
    let iv = bodyIv ?? "";
    let authTag = bodyAuthTag ?? "";
    let variableDefinitions: any[] = [];

    if (!encryptedContent && promptId) {
      await connectDB();
      const symphoraPrompt = await getSymphoraPromptById(String(promptId));
      if (symphoraPrompt?.promptData?.segments?.[0]?.content) {
        const seg = symphoraPrompt.promptData.segments[0].content as { encrypted?: string; iv?: string; authTag?: string };
        encryptedContent = seg.encrypted ?? "";
        iv = seg.iv ?? "";
        authTag = seg.authTag ?? "";
      }
      if (symphoraPrompt?.promptData?.variables) {
        variableDefinitions = symphoraPrompt.promptData.variables;
      }
      if (!encryptedContent && !symphoraPrompt) {
        console.error("[POST /api/generations] Prompt not found for promptId:", promptId);
        return createErrorResponse('Prompt not found', 400, [`No prompt found for promptId: ${promptId}. Check that the prompt exists in the database.`]);
      }
    }
    if (!encryptedContent) {
      console.error("[POST /api/generations] No encrypted content for promptId:", promptId);
      return createErrorResponse('Prompt content not found', 400, ['Prompt has no encrypted content. Provide encryptedPrompt or use a valid promptId.']);
    }

    // Decrypt only here for variable substitution when generating the image (no other access to prompt content)
    const substitution = await substituteVariables(
      { encryptedContent, iv, authTag },
      variableValues,
      variableDefinitions
    );

    if (!substitution.success) {
      console.error("[POST /api/generations] Variable substitution failed:", substitution.errors);
      return createErrorResponse('Variable substitution failed', 400, substitution.errors);
    }

    // 3. Encrypt final prompt for storage
    const encryptedFinalPrompt = encryptPrompt(substitution.finalPrompt!);

    // 4. Prepare generation data (userId already validated above)
    // Supabase generations table uses user_key (README schema); add columns via migration if missing
    const generationData: Record<string, unknown> = {
      user_key: userId,
      prompt_id: promptId,
      final_prompt: encryptedFinalPrompt.encryptedContent,
      final_prompt_iv: encryptedFinalPrompt.iv,
      final_prompt_auth_tag: encryptedFinalPrompt.authTag,
      variable_values: variableValues,
      settings: settings ?? {},
      transaction_hash: transactionHash || null,
      payment_verified: !transactionHash,
      status: 'payment_verified',
      image_urls: [],
      image_url: '', // README schema has image_url NOT NULL; updated later via PATCH
      prompt: null,
      provider: null,
      meta: {},
    };

    // 5. Store in database
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('generations')
      .insert([generationData])
      .select('id, user_key, prompt_id, status, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return createErrorResponse('Failed to create generation', 500, error.message);
    }

    // 6. Trigger async processing for payment-verified generations
    if (validation.data.transactionHash) {
      // For now, assume payment verification is handled elsewhere
      // TODO: Integrate with payment verification service (Phase 2C)
      console.log(`💳 Generation ${data.id} created with transaction hash: ${validation.data.transactionHash}`);

      // Mark as payment verified for now (will be replaced with real verification)
      await supabase
        .from('generations')
        .update({
          payment_verified: true,
          status: 'payment_verified',
          updated_at: new Date().toISOString()
        })
        .eq('id', data.id);

      console.log(`✅ Marked generation ${data.id} as payment verified`);
    } else {
      // Free generation - mark as payment verified and trigger processing
      console.log(`🆓 Free generation ${data.id} - marking as payment verified`);
      await supabase
        .from('generations')
        .update({
          payment_verified: true,
          status: 'payment_verified',
          updated_at: new Date().toISOString()
        })
        .eq('id', data.id);
    }

    // 7. Trigger background processing asynchronously
    // This will be picked up by the generation worker
    console.log(`🚀 Generation ${data.id} ready for background processing`);

    // 7. Return generation ID and status
    return createSuccessResponse({
      success: true,
      generationId: data.id,
      status: data.status,
      message: 'Generation created and variables substituted successfully'
    }, 201);

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('Generation creation error:', message);
    return createErrorResponse('Internal server error', 500);
  }
}

// Get generation statistics
export async function GET_STATS(req: Request) {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('generations')
      .select('id, status, created_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) throw error;

    const stats = {
      total: data.length,
      byStatus: {
        pending: data.filter(g => g.status === 'pending').length,
        payment_verified: data.filter(g => g.status === 'payment_verified').length,
        generating: data.filter(g => g.status === 'generating').length,
        completed: data.filter(g => g.status === 'completed').length,
        failed: data.filter(g => g.status === 'failed').length,
      },
      recentActivity: data.slice(0, 10).map(g => ({
        id: g.id,
        status: g.status,
        createdAt: g.created_at
      }))
    };

    return createSuccessResponse(stats);
  } catch (error: any) {
    console.error('Error fetching generation stats:', error);
    return createErrorResponse('Failed to fetch statistics', 500);
  }
}

// Legacy support - redirect old API calls
export async function DELETE(req: Request) {
  return createErrorResponse("DELETE method not supported for enhanced generations API", 405);
}
