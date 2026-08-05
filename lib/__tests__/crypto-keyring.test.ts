import { describe, it, expect, beforeEach, afterEach } from "vitest";
import crypto from "crypto";

/**
 * The point of these tests is not that AES works — it is that merging two keys
 * into one keyring did not strand any existing ciphertext.
 *
 * The dangerous case is a prompt encrypted before the merge: written by
 * backend/encryption.ts under PROMPT_ENCRYPTION_KEY, with a 16-byte IV and no
 * kid. If the keyring cannot open that, every prompt in the marketplace
 * becomes unreadable — silently, and only noticed by a customer.
 */

const CURRENT = crypto.randomBytes(32).toString("base64");
const LEGACY = crypto.randomBytes(32).toString("base64");
const RETIRED = crypto.randomBytes(32).toString("base64");

/** Reproduces exactly what the pre-merge backend/encryption.ts produced. */
function legacyEncrypt(plaintext: string, keyB64: string) {
  const key = Buffer.from(keyB64, "base64");
  const iv = crypto.randomBytes(16); // the old path used 16, not 12
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    encrypted: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
    // deliberately no kid — that is the whole problem being solved
  };
}

async function fresh() {
  const mod = await import("@/lib/crypto");
  mod.resetKeyringCache();
  return mod;
}

describe("encryption keyring", () => {
  beforeEach(() => {
    process.env.FIELD_ENCRYPTION_KEY_B64 = CURRENT;
    process.env.PROMPT_ENCRYPTION_KEY = LEGACY;
    delete process.env.FIELD_ENCRYPTION_KEYS_RETIRED;
  });

  afterEach(async () => {
    (await import("@/lib/crypto")).resetKeyringCache();
  });

  it("round-trips and labels new ciphertext with the current key id", async () => {
    const { encryptString, decryptString } = await fresh();
    const p = encryptString("a sumerian scribe at dusk");
    expect(p.kid).toBe("field-v1");
    expect(p.encrypted).not.toContain("sumerian");
    expect(decryptString(p)).toBe("a sumerian scribe at dusk");
  });

  it("still opens pre-merge prompts: old key, 16-byte IV, no kid", async () => {
    const { decryptString } = await fresh();
    const old = legacyEncrypt("written before the keys were merged", LEGACY);
    expect(decryptString(old)).toBe("written before the keys were merged");
  });

  it("opens ciphertext from a retired key by its id", async () => {
    process.env.FIELD_ENCRYPTION_KEYS_RETIRED = `field-v0:${RETIRED}`;
    const { decryptString } = await fresh();

    const key = Buffer.from(RETIRED, "base64");
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const ct = Buffer.concat([cipher.update("rotated away", "utf8"), cipher.final()]);

    expect(decryptString({
      encrypted: ct.toString("base64"),
      iv: iv.toString("base64"),
      authTag: cipher.getAuthTag().toString("base64"),
      kid: "field-v0",
    })).toBe("rotated away");
  });

  it("refuses a kid the ring does not have, instead of guessing", async () => {
    const { decryptString } = await fresh();
    const p = legacyEncrypt("x", LEGACY);
    expect(() => decryptString({ ...p, kid: "field-v9" })).toThrow(/No key 'field-v9'/);
  });

  it("rejects tampered ciphertext rather than trying keys until one passes", async () => {
    const { encryptString, decryptString } = await fresh();
    const p = encryptString("untouched");
    const bytes = Buffer.from(p.encrypted, "base64");
    bytes[0] ^= 0xff;
    expect(() => decryptString({ ...p, encrypted: bytes.toString("base64") })).toThrow();
  });

  it("survives a malformed retired entry instead of taking the app down", async () => {
    process.env.FIELD_ENCRYPTION_KEYS_RETIRED = "broken:not-32-bytes,,field-v0:" + RETIRED;
    const { encryptString, decryptString } = await fresh();
    expect(decryptString(encryptString("still working"))).toBe("still working");
  });

  it("works with no legacy prompt key configured at all", async () => {
    delete process.env.PROMPT_ENCRYPTION_KEY;
    const { encryptString, decryptString } = await fresh();
    expect(decryptString(encryptString("post-migration"))).toBe("post-migration");
  });
});
