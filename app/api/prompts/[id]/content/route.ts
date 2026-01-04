import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const chain = (searchParams.get('chain') || 'base-sepolia') as ChainKey;
  const paymentHeader = request.headers.get('X-Payment');

  try {
    const result = await paymentEngine.settle({
      resourceUrl: `/api/prompts/${params.id}/content`,
      method: 'GET',
      paymentHeader: paymentHeader || undefined,
      chainKey: chain,
      price: '$0.05',
      description: `Unlock prompt ${params.id}`,
      payToAddress: process.env.SERVER_WALLET_ADDRESS!,
      category: 'prompt-unlock',
    });

    if (result.success) {
      return NextResponse.json(
        { content: "Unlocked prompt content" },
        { status: 200, headers: result.headers }
      );
    } else {
      return NextResponse.json(
        result.body || { error: 'Payment required' },
        { status: result.status, headers: result.headers }
      );
    }
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Payment failed' },
      { status: 500 }
    );
  }
}
