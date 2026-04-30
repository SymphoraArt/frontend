/**
 * Content Access Token System
 * Generates and verifies time-limited access tokens for decrypted prompt content
 */

import crypto from 'crypto';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { storage } from '@/backend/storage';

// Get secret key from environment (must be set — no insecure default allowed)
const getSecretKey = (): Buffer => {
  const secret = process.env.CONTENT_ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('CONTENT_ACCESS_TOKEN_SECRET is not set. Set it to a random 32+ byte string.');
  }
  if (secret.length < 32) {
    throw new Error('CONTENT_ACCESS_TOKEN_SECRET must be at least 32 characters.');
  }
  return Buffer.from(secret.substring(0, 32), 'utf8');
};

export interface AccessTokenPayload {
  promptId: string;
  userId: string;
  purchaseId?: string;
  issuedAt: number;
  expiresAt: number;
}

export interface AccessTokenResult {
  token: string;
  expiresAt: string;
  expiresIn: number; // seconds
}

/**
 * Generate a time-limited access token for prompt content
 * Uses HMAC-SHA256 for signing (simple, secure, no external dependencies)
 */
export async function generateAccessToken(
  promptId: string,
  userId: string,
  purchaseId?: string,
  expiresInSeconds: number = 3600 // Default: 1 hour
): Promise<AccessTokenResult> {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + expiresInSeconds;

  const payload: AccessTokenPayload = {
    promptId,
    userId,
    purchaseId,
    issuedAt: now,
    expiresAt,
  };

  // Create token: base64(payload) + '.' + signature
  const payloadJson = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadJson).toString('base64url');
  
  // Create HMAC signature
  const secretKey = getSecretKey();
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(payloadBase64);
  const signature = hmac.digest('base64url');

  // Token format: payload.signature
  const token = `${payloadBase64}.${signature}`;

  return {
    token,
    expiresAt: new Date(expiresAt * 1000).toISOString(),
    expiresIn: expiresInSeconds,
  };
}

/**
 * Verify and decode an access token
 */
export async function verifyAccessToken(
  token: string
): Promise<AccessTokenPayload | null> {
  try {
    // Split token into payload and signature
    const parts = token.split('.');
    if (parts.length !== 2) {
      console.error('Invalid token format');
      return null;
    }

    const [payloadBase64, signature] = parts;

    // Verify signature
    const secretKey = getSecretKey();
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(payloadBase64);
    const expectedSignature = hmac.digest('base64url');

    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(
      Buffer.from(signature, 'base64url'),
      Buffer.from(expectedSignature, 'base64url')
    )) {
      console.error('Invalid token signature');
      return null;
    }

    // Decode payload
    const payloadJson = Buffer.from(payloadBase64, 'base64url').toString('utf8');
    const tokenPayload: AccessTokenPayload = JSON.parse(payloadJson);

    // Validate required fields
    if (!tokenPayload.promptId || !tokenPayload.userId) {
      console.error('Invalid token payload: missing required fields');
      return null;
    }

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (tokenPayload.expiresAt && tokenPayload.expiresAt < now) {
      console.error('Token expired');
      return null;
    }

    return tokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Verify user has access to prompt content
 * Checks both token validity and purchase record
 */
export async function verifyContentAccess(
  token: string,
  promptId: string,
  userId: string
): Promise<{
  hasAccess: boolean;
  error?: string;
  payload?: AccessTokenPayload;
}> {
  // Verify token
  const payload = await verifyAccessToken(token);
  if (!payload) {
    return {
      hasAccess: false,
      error: 'Invalid or expired access token',
    };
  }

  // Verify token matches request
  if (payload.promptId !== promptId) {
    return {
      hasAccess: false,
      error: 'Token does not match prompt ID',
    };
  }

  if (payload.userId !== userId) {
    return {
      hasAccess: false,
      error: 'Token does not match user ID',
    };
  }

  // Verify user has purchased this prompt
  const supabase = getSupabaseServerClient();
  const { data: purchase, error: purchaseError } = await supabase
    .from('prompt_purchases')
    .select('id, status')
    .eq('prompt_id', promptId)
    .eq('buyer_id', userId)
    .eq('status', 'completed')
    .single();

  if (purchaseError || !purchase) {
    return {
      hasAccess: false,
      error: 'No valid purchase found for this prompt',
    };
  }

  // Optional: Verify purchase ID matches if provided in token
  if (payload.purchaseId && payload.purchaseId !== purchase.id) {
    console.warn('Token purchase ID does not match database purchase ID');
    // Don't fail - token might have been issued before purchase ID was set
  }

  return {
    hasAccess: true,
    payload,
  };
}

/**
 * Get access token from request
 * Supports both query parameter and Authorization header
 */
export function getAccessTokenFromRequest(request: Request): string | null {
  // Try query parameter first
  const url = new URL(request.url);
  const tokenParam = url.searchParams.get('token');
  if (tokenParam) {
    return tokenParam;
  }

  // Try Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}