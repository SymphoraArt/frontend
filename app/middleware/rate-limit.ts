/**
 * Rate Limiting Middleware
 *
 * Protects API endpoints from abuse with configurable rate limits
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRateLimitConfig } from '../lib/config/environment';

// In-memory store for rate limiting (use Redis in production)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimitStore {
  private store = new Map<string, RateLimitEntry>();

  get(key: string): RateLimitEntry | undefined {
    const entry = this.store.get(key);
    if (entry && Date.now() > entry.resetTime) {
      this.store.delete(key);
      return undefined;
    }
    return entry;
  }

  set(key: string, entry: RateLimitEntry): void {
    this.store.set(key, entry);
  }

  increment(key: string, windowMs: number): { count: number; resetTime: number } {
    const now = Date.now();
    const resetTime = now + windowMs;
    const existing = this.get(key);

    if (existing) {
      existing.count++;
      return { count: existing.count, resetTime: existing.resetTime };
    } else {
      const newEntry = { count: 1, resetTime };
      this.set(key, newEntry);
      return { count: 1, resetTime };
    }
  }

  // Cleanup old entries (should be called periodically)
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

const rateLimitStore = new RateLimitStore();

// Cleanup old entries every 5 minutes (skip during build)
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build' && process.env.NEXT_PHASE !== 'phase-development-build') {
  setInterval(() => {
    rateLimitStore.cleanup();
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  requests: number;
  windowMs: number;
  identifier?: (request: NextRequest) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

/**
 * Rate limiting middleware
 */
export function createRateLimit(options: RateLimitOptions) {
  return async function rateLimitMiddleware(
    request: NextRequest,
    response?: NextResponse
  ): Promise<{ success: boolean; response?: NextResponse }> {
    const config = getRateLimitConfig();

    // Get client identifier (IP address by default)
    const identifier = options.identifier
      ? options.identifier(request)
      : getClientIP(request);

    const key = `rate-limit:${identifier}`;
    const { count, resetTime } = rateLimitStore.increment(key, options.windowMs);

    // Check if limit exceeded
    if (count > options.requests) {
      const resetDate = new Date(resetTime);
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

      console.warn(`Rate limit exceeded for ${identifier}: ${count}/${options.requests}`);

      return {
        success: false,
        response: new NextResponse(
          JSON.stringify({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': options.requests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': resetDate.toISOString(),
            },
          }
        ),
      };
    }

    // Add rate limit headers to successful response
    if (response) {
      const remaining = Math.max(0, options.requests - count);
      const resetDate = new Date(resetTime);

      response.headers.set('X-RateLimit-Limit', options.requests.toString());
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      response.headers.set('X-RateLimit-Reset', resetDate.toISOString());
    }

    return { success: true };
  };
}

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  // Try different headers for IP detection
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const cloudflareIP = request.headers.get('cf-connecting-ip');
  if (cloudflareIP) {
    return cloudflareIP;
  }

  // Fallback to a hash of user agent + some entropy
  // This is not ideal but prevents simple abuse
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return Buffer.from(userAgent).toString('base64').slice(0, 16);
}

/**
 * Pre-configured rate limiters for common use cases
 * Lazy initialization to avoid build-time errors
 */
function createRateLimiters() {
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      !process.env.DATABASE_URL;
  
  if (isBuildTime) {
    // Return mock rate limiters during build
    const mockLimiter = async () => ({
      success: true,
      response: undefined,
    });
    return {
      general: mockLimiter,
      generations: mockLimiter,
      uploads: mockLimiter,
      auth: mockLimiter,
      payments: mockLimiter,
    };
  }
  
  const config = getRateLimitConfig();
  return {
    // General API rate limiting
    general: createRateLimit({
      requests: config.general.requests,
      windowMs: config.general.window,
    }),
    // Strict limiting for expensive operations
    generations: createRateLimit({
      requests: config.generations.requests,
      windowMs: config.generations.window,
      identifier: (request) => {
        // Use user ID if available, otherwise IP
        const userId = request.headers.get('x-user-id');
        return userId || getClientIP(request);
      },
    }),
    // File upload rate limiting
    uploads: createRateLimit({
      requests: config.uploads.requests,
      windowMs: config.uploads.window,
      identifier: (request) => {
        const userId = request.headers.get('x-user-id');
        return userId || getClientIP(request);
      },
    }),
    // Authentication endpoints
    auth: createRateLimit({
      requests: 5, // 5 attempts per 15 minutes
      windowMs: 15 * 60 * 1000,
      identifier: getClientIP,
    }),
    // Payment endpoints (stricter)
    payments: createRateLimit({
      requests: 10, // 10 payment attempts per hour
      windowMs: 60 * 60 * 1000,
      identifier: (request) => {
        const userId = request.headers.get('x-user-id');
        return userId || getClientIP(request);
      },
    }),
  };
}

export const rateLimiters = createRateLimiters();

/**
 * Apply rate limiting to a Next.js API route
 */
export async function withRateLimit(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  limiter: ReturnType<typeof createRateLimit>,
  ...args: any[]
) {
  return async (request: NextRequest, ...handlerArgs: any[]) => {
    const rateLimitResult = await limiter(request);

    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    // Call the original handler
    const response = await handler(request, ...handlerArgs);

    // Add rate limit headers to successful responses
    if (response && response.headers) {
      // The limiter already added headers to the response if it was passed
    }

    return response;
  };
}

/**
 * Express middleware version for backend routes
 */
export function expressRateLimit(options: RateLimitOptions) {
  const limiter = createRateLimit(options);

  return async (req: any, res: any, next: any) => {
    // Convert Express request to NextRequest-like object
    const mockRequest = {
      headers: new Map(Object.entries(req.headers)),
      ip: req.ip,
      url: req.url,
      method: req.method,
    } as any;

    const result = await limiter(mockRequest, res);

    if (!result.success) {
      const rateLimitResponse = result.response!;
      res.status(rateLimitResponse.status);
      res.set(Object.fromEntries(rateLimitResponse.headers.entries()));
      res.json(await rateLimitResponse.json());
      return;
    }

    next();
  };
}
