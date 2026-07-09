"use client";

/**
 * Turnkey Solana signer.
 *
 * Mirrors the wallet-adapter `{ publicKey, signTransaction }` shape so it can be
 * dropped into existing Solana flows (x402 payments, Anchor providers, etc.) when
 * the user logged in via the Turnkey passkey path instead of an external wallet.
 *
 * Signing happens IN THE BROWSER with the user's own passkey (Plan A) — the
 * WebAuthn prompt is the approval. The retired /api/turnkey/sign-transaction
 * server path (Enki's parent key signing on the user's behalf) is gone.
 */

import { useCallback, useMemo } from "react";
import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { passkeySignPayloadHex } from "@/lib/turnkey-passkey-signer";

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (clean.length % 2 !== 0) throw new Error("Invalid hex length");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return out;
}

function bytesToHex(bytes: Uint8Array): string {
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

export interface TurnkeySolanaSigner {
  isAvailable: boolean;
  publicKey: PublicKey | null;
  walletAddress: string | null;
  signTransaction: <T extends VersionedTransaction>(tx: T) => Promise<T>;
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
}

export function useTurnkeySolanaSigner(): TurnkeySolanaSigner {
  const { address, subOrgId } = useTurnkeyEmailAuth();

  const publicKey = useMemo(() => {
    if (!address) return null;
    try { return new PublicKey(address); } catch { return null; }
  }, [address]);

  const callSign = useCallback(
    async (payloadBytes: Uint8Array): Promise<Uint8Array> => {
      if (!subOrgId || !address) throw new Error("Turnkey session not available");
      const signatureHex = await passkeySignPayloadHex(subOrgId, address, bytesToHex(payloadBytes));
      const sig = hexToBytes(signatureHex);
      if (sig.length !== 64) throw new Error(`Unexpected signature length ${sig.length}`);
      return sig;
    },
    [subOrgId, address]
  );

  const signTransaction = useCallback(
    async <T extends VersionedTransaction>(tx: T): Promise<T> => {
      if (!publicKey) throw new Error("Turnkey wallet not available");

      const messageBytes = tx.message.serialize();
      const signature = await callSign(messageBytes);

      // Place the signature in the slot matching the fee payer (always index 0 here
      // because we only build single-signer txs in our flows).
      const signerIndex = tx.message.staticAccountKeys.findIndex((k) => k.equals(publicKey));
      const targetIndex = signerIndex === -1 ? 0 : signerIndex;
      tx.signatures[targetIndex] = signature;
      return tx;
    },
    [publicKey, callSign]
  );

  const signMessage = useCallback(
    async (message: Uint8Array): Promise<Uint8Array> => {
      return callSign(message);
    },
    [callSign]
  );

  return {
    isAvailable: !!publicKey && !!subOrgId,
    publicKey,
    walletAddress: address,
    signTransaction,
    signMessage,
  };
}
