"use client";

import { useEffect, useMemo, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Copy, Check, QrCode, X, Wallet, ArrowDownToLine, CreditCard, CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useToast } from "@/hooks/use-toast";
import { refreshHoldings } from "@/hooks/useHoldings";
import SettingsSection from "@/components/settings/SettingsSection";
import FiatCheckout, { type FiatMethod } from "@/components/settings/FiatCheckout";

const MIN_AMOUNT = 1;
// Testing cap: top-ups are limited to $2 and accepted as a decimal (Gleitzahl),
// e.g. $1.50. Raise this once the treasury is funded for production amounts.
const MAX_AMOUNT = 2;

/**
 * Billing — top up the user's balance in plain dollars.
 *
 * Two funding options: "Buy with Stripe" (card etc.) and "Buy with PayPal".
 * Both charge USD and credit the persisted balance; the user never sees crypto.
 * External-wallet users additionally get a "Deposit Crypto" section to send
 * USDC directly.
 */
export default function BillingPanel() {
  const account = useActiveAccount();
  const { connected: solanaConnected } = useWallet();
  const { address: turnkeyAddress } = useTurnkeyEmailAuth();
  const { toast } = useToast();

  const walletLogin = Boolean(account?.address) || solanaConnected;
  const recipient = account?.address ?? turnkeyAddress ?? null;

  const [fiatOpen, setFiatOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [amount, setAmount] = useState("1");
  const [method, setMethod] = useState<FiatMethod>("stripe");
  const [copied, setCopied] = useState(false);
  // Success popup shown after a redirect-based payment (PayPal) returns.
  const [success, setSuccess] = useState<{ amount: number; balance: number | null } | null>(null);

  const amountNum = Number(amount);
  const amountValid = Number.isFinite(amountNum) && amountNum >= MIN_AMOUNT && amountNum <= MAX_AMOUNT;

  // Finalize redirect-based payments (PayPal) when Stripe sends the user back
  // to /settings?tab=billing with the PaymentIntent in the query string.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const status = params.get("redirect_status");
    const intentId = params.get("payment_intent");
    if (status === "succeeded" && intentId) {
      (async () => {
        try {
          const res = await fetch("/api/billing/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentIntentId: intentId, address: recipient }),
          });
          const data = await res.json();
          if (!res.ok || typeof data.balance !== "number") {
            toast({
              title: "Couldn't update balance",
              description: data?.error || "Payment captured, but crediting failed. Check server logs.",
              variant: "destructive",
            });
          } else {
            refreshHoldings();
            setSuccess({
              amount: typeof data.amount === "number" ? data.amount : 0,
              balance: data.balance,
            });
            if (data.fundError) {
              toast({
                title: "Balance added — funding pending",
                description: "Your credit is saved; making it spendable for generation is still processing.",
              });
            }
          }
        } catch {
          toast({ title: "Payment received", description: "Your balance will update shortly." });
        } finally {
          // Strip the Stripe params so a refresh doesn't re-trigger.
          const url = new URL(window.location.href);
          ["redirect_status", "payment_intent", "payment_intent_client_secret"].forEach((k) =>
            url.searchParams.delete(k)
          );
          window.history.replaceState({}, "", url.toString());
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openBuy = (m: FiatMethod) => {
    if (!recipient) {
      toast({
        title: "Sign in first",
        description: "Log in with your email or wallet so the balance can be added to your account.",
        variant: "destructive",
      });
      return;
    }
    if (!amountValid) {
      toast({
        title: "Enter an amount",
        description: `Choose any amount between $${MIN_AMOUNT} and $${MAX_AMOUNT}.`,
        variant: "destructive",
      });
      return;
    }
    setMethod(m);
    setFiatOpen(true);
  };

  const copyAddress = async () => {
    if (!recipient) return;
    try {
      await navigator.clipboard.writeText(recipient);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast({ title: "Copy failed", description: "Copy the address manually.", variant: "destructive" });
    }
  };

  const shortAddr = useMemo(
    () => (recipient ? `${recipient.slice(0, 6)}…${recipient.slice(-4)}` : "—"),
    [recipient]
  );

  return (
    <>
      {/* ── 01 · Add funds ── */}
      <SettingsSection num="01" title="Add Funds">
        <div className="set-section-desc" style={{ paddingBottom: 16 }}>
          Top up your balance with Stripe or PayPal. The dollars are added to your
          balance and spent automatically when you generate or unlock prompts.
        </div>

        {!recipient && (
          <div className="set-fiat-error" style={{ marginBottom: 12 }}>
            Sign in with your email or wallet to add funds — the balance is tied to your account.
          </div>
        )}

        {/* Amount — manual entry */}
        <div className="set-list-item" style={{ flexWrap: "wrap", gap: 10 }}>
          <div className="set-item-content">
            <div className="set-item-title">Amount</div>
            <div className="set-item-sub">Type how much to add (${MIN_AMOUNT}–${MAX_AMOUNT}, decimals allowed).</div>
          </div>
          <div className={`set-amount-wrap ${amount && !amountValid ? "is-invalid" : ""}`}>
            <span className="set-amount-prefix">$</span>
            <input
              type="number"
              inputMode="decimal"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step="0.01"
              className="set-amount-input"
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Payment methods */}
        <div className="set-list-item">
          <div className="set-item-icon" style={{ background: "#635bff", color: "#fff" }}>
            <CreditCard size={14} />
          </div>
          <div className="set-item-content">
            <div className="set-item-title">Buy with Stripe</div>
            <div className="set-item-sub">Card and more — secure checkout.</div>
          </div>
          <button className="set-btn set-btn-dark" onClick={() => openBuy("stripe")} disabled={!amountValid || !recipient}>
            Buy ${(amountValid ? amountNum : 0).toFixed(2)}
          </button>
        </div>

        <div className="set-list-item">
          <div className="set-item-icon" style={{ background: "#ffc439", color: "#003087", fontWeight: 800, fontSize: 11 }}>
            P
          </div>
          <div className="set-item-content">
            <div className="set-item-title">Buy with PayPal</div>
            <div className="set-item-sub">Pay with your PayPal account.</div>
          </div>
          <button className="set-btn set-btn-outline" onClick={() => openBuy("paypal")} disabled={!amountValid || !recipient}>
            Buy ${(amountValid ? amountNum : 0).toFixed(2)}
          </button>
        </div>
      </SettingsSection>

      {/* ── 02 · Deposit crypto — wallet users only ── */}
      {walletLogin && (
        <SettingsSection num="02" title="Deposit Crypto">
          <div className="set-section-desc" style={{ paddingBottom: 16 }}>
            Already hold USDC? Send it directly to your wallet on Base. Only send
            USDC on the Base network — other tokens or networks may be lost.
          </div>
          <div className="set-list-item">
            <div className="set-item-icon"><Wallet size={14} /></div>
            <div className="set-item-content">
              <div className="set-item-title">Your wallet address</div>
              <div className="set-item-sub" style={{ fontFamily: "monospace" }}>{shortAddr}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="set-btn set-btn-outline" onClick={copyAddress} disabled={!recipient}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
              </button>
              <button className="set-btn set-btn-dark" onClick={() => setDepositOpen(true)} disabled={!recipient}>
                <QrCode size={14} /> Show QR
              </button>
            </div>
          </div>
        </SettingsSection>
      )}

      {/* ── Dollars checkout (Stripe / PayPal) ── */}
      {fiatOpen && (
        <FiatCheckout
          amount={amount}
          recipient={recipient}
          method={method}
          onClose={() => setFiatOpen(false)}
          onSuccess={() => {
            /* FiatCheckout shows its own success screen + credits holdings. */
          }}
        />
      )}

      {/* ── Success popup (after PayPal / redirect return) ── */}
      {success && (
        <div className="set-pay-overlay" onClick={() => setSuccess(null)}>
          <div className="set-pay-card set-pay-card--fiat" onClick={(e) => e.stopPropagation()}>
            <button className="set-pay-close" onClick={() => setSuccess(null)} aria-label="Close">
              <X size={16} />
            </button>
            <div className="set-fiat-success">
              <div className="set-fiat-success-icon"><CheckCircle2 size={40} /></div>
              <div className="set-fiat-success-title">
                {success.amount > 0 ? `$${success.amount.toFixed(2)} added` : "Balance loaded"}
              </div>
              {success.balance !== null && (
                <div className="set-fiat-success-sub">New balance ${success.balance.toFixed(2)}</div>
              )}
              <button
                type="button"
                className="set-btn set-btn-dark"
                style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                onClick={() => setSuccess(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Deposit QR modal ── */}
      {depositOpen && recipient && (
        <div className="set-pay-overlay" onClick={() => setDepositOpen(false)}>
          <div className="set-pay-card set-pay-card--qr" onClick={(e) => e.stopPropagation()}>
            <button className="set-pay-close" onClick={() => setDepositOpen(false)} aria-label="Close">
              <X size={16} />
            </button>
            <div className="set-qr-head">
              <ArrowDownToLine size={18} />
              <span>Deposit USDC · Base</span>
            </div>
            <div className="set-qr-frame">
              <QRCodeSVG value={recipient} size={196} level="M" includeMargin />
            </div>
            <code className="set-qr-addr">{recipient}</code>
            <button className="set-btn set-btn-dark" style={{ width: "100%" }} onClick={copyAddress}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy address"}
            </button>
            <p className="set-qr-warn">Only send USDC on Base. Sending other assets may result in permanent loss.</p>
          </div>
        </div>
      )}
    </>
  );
}
