/**
 * Consistency Validation Script
 * Checks for inconsistencies between MongoDB prompts and Supabase purchases
 */

import { getSupabaseServerClient } from '../../lib/supabaseServer.js';
import { storage } from '../storage.js';
import { checkPromptConsistency, getPromptPurchases } from '../../lib/prompt-consistency.js';

async function validateConsistency() {
  console.log('🔍 Consistency Validation');
  console.log('=========================');
  console.log('');

  const results = {
    orphanedPurchases: [] as string[],
    missingPrompts: [] as string[],
    inconsistencies: [] as string[],
  };

  try {
    const supabase = getSupabaseServerClient();

    // Get all completed purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('prompt_purchases')
      .select('prompt_id')
      .eq('status', 'completed');

    if (purchasesError) {
      console.error('Error fetching purchases:', purchasesError);
      return false;
    }

    console.log(`📊 Checking ${purchases?.length || 0} purchases for consistency...`);
    console.log('');

    // Check each purchase
    const uniquePromptIds = [...new Set((purchases || []).map((p: any) => p.prompt_id))];
    
    for (const promptId of uniquePromptIds) {
      const consistency = await checkPromptConsistency(promptId);
      
      if (consistency.inconsistencies.length > 0) {
        results.inconsistencies.push(...consistency.inconsistencies.map(i => `${promptId}: ${i}`));
        
        if (!consistency.promptExists && consistency.purchaseCount > 0) {
          results.orphanedPurchases.push(promptId);
          results.missingPrompts.push(promptId);
        }
      }
    }

    // Summary
    console.log('📊 Consistency Check Results');
    console.log('============================');
    console.log(`✅ Total purchases checked: ${uniquePromptIds.length}`);
    console.log(`❌ Orphaned purchases (prompt deleted): ${results.orphanedPurchases.length}`);
    console.log(`⚠️  Total inconsistencies: ${results.inconsistencies.length}`);
    console.log('');

    if (results.orphanedPurchases.length > 0) {
      console.log('🔴 Orphaned Purchases (Prompt Deleted):');
      results.orphanedPurchases.forEach(promptId => {
        console.log(`   - Prompt ID: ${promptId}`);
      });
      console.log('');
    }

    if (results.inconsistencies.length > 0) {
      console.log('⚠️  Inconsistencies Found:');
      results.inconsistencies.slice(0, 10).forEach(inconsistency => {
        console.log(`   - ${inconsistency}`);
      });
      if (results.inconsistencies.length > 10) {
        console.log(`   ... and ${results.inconsistencies.length - 10} more`);
      }
      console.log('');
    }

    if (results.orphanedPurchases.length === 0 && results.inconsistencies.length === 0) {
      console.log('✅ No consistency issues found!');
      console.log('');
      console.log('🎉 All prompts and purchases are consistent');
      return true;
    } else {
      console.log('⚠️  Consistency issues detected');
      console.log('');
      console.log('💡 Recommendations:');
      console.log('   1. Review orphaned purchases');
      console.log('   2. Consider restoring deleted prompts or archiving purchases');
      console.log('   3. Implement soft delete for prompts with purchases');
      console.log('   4. Add cascade delete protection (already implemented)');
      return false;
    }

  } catch (error) {
    console.error('💥 Validation error:', error);
    return false;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateConsistency()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Error:', error);
      process.exit(1);
    });
}

export { validateConsistency };