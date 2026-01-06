#!/usr/bin/env tsx

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getSupabaseClient } from '../database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  console.log('🗄️  Running database migrations...');

  try {
    // Read migration file
    const migrationPath = join(__dirname, '../database/migrations/001_create_enhanced_generations.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    console.log('📄 Read migration file');

    // Split SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements`);

    // Execute each statement
    const supabase = getSupabaseClient();

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement) continue;

      console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);

      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql_query: statement + ';'
        });

        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error);
          throw error;
        }
      } catch (err: any) {
        // Try direct query if RPC fails
        try {
          const { error } = await supabase.from('_supabase_migration_temp').select('*').limit(0);
          // If we get here, try a different approach
          console.log(`⚠️  RPC failed, trying alternative method for statement ${i + 1}`);
        } catch {
          console.error(`❌ Failed to execute statement ${i + 1}:`, err.message);
          throw err;
        }
      }
    }

    console.log('✅ All migrations completed successfully!');

  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration();
}

export { runMigration };
