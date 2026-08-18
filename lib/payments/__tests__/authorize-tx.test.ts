import { describe, it, expect } from "vitest";
import { Keypair, PublicKey, SystemInstruction, SystemProgram } from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  decodeTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  buildAuthorizationTx,
  signAsEnki,
  matchesBuiltTransaction,
  hasRequiredSignatures,
  USDC_DECIMALS,
} from "@/lib/payments/authorize-tx";

/**
 * Durable nonces fail SILENTLY when built wrong — the transaction simply gets
 * rejected as stale, long after the buyer signed and the image was made. Each
 * of the three ways to get it wrong has a test here, because none of them
 * shows up in a type check or a code review.
 */

const MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const NONCE_VALUE = "6zRZaKfDGdKRvSaBnFVE9RarFAbn9DsWwVAKrTLbLNKZ";

const enki = Keypair.generate();
const buyer = Keypair.generate();
const nonceAccount = Keypair.generate().publicKey;
const artist = Keypair.generate().publicKey;

const legs = [
  { recipient: artist.toBase58(), amountMicro: 180_000 },
  { recipient: enki.publicKey.toBase58(), amountMicro: 70_000 },
];

const build = (over: Partial<Parameters<typeof buildAuthorizationTx>[0]> = {}) =>
  buildAuthorizationTx({
    nonceAccount,
    nonceAuthority: enki.publicKey,
    nonce: NONCE_VALUE,
    feePayer: enki.publicKey,
    buyer: buyer.publicKey,
    mint: MINT,
    legs,
    ...over,
  });

describe("the three silent ways to break a durable nonce", () => {
  it("puts AdvanceNonceAccount first — the runtime looks nowhere else", () => {
    const { transaction } = build();
    const first = transaction.instructions[0];

    expect(first.programId.equals(SystemProgram.programId)).toBe(true);
    const decoded = SystemInstruction.decodeNonceAdvance(first);
    expect(decoded.noncePubkey.equals(nonceAccount)).toBe(true);
    expect(decoded.authorizedPubkey.equals(enki.publicKey)).toBe(true);
  });

  it("carries the NONCE VALUE where a blockhash would go", () => {
    const { transaction } = build();
    // With a real blockhash the nonce is never consumed and the whole
    // authorisation expires in about 90 seconds, which is the bug this catches.
    expect(transaction.recentBlockhash).toBe(NONCE_VALUE);
  });

  it("makes Enki the fee payer, never the buyer", () => {
    const { transaction } = build();
    expect(transaction.feePayer?.equals(enki.publicKey)).toBe(true);
    expect(transaction.feePayer?.equals(buyer.publicKey)).toBe(false);

    // Buyers arrive through Coinbase Onramp holding USDC and no SOL. A
    // transaction that asks them to pay the fee does not collect it; it fails.
    const keys = transaction.compileMessage().accountKeys;
    expect(keys[0].equals(enki.publicKey)).toBe(true);
  });
});

describe("who signs and what moves", () => {
  it("still requires the buyer's signature for their own tokens", () => {
    const { transaction } = build();
    const msg = transaction.compileMessage();
    const buyerIndex = msg.accountKeys.findIndex((k) => k.equals(buyer.publicKey));
    expect(buyerIndex).toBeGreaterThanOrEqual(0);
    expect(msg.isAccountSigner(buyerIndex)).toBe(true);
  });

  it("moves exactly the legs it was given, to exactly those recipients", () => {
    const { transaction } = build();
    const transfers = transaction.instructions
      .filter((ix) => ix.programId.equals(TOKEN_PROGRAM_ID))
      .map((ix) => decodeTransferCheckedInstruction(ix, TOKEN_PROGRAM_ID));

    expect(transfers).toHaveLength(2);
    expect(transfers.map((t) => Number(t.data.amount))).toEqual([180_000, 70_000]);
    expect(transfers.map((t) => t.keys.destination.pubkey.toBase58())).toEqual(
      legs.map((l) => getAssociatedTokenAddressSync(MINT, new PublicKey(l.recipient)).toBase58()),
    );
    // 6 as a literal, not as USDC_DECIMALS: comparing the constant with
    // itself would pass however wrong the constant became, and a decimals
    // mismatch is the difference between $0.25 and $250.
    expect(transfers.every((t) => t.data.decimals === 6)).toBe(true);
    expect(USDC_DECIMALS).toBe(6);
  });

  it("refuses to build a payment that moves nothing", () => {
    expect(() => build({ legs: [] })).toThrow(/no legs/i);
  });
});

describe("fronted token accounts", () => {
  it("creates the account at Enki's expense and reports it for the ledger", () => {
    const { transaction, frontedAtas } = build({ needsAta: [artist.toBase58()] });

    expect(frontedAtas).toEqual([
      { owner: artist.toBase58(), ata: getAssociatedTokenAddressSync(MINT, artist).toBase58() },
    ]);
    // Instruction 0 stays the nonce advance; the creation slots in after it.
    expect(() => SystemInstruction.decodeNonceAdvance(transaction.instructions[0])).not.toThrow();

    const create = transaction.instructions[1];
    expect(create.keys[0].pubkey.equals(enki.publicKey)).toBe(true);
    expect(create.keys[0].isSigner).toBe(true);
  });

  it("adds nothing when every recipient can already receive", () => {
    const { transaction, frontedAtas } = build();
    expect(frontedAtas).toEqual([]);
    expect(transaction.instructions).toHaveLength(1 + legs.length);
  });
});

describe("the returned transaction must be the one we built", () => {
  it("accepts the buyer's signature on our transaction", () => {
    const { transaction } = build();
    const forBuyer = signAsEnki(transaction, enki);
    expect(typeof forBuyer).toBe("string");

    const signed = build().transaction;
    signed.partialSign(buyer);
    expect(matchesBuiltTransaction(signed.serialize({ requireAllSignatures: false }).toString("base64"), transaction)).toBe(true);
  });

  it("rejects a transaction whose amounts were changed", () => {
    const { transaction } = build();
    // The obvious attack: same nonce, same shape, less money.
    const tampered = build({
      legs: [
        { recipient: artist.toBase58(), amountMicro: 1 },
        { recipient: enki.publicKey.toBase58(), amountMicro: 1 },
      ],
    }).transaction;
    tampered.partialSign(buyer);

    expect(
      matchesBuiltTransaction(
        tampered.serialize({ requireAllSignatures: false }).toString("base64"),
        transaction,
      ),
    ).toBe(false);
  });

  it("rejects a transaction whose recipient was redirected", () => {
    const { transaction } = build();
    const thief = Keypair.generate().publicKey;
    const redirected = build({
      legs: [
        { recipient: thief.toBase58(), amountMicro: 180_000 },
        { recipient: enki.publicKey.toBase58(), amountMicro: 70_000 },
      ],
    }).transaction;
    redirected.partialSign(buyer);

    expect(
      matchesBuiltTransaction(
        redirected.serialize({ requireAllSignatures: false }).toString("base64"),
        transaction,
      ),
    ).toBe(false);
  });

  it("rejects rubbish instead of throwing", () => {
    const { transaction } = build();
    expect(matchesBuiltTransaction("not-base64-at-all", transaction)).toBe(false);
  });
});

/**
 * The message comparison above is not a payment check.
 *
 * /payments/generation/authorize hands the buyer a transaction Enki has
 * already partial-signed. Echoing it back unchanged passes a message
 * comparison PERFECTLY — it is our own message — so for as long as nothing
 * looked at signatures, an authorisation could be obtained without paying,
 * the generation ran, and the image shipped. The throw only arrived later,
 * inside settle(), after captured_at had been written, where the catch turned
 * it into "delivered but not captured".
 */
describe("an authorisation requires a real signature, not a matching shape", () => {
  it("REFUSES the echo attack: our own partial-signed transaction, returned unchanged", () => {
    const { transaction } = build();
    const echoed = signAsEnki(transaction, enki);

    // It passes the shape check, which is exactly why that check is not enough.
    expect(matchesBuiltTransaction(echoed, transaction)).toBe(true);
    expect(hasRequiredSignatures(echoed)).toBe(false);
  });

  it("refuses a transaction nobody signed at all", () => {
    const { transaction } = build();
    const unsigned = transaction.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");
    expect(hasRequiredSignatures(unsigned)).toBe(false);
  });

  it("refuses the buyer's signature without ours", () => {
    // Both are required signers: Enki as fee payer, the buyer as the owner of
    // every transferChecked. One of the two is not an authorisation.
    const half = build().transaction;
    half.partialSign(buyer);
    expect(hasRequiredSignatures(half.serialize({ requireAllSignatures: false }).toString("base64"))).toBe(false);
  });

  it("accepts the transaction once BOTH have signed", () => {
    const full = build().transaction;
    full.partialSign(enki);
    full.partialSign(buyer);
    const b64 = full.serialize().toString("base64");
    expect(hasRequiredSignatures(b64)).toBe(true);
    expect(matchesBuiltTransaction(b64, build().transaction)).toBe(true);
  });

  it("refuses a signature lifted from a DIFFERENT transaction", () => {
    // A valid buyer signature over another message must not authorise this one.
    const other = build({ legs: [{ recipient: artist.toBase58(), amountMicro: 1 }] }).transaction;
    other.partialSign(enki);
    other.partialSign(buyer);

    const target = build().transaction;
    target.partialSign(enki);
    target.signatures = target.signatures.map((s) =>
      s.publicKey.equals(buyer.publicKey)
        ? { publicKey: s.publicKey, signature: other.signatures.find((o) => o.publicKey.equals(buyer.publicKey))!.signature }
        : s,
    );
    // verifySignatures:false is needed to BUILD the payload at all — web3.js
    // refuses to serialise a transaction carrying a signature that does not
    // verify. That refusal is the same protection this asserts, reached from
    // the other side: an attacker sends bytes, not a Transaction object.
    const forged = target.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");
    expect(hasRequiredSignatures(forged)).toBe(false);
  });

  it("refuses malformed input rather than throwing", () => {
    expect(hasRequiredSignatures("not-base64-at-all")).toBe(false);
    expect(hasRequiredSignatures("")).toBe(false);
  });
});
