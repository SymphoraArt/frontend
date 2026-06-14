"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { getStripe, hasStripeConfigured } from "@/lib/stripe-client";
import { useToast } from "@/hooks/use-toast";
import { refreshHoldings } from "@/hooks/useHoldings";

export type FiatMethod = "stripe" | "paypal";

interface FiatCheckoutProps {
  amount: string;
  recipient: string | null;
  method: FiatMethod;
  onClose: () => void;
  onSuccess: (amount: string) => void;
}

const METHOD_LABEL: Record<FiatMethod, string> = {
  stripe: "Stripe",
  paypal: "PayPal",
};

/**
 * Pure-dollars checkout. Charges plain USD; the user never sees crypto/USDC.
 * "Stripe" opens the card/standard payment element; "PayPal" requests PayPal
 * (a redirect-based method). On a successful charge the balance is credited via
 * /api/billing/confirm (the server re-verifies with Stripe).
 *
 * PayPal redirects away and back to /settings?tab=billing, where BillingPanel
 * finalizes the credit on return.
 */
export default function FiatCheckout(props: FiatCheckoutProps) {
  const { amount, recipient, method, onClose } = props;
  const { toast } = useToast();
  const stripePromise = useMemo(() => getStripe(), []);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [newBalance, setNewBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!hasStripeConfigured()) {
      setError("Payments aren't switched on yet. Add your Stripe keys to enable Stripe and PayPal.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/billing/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, recipient, method }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not start payment.");
        if (!cancelled) setClientSecret(data.clientSecret);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not start payment.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [amount, recipient, method]);

  // Card path stays in-page and reports success here; PayPal redirects away and
  // is finalized by BillingPanel on return.
  const handlePaid = async () => {
    setDone(true);
    const intentId = clientSecret ? clientSecret.split("_secret")[0] : "";
    try {
      const res = await fetch("/api/billing/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: intentId, address: recipient }),
      });
      const data = await res.json();
      if (res.ok && typeof data.balance === "number") setNewBalance(data.balance);
    } catch {
      /* payment still succeeded with Stripe; webhook will reconcile */
    } finally {
      refreshHoldings();
    }
    toast({ title: `$${Number(amount).toFixed(2)} added`, description: "Your balance is updated." });
  };

  return (
    <div className="set-pay-overlay" onClick={onClose}>
      <div className="set-pay-card set-pay-card--fiat" onClick={(e) => e.stopPropagation()}>
        <button className="set-pay-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        {done ? (
          <div className="set-fiat-success">
            <div className="set-fiat-success-icon"><CheckCircle2 size={40} /></div>
            <div className="set-fiat-success-title">${Number(amount).toFixed(2)} added</div>
            {newBalance !== null && (
              <div className="set-fiat-success-sub">New balance ${newBalance.toFixed(2)}</div>
            )}
            <button
              type="button"
              className="set-btn set-btn-dark"
              style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="set-fiat-head">
              <div className="set-fiat-amount">${Number(amount).toFixed(2)}</div>
              <div className="set-fiat-sub">Add to your balance with {METHOD_LABEL[method]}</div>
            </div>

            {error && <div className="set-fiat-error">{error}</div>}

            {!error && !clientSecret && (
              <div className="set-fiat-loading">
                <Loader2 size={18} className="set-spin" /> Preparing secure checkout…
              </div>
            )}

            {!error && clientSecret && stripePromise && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance: { theme: "stripe" } }}
              >
                <CheckoutForm amount={amount} onSuccess={handlePaid} />
              </Elements>
            )}

            <p className="set-fiat-foot">
              <ShieldCheck size={12} /> Secured payment · charged in USD
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function CheckoutForm({ amount, onSuccess }: { amount: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const pay = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    // return_url is only used by redirect methods (e.g. PayPal). Card payments
    // resolve in-page via redirect: "if_required".
    const returnUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/settings?tab=billing`
        : undefined;
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: returnUrl ? { return_url: returnUrl } : undefined,
      redirect: "if_required",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Payment failed", description: error.message, variant: "destructive" });
      return;
    }
    if (paymentIntent && paymentIntent.status === "succeeded") onSuccess();
  };

  return (
    <div className="set-fiat-body">
      <PaymentElement options={{ layout: "tabs" }} />
      <button
        type="button"
        className="set-btn set-btn-dark"
        style={{ width: "100%", marginTop: 12, justifyContent: "center" }}
        disabled={!stripe || submitting}
        onClick={pay}
      >
        {submitting ? <Loader2 size={14} className="set-spin" /> : null}
        Pay ${Number(amount).toFixed(2)}
      </button>
    </div>
  );
}
