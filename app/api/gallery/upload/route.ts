import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { createErrorResponse, createSuccessResponse } from "../../../middleware/validation";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

/**
 * Validates file type and size
 */
function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: PNG, JPEG, WebP`
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 10MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    };
  }

  return { valid: true };
}

/**
 * Uploads image file to blob storage
 */
async function uploadToBlob(file: File, userId: string): Promise<string> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  
  // Convert File to Buffer (works in both browser and Node.js)
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  if (!blobToken) {
    console.warn('⚠️ BLOB_READ_WRITE_TOKEN not set, using data URL fallback');
    // Return a data URL as fallback for development (Node.js compatible)
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;
    return dataUrl;
  }

  try {
    const { put } = await import('@vercel/blob');
    
    // Create unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    const extension = file.name.split('.').pop() || 'png';
    const filename = `gallery/${userId}/${timestamp}_${randomSuffix}.${extension}`;

    // Upload to Vercel Blob
    const { url } = await put(filename, buffer, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false
    });

    console.log(`✅ Image uploaded to blob storage: ${url}`);
    return url;
  } catch (error: any) {
    console.error('❌ Failed to upload to blob storage:', error);
    throw new Error(`Failed to upload image: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Sanitizes user input string
 */
function sanitizeString(input: string | null | undefined, maxLength: number = 1000): string {
  if (!input) return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove potential HTML tags
}

export async function POST(req: NextRequest) {
  try {
    // Parse FormData
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string | null;
    const prompt = formData.get('prompt') as string | null;
    const metadata = formData.get('metadata') as string | null;

    // Validate required fields
    if (!file) {
      return createErrorResponse('File is required', 400);
    }

    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      return createErrorResponse('userId is required', 400);
    }

    // Validate file
    const fileValidation = validateFile(file);
    if (!fileValidation.valid) {
      return createErrorResponse(fileValidation.error || 'Invalid file', 400);
    }

    // Sanitize optional fields
    const sanitizedPrompt = sanitizeString(prompt, 2000);
    const sanitizedMetadata = metadata ? sanitizeString(metadata, 5000) : null;

    // Upload image to blob storage
    console.log(`📤 Uploading image for user ${userId}...`);
    const imageUrl = await uploadToBlob(file, userId);

    // Prepare generation data
    const nowIso = new Date().toISOString();
    const generationData: any = {
      user_id: userId,
      prompt_id: null, // No prompt ID for uploaded images
      final_prompt: sanitizedPrompt || null,
      variable_values: [],
      settings: {
        origin: 'uploaded',
        uploadedAt: nowIso,
        ...(sanitizedMetadata ? { metadata: JSON.parse(sanitizedMetadata) } : {})
      },
      transaction_hash: null,
      payment_verified: true, // Uploads are free
      amount_paid: null,
      status: 'uploaded',
      image_urls: [imageUrl],
      completed_at: nowIso,
      created_at: nowIso,
      updated_at: nowIso
    };

    // Store in database
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('generations')
      .insert([generationData])
      .select('id, user_id, status, image_urls, created_at')
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return createErrorResponse('Failed to create gallery entry', 500, error.message);
    }

    console.log(`✅ Gallery entry created: ${data.id}`);

    return createSuccessResponse({
      success: true,
      imageUrl: imageUrl,
      galleryItemId: data.id,
      message: 'Image uploaded successfully'
    }, 201);

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('❌ Upload error:', message);
    return createErrorResponse('Internal server error', 500, message);
  }
}

