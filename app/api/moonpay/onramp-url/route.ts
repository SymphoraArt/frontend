import { NextRequest, NextResponse } from "next/server";
import { buildSignedOnrampUrl } from "@/lib/moonpay";

export const runtime = "nodejs";

/**
 * POST /api/moonpay/onramp-url  { walletAddress, amount? } → { url }
 *
 * Returns a signed MoonPay widget URL that buys USDC on Solana into the given
 * wallet. The address is the user's own deposit target; the buyer funds their
 * own purchase, so accepting it from the client is safe. Signing happens here
 * so the secret key never reaches the browser.
 */
export async function POST(req: NextRequest) {
  try {
    const { walletAddress, amount } = (await req.json()) as {
      walletAddress?: string;
      amount?: number;
    };

    if (!walletAddress || typeof walletAddress !== "string") {
      return NextResponse.json({ error: "walletAddress is required" }, { status: 400 });
    }

    const url = buildSignedOnrampUrl({
      walletAddress,
      baseCurrencyAmount: typeof amount === "number" ? amount : undefined,
    });

    return NextResponse.json({ url });
  } catch (e) {
    console.error("[moonpay/onramp-url]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Failed to build MoonPay URL" }, { status: 500 });
  }
}
