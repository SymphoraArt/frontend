/**
 * Recovery file — the user's own parachute.
 *
 * Two different disasters, one file:
 *   1. The PRIVATE KEY, encrypted. Import it into Phantom or Solflare and the
 *      wallet is reachable with no Enki and no Coinbase involved. This is what
 *      survives "the company is gone" and "Coinbase suspended the project".
 *   2. The user id + address in the clear. That is the mapping our database
 *      holds; with it we can re-link an account after a database loss without
 *      the user having to rebuild anything.
 *
 * SECURITY MODEL — the file is built and encrypted ENTIRELY IN THE BROWSER and
 * handed to the download manager. It is never uploaded, never mailed, never
 * logged: a private key in transit is a private key someone can intercept.
 * The plaintext key exists only in memory, between the CDP export call and the
 * encrypt call below.
 *
 * Passphrase loss is not account loss. This is a backup, not the login path —
 * forget the passphrase and you simply sign in normally as always.
 *
 * Crypto: PBKDF2-SHA256 (600k iterations, the OWASP 2023 floor) to stretch the
 * passphrase, then AES-256-GCM. Both come from WebCrypto — nothing hand-rolled.
 * The header is authenticated as AAD, so an attacker cannot swap the salt or
 * iteration count and have it still decrypt.
 */

const MAGIC = "enki.recovery";
const VERSION = 1;
const PBKDF2_ITERATIONS = 600_000;

export interface RecoveryFile {
  magic: typeof MAGIC;
  version: number;
  createdAt: string;
  /** Plain so the user can tell which wallet this file belongs to. Public anyway. */
  address: string;
  /** Plain so we can re-link the account after a database loss. Not a secret. */
  userId: string;
  kdf: { name: "PBKDF2"; hash: "SHA-256"; iterations: number; salt: string };
  cipher: { name: "AES-GCM"; iv: string };
  /** Base64 AES-GCM ciphertext of the private key. */
  ciphertext: string;
}

function b64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function unb64(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(passphrase: string, salt: Uint8Array, iterations: number): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

/** The header doubles as AAD so its fields cannot be tampered with. */
function aadFor(file: Omit<RecoveryFile, "ciphertext">): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(file));
}

export async function buildRecoveryFile(args: {
  privateKey: string;
  address: string;
  userId: string;
  passphrase: string;
}): Promise<RecoveryFile> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(args.passphrase, salt, PBKDF2_ITERATIONS);

  const header: Omit<RecoveryFile, "ciphertext"> = {
    magic: MAGIC,
    version: VERSION,
    createdAt: new Date().toISOString(),
    address: args.address,
    userId: args.userId,
    kdf: { name: "PBKDF2", hash: "SHA-256", iterations: PBKDF2_ITERATIONS, salt: b64(salt) },
    cipher: { name: "AES-GCM", iv: b64(iv) },
  };

  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource, additionalData: aadFor(header) as BufferSource },
    key,
    new TextEncoder().encode(args.privateKey),
  );

  return { ...header, ciphertext: b64(new Uint8Array(ct)) };
}

/**
 * Reverse of the above — used by the "check this file" step so a user never
 * walks away with a backup that turns out to be unreadable.
 */
export async function openRecoveryFile(file: RecoveryFile, passphrase: string): Promise<string> {
  if (file?.magic !== MAGIC) throw new Error("Not an Enki recovery file");
  if (file.version !== VERSION) throw new Error(`Unsupported recovery file version ${file.version}`);

  const { ciphertext, ...header } = file;
  const key = await deriveKey(passphrase, unb64(file.kdf.salt), file.kdf.iterations);
  try {
    const pt = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: unb64(file.cipher.iv) as BufferSource,
        additionalData: aadFor(header) as BufferSource,
      },
      key,
      unb64(ciphertext) as BufferSource,
    );
    return new TextDecoder().decode(pt);
  } catch {
    // GCM cannot tell a wrong passphrase from a tampered file — both fail the
    // auth tag. Say the likely thing rather than something alarming.
    throw new Error("Wrong passphrase, or the file has been altered");
  }
}

/** Hand the file to the browser's download manager. Never leaves the device. */
export function downloadRecoveryFile(file: RecoveryFile) {
  const blob = new Blob([JSON.stringify(file, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `enki-recovery-${file.address.slice(0, 8)}.json`;
  a.click();
  // Revoke on the next tick — Safari aborts the download if the URL dies first.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
