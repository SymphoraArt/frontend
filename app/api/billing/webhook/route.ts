import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { creditFromIntent } from "@/lib/billing-db";

export const runtime = "nodejs";

/**
 * POST /api/billing/webhook — Stripe webhook (production crediting).
 *
 * Verifies the signature with STRIPE_WEBHOOK_SECRET, then credits the balance
 * on `payment_intent.succeeded`. Idempotent with the confirm endpoint, so it's
 * safe even if both fire for the same payment.
 *
 * Local dev: `stripe listen --forward-to localhost:3000/api/billing/webhook`
 * and put the printed signing secret in STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  const stripe = new Stripe(secret);
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (e) {
    console.error("[/api/billing/webhook] signature verification failed:", e);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    try {
      await creditFromIntent(intent.id);
    } catch (e) {
      console.error("[/api/billing/webhook] credit failed:", e);
      return NextResponse.json({ error: "Credit failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
