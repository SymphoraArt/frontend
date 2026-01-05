/**
 * Generation Encryption Helper
 *
 * Handles encryption and decryption of final prompts for generations,
 * properly storing and retrieving IV and auth tag from database.
 */

import { encryptPrompt, decryptPrompt, type EncryptedData } from '../encryption';
import type { Generation } from '../database/schema';

/**
 * Encrypts a final prompt for storage in generations table
 *
 * @param finalPrompt - The plain text final prompt (after variable substitution)
 * @returns Encryption data including encrypted content, IV, and auth tag
 */
export function encryptFinalPrompt(finalPrompt: string): EncryptedData {
  return encryptPrompt(finalPrompt);
}

/**
 * Decrypts a final prompt from generation record
 *
 * @param generation - Generation record with encrypted data
 * @returns Decrypted plain text prompt
 * @throws Error if encryption metadata is missing or invalid
 */
export function decryptFinalPrompt(generation: Generation): string {
  // Validate that all encryption fields are present
  if (!generation.finalPrompt) {
    throw new Error('Generation is missing encrypted final prompt');
  }

  if (!generation.finalPromptIv) {
    throw new Error('Generation is missing encryption IV (initialization vector)');
  }

  if (!generation.finalPromptAuthTag) {
    throw new Error('Generation is missing encryption auth tag');
  }

  // Construct EncryptedData object
  const encryptedData: EncryptedData = {
    encrypted: generation.finalPrompt,
    iv: generation.finalPromptIv,
    authTag: generation.finalPromptAuthTag
  };

  try {
    return decryptPrompt(encryptedData);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to decrypt final prompt: ${errorMessage}`);
  }
}

/**
 * Prepares encrypted prompt data for database insertion
 *
 * Convenience function that encrypts a prompt and returns fields
 * ready to be spread into a database insert/update object.
 *
 * @param finalPrompt - The plain text final prompt
 * @returns Object with finalPrompt, finalPromptIv, and finalPromptAuthTag
 *
 * @example
 * ```typescript
 * const encryptedFields = prepareEncryptedPromptForDB(finalPrompt);
 * await db.insert(generations).values({
 *   ...otherFields,
 *   ...encryptedFields
 * });
 * ```
 */
export function prepareEncryptedPromptForDB(finalPrompt: string): {
  finalPrompt: string;
  finalPromptIv: string;
  finalPromptAuthTag: string;
} {
  const encrypted = encryptFinalPrompt(finalPrompt);

  return {
    finalPrompt: encrypted.encrypted,
    finalPromptIv: encrypted.iv,
    finalPromptAuthTag: encrypted.authTag
  };
}

/**
 * Validates that a generation has all required encryption metadata
 *
 * @param generation - Generation record to validate
 * @returns True if all encryption fields are present
 */
export function hasCompleteEncryptionMetadata(generation: Partial<Generation>): boolean {
  return !!(
    generation.finalPrompt &&
    generation.finalPromptIv &&
    generation.finalPromptAuthTag
  );
}

/**
 * Safely attempts to decrypt a generation's final prompt
 *
 * Returns null instead of throwing if decryption fails.
 * Useful for migrations or error recovery.
 *
 * @param generation - Generation record
 * @returns Decrypted prompt or null if decryption fails
 */
export function safeDecryptFinalPrompt(generation: Generation): string | null {
  try {
    return decryptFinalPrompt(generation);
  } catch (error) {
    console.error('Failed to decrypt generation final prompt:', error);
    return null;
  }
}
