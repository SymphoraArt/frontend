import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("SUPABASE_URL is not set");
  if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function getSupabaseServerClient() {
  return getSupabaseAdminClient();
}

/**
 * Safe wrapper that checks if Supabase is configured before creating client
 * Returns null if Supabase is not configured (for graceful degradation)
 */
export function getSupabaseServerClientSafe() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  try {
    return getSupabaseAdminClient();
  } catch (error) {
    console.warn("Failed to create Supabase client:", error);
    return null;
  }
}

export function getSupabaseUserClientFromRequest(req: Request) {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url) throw new Error("SUPABASE_URL is not set");
  if (!anonKey) throw new Error("SUPABASE_ANON_KEY is not set");

  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    throw new Error("Missing Authorization Bearer token");
  }
  const token = authHeader.slice("bearer ".length);

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
