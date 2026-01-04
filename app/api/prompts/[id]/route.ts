import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type PatchBody = {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  aiSettings?: { aspectRatio?: string; includeText?: boolean };
  pricing?: { pricePerGeneration?: number };
  isFeatured?: boolean;
  published?: boolean;
};

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();

    const { data: prompt, error } = await supabase
      .from("prompts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    if (!prompt) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json({ prompt });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const body = (await req.json()) as PatchBody;
    const supabase = getSupabaseServerClient();

    const update: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (typeof body.title === "string") update.title = body.title;
    if (typeof body.description === "string") update.description = body.description;
    if (typeof body.category === "string") update.category = body.category;
    if (Array.isArray(body.tags)) update.tags = body.tags;

    if (body.aiSettings) {
      update.ai_settings = {
        aspectRatio: body.aiSettings.aspectRatio,
        includeText: body.aiSettings.includeText,
      };
    }

    if (body.pricing) {
      update.price = body.pricing.pricePerGeneration;
    }

    if (typeof body.isFeatured === "boolean") update.is_featured = body.isFeatured;

    if (body.published === true) {
      update.published_at = new Date().toISOString();
    }

    const { error, count } = await supabase
      .from("prompts")
      .update(update)
      .eq("id", id);

    if (error) throw error;

    if (count === 0) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
