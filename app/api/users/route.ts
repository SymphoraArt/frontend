import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type CreateUserBody = {
  username?: string;
  displayName?: string;
  bio?: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const limit = Math.min(Number(searchParams.get("limit") || "20"), 50);

  try {
    const supabase = getSupabaseServerClient();

    let query = supabase
      .from("users")
      .select("id,username,display_name,bio,avatar_url,created_at,stats")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (username) {
      query = query.eq("username", username);
    }

    const { data, error } = await query;

    if (error) throw error;

    const users = (data || []).map((u) => ({
      _id: u.id,
      id: u.id,
      profile: {
        username: u.username,
        displayName: u.display_name,
        bio: u.bio || "",
        avatar: u.avatar_url || "",
      },
      stats: u.stats || {},
      createdAt: u.created_at,
    }));

    return NextResponse.json({ users });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = (await req.json()) as CreateUserBody;

  if (!body.username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const nowIso = new Date().toISOString();

    const { data, error } = await supabase
      .from("users")
      .insert({
        username: body.username,
        display_name: body.displayName || body.username,
        bio: body.bio || "",
        avatar_url: "",
        stats: {
          totalCreations: 0,
          totalEarnings: 0,
          totalSpent: 0,
          totalGenerations: 0,
          followerCount: 0,
          followingCount: 0,
        },
        created_at: nowIso,
        updated_at: nowIso,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "username already exists" }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ id: data?.id }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
