"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Holdings — the user's spendable balance in USD, read from on-chain USDC.
 *
 * Source of truth is the wallet's own USDC balance on Solana, read via
 * /api/billing/balance (see lib/usdc-balance). Pass the signed-in user's Solana
 * wallet address; without one we show 0.
 *
 * Every instance (navbar, settings) re-fetches when any of them calls
 * `refresh()` — it broadcasts a window event so the balance stays in sync after
 * adding funds.
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
