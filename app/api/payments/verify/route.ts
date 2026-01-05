/**
 * Payment Verification API
 *
 * Verifies LUKSO blockchain payments for AI generations
 */

import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { verifyPayment, calculateTotalWithFee, isValidLUKSOAddress, isValidLYXAmount } from "@/backend/services/payment-verification";

type VerifyPaymentRequest = {
  transactionHash: string;
  expectedAmount: string;
  recipientAddress: string;
  useTestnet?: boolean;
};

export async function POST(req: Request) {
  // Skip execution during build
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      !process.env.DATABASE_URL;
  
  if (isBuildTime) {
    return NextResponse.json({ verified: false, error: 'Build time' }, { status: 503 });
  }

  try {
    const body = await req.json() as VerifyPaymentRequest;
    const { transactionHash, expectedAmount, recipientAddress, useTestnet = false } = body;

    // Validate input
    if (!transactionHash || typeof transactionHash !== 'string') {
      return NextResponse.json({
        error: 'transactionHash is required and must be a string'
      }, { status: 400 });
    }

    if (!expectedAmount || typeof expectedAmount !== 'string' || !isValidLYXAmount(expectedAmount)) {
      return NextResponse.json({
        error: 'expectedAmount is required and must be a valid LYX amount'
      }, { status: 400 });
    }

    if (!recipientAddress || typeof recipientAddress !== 'string' || !isValidLUKSOAddress(recipientAddress)) {
      return NextResponse.json({
        error: 'recipientAddress is required and must be a valid LUKSO address'
      }, { status: 400 });
    }

    console.log(`🔍 Verifying payment: ${transactionHash} for ${expectedAmount} LYX to ${recipientAddress}`);

    // Verify the payment
    const verification = await verifyPayment(
      transactionHash,
      expectedAmount,
      recipientAddress,
      useTestnet
    );

    if (verification.verified) {
      console.log(`✅ Payment verified successfully`);
      return NextResponse.json({
        verified: true,
        amountPaid: verification.amountPaid,
        from: verification.from,
        to: verification.to,
        blockNumber: verification.blockNumber,
        timestamp: verification.timestamp,
        transactionHash: verification.transactionHash
      });
    } else {
      console.log(`❌ Payment verification failed: ${verification.error}`);
      return NextResponse.json({
        verified: false,
        error: verification.error
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({
      error: 'Internal server error during payment verification',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const transactionHash = searchParams.get('transactionHash');
  const expectedAmount = searchParams.get('expectedAmount');
  const recipientAddress = searchParams.get('recipientAddress');
  const useTestnet = searchParams.get('useTestnet') === 'true';

  if (!transactionHash || !expectedAmount || !recipientAddress) {
    return NextResponse.json({
      error: 'Missing required query parameters: transactionHash, expectedAmount, recipientAddress'
    }, { status: 400 });
  }

  // Reuse POST logic
  const mockReq = {
    json: async () => ({
      transactionHash,
      expectedAmount,
      recipientAddress,
      useTestnet
    })
  } as Request;

  return POST(mockReq);
}
