import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";
import { isSolanaChain } from "@/shared/payment-config";
import {
  buildSolana402Response,
  parseSolanaPaymentHeader,
  verifySolanaUsdcTransfer,
  checkAndRecordSolanaSignature,
} from "@/backend/solana-x402-verifier";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const chain = (searchParams.get('chain') || 'base-sepolia') as ChainKey;
  const paymentHeader = request.headers.get('X-Payment') || request.headers.get('X-PAYMENT');
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

  // ── Solana x402 path ──────────────────────────────────────────────────
  if (isSolanaChain(chain)) {
    const solanaChain = chain as "solana" | "solana-devnet";
    const solanaPlatformWallet = process.env.SOLANA_PLATFORM_WALLET;
    if (!solanaPlatformWallet) {
      return NextResponse.json(
        { error: 'SOLANA_PLATFORM_WALLET is not configured' },
        { status: 500 }
      );
    }

    if (!paymentHeader) {
      const { body, headers } = buildSolana402Response({
        chainKey: solanaChain,
        resource: resourceUrl,
        description: `Unlock prompt ${id}`,
        priceUsdc: "$0.05",
        payTo: solanaPlatformWallet,
      });
      return NextResponse.json(body, { status: 402, headers });
    }

    const payload = parseSolanaPaymentHeader(paymentHeader);
    if (!payload) {
      return NextResponse.json({ error: "Invalid Solana payment header" }, { status: 402 });
    }

    const verification = await verifySolanaUsdcTransfer({
      signature: payload.signature,
      chainKey: solanaChain,
      recipientAddress: solanaPlatformWallet,
      minAmountMicro: 50_000, // $0.05 USDC
    });

    if (!verification.verified) {
      return NextResponse.json(
        { error: `Solana payment verification failed: ${verification.error}` },
        { status: 402 }
      );
    }

    // Replay protection: record signature; reject if already used
    const replayCheck = await checkAndRecordSolanaSignature(
      payload.signature,
      solanaChain,
      "prompt-content"
    );
    if (!replayCheck.isNew) {
      return NextResponse.json(
        { error: "Transaction signature has already been used" },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { content: "Unlocked prompt content" },
      {
        status: 200,
        headers: {
          "X-Payment-Response": Buffer.from(
            JSON.stringify({ signature: payload.signature, verified: true })
          ).toString("base64"),
        },
      }
    );
  }
  // ── End Solana path ────────────────────────────────────────────────────

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
