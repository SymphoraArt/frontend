import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type PromptListItem = {
  id: string;
  title: string;
  createdAt?: string;
  category?: string;
  tags?: string[];
  price?: number;
  aiModel?: string;
  isFreeShowcase?: boolean;
};

export async function GET() {
  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("⚠️  Supabase not configured - returning empty prompts list");
      console.warn("⚠️  Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env to enable prompts");
      // Return empty array instead of error for better UX
      return NextResponse.json([]);
    }

    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("prompts")
      .select("id,title,created_at,category,tags,price,ai_model,is_free_showcase")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    const items: PromptListItem[] = (Array.isArray(data) ? data : []).map((d) => ({
      id: String(d.id ?? ""),
      title: String(d.title ?? ""),
      createdAt: typeof d.created_at === "string" ? d.created_at : undefined,
      category: typeof d.category === "string" ? d.category : undefined,
      tags: Array.isArray(d.tags) ? (d.tags as string[]) : undefined,
      price: typeof d.price === "number" ? d.price : undefined,
      aiModel: typeof d.ai_model === "string" ? d.ai_model : undefined,
      isFreeShowcase: Boolean(d.is_free_showcase ?? false),
    }));

    return NextResponse.json(items);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Error in /api/prompts:", message);
    // Return empty array instead of error for better UX during development
    return NextResponse.json([], { status: 200 });
  }
}
