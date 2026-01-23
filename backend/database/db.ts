import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { DatabaseError, QueryResult, SingleQueryResult } from './schema';

let supabaseClient: SupabaseClient | null = null;

/**
 * Get Supabase client for database operations
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      throw new Error('Supabase environment variables not configured');
    }

    supabaseClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }

  return supabaseClient;
}

/**
 * Check if database is available
 */
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    const client = getSupabaseClient();
    const { error } = await client.from('generations').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Execute raw SQL query
 */
export async function executeQuery(query: string): Promise<QueryResult<any>> {
  try {
    const client = getSupabaseClient();
    const { data, error, count } = await client.rpc('execute_sql', {
      sql_query: query
    });

    return {
      data,
      error: error as DatabaseError | null,
      count: count ?? undefined
    };
  } catch (err) {
    return {
      data: null,
      error: err as DatabaseError
    };
  }
}

/**
 * Helper function to handle Supabase errors consistently
 */
export function handleDatabaseError(error: any): DatabaseError {
  if (error?.code && error?.message) {
    return {
      name: 'DatabaseError',
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    } as DatabaseError;
  }

  return {
    name: 'DatabaseError',
    message: error?.message || 'Unknown database error'
  } as DatabaseError;
}
