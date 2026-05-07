import { NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { requireAuth } from "@/lib/auth";
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
  } catch (error: unknown) {
    console.error('❌ Failed to upload to blob storage:', error);
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to upload image: ${message}`);
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

async function ensureUserIdForWallet(
  supabase: ReturnType<typeof getSupabaseServerClient>,
  walletAddress: string
): Promise<string | null> {
  const normalizedWallet = walletAddress.toLowerCase();
  const { data, error } = await supabase
    .from("user_wallets")
    .select("user_id")
    .eq("address", normalizedWallet)
    .is("removed_at", null)
    .maybeSingle();

  if (error) {
    console.error("Failed to resolve wallet user:", error);
    return null;
  }

  if (typeof data?.user_id === "string") return data.user_id;

  const userInsert = await supabase
    .from("users")
    .insert({})
    .select("id")
    .single();

  if (userInsert.error || !userInsert.data?.id) {
    console.error("Failed to create wallet user:", userInsert.error);
    return null;
  }

  const walletInsert = await supabase.from("user_wallets").insert({
    user_id: userInsert.data.id,
    address: normalizedWallet,
    chain_family: "evm",
    wallet_type: "external_eoa",
    is_primary: true,
  });

  if (!walletInsert.error) return userInsert.data.id;

  if (walletInsert.error.code === "23505") {
    const retry = await supabase
      .from("user_wallets")
      .select("user_id")
      .eq("address", normalizedWallet)
      .is("removed_at", null)
      .maybeSingle();
    return typeof retry.data?.user_id === "string" ? retry.data.user_id : null;
  }

  console.error("Failed to link wallet user:", walletInsert.error);
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);
    const supabase = getSupabaseServerClient();
    const userId = await ensureUserIdForWallet(supabase, authUser.walletAddress);
    if (!userId) {
      return createErrorResponse("Authenticated wallet is not linked to a user", 403);
    }

    // Parse FormData
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const prompt = formData.get('prompt') as string | null;
    const metadata = formData.get('metadata') as string | null;

    // Validate required fields
    if (!file) {
      return createErrorResponse('File is required', 400);
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
    const imageRow = {
      user_id: userId,
      generation_id: null,
      prompt_id: null,
      sequence_index: 0,
      storage_provider: imageUrl.startsWith("data:") ? "data_url" : "vercel_blob",
      storage_url: imageUrl,
      mime_type: file.type === "image/jpg" ? "image/jpeg" : file.type,
      is_uploaded: true,
      visibility: "private",
      description: sanitizedPrompt || null,
      title: sanitizedMetadata ? null : null,
      created_at: nowIso,
    };

    // Store in database
    const { data, error } = await supabase
      .from('generated_images')
      .insert([imageRow])
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
    if (message.startsWith("Authentication failed")) {
      return createErrorResponse("Unauthorized", 401);
    }
    console.error('❌ Upload error:', message);
    return createErrorResponse('Internal server error', 500);
  }
}

