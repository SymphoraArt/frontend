/**
 * POST /api/prompts/[id]/view → 204
 *
 * Counts one OPEN (someone actually opened the prompt) via an atomic counter
 * UPDATE (increment_prompt_opens). Timeline impressions are the separate
 * batched /api/prompts/views-batch. Deduped per viewer+prompt for 10 minutes;
 * anonymous; never errors the client.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRequestRateLimit, rateLimitKey } from "@/lib/rate-limit";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id || id.length > 128) return new NextResponse(null, { status: 204 });

  // Same viewer opening the same prompt again within 10 min → not counted.
  const dedupe = checkRequestRateLimit(rateLimitKey(req, `prompt-open:${id}`), 1, 10 * 60 * 1000);
  if (dedupe.allowed) {
    const { error } = await getSupabaseServerClient().rpc("increment_prompt_opens", { p_prompt: id });
    if (error && !error.message?.includes("schema cache")) {
      console.error("[prompts/view] open increment failed:", error.message);
    }
  }
  return new NextResponse(null, { status: 204 });
}
