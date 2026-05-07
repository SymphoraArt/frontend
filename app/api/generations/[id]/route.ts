import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

type GenerationRow = Record<string, unknown>;

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

async function ensureUserIdForWallet(
  supabase: ReturnType<typeof getSupabaseServerClient>,
  walletAddress: string
): Promise<string | null> {
  const normalizedWallet = walletAddress.toLowerCase();
  const { data, error } = await supabase
    .from("user_wallets")
    .select("user_id")
    .eq("address", normalizedWallet)
    .is("removed_at", null)
    .maybeSingle();

  if (error) {
    console.error("Failed to resolve wallet user:", error);
    return null;
  }

  if (typeof data?.user_id === "string") return data.user_id;

  const userInsert = await supabase
    .from("users")
    .insert({})
    .select("id")
    .single();

  if (userInsert.error || !userInsert.data?.id) {
    console.error("Failed to create wallet user:", userInsert.error);
    return null;
  }

  const walletInsert = await supabase.from("user_wallets").insert({
    user_id: userInsert.data.id,
    address: normalizedWallet,
    chain_family: "evm",
    wallet_type: "external_eoa",
    is_primary: true,
  });

  if (!walletInsert.error) return userInsert.data.id;

  if (walletInsert.error.code === "23505") {
    const retry = await supabase
      .from("user_wallets")
      .select("user_id")
      .eq("address", normalizedWallet)
      .is("removed_at", null)
      .maybeSingle();
    return typeof retry.data?.user_id === "string" ? retry.data.user_id : null;
  }

  console.error("Failed to link wallet user:", walletInsert.error);
  return null;
}

function getImageUrl(row: GenerationRow) {
  if (typeof row.storage_url === "string" && row.storage_url) return row.storage_url;
  if (Array.isArray(row.image_urls) && row.image_urls[0]) return String(row.image_urls[0]);
  return "";
}

function mapGeneration(row: GenerationRow) {
  const imageUrl = getImageUrl(row);
  return {
    id: row.id,
    user_id: row.user_id,
    prompt_id: row.prompt_id,
    generation_id: row.generation_id,
    status: row.status,
    image_url: imageUrl,
    image_urls: imageUrl ? [imageUrl] : [],
    settings: row.settings ?? row.metadata ?? {},
    created_at: row.created_at,
    updated_at: row.updated_at,
    completed_at: row.completed_at,
  };
}

async function getAuthenticatedDbUserId(req: NextRequest) {
  const authUser = await requireAuth(req);
  const supabase = getSupabaseServerClient();
  const userId = await ensureUserIdForWallet(supabase, authUser.walletAddress);
  return { supabase, userId };
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "Invalid generation ID" }, { status: 400 });
  }

  try {
    const { supabase, userId } = await getAuthenticatedDbUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Authenticated wallet is not linked to a user" }, { status: 403 });
    }

    const imageResult = await supabase
      .from("generated_images")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .maybeSingle();

    if (!imageResult.error && imageResult.data) {
      return NextResponse.json(mapGeneration(imageResult.data as GenerationRow));
    }

    const { data, error } = await supabase
      .from("generations")
      .select("id,user_id,prompt_id,created_at,deleted_at")
      .eq("id", id)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch generation:", error);
      return NextResponse.json({ error: "Failed to fetch generation" }, { status: 500 });
    }

    if (!data) return NextResponse.json({ error: "Generation not found" }, { status: 404 });
    return NextResponse.json(mapGeneration(data as GenerationRow));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    if (message.startsWith("Authentication failed")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching generation:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "Invalid generation ID" }, { status: 400 });
  }

  try {
    const { supabase, userId } = await getAuthenticatedDbUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Authenticated wallet is not linked to a user" }, { status: 403 });
    }

    const nowIso = new Date().toISOString();
    const imageDelete = await supabase
      .from("generated_images")
      .update({ deleted_at: nowIso })
      .eq("id", id)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .select("id")
      .maybeSingle();

    if (!imageDelete.error && imageDelete.data) {
      return NextResponse.json({ success: true });
    }

    const generationDelete = await supabase
      .from("generations")
      .update({ deleted_at: nowIso })
      .eq("id", id)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .select("id")
      .maybeSingle();

    if (generationDelete.error) {
      console.error("Failed to delete generation:", generationDelete.error);
      return NextResponse.json({ error: "Failed to delete generation" }, { status: 500 });
    }

    if (!generationDelete.data) {
      return NextResponse.json({ error: "Generation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    if (message.startsWith("Authentication failed")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting generation:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
