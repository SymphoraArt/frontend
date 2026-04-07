import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { connectDB } from "@/backend/db-mysql";
import { getEnkiPromptById } from "@/backend/storage-enki";
import { decryptPrompt, isEncryptionConfigured } from "@/backend/encryption";

type PatchBody = {
  title?: string;
  description?: string;
  category?: string;
  aiSettings?: { aspectRatio?: string; includeText?: boolean };
  pricing?: { pricePerGeneration?: number };
  isFeatured?: boolean;
  published?: boolean;
};

/** Map Enki variable type to editor Variable type */
function toEditorVarType(
  t: string
): "text" | "checkbox" | "multi-select" | "single-select" | "slider" | "radio" {
  if (t === "multiselect") return "multi-select";
  if (t === "singleselect") return "single-select";
  if (t === "text" || t === "checkbox" || t === "slider") return t as any;
  return "text";
}

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    // Prefer MySQL (Enki / symphora_prompts table)
    await connectDB();
    const enkiPrompt = await getEnkiPromptById(id);
    if (enkiPrompt) {
      const variables = (enkiPrompt.promptData?.variables ?? []).map((v, i) => ({
        id: v.name || `var-${i}`,
        name: v.name,
        description: v.description ?? "",
        type: toEditorVarType(v.type),
        defaultValue: v.defaultValue,
        required: v.required ?? false,
        position: v.order ?? i,
        min: v.config?.min,
        max: v.config?.max,
        options: v.config?.options?.map((o) => ({
          visibleName: o.title,
          promptValue: o.value,
        })),
        allowReferenceImage: false,
        promptValue: v.type === "checkbox" ? (v.config?.checkedValue ?? "") : undefined,
      }));

      let promptTextForGenerator: string | undefined;
      if (enkiPrompt.type === "free" && isEncryptionConfigured()) {
        try {
          const seg = enkiPrompt.promptData?.segments?.[0]?.content as
            | { encrypted?: string; iv?: string; authTag?: string }
            | undefined;
          if (seg?.encrypted && seg.iv && seg.authTag) {
            promptTextForGenerator = decryptPrompt({
              encryptedContent: seg.encrypted,
              iv: seg.iv,
              authTag: seg.authTag,
            });
          }
        } catch {
          promptTextForGenerator = undefined;
        }
      }

      return NextResponse.json({
        prompt: {
          _id: enkiPrompt._id?.toString(),
          id: enkiPrompt.id,
          creator: enkiPrompt.creator,
          type: enkiPrompt.type,
          title: enkiPrompt.title,
          description: enkiPrompt.description,
          category: enkiPrompt.category,
          aiSettings: enkiPrompt.aiSettings,
          pricing: enkiPrompt.pricing,
          showcaseImages: enkiPrompt.showcaseImages ?? [],
          stats: enkiPrompt.stats,
          promptData: { variables },
          ...(promptTextForGenerator !== undefined
            ? { promptTextForGenerator }
            : {}),
        },
      });
    }

    // Fallback: Supabase (legacy)
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

    const { data: variables, error: varsError } = await supabase
      .from("variables")
      .select("*")
      .eq("prompt_id", id)
      .order("position", { ascending: true });

    if (varsError) throw varsError;

    const mappedVariables = (variables || []).map((v) => ({
      id: v.id ?? v.name,
      name: v.name ?? v.label ?? "",
      description: v.description || "",
      type: v.type,
      defaultValue: v.default_value,
      required: v.required || false,
      position: v.position || 0,
      min: v.min,
      max: v.max,
      options: v.options,
      allowReferenceImage: false,
    }));

    return NextResponse.json({
      prompt: {
        ...prompt,
        _id: prompt.id,
        promptData: {
          variables: mappedVariables,
        },
      },
    });
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
