import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import bs58 from "bs58";
import { PAYMENT_CHAINS, isSolanaChain, type ChainKey } from "@/lib/payment-config";

/**
 * Treasury auto-funding (Option 2).
 *
 * After a successful fiat top-up we move real USDC from a platform treasury
 * wallet into the user's Turnkey Solana wallet so the existing client-side x402
 * flow (which spends from the user's wallet and pays the SOL fee itself) keeps
 * working. We also top up a little SOL for transaction fees when the wallet is
 * empty.
 *
 * Config (server-only env):
 *   SOLANA_TREASURY_SECRET_KEY  base58 string OR JSON array of the treasury keypair
 *   SOLANA_FUND_CHAIN           "solana-devnet" (default) | "solana"
 *   SOLANA_RPC_URL              optional RPC override
 *   SOLANA_FUND_SOL_LAMPORTS    gas top-up size (default 5_000_000 = 0.005 SOL)
 *
 * IMPORTANT: this moves real funds. Test on solana-devnet first. The treasury
 * must hold enough USDC (matching the chain's mint) and SOL for fees + rent.
 */

const USDC_DECIMALS = 6;
const DEFAULT_GAS_LAMPORTS = 5_000_000; // 0.005 SOL
const MIN_RECIPIENT_LAMPORTS = 2_000_000; // top up gas if below 0.002 SOL

export function isTreasuryConfigured(): boolean {
  return Boolean(process.env.SOLANA_TREASURY_SECRET_KEY);
}

export function getFundChain(): ChainKey {
  const raw = (process.env.SOLANA_FUND_CHAIN || "solana-devnet") as ChainKey;
  return isSolanaChain(raw) ? raw : "solana-devnet";
}

function loadTreasuryKeypair(): Keypair {
  const raw = process.env.SOLANA_TREASURY_SECRET_KEY;
  if (!raw) throw new Error("SOLANA_TREASURY_SECRET_KEY is not set");
  const trimmed = raw.trim();
  try {
    if (trimmed.startsWith("[")) {
      return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(trimmed)));
    }
    return Keypair.fromSecretKey(bs58.decode(trimmed));
  } catch {
    throw new Error("SOLANA_TREASURY_SECRET_KEY is malformed (expected base58 or JSON array)");
  }
}

function getConnection(chain: ChainKey): Connection {
  const rpc = process.env.SOLANA_RPC_URL || PAYMENT_CHAINS[chain].rpcUrl;
  return new Connection(rpc, "confirmed");
}

/**
 * Sends `usdAmount` USDC (and a little SOL for fees, if needed) from the
 * treasury to `recipientAddress`. Returns the transaction signature.
 */
export async function fundUserWallet(params: {
  recipientAddress: string;
  usdAmount: number;
  chain?: ChainKey;
}): Promise<string> {
  const chain = params.chain ?? getFundChain();
  if (!isSolanaChain(chain)) throw new Error(`Fund chain ${chain} is not a Solana chain`);

  const amount = BigInt(Math.round(params.usdAmount * 10 ** USDC_DECIMALS));
  if (amount <= BigInt(0)) throw new Error("Funding amount must be positive");

  const treasury = loadTreasuryKeypair();
  const connection = getConnection(chain);
  const usdcMint = new PublicKey(PAYMENT_CHAINS[chain].usdc);
  const recipient = new PublicKey(params.recipientAddress);

  const treasuryAta = getAssociatedTokenAddressSync(usdcMint, treasury.publicKey);
  const recipientAta = getAssociatedTokenAddressSync(usdcMint, recipient);

  const instructions = [
    // Create the recipient's USDC token account if missing (treasury pays rent).
    createAssociatedTokenAccountIdempotentInstruction(
      treasury.publicKey,
      recipientAta,
      recipient,
      usdcMint
    ),
    createTransferCheckedInstruction(
      treasuryAta,
      usdcMint,
      recipientAta,
      treasury.publicKey,
      amount,
      USDC_DECIMALS,
      [],
      TOKEN_PROGRAM_ID
    ),
  ];

  // Top up SOL for the user's future x402 transaction fee if their wallet is low.
  const recipientLamports = await connection.getBalance(recipient, "confirmed");
  if (recipientLamports < MIN_RECIPIENT_LAMPORTS) {
    const gas = Number(process.env.SOLANA_FUND_SOL_LAMPORTS || DEFAULT_GAS_LAMPORTS);
    instructions.unshift(
      SystemProgram.transfer({
        fromPubkey: treasury.publicKey,
        toPubkey: recipient,
        lamports: gas,
      })
    );
  }

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  const tx = new Transaction({
    feePayer: treasury.publicKey,
    blockhash,
    lastValidBlockHeight,
  }).add(...instructions);
  tx.sign(treasury);

  const signature = await connection.sendRawTransaction(tx.serialize(), {
    skipPreflight: false,
    preflightCommitment: "confirmed",
    maxRetries: 3,
  });

  const confirmation = await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed"
  );
  if (confirmation.value.err) {
    throw new Error(`Treasury funding failed on-chain: ${JSON.stringify(confirmation.value.err)}`);
  }

  return signature;
}
