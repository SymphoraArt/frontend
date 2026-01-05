/**
 * Next.js Middleware
 *
 * Global middleware for rate limiting, security headers, and request processing
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createRateLimit } from './middleware/rate-limit';
import { logger } from './lib/config/logger';
import { getRateLimitConfig } from './lib/config/environment';

// Lazy initialization of rate limiter to avoid build-time errors
let rateLimiter: ReturnType<typeof createRateLimit> | null = null;

function getRateLimiter(): ReturnType<typeof createRateLimit> {
  if (!rateLimiter) {
    // Skip rate limiter initialization during build
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                        process.env.NEXT_PHASE === 'phase-development-build' ||
                        !process.env.DATABASE_URL;
    
    if (isBuildTime) {
      // Return a no-op rate limiter function during build
      rateLimiter = async () => ({
        success: true,
        response: undefined,
        remaining: 100,
        resetTime: Date.now() + 60000,
      });
      return rateLimiter;
    }
    
    const config = getRateLimitConfig();
    rateLimiter = createRateLimit({
      requests: config.general.requests,
      windowMs: config.general.window,
    });
  }
  return rateLimiter;
}

export async function middleware(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Apply rate limiting (lazy initialization)
    const limiter = getRateLimiter();
    const rateLimitResult = await limiter(request);

    if (!rateLimitResult.success) {
      logger.warn('Rate limit exceeded', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        url: request.url,
        userAgent: request.headers.get('user-agent'),
      });

      return rateLimitResult.response!;
    }

    // Add security headers
    const response = NextResponse.next();

    // Security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // CORS headers (if needed)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Add request ID for tracing
    const requestId = crypto.randomUUID();
    response.headers.set('X-Request-ID', requestId);

    // Log request (only in development or for errors)
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      logger.debug('API Request', {
        method: request.method,
        path: url.pathname,
        requestId,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      });
    }

    return response;

  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    logger.error('Middleware error', {
      error: errorMessage,
      stack: errorStack,
      method: request.method,
      url: request.url,
      duration,
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/health (health checks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/health|_next/static|_next/image|favicon.ico).*)',
  ],
};
