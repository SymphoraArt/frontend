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

    // Ownership check: X-Wallet-Address header must match userId in body
    const callerAddress = req.headers.get("X-Wallet-Address");
    if (!callerAddress) {
      return createErrorResponse('X-Wallet-Address header required', 401);
    }
    if (callerAddress.toLowerCase() !== userId.toLowerCase()) {
      return createErrorResponse('Forbidden', 403);
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

    // An upload belongs in generated_images, not generations.
    //
    // This used to insert into `generations` with final_prompt / status /
    // image_urls / payment_verified — none of which exist on that table any
    // more, so every upload failed with PGRST204. The live split is:
    //   generations      the generation record; prompt_id and the encrypted
    //                    prompt envelope are NOT NULL, so an upload (no prompt,
    //                    no generation) cannot be represented there at all
    //   generated_images the actual images, with generation_id optional and an
    //                    is_uploaded flag for exactly this case
    // Verified against the live schema before writing.
    const nowIso = new Date().toISOString();
    const generationData: Record<string, unknown> = {
      user_id: userId,
      generation_id: null,   // nothing generated it — the user brought it
      prompt_id: null,
      sequence_index: 0,
      storage_provider: 'vercel_blob',
      storage_url: imageUrl,
      mime_type: file.type || 'image/png',
      is_uploaded: true,
      is_watermarked: false,
      visibility: 'private',
      accepted: true,
      file_size_bytes: file.size ?? null,
      // The caption the user typed. Kept as the image's own description rather
      // than as a prompt: it never produced anything.
      description: sanitizedPrompt || null,
      title: sanitizedMetadata ? (JSON.parse(sanitizedMetadata)?.title ?? null) : null,
      created_at: nowIso,
    };

    // Store in database
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('generated_images')
      .insert([generationData])
      .select('id, user_id, storage_url, created_at')
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

