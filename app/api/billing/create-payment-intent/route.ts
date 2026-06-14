import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

/**
 * Creates a Stripe PaymentIntent for a fiat top-up (Apple Pay / Google Pay /
 * card). The client confirms it with Stripe.js — money is charged in plain USD
 * and never surfaces any crypto/USDC wording to the user.
 *
 * Requires STRIPE_SECRET_KEY. The amount is sent in whole dollars and converted
 * to cents here so the client can't smuggle a different currency unit.
 *
 * NOTE: how the paid balance becomes spendable is a separate decision handled by
 * the Stripe webhook (credit a fiat ledger, or buy+forward USDC to the wallet).
 * `recipient` is forwarded as metadata so the webhook knows which wallet/user to
 * credit.
 */
const MIN_USD = 1;
// Testing cap: top-ups limited to $2, accepted as a decimal (e.g. 1.50).
const MAX_USD = 2;

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Set STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }

  let body: { amount?: unknown; recipient?: unknown; method?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const usd = Number(body.amount);
  if (!Number.isFinite(usd) || usd < MIN_USD || usd > MAX_USD) {
    return NextResponse.json(
      { error: `Amount must be between $${MIN_USD} and $${MAX_USD}.` },
      { status: 400 }
    );
  }

  const recipient = typeof body.recipient === "string" ? body.recipient : "";
  const method = body.method === "paypal" ? "paypal" : "stripe";

  try {
    const stripe = new Stripe(secret);
    const params: Stripe.PaymentIntentCreateParams = {
      amount: Math.round(usd * 100),
      currency: "usd",
      metadata: { recipient, purpose: "balance_topup" },
    };

    if (method === "paypal") {
      // PayPal is a redirect-based method; request it explicitly.
      params.payment_method_types = ["paypal"];
    } else {
      // Card + whatever else is enabled in the Stripe dashboard.
      params.automatic_payment_methods = { enabled: true };
    }

    const intent = await stripe.paymentIntents.create(params);

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (e) {
    console.error("[/api/billing/create-payment-intent] Stripe error:", e);
    return NextResponse.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 }
    );
  }
}
