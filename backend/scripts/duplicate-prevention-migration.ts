/**
 * Duplicate Purchase Prevention Migration
 * Outputs SQL for creating unique constraint to prevent duplicate purchases
 */

async function outputDuplicatePreventionSQL() {
  console.log('🔒 Duplicate Purchase Prevention Migration');
  console.log('==========================================');
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
  
  const sqlFilePath = path.join(process.cwd(), 'backend/scripts/duplicate-purchase-prevention.sql');
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');
  
  console.log(sqlContent);
  
  console.log('');
  console.log('='.repeat(80));
  console.log('');
  console.log('✅ After running this SQL:');
  console.log('   - Unique constraint prevents duplicate purchases at database level');
  console.log('   - Race conditions are eliminated');
  console.log('   - Atomic function handles conflicts gracefully');
  console.log('   - Users cannot be charged twice for the same prompt');
  console.log('');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  outputDuplicatePreventionSQL()
    .then(() => {
      console.log('✅ SQL output complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

export { outputDuplicatePreventionSQL };