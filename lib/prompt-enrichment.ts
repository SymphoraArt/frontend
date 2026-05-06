/**
 * Prompt Enrichment Utilities
 * Fetches prompt metadata from MongoDB to enrich database queries
 */

import { storage } from '@/backend/storage';

export interface PromptMetadata {
  id: string;
  title: string;
  description?: string;
  previewImage?: string;
}

/**
 * Fetch prompt metadata from MongoDB
 * Returns null if prompt not found, never throws
 */
export async function getPromptMetadata(promptId: string): Promise<PromptMetadata | null> {
  try {
    const prompt = await storage.getPrompt(promptId);
    if (!prompt) {
      return null;
    }

    return {
      id: promptId,
      title: prompt.title || `Prompt ${promptId.slice(-8)}`,
      description: undefined, // Description would come from Supabase marketplace_prompts table
      previewImage: prompt.previewImageUrl, // Using previewImageUrl from schema
    };
  } catch (error) {
    console.error(`Failed to fetch prompt metadata for ${promptId}:`, error);
    return null;
  }
}

/**
 * Batch fetch prompt metadata for multiple prompts
 * More efficient than individual calls
 */
export async function batchGetPromptMetadata(
  promptIds: string[]
): Promise<Map<string, PromptMetadata>> {
  const results = new Map<string, PromptMetadata>();

  // Fetch all prompts in parallel
  const promises = promptIds.map(async (promptId) => {
    const metadata = await getPromptMetadata(promptId);
    if (metadata) {
      results.set(promptId, metadata);
    }
  });

  await Promise.all(promises);
  return results;
}

/**
 * Get prompt title with fallback
 */
export async function getPromptTitle(promptId: string): Promise<string> {
  const metadata = await getPromptMetadata(promptId);
  return metadata?.title || `Prompt ${promptId.slice(-8)}`;
}

/**
 * Enrich array of objects with prompt titles
 * Adds 'title' field to each object based on 'prompt_id' field
 */
export async function enrichWithPromptTitles<T extends { prompt_id: string }>(
  items: T[]
): Promise<Array<T & { title: string }>> {
  if (!items || items.length === 0) {
    return [];
  }

  const promptIds = items.map((item) => item.prompt_id);
  const metadataMap = await batchGetPromptMetadata(promptIds);

  return items.map((item) => {
    const metadata = metadataMap.get(item.prompt_id);
    return {
      ...item,
      title: metadata?.title || `Prompt ${item.prompt_id.slice(-8)}`,
    };
  });
}
