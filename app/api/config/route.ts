/**
 * GET /api/config → { revenue: { platform_fee_pct, referral_share_pct, hunt_share_pct } }
 *
 * Public, read-only effective config (DB overlay over the compile-time
 * fallbacks) so UI copy shows the same numbers the server charges with.
 */
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getRevenueConfig } from "@/lib/app-config";

export async function GET() {
  const revenue = await getRevenueConfig(getSupabaseServerClient());
  return NextResponse.json(
    { revenue },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}
