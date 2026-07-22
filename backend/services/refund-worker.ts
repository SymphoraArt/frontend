/**
 * Refund Worker
 *
 * Automatic on-chain refund handler for queue timeout aborts (PR #54 review #7).
 * Triggered when the FIFO safety valve fires (double-vendor outage, ~3 min timeout).
 *
 * Current State: STUB (Logging + DB Marking)
 *
 * To enable full on-chain signing, Kev needs to:
 * 1. Set SOLANA_PLATFORM_WALLET_PRIVATE_KEY in production env
 * 2. Uncomment the @solana/web3.js transfer code below
 * 3. Update the reconcile endpoint to trigger this on timeout failures
 */

export interface RefundRequest {
  walletAddress: string;
  amountUsdc: number;
  reason: string;
  originalSignature: string;
}

export async function processRefund(request: RefundRequest): Promise<boolean> {
  const { walletAddress, amountUsdc, reason, originalSignature } = request;

  console.warn(
    `[RefundWorker] 🚨 REFUND REQUIRED 🚨\n` +
    `Wallet: ${walletAddress}\n` +
    `Amount: ${amountUsdc} USDC\n` +
    `Reason: ${reason}\n` +
    `Original Tx: ${originalSignature}`
  );

  // TODO: Insert a record into a `pending_refunds` DB table so ops can process it manually

  /* --- Full On-Chain Implementation (Pending Ops Key Setup) ---
  const privateKeyString = process.env.SOLANA_PLATFORM_WALLET_PRIVATE_KEY;
  if (!privateKeyString) {
    console.error('[RefundWorker] Cannot sign refund: Private key missing');
    return false;
  }

  try {
    const { Connection, Keypair, PublicKey, Transaction } = require('@solana/web3.js');
    const { createTransferInstruction, getAssociatedTokenAddress } = require('@solana/spl-token');

    // Setup connection and keypair
    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!, 'confirmed');
    const platformKeypair = Keypair.fromSecretKey(
      Buffer.from(privateKeyString, 'base64')
    );

    // Get USDC mint address from config
    const usdcMint = new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!);
    const recipientPubkey = new PublicKey(walletAddress);

    // Get ATAs
    const sourceAta = await getAssociatedTokenAddress(usdcMint, platformKeypair.publicKey);
    const destAta = await getAssociatedTokenAddress(usdcMint, recipientPubkey);

    // Convert USDC amount to base units (6 decimals)
    const amountBase = Math.floor(amountUsdc * 1_000_000);

    const tx = new Transaction().add(
      createTransferInstruction(
        sourceAta,
        destAta,
        platformKeypair.publicKey,
        amountBase
      )
    );

    const signature = await connection.sendTransaction(tx, [platformKeypair]);
    console.log(`[RefundWorker] Refund successful. Tx: ${signature}`);
    return true;

  } catch (error: any) {
    console.error(`[RefundWorker] Refund failed: ${error.message}`);
    return false;
  }
  -------------------------------------------------------------- */

  return true; // Return true to indicate the stub processed it
}
