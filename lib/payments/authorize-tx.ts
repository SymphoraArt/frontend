/**
 * Building the transaction the buyer signs but nobody broadcasts yet.
 *
 * This is the whole authorise-then-capture trick in one function. An ordinary
 * Solana transaction carries a recent blockhash and dies about 90 seconds
 * later, which is useless as an authorisation — the generation is not finished
 * by then. A DURABLE NONCE transaction carries a nonce value instead and never
 * expires, so a signature can sit unbroadcast for as long as the work takes.
 *
 * Three details make or break it, and all three are silent failures rather
 * than loud ones, which is why each has a test:
 *
 *   1. AdvanceNonceAccount MUST be the first instruction. The runtime looks at
 *      instruction zero and nowhere else; put it second and the transaction is
 *      rejected as having a stale blockhash.
 *   2. recentBlockhash MUST be the nonce VALUE, not a blockhash. It is the
 *      field's name that misleads here — with a real blockhash the nonce is
 *      never consumed and the transaction expires like any other.
 *   3. The fee payer is Enki, never the buyer. Buyers hold USDC and no SOL.
 *
 * Amounts and recipients come from paymentLegs(), which reads them from the
 * intent row. Nothing a client sent ever reaches this file.
 */
import {
  PublicKey,
  SystemProgram,
  Transaction,
  type Keypair,
} from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  createAssociatedTokenAccountIdempotentInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import type { PaymentLeg } from "@/lib/payments/generation-pay";

/**
 * USDC has 6 decimals on every cluster. transferChecked is used rather than
 * transfer precisely so this is not taken on trust: the token program compares
 * it against the mint and fails the transaction on a mismatch, which turns a
 * decimals bug into a refusal instead of a payment 1000x the intended size.
 */
export const USDC_DECIMALS = 6;

export interface AuthorizationTxParams {
  nonceAccount: PublicKey;
  nonceAuthority: PublicKey;
  /** The value currently stored in the nonce account, base58. */
  nonce: string;
  feePayer: PublicKey;
  buyer: PublicKey;
  mint: PublicKey;
  legs: PaymentLeg[];
  /**
   * Recipient owners with no USDC account yet. Enki fronts the rent — see
   * Terms of Use Section 7, where it is recovered from the artist's first
   * revenue shares.
   */
  needsAta?: string[];
}

export interface BuiltAuthorization {
  transaction: Transaction;
  /** What Enki paid rent for, so fronted_atas can record it. */
  frontedAtas: { owner: string; ata: string }[];
}

export function buildAuthorizationTx(params: AuthorizationTxParams): BuiltAuthorization {
  const { nonceAccount, nonceAuthority, nonce, feePayer, buyer, mint, legs } = params;
  if (legs.length === 0) throw new Error("Refusing to build a payment with no legs");

  const needsAta = new Set(params.needsAta ?? []);
  const tx = new Transaction();

  // (1) Instruction zero, always. Advancing the nonce is also what makes the
  // signature single-use: once this lands, the stored value changes and the
  // same transaction can never be replayed.
  tx.add(
    SystemProgram.nonceAdvance({
      noncePubkey: nonceAccount,
      authorizedPubkey: nonceAuthority,
    }),
  );

  const buyerAta = getAssociatedTokenAddressSync(mint, buyer);
  const frontedAtas: { owner: string; ata: string }[] = [];

  for (const leg of legs) {
    const owner = new PublicKey(leg.recipient);
    const ata = getAssociatedTokenAddressSync(mint, owner);

    if (needsAta.has(leg.recipient)) {
      // Idempotent rather than plain create: between our check and the
      // broadcast someone else may have created it, and a payment must not
      // fail over a race that cost us nothing.
      tx.add(createAssociatedTokenAccountIdempotentInstruction(feePayer, ata, owner, mint));
      frontedAtas.push({ owner: leg.recipient, ata: ata.toBase58() });
    }

    tx.add(
      createTransferCheckedInstruction(
        buyerAta,
        mint,
        ata,
        buyer,
        BigInt(leg.amountMicro),
        USDC_DECIMALS,
      ),
    );
  }

  // (2) The nonce value stands in for the blockhash. This is what removes the
  // expiry, and therefore what lets the abort condition be a heartbeat.
  tx.recentBlockhash = nonce;
  // (3) Enki pays. The buyer signs for their own token transfers and needs no
  // SOL of their own.
  tx.feePayer = feePayer;

  return { transaction: tx, frontedAtas };
}

/**
 * Add Enki's signature before the buyer ever sees the transaction.
 *
 * Signing first is safe and saves a round trip: our signature alone authorises
 * nothing, because every transfer still needs the buyer's. It also means the
 * buyer's wallet receives something complete apart from their own signature,
 * which is what a wallet UI can display honestly.
 */
export function signAsEnki(tx: Transaction, feePayer: Keypair): string {
  tx.partialSign(feePayer);
  return tx.serialize({ requireAllSignatures: false }).toString("base64");
}

/**
 * Re-read what the buyer sent back, and refuse anything that is not the
 * transaction we built.
 *
 * A buyer returning a DIFFERENT signed transaction is the obvious attack —
 * same nonce, transfers redirected or shrunk. Comparing the serialised message
 * catches every variation of it at once, because the message covers the
 * instructions, the accounts, the amounts and the fee payer. Signatures are
 * excluded from that comparison, which is the point: they are the only part
 * that legitimately differs.
 */
export function matchesBuiltTransaction(signedBase64: string, built: Transaction): boolean {
  try {
    const signed = Transaction.from(Buffer.from(signedBase64, "base64"));
    return signed.serializeMessage().equals(built.serializeMessage());
  } catch {
    return false;
  }
}

/**
 * Did the buyer actually sign it?
 *
 * matchesBuiltTransaction above answers a different question and says so: it
 * compares the MESSAGE and deliberately ignores signatures, because those are
 * the only part that legitimately differs. That reasoning is sound for the
 * attack it was written against — a returned transaction with the transfers
 * redirected or shrunk — and it has a blind spot the size of the whole
 * product: a signature can simply be ABSENT.
 *
 * The authorize route hands the buyer a transaction Enki has already
 * partial-signed. Echoing it back unchanged therefore passes a message
 * comparison perfectly, because it IS our message. Nothing else in the stack
 * looked at signatures — `verifySignatures` appeared nowhere in the codebase —
 * so the intent was marked authorised, the generation ran, and the buyer got
 * their image. The failure only surfaced later, inside settle(), where
 * Transaction.serialize() throws "Signature verification failed" — after
 * captureAuthorization has already written captured_at, and inside a try whose
 * catch returns null. The route logs "delivered but not captured" and returns
 * the image anyway.
 *
 * verifySignatures() defaults to requiring ALL signers, which here is Enki as
 * fee payer plus the buyer as the owner of every transferChecked. So one call
 * covers both "is it signed" and "is the signature valid over this message".
 */
export function hasRequiredSignatures(signedBase64: string): boolean {
  try {
    return Transaction.from(Buffer.from(signedBase64, "base64")).verifySignatures();
  } catch {
    return false;
  }
}
