import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { requireAuth } from "@/lib/auth";
import { encryptString } from "@/lib/crypto";

export const runtime = "nodejs";

const ALLOWED_PROVIDERS = new Set(["gemini", "pollinations", "grok", "nano-banana"]);

type CreateGenerationBody = {
  promptId?: string | null;
  sourcePromptId?: string | null;
  prompt?: string;
  finalPrompt?: string;
  encryptedPrompt?: string;
  imageUrl?: string;
  imageUrls?: string[];
  provider?: string;
  model?: string;
  meta?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  variableValues?: unknown;
  settings?: Record<string, unknown>;
  transactionHash?: string | null;
};

type GenerationRow = Record<string, unknown>;

function isUuid(value: string | null | undefined) {
  if (!value) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function getImageUrl(row: GenerationRow) {
  if (typeof row.storage_url === "string" && row.storage_url) return row.storage_url;
  if (typeof row.image_url === "string" && row.image_url) return row.image_url;
  if (typeof row.public_url === "string" && row.public_url) return row.public_url;
  if (Array.isArray(row.image_urls) && row.image_urls[0]) return String(row.image_urls[0]);
  return "";
}

function mapGeneration(row: GenerationRow) {
  const imageUrl = getImageUrl(row);
  return {
    id: row.id,
    user_id: row.user_id,
    prompt_id: row.prompt_id ?? row.source_prompt_id ?? null,
    generation_id: row.generation_id,
    status: row.status,
    image_url: imageUrl,
    image_urls: Array.isArray(row.image_urls) ? row.image_urls : imageUrl ? [imageUrl] : [],
    settings: row.settings ?? row.metadata ?? {},
    created_at: row.created_at,
    updated_at: row.updated_at,
    completed_at: row.completed_at,
  };
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

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Math.max(Number(searchParams.get("limit") || 50), 1), 100);
    const offset = Math.max(Number(searchParams.get("offset") || 0), 0);
    const promptId = searchParams.get("promptId") || searchParams.get("sourcePromptId");

    if (promptId && !isUuid(promptId)) {
      return NextResponse.json({ error: "Invalid promptId" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const userId = await ensureUserIdForWallet(supabase, authUser.walletAddress);
    if (!userId) {
      return NextResponse.json({ error: "Authenticated wallet is not linked to a user" }, { status: 403 });
    }

    const imageQuery = supabase
      .from("generated_images")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    imageQuery.eq("user_id", userId);
    if (promptId) imageQuery.eq("prompt_id", promptId);

    const imageResult = await imageQuery;
    if (!imageResult.error) {
      const generations = (imageResult.data || []).map((row) => mapGeneration(row as GenerationRow));
      return NextResponse.json({
        generations,
        items: generations,
        total: imageResult.count || 0,
        limit,
        offset,
        source: "generated_images",
      });
    }

    const generationQuery = supabase
      .from("generations")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    generationQuery.eq("user_id", userId);
    if (promptId) generationQuery.eq("prompt_id", promptId);

    const { data, error, count } = await generationQuery;
    if (error) {
      console.error("Failed to fetch generations:", {
        generatedImagesError: imageResult.error.message,
        generationsError: error.message,
      });
      return NextResponse.json({ error: "Failed to fetch generations" }, { status: 500 });
    }

    const generations = (data || []).map((row) => mapGeneration(row as GenerationRow));
    return NextResponse.json({
      generations,
      items: generations,
      total: count || 0,
      limit,
      offset,
      source: "generations",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    if (message.startsWith("Authentication failed")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching generations:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);
    const body = (await req.json()) as CreateGenerationBody;
    const promptText = String(body.prompt || body.finalPrompt || body.encryptedPrompt || "").trim();
    const imageUrls = Array.isArray(body.imageUrls)
      ? body.imageUrls.filter((url): url is string => typeof url === "string" && url.length > 0)
      : typeof body.imageUrl === "string" && body.imageUrl
        ? [body.imageUrl]
        : [];

    if (!promptText && imageUrls.length === 0) {
      return NextResponse.json({ error: "prompt or imageUrl is required" }, { status: 400 });
    }

    const nowIso = new Date().toISOString();
    const promptId = body.promptId || body.sourcePromptId || null;
    if (!promptId) {
      return NextResponse.json({ error: "promptId is required for secure generation persistence" }, { status: 400 });
    }

    if (!isUuid(promptId)) {
      return NextResponse.json({ error: "Invalid promptId" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const userId = await ensureUserIdForWallet(supabase, authUser.walletAddress);
    if (!userId) {
      return NextResponse.json({ error: "Authenticated wallet is not linked to a user" }, { status: 403 });
    }

    const encryptedPrompt = encryptString(promptText, `generation:${userId}:${promptId}`);
    const encryptedVariables = encryptString(
      JSON.stringify(Array.isArray(body.variableValues) ? body.variableValues : []),
      `generation:variables:${userId}:${promptId}`
    );
    const provider = typeof body.provider === "string" && ALLOWED_PROVIDERS.has(body.provider)
      ? body.provider
      : null;
    const settings = {
      ...(body.settings || {}),
      provider,
      model: body.model || body.settings?.model || null,
      metadata: body.metadata || body.meta || {},
    };

    const generationRow = {
      user_id: userId,
      prompt_id: promptId,
      final_prompt_ct: encryptedPrompt.encrypted,
      final_prompt_iv: encryptedPrompt.iv,
      final_prompt_tag: encryptedPrompt.authTag,
      final_prompt_kid: encryptedPrompt.kid || "field-v1",
      variable_values_ct: encryptedVariables.encrypted,
      variable_values_iv: encryptedVariables.iv,
      variable_values_tag: encryptedVariables.authTag,
      variable_values_kid: encryptedVariables.kid || "field-v1",
      aspect_ratio: typeof body.settings?.aspectRatio === "string" ? body.settings.aspectRatio : null,
      resolution: typeof body.settings?.resolution === "string" ? body.settings.resolution : null,
      provider,
      provider_model: typeof settings.model === "string" ? settings.model : null,
      transaction_hash: body.transactionHash || null,
      created_at: nowIso,
    };

    const { data, error } = await supabase
      .from("generations")
      .insert([generationRow])
      .select("*")
      .single();

    if (error) {
      console.error("Failed to save generation:", error);
      return NextResponse.json({ error: "Failed to save generation" }, { status: 500 });
    }

    if (imageUrls.length && data?.id) {
      const imageRows = imageUrls.map((url, index) => ({
        user_id: userId,
        prompt_id: promptId,
        generation_id: data.id,
        sequence_index: index,
        storage_provider: url.startsWith("data:") ? "data_url" : "vercel_blob",
        storage_url: url,
        mime_type: "image/png",
        is_uploaded: false,
        visibility: "private",
        created_at: nowIso,
      }));

      const imageInsert = await supabase.from("generated_images").insert(imageRows).select("*");
      if (imageInsert.error) {
        console.error("Failed to save generated images:", imageInsert.error);
        await supabase
          .from("generations")
          .update({ deleted_at: new Date().toISOString() })
          .eq("id", data.id)
          .eq("user_id", userId);
        return NextResponse.json({ error: "Failed to save generated images" }, { status: 500 });
      }
    }

    return NextResponse.json(
      {
        success: true,
        generationId: data.id,
        generation: mapGeneration(data as GenerationRow),
      },
      { status: 201 }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    if (message.startsWith("Authentication failed")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Generation save error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const authUser = await requireAuth(req);
    const userId = await ensureUserIdForWallet(supabase, authUser.walletAddress);
    if (!userId) {
      return NextResponse.json({ error: "Authenticated wallet is not linked to a user" }, { status: 403 });
    }

    await supabase.from("generated_images").delete().eq("user_id", userId);
    const { error } = await supabase
      .from("generations")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", userId)
      .is("deleted_at", null);

    if (error) {
      return NextResponse.json({ error: "Failed to clear generations" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    if (message.startsWith("Authentication failed")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Generation clear error:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
