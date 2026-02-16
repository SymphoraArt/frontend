import { z } from 'zod';

// ==================== Generations ====================

export const generationStatusSchema = z.enum([
  'pending',
  'payment_verified',
  'generating',
  'completed',
  'failed'
]);

export const generationSettingsSchema = z.object({
  aspectRatio: z.string().optional(),
  numImages: z.number().int().min(1).max(4).optional(),
  modelVersion: z.string().optional(),
  additionalParams: z.record(z.string(), z.any()).optional(),
});

export const variableValueSchema = z.object({
  variableName: z.string(),
  value: z.union([
    z.string(),
    z.array(z.string()),
    z.number(),
    z.boolean()
  ]),
});

export const generationSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  promptId: z.string().uuid(),
  finalPrompt: z.string(), // Encrypted final prompt after variable substitution
  finalPromptIv: z.string().optional(),
  finalPromptAuthTag: z.string().optional(),
  variableValues: z.array(variableValueSchema),
  settings: generationSettingsSchema,
  transactionHash: z.string().optional(),
  paymentVerified: z.boolean().default(false),
  amountPaid: z.string().optional(), // in wei/smallest unit
  status: generationStatusSchema.default('pending'),
  imageUrls: z.array(z.string()).optional(),
  errorMessage: z.string().optional(),
  retryCount: z.number().int().default(0),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  completedAt: z.string().optional(),
});

export const insertGenerationSchema = generationSchema.omit({
  id: true,
  // These timestamp fields are filled by the database
  createdAt: true,
  updatedAt: true,
  completedAt: true
});

export type Generation = z.infer<typeof generationSchema>;
export type InsertGeneration = z.infer<typeof insertGenerationSchema>;
export type GenerationStatus = z.infer<typeof generationStatusSchema>;
export type VariableValue = z.infer<typeof variableValueSchema>;
export type GenerationSettings = z.infer<typeof generationSettingsSchema>;

// ==================== Generation Stats ====================

export const generationStatsSchema = z.object({
  totalGenerations: z.number().int(),
  successfulGenerations: z.number().int(),
  failedGenerations: z.number().int(),
  averageGenerationTime: z.number().optional(),
  totalRevenue: z.string().optional(), // in wei
  platformFeesCollected: z.string().optional(), // in wei
  topPrompts: z.array(z.object({
    promptId: z.string(),
    title: z.string(),
    usageCount: z.number().int()
  })).optional(),
});

export type GenerationStats = z.infer<typeof generationStatsSchema>;

// ==================== Database Helper Types ====================

export interface DatabaseError extends Error {
  code?: string;
  details?: string;
  hint?: string;
}

export interface QueryResult<T> {
  data: T[] | null;
  error: DatabaseError | null;
  count?: number;
}

export interface SingleQueryResult<T> {
  data: T | null;
  error: DatabaseError | null;
}
