import { z } from "zod";
import { ObjectId } from "mongodb";

// Zod schema for converting MongoDB ObjectId to string
const objectIdSchema = z.union([
  z.string(),
  z.instanceof(ObjectId),
]).transform((val) => val instanceof ObjectId ? val.toString() : val);

// ==================== Users ====================
export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertUserSchema = userSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// ==================== Prompts ====================
export const promptSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  encryptedContent: z.string(),
  iv: z.string(),
  authTag: z.string(),
  userId: z.string().optional(),
  artistId: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  aiModel: z.string().default("gemini"),
  price: z.number().int().default(1),
  aspectRatio: z.string().optional(),
  photoCount: z.number().int().default(1),
  promptType: z.string().default("create-now"),
  uploadedPhotos: z.array(z.string()).optional(),
  resolution: z.string().optional(),
  previewImageUrl: z.string().optional(),
  downloads: z.number().int().default(0),
  rating: z.number().int().default(0),
  createdAt: z.string().optional(),
  isFreeShowcase: z.boolean().default(false),
  publicPromptText: z.string().optional(),
});

export const insertPromptSchema = promptSchema.omit({ id: true, createdAt: true });

export type Prompt = z.infer<typeof promptSchema>;
export type InsertPrompt = z.infer<typeof insertPromptSchema>;

// ==================== Variables ====================
export interface VariableOption {
  label: string;
  promptValue: string;
}

const variableOptionSchema: z.ZodType<VariableOption> = z.object({
  label: z.string(),
  promptValue: z.string(),
});

export const variableSchema = z.object({
  id: z.string().optional(),
  promptId: z.string().min(1),
  name: z.string().min(1),
  label: z.string().min(1),
  description: z.string().default(""),
  type: z.string().min(1),
  defaultValue: z.any().optional(), // JSONB -> any (flexible type)
  required: z.boolean().default(false),
  allowReferenceImage: z.boolean().default(false),
  position: z.number().int().min(0),
  min: z.number().int().optional(),
  max: z.number().int().optional(),
  step: z.number().int().default(1),
  options: z.array(variableOptionSchema).optional(),
  defaultOptionIndex: z.number().int().default(0),
  placeholder: z.string().optional(),
});

export const insertVariableSchema = variableSchema.omit({ id: true });

export type Variable = z.infer<typeof variableSchema>;
export type InsertVariable = z.infer<typeof insertVariableSchema>;

// ==================== Artists ====================
export const artistSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(1),
  displayName: z.string().min(1),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  coverImageUrl: z.string().optional(),
  followerCount: z.number().int().default(0),
  followingCount: z.number().int().default(0),
});

export const insertArtistSchema = artistSchema.omit({ id: true });

export type Artist = z.infer<typeof artistSchema>;
export type InsertArtist = z.infer<typeof insertArtistSchema>;

// ==================== Artworks ====================
export const artworkSchema = z.object({
  id: z.string().optional(),
  artistId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().min(1),
  promptUsed: z.string().optional(),
  promptId: z.string().optional(),
  likes: z.number().int().default(0),
  views: z.number().int().default(0),
  isPublic: z.boolean().default(true),
  tags: z.any().optional(), // JSONB -> any
  createdAt: z.string().optional(),
});

export const insertArtworkSchema = artworkSchema.omit({ id: true, createdAt: true });

export type Artwork = z.infer<typeof artworkSchema>;
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;

// ==================== Generated Variations ====================
export const generatedVariationSchema = z.object({
  id: z.string().optional(),
  artworkId: z.string().min(1),
  userId: z.string().min(1),
  imageUrl: z.string().min(1),
  watermarkedImageUrl: z.string().optional(),
  isAccepted: z.boolean().default(false),
  settings: z.any().optional(), // JSONB -> any
  createdAt: z.string().optional(),
});

export const insertGeneratedVariationSchema = generatedVariationSchema.omit({
  id: true,
  createdAt: true
});

export type GeneratedVariation = z.infer<typeof generatedVariationSchema>;
export type InsertGeneratedVariation = z.infer<typeof insertGeneratedVariationSchema>;

// ==================== Artwork Comments ====================
export const artworkCommentSchema = z.object({
  id: z.string().optional(),
  artworkId: z.string().min(1),
  userId: z.string().min(1),
  username: z.string().min(1),
  content: z.string().min(1),
  createdAt: z.string().optional(),
});

export const insertArtworkCommentSchema = artworkCommentSchema.omit({
  id: true,
  createdAt: true
});

export type ArtworkComment = z.infer<typeof artworkCommentSchema>;
export type InsertArtworkComment = z.infer<typeof insertArtworkCommentSchema>;
