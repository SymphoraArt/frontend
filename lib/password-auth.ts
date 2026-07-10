import { argon2id } from "@noble/hashes/argon2";
import { randomBytes, timingSafeEqual } from "crypto";

/**
 * Password hashing for email+password login.
 *
 * NOT wallet crypto — the wallet is Dynamic's non-custodial embedded wallet,
 * unlocked after login via our JWT. This only gates app login. Argon2id (RFC
 * 9106 interactive params) plus a server-side PEPPER (AUTH_PEPPER, an env
 * secret NOT in the DB): a bare DB leak without the env can't even be
 * brute-forced offline. Params are fixed here; bumping them later just
 * re-hashes on next login.
 */
const KDF = { t: 3, m: 65536, p: 1, dkLen: 32 } as const;

function pepper(): Uint8Array {
  const p = process.env.AUTH_PEPPER;
  if (!p) throw new Error("AUTH_PEPPER not configured");
  return Buffer.from(p, "base64");
}

function derive(password: string, salt: Uint8Array): Uint8Array {
  return argon2id(new TextEncoder().encode(password), salt, { ...KDF, key: pepper() });
}

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = randomBytes(16);
  return {
    hash: Buffer.from(derive(password, salt)).toString("base64"),
    salt: salt.toString("base64"),
  };
}

export function verifyPassword(password: string, hashB64: string, saltB64: string): boolean {
  const stored = Buffer.from(hashB64, "base64");
  const got = Buffer.from(derive(password, Buffer.from(saltB64, "base64")));
  return stored.length === got.length && timingSafeEqual(stored, got);
}
