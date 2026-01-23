import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { decryptPrompt } from "@/backend/encryption";
import {
  updateGenerationSchema,
  validateBody,
  createErrorResponse,
  createSuccessResponse,
  isValidUUID
} from "../../../middleware/validation";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { searchParams } = new URL(req.url);
  const shouldDecrypt = searchParams.get('decrypt') === 'true';

  if (!isUuid(id)) {
    return NextResponse.json({ error: "Invalid generation ID" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("generations")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Generation not found" }, { status: 404 });

    // Build response
    const response: any = {
      id: data.id,
      userId: data.user_id,
      promptId: data.prompt_id,
      status: data.status,
      variableValues: data.variable_values,
      settings: data.settings,
      imageUrls: data.image_urls,
      paymentVerified: data.payment_verified,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      completedAt: data.completed_at,
      errorMessage: data.error_message,
    };

    // Optionally decrypt final prompt
    if (shouldDecrypt && data.final_prompt) {
      try {
        const decryptedPrompt = await decryptPrompt({
          encryptedContent: data.final_prompt,
          iv: '', // TODO: Store and retrieve from database
          authTag: '' // TODO: Store and retrieve from database
        });
        response.finalPrompt = decryptedPrompt;
      } catch (decryptError: any) {
        console.warn('Failed to decrypt prompt:', decryptError.message);
        // Don't fail the request, just omit the decrypted prompt
      }
    }

    return NextResponse.json(response);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('Error fetching generation:', message);
    return NextResponse.json({
      error: 'Failed to fetch generation',
      details: message
    }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!isValidUUID(id)) {
    return createErrorResponse('Invalid generation ID', 400);
  }

  try {
    const body = await req.json();

    // Validate request body
    const validation = validateBody(updateGenerationSchema, body);
    if (!validation.success) {
      const errorMessages = validation.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`);
      return createErrorResponse('Validation failed', 400, errorMessages);
    }

    const { status, imageUrls, errorMessage, completedAt } = validation.data;

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (status) updateData.status = status;
    if (imageUrls !== undefined) updateData.image_urls = imageUrls;
    if (errorMessage !== undefined) updateData.error_message = errorMessage;
    if (completedAt) updateData.completed_at = completedAt;

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("generations")
      .update(updateData)
      .eq("id", id)
      .select('id, status, updated_at, image_urls, error_message, completed_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return createErrorResponse('Failed to update generation', 500, error.message);
    }

    return createSuccessResponse({
      success: true,
      generation: data
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('Error updating generation:', message);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "Invalid generation ID" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("generations").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({
      error: 'Failed to delete generation',
      details: e instanceof Error ? e.message : String(e)
    }, { status: 500 });
  }
}
