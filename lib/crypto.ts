import crypto from "crypto";

const ALG = "aes-256-gcm";

function getKey(): Buffer {
  const b64 = process.env.FIELD_ENCRYPTION_KEY_B64;
  if (!b64) throw new Error("Missing FIELD_ENCRYPTION_KEY_B64");
  const key = Buffer.from(b64, "base64");
  if (key.length !== 32) throw new Error("FIELD_ENCRYPTION_KEY_B64 must decode to 32 bytes");
  return key;
}

export type EncryptedPayload = {
  encrypted: string; // base64 ciphertext
  iv: string;        // base64 (12 bytes)
  authTag: string;   // base64 (16 bytes)
  v?: number;
  kid?: string;
};

export function encryptString(plaintext: string, aad?: string): EncryptedPayload {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALG, key, iv);
  if (aad) cipher.setAAD(Buffer.from(aad, "utf8"));

  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    encrypted: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: tag.toString("base64"),
    v: 1,
    kid: "field-v1",
  };
}

export function decryptString(payload: EncryptedPayload, aad?: string): string {
  const key = getKey();
  const iv = Buffer.from(payload.iv, "base64");
  const tag = Buffer.from(payload.authTag, "base64");
  const encrypted = Buffer.from(payload.encrypted, "base64");

  const decipher = crypto.createDecipheriv(ALG, key, iv);
  if (aad) decipher.setAAD(Buffer.from(aad, "utf8"));
  decipher.setAuthTag(tag);

  const plaintext = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return plaintext.toString("utf8");
}
