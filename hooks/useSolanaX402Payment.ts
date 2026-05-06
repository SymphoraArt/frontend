"use client";

/**
 * Solana x402 Payment Hook
 *
 * Handles x402-style HTTP payment flow on Solana:
 * 1. Detects 402 response with Solana payment requirements
 * 2. Builds and sends a USDC SPL transfer to the platform wallet
 * 3. Retries the original request with the X-PAYMENT header
 *
 * Requires a Solana wallet connected via @solana/wallet-adapter-react.
 */

import { useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import type { ChainKey } from "@/lib/payment-config";
import { PAYMENT_CHAINS } from "@/lib/payment-config";

const EXPECTED_SOLANA_PLATFORM_WALLET = process.env.NEXT_PUBLIC_SOLANA_PLATFORM_WALLET;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SolanaPaymentRequirement {
  scheme: string;
  network: string;
  maxAmountRequired: string;
  resource: string;
  description: string;
  mimeType: string;
  payTo: string;
  maxTimeoutSeconds: number;
  asset: string;
  extra?: Record<string, unknown>;
}

interface Solana402Body {
  x402Version: number;
  error: string;
  accepts: SolanaPaymentRequirement[];
}

export interface SolanaPaymentState {
  isPending: boolean;
  error: string | null;
}

// ─── Encode Payment Header ───────────────────────────────────────────────────

function encodePaymentHeader(signature: string, buyerAddress: string, network: string): string {
  const payload = JSON.stringify({ signature, buyerAddress, network });
  return Buffer.from(payload).toString("base64");
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSolanaX402Payment() {
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Send a USDC transfer to the payTo address as specified in the 402 response.
   * Returns the base64-encoded X-PAYMENT header value.
   */
  const sendUsdcPayment = useCallback(
    async (req: SolanaPaymentRequirement): Promise<string> => {
      if (!publicKey) throw new Error("Solana wallet not connected");
      if (!sendTransaction) throw new Error("Wallet does not support sendTransaction");

      // Validate network. The 402 response uses x402-facing names.
      if (req.network !== "solana-devnet" && req.network !== "mainnet-beta") {
        throw new Error(`Invalid Solana network in payment requirement: ${req.network}`);
      }

      // Validate USDC mint against known-good addresses
      const chainKey = req.network === "mainnet-beta" ? "solana" : "solana-devnet";
      const expectedMint = PAYMENT_CHAINS[chainKey].usdc;
      if (req.asset !== expectedMint) {
        throw new Error(`Invalid USDC mint in payment requirement: expected ${expectedMint}`);
      }

      // Validate amount is positive
      const amount = BigInt(req.maxAmountRequired);
      if (amount <= BigInt(0)) {
        throw new Error("Invalid payment amount: must be positive");
      }

      const usdcMint = new PublicKey(req.asset);
      const recipient = new PublicKey(req.payTo); // throws if invalid base58
      if (!EXPECTED_SOLANA_PLATFORM_WALLET) {
        throw new Error("NEXT_PUBLIC_SOLANA_PLATFORM_WALLET is not configured");
      }
      if (recipient.toBase58() !== EXPECTED_SOLANA_PLATFORM_WALLET) {
        throw new Error("Invalid payment recipient in Solana payment requirement");
      }

      const senderAta = getAssociatedTokenAddressSync(usdcMint, publicKey);
      const recipientAta = getAssociatedTokenAddressSync(usdcMint, recipient);

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");

      const tx = new Transaction({
        feePayer: publicKey,
        recentBlockhash: blockhash,
      }).add(
        createTransferCheckedInstruction(
          senderAta,
          usdcMint,
          recipientAta,
          publicKey,
          amount,
          6, // USDC decimals
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const signature = await sendTransaction(tx, connection, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });

      // Wait for confirmation
      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "confirmed"
      );

      return encodePaymentHeader(signature, publicKey.toBase58(), req.network);
    },
    [publicKey, sendTransaction, connection]
  );

  /**
   * Fetch a resource with automatic x402 Solana payment handling.
   *
   * @param url      - The API endpoint URL
   * @param options  - Standard fetch options
   * @returns        - The successful response body (parsed as JSON)
   */
  const fetchWithSolanaPayment = useCallback(
    async <T = unknown>(url: string, options: RequestInit = {}): Promise<T> => {
      setIsPending(true);
      setError(null);

      try {
        // First attempt (no payment header)
        const firstRes = await fetch(url, options);

        if (firstRes.status !== 402) {
          if (!firstRes.ok) {
            const body = await firstRes.json().catch(() => ({}));
            throw new Error((body as any).error || `Request failed: ${firstRes.status}`);
          }
          return (await firstRes.json()) as T;
        }

        // Parse 402 body
        const paymentBody = (await firstRes.json()) as Solana402Body;
        const requirement = paymentBody.accepts?.find(
          (a) => a.network === "solana-devnet" || a.network === "mainnet-beta"
        );

        if (!requirement) {
          throw new Error("No Solana payment requirement in 402 response");
        }

        if (!publicKey) {
          throw new Error("Connect a Solana wallet to continue");
        }

        // Send payment
        const paymentHeader = await sendUsdcPayment(requirement);

        // Retry with payment header
        const retryRes = await fetch(url, {
          ...options,
          headers: {
            ...(options.headers as Record<string, string> || {}),
            "X-PAYMENT": paymentHeader,
          },
        });

        if (!retryRes.ok) {
          const body = await retryRes.json().catch(() => ({}));
          throw new Error((body as any).error || `Request failed after payment: ${retryRes.status}`);
        }

        return (await retryRes.json()) as T;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Solana payment failed";
        setError(msg);
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [publicKey, sendUsdcPayment]
  );

  /**
   * Generate an image via x402 Solana payment.
   */
  const generateImage = useCallback(
    async (params: {
      prompt: string;
      aspectRatio?: string;
      resolution?: string;
      chain?: "solana" | "solana-devnet";
    }) => {
      const chain = params.chain ?? "solana-devnet";
      const url = `/api/generate-image?chain=${chain}`;
      return fetchWithSolanaPayment<{ imageUrl: string; prompt: string }>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: params.prompt,
          aspectRatio: params.aspectRatio ?? "1:1",
          resolution: params.resolution ?? "2K",
        }),
      });
    },
    [fetchWithSolanaPayment]
  );

  /**
   * Unlock a prompt's content via x402 Solana payment.
   */
  const unlockPrompt = useCallback(
    async (promptId: string, chain: "solana" | "solana-devnet" = "solana-devnet") => {
      const url = `/api/prompts/${promptId}/content?chain=${chain}`;
      return fetchWithSolanaPayment<{ content: string }>(url, {
        method: "GET",
      });
    },
    [fetchWithSolanaPayment]
  );

  return {
    generateImage,
    unlockPrompt,
    fetchWithSolanaPayment,
    isPending,
    error,
    isConnected: !!publicKey,
    walletAddress: publicKey?.toBase58() ?? null,
  };
}
