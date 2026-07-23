/**
 * POST /api/prompts/views-batch  { ids: string[] } → 204
 *
 * Timeline IMPRESSIONS: the feed batches every prompt card that became
 * visible (one call per screenful, not one per card) and each id is counted
 * with one atomic batched UPDATE. Deduped per viewer+prompt for 30 minutes;
 * anonymous; never errors the client.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRequestRateLimit, rateLimitKey } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  let ids: unknown;
  try {
    ({ ids } = await req.json());
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  if (!Array.isArray(ids)) return new NextResponse(null, { status: 204 });

  const fresh = [...new Set(ids.filter((i): i is string => typeof i === "string" && i.length <= 128))]
    .slice(0, 50)
    // per-viewer dedupe: an id this viewer already sent recently isn't recounted
    .filter((id) => checkRequestRateLimit(rateLimitKey(req, `prompt-imp:${id}`), 1, 30 * 60 * 1000).allowed);
  if (fresh.length === 0) return new NextResponse(null, { status: 204 });

  const { error } = await getSupabaseServerClient().rpc("increment_prompt_views_batch", { p_prompts: fresh });
  if (error && !error.message?.includes("schema cache")) {
    console.error("[prompts/views-batch] increment failed:", error.message);
  }
  return new NextResponse(null, { status: 204 });
}
