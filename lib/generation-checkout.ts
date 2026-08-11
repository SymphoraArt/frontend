"use client";

/**
 * The buyer's side of authorise-then-capture, as one straight line:
 *
 *   quote                        what would this cost? (display only)
 *   intent → authorize → sign → submit     hold a payment, move no money
 *
 * After submit, the generation runs with the intentId and the SERVER decides
 * the ending: image stored → capture; anything else → void, nothing charged.
 * The client never touches an amount or a destination — it ships identifiers
 * and a signature, and everything it displays came out of the server's own
 * arithmetic (Terms of Use §4: the price shown is the price charged, network
 * fee included and itemised).
 *
 * Signing goes through lib/cdp-bridge — the window-event indirection exists
 * because CDP hooks throw outside their provider, and an eslint rule bans
 * importing them directly (that import once took the editor down).
 */
import { sessionAuthHeaders } from "@/lib/session-headers";
import { requestCdpSign } from "@/lib/cdp-bridge";

/** The models table stores display names; pricing keys are their slugs. */
export function toModelFamily(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/\(.*?\)/g, "") // "GPT-Image-2 (coming soon)" → "gpt-image-2"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Integer micro-USDC (string, as the API serialises u64s) → display dollars. */
export function microToUsd(micro: string | number): string {
  const n = typeof micro === "string" ? Number(micro) : micro;
  if (!Number.isFinite(n)) return "0.00";
  return (n / 1_000_000).toFixed(n % 10_000 === 0 ? 2 : 3);
}

export interface GenerationQuote {
  totalUsd: string;
  networkFeeUsd: string;
  artistUsd: string;
  expiresAt: string;
  appliedRule: { name: string } | null;
}

export interface QuoteRequest {
  promptId: string;
  modelFamily: string;
  resolution?: "2K" | "4K";
}

/** Null on any failure: a missing quote greys the paid button, never fakes a price. */
export async function fetchGenerationQuote(req: QuoteRequest): Promise<GenerationQuote | null> {
  try {
    const res = await fetch("/api/payments/generation/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
      body: JSON.stringify(req),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      quote?: {
        expiresAt: string;
        breakdown: { totalAmount: string; networkFee: string; artistAmount: string };
        appliedRule: { name: string } | null;
      };
    };
    if (!json.quote) return null;
    return {
      totalUsd: microToUsd(json.quote.breakdown.totalAmount),
      networkFeeUsd: microToUsd(json.quote.breakdown.networkFee),
      artistUsd: microToUsd(json.quote.breakdown.artistAmount),
      expiresAt: json.quote.expiresAt,
      appliedRule: json.quote.appliedRule,
    };
  } catch {
    return null;
  }
}

/**
 * Which step failed, in the user's terms. The distinction that matters most
 * is `sign` — that one is the buyer changing their mind in the wallet, not an
 * error, and the UI should say "nothing was charged", which is literally true
 * at every step of this flow.
 */
export class CheckoutError extends Error {
  constructor(
    readonly step: "intent" | "authorize" | "sign" | "submit",
    message: string,
  ) {
    super(message);
    this.name = "CheckoutError";
  }
}

async function post(path: string, body: unknown): Promise<Response> {
  return fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
    body: JSON.stringify(body),
  });
}

const errorOf = async (res: Response, fallback: string) =>
  ((await res.json().catch(() => null)) as { error?: string } | null)?.error ?? fallback;

/**
 * Hold the payment: intent → authorize → sign in the CDP wallet → submit.
 * Returns the intentId to generate with. Throws CheckoutError; no step of it
 * moves money, so every failure leaves the buyer exactly where they started.
 */
export async function authorizePaidGeneration(req: QuoteRequest): Promise<{ intentId: string }> {
  const intentRes = await post("/api/payments/generation/intent", req);
  if (!intentRes.ok) {
    throw new CheckoutError("intent", await errorOf(intentRes, "Could not prepare the payment"));
  }
  const intentId = ((await intentRes.json()) as { intent?: { id?: string } }).intent?.id;
  if (!intentId) throw new CheckoutError("intent", "Could not prepare the payment");

  const authRes = await post("/api/payments/generation/authorize", { intentId });
  if (!authRes.ok) {
    throw new CheckoutError("authorize", await errorOf(authRes, "Could not build the payment"));
  }
  const { transaction } = (await authRes.json()) as { transaction?: string };
  if (!transaction) throw new CheckoutError("authorize", "Could not build the payment");

  let signed: string;
  try {
    signed = await requestCdpSign(transaction);
  } catch (e) {
    throw new CheckoutError(
      "sign",
      e instanceof Error && /reject|denied|cancel/i.test(e.message)
        ? "Signing was cancelled — nothing was charged"
        : "The wallet could not sign — nothing was charged",
    );
  }

  const submitRes = await post("/api/payments/generation/submit", {
    intentId,
    signedTransaction: signed,
  });
  if (!submitRes.ok) {
    throw new CheckoutError("submit", await errorOf(submitRes, "Could not store the authorisation"));
  }

  return { intentId };
}
