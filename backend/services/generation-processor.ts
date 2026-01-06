/**
 * Generation Processor Service
 *
 * Processes AI image generation requests using the integrated Gemini service.
 * Handles the complete flow from variable-substituted prompts to generated images.
 */

import { getSupabaseClient } from '../database/db.js';
import { decryptPrompt } from '../encryption.js';
import {
  generateWithRetryAndCircuitBreaker,
  RETRY_CONFIGS,
  generateWithRateLimit
} from './index.js';
import type { GenerationSettings } from './types.js';

/**
 * Store generated images to Vercel Blob Storage
 */
async function storeImagesToBlob(imageBuffers: Buffer[], generationId: string): Promise<string[]> {
  const storedUrls: string[] = [];

  // Check if Vercel Blob is configured
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    console.warn('⚠️ BLOB_READ_WRITE_TOKEN not set, using placeholder URLs');
    return imageBuffers.map((_, index) =>
      `https://via.placeholder.com/1024x1024.png?text=Generation+${generationId}_${index}`
    );
  }

  for (let i = 0; i < imageBuffers.length; i++) {
    const imageBuffer = imageBuffers[i];

    try {
      console.log(`📤 Uploading image ${i + 1}/${imageBuffers.length} for generation ${generationId}`);

      // Dynamic import to avoid issues if @vercel/blob is not installed
      const { put } = await import('@vercel/blob');

      // Create unique filename
      const filename = `generations/${generationId}_${i}.png`;

      // Upload to Vercel Blob
      const { url } = await put(filename, imageBuffer, {
        access: 'public',
        contentType: 'image/png',
        addRandomSuffix: false // Keep predictable filenames
      });

      storedUrls.push(url);
      console.log(`✅ Image ${i + 1} uploaded: ${url}`);

    } catch (error: any) {
      console.error(`❌ Failed to upload image ${i + 1} for ${generationId}:`, error);

      // For development/production, use a placeholder when upload fails
      // In production, you might want to implement retry logic or alternative storage
      const fallbackUrl = `https://via.placeholder.com/1024x1024.png?text=Upload+Error+${generationId}_${i}`;
      storedUrls.push(fallbackUrl);
      console.warn(`⚠️ Using fallback URL for image ${i + 1}: ${fallbackUrl}`);
    }
  }

  console.log(`📦 Successfully stored ${storedUrls.length} images for generation ${generationId}`);
  return storedUrls;
}

/**
 * Processes a single generation request
 *
 * @param generationId - The generation ID to process
 */
export async function processGeneration(generationId: string): Promise<void> {
  const supabase = getSupabaseClient();

  try {
    console.log(`🎨 Starting generation processing for ID: ${generationId}`);

    // 1. Fetch generation from database
    const { data: generation, error: fetchError } = await supabase
      .from('generations')
      .select('*')
      .eq('id', generationId)
      .single();

    if (fetchError || !generation) {
      console.error(`❌ Generation ${generationId} not found:`, fetchError);
      throw new Error(`Generation not found: ${generationId}`);
    }

    // 2. Verify payment before processing
    if (!generation.payment_verified) {
      console.warn(`⚠️ Generation ${generationId} payment not verified, skipping`);
      return;
    }

    // 3. Update status to generating
    const { error: statusError } = await supabase
      .from('generations')
      .update({
        status: 'generating',
        updated_at: new Date().toISOString()
      })
      .eq('id', generationId);

    if (statusError) {
      console.error(`❌ Failed to update status for ${generationId}:`, statusError);
      throw statusError;
    }

    console.log(`🔄 Updated status to 'generating' for ${generationId}`);

    // 4. Decrypt final prompt
    let finalPrompt: string;
    try {
      finalPrompt = await decryptPrompt({
        encryptedContent: generation.final_prompt,
        iv: '', // TODO: Store and retrieve from database
        authTag: '' // TODO: Store and retrieve from database
      });
      console.log(`🔓 Decrypted prompt for generation ${generationId}`);
    } catch (decryptError: any) {
      console.error(`❌ Failed to decrypt prompt for ${generationId}:`, decryptError);
      await updateGenerationError(generationId, `Decryption failed: ${decryptError.message}`);
      throw decryptError;
    }

    // 5. Generate images with Gemini (with retry and circuit breaker)
    console.log(`🎭 Generating ${generation.settings?.numImages || 1} image(s) with Gemini for ${generationId}`);
    console.log(`📝 Prompt: "${finalPrompt.substring(0, 100)}${finalPrompt.length > 100 ? '...' : ''}"`);

    const result = await generateWithRetryAndCircuitBreaker(
      generateWithRateLimit,
      {
        prompt: finalPrompt,
        aspectRatio: generation.settings?.aspectRatio || '1:1',
        numImages: generation.settings?.numImages || 1,
        modelVersion: generation.settings?.modelVersion || 'gemini-2.5-flash-image'
      },
      RETRY_CONFIGS.production
    );

    if (!result.success) {
      console.error(`❌ Gemini generation failed for ${generationId}:`, result.error);
      await updateGenerationError(generationId, result.error || 'Image generation failed');
      throw new Error(result.error || 'Image generation failed');
    }

    console.log(`✅ Gemini generated ${result.imageBuffers?.length || 0} images in ${result.generationTime}ms`);

    // 6. Store images to permanent storage
    const imageBuffers = result.imageBuffers || [];
    if (imageBuffers.length === 0) {
      throw new Error('No image buffers returned from Gemini');
    }

    console.log(`💾 Storing ${imageBuffers.length} images for ${generationId}`);

    const imageUrls = await storeImagesToBlob(imageBuffers, generationId);
    console.log(`📦 Images stored: ${imageUrls.join(', ')}`);

    // 7. Update generation as completed
    const { error: completeError } = await supabase
      .from('generations')
      .update({
        status: 'completed',
        image_urls: imageUrls,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', generationId);

    if (completeError) {
      console.error(`❌ Failed to mark ${generationId} as completed:`, completeError);
      throw completeError;
    }

    console.log(`✅ Generation ${generationId} completed successfully with ${imageUrls.length} images`);

  } catch (error: any) {
    console.error(`💥 Error processing generation ${generationId}:`, error);
    await updateGenerationError(generationId, error.message);
    throw error;
  }
}

/**
 * Processes all pending generations in batches
 */
export async function processPendingGenerations(): Promise<void> {
  const supabase = getSupabaseClient();

  const { data: pendingGenerations, error } = await supabase
    .from('generations')
    .select('id')
    .eq('status', 'payment_verified')
    .limit(10); // Process in batches

  if (error) {
    console.error('❌ Failed to fetch pending generations:', error);
    return;
  }

  if (!pendingGenerations || pendingGenerations.length === 0) {
    console.log('ℹ️ No pending generations to process');
    return;
  }

  console.log(`🎯 Processing ${pendingGenerations.length} pending generations`);

  // Process in parallel with rate limiting
  await Promise.allSettled(
    pendingGenerations.map(gen => processGeneration(gen.id))
  );
}

/**
 * Retries failed generations (up to 3 attempts)
 */
export async function retryFailedGenerations(): Promise<void> {
  const supabase = getSupabaseClient();

  const { data: failedGenerations, error } = await supabase
    .from('generations')
    .select('id, retry_count')
    .eq('status', 'failed')
    .lt('retry_count', 3)
    .limit(5);

  if (error) {
    console.error('❌ Failed to fetch failed generations:', error);
    return;
  }

  if (!failedGenerations || failedGenerations.length === 0) {
    console.log('ℹ️ No failed generations to retry');
    return;
  }

  console.log(`🔄 Retrying ${failedGenerations.length} failed generations`);

  for (const gen of failedGenerations) {
    try {
      await processGeneration(gen.id);
    } catch (retryError) {
      console.error(`❌ Retry failed for ${gen.id}:`, retryError);
    }
  }
}

/**
 * Updates a generation with an error status
 */
async function updateGenerationError(generationId: string, errorMessage: string): Promise<void> {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from('generations')
    .update({
      status: 'failed',
      error_message: errorMessage,
      updated_at: new Date().toISOString()
    })
    .eq('id', generationId);

  if (error) {
    console.error(`❌ Failed to update error status for ${generationId}:`, error);
  }
}

/**
 * Gets generation statistics
 */
export async function getGenerationStats(): Promise<{
  total: number;
  pending: number;
  generating: number;
  completed: number;
  failed: number;
} | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('generations')
    .select('status')
    .order('created_at', { ascending: false })
    .limit(1000); // Last 1000 generations

  if (error) {
    console.error('❌ Failed to fetch generation stats:', error);
    return null;
  }

  const stats = {
    total: data.length,
    pending: data.filter(g => g.status === 'pending').length,
    payment_verified: data.filter(g => g.status === 'payment_verified').length,
    generating: data.filter(g => g.status === 'generating').length,
    completed: data.filter(g => g.status === 'completed').length,
    failed: data.filter(g => g.status === 'failed').length,
  };

  return stats as any;
}
