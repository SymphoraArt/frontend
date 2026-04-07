import { NextResponse } from 'next/server';
import { z } from 'zod';

// Generation creation schema (encryptedPrompt optional when promptId provided – backend can fetch prompt)
// Accept either userId or userKey (legacy) in body
export const createGenerationSchema = z.object({
  userId: z.string().min(1).optional(),
  userKey: z.string().min(1).optional(),
  promptId: z.string().min(1, 'promptId is required'),
  encryptedPrompt: z.string().min(1).optional(),
  iv: z.string().optional(),
  authTag: z.string().optional(),
  variableValues: z.array(z.object({
    variableName: z.string().min(1),
    value: z.union([z.string(), z.array(z.string()), z.number(), z.boolean()])
  })).optional().default([]),
  settings: z.object({
    aspectRatio: z.string().nullable().optional().transform(v => v ?? undefined),
    resolution: z.string().nullable().optional().transform(v => v ?? undefined),
    numImages: z.number().int().min(1).max(4).optional(),
    modelVersion: z.string().optional(),
    additionalParams: z.record(z.string(), z.any()).optional(),
  }).optional().default({}),
  transactionHash: z.string().optional(),
  /** Free prompts only: user-edited prompt text (not persisted on prompt record). Server accepts only when prompt type is `free`. */
  finalPromptOverride: z.string().min(1).max(100_000).optional(),
});

// Generation update schema
export const updateGenerationSchema = z.object({
  status: z.enum(['pending', 'payment_verified', 'generating', 'completed', 'failed']).optional(),
  imageUrls: z.array(z.string()).optional(),
  errorMessage: z.string().optional(),
  completedAt: z.string().optional(),
});

// User generations query schema
export const getGenerationsQuerySchema = z.object({
  limit: z.string().transform(val => Math.min(parseInt(val) || 50, 100)).optional(),
  offset: z.string().transform(val => Math.max(parseInt(val) || 0, 0)).optional(),
  promptId: z.string().min(1).optional(),
});

/**
 * Validates request body against a Zod schema
 */
export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: true;
  data: T;
} | {
  success: false;
  errors: z.ZodIssue[];
} {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, errors: result.error.issues };
  }
}

/**
 * Validates query parameters against a Zod schema
 */
export function validateQuery<T>(schema: z.ZodSchema<T>, searchParams: URLSearchParams): {
  success: true;
  data: T;
} | {
  success: false;
  errors: z.ZodIssue[];
} {
  const queryData: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    queryData[key] = value;
  }

  const result = schema.safeParse(queryData);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, errors: result.error.issues };
  }
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: any
): NextResponse {
  const errorResponse = {
    error: message,
    ...(details && { details }),
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(errorResponse, { status });
}

/**
 * Creates a standardized success response
 */
export function createSuccessResponse(
  data: any,
  status: number = 200
): NextResponse {
  return NextResponse.json(data, { status });
}

/**
 * Validates UUID format
 */
export function isValidUUID(uuid: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

/**
 * Middleware wrapper for validation
 */
export function withValidation<T>(
  schema: z.ZodSchema<T>,
  handler: (validatedData: T, req: Request, context?: any) => Promise<NextResponse> | NextResponse
) {
  return async (req: Request, context?: any): Promise<NextResponse> => {
    try {
      const body = await req.json();
      const validation = validateBody(schema, body);

      if (!validation.success) {
        const errorMessages = validation.errors.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`);
        return createErrorResponse('Validation failed', 400, errorMessages);
      }

      return await handler(validation.data, req, context);
    } catch (error: any) {
      console.error('Validation middleware error:', error);
      return createErrorResponse('Internal server error', 500);
    }
  };
}
