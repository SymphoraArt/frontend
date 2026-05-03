"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { ConnectWallet } from "@/components/ConnectWallet";

interface EarningsData {
  earnings?: { total?: number; thisMonth?: number; pending?: number; available?: number };
  sales?: { total?: number; thisMonth?: number; thisWeek?: number };
  listings?: { total?: number; active?: number; draft?: number };
  topPrompts?: Array<{ promptId: string; title: string; sales: number; revenue: number }>;
}

function money(cents?: number) {
  return `$${((cents ?? 0) / 100).toFixed(2)}`;
}

export default function EarningsPage() {
  const account = useActiveAccount();
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const address = account?.address;
    if (!address) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/users/${address}/earnings`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch earnings");
        const json = await response.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load earnings");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [account?.address]);

  if (!account) {
    return (
      <>
        <div className="enki-page-title">
          <div className="enki-page-eyebrow">Creator / earnings</div>
          <h1 className="enki-page-h1 serif"><em>Connect</em><br />to see earnings.</h1>
        </div>
        <div className="enki-settings">
          <div className="enki-settings-row">
            <div>
              <div className="enki-settings-title serif">Wallet required</div>
              <div className="enki-settings-meta mono">Earnings are pulled from /api/users/[wallet]/earnings.</div>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </>
    );
  }

  const tiles = [
    ["Total earnings", money(data?.earnings?.total), "All-time creator revenue"],
    ["Available", money(data?.earnings?.available), "Ready for withdrawal"],
    ["This month", money(data?.earnings?.thisMonth), `${data?.sales?.thisMonth ?? 0} monthly sales`],
    ["Active listings", String(data?.listings?.active ?? 0), `${data?.listings?.total ?? 0} total prompts`],
  ];

  return (
    <>
      <div className="enki-page-title">
        <div className="enki-page-eyebrow">Creator / earnings</div>
        <h1 className="enki-page-h1 serif"><em>Earnings</em><br />from released prompts.</h1>
      </div>
      {error && <div className="enki-live-note mono">{error}</div>}
      <div className="enki-account-grid">
        {tiles.map(([label, value, meta]) => (
          <div key={label} className="enki-account-tile">
            <div className="enki-account-label mono">{label}</div>
            <div>
              <div className="enki-account-value serif">{loading ? "..." : value}</div>
              <div className="enki-settings-meta mono">{meta}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="enki-settings">
        <div className="enki-settings-row">
          <div>
            <div className="enki-settings-title serif">Top prompts</div>
            <div className="enki-settings-meta mono">Backend-ranked performance</div>
          </div>
          <Link className="enki-btn enki-btn-secondary" href="/release">Release prompt</Link>
        </div>
        {(data?.topPrompts ?? []).length === 0 ? (
          <div className="enki-settings-row">
            <div>
              <div className="enki-settings-title serif">No sales yet</div>
              <div className="enki-settings-meta mono">Publish your first prompt to start earning.</div>
            </div>
            <Link className="enki-btn" href="/release">Create prompt</Link>
          </div>
        ) : (
          data!.topPrompts!.map((prompt) => (
            <div key={prompt.promptId} className="enki-settings-row">
              <div>
                <div className="enki-settings-title serif">{prompt.title}</div>
                <div className="enki-settings-meta mono">{prompt.sales} sales</div>
              </div>
              <div className="enki-account-value serif" style={{ fontSize: 34 }}>{money(prompt.revenue)}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
