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

export function PaymentConfirmModal() {
  const active = useSyncExternalStore(
    subscribePaymentConfirm,
    getActivePaymentConfirm,
    () => null
  );

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) resolvePaymentConfirm(false);
  }, []);

  if (!active) return null;

  // Money-only framing — no chain, recipient, or "transaction" wording.
  const dollars = `$${active.amount}`;

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Confirm purchase</DialogTitle>
          <DialogDescription className="sr-only">
            Approve spending {dollars} from your balance.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3 text-sm">
          <div className="rounded-lg border border-input bg-muted/40 px-3 py-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Amount</div>
            <div className="mt-1 text-2xl font-semibold">{dollars}</div>
          </div>

          {active.description && (
            <div className="text-xs text-muted-foreground">{active.description}</div>
          )}

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            This will be deducted from your account balance.
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => resolvePaymentConfirm(false)}
            className="flex-1 rounded-lg border border-input py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => resolvePaymentConfirm(true)}
            className="flex-1 rounded-lg bg-foreground py-2 text-xs font-semibold text-background hover:opacity-90"
          >
            Confirm {dollars}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
