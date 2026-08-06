/**
 * Where the decision in the database meets the chain.
 *
 * lib/payments/authorization.ts decides WHETHER we may charge — a single
 * conditional UPDATE picks one winner between capture and void. This file
 * carries that decision out. The split matters: the claim is atomic and the
 * chain is not, so everything that can fail slowly happens after the winner is
 * already settled.
 *
 * ── Which way a crash should fail ───────────────────────────────────────
 * Capture claims first, broadcasts second. If we die in between, we hold a
 * captured intent with no signature on chain — recoverable, because a
 * durable-nonce transaction does not expire and nobody else can advance that
 * nonce. Void writes the row first, closes the account second: a closed
 * account with an open row would be swept forever, whereas a voided row with a
 * live nonce is caught by the next sweep. Both orders leak something; these
 * are the orders that leak a retry rather than a charge.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { Transaction } from "@solana/web3.js";
import {
  captureAuthorization,
  voidAuthorization,
  sweepAbandoned,
  type VoidReason,
} from "@/lib/payments/authorization";
import { closeNonceAccount } from "@/lib/payments/nonce";
import { feePayerKeypair, solanaConnection } from "@/lib/payments/solana";

/**
 * Charge for a delivered image.
 *
 * Call this AFTER the image is durably stored. The window between the two
 * points at losing our fee rather than the buyer's picture, and that is the
 * only direction "ordered means delivered" tolerates.
 *
 * Returns null when the claim was lost — something voided the authorisation
 * first, so the image is handed over unpaid. That is a real outcome, not an
 * error: it means the buyer waited long enough for us to give up on them.
 */
export async function captureAndBroadcast(
  supabase: SupabaseClient,
  intentId: string,
): Promise<{ signature: string } | null> {
  const held = await captureAuthorization(supabase, intentId);
  if (!held) return null;

  try {
    const tx = Transaction.from(Buffer.from(held.signedTx, "base64"));
    const connection = solanaConnection();
    const signature = await connection.sendRawTransaction(tx.serialize(), {
      // The transaction was built and checked by us; a preflight here only
      // adds a round trip to something already validated.
      skipPreflight: true,
      maxRetries: 3,
    });

    const now = new Date().toISOString();
    await supabase
      .from("generation_payment_intents")
      .update({ tx_signature: signature, fulfilled_at: now, updated_at: now })
      .eq("id", intentId);

    return { signature };
  } catch (e) {
    // The claim stands. A durable nonce does not expire, so the same signed
    // transaction can be rebroadcast later — losing the money needs someone to
    // advance the nonce, and only we can, and we no longer will.
    console.error(
      "[payments/settle] captured but not broadcast (retryable):",
      intentId,
      e instanceof Error ? e.message : e,
    );
    return null;
  }
}

/**
 * Give up on a payment: nothing was charged and now nothing can be.
 *
 * Closing the nonce account is what makes that permanent — the runtime
 * requires an initialised nonce account, and there no longer is one. It also
 * returns the rent, which is why this is cheaper than leaving the account
 * behind with an advanced nonce.
 */
export async function voidAndFlush(
  supabase: SupabaseClient,
  intentId: string,
  reason: VoidReason,
): Promise<boolean> {
  const won = await voidAuthorization(supabase, intentId, reason);
  if (!won) return false;

  if (won.nonceAccount) {
    const outcome = await closeNonceAccount(
      solanaConnection(),
      won.nonceAccount,
      feePayerKeypair(),
    );
    if (outcome === "failed") {
      // The row is already voided, so nothing will be charged either way; what
      // is stuck is the rent and an account nobody will ever use.
      console.error("[payments/settle] nonce left open after void:", won.nonceAccount);
    }
  }
  return true;
}

/**
 * Flush authorisations whose worker went quiet.
 *
 * Opportunistic — there is no scheduler on this deployment, so the generate
 * route runs a few of these before doing its own work. Under load that is
 * constant; with no load there is also nobody whose nonce could be misused.
 * Never allowed to throw: a failing sweep must not stop a paying customer's
 * generation.
 */
export async function sweepAndFlush(supabase: SupabaseClient, limit = 5): Promise<number> {
  try {
    const flushed = await sweepAbandoned(supabase, limit);
    if (flushed.length === 0) return 0;

    const connection = solanaConnection();
    const authority = feePayerKeypair();
    for (const { nonceAccount } of flushed) {
      if (!nonceAccount) continue;
      await closeNonceAccount(connection, nonceAccount, authority).catch(() => "failed");
    }
    console.warn(`[payments/settle] swept ${flushed.length} abandoned authorisation(s)`);
    return flushed.length;
  } catch (e) {
    console.warn("[payments/settle] sweep failed:", e instanceof Error ? e.message : e);
    return 0;
  }
}
