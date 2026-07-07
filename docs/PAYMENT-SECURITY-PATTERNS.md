# Payment & Claim Security Patterns (MANDATORY)

Build requirements for every endpoint that moves money (payments, claim
payouts, refunds, withdrawals). Decided by Kev, 2026-07-08. PRs touching
money paths are reviewed against this list.

## 1. Server-priced, server-built — never trust the client
The client sends only identifiers (`promptId`, `modelFamily`, "claim my
profile"). Amounts, destinations and fee splits are computed server-side
from the DB and the server builds/signs the transaction itself.
Precedent in repo: `app/api/payments/generation/quote/route.ts`
("never a price, amount, or destination" from the client).

## 2. Atomic one-shot state transitions (idempotency)
Any "pay once" action flips its state with a single conditional UPDATE:

    UPDATE ... SET claimed_at = now()
    WHERE id = $1 AND claimed_at IS NULL;   -- proceed only if 1 row updated

Never SELECT-check then UPDATE in two steps — async interleaving makes the
naive version double-pay even on a single Node instance. Applies to:
intent consumption (quoted->building), claim payouts, refunds.

## 3. Replay hardening
Layered on top of #2: one-time nonce issued when the claim/withdraw page
loads (single use, dies after the request) + 2FA confirmation before the
payout fires. Reuse the existing email-OTP primitive
(`/api/auth/turnkey/delete-token` pattern); passkeys via TurnkeySetup as
the stronger optional factor. No SMS 2FA (SIM-swap risk, cost, extra PII).

## 4. Identity before money (claims)
Claim payouts require social proof of the referenced account:
X -> OAuth login with that account. Instagram -> one-time code posted in
bio/story, verified before payout. Rate-limit verification attempts
(code-check endpoint) per profile and IP.

## 5. No withholding — ever (Kev decision, 2026-07-08)
Payouts are NEVER held back or queued for review. Once verification (#3,
#4) passes, the payout fires instantly and in full, at any amount. User
wallet withdrawals are never gated either (non-custodial by design).
Non-blocking safeguards only: an anomaly notification to the admin for
unusually large payouts (informational, fires AFTER the payout), and a
modest fee-payer/treasury hot-wallet float with auto-refill so a
compromise of everything else is bounded by the float, not by delaying
anyone's money.

## 6. Fee-payer discipline
The fee-payer key signs exclusively server-built transactions. Before
signing, validate instruction-by-instruction: real USDC mint, exact
expected recipients (artist/referrer/Enki), exact DB-derived amounts, no
injected instructions. Caps on compute-unit price and limit. Dynamic
priority fee sampled from `getRecentPrioritizationFees` (p75), never
hardcoded. Confirmation level: `confirmed` minimum, `finalized` for
withdrawals. Monitor fee-payer SOL balance + auto-refill from treasury.
