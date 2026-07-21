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
  // Which ramp providers the server has keys for; the chooser only appears
  // when there is an actual choice. Last pick is remembered per device.
  const [providers, setProviders] = useState<{ coinbase: boolean; moonpay: boolean }>({ coinbase: true, moonpay: false });
  const [chooseSide, setChooseSide] = useState<"buy" | "sell" | null>(null);
  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const res = await fetch("/api/onramp/session");
        if (!res.ok) return;
        const d = (await res.json()) as { providers?: { coinbase: boolean; moonpay: boolean } };
        if (!dead && d.providers) setProviders(d.providers);
      } catch { /* keep defaults */ }
    })();
    return () => { dead = true; };
  }, []);

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

  // On/offramp: the server builds a provider session (Coinbase token mint or
  // signed MoonPay URL) bound to the user's own wallet; we open the hosted
  // flow in a new tab. KYC is the provider's job; funds land in the wallet.
  const PROVIDER_KEY = "enki-ramp-provider";
  const lastProvider = (): "coinbase" | "moonpay" => {
    try { const v = localStorage.getItem(PROVIDER_KEY); if (v === "moonpay" || v === "coinbase") return v; } catch { /* noop */ }
    return "coinbase";
  };
  const launchRamp = async (side: "buy" | "sell", provider: "coinbase" | "moonpay") => {
    setChooseSide(null);
    setRampBusy(side);
    try { localStorage.setItem(PROVIDER_KEY, provider); } catch { /* noop */ }
    try {
      const res = await fetch("/api/onramp/session", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
        body: JSON.stringify({ side, address, provider }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Could not start the payment flow");
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
  const openRamp = (side: "buy" | "sell") => {
    if (!address) {
      toast({ title: "Sign in first", description: "Log in so we know which wallet the money belongs to.", variant: "destructive" });
      return;
    }
    // The chooser always shows both providers; unconfigured ones are greyed
    // out (same pattern as the admin whitelist's network picker) and light up
    // the moment their server keys exist.
    setChooseSide((v) => (v === side ? null : side));
  };

  // Facts a chooser needs — enough to decide at a glance, nothing more.
  const RAMPS: { id: "coinbase" | "moonpay"; name: string; buySub: string; sellSub: string }[] = [
    { id: "coinbase", name: "Coinbase", buySub: "From ~$5 · card & Apple Pay", sellSub: "To your bank account" },
    { id: "moonpay", name: "MoonPay", buySub: "From ~$20 · card, PayPal & more", sellSub: "To card, PayPal or bank" },
  ];
  const rampChooser = (side: "buy" | "sell") => {
    const last = lastProvider();
    // configured providers first (last-used leading), greyed ones at the end
    const ordered = [...RAMPS].sort((a, b) => {
      const ca = providers[a.id] ? 0 : 1, cb = providers[b.id] ? 0 : 1;
      if (ca !== cb) return ca - cb;
      return a.id === last ? -1 : b.id === last ? 1 : 0;
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "4px 0 10px 44px" }}>
        {ordered.map((r) => {
          const on = providers[r.id];
          const isLast = on && r.id === last;
          return (
            <button key={r.id} onClick={() => { if (on) void launchRamp(side, r.id); }} disabled={!on || rampBusy !== null}
              title={on ? undefined : "Coming soon"}
              style={{
                display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                cursor: on ? "pointer" : "not-allowed", opacity: on ? 1 : 0.5,
                padding: "10px 12px", borderRadius: 10, background: "transparent",
                border: "1px solid " + (isLast ? "var(--enki-ember, #c96838)" : "var(--enki-rule)"),
              }}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "var(--enki-ink)" }}>
                  {r.name}
                  {isLast && (
                    <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--enki-ember, #c96838)", background: "rgba(var(--ember-rgb, 201, 104, 56), 0.12)", borderRadius: 4, padding: "1px 6px" }}>
                      Last used
                    </span>
                  )}
                  {!on && (
                    <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--enki-ink-3)", background: "color-mix(in oklab, var(--enki-ink) 6%, transparent)", borderRadius: 4, padding: "1px 6px" }}>
                      Coming soon
                    </span>
                  )}
                </span>
                <span style={{ display: "block", fontSize: 11.5, color: "var(--enki-ink-3)", marginTop: 2 }}>
                  {side === "buy" ? r.buySub : r.sellSub}
                </span>
              </span>
              <ChevronDown size={14} style={{ transform: "rotate(-90deg)", color: "var(--enki-ink-3)" }} />
            </button>
          );
        })}
      </div>
    );
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
            <div className="set-item-sub">
              {providers.moonpay ? "Through Coinbase or MoonPay — your pick." : "From about $5 through Coinbase."} It lands straight in your own wallet, we never hold it.
            </div>
          </div>
          <button className="set-btn set-btn-outline" onClick={() => openRamp("buy")} disabled={rampBusy !== null}>
            {rampBusy === "buy" ? <Loader2 size={14} className="set-spin" /> : "Buy"}
          </button>
        </div>
        {chooseSide === "buy" && rampChooser("buy")}
        <div className="set-list-item">
          <div className="set-item-icon"><Landmark size={14} /></div>
          <div className="set-item-content">
            <div className="set-item-title">Cash out</div>
            <div className="set-item-sub">
              Move your balance back to {providers.moonpay ? "your bank — via Coinbase or MoonPay." : "your bank through Coinbase."}
            </div>
          </div>
          <button className="set-btn set-btn-outline" onClick={() => openRamp("sell")} disabled={rampBusy !== null}>
            {rampBusy === "sell" ? <Loader2 size={14} className="set-spin" /> : "Cash out"}
          </button>
        </div>
        {chooseSide === "sell" && rampChooser("sell")}
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
