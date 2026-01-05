import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error: "Not implemented",
      message:
        "Paid prompt unlock endpoint is disabled in this build. Configure an external payment service or re-enable x402 backend separately.",
    },
    { status: 501 }
  );
}
