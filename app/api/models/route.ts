import { NextResponse } from "next/server";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = getSupabaseServerClientSafe();

    if (supabase) {
      const { data, error } = await supabase
        .from("models")
        .select("id, name, price, allowed_ratios")
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
