"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";

/**
 * Lazily loads Stripe.js with the publishable key.
 *
 * Stripe is the payment gateway behind the "dollars" checkout: it renders the
 * native Apple Pay / Google Pay sheets and charges plain USD. No crypto / USDC
 * wording is ever shown to the user on this path.
 *
 * Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment to enable it.
 */
let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return Promise.resolve(null);
  if (!stripePromise) stripePromise = loadStripe(key);
  return stripePromise;
}

export function hasStripeConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}
