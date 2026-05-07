/**
 * Solana x402 Payment Verifier
 *
 * Server-side verification of Solana USDC payments for x402-style HTTP payment flow.
 * Supports both simple USDC transfers (image generation) and purchase_prompt
 * instruction calls (prompt purchase).
 */

import {
  Connection,
  PublicKey,
  type ParsedTransactionWithMeta,
} from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PAYMENT_CHAINS } from "../shared/payment-config";
import { getProgramId } from "../shared/app-config";
import { getSupabaseServerClient } from "../lib/supabaseServer";

const MAX_TX_AGE_SECONDS = 3600; // 1 hour
const TX_LOOKUP_RETRIES = 8;
const TX_LOOKUP_RETRY_DELAY_MS = 1500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Replay Protection ──────────────────────────────────────────────────────

/**
 * Check if a Solana tx signature has already been used for payment,
 * and atomically record it if not.
 *
 * Returns true if the signature is new (safe to proceed).
 * Returns false if the signature was already used (replay attack).
 *
 * NOTE: For true atomicity, add a UNIQUE constraint on
 * payment_verifications.transaction_hash in Supabase.
 */
export async function checkAndRecordSolanaSignature(
  signature: string,
  chainKey: "solana" | "solana-devnet",
  context: string  // e.g. "image-generation" or "prompt-content"
): Promise<{ isNew: boolean; error?: string }> {
  try {
    const supabase = getSupabaseServerClient();
    // Check if this signature has already been recorded
    const { data: existing } = await supabase
      .from("payment_verifications")
      .select("id")
      .eq("transaction_hash", signature)
      .maybeSingle();

    if (existing) {
      return { isNew: false, error: "Transaction signature already used" };
    }

    // Record the signature to prevent future reuse
    const { error: insertError } = await supabase
      .from("payment_verifications")
      .insert({
        transaction_hash: signature,
        chain_key: chainKey,
        verifier_id: "solana-x402",
        verified: true,
        verification_method: "rpc_logs",
        verification_error: context,
        verified_at: new Date().toISOString(),
      });

    if (insertError) {
      // Unique constraint violation = concurrent replay attempt
      if (insertError.code === "23505") {
        return { isNew: false, error: "Transaction signature already used" };
      }
      console.error("Failed to record Solana signature:", insertError);
      return { isNew: false, error: "Could not record payment signature" };
    }

    return { isNew: true };
  } catch (e) {
    console.error("Replay-protection check failed:", e);
    return { isNew: false, error: "Could not verify payment replay status" };
  }
}

// ─── Solana 402 Response ────────────────────────────────────────────────────

export interface SolanaPaymentRequirement {
  scheme: "exact";
  network: "solana-devnet" | "mainnet-beta";
  maxAmountRequired: string;       // USDC in micro-units (6 decimals), e.g. "100000" = 0.1 USDC
  resource: string;                // full URL of the resource
  description: string;
  mimeType: string;
  payTo: string;                   // platform wallet Solana pubkey (base58)
  maxTimeoutSeconds: number;
  asset: string;                   // USDC mint address
  extra?: Record<string, unknown>; // optional: programId, promptId, generationId, etc.
}

export interface Solana402Body {
  x402Version: 1;
  error: "Payment required";
  accepts: SolanaPaymentRequirement[];
}

/**
 * Build a 402 response for a Solana USDC payment requirement.
 */
export function buildSolana402Response(params: {
  chainKey: "solana" | "solana-devnet";
  resource: string;
  description: string;
  priceUsdc: string;   // e.g. "$0.10" or "0.10"
  payTo: string;       // platform Solana wallet pubkey
  mimeType?: string;
  extra?: Record<string, unknown>;
}): { status: 402; body: Solana402Body; headers: Record<string, string> } {
  const chain = PAYMENT_CHAINS[params.chainKey];
  const network = (chain as any).solanaNetwork as "mainnet-beta" | "devnet";

  // Parse price string → micro-units (6 decimals)
  const priceNum = parseFloat(params.priceUsdc.replace("$", ""));
  const microUnits = Math.round(priceNum * 1_000_000).toString();

  const body: Solana402Body = {
    x402Version: 1,
    error: "Payment required",
    accepts: [
      {
        scheme: "exact",
        network: network === "devnet" ? "solana-devnet" : "mainnet-beta",
        maxAmountRequired: microUnits,
        resource: params.resource,
        description: params.description,
        mimeType: params.mimeType ?? "application/json",
        payTo: params.payTo,
        maxTimeoutSeconds: MAX_TX_AGE_SECONDS,
        asset: chain.usdc,
        ...(params.extra ? { extra: params.extra } : {}),
      },
    ],
  };

  return {
    status: 402,
    body,
    headers: {
      "Content-Type": "application/json",
      "X-Payment-Required": "solana",
    },
  };
}

// ─── Payment Header Parsing ─────────────────────────────────────────────────

export interface SolanaPaymentPayload {
  signature: string;
  buyerAddress: string;
  network: string;
}

/**
 * Parse the X-PAYMENT header for a Solana payment.
 * Format: base64(JSON({ signature, buyerAddress, network }))
 */
export function parseSolanaPaymentHeader(header: string): SolanaPaymentPayload | null {
  try {
    const decoded = Buffer.from(header, "base64").toString("utf8");
    const parsed = JSON.parse(decoded) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "signature" in parsed &&
      "buyerAddress" in parsed &&
      "network" in parsed
    ) {
      return parsed as SolanaPaymentPayload;
    }
    return null;
  } catch {
    return null;
  }
}

// ─── On-chain Verification ──────────────────────────────────────────────────

export interface VerifyTransferResult {
  verified: boolean;
  error?: string;
  buyerAddress?: string;
  amountPaid?: number;   // in USDC micro-units
  timestamp?: number;    // unix seconds
}

/**
 * Verify a Solana USDC transfer transaction.
 * Checks: tx exists & confirmed, recent enough, transfers >= minAmountMicro to recipientAta.
 */
export async function verifySolanaUsdcTransfer(params: {
  signature: string;
  chainKey: "solana" | "solana-devnet";
  recipientAddress: string;   // platform wallet pubkey (base58)
  minAmountMicro: number;     // minimum USDC in micro-units
}): Promise<VerifyTransferResult> {
  const chain = PAYMENT_CHAINS[params.chainKey];
  const connection = new Connection(chain.rpcUrl, "confirmed");
  const usdcMint = new PublicKey(chain.usdc);
  const recipient = new PublicKey(params.recipientAddress);

  let tx: ParsedTransactionWithMeta | null = null;
  let lookupError: unknown;
  for (let attempt = 1; attempt <= TX_LOOKUP_RETRIES; attempt += 1) {
    try {
      tx = await connection.getParsedTransaction(params.signature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      });
      if (tx) break;
    } catch (e) {
      lookupError = e;
    }

    if (attempt < TX_LOOKUP_RETRIES) {
      await sleep(TX_LOOKUP_RETRY_DELAY_MS);
    }
  }

  if (!tx && lookupError) {
    return { verified: false, error: `Failed to fetch transaction: ${lookupError}` };
  }

  if (!tx) {
    return { verified: false, error: "Transaction not found" };
  }
  if (tx.meta?.err) {
    return { verified: false, error: "Transaction failed on-chain" };
  }

  // Check age
  const blockTime = tx.blockTime ?? 0;
  const now = Math.floor(Date.now() / 1000);
  if (now - blockTime > MAX_TX_AGE_SECONDS) {
    return { verified: false, error: "Transaction too old" };
  }

  // Derive recipient's USDC ATA
  const recipientAta = getAssociatedTokenAddressSync(usdcMint, recipient);

  // Scan inner instructions for SPL token transfer to recipient ATA
  let amountPaid = 0;
  let buyerAddress = "";

  const instructions = [
    ...(tx.transaction.message.instructions ?? []),
    ...(tx.meta?.innerInstructions?.flatMap((ii) => ii.instructions) ?? []),
  ];

  for (const ix of instructions) {
    if (!("parsed" in ix)) continue;
    const parsed = ix.parsed as any;
    if (
      parsed?.type === "transferChecked" || parsed?.type === "transfer"
    ) {
      const info = parsed.info ?? {};
      const dest: string = info.destination ?? info.dest ?? "";
      if (dest === recipientAta.toBase58()) {
        const rawAmount =
          info.tokenAmount?.amount ?? info.amount ?? "0";
        amountPaid += parseInt(rawAmount, 10);
        buyerAddress = info.authority ?? info.source ?? "";
      }
    }
  }

  if (amountPaid < params.minAmountMicro) {
    return {
      verified: false,
      error: `Insufficient payment: got ${amountPaid}, expected >= ${params.minAmountMicro}`,
    };
  }

  return {
    verified: true,
    buyerAddress,
    amountPaid,
    timestamp: blockTime,
  };
}

// ─── Purchase PDA Verification ──────────────────────────────────────────────

/**
 * Verify that a Purchase PDA was created by purchase_prompt for a given
 * (promptPda, buyer, generationId) tuple. Used for prompt content unlocking.
 */
export async function verifySolanaPurchasePda(params: {
  chainKey: "solana" | "solana-devnet";
  promptPdaAddress: string;   // Prompt PDA pubkey (base58)
  buyerAddress: string;       // buyer pubkey (base58)
  generationId: bigint;
}): Promise<VerifyTransferResult> {
  const chain = PAYMENT_CHAINS[params.chainKey];
  const connection = new Connection(chain.rpcUrl, "confirmed");
  const programId = new PublicKey(getProgramId());

  // Derive Purchase PDA
  const generationIdBuf = Buffer.alloc(8);
  generationIdBuf.writeBigUInt64LE(params.generationId);

  const [purchasePda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("purchase"),
      new PublicKey(params.promptPdaAddress).toBuffer(),
      new PublicKey(params.buyerAddress).toBuffer(),
      generationIdBuf,
    ],
    programId
  );

  try {
    const accountInfo = await connection.getAccountInfo(purchasePda, "confirmed");
    if (!accountInfo) {
      return { verified: false, error: "Purchase PDA not found on-chain" };
    }
    // Account exists — payment confirmed
    return { verified: true, buyerAddress: params.buyerAddress };
  } catch (e) {
    return { verified: false, error: `Failed to fetch Purchase PDA: ${e}` };
  }
}

// ─── Prompt PDA Derivation Helper ──────────────────────────────────────────

/**
 * Derive the Prompt PDA address for a given (artist, promptId) pair.
 */
export function derivePromptPda(artistAddress: string, promptIdOnChain: bigint): string {
  const programId = new PublicKey(getProgramId());
  const promptIdBuf = Buffer.alloc(8);
  promptIdBuf.writeBigUInt64LE(promptIdOnChain);

  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("prompt"),
      new PublicKey(artistAddress).toBuffer(),
      promptIdBuf,
    ],
    programId
  );
  return pda.toBase58();
}
