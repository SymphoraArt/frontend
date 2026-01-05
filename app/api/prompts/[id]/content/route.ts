import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const chain = (searchParams.get('chain') || 'base-sepolia') as ChainKey;
  const paymentHeader = request.headers.get('X-Payment');
  const { id } = await params;

  const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
  if (!serverWalletAddress) {
    return NextResponse.json(
      { error: 'SERVER_WALLET_ADDRESS is not configured' },
      { status: 500 }
    );
  }

  // Construct full URL for X402 payment (requires absolute URL)
  // Use NEXT_PUBLIC_APP_URL if available, otherwise construct from request
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  if (!baseUrl) {
    // Fallback: construct from request URL
    const protocol = requestUrl.protocol || 'http:';
    const host = requestUrl.host || requestUrl.hostname || 'localhost:3000';
    baseUrl = `${protocol}//${host}`;
  }
  
  // Ensure baseUrl doesn't end with slash
  baseUrl = baseUrl.replace(/\/$/, '');
  
  const resourceUrl = `${baseUrl}${requestUrl.pathname}${requestUrl.search}`;
  
  // Validate URL format
  try {
    const testUrl = new URL(resourceUrl);
    if (!testUrl.protocol || !testUrl.host) {
      throw new Error('Invalid URL: missing protocol or host');
    }
  } catch (urlError) {
    console.error('❌ Invalid resourceUrl constructed:', resourceUrl);
    return NextResponse.json(
      { error: 'Failed to construct payment URL' },
      { status: 500 }
    );
  }

  try {
    const result = await paymentEngine.settle({
      resourceUrl: resourceUrl,
      method: 'GET',
      paymentHeader: paymentHeader || undefined,
      chainKey: chain,
      price: '$0.05',
      description: `Unlock prompt ${id}`,
      payToAddress: serverWalletAddress,
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
