/**
 * Database Migration Runner
 *
 * Runs SQL migrations against Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
if (fs.existsSync(path.join(process.cwd(), '.env.local'))) {
  require('dotenv').config({ path: '.env.local' });
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   - SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Execute SQL migration file
 */
async function executeSqlFile(filePath: string): Promise<void> {
  console.log(`\n📄 Reading migration file: ${filePath}`);

  const sql = fs.readFileSync(filePath, 'utf-8');

  // Split into individual statements (rough approximation)
  // Note: This is a simple split and may not handle all SQL cases perfectly
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📊 Found ${statements.length} SQL statements to execute`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];

    // Skip comments
    if (statement.startsWith('--') || statement.startsWith('/*')) {
      continue;
    }

    try {
      console.log(`\n[${i + 1}/${statements.length}] Executing statement...`);

      // Extract statement type for logging
      const statementType = statement.split(/\s+/)[0].toUpperCase();
      console.log(`   Type: ${statementType}`);

      const { error } = await supabase.rpc('exec_sql', {
        sql_query: statement + ';',
      });

      if (error) {
        // Try direct execution for DDL statements
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({ sql_query: statement + ';' }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
      }

      console.log(`   ✅ Success`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error:`, error instanceof Error ? error.message : String(error));

      // Show snippet of failed statement
      const snippet = statement.substring(0, 100) + (statement.length > 100 ? '...' : '');
      console.error(`   Statement: ${snippet}`);

      errorCount++;

      // Ask to continue on error
      if (process.env.MIGRATION_CONTINUE_ON_ERROR !== 'true') {
        console.error('\n❌ Migration failed. Set MIGRATION_CONTINUE_ON_ERROR=true to continue on errors.');
        throw error;
      }
    }
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`   ✅ Succeeded: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📝 Total: ${statements.length}`);

  if (errorCount > 0) {
    console.warn('\n⚠️  Some statements failed. Review errors above.');
  } else {
    console.log('\n✅ Migration completed successfully!');
  }
}

/**
 * Execute migration using psql (more reliable for complex SQL)
 */
async function executeSqlViaPsql(filePath: string): Promise<void> {
  const { execSync } = require('child_process');

  console.log(`\n🔧 Executing migration via psql: ${filePath}`);

  // Extract connection details from Supabase URL
  const url = new URL(SUPABASE_URL);
  const poolerUrl = url.hostname.replace('.supabase.co', '.pooler.supabase.com');

  // Use environment variable or construct connection string
  const connectionString = process.env.DATABASE_URL ||
    `postgresql://postgres.${url.hostname.split('.')[0]}:${SUPABASE_SERVICE_ROLE_KEY}@${poolerUrl}:5432/postgres`;

  try {
    execSync(`psql "${connectionString}" -f "${filePath}"`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        PGPASSWORD: SUPABASE_SERVICE_ROLE_KEY,
      },
    });

    console.log('\n✅ Migration completed successfully via psql!');
  } catch (error) {
    console.error('\n❌ Migration failed via psql');
    throw error;
  }
}

/**
 * Validate migration file exists
 */
function validateMigrationFile(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Migration file not found: ${filePath}`);
    process.exit(1);
  }

  const stats = fs.statSync(filePath);
  if (!stats.isFile()) {
    console.error(`❌ Path is not a file: ${filePath}`);
    process.exit(1);
  }

  console.log(`✅ Migration file validated: ${filePath}`);
  console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
}

/**
 * Main migration runner
 */
async function main() {
  console.log('🚀 Symphora Database Migration Runner\n');

  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: ts-node run-migration.ts <migration-file.sql> [--psql]');
    console.log('\nOptions:');
    console.log('  --psql    Use psql for execution (more reliable for complex migrations)');
    console.log('\nExample:');
    console.log('  ts-node run-migration.ts phase4-security-fixes.sql');
    console.log('  ts-node run-migration.ts phase4-security-fixes.sql --psql');
    process.exit(0);
  }

  const migrationFile = args[0];
  const usePsql = args.includes('--psql');

  // Resolve file path
  const filePath = path.isAbsolute(migrationFile)
    ? migrationFile
    : path.join(__dirname, migrationFile);

  validateMigrationFile(filePath);

  console.log('\n⚙️  Configuration:');
  console.log(`   Supabase URL: ${SUPABASE_URL}`);
  console.log(`   Migration File: ${filePath}`);
  console.log(`   Execution Method: ${usePsql ? 'psql' : 'Supabase RPC'}`);

  // Confirm before proceeding
  if (process.env.MIGRATION_AUTO_CONFIRM !== 'true') {
    console.log('\n⚠️  This will execute SQL statements against your database.');
    console.log('   Press Ctrl+C to cancel, or set MIGRATION_AUTO_CONFIRM=true to skip this prompt.\n');

    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  try {
    if (usePsql) {
      await executeSqlViaPsql(filePath);
    } else {
      await executeSqlFile(filePath);
    }
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }

  console.log('\n✨ Done!');
}

// Run migration
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
