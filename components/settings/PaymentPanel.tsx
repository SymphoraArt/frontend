"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChevronDown, Copy, Landmark, Loader2 } from "lucide-react";

import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";
import { useHoldings } from "@/hooks/useHoldings";
import { useToast } from "@/hooks/use-toast";
import { sessionAuthHeaders } from "@/lib/session-headers";
import SettingsSection from "@/components/settings/SettingsSection";
import BillingPanel from "@/components/settings/BillingPanel";

interface Earnings {
  earnings: { total: number; thisMonth: number };
  sales: { total: number };
  recentSales: { id: string; promptTitle: string; amountCents: number; createdAt: string }[];
}

// The panel remounts on every menu click — the last response is kept at
// module level so earnings paint instantly and refresh in the background.
let earningsCache: Earnings | null = null;

/**
 * Payment — the money page. Your balance up top, what you've earned below it,
 * ways to add or cash out money, and (collapsed at the bottom) the networks
 * everything runs on. Replaces the old mock "Network Holdings" Wallets tab.
 */
export default function PaymentPanel({ focusRamp = false }: { focusRamp?: boolean } = {}) {
  const account = useActiveAccount();
  const { publicKey: solanaPublicKey } = useWallet();
  const { address: turnkeyAddress } = useTurnkeyEmailAuth();
  // Session-backed Solana identity: after a reload the wallet ADAPTER is
  // disconnected (autoConnect off) but the signed session lives on — without
  // this, wallet users saw "Sign in to see it" although they're logged in.
  const { isAuthenticated: solanaSessionActive, walletAddress: solanaSessionAddress } = useSolanaAuth();
  const { toast } = useToast();

  const address =
    account?.address ??
    (solanaSessionActive ? solanaSessionAddress : null) ??
    solanaPublicKey?.toBase58() ??
    turnkeyAddress ??
    null;
  const { balance, ready } = useHoldings(address);

  const [earnings, setEarnings] = useState<Earnings | null>(earningsCache);
  const [rampBusy, setRampBusy] = useState<"buy" | "sell" | null>(null);

  // Balance chip in the sidebar → scroll to "Add money & cash out" and pulse
  // a heartbeat around the whole section so the eye lands on it.
  const rampRef = useRef<HTMLDivElement | null>(null);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (!focusRamp) return;
    const t = setTimeout(() => {
      rampRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setPulse(true);
    }, 180); // let the panel mount/paint first
    const off = setTimeout(() => setPulse(false), 4200);
    return () => { clearTimeout(t); clearTimeout(off); };
  }, [focusRamp]);

  useEffect(() => {
    // Session-based analytics endpoint — derived live from prompt_purchases
    // (the legacy /api/users/[id]/earnings read tables that don't exist).
    let cancelled = false;
    (async () => {
      try {
        // summary=1 → totals + recent sales only; the server skips the heavy
        // per-prompt joins the Analytics panel needs.
        const res = await fetch("/api/analytics/me?summary=1", { headers: sessionAuthHeaders() });
        if (!res.ok) return;
        const data = (await res.json()) as {
          summary: { totalCents: number; salesCount: number; month: { cents: number } };
          recentSales: Earnings["recentSales"];
        };
        if (!cancelled) {
          const next: Earnings = {
            earnings: { total: data.summary.totalCents, thisMonth: data.summary.month.cents },
            sales: { total: data.summary.salesCount },
            recentSales: data.recentSales ?? [],
          };
          earningsCache = next;
          setEarnings(next);
        }
      } catch {
        /* earnings are additive info — the panel still works without them */
      }
    })();
    return () => { cancelled = true; };
  }, [address]);

  // Coinbase Onramp/Offramp: the server mints a session token bound to the
  // user's own wallet address, we open Coinbase's hosted flow in a new tab.
  // KYC happens entirely on Coinbase's side; funds land in the user's wallet.
  const openRamp = async (side: "buy" | "sell") => {
    if (!address) {
      toast({ title: "Sign in first", description: "Log in so we know which wallet the money belongs to.", variant: "destructive" });
      return;
    }
    setRampBusy(side);
    try {
      const res = await fetch("/api/onramp/session", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
        body: JSON.stringify({ side, address }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Could not start the Coinbase flow");
      window.open(data.url, "_blank", "noopener");
    } catch (e) {
      toast({
        title: side === "buy" ? "Couldn't open Buy" : "Couldn't open Cash out",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setRampBusy(null);
    }
  };

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      toast({ title: "Address copied" });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <>
      {/* ── 01 · Balance + earnings ── */}
      <SettingsSection num="01" title="Your money">
        <div className="set-holdings-hero">
          <div className="set-holdings-label">Balance</div>
          <div className="set-holdings-amount">
            {!address ? <span>Sign in to see it</span> : ready ? <>${balance.toFixed(2)}</> : <span>Loading…</span>}
          </div>
          <div className="set-item-sub" style={{ marginTop: 8 }}>
            This is what you can spend on generations right now.
          </div>
        </div>
        <div className="set-earn-grid">
          <div className="set-earn-cell">
            <div className="set-earn-num">{earnings ? usd(earnings.earnings.total) : "—"}</div>
            <div className="set-earn-label">Earned in total</div>
          </div>
          <div className="set-earn-cell">
            <div className="set-earn-num">{earnings ? usd(earnings.earnings.thisMonth) : "—"}</div>
            <div className="set-earn-label">Earned this month</div>
          </div>
          <div className="set-earn-cell">
            <div className="set-earn-num">{earnings ? earnings.sales.total : "—"}</div>
            <div className="set-earn-label">Sales</div>
          </div>
        </div>
        {earnings && earnings.recentSales.length > 0 && (
          <div>
            {earnings.recentSales.slice(0, 3).map((s) => (
              <div key={s.id} className="set-list-item">
                <div className="set-item-content">
                  <div className="set-item-title">{s.promptTitle}</div>
                  <div className="set-item-sub">{new Date(s.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="set-earn-num" style={{ fontSize: 14 }}>{usd(s.amountCents)}</div>
              </div>
            ))}
          </div>
        )}
      </SettingsSection>

      {/* ── 02 · Add money / cash out ── */}
      <div ref={rampRef} className={pulse ? "set-heartbeat" : undefined}>
      <SettingsSection num="02" title="Add money & cash out">
        <div className="set-section-desc" style={{ paddingBottom: 16 }}>
          Adding money needs a one-time identity check (KYC). That&apos;s the law for money services,
          and it&apos;s handled by the payment provider, not by us. Your money always lands in your own wallet.
        </div>
        <div className="set-list-item">
          <div className="set-item-icon"><Landmark size={14} /></div>
          <div className="set-item-content">
            <div className="set-item-title">Add money</div>
            <div className="set-item-sub">From about $5 through Coinbase. It lands straight in your own wallet, we never hold it.</div>
          </div>
          <button className="set-btn set-btn-outline" onClick={() => openRamp("buy")} disabled={rampBusy !== null}>
            {rampBusy === "buy" ? <Loader2 size={14} className="set-spin" /> : "Buy"}
          </button>
        </div>
        <div className="set-list-item">
          <div className="set-item-icon"><Landmark size={14} /></div>
          <div className="set-item-content">
            <div className="set-item-title">Cash out</div>
            <div className="set-item-sub">Move your balance back to your bank through Coinbase.</div>
          </div>
          <button className="set-btn set-btn-outline" onClick={() => openRamp("sell")} disabled={rampBusy !== null}>
            {rampBusy === "sell" ? <Loader2 size={14} className="set-spin" /> : "Cash out"}
          </button>
        </div>
      </SettingsSection>
      </div>

      {/* ── 03 · Deposit crypto (wallet users only) ── */}
      <BillingPanel />

      {/* ── Networks (collapsed by default) ── */}
      <details className="set-section set-networks">
        <summary>
          <span><span className="set-section-num" style={{ marginRight: 12 }}>04</span>Networks</span>
          <ChevronDown size={16} className="set-chevron" />
        </summary>
        <div className="set-section-desc" style={{ paddingBottom: 12 }}>
          The blockchains your account runs on. You don&apos;t need to touch this — it&apos;s here so you can see how things work.
        </div>
        <div className="set-list-item">
          <div className="set-item-icon">◎</div>
          <div className="set-item-content">
            <div className="set-item-title">Solana <span className="set-badge-good">Active</span></div>
            <div className="set-item-sub">Payments and trophies run here.</div>
            {address && (
              <div className="set-item-sub" style={{ fontFamily: "monospace" }}>
                {address.slice(0, 6)}…{address.slice(-6)}
              </div>
            )}
          </div>
          {address && (
            <button className="set-btn set-btn-outline" onClick={copyAddress}><Copy size={12} /> Copy</button>
          )}
        </div>
      </details>
    </>
  );
}
