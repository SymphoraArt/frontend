"use client";

import { useMemo, useState } from "react";
import { Copy, Check, QrCode, X, Wallet, ArrowDownToLine, ChevronDown, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useToast } from "@/hooks/use-toast";
import { useHoldings } from "@/hooks/useHoldings";
import SettingsSection from "@/components/settings/SettingsSection";

/**
 * Billing — add funds in plain dollars, backed by non-custodial USDC on Solana.
 *
 * "Add funds" opens MoonPay, which buys USDC on Solana and delivers it straight
 * to the user's own wallet — Enki never holds the funds (no custodial ledger,
 * no Stripe). The balance is shown in USD; expert mode reveals the on-chain
 * details.
 */
export default function BillingPanel() {
  const { address: solanaAddress } = useTurnkeyEmailAuth();
  const { toast } = useToast();
  const { balance } = useHoldings(solanaAddress);

  const [expert, setExpert] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const amountNum = Number(amount);
  const amountValid = Number.isFinite(amountNum) && amountNum > 0;

  const shortAddr = useMemo(
    () => (solanaAddress ? `${solanaAddress.slice(0, 6)}…${solanaAddress.slice(-4)}` : "—"),
    [solanaAddress]
  );

  const copyAddress = async () => {
    if (!solanaAddress) return;
    try {
      await navigator.clipboard.writeText(solanaAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast({ title: "Copy failed", description: "Copy the address manually.", variant: "destructive" });
    }
  };

  const openMoonPay = async () => {
    if (!solanaAddress) {
      toast({
        title: "Sign in first",
        description: "Log in so funds can be delivered to your wallet.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/moonpay/onramp-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: solanaAddress,
          amount: amountValid ? amountNum : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
      } else {
        toast({ title: "Couldn't open MoonPay", description: data?.error || "Try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Couldn't open MoonPay", description: "Network error — try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── 00 · Balance (USD-first, with expert mode) ── */}
      <SettingsSection num="00" title="Balance">
        <div className="set-balance-hero">
          <div className="set-balance-amount">${balance.toFixed(2)}</div>
          <div className="set-balance-label">Your spendable balance, in US dollars.</div>
        </div>

        <button
          type="button"
          className={`set-expert-toggle ${expert ? "is-open" : ""}`}
          aria-expanded={expert}
          onClick={() => setExpert((v) => !v)}
        >
          <ChevronDown size={14} />
          Expert mode
        </button>

        {expert && (
          <div className="set-expert-panel">
            <div className="set-expert-row">
              <span className="set-expert-k">Display</span>
              <span className="set-expert-v">Shown in US dollars so it stays familiar.</span>
            </div>
            <div className="set-expert-row">
              <span className="set-expert-k">Token</span>
              <span className="set-expert-v">USDC — a stablecoin pegged 1:1 to the US dollar.</span>
            </div>
            <div className="set-expert-row">
              <span className="set-expert-k">Network</span>
              <span className="set-expert-v">Solana — fast, low-fee settlement.</span>
            </div>
            <div className="set-expert-row">
              <span className="set-expert-k">Custody</span>
              <span className="set-expert-v">Non-custodial — funds live in your own wallet; Enki can't move them.</span>
            </div>
            <div className="set-expert-row">
              <span className="set-expert-k">Your wallet</span>
              <span className="set-expert-v set-expert-addr">
                <code>{shortAddr}</code>
                <button
                  type="button"
                  className="set-expert-copy"
                  onClick={copyAddress}
                  disabled={!solanaAddress}
                  aria-label="Copy wallet address"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </span>
            </div>
          </div>
        )}
      </SettingsSection>

      {/* ── 01 · Add funds (MoonPay → USDC on Solana, non-custodial) ── */}
      <SettingsSection num="01" title="Add Funds">
        <div className="set-section-desc" style={{ paddingBottom: 16 }}>
          Add dollars with card, PayPal or bank transfer. MoonPay delivers the
          funds straight to your own wallet — spent automatically when you
          generate.
        </div>

        {!solanaAddress && (
          <div className="set-fiat-error" style={{ marginBottom: 12 }}>
            Sign in so funds can be delivered to your wallet.
          </div>
        )}

        <div className="set-list-item" style={{ flexWrap: "wrap", gap: 10 }}>
          <div className="set-item-content">
            <div className="set-item-title">Amount</div>
            <div className="set-item-sub">Optional — leave blank to choose in MoonPay.</div>
          </div>
          <div className={`set-amount-wrap ${amount && !amountValid ? "is-invalid" : ""}`}>
            <span className="set-amount-prefix">$</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              className="set-amount-input"
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="set-list-item">
          <div className="set-item-icon" style={{ background: "#7d00ff", color: "#fff", fontWeight: 800, fontSize: 12 }}>
            M
          </div>
          <div className="set-item-content">
            <div className="set-item-title">Add funds with MoonPay</div>
            <div className="set-item-sub">Card, PayPal or SEPA — USDC lands in your wallet.</div>
          </div>
          <button className="set-btn set-btn-dark" onClick={openMoonPay} disabled={!solanaAddress || loading}>
            {loading ? <Loader2 size={14} className="set-spin" /> : null}
            {amountValid ? `Add $${amountNum.toFixed(2)}` : "Add funds"}
          </button>
        </div>
      </SettingsSection>

      {/* ── 02 · Deposit USDC directly (already hold some) ── */}
      {solanaAddress && (
        <SettingsSection num="02" title="Deposit USDC">
          <div className="set-section-desc" style={{ paddingBottom: 16 }}>
            Already hold USDC? Send it to your wallet on Solana. Only send USDC on
            the Solana network — other tokens or networks may be lost.
          </div>
          <div className="set-list-item">
            <div className="set-item-icon"><Wallet size={14} /></div>
            <div className="set-item-content">
              <div className="set-item-title">Your wallet address</div>
              <div className="set-item-sub" style={{ fontFamily: "monospace" }}>{shortAddr}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="set-btn set-btn-outline" onClick={copyAddress}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
              </button>
              <button className="set-btn set-btn-dark" onClick={() => setDepositOpen(true)}>
                <QrCode size={14} /> Show QR
              </button>
            </div>
          </div>
        </SettingsSection>
      )}

      {/* ── Deposit QR modal ── */}
      {depositOpen && solanaAddress && (
        <div className="set-pay-overlay" onClick={() => setDepositOpen(false)}>
          <div className="set-pay-card set-pay-card--qr" onClick={(e) => e.stopPropagation()}>
            <button className="set-pay-close" onClick={() => setDepositOpen(false)} aria-label="Close">
              <X size={16} />
            </button>
            <div className="set-qr-head">
              <ArrowDownToLine size={18} />
              <span>Deposit USDC · Solana</span>
            </div>
            <div className="set-qr-frame">
              <QRCodeSVG value={solanaAddress} size={196} level="M" includeMargin />
            </div>
            <code className="set-qr-addr">{solanaAddress}</code>
            <button className="set-btn set-btn-dark" style={{ width: "100%" }} onClick={copyAddress}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy address"}
            </button>
            <p className="set-qr-warn">Only send USDC on Solana. Sending other assets may result in permanent loss.</p>
          </div>
        </div>
      )}
    </>
  );
}
