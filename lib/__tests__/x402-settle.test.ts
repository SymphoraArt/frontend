import { describe, it, expect } from "vitest";
import {
  Keypair, PublicKey, SystemProgram, TransactionInstruction, TransactionMessage,
  VersionedTransaction, MessageV0, Transaction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID, createTransferCheckedInstruction, getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { ComputeBudgetProgram } from "@solana/web3.js";
import { parseXPayment, verifyAgentPayment, cosignAsFeePayer } from "@/lib/payments/x402-settle";

/**
 * Every reject rule in verifyAgentPayment guards the fee payer's key or the
 * platform's money, so every rule gets a transaction that violates exactly
 * it. All offline — the txs are real (web3.js-built and signed), the chain
 * is never involved.
 */

const feePayer = Keypair.generate();
const client = Keypair.generate();
const mintAuthority = Keypair.generate();
const mint = mintAuthority.publicKey; // any pubkey works as a mint offline
const payTo = Keypair.generate().publicKey;
const platformAta = getAssociatedTokenAddressSync(mint, payTo);
const clientAta = getAssociatedTokenAddressSync(mint, client.publicKey);
const BLOCKHASH = "EETubP5AKHgjPAhzPAFcb8BAY1hMH639CWCFTqi3hq1k";
const AMOUNT = 269_000;

const params = { amountMicro: AMOUNT, payTo, mint, feePayer: feePayer.publicKey };

function transferIx(over: { amount?: number | bigint; dest?: PublicKey; mint?: PublicKey; authority?: PublicKey; source?: PublicKey; decimals?: number } = {}) {
  return createTransferCheckedInstruction(
    over.source ?? clientAta,
    over.mint ?? mint,
    over.dest ?? platformAta,
    over.authority ?? client.publicKey,
    over.amount ?? AMOUNT,
    over.decimals ?? 6,
  );
}

function buildTx(instructions: TransactionInstruction[], opts: { payer?: PublicKey; sign?: boolean } = {}) {
  const msg = new TransactionMessage({
    payerKey: opts.payer ?? feePayer.publicKey,
    recentBlockhash: BLOCKHASH,
    instructions,
  }).compileToV0Message();
  const tx = new VersionedTransaction(msg);
  if (opts.sign !== false) tx.sign([client]);
  return tx;
}

const budget = () => [
  ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
  ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1_000 }),
];

describe("verifyAgentPayment", () => {
  it("accepts the canonical payment: budget + exact TransferChecked, client-signed", () => {
    const r = verifyAgentPayment(buildTx([...budget(), transferIx()]), params);
    expect(r).toEqual({ ok: true, payer: client.publicKey });
  });

  it("accepts a memo riding along", () => {
    const memo = new TransactionInstruction({
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      keys: [], data: Buffer.from("nonce-1"),
    });
    expect(verifyAgentPayment(buildTx([...budget(), transferIx(), memo]), params).ok).toBe(true);
  });

  it("rejects a wrong amount — over and under", () => {
    for (const amount of [AMOUNT - 1, AMOUNT + 1]) {
      const r = verifyAgentPayment(buildTx([transferIx({ amount })]), params);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toContain("exactly");
    }
  });

  it("rejects a foreign mint", () => {
    const other = Keypair.generate().publicKey;
    const r = verifyAgentPayment(
      buildTx([transferIx({ mint: other, source: getAssociatedTokenAddressSync(other, client.publicKey), dest: getAssociatedTokenAddressSync(other, payTo) })]),
      params,
    );
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("USDC");
  });

  it("rejects a redirected destination", () => {
    const elsewhere = getAssociatedTokenAddressSync(mint, Keypair.generate().publicKey);
    const r = verifyAgentPayment(buildTx([transferIx({ dest: elsewhere })]), params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("destination");
  });

  it("rejects wrong decimals", () => {
    const r = verifyAgentPayment(buildTx([transferIx({ decimals: 5 })]), params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("decimals");
  });

  it("rejects any unknown program — a system transfer smuggled in", () => {
    const smuggle = SystemProgram.transfer({ fromPubkey: client.publicKey, toPubkey: payTo, lamports: 1 });
    const r = verifyAgentPayment(buildTx([transferIx(), smuggle]), params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("not accepted");
  });

  it("rejects a second transfer", () => {
    const r = verifyAgentPayment(buildTx([transferIx(), transferIx()]), params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("Exactly one");
  });

  it("rejects the fee payer as transfer authority — its funds, our signature", () => {
    const tx = buildTx(
      [transferIx({ authority: feePayer.publicKey, source: getAssociatedTokenAddressSync(mint, feePayer.publicKey) })],
      { sign: false },
    );
    const r = verifyAgentPayment(tx, params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("fee payer");
  });

  it("rejects the fee payer appearing in any instruction account", () => {
    const memoTouching = new TransactionInstruction({
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      keys: [{ pubkey: feePayer.publicKey, isSigner: false, isWritable: false }],
      data: Buffer.from("x"),
    });
    const r = verifyAgentPayment(buildTx([transferIx(), memoTouching]), params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("fee payer");
  });

  it("rejects a wrong fee payer at account 0", () => {
    const r = verifyAgentPayment(buildTx([transferIx()], { payer: client.publicKey }), params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("fee payer");
  });

  it("rejects a compute unit price above the facilitator ceiling", () => {
    const greedy = ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 5_000_001 });
    const r = verifyAgentPayment(buildTx([greedy, transferIx()]), params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("ceiling");
  });

  it("rejects an unsigned client — signature slot still zeroed", () => {
    const r = verifyAgentPayment(buildTx([transferIx()], { sign: false }), params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("signed");
  });

  it("rejects address table lookups — accounts must be static", () => {
    const base = buildTx([transferIx()]).message as MessageV0;
    const withAlt = new VersionedTransaction(new MessageV0({
      header: base.header,
      staticAccountKeys: base.staticAccountKeys,
      recentBlockhash: base.recentBlockhash,
      compiledInstructions: base.compiledInstructions,
      addressTableLookups: [{ accountKey: Keypair.generate().publicKey, writableIndexes: [0], readonlyIndexes: [] }],
    }));
    const r = verifyAgentPayment(withAlt, params);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("table");
  });
});

describe("parseXPayment", () => {
  const wrap = (envelope: unknown) => Buffer.from(JSON.stringify(envelope)).toString("base64");

  it("round-trips a v0 transaction", () => {
    const tx = buildTx([transferIx()]);
    const header = wrap({ x402Version: 1, scheme: "exact", network: "solana", payload: { transaction: Buffer.from(tx.serialize()).toString("base64") } });
    const r = parseXPayment(header);
    expect(r.ok).toBe(true);
    if (r.ok) expect(verifyAgentPayment(r.tx, params).ok).toBe(true);
  });

  it("accepts a LEGACY transaction wire format", () => {
    const legacy = new Transaction({ feePayer: feePayer.publicKey, blockhash: BLOCKHASH, lastValidBlockHeight: 1 }).add(transferIx());
    legacy.partialSign(client);
    const header = wrap({ x402Version: 1, scheme: "exact", network: "solana", payload: { transaction: legacy.serialize({ requireAllSignatures: false }).toString("base64") } });
    const r = parseXPayment(header);
    expect(r.ok).toBe(true);
    if (r.ok) expect(verifyAgentPayment(r.tx, params).ok).toBe(true);
  });

  it("rejects garbage, wrong scheme, wrong network, missing payload", () => {
    expect(parseXPayment("not-base64-json!!").ok).toBe(false);
    expect(parseXPayment(wrap({ scheme: "upto", network: "solana", payload: { transaction: "AA==" } })).ok).toBe(false);
    expect(parseXPayment(wrap({ scheme: "exact", network: "base", payload: { transaction: "AA==" } })).ok).toBe(false);
    expect(parseXPayment(wrap({ scheme: "exact", network: "solana", payload: {} })).ok).toBe(false);
  });
});

describe("cosignAsFeePayer", () => {
  it("is deterministic — the replay guard's premise: same tx, same signature", () => {
    const mk = () => {
      const tx = buildTx([...budget(), transferIx()]);
      return cosignAsFeePayer(tx, feePayer);
    };
    expect(mk()).toBe(mk());
  });
});
