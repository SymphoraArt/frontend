import { NextRequest, NextResponse } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function getClientIp(req: NextRequest): string {
  // x-real-ip is set by the platform (Vercel overwrites client-sent values),
  // so it cannot be spoofed. In x-forwarded-for only the RIGHT-most entry is
  // appended by the trusted edge — the left-most is client-supplied, and
  // keying on it let attackers rotate the header for a fresh bucket per
  // request (rate-limit bypass).
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const hops = forwardedFor.split(",");
    return hops[hops.length - 1]?.trim() || "unknown";
  }
  return "unknown";
}

export function rateLimitKey(req: NextRequest, action: string, subject?: string): string {
  const normalizedSubject = subject?.trim().toLowerCase();
  return `${action}:${normalizedSubject || getClientIp(req)}`;
}

export function checkRequestRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: true } | { allowed: false; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (bucket.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function rateLimitResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: "Too many requests" },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    }
  );
}
