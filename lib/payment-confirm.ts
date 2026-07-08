/**
 * Lightweight global subject for Turnkey payment confirmation.
 *
 * Turnkey email wallets sign server-side via /api/turnkey/sign-transaction —
 * there is no extension popup, so the user has no native "approve / reject"
 * step. We add an in-app confirmation modal that the payment hook awaits
 * before actually triggering the signing API call.
 *
 * Pattern: FIFO queue, one request presented at a time. The hook calls
 * `requestPaymentConfirm` which returns a promise. The mounted modal
 * subscribes and renders the front of the queue. User action (confirm /
 * cancel / dismiss) calls `resolvePaymentConfirm`, which fulfils that
 * request's promise and presents the next one — concurrent flows (batch
 * generation fires one payment per card) each get their own genuine
 * approve/cancel instead of being force-cancelled by the newest request.
 */

export interface PaymentConfirmRequest {
  /** Human-readable amount, e.g. "0.10". */
  amount: string;
  /** Asset name shown next to the amount, e.g. "USDC". */
  asset: string;
  /** Recipient: full base58 address (modal truncates) or a human-readable
   *  label containing spaces (rendered as-is). */
  to: string;
  /** Optional purpose label, e.g. "Generate 2K image". */
  description?: string;
  /** Network label shown for transparency, e.g. "Solana devnet". */
  network?: string;
}

export interface ActivePaymentConfirm extends PaymentConfirmRequest {
  /** Monotonic id of this request — pass it to resolvePaymentConfirm so a
   *  stale click (double-click racing the queue advancing) can never
   *  approve/cancel the NEXT request sight-unseen. */
  id: number;
}

interface ActiveRequest extends ActivePaymentConfirm {
  resolve: (ok: boolean) => void;
}

let nextRequestId = 1;
const queue: ActiveRequest[] = [];
let activeRequest: ActiveRequest | null = null;
let cachedSnapshot: ActivePaymentConfirm | null = null;
let cachedSource: ActiveRequest | null = null;
const listeners = new Set<() => void>();

export function getActivePaymentConfirm(): ActivePaymentConfirm | null {
  // useSyncExternalStore compares snapshots by reference, so return the same
  // object until activeRequest actually changes — otherwise React loops.
  if (!activeRequest) {
    cachedSnapshot = null;
    cachedSource = null;
    return null;
  }
  if (activeRequest !== cachedSource) {
    const { resolve: _resolve, ...rest } = activeRequest;
    void _resolve;
    cachedSnapshot = rest;
    cachedSource = activeRequest;
  }
  return cachedSnapshot;
}

export function subscribePaymentConfirm(fn: () => void): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

function emit() {
  listeners.forEach((fn) => fn());
}

export function requestPaymentConfirm(req: PaymentConfirmRequest): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    queue.push({ ...req, id: nextRequestId++, resolve });
    if (queue.length === 1) {
      activeRequest = queue[0];
      emit();
    }
  });
}

export function resolvePaymentConfirm(ok: boolean, id?: number): void {
  // A stale click targeting an already-resolved request must fall through
  // harmlessly instead of deciding for the next request in the queue.
  if (id !== undefined && queue[0]?.id !== id) return;
  const current = queue.shift();
  if (!current) return;
  activeRequest = queue[0] ?? null;
  emit();
  current.resolve(ok);
}
