/**
 * Next.js Middleware for X402 Payment Protection
 * 
 * Protects routes under /api/paid/* with X402 payment verification.
 * Based on official Thirdweb X402 server documentation:
 * https://portal.thirdweb.com/x402/server
 * 
 * This middleware:
 * - Intercepts requests to /api/paid/* routes
 * - Verifies payment using settlePayment()
 * - Forwards valid payments to route handlers
 * - Returns 402 Payment Required for unpaid requests
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { settlePayment } from "thirdweb/x402";
import { thirdwebFacilitator } from "@/backend/facilitator";
import { PAYMENT_CHAINS, type ChainKey } from "@/shared/payment-config";

/**
 * Payment configuration for middleware-protected routes
 */
const MIDDLEWARE_PAYMENT_CONFIG = {
  defaultPrice: "$0.01", // Default price for protected routes
  defaultChain: "base-sepolia" as ChainKey,
  maxTimeoutSeconds: 3600, // 1 hour
  description: "Access to paid content",
  mimeType: "application/json" as const,
};

/**
 * Middleware function to protect /api/paid/* routes with X402 payments
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect /api/paid/* routes
  if (!pathname.startsWith('/api/paid/')) {
    return NextResponse.next();
  }

  // Get payment header
  const paymentData = request.headers.get("x-payment");

  // Get chain from query params or use default
  const chainParam = request.nextUrl.searchParams.get('chain');
  const chain = (chainParam || MIDDLEWARE_PAYMENT_CONFIG.defaultChain) as ChainKey;

  // Get chain configuration
  const chainConfig = PAYMENT_CHAINS[chain];
  if (!chainConfig) {
    return NextResponse.json(
      { 
        error: `Unsupported chain: ${chain}`,
        supportedChains: Object.keys(PAYMENT_CHAINS),
      },
      { status: 400 }
    );
  }

  // Get server wallet address
  const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
  if (!serverWalletAddress) {
    console.error('❌ SERVER_WALLET_ADDRESS is not configured');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  // Construct absolute resource URL for X402 payment
  const resourceUrl = request.nextUrl.toString();

  try {
    // Verify and settle payment using official Thirdweb API
    const result = await settlePayment({
      resourceUrl,
      method: request.method,
      paymentData: paymentData || undefined,
      payTo: serverWalletAddress,
      network: {
        id: chainConfig.id,
        name: chainConfig.name,
        rpc: chainConfig.rpcUrl,
      },
      price: MIDDLEWARE_PAYMENT_CONFIG.defaultPrice,
      facilitator: thirdwebFacilitator,
      routeConfig: {
        description: MIDDLEWARE_PAYMENT_CONFIG.description,
        mimeType: MIDDLEWARE_PAYMENT_CONFIG.mimeType,
        maxTimeoutSeconds: MIDDLEWARE_PAYMENT_CONFIG.maxTimeoutSeconds,
      },
    });

    // Payment successful - forward to route handler
    if (result.status === 200) {
      const response = NextResponse.next();

      // Forward payment receipt headers to route handler
      for (const [key, value] of Object.entries(result.responseHeaders)) {
        response.headers.set(key, value);
      }

      // Add custom header to indicate payment was verified by middleware
      response.headers.set('x-payment-verified', 'true');
      response.headers.set('x-payment-chain', chain);

      return response;
    }

    // Payment required (402) or other non-success status
    return NextResponse.json(
      result.responseBody || { error: 'Payment required' },
      {
        status: result.status,
        headers: result.responseHeaders,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Middleware payment error:', errorMessage);

    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Configure which paths the middleware should run on
 * Only /api/paid/* routes are protected
 */
export const config = {
  matcher: ["/api/paid/:path*"],
};

