/**
 * POST /api/payments/generation/authorize
 *
 * Turns a quoted intent into a transaction the buyer can sign. Nothing is
 * charged here and nothing is broadcast — the point of the exercise is to hold
 * a valid payment that we choose whether to use.
 *
 *   Body:   { intentId }
 *   Returns { transaction, nonceAccount, totalMicro }
 *
 * The buyer signs `transaction` in their wallet and posts it to /submit. Every
 * amount and destination comes from the stored intent; the client sends an id
 * and nothing else.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { requireAuth, checkRateLimit } from "@/lib/auth";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import { createNonceAccount } from "@/lib/payments/nonce";
import { feePayerKeypair, solanaConnection, feePayerBalance } from "@/lib/payments/solana";
import { signAsEnki } from "@/lib/payments/authorize-tx";
import {
  authorizationFor,
  exactWallet,
  findMissingAtas,
  enkiWallet,
  type IntentRow,
} from "@/lib/payments/authorize-flow";

export const runtime = "nodejs";

const schema = z.object({ intentId: z.string().uuid() });

export async function POST(req: NextRequest) {
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "payments:authorize:ip"), 120, 60_000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  let authUser;
  try {
    authUser = await requireAuth(req);
  } catch {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  if (!checkRateLimit(authUser.userId, "payments:authorize", 60, 60_000)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { data: intent } = await supabase
    .from("generation_payment_intents")
    .select(
      "id, buyer_wallet, artist_wallet, artist_amount_micro, model_cost_micro, enki_fee_micro, total_micro, nonce_account, fronted_atas, status, expires_at, authorized_at, captured_at, voided_at",
    )
    .eq("id", parsed.data.intentId)
    .ilike("buyer_wallet", authUser.walletAddress)
    .maybeSingle();

  if (!intent) return NextResponse.json({ error: "Payment intent not found" }, { status: 404 });
  if (intent.authorized_at || intent.captured_at || intent.voided_at) {
    return NextResponse.json({ error: "Payment intent is no longer open" }, { status: 409 });
  }
  // A QUOTE expires — a price from yesterday is not honourable. The
  // authorisation this produces does not; that one ends on a heartbeat.
  if (intent.expires_at && new Date(intent.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "Quote has expired" }, { status: 410 });
  }

  const buyerWallet = await exactWallet(supabase, intent.buyer_wallet);
  if (!buyerWallet) {
    return NextResponse.json({ error: "No wallet on file for this buyer" }, { status: 409 });
  }

  try {
    // An empty fee payer stops every generation, so it is worth one RPC call to
    // find out here rather than from a customer complaint.
    const balance = await feePayerBalance(solanaConnection());
    if (balance.low) {
      console.error(`[payments/authorize] fee payer is low: ${balance.lamports} lamports`);
    }

    const recipients = [intent.artist_wallet, enkiWallet()].filter(
      (r): r is string => typeof r === "string" && r.length > 0,
    );
    const missing = await findMissingAtas(recipients);

    const { address, nonce } = await createNonceAccount(solanaConnection(), feePayerKeypair());

    // Written BEFORE the transaction is built, because /submit rebuilds from
    // exactly these two values and must not recompute them.
    const frontedAtas = missing.map((owner) => ({ owner }));
    const { error: saveError } = await supabase
      .from("generation_payment_intents")
      .update({
        nonce_account: address,
        nonce_authority: feePayerKeypair().publicKey.toBase58(),
        fronted_atas: frontedAtas,
        status: "building",
        updated_at: new Date().toISOString(),
      })
      .eq("id", intent.id);
    if (saveError) throw new Error(saveError.message);

    const row: IntentRow = { ...(intent as unknown as IntentRow), nonce_account: address, fronted_atas: frontedAtas };
    const { transaction } = authorizationFor(row, buyerWallet, nonce, enkiWallet());

    return NextResponse.json({
      transaction: signAsEnki(transaction, feePayerKeypair()),
      nonceAccount: address,
      totalMicro: intent.total_micro,
    });
  } catch (e) {
    console.error("[payments/authorize] failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not prepare the payment" }, { status: 500 });
  }
}
