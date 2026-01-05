/**
 * Encryption Utilities
 *
 * AES-256-GCM encryption for sensitive data like prompts
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export interface EncryptedData {
  encrypted: string; // Base64 encoded encrypted content
  iv: string;       // Base64 encoded initialization vector
  authTag: string;  // Base64 encoded authentication tag
}

/**
 * Encrypts data using AES-256-GCM
 */
export function encryptPrompt(plainText: string): EncryptedData {
  const key = getEncryptionKey();
  const iv = randomBytes(16); // 128-bit IV for GCM
  const cipher = createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const authTag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
  };
}

/**
 * Decrypts data using AES-256-GCM
 */
export function decryptPrompt(encryptedData: EncryptedData): string {
  const key = getEncryptionKey();
  const iv = Buffer.from(encryptedData.iv, 'base64');
  const authTag = Buffer.from(encryptedData.authTag, 'base64');
  const encrypted = encryptedData.encrypted;

  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Gets the encryption key from environment variables
 */
function getEncryptionKey(): Buffer {
  const key = process.env.PROMPT_ENCRYPTION_KEY;
  if (!key) {
    throw new Error('PROMPT_ENCRYPTION_KEY environment variable is not set');
  }

  // Decode from base64 if needed
  try {
    return Buffer.from(key, 'base64');
  } catch {
    // If not base64, assume it's hex or raw bytes
    return Buffer.from(key, 'utf8');
  }
}
