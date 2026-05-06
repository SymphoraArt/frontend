import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();

    const { data: user, error } = await supabase
      .from("users")
      .select("id,username,display_name,bio,avatar_url,created_at,stats")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        _id: user.id,
        id: user.id,
        profile: {
          username: user.username,
          displayName: user.display_name,
          bio: user.bio || "",
          avatar: user.avatar_url || "",
        },
        stats: user.stats || {},
        createdAt: user.created_at,
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("GET /api/users/[id] error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
