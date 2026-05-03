/**
 * Enki storage – prompts, generations, users, likes.
 * Uses MySQL (Phase 2 will use MongoDB for scalability).
 * Same encryption and variable handling: prompt content stored encrypted; variables as in schema.
 */

import { getPool } from "./db-mysql";
import type { RowDataPacket } from "mysql2/promise";
import {
  type EnkiPrompt,
  type PromptType,
  type PromptVariable,
  type EnkiGeneration,
} from "./enki-schema";
import { encryptPrompt } from "./encryption";

/** Prompt with string id (MySQL); _id has toString() for API compatibility. */
export type EnkiPromptWithId = Omit<EnkiPrompt, "_id"> & {
  _id: { toString: () => string };
  id: string;
};
/** Generation with string id (MySQL). */
export type EnkiGenerationWithId = Omit<EnkiGeneration, "_id"> & {
  _id: { toString: () => string };
  id: string;
};

const TABLES = {
  PROMPTS: "symphora_prompts",
  GENERATIONS: "symphora_generations",
  PROMPT_LIKES: "symphora_prompt_likes",
  USERS: "symphora_users",
  PROFILE: "symphora_profile",
  FOLLOWS: "symphora_follows",
} as const;

function getDatabase() {
  return getPool();
}

/** Parse string id to number for MySQL primary key; return null if invalid. */
function parseId(id: string): number | null {
  const n = Number(id);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/** Id-like object for API compatibility (prompt._id?.toString() === prompt.id). */
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

function safeParseJSON(value: any) {
  if (value == null) return undefined;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error("Failed to parse JSON:", e, value);
    return undefined;
  }
}

function rowToPrompt(row: PromptRow): EnkiPromptWithId {
  const idStr = String(row.id);
  return {
    _id: toIdLike(row.id),
    creator: row.creator,
    type: row.type as PromptType,
    title: row.title,
    description: row.description ?? undefined,
    category: row.category,
    aiSettings: safeParseJSON(row.ai_settings),
    promptData: safeParseJSON(row.prompt_data) ?? { segments: [], variables: [] },
    pricing: safeParseJSON(row.pricing),
    showcaseImages: safeParseJSON(row.showcase_images),
    stats: safeParseJSON(row.stats),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at ?? undefined,
    isFeatured: Boolean(row.is_featured),
    id: idStr,
  };
}

/** Map editor variable type to Enki type */
function mapVarType(
  t: string
): "text" | "multiselect" | "singleselect" | "slider" | "checkbox" {
  if (t === "multi-select") return "multiselect";
  if (t === "single-select" || t === "radio") return "singleselect";
  if (t === "text" || t === "checkbox" || t === "slider") return t as "text" | "checkbox" | "slider";
  return "text";
}

/** Build Enki prompt from editor payload (on Release). Prompt content is always stored encrypted. */
export function buildEnkiPromptFromEditor(params: {
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
  generatedImageUrls?: string[];
  /** Artist choice: use prompt enhancement when users generate (default true). */
  usePromptEnhancement?: boolean;
}): Omit<EnkiPrompt, "_id"> {
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

  const selectedGenerated = Array.isArray(params.generatedImageUrls)
    ? params.generatedImageUrls.filter((url) => typeof url === "string" && url.length > 0)
    : [];
  const fallbackSingle =
    params.generatedImageUrl ??
    (params.uploadedPhotos.length > 0 ? params.uploadedPhotos[0] : null);
  const showcaseSource = selectedGenerated.length > 0
    ? selectedGenerated
    : fallbackSingle
      ? [fallbackSingle]
      : [];
  const showcaseImages = showcaseSource.map((url, index) => ({
    url,
    thumbnail: url,
    isPrimary: index === 0,
  }));

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
      usePromptEnhancement: params.usePromptEnhancement !== false,
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

export async function createEnkiPrompt(
  data: Omit<EnkiPrompt, "_id">
): Promise<EnkiPromptWithId> {
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

export async function updateEnkiPrompt(
  id: string,
  data: Omit<EnkiPrompt, "_id">
): Promise<EnkiPromptWithId | null> {
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
  return getEnkiPromptById(id);
}

export async function getEnkiPromptById(
  id: string
): Promise<EnkiPromptWithId | null> {
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
export async function getEnkiPromptByCreatorAndTitle(
  creator: string,
  title: string
): Promise<EnkiPromptWithId | null> {
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

export async function getEnkiPromptsForMarketplace(params: {
  limit: number;
  cursor?: string;
  category?: string;
  /** When set, only prompts from these creator wallets are returned */
  followList?: string[];
}): Promise<EnkiPromptWithId[]> {
  const pool = getDatabase();
  if (!pool) return [];

  if (params.followList && params.followList.length === 0) return [];

  const conditions: string[] = ["type IN ('paid', 'free')"];
  const values: (string | number)[] = [];
  if (params.followList && params.followList.length > 0) {
    const placeholders = params.followList.map(() => "?").join(", ");
    conditions.push(`creator IN (${placeholders})`);
    values.push(...params.followList.map(normWallet));
  }
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

export async function getEnkiPromptsForShowroom(params: {
  limit: number;
  cursor?: string;
  category?: string;
  /** When set, only prompts from these creator wallets are returned */
  followList?: string[];
}): Promise<EnkiPromptWithId[]> {
  const pool = getDatabase();
  if (!pool) return [];

  if (params.followList && params.followList.length === 0) return [];

  const conditions: string[] = ["type = 'showcase'"];
  const values: (string | number)[] = [];
  if (params.followList && params.followList.length > 0) {
    const placeholders = params.followList.map(() => "?").join(", ");
    conditions.push(`creator IN (${placeholders})`);
    values.push(...params.followList.map(normWallet));
  }
  if (params.category) {
    conditions.push("category = ?");
    values.push(params.category);
  }
  const cursorId = params.cursor ? parseId(params.cursor) : null;
  if (cursorId !== null) {
    conditions.push("id < ?");
    values.push(cursorId);
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

export async function getEnkiPromptsByCreator(
  creatorWallet: string
): Promise<EnkiPromptWithId[]> {
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

export async function likeEnkiPrompt(
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

export async function unlikeEnkiPrompt(
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

export async function getEnkiPromptLikeCount(promptId: string): Promise<number> {
  const pool = getDatabase();
  if (!pool) return 0;
  const pid = parseId(promptId);
  if (pid === null) return 0;
  return getPromptStatsLikes(pool, pid);
}

export async function hasUserLikedEnkiPrompt(promptId: string, userId: string): Promise<boolean> {
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

function rowToGeneration(row: GenRow): EnkiGenerationWithId {
  return {
    _id: toIdLike(row.id),
    id: String(row.id),
    user: row.user_id,
    prompt: String(row.prompt_id),
    variableValues: safeParseJSON(row.variable_values),
    referenceImages: safeParseJSON(row.reference_images),
    finalPrompt: safeParseJSON(row.final_prompt),
    generatedImage: safeParseJSON(row.generated_image),
    usedSettings: safeParseJSON(row.used_settings),
    transaction: safeParseJSON(row.transaction_data),
    status: row.status as EnkiGeneration["status"],
    error: safeParseJSON(row.error_data),
    isPrivate: Boolean(row.is_private),
    likes: row.likes,
    bookmarks: row.bookmarks,
    createdAt: row.created_at,
    completedAt: row.completed_at ?? undefined,
  };
}

export async function createEnkiGeneration(params: {
  user: string;
  prompt: string;
  variableValues?: { variableName: string; value: unknown }[];
  referenceImages?: { url: string }[];
  generatedImage?: { url: string; thumbnail?: string };
  usedSettings?: { aspectRatio?: string; includeText?: boolean };
  status?: "pending" | "processing" | "completed" | "failed";
}): Promise<EnkiGenerationWithId> {
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

export async function getEnkiGenerationsByUser(
  userWallet: string,
  limit = 50
): Promise<EnkiGenerationWithId[]> {
  const pool = getDatabase();
  if (!pool) return [];

  const [rows] = await pool.execute<GenRow[]>(
    `SELECT * FROM ${TABLES.GENERATIONS} WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`,
    [userWallet, limit]
  );
  const list = Array.isArray(rows) ? rows : [];
  return list.map((r) => rowToGeneration(r));
}

export async function getEnkiGenerationById(
  id: string
): Promise<EnkiGenerationWithId | null> {
  const pool = getDatabase();
  if (!pool) return null;
  const gid = parseId(id);
  if (gid === null) return null;
  const [rows] = await pool.execute<GenRow[]>(`SELECT * FROM ${TABLES.GENERATIONS} WHERE id = ?`, [gid]);
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  if (!row) return null;
  return rowToGeneration(row);
}

export async function updateEnkiGeneration(
  id: string,
  update: Partial<{
    generatedImage: EnkiGeneration["generatedImage"];
    status: EnkiGeneration["status"];
    error: EnkiGeneration["error"];
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

// ---- Profile (avatar, banner, bio by wallet) ----
export type EnkiProfile = {
  wallet: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  updatedAt: Date;
};

export async function getEnkiProfileByWallet(wallet: string): Promise<EnkiProfile | null> {
  const pool = getDatabase();
  if (!pool) return null;
  const normalized = wallet.trim().toLowerCase();
  if (!normalized) return null;
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT wallet, avatar_url, banner_url, bio, updated_at FROM ${TABLES.PROFILE} WHERE wallet = ?`,
    [normalized]
  );
  const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
  if (!row) return null;
  return {
    wallet: String(row.wallet),
    avatarUrl: row.avatar_url != null ? String(row.avatar_url) : null,
    bannerUrl: row.banner_url != null ? String(row.banner_url) : null,
    bio: row.bio != null ? String(row.bio) : null,
    updatedAt: row.updated_at,
  };
}

export async function upsertEnkiProfile(
  wallet: string,
  update: { avatarUrl?: string | null; bannerUrl?: string | null; bio?: string | null }
): Promise<EnkiProfile> {
  const pool = getDatabase();
  if (!pool) throw new Error("MySQL not connected");
  const normalized = wallet.trim().toLowerCase();
  if (!normalized) throw new Error("Wallet is required");

  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT wallet, avatar_url, banner_url, bio, updated_at FROM ${TABLES.PROFILE} WHERE wallet = ?`,
    [normalized]
  );
  const existing = Array.isArray(rows) && rows[0] ? rows[0] : null;

  const avatarUrl = update.avatarUrl !== undefined ? (update.avatarUrl || null) : (existing?.avatar_url ?? null);
  const bannerUrl = update.bannerUrl !== undefined ? (update.bannerUrl || null) : (existing?.banner_url ?? null);
  const bio = update.bio !== undefined ? (update.bio?.slice(0, 280) || null) : (existing?.bio ?? null);

  if (existing) {
    await pool.execute(
      `UPDATE ${TABLES.PROFILE} SET avatar_url = ?, banner_url = ?, bio = ?, updated_at = CURRENT_TIMESTAMP(3) WHERE wallet = ?`,
      [avatarUrl, bannerUrl, bio, normalized]
    );
  } else {
    await pool.execute(
      `INSERT INTO ${TABLES.PROFILE} (wallet, avatar_url, banner_url, bio) VALUES (?, ?, ?, ?)`,
      [normalized, avatarUrl, bannerUrl, bio]
    );
  }

  const [after] = await pool.execute<RowDataPacket[]>(
    `SELECT wallet, avatar_url, banner_url, bio, updated_at FROM ${TABLES.PROFILE} WHERE wallet = ?`,
    [normalized]
  );
  const row = Array.isArray(after) && after[0] ? after[0] : null;
  if (!row) throw new Error("Failed to read profile after upsert");
  return {
    wallet: String(row.wallet),
    avatarUrl: row.avatar_url != null ? String(row.avatar_url) : null,
    bannerUrl: row.banner_url != null ? String(row.banner_url) : null,
    bio: row.bio != null ? String(row.bio) : null,
    updatedAt: row.updated_at,
  };
}

// ---- Follows ----
function normWallet(w: string): string {
  return w.trim().toLowerCase();
}

export async function getEnkiFollowedWallets(followerWallet: string): Promise<string[]> {
  const pool = getDatabase();
  if (!pool) return [];
  const follower = normWallet(followerWallet);
  if (!follower) return [];
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT following FROM ${TABLES.FOLLOWS} WHERE follower = ?`,
    [follower]
  );
  return (Array.isArray(rows) ? rows : []).map((r) => String(r.following));
}

export async function addEnkiFollow(followerWallet: string, followingWallet: string): Promise<void> {
  const pool = getDatabase();
  if (!pool) throw new Error("MySQL not connected");
  const follower = normWallet(followerWallet);
  const following = normWallet(followingWallet);
  if (!follower || !following || follower === following) return;
  await pool.execute(
    `INSERT IGNORE INTO ${TABLES.FOLLOWS} (follower, following) VALUES (?, ?)`,
    [follower, following]
  );
}

export async function removeEnkiFollow(followerWallet: string, followingWallet: string): Promise<void> {
  const pool = getDatabase();
  if (!pool) return;
  const follower = normWallet(followerWallet);
  const following = normWallet(followingWallet);
  if (!follower || !following) return;
  await pool.execute(`DELETE FROM ${TABLES.FOLLOWS} WHERE follower = ? AND following = ?`, [
    follower,
    following,
  ]);
}

export async function isEnkiFollowing(followerWallet: string, followingWallet: string): Promise<boolean> {
  const pool = getDatabase();
  if (!pool) return false;
  const follower = normWallet(followerWallet);
  const following = normWallet(followingWallet);
  if (!follower || !following) return false;
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT 1 FROM ${TABLES.FOLLOWS} WHERE follower = ? AND following = ? LIMIT 1`,
    [follower, following]
  );
  return Array.isArray(rows) && rows.length > 0;
}
