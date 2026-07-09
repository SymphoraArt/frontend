/**
 * POST /api/payments/generation/pay
 *
 * Server-BUILT, client-SIGNED payments (Plan A): consume an intent and move
 * the money. Every amount, destination, mint, and network is server-decided;
 * the BUYER's signature comes from their own passkey in the browser — Enki's
 * keys never sign for a user wallet.
 *
 * Two phases against one endpoint:
 *   Phase 1 — build:  { intentId }
 *     → 200 { payment: { intentId, status: "awaiting_signature" }, messageHex }
 *     The server builds the atomic tx (fee payer = Enki, buyer→artist and
 *     buyer→Enki USDC legs), fee-payer-signs it, persists the message, and
 *     returns the exact bytes the buyer must sign. Re-POSTing {intentId}
 *     while awaiting replays the same messageHex (idempotent).
 *   Phase 2 — submit: { intentId, signatureHex }
 *     signatureHex = the buyer's 64-byte ed25519 signature over messageHex,
 *     produced client-side via the user's passkey (Turnkey sub-org where the
 *     passkey is the sole root — the parent key cannot sign; see
 *     /api/auth/turnkey/passkey).
 *     → 200 "confirmed" | 202 "submitted" (re-POST {intentId} to keep polling)
 *     → 410 "failed"|"expired" terminal; 402 insufficient USDC (intent returns
 *       to "quoted"); 400 invalid signature (still awaiting — re-sign);
 *       409 concurrent request / expired signing window (retry from build).
 *
 * Flow invariants (docs/PAYMENT-SECURITY-PATTERNS.md #1/#2/#6) unchanged:
 *   1. Atomic, expiry-guarded quoted→building claim — no double-spend.
 *   2. Legs derive exclusively from the stored intent row.
 *   3. The tx signature (= fee payer's, deterministic for the stored message)
 *      plus lastValidBlockHeight are persisted BEFORE anything broadcastable
 *      exists; the buyer's signature only ever reaches a row already in the
 *      state machine ("building" with built_message → "submitted").
 *   4. Preflight (signature verification included) gates the broadcast: an
 *      invalid buyer signature bounces back to awaiting, never strands the
 *      intent.
 *
 * Requires migrations/generation_payment_intents.sql,
 * migrations/2026-07-09-plan-a-client-signing.sql (built_message column) and
 * the SOLANA_FEE_PAYER_SECRET_KEY / SOLANA_PLATFORM_WALLET env vars.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bs58 from "bs58";
import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  SendTransactionError,
  TransactionMessage,
  VersionedMessage,
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

const paySchema = z.object({
  intentId: z.string().uuid(),
  // Buyer's ed25519 signature over the built message (64 bytes hex). Present
  // only in the submit phase.
  signatureHex: z
    .string()
    .regex(/^[0-9a-fA-F]{128}$/)
    .optional(),
});

// The payment network is server-decided (env), never a request parameter.
// Falls back to SOLANA_FUND_CHAIN (the treasury top-up flow's chain) so both
// money flows settle on the same network without duplicate config.
function getPaymentChain() {
  const key = (process.env.SOLANA_PAYMENT_CHAIN ??
    process.env.SOLANA_FUND_CHAIN ??
    "solana-devnet") as ChainKey;
  if (!(key in PAYMENT_CHAINS) || !isSolanaChain(key)) {
    throw new Error(`SOLANA_PAYMENT_CHAIN is not a Solana chain key: ${key}`);
  }
  return PAYMENT_CHAINS[key] as { rpcUrl: string; usdc: string };
}

// Same formats as the treasury loader: base58 string OR solana-keygen JSON
// array. A separate keypair from the treasury on purpose — it signs every
// payment but holds only a modest SOL float for tx fees and fronted ATA rent,
// never the USDC top-up float. This is an ENKI-owned wallet: fee-payer signing
// stays server-side by design (gasless UX), it moves no user funds.
function getFeePayer(): Keypair {
  const raw = process.env.SOLANA_FEE_PAYER_SECRET_KEY?.trim();
  if (!raw) throw new Error("SOLANA_FEE_PAYER_SECRET_KEY not configured");
  try {
    return Keypair.fromSecretKey(
      raw.startsWith("[") ? Uint8Array.from(JSON.parse(raw)) : bs58.decode(raw),
    );
  } catch {
    throw new Error("SOLANA_FEE_PAYER_SECRET_KEY is malformed (expected base58 or JSON array)");
  }
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

function awaitingResponse(intentId: string, builtMessageB64: string) {
  return NextResponse.json(
    {
      payment: { intentId, status: "awaiting_signature", txSignature: null },
      messageHex: Buffer.from(builtMessageB64, "base64").toString("hex"),
    },
    { status: 200 },
  );
}

export async function POST(req: NextRequest) {
  // 60 payments/min per user (Kev, 2026-07-08); the IP cap sits above it so a
  // shared NAT is never throttled below the per-user limit.
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "payments:pay:ip"), 120, 60_000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  // 1. Resolve the session directly: the buyer wallet is the session wallet.
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
    // External adapter wallets get the same build-then-client-sign flow in a
    // follow-up; their signer plumbing differs (wallet adapter, not passkey).
    return NextResponse.json(
      { error: "Payments currently require an Enki wallet session" },
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
  const { intentId, signatureHex } = parsed.data;

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
  // SOLANA_RPC_URL overrides the chain's public endpoint (same convention as
  // the treasury flow) — public RPCs rate-limit hard.
  const connection = new Connection(process.env.SOLANA_RPC_URL || chain.rpcUrl, "confirmed");

  // 2. Load the intent scoped to the session's buyer — never by id alone.
  const { data: intent, error: intentError } = await supabase
    .from("generation_payment_intents")
    .select(
      "id, status, tx_signature, last_valid_block_height, built_message, expires_at, artist_wallet, artist_amount_micro, model_cost_micro, enki_fee_micro, total_micro",
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
    if (intent.built_message && signatureHex) {
      // Phase 2: the buyer signed the built message — attach and broadcast.
      return submitSigned(supabase, connection, feePayer, intentId, intent, signatureHex, session.wallet_address);
    }
    if (intent.built_message) {
      // Awaiting the signature — replay the same message (tab refresh, retry).
      return awaitingResponse(intentId, intent.built_message);
    }
    // A concurrent request is mid-build (or a crashed build left this state;
    // the cleanup worker sweeps stale rows — backlog). Never rebuild here.
    return NextResponse.json({ error: "Payment already in progress" }, { status: 409 });
  }
  if (signatureHex) {
    // quoted + signature = nothing was built for this signature to match.
    return NextResponse.json({ error: "No transaction awaiting signature" }, { status: 400 });
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

  try {
    // 5. Sessions store wallets lowercased (lossy for base58) — the on-chain
    //    buyer must be the case-exact address from turnkey_users.
    const { data: tkUser, error: tkError } = await supabase
      .from("turnkey_users")
      .select("sub_organization_id, wallet_address")
      .ilike("wallet_address", session.wallet_address)
      .maybeSingle();
    if (tkError || !tkUser?.wallet_address) {
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
    const tx = new VersionedTransaction(
      new TransactionMessage({
        payerKey: feePayer.publicKey,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message(),
    );
    tx.sign([feePayer]);

    // 10. Persist the built message + the fee payer's signature (= the tx
    //     signature, index 0, deterministic for these bytes) BEFORE anything
    //     leaves the server. The row stays "building" until the buyer's
    //     passkey signature arrives — nothing is broadcastable yet (the
    //     buyer's signature slot is empty), so there is no window where a
    //     broadcastable tx exists outside the state machine.
    const messageBytes = Buffer.from(tx.message.serialize());
    const persisted = await transition(supabase, intentId, ["building"], "building", {
      built_message: messageBytes.toString("base64"),
      tx_signature: bs58.encode(tx.signatures[0]),
      last_valid_block_height: lastValidBlockHeight,
    });
    if (!persisted) {
      return await fail("could not persist built transaction");
    }

    // Phase 1 done — the buyer signs these exact bytes with their passkey.
    return awaitingResponse(intentId, messageBytes.toString("base64"));
  } catch (error) {
    return await fail("payment build error", error);
  }
}

// Phase 2: attach the buyer's passkey signature to the persisted message and
// broadcast. The fee payer re-signs the identical bytes (ed25519 signing is
// deterministic — same key, same message, same signature as persisted).
async function submitSigned(
  supabase: Supabase,
  connection: Connection,
  feePayer: Keypair,
  intentId: string,
  intent: {
    built_message: string;
    tx_signature: string | null;
    last_valid_block_height: number | null;
  },
  signatureHex: string,
  sessionWallet: string,
) {
  // Resolve the case-exact buyer (same rescue as the build phase).
  const { data: tkUser } = await supabase
    .from("turnkey_users")
    .select("wallet_address")
    .ilike("wallet_address", sessionWallet)
    .maybeSingle();
  if (!tkUser?.wallet_address) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
  }
  const buyer = new PublicKey(tkUser.wallet_address);

  let tx: VersionedTransaction;
  try {
    tx = new VersionedTransaction(
      VersionedMessage.deserialize(Buffer.from(intent.built_message, "base64")),
    );
    tx.sign([feePayer]);
    // Sanity: the reconstructed fee-payer signature must match what the build
    // phase persisted — a mismatch means env/key drift, never broadcast that.
    if (intent.tx_signature && bs58.encode(tx.signatures[0]) !== intent.tx_signature) {
      console.error("[payments/pay] fee payer signature drift:", intentId);
      await transition(supabase, intentId, ["building"], "failed");
      return NextResponse.json({ error: "Payment failed" }, { status: 502 });
    }
    tx.addSignature(buyer, Buffer.from(signatureHex, "hex"));
  } catch (error) {
    console.error("[payments/pay] submit reconstruction failed:", intentId, error);
    await transition(supabase, intentId, ["building"], "failed");
    return NextResponse.json({ error: "Payment failed" }, { status: 502 });
  }

  // Enter the broadcastable state atomically — a concurrent submit loses here.
  const txSignature = bs58.encode(tx.signatures[0]);
  const entered = await transition(supabase, intentId, ["building"], "submitted");
  if (!entered) {
    return NextResponse.json({ error: "Payment already in progress" }, { status: 409 });
  }

  // Broadcast. Preflight verifies ALL signatures — an invalid buyer signature
  // is caught here and bounces back to awaiting instead of stranding the
  // intent. A transport error is ambiguous (node may be relaying) — the row
  // stays "submitted" and pollSubmitted resolves the truth on re-POST.
  try {
    await connection.sendRawTransaction(tx.serialize(), {
      skipPreflight: false,
      preflightCommitment: "confirmed",
      maxRetries: 3,
    });
  } catch (error) {
    if (error instanceof SendTransactionError) {
      const details = `${error.message} ${(error.logs ?? []).join(" ")}`;
      console.error("[payments/pay] preflight rejected:", intentId, error.message);
      if (/insufficient funds/i.test(details)) {
        // Balance raced away after the gate — back to quoted for a retry.
        await transition(supabase, intentId, ["submitted"], "quoted", {
          tx_signature: null,
          last_valid_block_height: null,
          built_message: null,
        });
        return NextResponse.json(
          { error: "Insufficient USDC balance for this payment" },
          { status: 402 },
        );
      }
      if (/signature verification/i.test(details)) {
        // Bad buyer signature — back to awaiting with the same message; the
        // client re-signs. Never terminal.
        await transition(supabase, intentId, ["submitted"], "building");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
      if (/blockhash not found|block height exceeded/i.test(details)) {
        // Signing window closed before the user confirmed — rebuild.
        await transition(supabase, intentId, ["submitted"], "quoted", {
          tx_signature: null,
          last_valid_block_height: null,
          built_message: null,
        });
        return NextResponse.json(
          { error: "Payment window expired; retry" },
          { status: 409 },
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
