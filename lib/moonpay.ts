import crypto from "crypto";

/**
 * MoonPay on-ramp URL builder + signer.
 *
 * Non-custodial: the widget buys USDC on Solana and delivers it straight to the
 * user's own wallet (`walletAddress`) — Enki never holds the funds. Both keys
 * stay server-side; the publishable key identifies the account, the secret key
 * signs the URL (mandatory whenever a walletAddress is passed).
 *
 * Test mode is chosen by the key prefix: a `pk_test_` key targets the sandbox
 * (buy-sandbox.moonpay.com, test cards, Solana testnet delivery, no real money).
 */
const SANDBOX_BASE = "https://buy-sandbox.moonpay.com";
const LIVE_BASE = "https://buy.moonpay.com";

export function buildSignedOnrampUrl(opts: {
  walletAddress: string;
  /** Fiat amount in USD to preset in the widget. */
  baseCurrencyAmount?: number;
}): string {
  const pk = process.env.MOONPAY_PUBLISHABLE_KEY;
  const sk = process.env.MOONPAY_SECRET_KEY;
  if (!pk || !sk) {
    throw new Error("MOONPAY_PUBLISHABLE_KEY / MOONPAY_SECRET_KEY not configured");
  }

  const base = pk.startsWith("pk_test_") ? SANDBOX_BASE : LIVE_BASE;

  const params = new URLSearchParams({
    apiKey: pk,
    currencyCode: "usdc_sol", // USDC on Solana
    walletAddress: opts.walletAddress,
  });
  if (opts.baseCurrencyAmount && opts.baseCurrencyAmount > 0) {
    params.set("baseCurrencyAmount", String(opts.baseCurrencyAmount));
  }

  // Signature is HMAC-SHA256 over the query string (leading "?"), base64.
  const query = `?${params.toString()}`;
  const signature = crypto.createHmac("sha256", sk).update(query).digest("base64");

  return `${base}${query}&signature=${encodeURIComponent(signature)}`;
}
