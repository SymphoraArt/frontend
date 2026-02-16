/**
 * Symphora storage – prompts, generations, users, likes.
 * Uses MySQL (Phase 2 will use MongoDB for scalability).
 * Same encryption and variable handling: prompt content stored encrypted; variables as in schema.
 */

import { getPool } from "./db-mysql";
import type { RowDataPacket } from "mysql2/promise";
import {
  type SymphoraPrompt,
  type PromptType,
  type PromptVariable,
  type SymphoraGeneration,
} from "./symphora-schema";
import { encryptPrompt } from "./encryption";

/** Prompt with string id (MySQL); _id has toString() for API compatibility. */
export type SymphoraPromptWithId = Omit<SymphoraPrompt, "_id"> & {
  _id: { toString: () => string };
  id: string;
};
/** Generation with string id (MySQL). */
export type SymphoraGenerationWithId = Omit<SymphoraGeneration, "_id"> & {
  _id: { toString: () => string };
  id: string;
};

const TABLES = {
  PROMPTS: "symphora_prompts",
  GENERATIONS: "symphora_generations",
  PROMPT_LIKES: "symphora_prompt_likes",
  USERS: "symphora_users",
} as const;

function getDatabase() {
  return getPool();
}

/** Parse string id to number for MySQL primary key; return null if invalid. */
function parseId(id: string): number | null {
  const n = Number(id);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/** Id-like object for API compatibility (symphora._id?.toString() === symphora.id). */
function toIdLike(id: number): { toString: () => string } {
  return { toString: () => String(id) };
}

interface PromptRow extends RowDataPacket {
  id: number;
  creator: string;
  type: string;
  title: string;
  description: string | null;
  category: string;
  ai_settings: string | null;
  pricing: string | null;
  prompt_data: string;
  showcase_images: string | null;
  stats: string | null;
  created_at: Date;
  updated_at: Date;
  published_at: Date | null;
  is_featured: number;
}

function rowToPrompt(row: PromptRow): SymphoraPromptWithId {
  const idStr = String(row.id);
  return {
    _id: toIdLike(row.id),
    creator: row.creator,
    type: row.type as PromptType,
    title: row.title,
    description: row.description ?? undefined,
    category: row.category,
    aiSettings: row.ai_settings ? JSON.parse(row.ai_settings) : undefined,
    promptData: JSON.parse(row.prompt_data),
    pricing: row.pricing ? JSON.parse(row.pricing) : undefined,
    showcaseImages: row.showcase_images ? JSON.parse(row.showcase_images) : undefined,
    stats: row.stats ? JSON.parse(row.stats) : undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at ?? undefined,
    isFeatured: Boolean(row.is_featured),
    id: idStr,
  };
}

/** Map editor variable type to Symphora type */
function mapVarType(
  t: string
): "text" | "multiselect" | "singleselect" | "slider" | "checkbox" {
  if (t === "multi-select") return "multiselect";
  if (t === "single-select" || t === "radio") return "singleselect";
  if (t === "text" || t === "checkbox" || t === "slider") return t as "text" | "checkbox" | "slider";
  return "text";
}

/** Build Symphora prompt from editor payload (on Release). Prompt content is always stored encrypted. */
export function buildSymphoraPromptFromEditor(params: {
  creator: string;
  title: string;
  content: string;
  category: string;
  promptType: "showcase" | "free-prompt" | "paid-prompt";
  price: number;
  aspectRatio: string | null;
  resolution: string | null;
  uploadedPhotos: string[];
  variables: Array<{
    name: string;
    description?: string;
    type: string;
    defaultValue: unknown;
    required: boolean;
    position: number;
    min?: number | null;
    max?: number | null;
    options?: Array<{ visibleName?: string; promptValue: string }> | null;
  }>;
  generatedImageUrl?: string | null;
}): Omit<SymphoraPrompt, "_id"> {
  const type: PromptType =
    params.promptType === "showcase"
      ? "showcase"
      : params.promptType === "free-prompt"
        ? "free"
        : "paid";

  const variables: PromptVariable[] = params.variables.map((v) => {
    const vType = mapVarType(v.type);
    const config: PromptVariable["config"] = {
      placeholder: undefined,
      options:
        v.options?.map((o) => ({
          title: o.visibleName ?? o.promptValue,
          value: o.promptValue,
        })) ?? undefined,
      min: v.min ?? undefined,
      max: v.max ?? undefined,
      step: 1,
      defaultValue: typeof v.defaultValue === "number" ? v.defaultValue : undefined,
    };
    if (vType === "checkbox") {
      config.checkedValue = (v as { promptValue?: string }).promptValue ?? "";
      config.uncheckedValue = "";
    }
    return {
      name: v.name,
      description: v.description ?? "",
      type: vType,
      required: v.required,
      config,
      defaultValue: v.defaultValue,
      order: v.position,
    };
  });

  const encrypted = encryptPrompt(params.content);
  const segments = [
    {
      type: "encrypted" as const,
      content: {
        encrypted: encrypted.encryptedContent,
        iv: encrypted.iv,
        authTag: encrypted.authTag,
      },
      variableName: undefined,
      order: 0,
    },
  ];

  // Only one image total: prefer generated image, else first uploaded photo.
  const singleImageUrl =
    params.generatedImageUrl ??
    (params.uploadedPhotos.length > 0 ? params.uploadedPhotos[0] : null);
  const showcaseImages =
    singleImageUrl
      ? [
          {
            url: singleImageUrl,
            thumbnail: singleImageUrl,
            isPrimary: true,
          },
        ]
      : [];

  const now = new Date();
  const stats = {
    totalGenerations: 0,
    bookmarks: 0,
    likes: 0,
    reviews: { total: 0, averageRating: 0, distribution: {} as Record<number, number> },
  };
  return {
    creator: params.creator,
    type,
    title: params.title,
    description: "",
    category: params.category,
    aiSettings: {
      aspectRatio: params.aspectRatio ?? undefined,
      includeText: false,
    },
    promptData: { segments, variables },
    pricing: type === "paid" ? { pricePerGeneration: params.price } : undefined,
    showcaseImages: showcaseImages.length ? showcaseImages : undefined,
    stats,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
    isFeatured: false,
  };
}

export async function createSymphoraPrompt(
  data: Omit<SymphoraPrompt, "_id">
): Promise<SymphoraPromptWithId> {
  const pool = getDatabase();
  if (!pool) throw new Error("MySQL not connected");

  const [insertResult] = await pool.execute(
    `INSERT INTO ${TABLES.PROMPTS} (
      creator, type, title, description, category, ai_settings, pricing,
      prompt_data, showcase_images, stats, created_at, updated_at, published_at, is_featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.creator,
      data.type,
      data.title,
      data.description ?? null,
      data.category,
      data.aiSettings ? JSON.stringify(data.aiSettings) : null,
      data.pricing ? JSON.stringify(data.pricing) : null,
      JSON.stringify(data.promptData),
      data.showcaseImages ? JSON.stringify(data.showcaseImages) : null,
      data.stats ? JSON.stringify(data.stats) : null,
      data.createdAt,
      data.updatedAt,
      data.publishedAt ?? null,
      data.isFeatured ? 1 : 0,
    ]
  );
  const insertId = (insertResult as { insertId?: number })?.insertId;
  if (insertId == null) throw new Error("Failed to get insert id");
  const [rows] = await pool.execute<PromptRow[]>(`SELECT * FROM ${TABLES.PROMPTS} WHERE id = ?`, [insertId]);
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  if (!row) throw new Error("Failed to read inserted prompt");
  return rowToPrompt(row);
}

export async function updateSymphoraPrompt(
  id: string,
  data: Omit<SymphoraPrompt, "_id">
): Promise<SymphoraPromptWithId | null> {
  const pool = getDatabase();
  if (!pool) return null;
  const pid = parseId(id);
  if (pid === null) return null;

  await pool.execute(
    `UPDATE ${TABLES.PROMPTS} SET
      type = ?, title = ?, description = ?, category = ?, ai_settings = ?, pricing = ?,
      prompt_data = ?, showcase_images = ?, stats = ?, updated_at = ?, published_at = ?, is_featured = ?
    WHERE id = ?`,
    [
      data.type,
      data.title,
      data.description ?? null,
      data.category,
      data.aiSettings ? JSON.stringify(data.aiSettings) : null,
      data.pricing ? JSON.stringify(data.pricing) : null,
      JSON.stringify(data.promptData),
      data.showcaseImages ? JSON.stringify(data.showcaseImages) : null,
      data.stats ? JSON.stringify(data.stats) : null,
      data.updatedAt,
      data.publishedAt ?? null,
      data.isFeatured ? 1 : 0,
      pid,
    ]
  );
  return getSymphoraPromptById(id);
}

export async function getSymphoraPromptById(
  id: string
): Promise<SymphoraPromptWithId | null> {
  const pool = getDatabase();
  if (!pool) return null;
  const pid = parseId(id);
  if (pid === null) return null;
  const [rows] = await pool.execute<PromptRow[]>(`SELECT * FROM ${TABLES.PROMPTS} WHERE id = ?`, [pid]);
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  if (!row) return null;
  return rowToPrompt(row);
}

/** Check if a prompt with the same creator and title already exists (for duplicate detection). */
export async function getSymphoraPromptByCreatorAndTitle(
  creator: string,
  title: string
): Promise<SymphoraPromptWithId | null> {
  const pool = getDatabase();
  if (!pool) return null;
  const [rows] = await pool.execute<PromptRow[]>(
    `SELECT * FROM ${TABLES.PROMPTS} WHERE creator = ? AND title = ? LIMIT 1`,
    [creator, title.trim()]
  );
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  if (!row) return null;
  return rowToPrompt(row);
}

export async function getSymphoraPromptsForMarketplace(params: {
  limit: number;
  cursor?: string;
  category?: string;
}): Promise<SymphoraPromptWithId[]> {
  const pool = getDatabase();
  if (!pool) return [];

  const conditions: string[] = ["type IN ('paid', 'free')"];
  const values: (string | number)[] = [];
  if (params.category) {
    conditions.push("category = ?");
    values.push(params.category);
  }
  const cursorId = params.cursor ? parseId(params.cursor) : null;
  if (cursorId !== null) {
    conditions.push("id < ?");
    values.push(cursorId);
  }
  values.push(params.limit);
  const where = conditions.join(" AND ");
  const [rows] = await pool.execute<PromptRow[]>(
    `SELECT * FROM ${TABLES.PROMPTS} WHERE ${where} ORDER BY created_at DESC LIMIT ?`,
    values
  );
  const list = Array.isArray(rows) ? rows : [];
  return list.map((r) => rowToPrompt(r));
}

export async function getSymphoraPromptsForShowroom(params: {
  limit: number;
  cursor?: string;
  category?: string;
}): Promise<SymphoraPromptWithId[]> {
  const pool = getDatabase();
  if (!pool) return [];

  const conditions: string[] = ["type = 'showcase'"];
  const values: (string | number)[] = [];
  if (params.category) {
    conditions.push("category = ?");
    values.push(params.category);
  }
  const where = conditions.join(" AND ");
  values.push(params.limit);
  const [rows] = await pool.execute<PromptRow[]>(
    `SELECT * FROM ${TABLES.PROMPTS} WHERE ${where} ORDER BY created_at DESC LIMIT ?`,
    values
  );
  const list = Array.isArray(rows) ? rows : [];
  return list.map((r) => rowToPrompt(r));
}

export async function getSymphoraPromptsByCreator(
  creatorWallet: string
): Promise<SymphoraPromptWithId[]> {
  const pool = getDatabase();
  if (!pool) return [];

  const [rows] = await pool.execute<PromptRow[]>(
    `SELECT * FROM ${TABLES.PROMPTS} WHERE creator = ? ORDER BY created_at DESC`,
    [creatorWallet]
  );
  const list = Array.isArray(rows) ? rows : [];
  return list.map((r) => rowToPrompt(r));
}

async function getPromptStatsLikes(pool: Awaited<ReturnType<typeof getPool>>, promptId: number): Promise<number> {
  if (!pool) return 0;
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT stats FROM ${TABLES.PROMPTS} WHERE id = ?`,
    [promptId]
  );
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  if (!row?.stats) return 0;
  const stats = typeof row.stats === "string" ? JSON.parse(row.stats) : row.stats;
  return Number(stats?.likes ?? 0) || 0;
}

export async function likeSymphoraPrompt(
  promptId: string,
  userId: string
): Promise<{ liked: boolean; likesCount: number }> {
  const pool = getDatabase();
  if (!pool) return { liked: false, likesCount: 0 };
  const pid = parseId(promptId);
  if (pid === null) return { liked: false, likesCount: 0 };

  const [existing] = await pool.execute<RowDataPacket[]>(
    `SELECT id FROM ${TABLES.PROMPT_LIKES} WHERE prompt_id = ? AND user_id = ?`,
    [pid, userId]
  );
  if (Array.isArray(existing) && existing.length > 0) {
    return { liked: true, likesCount: await getPromptStatsLikes(pool, pid) };
  }

  await pool.execute(
    `INSERT INTO ${TABLES.PROMPT_LIKES} (prompt_id, user_id) VALUES (?, ?)`,
    [pid, userId]
  );
  const [rows] = await pool.execute<RowDataPacket[]>(`SELECT stats FROM ${TABLES.PROMPTS} WHERE id = ?`, [pid]);
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  let stats = row?.stats ? (typeof row.stats === "string" ? JSON.parse(row.stats) : row.stats) : { likes: 0 };
  const newLikes = Math.max(0, Number(stats.likes ?? 0) + 1);
  stats = { ...stats, likes: newLikes };
  await pool.execute(`UPDATE ${TABLES.PROMPTS} SET stats = ?, updated_at = CURRENT_TIMESTAMP(3) WHERE id = ?`, [
    JSON.stringify(stats),
    pid,
  ]);
  return { liked: true, likesCount: newLikes };
}

export async function unlikeSymphoraPrompt(
  promptId: string,
  userId: string
): Promise<{ liked: boolean; likesCount: number }> {
  const pool = getDatabase();
  if (!pool) return { liked: false, likesCount: 0 };
  const pid = parseId(promptId);
  if (pid === null) return { liked: false, likesCount: 0 };

  const [del] = await pool.execute(`DELETE FROM ${TABLES.PROMPT_LIKES} WHERE prompt_id = ? AND user_id = ?`, [
    pid,
    userId,
  ]);
  const deleted = "affectedRows" in del ? (del as { affectedRows: number }).affectedRows : 0;
  if (deleted === 0) {
    return { liked: false, likesCount: await getPromptStatsLikes(pool, pid) };
  }

  const [rows] = await pool.execute<RowDataPacket[]>(`SELECT stats FROM ${TABLES.PROMPTS} WHERE id = ?`, [pid]);
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  let stats = row?.stats ? (typeof row.stats === "string" ? JSON.parse(row.stats) : row.stats) : { likes: 0 };
  const newLikes = Math.max(0, Number(stats.likes ?? 0) - 1);
  stats = { ...stats, likes: newLikes };
  await pool.execute(`UPDATE ${TABLES.PROMPTS} SET stats = ?, updated_at = CURRENT_TIMESTAMP(3) WHERE id = ?`, [
    JSON.stringify(stats),
    pid,
  ]);
  return { liked: false, likesCount: newLikes };
}

export async function getSymphoraPromptLikeCount(promptId: string): Promise<number> {
  const pool = getDatabase();
  if (!pool) return 0;
  const pid = parseId(promptId);
  if (pid === null) return 0;
  return getPromptStatsLikes(pool, pid);
}

export async function hasUserLikedSymphoraPrompt(promptId: string, userId: string): Promise<boolean> {
  const pool = getDatabase();
  if (!pool) return false;
  const pid = parseId(promptId);
  if (pid === null) return false;
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT id FROM ${TABLES.PROMPT_LIKES} WHERE prompt_id = ? AND user_id = ?`,
    [pid, userId]
  );
  return Array.isArray(rows) && rows.length > 0;
}

// ---- Generations ----
interface GenRow extends RowDataPacket {
  id: number;
  user_id: string;
  prompt_id: number;
  variable_values: string | null;
  reference_images: string | null;
  final_prompt: string | null;
  generated_image: string | null;
  used_settings: string | null;
  transaction_data: string | null;
  status: string;
  error_data: string | null;
  is_private: number;
  likes: number;
  bookmarks: number;
  created_at: Date;
  completed_at: Date | null;
}

function rowToGeneration(row: GenRow): SymphoraGenerationWithId {
  return {
    _id: toIdLike(row.id),
    id: String(row.id),
    user: row.user_id,
    prompt: String(row.prompt_id),
    variableValues: row.variable_values ? JSON.parse(row.variable_values) : undefined,
    referenceImages: row.reference_images ? JSON.parse(row.reference_images) : undefined,
    finalPrompt: row.final_prompt ? JSON.parse(row.final_prompt) : undefined,
    generatedImage: row.generated_image ? JSON.parse(row.generated_image) : undefined,
    usedSettings: row.used_settings ? JSON.parse(row.used_settings) : undefined,
    transaction: row.transaction_data ? JSON.parse(row.transaction_data) : undefined,
    status: row.status as SymphoraGeneration["status"],
    error: row.error_data ? JSON.parse(row.error_data) : undefined,
    isPrivate: Boolean(row.is_private),
    likes: row.likes,
    bookmarks: row.bookmarks,
    createdAt: row.created_at,
    completedAt: row.completed_at ?? undefined,
  };
}

export async function createSymphoraGeneration(params: {
  user: string;
  prompt: string;
  variableValues?: { variableName: string; value: unknown }[];
  referenceImages?: { url: string }[];
  generatedImage?: { url: string; thumbnail?: string };
  usedSettings?: { aspectRatio?: string; includeText?: boolean };
  status?: "pending" | "processing" | "completed" | "failed";
}): Promise<SymphoraGenerationWithId> {
  const pool = getDatabase();
  if (!pool) throw new Error("MySQL not connected");
  const pid = parseId(params.prompt);
  if (pid === null) throw new Error("Invalid prompt id");

  const now = new Date();
  const referenceImages = (params.referenceImages ?? []).map((r) => ({ url: r.url, uploadedAt: now }));
  const [insertResult] = await pool.execute(
    `INSERT INTO ${TABLES.GENERATIONS} (
      user_id, prompt_id, variable_values, reference_images, generated_image, used_settings, status, created_at, completed_at, likes, bookmarks
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`,
    [
      params.user,
      pid,
      params.variableValues ? JSON.stringify(params.variableValues) : null,
      JSON.stringify(referenceImages),
      params.generatedImage ? JSON.stringify(params.generatedImage) : null,
      params.usedSettings ? JSON.stringify(params.usedSettings ?? {}) : null,
      params.status ?? "completed",
      now,
      params.generatedImage ? now : null,
    ]
  );
  const insertId = (insertResult as { insertId?: number })?.insertId;
  if (insertId == null) throw new Error("Failed to get insert id");
  const [rows] = await pool.execute<GenRow[]>(`SELECT * FROM ${TABLES.GENERATIONS} WHERE id = ?`, [insertId]);
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  if (!row) throw new Error("Failed to read inserted generation");
  return rowToGeneration(row);
}

export async function getSymphoraGenerationsByUser(
  userWallet: string,
  limit = 50
): Promise<SymphoraGenerationWithId[]> {
  const pool = getDatabase();
  if (!pool) return [];

  const [rows] = await pool.execute<GenRow[]>(
    `SELECT * FROM ${TABLES.GENERATIONS} WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`,
    [userWallet, limit]
  );
  const list = Array.isArray(rows) ? rows : [];
  return list.map((r) => rowToGeneration(r));
}

export async function getSymphoraGenerationById(
  id: string
): Promise<SymphoraGenerationWithId | null> {
  const pool = getDatabase();
  if (!pool) return null;
  const gid = parseId(id);
  if (gid === null) return null;
  const [rows] = await pool.execute<GenRow[]>(`SELECT * FROM ${TABLES.GENERATIONS} WHERE id = ?`, [gid]);
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  if (!row) return null;
  return rowToGeneration(row);
}

export async function updateSymphoraGeneration(
  id: string,
  update: Partial<{
    generatedImage: SymphoraGeneration["generatedImage"];
    status: SymphoraGeneration["status"];
    error: SymphoraGeneration["error"];
    completedAt: Date;
  }>
): Promise<boolean> {
  const pool = getDatabase();
  if (!pool) return false;
  const gid = parseId(id);
  if (gid === null) return false;

  const set: string[] = ["updated_at = CURRENT_TIMESTAMP(3)"];
  const values: unknown[] = [];
  if (update.generatedImage !== undefined) {
    set.push("generated_image = ?");
    values.push(JSON.stringify(update.generatedImage));
  }
  if (update.status !== undefined) {
    set.push("status = ?");
    values.push(update.status);
  }
  if (update.error !== undefined) {
    set.push("error_data = ?");
    values.push(JSON.stringify(update.error));
  }
  if (update.completedAt !== undefined) {
    set.push("completed_at = ?");
    values.push(update.completedAt);
  }
  if (values.length === 0) return true;
  values.push(gid);
  const [res] = await pool.execute(`UPDATE ${TABLES.GENERATIONS} SET ${set.join(", ")} WHERE id = ?`, values);
  const affected = "affectedRows" in res ? (res as { affectedRows: number }).affectedRows : 0;
  return affected > 0;
}
