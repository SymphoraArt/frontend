/**
 * Authentication & Authorization System
 * Wallet-based authentication with signature verification + session tokens.
 *
 * Preferred auth flow:
 *   1. Client calls /api/auth/nonce → gets nonce.
 *   2. Client signs message containing wallet + timestamp + nonce.
 *   3. Client calls POST /api/auth/session → server verifies sig + consumes nonce → returns sessionToken.
 *   4. Client sends X-Session-Token header on all subsequent authenticated requests.
 *
 * Legacy fallback (for backward compatibility):
 *   - X-Wallet-Address + X-Wallet-Signature + X-Auth-Message + X-Timestamp + X-Wallet-Nonce
 *   - Nonce is consumed on first use; timestamp must be within 10 min.
 */

import { NextRequest } from 'next/server';
import { isAddress, verifyMessage } from 'viem';
import { APP_NAME } from '@/shared/app-config';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { PublicKey } from '@solana/web3.js';
import { ed25519 } from '@noble/curves/ed25519';

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
  const nonce = request.headers.get('X-Wallet-Nonce');

  // Validate required headers
  if (!walletAddress || !signature || !message || !timestamp || !nonce) {
    throw new Error('Missing authentication headers. Required: X-Wallet-Address, X-Wallet-Signature, X-Auth-Message, X-Timestamp, X-Wallet-Nonce');
  }

  const walletType = request.headers.get('X-Wallet-Type') || 'evm';

  // Validate wallet address format
  if (walletType === 'solana') {
    try { new PublicKey(walletAddress); } catch {
      throw new Error('Invalid Solana wallet address format');
    }
  } else if (!isAddress(walletAddress)) {
    throw new Error('Invalid wallet address format');
  }

  // Verify timestamp (required — prevents replay attacks)
  const requestTime = parseInt(timestamp, 10);
  if (isNaN(requestTime)) {
    throw new Error('Invalid authentication timestamp');
  }
  const currentTime = Date.now();
  const timeWindow = 10 * 60 * 1000; // 10 minutes (allows for clock skew + latency)
  if (Math.abs(currentTime - requestTime) > timeWindow) {
    throw new Error('Authentication timestamp expired');
  }

  // Verify message contains the claimed wallet address (prevents cross-wallet replay)
  if (!message.toLowerCase().includes(walletAddress.toLowerCase())) {
    throw new Error('Authentication message does not reference the claimed wallet address');
  }

  if (!message.includes(nonce)) {
    throw new Error('Authentication message does not reference the issued nonce');
  }

  // Verify signature
  const isValidSignature = walletType === 'solana'
    ? await verifySolanaWalletSignature(walletAddress, signature, message)
    : await verifyWalletSignature(walletAddress, signature, message);

  if (!isValidSignature) {
    throw new Error('Invalid wallet signature');
  }

  // Consume the server-issued nonce only after signature verification, so invalid
  // signatures cannot burn a user's active nonce.
  const supabase = getSupabaseServerClient();
  const { data: consumed, error: nonceError } = await supabase
    .rpc('consume_auth_nonce', {
      p_wallet_address: walletAddress.toLowerCase(),
      p_nonce: nonce,
    });
  if (nonceError || !consumed) {
    throw new Error('Invalid, expired, or already-used nonce');
  }

  // Return authenticated user
  const userId = walletAddress.toLowerCase();

  return {
    walletAddress: walletAddress.toLowerCase(),
    userId
  };
}

/**
 * Verify Solana wallet signature (ed25519)
 * Signature is base64-encoded, message is plain text
 */
export async function verifySolanaWalletSignature(
  publicKeyBase58: string,
  signatureBase64: string,
  message: string
): Promise<boolean> {
  try {
    const pubKeyBytes = new PublicKey(publicKeyBase58).toBytes();
    const sigBytes = Buffer.from(signatureBase64, 'base64');
    const msgBytes = new TextEncoder().encode(message);
    return ed25519.verify(sigBytes, msgBytes, pubKeyBytes);
  } catch (error) {
    console.error('Solana signature verification error:', error);
    return false;
  }
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
};
export function generateAuthMessage(walletAddress: string, nonce: string): {
  message: string;
  timestamp: number;
};
export function generateAuthMessage(walletAddress: string, nonce?: string): {
  message: string;
  timestamp: number;
} {
  const timestamp = Date.now();
  const message = `Sign this message to authenticate with ${APP_NAME} Marketplace.

Wallet: ${walletAddress}
Timestamp: ${timestamp}
${nonce ? `Nonce: ${nonce}\n` : ''}

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
  timestamp: number,
  nonce?: string
): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Wallet-Address': walletAddress,
    'X-Wallet-Signature': signature,
    'X-Auth-Message': message,
    'X-Timestamp': timestamp.toString(),
  };
  if (nonce) {
    headers['X-Wallet-Nonce'] = nonce;
  }
  return headers;
}

/**
 * Resolve a session token to an authenticated user.
 * Returns null if the token is missing, expired, or unknown.
 */
async function resolveSessionToken(token: string): Promise<AuthenticatedUser | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('auth_sessions')
    .select('wallet_address, wallet_type, expires_at')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();

  if (error || !data) return null;

  return {
    walletAddress: data.wallet_address,
    userId: data.wallet_address,
  };
}

/**
 * Middleware helper to require authentication.
 *
 * Checks X-Session-Token first (preferred, issued by /api/auth/session).
 * Falls back to full wallet-signature verification for backward compatibility.
 */
export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
  const sessionToken = request.headers.get('X-Session-Token');
  if (sessionToken) {
    const user = await resolveSessionToken(sessionToken);
    if (user) return user;
    throw new Error('Authentication failed: Invalid or expired session token');
  }

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
  storage: { getPrompt: (id: string) => Promise<{ userId?: string; artistId?: string } | null> }
): Promise<boolean> {
  const prompt = await storage.getPrompt(promptId);
  return !!prompt && (prompt.userId === userId || prompt.artistId === userId);
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
