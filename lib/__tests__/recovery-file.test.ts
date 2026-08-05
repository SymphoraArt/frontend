import { describe, expect, it } from "vitest";
import { buildRecoveryFile, openRecoveryFile, type RecoveryFile } from "@/lib/recovery-file";

// A real-shaped base58 Solana secret key (test vector, never used on chain).
const KEY = "4wBqpZM9xaSheZzJSMawUEKgzqBLRxHtTGDvWfNBqfeCgFhbHhVpDLGRPuf4hbCJnpGKk3iJnBRVSy8CpEXVDLGT";
const ADDRESS = "3q6m6qkagb5jvc2jiulhnnlqhdmf5xzhqhnkbxfvnwqe";
const USER_ID = "55b7c3ec-2ec8-469b-a8b7-e4171a5e5260";
const PASS = "correct horse battery staple";

async function make(passphrase = PASS) {
  return buildRecoveryFile({ privateKey: KEY, address: ADDRESS, userId: USER_ID, passphrase });
}

describe("recovery file", () => {
  it("round-trips the private key with the right passphrase", async () => {
    const file = await make();
    await expect(openRecoveryFile(file, PASS)).resolves.toBe(KEY);
  });

  it("never stores the private key in the clear", async () => {
    const file = await make();
    const serialised = JSON.stringify(file);
    // The whole point: someone who finds the file on a disk learns nothing.
    expect(serialised).not.toContain(KEY);
    expect(serialised).not.toContain(PASS);
  });

  it("keeps address and userId readable so the file is identifiable and re-linkable", async () => {
    const file = await make();
    // Both are public/non-secret and are what lets us restore the mapping
    // after a database loss.
    expect(file.address).toBe(ADDRESS);
    expect(file.userId).toBe(USER_ID);
  });

  it("rejects a wrong passphrase", async () => {
    const file = await make();
    await expect(openRecoveryFile(file, "not the passphrase")).rejects.toThrow(/passphrase/i);
  });

  it("rejects a tampered header — the KDF params are authenticated", async () => {
    const file = await make();
    // Lowering the iteration count would make a brute-force cheaper; AAD makes
    // that edit fail outright instead of silently weakening the file.
    const tampered: RecoveryFile = { ...file, kdf: { ...file.kdf, iterations: 1 } };
    await expect(openRecoveryFile(tampered, PASS)).rejects.toThrow();
  });

  it("rejects a tampered address", async () => {
    const file = await make();
    const tampered: RecoveryFile = { ...file, address: "someone-elses-address" };
    await expect(openRecoveryFile(tampered, PASS)).rejects.toThrow();
  });

  it("uses a fresh salt and iv per file, so two backups never look alike", async () => {
    const a = await make();
    const b = await make();
    expect(a.kdf.salt).not.toBe(b.kdf.salt);
    expect(a.cipher.iv).not.toBe(b.cipher.iv);
    expect(a.ciphertext).not.toBe(b.ciphertext);
  });

  it("refuses files that are not ours, and unknown versions", async () => {
    const file = await make();
    await expect(openRecoveryFile({ ...file, magic: "something-else" } as unknown as RecoveryFile, PASS))
      .rejects.toThrow(/not an enki recovery file/i);
    await expect(openRecoveryFile({ ...file, version: 99 }, PASS))
      .rejects.toThrow(/version/i);
  });

  it("stretches the passphrase at the OWASP floor", async () => {
    const file = await make();
    expect(file.kdf.iterations).toBeGreaterThanOrEqual(600_000);
    expect(file.cipher.name).toBe("AES-GCM");
  });
});
