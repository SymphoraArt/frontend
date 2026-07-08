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

interface ActiveRequest extends PaymentConfirmRequest {
  resolve: (ok: boolean) => void;
}

const queue: ActiveRequest[] = [];
let activeRequest: ActiveRequest | null = null;
let cachedSnapshot: PaymentConfirmRequest | null = null;
let cachedSource: ActiveRequest | null = null;
const listeners = new Set<() => void>();

export function getActivePaymentConfirm(): PaymentConfirmRequest | null {
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
    queue.push({ ...req, resolve });
    if (queue.length === 1) {
      activeRequest = queue[0];
      emit();
    }
  });
}

export function resolvePaymentConfirm(ok: boolean): void {
  const current = queue.shift();
  if (!current) return;
  activeRequest = queue[0] ?? null;
  emit();
  current.resolve(ok);
}
