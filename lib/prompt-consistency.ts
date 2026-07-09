/**
 * Prompt Consistency Utilities
 * Handles consistency checks between the prompts table and Supabase purchases.
 *
 * NOTE (de-mongo): the marketplace listing fields the old MongoDB docs carried
 * (isListed / listingStatus / priceUsdCents / totalSales) do NOT exist as
 * columns on the live Supabase `prompts` table. Post-consolidation a prompt is
 * considered available for purchase iff its row exists; price comes from the
 * real `prompts.price` column. See the de-mongo PR body for the flagged
 * column dependencies the founder must confirm.
 */

import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { getPromptById, type DbPrompt } from '@/lib/prompts-db';

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
 * A prompt enriched with the marketplace-derived fields the purchase flow reads.
 * `priceUsdCents` is derived from the real `prompts.price` column.
 */
export type PurchasePrompt = DbPrompt & { priceUsdCents: number };

function toPurchasePrompt(prompt: DbPrompt): PurchasePrompt {
  return { ...prompt, priceUsdCents: prompt.price };
}

/**
 * Validate prompt exists and is available for purchase
 * Throws error if prompt is invalid
 */
export async function validatePromptForPurchase(
  promptId: string,
  userId: string
): Promise<{
  prompt: PurchasePrompt;
  alreadyPurchased: boolean;
  existingPurchaseId?: string;
}> {
  const supabase = getSupabaseServerClient();

  // Check 1: Prompt exists
  const dbPrompt = await getPromptById(supabase, promptId);
  if (!dbPrompt) {
    throw new Error('Prompt not found or has been deleted');
  }
  const prompt = toPurchasePrompt(dbPrompt);

  // Check 2: availability — a prompt row existing is treated as listed
  // (Supabase has no unlist mechanism; see file header note).

  // Check 3: Valid price (free prompts take the priceUsdCents === 0 branch
  // in the purchase route; a negative price is invalid).
  if (prompt.priceUsdCents < 0) {
    throw new Error('Invalid prompt price');
  }

  // Check 4: User hasn't already purchased (idempotency)
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
  const supabase = getSupabaseServerClient();
  const prompt = await getPromptById(supabase, promptId);
  if (!prompt) {
    throw new Error('Prompt was deleted before purchase could be completed. Please refresh and try again.');
  }
  // Availability: an existing prompt row is considered available (see header).
}

/**
 * Final validation right before recording purchase in database
 * This is the LAST check to prevent race condition where creator unlists during payment
 * Should be called immediately before database write operations
 */
export async function validateListingStatusBeforePurchase(promptId: string): Promise<{
  isValid: boolean;
  error?: string;
  prompt?: PurchasePrompt;
}> {
  try {
    const supabase = getSupabaseServerClient();
    const dbPrompt = await getPromptById(supabase, promptId);

    if (!dbPrompt) {
      return {
        isValid: false,
        error: 'Prompt was deleted before purchase could be completed',
      };
    }

    // Availability: an existing prompt row is considered available (see header).
    return {
      isValid: true,
      prompt: toPurchasePrompt(dbPrompt),
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
 * Check consistency between the prompts table and Supabase purchases
 * Returns inconsistencies found
 */
export async function checkPromptConsistency(promptId: string): Promise<{
  promptExists: boolean;
  purchaseCount: number;
  inconsistencies: string[];
}> {
  const inconsistencies: string[] = [];

  const supabase = getSupabaseServerClient();
  const prompt = await getPromptById(supabase, promptId);
  const promptExists = !!prompt;

  const purchaseCount = await getPromptPurchaseCount(promptId);

  // Identify inconsistencies
  if (!promptExists && purchaseCount > 0) {
    inconsistencies.push(`Prompt deleted but ${purchaseCount} purchase(s) still exist`);
  }

  return {
    promptExists,
    purchaseCount,
    inconsistencies,
  };
}