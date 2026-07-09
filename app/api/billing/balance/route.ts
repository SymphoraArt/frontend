import { NextRequest, NextResponse } from "next/server";
import { getUsdcBalance } from "@/lib/usdc-balance";

export const runtime = "nodejs";

/**
 * GET /api/billing/balance?address=<solana wallet> → { balance } in USD.
 *
 * Non-custodial: reads the wallet's own on-chain USDC balance (USDC ≈ $1).
 * No custodial ledger, no Stripe.
 */
export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) return NextResponse.json({ balance: 0 });

  try {
    const balance = await getUsdcBalance(address);
    return NextResponse.json({ balance });
  } catch (e) {
    console.error("[/api/billing/balance] error:", e);
    return NextResponse.json({ balance: 0 });
  }
}
