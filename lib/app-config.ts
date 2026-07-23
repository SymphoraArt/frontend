/**
 * Runtime config from the app_config table (DB overlay over the compile-time
 * constants in shared/revenue-config.ts). Edit the DB row → next request uses
 * it; constants are the fallback when the table/key is missing.
 * Server-only (service-role client); the UI reads GET /api/config.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { PLATFORM_FEE_PCT, REFERRAL_SHARE_PCT, HUNT_SHARE_PCT } from "@/shared/revenue-config";

export interface RevenueConfig {
  platform_fee_pct: number;
  referral_share_pct: number;
  hunt_share_pct: number;
}

const FALLBACK: RevenueConfig = {
  platform_fee_pct: PLATFORM_FEE_PCT,
  referral_share_pct: REFERRAL_SHARE_PCT,
  hunt_share_pct: HUNT_SHARE_PCT,
};

const CACHE_TTL_MS = 60_000;
let cache: { value: RevenueConfig; at: number } | null = null;

export async function getRevenueConfig(supabase: SupabaseClient): Promise<RevenueConfig> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.value;
  try {
    const { data, error } = await supabase.from("app_config").select("value").eq("key", "revenue").maybeSingle();
    if (error || !data) return FALLBACK;
    const v = data.value as Partial<RevenueConfig>;
    const merged: RevenueConfig = {
      platform_fee_pct: numberOr(v.platform_fee_pct, FALLBACK.platform_fee_pct),
      referral_share_pct: numberOr(v.referral_share_pct, FALLBACK.referral_share_pct),
      hunt_share_pct: numberOr(v.hunt_share_pct, FALLBACK.hunt_share_pct),
    };
    cache = { value: merged, at: Date.now() };
    return merged;
  } catch {
    return FALLBACK;
  }
}

function numberOr(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}
