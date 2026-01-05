// app/api/generations/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type CreateGenerationBody = {
  userKey?: string;
  prompt?: string;
  imageUrl?: string;
  provider?: string;
  meta?: unknown;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userKey = searchParams.get("userKey");
    const limit = Math.min(Number(searchParams.get("limit") || "30"), 100);

    if (!userKey) {
      return NextResponse.json({ error: "userKey is required" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("generations")
      .select("id,user_key,prompt,image_url,provider,meta,created_at")
      .eq("user_key", userKey)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return NextResponse.json({ items: Array.isArray(data) ? data : [] });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateGenerationBody;
    const userKey = typeof body.userKey === "string" ? body.userKey.trim() : "";
    const prompt = typeof body.prompt === "string" ? body.prompt : "";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl : "";
    const provider = typeof body.provider === "string" ? body.provider : "";

    if (!userKey) {
      return NextResponse.json({ error: "userKey is required" }, { status: 400 });
    }
    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from("generations")
      .insert({
        user_key: userKey,
        prompt,
        image_url: imageUrl,
        provider: provider || "unknown",
        meta: body.meta ?? null,
        created_at: nowIso,
      })
      .select("id,user_key,prompt,image_url,provider,meta,created_at")
      .single();

    if (error) throw error;

    return NextResponse.json({ generation: data }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userKey = searchParams.get("userKey");
    if (!userKey) {
      return NextResponse.json({ error: "userKey is required" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("generations").delete().eq("user_key", userKey);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
