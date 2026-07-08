"use client";

/**
 * PaymentConfirmModal
 *
 * Renders the active Turnkey payment confirmation request from `lib/payment-confirm`.
 * Mount once at the app root (providers/layout). External-wallet users never see
 * this — their wallet extension popup is the confirmation step.
 */

import { useSyncExternalStore, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  getActivePaymentConfirm,
  resolvePaymentConfirm,
  subscribePaymentConfirm,
} from "@/lib/payment-confirm";

function shortAddr(addr: string): string {
  // Base58 never contains spaces — labels like "Enki (artist + platform
  // split)" render whole, real addresses still truncate.
  if (addr.length <= 12 || addr.includes(" ")) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-6)}`;
}

export function PaymentConfirmModal() {
  const active = useSyncExternalStore(
    subscribePaymentConfirm,
    getActivePaymentConfirm,
    () => null
  );

  // Every resolution carries the request id — a stale click (double-click
  // racing the queue advancing) must never decide for the NEXT request.
  const activeId = active?.id;
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && activeId !== undefined) resolvePaymentConfirm(false, activeId);
    },
    [activeId],
  );

  if (!active) return null;

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Confirm payment</DialogTitle>
          <DialogDescription className="sr-only">
            Approve sending {active.amount} {active.asset} from your Turnkey wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3 text-sm">
          <div className="rounded-lg border border-input bg-muted/40 px-3 py-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Amount</div>
            <div className="mt-1 text-xl font-semibold">
              {active.amount} <span className="text-base font-normal text-muted-foreground">{active.asset}</span>
            </div>
          </div>

          {active.description && (
            <div className="text-xs text-muted-foreground">{active.description}</div>
          )}

          <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1.5 text-xs">
            <dt className="text-muted-foreground">Recipient</dt>
            <dd className="font-mono break-all" title={active.to}>{shortAddr(active.to)}</dd>
            {active.network && (
              <>
                <dt className="text-muted-foreground">Network</dt>
                <dd>{active.network}</dd>
              </>
            )}
            <dt className="text-muted-foreground">Signed by</dt>
            <dd>Turnkey email wallet</dd>
          </dl>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            This wallet has no extension popup — confirming here authorizes the server to sign and broadcast the transaction with your Turnkey-managed key.
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => resolvePaymentConfirm(false, active.id)}
            className="flex-1 rounded-lg border border-input py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => resolvePaymentConfirm(true, active.id)}
            className="flex-1 rounded-lg bg-foreground py-2 text-xs font-semibold text-background hover:opacity-90"
          >
            Confirm &amp; pay
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
