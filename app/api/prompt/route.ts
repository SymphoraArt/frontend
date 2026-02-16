import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type VariableType =
  | "text"
  | "checkbox"
  | "multi-select"
  | "single-select"
  | "slider";

type PromptType = "showcase" | "free-prompt" | "paid-prompt" | string;

type PromptPayload = {
  id?: string | null;
  title: string;
  content: string;
  userId?: string | null;
  category?: string;
  aiModel?: string;
  price?: number;
  aspectRatio?: string | null;
  photoCount?: number;
  promptType?: PromptType;
  uploadedPhotos?: string[];
  resolution?: string | null;
  isFreeShowcase?: boolean;
};

type VariableOption = {
  visibleName?: string;
  label?: string;
  promptValue: string;
};

type VariablePayload = {
  id?: string;
  name: string;
  label: string;
  description?: string;
  type: VariableType;
  defaultValue: unknown;
  options?: VariableOption[];
  min?: number;
  max?: number;
  required?: boolean;
  position: number;
};

type SaveBody = PromptPayload & {
  variables?: VariablePayload[];
};

function getErrorMessage(e: unknown) {
  if (e instanceof Error) return e.message;
  return String(e);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function getEncryptionKey(): Buffer {
  const keyB64 = process.env.FIELD_ENCRYPTION_KEY_B64;
  if (!keyB64) {
    throw new Error("FIELD_ENCRYPTION_KEY_B64 is not set");
  }
  const key = Buffer.from(keyB64, "base64");
  if (key.length !== 32) {
    throw new Error(
      `FIELD_ENCRYPTION_KEY_B64 must decode to 32 bytes (got ${key.length})`
    );
  }
  return key;
}

function encryptString(plaintext: string) {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(plaintext, "utf8")),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedContent: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  };
}

function decryptString(
  encryptedContentB64: string,
  ivB64: string,
  authTagB64: string
) {
  const key = getEncryptionKey();
  const iv = Buffer.from(ivB64, "base64");
  const authTag = Buffer.from(authTagB64, "base64");
  const encryptedContent = Buffer.from(encryptedContentB64, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([
    decipher.update(encryptedContent),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SaveBody;

    if (!body?.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    if (typeof body.content !== "string") {
      return NextResponse.json({ error: "content is required" }, { status: 400 });
    }

    if (body.id && !isUuid(body.id)) {
      return NextResponse.json({ error: "invalid id" }, { status: 400 });
    }

    const uploadedPhotos = Array.isArray(body.uploadedPhotos)
      ? body.uploadedPhotos.filter((p): p is string => typeof p === "string")
      : [];

    const supabase = getSupabaseServerClient();

    const { encryptedContent, iv, authTag } = encryptString(body.content);

    const nowIso = new Date().toISOString();

    const promptRow = {
      title: body.title,
      encrypted_content: encryptedContent,
      iv,
      auth_tag: authTag,
      user_id: body.userId ?? null,
      category: body.category ?? "",
      ai_model: body.aiModel ?? "gemini",
      price: typeof body.price === "number" ? body.price : 1,
      aspect_ratio: body.aspectRatio ?? null,
      photo_count: typeof body.photoCount === "number" ? body.photoCount : 1,
      prompt_type: body.promptType ?? "create-now",
      uploaded_photos: uploadedPhotos,
      resolution: body.resolution ?? null,
      is_free_showcase: Boolean(body.isFreeShowcase ?? false),
      public_prompt_text: body.content.slice(0, 220),
      updated_at: nowIso,
    };

    let promptId: string;

    if (body.id) {
      promptId = body.id;
      const { error: updateError } = await supabase
        .from("prompts")
        .update(promptRow)
        .eq("id", promptId);

      if (updateError) {
        throw updateError;
      }

      const { error: deleteError } = await supabase
        .from("variables")
        .delete()
        .eq("prompt_id", promptId);

      if (deleteError) {
        throw deleteError;
      }
    } else {
      const { data: inserted, error: insertError } = await supabase
        .from("prompts")
        .insert({
          ...promptRow,
          created_at: nowIso,
          downloads: 0,
          rating: 0,
        })
        .select("id")
        .single();

      if (insertError) {
        throw insertError;
      }

      promptId = String(inserted?.id ?? "");
      if (!promptId) {
        throw new Error("Failed to create prompt");
      }
    }

    const vars = Array.isArray(body.variables) ? body.variables : [];

    if (vars.length) {
      const variableRows = vars.map((v) => ({
        prompt_id: promptId,
        name: v.name,
        label: v.label,
        description: v.description || "",
        type: v.type,
        default_value: v.defaultValue ?? null,
        required: Boolean(v.required ?? false),
        position: v.position,
        min: v.min ?? null,
        max: v.max ?? null,
        options: v.options ?? null,
        created_at: nowIso,
        updated_at: nowIso,
      }));

      const { error: varsError } = await supabase
        .from("variables")
        .insert(variableRows);

      if (varsError) {
        throw varsError;
      }
    }

    return NextResponse.json({
      id: promptId,
      title: body.title,
      category: body.category ?? "",
      aiModel: body.aiModel ?? "gemini",
      price: typeof body.price === "number" ? body.price : 1,
      aspectRatio: body.aspectRatio ?? null,
      photoCount: typeof body.photoCount === "number" ? body.photoCount : 1,
      promptType: body.promptType ?? "create-now",
      uploadedPhotos: body.uploadedPhotos ?? [],
      resolution: body.resolution ?? null,
      isFreeShowcase: Boolean(body.isFreeShowcase ?? false),
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(e) || "Failed to save prompt" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    if (!isUuid(id)) {
      return NextResponse.json({ error: "invalid id" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    const { data: prompt, error: promptError } = await supabase
      .from("prompts")
      .select(
        "id,title,encrypted_content,iv,auth_tag,user_id,category,ai_model,price,aspect_ratio,photo_count,prompt_type,uploaded_photos,resolution,is_free_showcase"
      )
      .eq("id", id)
      .maybeSingle();

    if (promptError) {
      throw promptError;
    }

    if (!prompt) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const { data: variables, error: varsError } = await supabase
      .from("variables")
      .select(
        "id,prompt_id,name,label,description,type,default_value,required,position,min,max,options"
      )
      .eq("prompt_id", id)
      .order("position", { ascending: true });

    if (varsError) {
      throw varsError;
    }

    const content = decryptString(
      String(prompt.encrypted_content),
      String(prompt.iv),
      String(prompt.auth_tag)
    );

    return NextResponse.json({
      id,
      title: String(prompt.title ?? ""),
      content,
      userId: (prompt.user_id as string | null | undefined) ?? null,
      category: (prompt.category as string | undefined) ?? "",
      aiModel: (prompt.ai_model as string | undefined) ?? "gemini",
      price: typeof prompt.price === "number" ? prompt.price : 1,
      aspectRatio: (prompt.aspect_ratio as string | null | undefined) ?? null,
      photoCount: typeof prompt.photo_count === "number" ? prompt.photo_count : 1,
      promptType: (prompt.prompt_type as string | undefined) ?? "create-now",
      uploadedPhotos: Array.isArray(prompt.uploaded_photos)
        ? (prompt.uploaded_photos as string[])
        : [],
      resolution: (prompt.resolution as string | null | undefined) ?? null,
      isFreeShowcase: Boolean(prompt.is_free_showcase ?? false),
      variables: (Array.isArray(variables) ? variables : []).map((v) => ({
        id: typeof v.id === "string" ? v.id : undefined,
        promptId: typeof v.prompt_id === "string" ? v.prompt_id : id,
        name: String(v.name ?? ""),
        label: String(v.label ?? ""),
        description: typeof v.description === "string" ? v.description : "",
        type: String(v.type ?? ""),
        defaultValue: v.default_value ?? null,
        required: Boolean(v.required ?? false),
        position: typeof v.position === "number" ? v.position : 0,
        min: typeof v.min === "number" ? v.min : null,
        max: typeof v.max === "number" ? v.max : null,
        options: v.options ?? null,
      })),
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(e) || "Failed to load prompt" },
      { status: 500 }
    );
  }
}
