import { NextResponse } from "next/server";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";

// Fallback list — shown if DB table is empty or Supabase is not configured
const FALLBACK_MODELS = [
  {
    id: "nano-banana-pro",
    name: "Nano Banana Pro",
    price: 0.04,
    allowed_ratios: ["1:1", "4:5", "3:2", "16:9", "9:16", "21:9"],
  },
  {
    id: "gpt-image-2",
    name: "GPT-Image-2",
    price: 0.06,
    allowed_ratios: ["1:1", "16:9", "9:16"],
  },
  {
    id: "midjourney-v7",
    name: "Midjourney v7",
    price: 0.08,
    allowed_ratios: ["1:1", "4:5", "3:2", "16:9", "9:16"],
  },
];

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

      // Log if there's an actual DB error (not just empty table)
      if (error) {
        console.warn("[/api/models] DB query failed, using fallback:", error.message);
      }
    }

    // Supabase not configured or table empty — serve fallback
    return NextResponse.json(FALLBACK_MODELS);
  } catch (e) {
    console.error("[/api/models] Unexpected error:", e);
    return NextResponse.json(FALLBACK_MODELS);
  }
}
