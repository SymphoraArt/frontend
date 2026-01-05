/**
 * Supabase Server Client
 * Creates a Supabase client for server-side operations
 */

import { createClient } from '@supabase/supabase-js';
import { getDatabaseConfig } from './config/environment';

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServerClient() {
  // Skip initialization during build time
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      !process.env.DATABASE_URL;
  
  if (isBuildTime) {
    // Return a mock client during build to prevent errors
    // This will be replaced with real client at runtime
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
        update: () => ({
          set: () => ({
            where: () => ({
              eq: () => Promise.resolve({ error: null }),
            }),
          }),
        }),
      }),
    } as unknown as ReturnType<typeof createClient>;
  }

  if (supabaseClient) {
    return supabaseClient;
  }

  const config = getDatabaseConfig();
  
  if (!config.supabase) {
    throw new Error('Supabase configuration not found. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
  }

  supabaseClient = createClient(
    config.supabase.url,
    config.supabase.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  return supabaseClient;
}

