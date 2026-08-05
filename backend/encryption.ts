/**
 * Prompt encryption — now a thin shim over lib/crypto's keyring.
 *
 * This file used to hold a second, independent AES implementation with its own
 * PROMPT_ENCRYPTION_KEY. Same algorithm as lib/crypto, different key, and no
 * key id written alongside the ciphertext — which meant that key could never
 * be rotated without making every prompt permanently unreadable.
 *
 * Everything now encrypts under the one keyring. Prompts written before the
 * merge still decrypt: they carry no kid, so lib/crypto tries every key it
 * has, and PROMPT_ENCRYPTION_KEY stays on the ring as a decrypt-only entry for
 * as long as it is configured. Remove that env var once no unlabelled prompt
 * rows remain.
 *
 * The exported shape is unchanged so the five call sites did not have to move;
 * `kid` is added, and writers should persist it into the matching _kid column
 * that the live schema already provides.
 */
import {
  encryptString,
  decryptString,
  generateEncryptionKey as newKey,
  type EncryptedPayload,
} from "@/lib/crypto";

export interface EncryptedData {
  encryptedContent: string;
  iv: string;
  authTag: string;
  /** Which key made this. Persist it — rotation depends on it. */
  kid?: string;
}

export function isEncryptionConfigured(): boolean {
  try {
    // Cheapest honest probe: if the keyring cannot be built, this throws.
    encryptString("");
    return true;
  } catch {
    return false;
  }
}

export function encryptPrompt(plaintext: string): EncryptedData {
  const p = encryptString(plaintext);
  return { encryptedContent: p.encrypted, iv: p.iv, authTag: p.authTag, kid: p.kid };
}

export function decryptPrompt(encryptedData: EncryptedData): string {
  const payload: EncryptedPayload = {
    encrypted: encryptedData.encryptedContent,
    iv: encryptedData.iv,
    authTag: encryptedData.authTag,
    kid: encryptedData.kid,
  };
  return decryptString(payload);
}

export function generateEncryptionKey(): string {
  return newKey();
}
