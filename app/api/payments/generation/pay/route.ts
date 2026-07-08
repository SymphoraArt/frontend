/**
 * POST /api/payments/generation/pay
 *
 * Server-built payments (backlog #2), step 3: consume an intent and move the
 * money. The client sends ONLY the intent id — every amount, destination,
 * mint, and network is server-decided:
 *
 *   Body: { intentId: string }
 *   Success/terminal: { payment: { intentId, status, txSignature } }
 *     200 "confirmed"          — transfer landed on-chain
 *     202 "submitted"          — broadcast (or in flight); POST the same
 *                                intentId again to keep polling (idempotent)
 *     410 "failed" | "expired" — terminal; create a new intent
 *   Errors: { error } (400 adds details):
 *     402 insufficient USDC    — the intent returns to "quoted" for a retry
 *     409 another request is paying this intent right now
 *     5xx configuration / build / on-chain failures
 *
 * Flow (docs/PAYMENT-SECURITY-PATTERNS.md #1/#2/#6):
 *   1. Atomic, expiry-guarded quoted→building claim (single conditional
 *      UPDATE) — concurrent pays of the same intent can never double-spend.
 *   2. Transfer legs derive exclusively from the stored intent row
 *      (lib/payments/generation-pay), re-asserting the split invariant.
 *   3. One atomic Solana tx: buyer→artist and buyer→Enki USDC legs. The Enki
 *      fee payer signs and fronts ATA rent (buyers hold no SOL); priority fee
 *      is the capped p75 of live fees on the touched accounts, CU-bounded.
 *   4. The buyer's Turnkey wallet signs server-side (same trust model as
 *      /api/turnkey/sign-transaction, which this retires for payments).
 *      External (non-Turnkey) wallets get a build-then-client-sign variant in
 *      a follow-up — this endpoint rejects their sessions with 403.
 *   5. The tx signature (= fee payer's, known before broadcast) plus the
 *      blockhash's lastValidBlockHeight are persisted BEFORE the send: there
 *      is no window where a broadcastable tx exists without a re-pollable
 *      "submitted" row, and a dropped tx is provably failed once the chain
 *      passes that height without including it.
 *
 * Requires migrations/generation_payment_intents.sql and the
 * SOLANA_FEE_PAYER_SECRET_KEY / SOLANA_PLATFORM_WALLET env vars.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bs58 from "bs58";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { TurnkeyServerClient } from "@turnkey/sdk-server";
import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  SendTransactionError,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { checkRateLimit } from "@/lib/auth";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import { PAYMENT_CHAINS, isSolanaChain, type ChainKey } from "@/lib/payment-config";
import { paymentLegs, priorityFeeMicroLamports } from "@/lib/payments/generation-pay";

// Broadcast + confirmation polling can outlive the default function budget.
export const maxDuration = 60;

const USDC_DECIMALS = 6;
// Two idempotent ATA creates + two transferChecked + compute-budget ixs stay
// well under this; the bound caps what a runaway priority fee could cost.
const COMPUTE_UNIT_LIMIT = 120_000;
const CONFIRM_DEADLINE_MS = 40_000;
const CONFIRM_POLL_MS = 2_000;

const TURNKEY_BASE_URL = "https://api.turnkey.com";

const paySchema = z.object({
  intentId: z.string().uuid(),
});

function getTurnkeyClient(organizationId: string) {
  const apiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.TURNKEY_API_PRIVATE_KEY;
  if (!apiPublicKey || !apiPrivateKey) {
    throw new Error("Turnkey env vars not configured");
  }
  const stamper = new ApiKeyStamper({ apiPublicKey, apiPrivateKey });
  return new TurnkeyServerClient({ stamper, apiBaseUrl: TURNKEY_BASE_URL, organizationId });
}

// The payment network is server-decided (env), never a request parameter.
function getPaymentChain() {
  const key = (process.env.SOLANA_PAYMENT_CHAIN ?? "solana-devnet") as ChainKey;
  if (!(key in PAYMENT_CHAINS) || !isSolanaChain(key)) {
    throw new Error(`SOLANA_PAYMENT_CHAIN is not a Solana chain key: ${key}`);
  }
  return PAYMENT_CHAINS[key] as { rpcUrl: string; usdc: string };
}

// solana-keygen id.json format (JSON array of 64 bytes). Signs ONLY
// server-built payment transactions; holds a modest SOL float for tx fees
// and fronted ATA rent.
function getFeePayer(): Keypair {
  const raw = process.env.SOLANA_FEE_PAYER_SECRET_KEY;
  if (!raw) throw new Error("SOLANA_FEE_PAYER_SECRET_KEY not configured");
  const bytes: unknown = JSON.parse(raw);
  if (!Array.isArray(bytes) || bytes.length !== 64 || !bytes.every((b) => Number.isInteger(b))) {
    throw new Error("SOLANA_FEE_PAYER_SECRET_KEY must be a 64-byte JSON array");
  }
  return Keypair.fromSecretKey(Uint8Array.from(bytes as number[]));
}

type Supabase = ReturnType<typeof getSupabaseServerClient>;

// Single conditional UPDATE — the only way any status ever moves. Returns
// whether exactly this transition happened (see PAYMENT-SECURITY-PATTERNS #2).
async function transition(
  supabase: Supabase,
  intentId: string,
  from: string[],
  to: string,
  extra: Record<string, unknown> = {},
): Promise<boolean> {
  const { error, count } = await supabase
    .from("generation_payment_intents")
    .update({ status: to, updated_at: new Date().toISOString(), ...extra }, { count: "exact" })
    .eq("id", intentId)
    .in("status", from);
  if (error) {
    console.error(`[payments/pay] ${from.join("|")}→${to} failed:`, error.message);
    return false;
  }
  return count === 1;
}

function paymentResponse(intentId: string, status: string, txSignature: string | null, httpStatus: number) {
  return NextResponse.json({ payment: { intentId, status, txSignature } }, { status: httpStatus });
}

export async function POST(req: NextRequest) {
  // 60 payments/min per user (Kev, 2026-07-08); the IP cap sits above it so a
  // shared NAT is never throttled below the per-user limit.
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "payments:pay:ip"), 120, 60_000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  // 1. Resolve the session directly (like /api/turnkey/sign-transaction):
  //    signing needs wallet_type, which requireAuth does not surface. Only
  //    Turnkey email sessions may trigger server-side signing.
  const sessionToken = req.headers.get("X-Session-Token");
  if (!sessionToken) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  const supabase = getSupabaseServerClient();
  const { data: session, error: sessionError } = await supabase
    .from("auth_sessions")
    .select("wallet_address, wallet_type, expires_at")
    .eq("token", sessionToken)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (sessionError || !session) {
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }
  if (session.wallet_type !== "turnkey") {
    return NextResponse.json(
      { error: "Server-built payments currently require a Turnkey email wallet" },
      { status: 403 },
    );
  }

  if (!checkRateLimit(session.wallet_address, "payments:pay", 60, 60_000)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = paySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 },
    );
  }
  const { intentId } = parsed.data;

  // Config problems are server bugs, never buyer errors — fail closed before
  // touching the intent.
  let chain: { rpcUrl: string; usdc: string };
  let feePayer: Keypair;
  let enkiWallet: string;
  try {
    chain = getPaymentChain();
    feePayer = getFeePayer();
    enkiWallet = process.env.SOLANA_PLATFORM_WALLET ?? "";
    if (!enkiWallet) throw new Error("SOLANA_PLATFORM_WALLET not configured");
  } catch (error) {
    console.error("[payments/pay] configuration error:", error);
    return NextResponse.json({ error: "Payment processing not configured" }, { status: 500 });
  }
  const connection = new Connection(chain.rpcUrl, "confirmed");

  // 2. Load the intent scoped to the session's buyer — never by id alone.
  const { data: intent, error: intentError } = await supabase
    .from("generation_payment_intents")
    .select(
      "id, status, tx_signature, last_valid_block_height, expires_at, artist_wallet, artist_amount_micro, model_cost_micro, enki_fee_micro, total_micro",
    )
    .eq("id", intentId)
    .eq("buyer_wallet", session.wallet_address)
    .maybeSingle();
  if (intentError) {
    console.error("[payments/pay] intent lookup failed:", intentError.message);
    return NextResponse.json({ error: "Failed to load payment intent" }, { status: 500 });
  }
  if (!intent) {
    return NextResponse.json({ error: "Payment intent not found" }, { status: 404 });
  }

  // 3. Terminal and in-flight states replay idempotently — a client retry can
  //    never restart a payment.
  if (intent.status === "confirmed") {
    return paymentResponse(intentId, "confirmed", intent.tx_signature, 200);
  }
  if (intent.status === "submitted") {
    return pollSubmitted(
      supabase,
      connection,
      intentId,
      intent.tx_signature,
      intent.last_valid_block_height,
    );
  }
  if (intent.status === "failed" || intent.status === "expired") {
    return paymentResponse(intentId, intent.status, intent.tx_signature, 410);
  }
  if (intent.status === "building") {
    // A crashed build leaves this state behind; the cleanup worker (backlog)
    // sweeps stale rows. Never rebuild concurrently.
    return NextResponse.json({ error: "Payment already in progress" }, { status: 409 });
  }

  // 4. Atomic quoted→building claim, guarded by expiry inside the UPDATE
  //    itself — a claim can never succeed on an intent past its TTL, even if
  //    it expired between the load above and this statement.
  const { error: claimError, count: claimCount } = await supabase
    .from("generation_payment_intents")
    .update({ status: "building", updated_at: new Date().toISOString() }, { count: "exact" })
    .eq("id", intentId)
    .eq("status", "quoted")
    .gt("expires_at", new Date().toISOString());
  if (claimError) {
    console.error("[payments/pay] quoted→building failed:", claimError.message);
    return NextResponse.json({ error: "Payment failed" }, { status: 502 });
  }
  if (claimCount !== 1) {
    // Lost claim: either the TTL ran out (mark + report expired) or a
    // concurrent request is already paying (409).
    const expired = await transition(supabase, intentId, ["quoted"], "expired");
    if (expired || new Date(intent.expires_at).getTime() <= Date.now()) {
      return paymentResponse(intentId, "expired", null, 410);
    }
    return NextResponse.json({ error: "Payment already in progress" }, { status: 409 });
  }

  const fail = async (reason: string, cause?: unknown) => {
    console.error(`[payments/pay] ${reason}:`, cause ?? "");
    await transition(supabase, intentId, ["building"], "failed");
    return NextResponse.json({ error: "Payment failed" }, { status: 502 });
  };

  let txSignature: string;
  let tx: VersionedTransaction;
  try {
    // 5. Sessions store wallets lowercased (lossy for base58) — the on-chain
    //    buyer must be the case-exact address from turnkey_users.
    const { data: tkUser, error: tkError } = await supabase
      .from("turnkey_users")
      .select("sub_organization_id, wallet_address")
      .ilike("wallet_address", session.wallet_address)
      .maybeSingle();
    if (tkError || !tkUser?.sub_organization_id || !tkUser.wallet_address) {
      return await fail("turnkey user record not found", tkError?.message);
    }
    const buyer = new PublicKey(tkUser.wallet_address);
    const mint = new PublicKey(chain.usdc);
    const buyerAta = getAssociatedTokenAddressSync(mint, buyer);

    // 6. The artist address needs the same case rescue: users.wallet_address
    //    has legacy call sites that lowercase. Turnkey artists resolve via
    //    turnkey_users; for the rest, an address with no uppercase at all is
    //    a corrupted legacy row (a real base58 pubkey is all-lowercase with
    //    odds ~1e-11) — fail closed rather than pay a key nobody controls.
    let artistWallet = intent.artist_wallet;
    if (artistWallet && intent.artist_amount_micro > 0) {
      const { data: artistTk } = await supabase
        .from("turnkey_users")
        .select("wallet_address")
        .ilike("wallet_address", artistWallet)
        .maybeSingle();
      if (artistTk?.wallet_address) {
        artistWallet = artistTk.wallet_address;
      } else if (!/[A-Z]/.test(artistWallet)) {
        return await fail("artist wallet looks lowercased (legacy row), refusing to pay");
      }
    }

    // 7. Legs come exclusively from the stored row; the split invariant is
    //    re-asserted inside paymentLegs.
    const legs = paymentLegs({ ...intent, artist_wallet: artistWallet }, enkiWallet);
    const recipients = legs.map((leg) => {
      const owner = new PublicKey(leg.recipient);
      return { owner, ata: getAssociatedTokenAddressSync(mint, owner), amountMicro: leg.amountMicro };
    });

    // 8. Balance gate before the fee payer spends anything on rent. A missing
    //    ATA is a plain zero balance; any other RPC failure is not a balance
    //    verdict — release the claim instead of telling a funded buyer 402.
    let balanceMicro = BigInt(0);
    try {
      const balance = await connection.getTokenAccountBalance(buyerAta);
      balanceMicro = BigInt(balance.value.amount);
    } catch (error) {
      if (!/could not find account/i.test(error instanceof Error ? error.message : "")) {
        console.error("[payments/pay] balance check failed:", error);
        await transition(supabase, intentId, ["building"], "quoted");
        return NextResponse.json({ error: "Payment failed" }, { status: 502 });
      }
    }
    if (balanceMicro < BigInt(intent.total_micro)) {
      await transition(supabase, intentId, ["building"], "quoted");
      return NextResponse.json(
        { error: "Insufficient USDC balance for this payment" },
        { status: 402 },
      );
    }

    // 9. Build the single atomic tx: fee payer = Enki, one transferChecked
    //    per leg. Rent is fronted only for ATAs that are actually missing —
    //    loudly, because repeated fronting for the same recipient (close-and-
    //    recreate) drains the float until the setup-fee ledger (backlog)
    //    bounds it per recipient.
    const ataInfos = await connection.getMultipleAccountsInfo(recipients.map((r) => r.ata));
    const priorityFee = priorityFeeMicroLamports(
      await connection.getRecentPrioritizationFees({
        lockedWritableAccounts: [buyerAta, ...recipients.map((r) => r.ata)],
      }),
    );
    const instructions = [ComputeBudgetProgram.setComputeUnitLimit({ units: COMPUTE_UNIT_LIMIT })];
    if (priorityFee > 0) {
      instructions.push(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: priorityFee }));
    }
    recipients.forEach((r, i) => {
      if (!ataInfos[i]) {
        console.warn("[payments/pay] fronting ATA rent for recipient:", r.owner.toBase58());
        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(feePayer.publicKey, r.ata, r.owner, mint),
        );
      }
      instructions.push(
        createTransferCheckedInstruction(buyerAta, mint, r.ata, buyer, r.amountMicro, USDC_DECIMALS),
      );
    });
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
    tx = new VersionedTransaction(
      new TransactionMessage({
        payerKey: feePayer.publicKey,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message(),
    );
    tx.sign([feePayer]);

    // 10. Buyer signature via Turnkey (ed25519 over the serialized message).
    const client = getTurnkeyClient(tkUser.sub_organization_id);
    const signed = await client.signRawPayload({
      organizationId: tkUser.sub_organization_id,
      signWith: tkUser.wallet_address,
      payload: Buffer.from(tx.message.serialize()).toString("hex"),
      encoding: "PAYLOAD_ENCODING_HEXADECIMAL",
      // Solana / ed25519 cannot pre-hash per RFC 8032 — must be NOT_APPLICABLE.
      hashFunction: "HASH_FUNCTION_NOT_APPLICABLE",
    });
    // r and s are 32-byte hex each; pad in case leading zeros were stripped,
    // but never pad a missing or non-hex component into a fake signature.
    // Don't log the raw response — a signature over an unbroadcast tx is
    // secret until we choose to broadcast it.
    const rHex = signed.r ?? "";
    const sHex = signed.s ?? "";
    if (!/^[0-9a-fA-F]{1,64}$/.test(rHex) || !/^[0-9a-fA-F]{1,64}$/.test(sHex)) {
      return await fail(
        "unexpected Turnkey signature shape",
        `r:${rHex.length} s:${sHex.length} chars`,
      );
    }
    tx.addSignature(buyer, Buffer.from(rHex.padStart(64, "0") + sHex.padStart(64, "0"), "hex"));

    // 11. Persist the signature BEFORE broadcast — it is the fee payer's
    //     (signature index 0), known since sign(). From here on the row is
    //     re-pollable; there is no window where a broadcastable tx exists
    //     without its signature in the DB.
    txSignature = bs58.encode(tx.signatures[0]);
    const persisted = await transition(supabase, intentId, ["building"], "submitted", {
      tx_signature: txSignature,
      last_valid_block_height: lastValidBlockHeight,
    });
    if (!persisted) {
      // Nothing is on the wire yet — failing here is safe.
      return await fail("could not persist tx signature before broadcast");
    }
  } catch (error) {
    return await fail("payment build/sign error", error);
  }

  // 12. Broadcast. Errors here are NOT build errors: a preflight rejection is
  //     provably un-broadcast (safe to resolve the claim), while a transport
  //     error is ambiguous — the node may already be relaying, so the row
  //     stays "submitted" and pollSubmitted resolves the truth on re-POST.
  try {
    await connection.sendRawTransaction(tx.serialize(), {
      skipPreflight: false,
      preflightCommitment: "confirmed",
      maxRetries: 3,
    });
  } catch (error) {
    if (error instanceof SendTransactionError) {
      console.error("[payments/pay] preflight rejected:", intentId, error.message);
      if (/insufficient funds/i.test(`${error.message} ${(error.logs ?? []).join(" ")}`)) {
        // Balance raced away after the gate — back to quoted for a retry.
        await transition(supabase, intentId, ["submitted"], "quoted", {
          tx_signature: null,
          last_valid_block_height: null,
        });
        return NextResponse.json(
          { error: "Insufficient USDC balance for this payment" },
          { status: 402 },
        );
      }
      await transition(supabase, intentId, ["submitted"], "failed");
      return NextResponse.json({ error: "Payment failed" }, { status: 502 });
    }
    console.error("[payments/pay] send error after signature persisted:", intentId, error);
    return paymentResponse(intentId, "submitted", txSignature, 202);
  }

  return confirmSubmitted(supabase, connection, intentId, txSignature);
}

// Poll until the tx confirms or the deadline passes. Timeout and transient
// RPC errors are NOT failure: the row stays "submitted" and the client
// re-POSTs to keep polling. Only an on-chain execution error is terminal.
async function confirmSubmitted(
  supabase: Supabase,
  connection: Connection,
  intentId: string,
  txSignature: string,
) {
  const deadline = Date.now() + CONFIRM_DEADLINE_MS;
  while (Date.now() < deadline) {
    let status;
    try {
      status = (await connection.getSignatureStatuses([txSignature])).value[0];
    } catch (error) {
      console.error("[payments/pay] confirm poll error:", intentId, error);
    }
    if (status?.err) {
      console.error("[payments/pay] tx failed on-chain:", intentId, JSON.stringify(status.err));
      await transition(supabase, intentId, ["submitted"], "failed");
      return NextResponse.json({ error: "Payment failed" }, { status: 502 });
    }
    if (
      status?.confirmationStatus === "confirmed" ||
      status?.confirmationStatus === "finalized"
    ) {
      await transition(supabase, intentId, ["submitted"], "confirmed");
      return paymentResponse(intentId, "confirmed", txSignature, 200);
    }
    await new Promise((resolve) => setTimeout(resolve, CONFIRM_POLL_MS));
  }
  return paymentResponse(intentId, "submitted", txSignature, 202);
}

// Re-poll branch for an intent already broadcast by an earlier request.
async function pollSubmitted(
  supabase: Supabase,
  connection: Connection,
  intentId: string,
  txSignature: string | null,
  lastValidBlockHeight: number | null,
) {
  if (!txSignature) {
    // Submitted without a signature should be impossible; leave it to the
    // cleanup worker rather than guessing.
    return NextResponse.json({ error: "Payment already in progress" }, { status: 409 });
  }
  let status;
  try {
    status = (
      await connection.getSignatureStatuses([txSignature], { searchTransactionHistory: true })
    ).value[0];

    // Not seen on-chain: decide dropped-vs-pending via blockhash validity.
    // Read the height FIRST, then re-check the status — any inclusion must
    // sit at a block ≤ lastValidBlockHeight, so a post-expiry null is proof
    // the tx can never land.
    if (!status && typeof lastValidBlockHeight === "number") {
      const height = await connection.getBlockHeight("confirmed");
      if (height > lastValidBlockHeight) {
        status = (
          await connection.getSignatureStatuses([txSignature], { searchTransactionHistory: true })
        ).value[0];
        if (!status) {
          console.error("[payments/pay] tx expired unincluded:", intentId, txSignature);
          await transition(supabase, intentId, ["submitted"], "failed");
          return paymentResponse(intentId, "failed", txSignature, 410);
        }
      }
    }
  } catch (error) {
    // Transient RPC trouble is not a verdict — keep the client polling.
    console.error("[payments/pay] status poll failed:", intentId, error);
    return paymentResponse(intentId, "submitted", txSignature, 202);
  }
  if (status?.err) {
    console.error("[payments/pay] tx failed on-chain:", intentId, JSON.stringify(status.err));
    await transition(supabase, intentId, ["submitted"], "failed");
    return NextResponse.json({ error: "Payment failed" }, { status: 502 });
  }
  if (
    status?.confirmationStatus === "confirmed" ||
    status?.confirmationStatus === "finalized"
  ) {
    await transition(supabase, intentId, ["submitted"], "confirmed");
    return paymentResponse(intentId, "confirmed", txSignature, 200);
  }
  return paymentResponse(intentId, "submitted", txSignature, 202);
}
