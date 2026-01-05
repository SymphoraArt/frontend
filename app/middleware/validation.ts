/**
 * API Validation Middleware
 *
 * Provides validation utilities and response helpers for API routes
 */

import { z } from 'zod';
import { NextResponse } from 'next/server';

// ==================== Schemas ====================

export const createGenerationSchema = z.object({
  userId: z.string().optional(), // Optional for now, can be extracted from session
  promptId: z.string().uuid(),
  variableValues: z.array(z.object({
    variableName: z.string(),
    value: z.union([
      z.string(),
      z.array(z.string()),
      z.number(),
      z.boolean()
    ])
  })),
  settings: z.object({
    aspectRatio: z.string().optional(),
    numImages: z.number().int().min(1).max(4).optional(),
    modelVersion: z.string().optional(),
    additionalParams: z.record(z.any()).optional(),
  }).optional(),
  transactionHash: z.string().optional(),
});

export const getGenerationsQuerySchema = z.preprocess(
  (data) => {
    const obj = data as Record<string, unknown>;
    return {
      limit: obj.limit ? String(obj.limit) : '20',
      offset: obj.offset ? String(obj.offset) : '0',
      status: obj.status,
    };
  },
  z.object({
    limit: z.string().transform((val) => {
      const num = Number(val);
      if (isNaN(num) || num <= 0 || num > 50) {
        throw new Error('Limit must be between 1 and 50');
      }
      return num;
    }),
    offset: z.string().transform((val) => {
      const num = Number(val);
      if (isNaN(num) || num < 0) {
        throw new Error('Offset must be non-negative');
      }
      return num;
    }),
    status: z.enum(['pending', 'payment_verified', 'generating', 'completed', 'failed']).optional(),
  })
);

// ==================== Validation Functions ====================

export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: true;
  data: T;
} | {
  success: false;
  error: z.ZodError;
  errorMessages: string[];
} {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return {
      success: false,
      error: result.error,
      errorMessages: result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
    };
  }
}

export function validateQuery<T>(schema: z.ZodSchema<T>, data: Record<string, unknown>): {
  success: true;
  data: T;
} | {
  success: false;
  error: z.ZodError;
  errorMessages: string[];
} {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return {
      success: false,
      error: result.error,
      errorMessages: result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
    };
  }
}

// ==================== Response Helpers ====================

export function createSuccessResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({
    success: true,
    data,
  }, { status });
}

export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: string | string[]
): NextResponse {
  const errorResponse: any = {
    success: false,
    error: {
      message,
    },
  };

  if (details) {
    errorResponse.error.details = Array.isArray(details) ? details : [details];
  }

  return NextResponse.json(errorResponse, { status });
}
