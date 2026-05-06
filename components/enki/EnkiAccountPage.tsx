"use client";

import type React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

type AccountKind = "released" | "earnings" | "profile";

type EnkiAccountPageProps = {
  kind: AccountKind;
};

const COPY: Record<AccountKind, { eyebrow: string; title: React.ReactNode; lede: string }> = {
  released: {
    eyebrow: "Creator library",
    title: <><em>Released</em><br />prompts.</>,
    lede: "Your published prompt library. Live prompt ownership wiring can plug into this surface without changing the visual shell.",
  },
  earnings: {
    eyebrow: "Revenue",
    title: <><em>Earnings</em><br />ledger.</>,
    lede: "A compact creator revenue view backed by the existing earnings API when a wallet/user id is available.",
  },
  profile: {
    eyebrow: "Profile",
    title: <><em>Artist</em><br />profile.</>,
    lede: "A minimal Enki profile shell that preserves navigation until the full public profile data contract is finalized.",
  },
};

type EarningsResponse = {
  earnings?: {
    total?: number;
    thisMonth?: number;
    available?: number;
  };
};

export default function EnkiAccountPage({ kind }: EnkiAccountPageProps) {
  const copy = COPY[kind];
  const userId = "current";
  const { data: earningsData } = useQuery({
    queryKey: [`/api/users/${userId}/earnings`],
    queryFn: async (): Promise<EarningsResponse | null> => {
      const res = await fetch(`/api/users/${userId}/earnings`, { credentials: "include" });
      if (!res.ok) return null;
      return res.json();
    },
    enabled: kind === "earnings",
  });

  const earnings = earningsData?.earnings;

  return (
    <main className="enki">
      <section className="enki-page-title">
        <div className="enki-page-eyebrow">{copy.eyebrow}</div>
        <h1 className="enki-page-h1 serif">{copy.title}</h1>
        <div className="enki-page-lede">{copy.lede}</div>
      </section>

      <section className="enki-account">
        {kind === "earnings" ? (
          <div className="enki-account-grid">
            <div className="enki-account-card">
              <div className="enki-page-eyebrow">Total</div>
              <div className="serif" style={{ fontSize: 36 }}>${((earnings?.total || 0) / 100).toFixed(2)}</div>
            </div>
            <div className="enki-account-card">
              <div className="enki-page-eyebrow">This month</div>
              <div className="serif" style={{ fontSize: 36 }}>${((earnings?.thisMonth || 0) / 100).toFixed(2)}</div>
            </div>
            <div className="enki-account-card">
              <div className="enki-page-eyebrow">Available</div>
              <div className="serif" style={{ fontSize: 36 }}>${((earnings?.available || 0) / 100).toFixed(2)}</div>
            </div>
          </div>
        ) : kind === "released" ? (
          <div className="enki-account-card">
            <div className="serif" style={{ fontSize: 28, marginBottom: 8 }}>Prompt management stays linked to the editor.</div>
            <p style={{ color: "var(--enki-ink-2)" }}>
              Use the merged prompt editor for release workflow while this account surface waits for the backend-owned prompt list endpoint.
            </p>
            <Link className="enki-btn" href="/editor">Open editor</Link>
          </div>
        ) : (
          <div className="enki-account-card">
            <div className="enki-avatar" style={{ width: 64, height: 64, marginBottom: 16 }}>EA</div>
            <div className="serif" style={{ fontSize: 32 }}>Enki Artist</div>
            <p style={{ color: "var(--enki-ink-2)" }}>
              Profile data will be connected to creator APIs after the public profile contract is settled.
            </p>
            <Link className="enki-btn enki-btn-secondary" href="/settings">Settings</Link>
          </div>
        )}
      </section>
    </main>
  );
}
