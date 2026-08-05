import crypto from "crypto";

/**
 * One keyring for everything this app encrypts at rest.
 *
 * There used to be two independent AES keys doing the same job:
 * FIELD_ENCRYPTION_KEY_B64 here, and PROMPT_ENCRYPTION_KEY in
 * backend/encryption.ts for prompt bodies. Same algorithm, different key,
 * different file — and the second one wrote no key id, which meant rotating it
 * would have made every prompt permanently unreadable. That is the whole
 * reason to merge them: a key you cannot rotate is a key you can never
 * respond to a leak with.
 *
 * ── How rotation works ──────────────────────────────────────────────────
 * Every ciphertext carries the `kid` of the key that made it. Decryption
 * looks the key up by that id, so several generations of key coexist:
 *
 *   FIELD_ENCRYPTION_KEY_B64        the current key — everything new uses it
 *   FIELD_ENCRYPTION_KEYS_RETIRED   "kid:base64,kid:base64" — decrypt only
 *
 * To rotate: generate a new key, move the current value into RETIRED under
 * its old id, put the new one in FIELD_ENCRYPTION_KEY_B64. Nothing needs
 * re-encrypting; old rows keep opening with their old key. Drop a key from
 * RETIRED only once nothing references its id any more.
 *
 * AUTH_PEPPER is deliberately NOT part of this. It seasons password hashes
 * rather than encrypting anything, and rotating it would invalidate every
 * password in the database. A pepper is unrotatable by design.
 */

const ALG = "aes-256-gcm";

/** The id written into everything encrypted from now on. */
const CURRENT_KID = "field-v1";

/** The pre-merge prompt key. Decrypt-only; nothing new is written with it. */
const LEGACY_PROMPT_KID = "prompt-legacy";

type KeyEntry = { kid: string; key: Buffer };

function parse(b64: string, label: string): Buffer {
  const key = Buffer.from(b64.trim(), "base64");
  if (key.length !== 32) throw new Error(`${label} must decode to 32 bytes`);
  return key;
}

let cached: { current: KeyEntry; all: KeyEntry[] } | null = null;

function keyring(): { current: KeyEntry; all: KeyEntry[] } {
  if (cached) return cached;

  const primary = process.env.FIELD_ENCRYPTION_KEY_B64;
  if (!primary) throw new Error("Missing FIELD_ENCRYPTION_KEY_B64");
  const current: KeyEntry = { kid: CURRENT_KID, key: parse(primary, "FIELD_ENCRYPTION_KEY_B64") };

  const all: KeyEntry[] = [current];

  // Retired keys, newest first. A malformed entry must not take the whole
  // app down — it can only cost us the rows that needed that one key.
  for (const part of (process.env.FIELD_ENCRYPTION_KEYS_RETIRED ?? "").split(",")) {
    const [kid, b64] = part.split(":");
    if (!kid?.trim() || !b64?.trim()) continue;
    try {
      all.push({ kid: kid.trim(), key: parse(b64, `retired key ${kid.trim()}`) });
    } catch {
      /* skip the broken entry, keep the ring usable */
    }
  }

  // The old prompt key, if it is still configured. Kept so prompts written
  // before the merge stay readable; remove the env var once none are left.
  const legacy = process.env.PROMPT_ENCRYPTION_KEY;
  if (legacy) {
    try {
      all.push({ kid: LEGACY_PROMPT_KID, key: parse(legacy, "PROMPT_ENCRYPTION_KEY") });
    } catch {
      /* same: a bad legacy key must not break current traffic */
    }
  }

  cached = { current, all };
  return cached;
}

/** Test seam — the keyring is read once and cached for the process lifetime. */
export function resetKeyringCache(): void {
  cached = null;
}

export type EncryptedPayload = {
  encrypted: string; // base64 ciphertext
  iv: string;        // base64 (12 bytes for anything written here)
  authTag: string;   // base64 (16 bytes)
  v?: number;
  kid?: string;
};

export function encryptString(plaintext: string, aad?: string): EncryptedPayload {
  const { current } = keyring();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALG, current.key, iv);
  if (aad) cipher.setAAD(Buffer.from(aad, "utf8"));

  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    encrypted: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: tag.toString("base64"),
    v: 1,
    kid: current.kid,
  };
}

export function decryptString(payload: EncryptedPayload, aad?: string): string {
  const { all } = keyring();

  // A named key is tried alone: if the row says which key made it and that
  // key fails, the row is corrupt or tampered with, and silently succeeding
  // with a different key would hide that.
  const named = payload.kid ? all.filter((k) => k.kid === payload.kid) : null;
  if (payload.kid && (!named || named.length === 0)) {
    throw new Error(`No key '${payload.kid}' on the keyring — it may have been retired too early`);
  }

  // Unlabelled rows predate the keyring (the old prompt path wrote no kid),
  // so every key gets a turn. GCM's auth tag is what makes this safe: a wrong
  // key cannot produce a passing tag, it can only fail.
  const candidates = named ?? all;

  let lastError: unknown = null;
  for (const entry of candidates) {
    try {
      // IV length is taken from the stored value rather than assumed: the old
      // prompt path used 16 bytes where this one uses 12, and both are valid
      // GCM nonces.
      const iv = Buffer.from(payload.iv, "base64");
      const decipher = crypto.createDecipheriv(ALG, entry.key, iv);
      if (aad) decipher.setAAD(Buffer.from(aad, "utf8"));
      decipher.setAuthTag(Buffer.from(payload.authTag, "base64"));
      const plaintext = Buffer.concat([
        decipher.update(Buffer.from(payload.encrypted, "base64")),
        decipher.final(),
      ]);
      return plaintext.toString("utf8");
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Decryption failed");
}

/** A fresh 32-byte key, base64 — for generating the next one to rotate to. */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString("base64");
}
