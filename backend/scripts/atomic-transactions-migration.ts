/**
 * Atomic Transaction Migration Script
 * Outputs SQL for creating the atomic purchase recording function
 * 
 * This function ensures that purchase recording and earnings updates
 * happen atomically, preventing data inconsistencies.
 */

async function outputAtomicTransactionSQL() {
  console.log('🔒 Atomic Transaction Migration');
  console.log('=================================');
  console.log('');
  console.log('⚠️  IMPORTANT: This SQL must be run manually in your Supabase dashboard');
  console.log('   Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql-editor');
  console.log('');
  console.log('📋 Copy and execute the following SQL:');
  console.log('');
  console.log('='.repeat(80));
  console.log('');

  const fs = await import('fs');
  const path = await import('path');
  
  const sqlFilePath = path.join(process.cwd(), 'backend/scripts/atomic-purchase-function.sql');
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');
  
  console.log(sqlContent);
  
  console.log('');
  console.log('='.repeat(80));
  console.log('');
  console.log('✅ After running this SQL, the purchase route will use atomic transactions');
  console.log('   This prevents data inconsistencies and duplicate purchases');
  console.log('');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  outputAtomicTransactionSQL()
    .then(() => {
      console.log('✅ SQL output complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

export { outputAtomicTransactionSQL };