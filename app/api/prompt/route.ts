import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type VariableType =
  | "text"
  | "checkbox"
  | "image"
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
  tags?: string[];
  aiModel?: string;
  price?: number;
  aspectRatio?: string | null;
  photoCount?: number;
  promptType?: PromptType;
  uploadedPhotos?: string[];
  /* Each released render paired with the variable values that produced it,
     so the buyer image UI can surface the values per showcase image. */
  showcaseImages?: { url: string; values?: Record<string, string> }[];
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

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  if (e && typeof e === "object") {
    const obj = e as Record<string, unknown>;
    // Supabase errors are plain objects with message/details/hint/code
    const parts: string[] = [];
    if (typeof obj.message === "string" && obj.message) parts.push(obj.message);
    if (typeof obj.details === "string" && obj.details) parts.push(obj.details);
    if (typeof obj.hint === "string" && obj.hint) parts.push(`hint: ${obj.hint}`);
    if (typeof obj.code === "string" && obj.code) parts.push(`code: ${obj.code}`);
    if (parts.length > 0) return parts.join(" — ");
    try {
      return JSON.stringify(e);
    } catch {
      return "[unserializable error]";
    }
  }
  return String(e);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

/**
 * When the live DB hasn't had the encryption/showcase columns added yet,
 * Supabase/PostgREST rejects the write with PGRST204 naming the missing
 * column. Pull that column name out so we can drop it and retry — the prompt
 * still saves (plaintext `content`) instead of hard-failing the Release.
 */
function missingColumnFromError(e: unknown): string | null {
  if (e && typeof e === "object") {
    const obj = e as Record<string, unknown>;
    if (
      obj.code === "PGRST204" &&
      typeof obj.message === "string" &&
      obj.message.includes("column")
    ) {
      const m = /Could not find the '([^']+)' column/.exec(obj.message);
      if (m) return m[1];
    }
  }
  return null;
}

type PromptRow = Record<string, unknown>;

async function insertPromptWithFallback(
  supabase: ReturnType<typeof getSupabaseServerClient>,
  row: PromptRow
): Promise<{ id?: unknown } | null> {
  const current: PromptRow = { ...row };
  for (let i = 0; i < 12; i++) {
    const { data, error } = await supabase
      .from("prompts")
      .insert(current)
      .select("id")
      .single();
    if (!error) return data;
    const missing = missingColumnFromError(error);
    if (missing && missing in current) {
      delete current[missing];
      continue;
    }
    throw error;
  }
  throw new Error("Failed to insert prompt (too many unknown columns).");
}

async function updatePromptWithFallback(
  supabase: ReturnType<typeof getSupabaseServerClient>,
  row: PromptRow,
  id: string
): Promise<void> {
  const current: PromptRow = { ...row };
  for (let i = 0; i < 12; i++) {
    const { error } = await supabase.from("prompts").update(current).eq("id", id);
    if (!error) return;
    const missing = missingColumnFromError(error);
    if (missing && missing in current) {
      delete current[missing];
      continue;
    }
    throw error;
  }
  throw new Error("Failed to update prompt (too many unknown columns).");
}

/**
 * `prompts.creator_id` is a UUID FK to `users.id` — NOT the raw wallet string.
 * The wallet→user mapping lives in `user_wallets.address` (stored lowercased,
 * mirroring the auth route). Resolve the creator's user UUID from their wallet,
 * creating the user + wallet row on first publish (same as /api/auth/session).
 */
async function resolveCreatorUuid(
  supabase: ReturnType<typeof getSupabaseServerClient>,
  wallet: string
): Promise<string | null> {
  const address = wallet.trim().toLowerCase();
  if (!address) return null;

  const { data: walletRow } = await supabase
    .from("user_wallets")
    .select("user_id")
    .eq("address", address)
    .is("removed_at", null)
    .maybeSingle();
  if (walletRow?.user_id) return String(walletRow.user_id);

  // No mapping yet — create the user and link the wallet.
  const userInsert = await supabase.from("users").insert({}).select("id").single();
  if (userInsert.error || !userInsert.data?.id) {
    console.warn("[/api/prompt] could not create creator user:", userInsert.error);
    return null;
  }
  const userId = String(userInsert.data.id);
  const { error: linkError } = await supabase.from("user_wallets").insert({
    user_id: userId,
    address,
    chain_family: "solana",
    wallet_type: "external_eoa",
    is_primary: true,
  });
  if (linkError) {
    console.warn("[/api/prompt] could not link creator wallet:", linkError);
  }
  return userId;
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

    const tags = Array.isArray(body.tags)
      ? body.tags.filter((t): t is string => typeof t === "string")
      : [];

    const uploadedPhotos = Array.isArray(body.uploadedPhotos)
      ? body.uploadedPhotos.filter((p): p is string => typeof p === "string")
      : [];

    // Sanitize the {url, values} pairs for the showcase image strip.
    const showcaseImages = Array.isArray(body.showcaseImages)
      ? body.showcaseImages
          .filter((s) => s && typeof s.url === "string" && s.url)
          .map((s) => ({
            url: s.url,
            values:
              s.values && typeof s.values === "object" ? s.values : {},
          }))
      : [];

    const supabase = getSupabaseServerClient();

    const { encryptedContent, iv, authTag } = encryptString(body.content);

    const nowIso = new Date().toISOString();

    // Creator identity. `creator_id` is a NOT NULL UUID FK to `users.id`, so we
    // resolve the signed-in wallet to its user UUID (creating it on first
    // publish). We only stamp it when present so an update never nulls it.
    const creatorWallet =
      typeof body.userId === "string" && body.userId.trim()
        ? body.userId.trim()
        : null;
    const creatorId = creatorWallet
      ? await resolveCreatorUuid(supabase, creatorWallet)
      : null;

    const promptRow = {
      title: body.title,
      encrypted_content: encryptedContent,
      /* Schemas disagree on the IV/auth-tag column names. Some use the short
         `iv` / `auth_tag`, others the prefixed `encrypted_content_iv` /
         `encrypted_content_auth_tag` (and mark them NOT NULL). Write both —
         the PGRST204 fallback drops whichever columns don't exist, so the
         NOT NULL ones always get a value and the insert no longer 500s. */
      iv,
      auth_tag: authTag,
      tag: authTag,
      encrypted_content_iv: iv,
      encrypted_content_tag: authTag,
      encrypted_content_auth_tag: authTag,
      /* Plaintext fallback. On a DB that already has the encryption columns
         this is redundant (and dropped if no `content` column exists); on a DB
         that hasn't been migrated yet, the encryption columns get stripped via
         the PGRST204 retry and this keeps the full prompt body. */
      content: body.content,
      ...(creatorId ? { creator_id: creatorId, user_id: creatorId } : {}),
      category: body.category ?? "",
      tags,
      ai_model: body.aiModel ?? "gemini",
      price: typeof body.price === "number" ? body.price : 1,
      aspect_ratio: body.aspectRatio ?? null,
      photo_count: typeof body.photoCount === "number" ? body.photoCount : 1,
      prompt_type: body.promptType ?? "create-now",
      uploaded_photos: uploadedPhotos,
      resolution: body.resolution ?? null,
      is_free_showcase: Boolean(body.isFreeShowcase ?? false),
      /* Structured showcase strip: durable URL + the variable values used for
         each render. Dropped automatically (PGRST204 retry) on databases that
         don't have the column yet — `uploaded_photos` still carries the URLs. */
      showcase_images: showcaseImages,
      public_prompt_text: body.content.slice(0, 220),
      updated_at: nowIso,
    };

    let promptId: string;

    if (body.id) {
      promptId = body.id;
      await updatePromptWithFallback(supabase, promptRow, promptId);

      const { error: deleteError } = await supabase
        .from("variables")
        .delete()
        .eq("prompt_id", promptId);

      if (deleteError) {
        throw deleteError;
      }
    } else {
      if (!creatorId) {
        return NextResponse.json(
          { error: "Sign in to release a prompt." },
          { status: 401 }
        );
      }
      const inserted = await insertPromptWithFallback(supabase, {
        ...promptRow,
        created_at: nowIso,
        downloads: 0,
        rating: 0,
      });

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
      tags: body.tags ?? [],
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
    console.error("/api/prompt POST failed:", e);
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
      .select("*")
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

    // Accept either column-naming convention for the IV / auth tag, and fall
    // back to the plaintext `content` column if the row was saved un-encrypted.
    const ivValue = (prompt.iv ?? prompt.encrypted_content_iv) as string | undefined;
    const authTagValue = (prompt.auth_tag ??
      prompt.tag ??
      prompt.encrypted_content_tag ??
      prompt.encrypted_content_auth_tag) as string | undefined;
    let content = typeof prompt.content === "string" ? prompt.content : "";
    if (prompt.encrypted_content && ivValue && authTagValue) {
      try {
        content = decryptString(
          String(prompt.encrypted_content),
          String(ivValue),
          String(authTagValue)
        );
      } catch {
        // Fall back to whatever plaintext content we have.
      }
    }

    return NextResponse.json({
      id,
      title: String(prompt.title ?? ""),
      content,
      userId: (prompt.user_id as string | null | undefined) ?? null,
      category: (prompt.category as string | undefined) ?? "",
      tags: Array.isArray(prompt.tags) ? (prompt.tags as string[]) : [],
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
