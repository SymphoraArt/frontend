/**
 * Denormalization Migration
 * Outputs SQL for adding denormalized prompt data to purchases table
 */

async function outputDenormalizationSQL() {
  console.log('📊 Denormalization Migration (N+1 Query Fix)');
  console.log('=============================================');
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
  
  const sqlFilePath = path.join(process.cwd(), 'backend/scripts/denormalize-prompt-data.sql');
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');
  
  console.log(sqlContent);
  
  console.log('');
  console.log('='.repeat(80));
  console.log('');
  console.log('✅ After running this SQL:');
  console.log('   - prompt_title column added to prompt_purchases');
  console.log('   - prompt_preview_image_url column added');
  console.log('   - Atomic function updated to accept denormalized data');
  console.log('   - N+1 query problem eliminated');
  console.log('');
  console.log('📊 Performance Benefits:');
  console.log('   - Single query returns all needed data');
  console.log('   - No need to fetch prompts individually');
  console.log('   - Faster API responses');
  console.log('   - Reduced database load');
  console.log('');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  outputDenormalizationSQL()
    .then(() => {
      console.log('✅ SQL output complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

export { outputDenormalizationSQL };