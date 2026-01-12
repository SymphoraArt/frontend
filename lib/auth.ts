/**
 * Authentication & Authorization System
 * Wallet-based authentication with signature verification
 */

import { NextRequest } from 'next/server';
import { isAddress, verifyMessage } from 'viem';

export interface AuthenticatedUser {
  walletAddress: string;
  userId: string; // Normalized wallet address as user ID
}

/**
 * Extract and verify user authentication from request headers
 * Uses wallet signature verification for security
 */
export async function authenticateUser(request: NextRequest): Promise<AuthenticatedUser> {
  // Extract authentication headers
  const walletAddress = request.headers.get('X-Wallet-Address');
  const signature = request.headers.get('X-Wallet-Signature');
  const message = request.headers.get('X-Auth-Message');
  const timestamp = request.headers.get('X-Timestamp');

  // Validate required headers
  if (!walletAddress || !signature || !message) {
    throw new Error('Missing authentication headers. Required: X-Wallet-Address, X-Wallet-Signature, X-Auth-Message');
  }

  // Validate wallet address format
  if (!isAddress(walletAddress)) {
    throw new Error('Invalid wallet address format');
  }

  // Verify timestamp (prevent replay attacks)
  if (timestamp) {
    const requestTime = parseInt(timestamp);
    const currentTime = Date.now();
    const timeWindow = 5 * 60 * 1000; // 5 minutes

    if (Math.abs(currentTime - requestTime) > timeWindow) {
      throw new Error('Authentication timestamp expired');
    }
  }

  // Verify signature
  const isValidSignature = await verifyWalletSignature(walletAddress, signature, message);

  if (!isValidSignature) {
    throw new Error('Invalid wallet signature');
  }

  // Return authenticated user
  const userId = walletAddress.toLowerCase();

  return {
    walletAddress: walletAddress.toLowerCase(),
    userId
  };
}

/**
 * Verify wallet signature against message
 */
export async function verifyWalletSignature(
  walletAddress: string,
  signature: string,
  message: string
): Promise<boolean> {
  try {
    // Verify message signature using viem
    // viem's verifyMessage returns true if signature is valid for the given address
    return await verifyMessage({
      address: walletAddress as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Generate authentication message for client to sign
 */
export function generateAuthMessage(walletAddress: string): {
  message: string;
  timestamp: number;
} {
  const timestamp = Date.now();
  const message = `Sign this message to authenticate with Symphora Marketplace.

Wallet: ${walletAddress}
Timestamp: ${timestamp}

This signature proves ownership of this wallet and will be used to authenticate your marketplace actions.`;

  return { message, timestamp };
}

/**
 * Create authentication headers for API requests
 */
export function createAuthHeaders(
  walletAddress: string,
  signature: string,
  message: string,
  timestamp?: number
): Record<string, string> {
  return {
    'X-Wallet-Address': walletAddress,
    'X-Wallet-Signature': signature,
    'X-Auth-Message': message,
    ...(timestamp && { 'X-Timestamp': timestamp.toString() })
  };
}

/**
 * Middleware helper to require authentication
 */
export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
  try {
    return await authenticateUser(request);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Authentication failed: ${errorMessage}`);
  }
}

/**
 * Optional authentication (doesn't throw if not authenticated)
 */
export async function getAuthenticatedUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    return await authenticateUser(request);
  } catch (error) {
    return null;
  }
}

/**
 * Check if user owns a prompt (for listing/unlisting operations)
 */
export async function verifyPromptOwnership(
  promptId: string,
  userId: string,
  storage: any
): Promise<boolean> {
  const prompt = await storage.getPrompt(promptId);
  return prompt && (prompt.userId === userId || prompt.artistId === userId);
}

/**
 * Rate limiting helper (basic implementation)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  userId: string,
  action: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): boolean {
  const key = `${userId}:${action}`;
  const now = Date.now();
  const userLimit = requestCounts.get(key);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize limit
    requestCounts.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  userLimit.count++;
  return true;
}