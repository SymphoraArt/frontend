import { NextRequest, NextResponse } from "next/server";
import { creditFromIntent } from "@/lib/billing-db";

export const runtime = "nodejs";

/**
 * POST /api/billing/confirm  { paymentIntentId, address? }
 *
 * Called by the client right after Stripe reports a successful payment. The
 * server re-verifies the PaymentIntent with Stripe (the client can't fake a
 * success) and credits the persisted balance. Idempotent — replays are no-ops.
 *
 * This makes balances work in local dev without a public webhook URL; the
 * webhook handles the same crediting for production resilience.
 */
export async function POST(req: NextRequest) {
  let body: { paymentIntentId?: unknown; address?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const intentId = typeof body.paymentIntentId === "string" ? body.paymentIntentId : "";
  const address = typeof body.address === "string" ? body.address : null;
  if (!intentId) return NextResponse.json({ error: "Missing paymentIntentId." }, { status: 400 });

  try {
    const { balance, credited, amount, funded, fundError } = await creditFromIntent(intentId, address);
    return NextResponse.json({ balance, credited, amount, funded, fundError });
  } catch (e) {
    console.error("[/api/billing/confirm] error:", e);
    return NextResponse.json({ error: "Could not confirm payment." }, { status: 502 });
  }
}
