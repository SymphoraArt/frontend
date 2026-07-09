import { z } from "zod";

// ==================== Prompts ====================
export const promptSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  encryptedContent: z.string(),
  iv: z.string(),
  authTag: z.string(),
  userId: z.string().optional(),
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
