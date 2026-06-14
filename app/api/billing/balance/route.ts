import { NextRequest, NextResponse } from "next/server";
import { getBalance, normalizeUserId } from "@/lib/billing-db";

export const runtime = "nodejs";

/** GET /api/billing/balance?address=0x… → { balance } in USD. */
export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  const userId = normalizeUserId(address);
  if (!userId) return NextResponse.json({ balance: 0 });

  try {
    const balance = await getBalance(userId);
    return NextResponse.json({ balance });
  } catch (e) {
    console.error("[/api/billing/balance] error:", e);
    return NextResponse.json({ balance: 0 });
  }
}
