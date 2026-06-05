"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Holdings — the user's spendable USD balance, persisted server-side.
 *
 * Source of truth is the `user_balances` table, read via /api/billing/balance
 * and credited by the Stripe confirm endpoint / webhook (see lib/billing-db).
 * Pass the signed-in user's wallet/turnkey address; without one we show 0.
 *
 * Every instance (navbar, settings, checkout) re-fetches when any of them calls
 * `refresh()` — it broadcasts a window event so the balance stays in sync after
 * a top-up.
 */
const HOLDINGS_EVENT = "enki-holdings-changed";

export function refreshHoldings() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(HOLDINGS_EVENT));
}

export function useHoldings(address?: string | null) {
  const [balance, setBalance] = useState(0);
  const [ready, setReady] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!address) {
      setBalance(0);
      setReady(true);
      return;
    }
    try {
      const res = await fetch(`/api/billing/balance?address=${encodeURIComponent(address)}`);
      const data = await res.json();
      setBalance(Number(data?.balance) || 0);
    } catch {
      /* leave previous balance on transient error */
    } finally {
      setReady(true);
    }
  }, [address]);

  useEffect(() => {
    fetchBalance();
    const onChange = () => fetchBalance();
    window.addEventListener(HOLDINGS_EVENT, onChange);
    return () => window.removeEventListener(HOLDINGS_EVENT, onChange);
  }, [fetchBalance]);

  return { balance, ready, refresh: fetchBalance };
}
