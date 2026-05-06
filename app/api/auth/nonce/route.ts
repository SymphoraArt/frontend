/**
 * POST /api/auth/nonce
 * Generate a nonce for EIP-712 wallet authentication
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import crypto from "crypto";
import { z } from "zod";

const nonceRequestSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

const NONCE_EXPIRATION_MS = 5 * 60 * 1000; // 5 minutes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = nonceRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid wallet address",
          details: validation.error.issues
        },
        { status: 400 }
      );
    }

    const { walletAddress } = validation.data;
    const normalizedAddress = walletAddress.toLowerCase();

    // Generate cryptographically secure nonce
    const nonce = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + NONCE_EXPIRATION_MS);

    const supabase = getSupabaseServerClient();

    // Insert nonce into database
    const { data: nonceData, error: nonceError } = await supabase
      .from("auth_nonces")
      .insert({
        wallet_address: normalizedAddress,
        nonce,
        expires_at: expiresAt.toISOString(),
        consumed: false,
      })
      .select()
      .single();

    if (nonceError) {
      console.error("Error creating nonce:", nonceError);
      return NextResponse.json(
        { success: false, error: "Failed to generate nonce" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      nonce,
      expiresAt: expiresAt.toISOString(),
      message: "Sign this nonce with your wallet to authenticate",
    });

  } catch (error) {
    console.error("Error in nonce generation:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
