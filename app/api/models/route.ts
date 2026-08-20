import { NextResponse } from "next/server";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import { withCapabilities } from "@/lib/generation/models";

export async function GET() {
  try {
    const supabase = getSupabaseServerClientSafe();

    if (supabase) {
      // The provider embed lets withCapabilities() resolve maxResolution and
      // supportsQuality the same way the generation itself does — the pickers
      // used to derive these client-side and drift from what the server would
      // honour. Falls back to a plain select("*") when the embed errors (the
      // window before the providers migration), where the slug bridge inside
      // fromRow() takes over.
      const embed =
        "*, model_providers(id, role, provider_model, active, priority, applies_when, provider_id, providers(id, key, audience, active))";
      let { data, error } = await supabase
        .from("models")
        .select(embed)
        .eq("active", true)
        .order("price", { ascending: true });
      if (error) {
        ({ data, error } = await supabase
          .from("models")
          .select("*")
          .eq("active", true)
          .order("price", { ascending: true }));
      }

      if (!error && data && data.length > 0) {
        return NextResponse.json(withCapabilities(data as Parameters<typeof withCapabilities>[0]));
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
