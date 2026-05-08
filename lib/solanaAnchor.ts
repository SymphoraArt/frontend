/**
 * Anchor client utilities for the Symphora on-chain program.
 *
 * Wraps the three most-used instructions:
 *   - initializePrompt  → artist lists a prompt on-chain
 *   - purchasePrompt    → buyer pays USDC (artist 95% / platform 5%)
 *   - togglePrompt      → artist activates / deactivates a listing
 *
 * PDAs and USDC mint constants are kept in sync with purchase_prompt.rs.
 */

import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import {
  Connection,
  PublicKey,
  Transaction,
  type Signer,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
} from "@solana/spl-token";
import idl from "@/shared/symphora-idl.json";
import { getProgramId } from "@/shared/app-config";

// ─── Constants ───────────────────────────────────────────────────────────────

// Keep in sync with purchase_prompt.rs
const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
const MAINNET_USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export function getUsdcMint(isDevnet: boolean): PublicKey {
  return new PublicKey(isDevnet ? DEVNET_USDC_MINT : MAINNET_USDC_MINT);
}

export function getPlatformWallet(): PublicKey {
  const addr = process.env.NEXT_PUBLIC_SOLANA_PLATFORM_WALLET;
  if (!addr) throw new Error("NEXT_PUBLIC_SOLANA_PLATFORM_WALLET not set");
  return new PublicKey(addr);
}

// ─── PDA Derivation ──────────────────────────────────────────────────────────

export function derivePromptPda(artistPubkey: PublicKey, promptId: bigint): PublicKey {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(promptId);
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("prompt"), artistPubkey.toBuffer(), buf],
    new PublicKey(getProgramId())
  );
  return pda;
}

export function derivePurchasePda(
  promptPda: PublicKey,
  buyerPubkey: PublicKey,
  generationId: bigint
): PublicKey {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(generationId);
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("purchase"), promptPda.toBuffer(), buyerPubkey.toBuffer(), buf],
    new PublicKey(getProgramId())
  );
  return pda;
}

// ─── Anchor Program Factory ───────────────────────────────────────────────────

function getProgram(connection: Connection, wallet: AnchorProvider["wallet"]) {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
    preflightCommitment: "confirmed",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Program(idl as any, provider);
}

// ─── initialize_prompt ───────────────────────────────────────────────────────

export interface InitializePromptParams {
  connection: Connection;
  wallet: AnchorProvider["wallet"];
  promptId: bigint;
  priceUsdc: bigint;        // in USDC lamports (1 USDC = 1_000_000)
  title: string;
  metadataUri: string;
}

/**
 * Builds and sends the initialize_prompt transaction.
 * Returns the transaction signature.
 */
export async function callInitializePrompt(params: InitializePromptParams): Promise<string> {
  const { connection, wallet, promptId, priceUsdc, title, metadataUri } = params;
  const program = getProgram(connection, wallet);
  const artist = wallet.publicKey;
  const promptPda = derivePromptPda(artist, promptId);

  const sig = await (program.methods as any)
    .initializePrompt(
      new BN(promptId.toString()),
      new BN(priceUsdc.toString()),
      title,
      metadataUri
    )
    .accounts({
      artist,
      prompt: promptPda,
      systemProgram: PublicKey.default,
    })
    .rpc();

  return sig;
}

// ─── purchase_prompt ─────────────────────────────────────────────────────────

export interface PurchasePromptParams {
  connection: Connection;
  wallet: AnchorProvider["wallet"];
  artistPubkey: PublicKey;
  promptId: bigint;
  generationId: bigint;
  isDevnet?: boolean;
}

/**
 * Builds and sends the purchase_prompt transaction.
 * Automatically ensures buyer and artist USDC ATAs exist before calling.
 * Returns the transaction signature.
 */
export async function callPurchasePrompt(params: PurchasePromptParams): Promise<string> {
  const { connection, wallet, artistPubkey, promptId, generationId, isDevnet = true } = params;
  const program = getProgram(connection, wallet);
  const buyer = wallet.publicKey;
  const usdcMint = getUsdcMint(isDevnet);
  const platform = getPlatformWallet();
  const promptPda = derivePromptPda(artistPubkey, promptId);
  const purchasePda = derivePurchasePda(promptPda, buyer, generationId);

  const buyerUsdc = getAssociatedTokenAddressSync(usdcMint, buyer);
  const artistUsdc = getAssociatedTokenAddressSync(usdcMint, artistPubkey);
  const platformUsdc = getAssociatedTokenAddressSync(usdcMint, platform);

  // Ensure ATAs exist (idempotent — no-op if already created)
  const ensureAtaIxs: Transaction["instructions"] = [];
  for (const [owner, ata] of [[artistPubkey, artistUsdc], [platform, platformUsdc]] as const) {
    const info = await connection.getAccountInfo(ata);
    if (!info) {
      ensureAtaIxs.push(
        createAssociatedTokenAccountIdempotentInstruction(buyer, ata, owner, usdcMint)
      );
    }
  }

  let sig: string;
  if (ensureAtaIxs.length > 0) {
    // Send ATA creation first, then purchase
    const ataTx = new Transaction().add(...ensureAtaIxs);
    ataTx.feePayer = buyer;
    ataTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    await wallet.signTransaction(ataTx);
    await connection.sendRawTransaction(ataTx.serialize(), { skipPreflight: false });
  }

  sig = await (program.methods as any)
    .purchasePrompt(new BN(generationId.toString()))
    .accounts({
      buyer,
      prompt: promptPda,
      artist: artistPubkey,
      platform,
      buyerUsdc,
      artistUsdc,
      platformUsdc,
      usdcMint,
      purchase: purchasePda,
      tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      systemProgram: PublicKey.default,
    })
    .rpc();

  return sig;
}

// ─── toggle_prompt ───────────────────────────────────────────────────────────

export interface TogglePromptParams {
  connection: Connection;
  wallet: AnchorProvider["wallet"];
  promptId: bigint;
}

/**
 * Toggles a prompt's is_active flag. Only the artist can call this.
 */
export async function callTogglePrompt(params: TogglePromptParams): Promise<string> {
  const { connection, wallet, promptId } = params;
  const program = getProgram(connection, wallet);
  const artist = wallet.publicKey;
  const promptPda = derivePromptPda(artist, promptId);

  const sig = await (program.methods as any)
    .togglePrompt()
    .accounts({ artist, prompt: promptPda })
    .rpc();

  return sig;
}
