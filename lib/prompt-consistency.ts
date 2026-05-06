/**
 * Prompt Consistency Utilities
 * Handles consistency checks between MongoDB (prompts) and Supabase (purchases)
 */

import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { storage } from '@/backend/storage';

/**
 * Check if a prompt has any purchases
 */
export async function promptHasPurchases(promptId: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('prompt_purchases')
    .select('id')
    .eq('prompt_id', promptId)
    .eq('status', 'completed')
    .limit(1);

  if (error) {
    console.error('Error checking prompt purchases:', error);
    // On error, assume it has purchases to be safe
    return true;
  }

  return (data?.length || 0) > 0;
}

/**
 * Get purchase count for a prompt
 */
export async function getPromptPurchaseCount(promptId: string): Promise<number> {
  const supabase = getSupabaseServerClient();
  
  const { count, error } = await supabase
    .from('prompt_purchases')
    .select('*', { count: 'exact', head: true })
    .eq('prompt_id', promptId)
    .eq('status', 'completed');

  if (error) {
    console.error('Error counting prompt purchases:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Validate prompt exists and is available for purchase
 * Throws error if prompt is invalid
 */
export async function validatePromptForPurchase(
  promptId: string,
  userId: string
): Promise<{
  prompt: any;
  alreadyPurchased: boolean;
  existingPurchaseId?: string;
}> {
  // Check 1: Prompt exists in MongoDB
  const prompt = await storage.getPrompt(promptId);
  if (!prompt) {
    throw new Error('Prompt not found or has been deleted');
  }

  // Check 2: Prompt is listed and active
  const promptAny = prompt as any; // Type assertion for marketplace fields
  if (!promptAny.isListed || promptAny.listingStatus !== 'active') {
    throw new Error('Prompt is not available for purchase');
  }

  // Check 3: Valid price
  const priceUsdCents = promptAny.priceUsdCents || 0;
  if (priceUsdCents <= 0) {
    throw new Error('Invalid prompt price');
  }

  // Check 4: User hasn't already purchased (idempotency)
  const supabase = getSupabaseServerClient();
  const { data: existingPurchase } = await supabase
    .from('prompt_purchases')
    .select('id')
    .eq('prompt_id', promptId)
    .eq('buyer_id', userId)
    .eq('status', 'completed')
    .single();

  if (existingPurchase) {
    return {
      prompt,
      alreadyPurchased: true,
      existingPurchaseId: existingPurchase.id,
    };
  }

  return {
    prompt,
    alreadyPurchased: false,
  };
}

/**
 * Re-validate prompt exists right before recording purchase
 * Prevents race condition where prompt is deleted between check and purchase
 */
export async function revalidatePromptBeforePurchase(promptId: string): Promise<void> {
  const prompt = await storage.getPrompt(promptId);
  if (!prompt) {
    throw new Error('Prompt was deleted before purchase could be completed. Please refresh and try again.');
  }

  const promptAny = prompt as any; // Type assertion for marketplace fields
  if (!promptAny.isListed || promptAny.listingStatus !== 'active') {
    throw new Error('Prompt is no longer available for purchase');
  }
}

/**
 * Final validation right before recording purchase in database
 * This is the LAST check to prevent race condition where creator unlists during payment
 * Should be called immediately before database write operations
 */
export async function validateListingStatusBeforePurchase(promptId: string): Promise<{
  isValid: boolean;
  error?: string;
  prompt?: any;
}> {
  try {
    const prompt = await storage.getPrompt(promptId);
    
    if (!prompt) {
      return {
        isValid: false,
        error: 'Prompt was deleted before purchase could be completed',
      };
    }

    const promptAny = prompt as any; // Type assertion for marketplace fields
    if (!promptAny.isListed || promptAny.listingStatus !== 'active') {
      return {
        isValid: false,
        error: 'Prompt was unlisted during purchase. The prompt is no longer available for purchase.',
        prompt,
      };
    }

    return {
      isValid: true,
      prompt,
    };
  } catch (error) {
    console.error('Error validating listing status:', error);
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Failed to validate listing status',
    };
  }
}

/**
 * Check if prompt can be safely deleted
 * Returns true if no purchases exist, false otherwise
 */
export async function canDeletePrompt(promptId: string): Promise<{
  canDelete: boolean;
  purchaseCount: number;
  reason?: string;
}> {
  const purchaseCount = await getPromptPurchaseCount(promptId);

  if (purchaseCount > 0) {
    return {
      canDelete: false,
      purchaseCount,
      reason: `Cannot delete prompt: ${purchaseCount} purchase(s) exist. Unlist the prompt instead.`,
    };
  }

  return {
    canDelete: true,
    purchaseCount: 0,
  };
}

/**
 * Get all purchases for a prompt (for reconciliation)
 */
export async function getPromptPurchases(promptId: string): Promise<any[]> {
  const supabase = getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('prompt_purchases')
    .select('*')
    .eq('prompt_id', promptId)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching prompt purchases:', error);
    return [];
  }

  return data || [];
}

/**
 * Check consistency between MongoDB prompt and Supabase purchases
 * Returns inconsistencies found
 */
export async function checkPromptConsistency(promptId: string): Promise<{
  promptExists: boolean;
  purchaseCount: number;
  inconsistencies: string[];
}> {
  const inconsistencies: string[] = [];

  // Check MongoDB
  const prompt = await storage.getPrompt(promptId);
  const promptExists = !!prompt;

  // Check Supabase
  const purchaseCount = await getPromptPurchaseCount(promptId);

  // Identify inconsistencies
  if (!promptExists && purchaseCount > 0) {
    inconsistencies.push(`Prompt deleted but ${purchaseCount} purchase(s) still exist`);
  }

  const promptAny = prompt as any; // Type assertion for marketplace fields
  if (promptExists && promptAny.isListed && purchaseCount === 0 && promptAny.totalSales && promptAny.totalSales > 0) {
    inconsistencies.push('Prompt has sales count but no purchases in database');
  }

  return {
    promptExists,
    purchaseCount,
    inconsistencies,
  };
}