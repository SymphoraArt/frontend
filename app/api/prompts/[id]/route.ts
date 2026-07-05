import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { decryptPrompt, isEncryptionConfigured } from "@/backend/encryption";
import { requireAuth } from "@/lib/auth";

type PatchBody = {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  aiSettings?: { aspectRatio?: string; includeText?: boolean };
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

    // Fetch variables for this prompt
    const { data: variables, error: varsError } = await supabase
      .from("variables")
      .select("*")
      .eq("prompt_id", id)
      .order("position", { ascending: true });

    if (varsError) throw varsError;

    // Map variables to expected format
    const mappedVariables = (variables || []).map((v) => ({
      id: v.id,
      name: v.name,
      label: v.label,
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

    // For free/showcase prompts, decrypt and include the public prompt text
    let publicPromptText: string | undefined;
    const isFree =
      prompt.prompt_type === "showcase" ||
      prompt.prompt_type === "free-prompt" ||
      prompt.is_free_showcase === true;

    if (isFree && prompt.content && prompt.iv && prompt.auth_tag) {
      try {
        if (isEncryptionConfigured()) {
          publicPromptText = decryptPrompt({
            encryptedContent: prompt.content,
            iv: prompt.iv,
            authTag: prompt.auth_tag,
          });
        }
      } catch (decryptError) {
        console.warn("Failed to decrypt free prompt content:", decryptError);
      }
    }

    // Return prompt with nested promptData.variables for GeneratorInterface compatibility
    return NextResponse.json({
      prompt: {
        ...prompt,
        _id: prompt.id,
        publicPromptText,
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
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  // Require a valid session. This route used to accept anonymous edits — including
  // the prompt's price, which server-built payments (#2) read straight from the DB.
  // Price and "featured" are deliberately NOT mutable here anymore: price changes
  // must go through the authenticated, ownership-checked /api/prompts/[id]/list
  // endpoint so the payment path can trust the stored price.
  try {
    await requireAuth(req);
  } catch {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
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
