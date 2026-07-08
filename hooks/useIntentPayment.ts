"use client";

/**
 * Server-built generation payments for Turnkey email wallets (backlog #2):
 *
 *   intent → confirm (in-app modal) → pay → generate
 *
 * The client sends ONLY identifiers — the server prices from its DB, builds
 * and signs the Solana tx (Enki pays the network fee, so buyers need no
 * SOL), and the generate call redeems the confirmed intent one-shot.
 *
 * Double-charge safety: the intent id is persisted per (wallet, prompt,
 * model, resolution) the moment it exists and only cleared on delivery or a
 * terminal server verdict. Any interruption — closed tab, poll timeout,
 * failed generation — RESUMES the same intent on the next attempt (the pay
 * endpoint replays idempotently), so retrying never pays twice.
 *
 * Replaces the client-built x402 flow for Turnkey users; external wallets
 * keep their adapter flow until the build-then-client-sign variant lands.
 */
import { useState } from "react";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { requestPaymentConfirm } from "@/lib/payment-confirm";

export type IntentGenerationParams = {
  promptId: string;
  modelFamily: string;
  resolution?: "2K" | "4K";
  prompt: string;
  aspectRatio?: string;
  // Distinguishes concurrent flows (batch generation runs one per card):
  // without it, parallel flows with identical (prompt, model, resolution)
  // would share one resume slot and clobber each other's paid intent ids.
  slotId?: number | string;
};

export type IntentGenerationResult = {
  imageUrl: string;
  prompt?: string;
  provider?: string;
  usedGemini?: boolean;
  metadata?: unknown;
};

// The pay endpoint answers 202 while the tx confirms on-chain; re-POSTing
// the same intentId is idempotent and just keeps polling.
const PAY_POLL_MS = 2_000;
const PAY_DEADLINE_MS = 120_000;

const RETRY_IS_FREE = " Your payment is saved — retrying won't charge you again.";

type StoredIntent = { id: string; approved: boolean };

function intentStorageKey(wallet: string, p: IntentGenerationParams): string {
  return `enki:paid-intent:${wallet}:${p.promptId}|${p.modelFamily}|${p.resolution ?? "2K"}|${p.slotId ?? "single"}`;
}

function loadStoredIntent(key: string): StoredIntent | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredIntent;
    return typeof parsed?.id === "string" && parsed.id ? parsed : null;
  } catch {
    return null;
  }
}

function saveStoredIntent(key: string, value: StoredIntent): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full — resume just won't survive a reload */
  }
}

function clearStoredIntent(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

// Exact display amount: micro-USDC → decimal string without cent-rounding
// ("147400" → "0.1474"), so the modal shows exactly what the tx transfers.
function microToUsdc(totalAmountMicro: string): string {
  return (Number(totalAmountMicro) / 1_000_000)
    .toFixed(6)
    .replace(/(\.\d*?)0+$/, "$1")
    .replace(/\.$/, "");
}

async function readError(res: Response, fallback: string): Promise<string> {
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  return data.error || fallback;
}

export function useIntentPayment() {
  const { address, getAuthHeaders } = useTurnkeyEmailAuth();
  // Counter, not boolean: batch generation runs several flows concurrently
  // and the flag must only clear when the LAST one settles.
  const [pendingCount, setPendingCount] = useState(0);

  const generateWithIntent = async (
    params: IntentGenerationParams,
  ): Promise<IntentGenerationResult> => {
    const auth = getAuthHeaders();
    if (!auth || !address) throw new Error("Sign in with your email wallet first.");
    const headers = { "Content-Type": "application/json", ...auth };
    const storageKey = intentStorageKey(address, params);

    setPendingCount((c) => c + 1);
    try {
      // 1. Reuse an interrupted intent for this exact (prompt, model,
      //    resolution) — possibly already paid — instead of creating and
      //    charging a fresh one. Never-approved leftovers (the user
      //    cancelled the modal) are discarded: nothing was charged, and a
      //    fresh intent carries a fresh quote to approve.
      let stored = loadStoredIntent(storageKey);
      if (stored && !stored.approved) {
        clearStoredIntent(storageKey);
        stored = null;
      }
      if (!stored) {
        const intentRes = await fetch("/api/payments/generation/intent", {
          method: "POST",
          headers,
          body: JSON.stringify({
            promptId: params.promptId,
            modelFamily: params.modelFamily,
            resolution: params.resolution ?? "2K",
          }),
        });
        if (!intentRes.ok) {
          throw new Error(await readError(intentRes, "Could not price this generation"));
        }
        const { intent } = (await intentRes.json()) as {
          intent: { id: string; breakdown: { totalAmount: string; currency: string } };
        };
        stored = { id: intent.id, approved: false };
        saveStoredIntent(storageKey, stored);

        // 2. Turnkey wallets sign server-side (no extension popup), so the
        //    user approves in-app first — same modal as the old x402 flow.
        //    Resumed intents were approved at this exact amount already.
        const approved = await requestPaymentConfirm({
          amount: microToUsdc(intent.breakdown.totalAmount),
          asset: intent.breakdown.currency,
          to: "Enki (artist + platform split)",
          description: `Generate ${params.resolution ?? "2K"} image`,
          network: "Solana",
        });
        if (!approved) throw new Error("Payment cancelled");
        stored = { id: stored.id, approved: true };
        saveStoredIntent(storageKey, stored);
      }

      // 3. Pay — poll on 202 until the tx confirms or the deadline passes.
      //    Terminal 410 verdicts clear the stored intent (nothing charged);
      //    everything ambiguous keeps it so the next attempt resumes.
      const deadline = Date.now() + PAY_DEADLINE_MS;
      for (;;) {
        const payRes = await fetch("/api/payments/generation/pay", {
          method: "POST",
          headers,
          body: JSON.stringify({ intentId: stored.id }),
        });
        if (payRes.status === 200) break;
        if (payRes.status === 202) {
          if (Date.now() >= deadline) {
            throw new Error(
              "Payment is still confirming on-chain. Generate again in a moment — it resumes without paying twice.",
            );
          }
          await new Promise((resolve) => setTimeout(resolve, PAY_POLL_MS));
          continue;
        }
        if (payRes.status === 402) {
          // Claim released server-side; the same intent stays payable.
          throw new Error("Insufficient USDC balance. Top up your wallet and try again.");
        }
        if (payRes.status === 410) {
          const data = (await payRes.json().catch(() => ({}))) as {
            payment?: { status?: string };
          };
          clearStoredIntent(storageKey);
          throw new Error(
            data.payment?.status === "expired"
              ? "The price quote expired — nothing was charged. Please try again."
              : "The payment could not be completed on-chain — please try again.",
          );
        }
        if (payRes.status === 404) {
          clearStoredIntent(storageKey);
          throw new Error("Payment intent not found — please try again.");
        }
        throw new Error(await readError(payRes, "Payment failed"));
      }

      // 4. Generate — redeems the confirmed intent one-shot; the server
      //    enforces the paid resolution. A failed generation is released
      //    server-side, so the stored intent resumes for free.
      const genRes = await fetch("/api/generate-image", {
        method: "POST",
        headers,
        body: JSON.stringify({
          intentId: stored.id,
          prompt: params.prompt,
          aspectRatio: params.aspectRatio,
          resolution: params.resolution ?? "2K",
        }),
      });
      if (!genRes.ok) {
        const message = await readError(genRes, "Image generation failed");
        if (genRes.status === 404 || genRes.status === 409 || genRes.status === 410) {
          // Terminal for this intent (used or gone) — don't resume it.
          clearStoredIntent(storageKey);
          throw new Error(message);
        }
        throw new Error(message + RETRY_IS_FREE);
      }
      const result = (await genRes.json()) as IntentGenerationResult;
      clearStoredIntent(storageKey);
      return result;
    } finally {
      setPendingCount((c) => c - 1);
    }
  };

  return { generateWithIntent, isPending: pendingCount > 0, isTurnkey: !!address };
}
