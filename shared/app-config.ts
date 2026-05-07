/**
 * Centralized app configuration
 * All brand/project-specific strings and URLs are sourced from env vars here.
 * Change NEXT_PUBLIC_APP_NAME (and friends) in .env.local to rebrand.
 */

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Enki';
export const AUTH_STORAGE_KEY = `${APP_NAME.toLowerCase()}_auth`;
export const TERMS_URL = process.env.NEXT_PUBLIC_TERMS_URL ?? '';
export const PRIVACY_URL = process.env.NEXT_PUBLIC_PRIVACY_URL ?? '';

/**
 * Platform fee applied to all purchases (0.05 = 5%).
 * Must match the on-chain program constant (500 BPS). Do not override via env.
 */
export const PLATFORM_FEE_PERCENT = 0.05;

/**
 * Solana program ID — required, set NEXT_PUBLIC_PROGRAM_ID in .env.local
 */
export function getProgramId(): string {
  const id = process.env.NEXT_PUBLIC_PROGRAM_ID;
  if (!id) throw new Error('NEXT_PUBLIC_PROGRAM_ID is not configured');
  return id;
}
