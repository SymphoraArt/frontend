/**
 * Payment Calculation API
 *
 * Calculates payment amounts including platform fees
 */

import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { calculateTotalWithFee, calculatePlatformFee, convertUSDToLYX, convertLYXToUSD } from "@/backend/services/payment-verification";

type CalculatePaymentRequest = {
  amount?: string; // LYX amount
  usdAmount?: string; // USD amount (alternative to amount)
  includeFee?: boolean; // Whether to include platform fee
};

export async function POST(req: Request) {
  // Skip execution during build
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      !process.env.DATABASE_URL;
  
  if (isBuildTime) {
    return NextResponse.json({ total: '0', fee: '0', net: '0' }, { status: 503 });
  }
  try {
    const body = await req.json() as CalculatePaymentRequest;
    const { amount, usdAmount, includeFee = true } = body;

    // Validate input - must have either amount or usdAmount
    if ((!amount && !usdAmount) || (amount && usdAmount)) {
      return NextResponse.json({
        error: 'Must provide either amount (LYX) or usdAmount (USD), but not both'
      }, { status: 400 });
    }

    let lyxAmount: string;

    if (usdAmount) {
      // Convert USD to LYX
      const usdNum = parseFloat(usdAmount);
      if (isNaN(usdNum) || usdNum <= 0) {
        return NextResponse.json({
          error: 'usdAmount must be a positive number'
        }, { status: 400 });
      }

      lyxAmount = await convertUSDToLYX(usdNum);
    } else {
      // Use provided LYX amount
      const lyxNum = parseFloat(amount!);
      if (isNaN(lyxNum) || lyxNum <= 0) {
        return NextResponse.json({
          error: 'amount must be a positive number'
        }, { status: 400 });
      }

      lyxAmount = amount!;
    }

    // Calculate fees if requested
    let response: any = {
      lyxAmount: parseFloat(lyxAmount).toFixed(6),
      usdEquivalent: await convertLYXToUSD(lyxAmount)
    };

    if (includeFee) {
      const feeCalculation = calculateTotalWithFee(lyxAmount);

      response = {
        ...response,
        platformFee: parseFloat(feeCalculation.fee).toFixed(6),
        totalLYX: parseFloat(feeCalculation.total).toFixed(6),
        totalUSD: await convertLYXToUSD(feeCalculation.total),
        breakdown: {
          creatorAmount: parseFloat(lyxAmount).toFixed(6),
          platformFee: parseFloat(feeCalculation.fee).toFixed(6),
          total: parseFloat(feeCalculation.total).toFixed(6)
        }
      };
    }

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Payment calculation error:', error);
    return NextResponse.json({
      error: 'Internal server error during payment calculation',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get('amount');
  const usdAmount = searchParams.get('usdAmount');
  const includeFee = searchParams.get('includeFee') !== 'false';

  // Reuse POST logic
  const mockReq = {
    json: async () => ({
      amount,
      usdAmount,
      includeFee
    })
  } as Request;

  return POST(mockReq);
}
