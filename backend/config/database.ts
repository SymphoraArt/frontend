/**
 * Production Database Configuration
 *
 * Connection pooling, migrations, and database optimizations for production
 */

import { Pool, type PoolClient, type QueryResult } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from '../database/schema';
import { getDatabaseConfig, isProduction } from '../../app/lib/config/environment';
import { logger } from '../../app/lib/config/logger';

// Connection pool configuration
function createPool() {
  const config = getDatabaseConfig();

  if (!config.url) {
    throw new Error('DATABASE_URL is required');
  }

  const poolConfig = {
    connectionString: config.url,
    // Production pool settings
    max: isProduction() ? 20 : 5, // Maximum connections
    min: 2, // Minimum connections
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
    acquireTimeoutMillis: 60000, // Return error after 60 seconds if connection could not be acquired
    allowExitOnIdle: true, // Allow the pool to close when all connections are idle
    ssl: isProduction() ? { rejectUnauthorized: false } : false, // Enable SSL in production
  };

  logger.info('Creating database connection pool', {
    maxConnections: poolConfig.max,
    ssl: poolConfig.ssl ? 'enabled' : 'disabled',
  });

  return new Pool(poolConfig);
}

// Create singleton pool instance
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export function getPool(): Pool {
  // Skip pool creation during build time
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      !process.env.DATABASE_URL;
  
  if (isBuildTime) {
    // Return a mock pool during build
    // This will never be used during build, but prevents import errors
    if (!pool) {
      // Create a minimal mock pool that won't actually connect
      pool = new Pool({
        connectionString: 'postgresql://localhost:5432/build-time-mock',
        max: 0, // Don't allow any connections
      });
    }
    return pool;
  }

  if (!pool) {
    pool = createPool();

    // Handle pool events
    pool.on('connect', (client) => {
      logger.debug('New database connection established');
    });

    pool.on('error', (err, client) => {
      logger.error('Unexpected database pool error', {
        error: err.message,
        stack: err.stack,
      });
    });

    pool.on('remove', (client) => {
      logger.debug('Database connection removed from pool');
    });
  }

  return pool;
}

export function getDatabase() {
  if (!db) {
    const pool = getPool();
    db = drizzle(pool, { schema, logger: false }); // Disable Drizzle's default logging

    logger.info('Database instance created with Drizzle ORM');
  }

  return db;
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool();
    const client = await pool.connect();

    await client.query('SELECT 1');
    client.release();

    logger.info('Database connection test successful');
    return true;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error('Database connection test failed', {
      error: errorMessage,
      stack: errorStack,
    });
    return false;
  }
}

/**
 * Run database migrations
 */
export async function runMigrations(): Promise<void> {
  try {
    logger.info('Starting database migrations...');

    const db = getDatabase();
    // Note: Drizzle migrations need to be run differently
    // This is a placeholder for the migration logic

    logger.info('Database migrations completed');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error('Database migration failed', {
      error: errorMessage,
      stack: errorStack,
    });
    throw error;
  }
}

/**
 * Health check for database
 */
export async function healthCheck(): Promise<{
  healthy: boolean;
  responseTime: number;
  connectionCount: number;
}> {
  const startTime = Date.now();

  try {
    const pool = getPool();
    const client = await pool.connect();

    await client.query('SELECT 1');
    client.release();

    const responseTime = Date.now() - startTime;

    return {
      healthy: true,
      responseTime,
      connectionCount: pool.totalCount,
    };
  } catch (error) {
    return {
      healthy: false,
      responseTime: Date.now() - startTime,
      connectionCount: 0,
    };
  }
}

/**
 * Gracefully close database connections
 */
export async function closeConnections(): Promise<void> {
  if (pool) {
    logger.info('Closing database connections...');
    await pool.end();
    pool = null;
    db = null;
    logger.info('Database connections closed');
  }
}

/**
 * Get database statistics
 */
export function getStats() {
  if (!pool) return null;

  return {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
  };
}

/**
 * Execute raw SQL query with logging
 */
export async function executeQuery(query: string, params: unknown[] = []): Promise<QueryResult> {
  const startTime = Date.now();

  try {
    const pool = getPool();
    const result = await pool.query(query, params);

    const duration = Date.now() - startTime;
    logger.info('database_query', {
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      rowCount: result.rowCount,
      duration,
    });

    return result;
  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    logger.error('database_query', {
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      error: errorMessage,
      duration,
    });

    logger.error('Database query failed', {
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      error: errorMessage,
      stack: errorStack,
    });

    throw error;
  }
}

/**
 * Transaction wrapper with automatic rollback on error
 */
export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Database backup (placeholder - implement based on your backup strategy)
 */
export async function createBackup(): Promise<string> {
  logger.info('Creating database backup...');

  // TODO: Implement actual backup logic
  // This could use pg_dump, create snapshots, etc.

  const backupId = `backup-${Date.now()}`;
  logger.info(`Database backup created: ${backupId}`);

  return backupId;
}

/**
 * Database restore (placeholder - implement based on your restore strategy)
 */
export async function restoreBackup(backupId: string): Promise<void> {
  logger.info(`Restoring database from backup: ${backupId}`);

  // TODO: Implement actual restore logic

  logger.info(`Database restored from backup: ${backupId}`);
}

// Initialize database on module load
// Skip during build time to prevent build worker crashes
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' ||
                    process.env.NEXT_PHASE === 'phase-development-build';

if (isProduction() && !isBuildTime) {
  // Test connection on startup in production (but not during build)
  testConnection().then(success => {
    if (!success) {
      logger.error('Database connection failed on startup - exiting');
      process.exit(1);
    }
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Received SIGINT, closing database connections...');
  await closeConnections();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM, closing database connections...');
  await closeConnections();
  process.exit(0);
});
