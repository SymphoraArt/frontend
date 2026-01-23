import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const REQUIRED_KEY_LENGTH = 32;

let cachedKey: Buffer | null = null;

function getEncryptionKey(): Buffer {
  if (cachedKey) return cachedKey;
  
  const key = process.env.PROMPT_ENCRYPTION_KEY;
  if (!key) {
    throw new Error('PROMPT_ENCRYPTION_KEY environment variable is not set. Generate one using generateEncryptionKey()');
  }
  
  const keyBuffer = Buffer.from(key, 'base64');
  if (keyBuffer.length !== REQUIRED_KEY_LENGTH) {
    throw new Error(`PROMPT_ENCRYPTION_KEY must be exactly ${REQUIRED_KEY_LENGTH} bytes when decoded from base64. Current length: ${keyBuffer.length} bytes`);
  }
  
  cachedKey = keyBuffer;
  return cachedKey;
}

export function isEncryptionConfigured(): boolean {
  try {
    getEncryptionKey();
    return true;
  } catch {
    return false;
  }
}

export interface EncryptedData {
  encryptedContent: string;
  iv: string;
  authTag: string;
}

export function encryptPrompt(plaintext: string): EncryptedData {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encryptedContent: encrypted,
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64')
  };
}

export function decryptPrompt(encryptedData: EncryptedData): string {
  const key = getEncryptionKey();
  const iv = Buffer.from(encryptedData.iv, 'base64');
  const authTag = Buffer.from(encryptedData.authTag, 'base64');
  const encryptedContent = Buffer.from(encryptedData.encryptedContent, 'base64');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedContent);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString('utf8');
}

export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('base64');
}
