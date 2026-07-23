import { NextResponse } from "next/server";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = getSupabaseServerClientSafe();

    if (supabase) {
      // select("*") so the per-model limits (max_reference_images,
      // allowed_filetypes — 2026-07-12-model-limits.sql) ride along once the
      // migration ran, and their absence before it can't break the query.
      const { data, error } = await supabase
        .from("models")
        .select("*")
        .eq("active", true)
        .order("price", { ascending: true });

      if (!error && data && data.length > 0) {
        return NextResponse.json(data);
      }

      if (error) {
        console.warn("[/api/models] DB query failed:", error.message);
      }
    }

    return NextResponse.json([]);
  } catch (e) {
    console.error("[/api/models] Unexpected error:", e);
    return NextResponse.json([]);
  }
}
