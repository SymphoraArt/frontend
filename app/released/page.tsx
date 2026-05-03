"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { ConnectWallet } from "@/components/ConnectWallet";
import EnkiCard from "@/components/enki/EnkiCard";
import EnkiDetailPanel from "@/components/enki/EnkiDetailPanel";
import { adaptMarketplacePrompt, type EnkiPromptCard, type MarketplacePrompt } from "@/lib/enki-redesign";
import { getUserKeyFromAccount } from "@/lib/creations";

export default function ReleasedPage() {
  const account = useActiveAccount();
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const [prompts, setPrompts] = useState<MarketplacePrompt[]>([]);
  const [opened, setOpened] = useState<EnkiPromptCard | null>(null);
  const [loading, setLoading] = useState(true);
  const cards = useMemo(() => prompts.map(adaptMarketplacePrompt), [prompts]);

  useEffect(() => {
    if (!userKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const url = new URL("/api/enki/prompts/my", window.location.origin);
        url.searchParams.set("userKey", userKey!);
        const response = await fetch(url.toString(), { credentials: "include" });
        if (!response.ok) throw new Error("Failed to load released prompts");
        const data = await response.json();
        if (!cancelled) setPrompts(data.prompts ?? []);
      } catch {
        if (!cancelled) setPrompts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [userKey]);

  if (!account) {
    return (
      <>
        <div className="enki-page-title">
          <div className="enki-page-eyebrow">Released / prompts</div>
          <h1 className="enki-page-h1 serif"><em>Connect</em><br />to manage releases.</h1>
        </div>
        <div className="enki-settings">
          <div className="enki-settings-row">
            <div>
              <div className="enki-settings-title serif">Wallet required</div>
              <div className="enki-settings-meta mono">Released prompts are loaded from your creator wallet.</div>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="enki-page-title">
        <div className="enki-page-eyebrow">Released / prompts</div>
        <h1 className="enki-page-h1 serif"><em>Released</em><br />prompt editions.</h1>
      </div>
      <div className="enki-settings">
        <div className="enki-settings-row">
          <div>
            <div className="enki-settings-title serif">{loading ? "Loading" : `${cards.length} prompts`}</div>
            <div className="enki-settings-meta mono">Backend endpoint: /api/enki/prompts/my</div>
          </div>
          <Link className="enki-btn" href="/release">Release prompt</Link>
        </div>
      </div>
      {cards.length === 0 && !loading ? (
        <div className="enki-empty">
          <div className="serif" style={{ fontSize: 28, color: "var(--ink)" }}>No released prompts yet.</div>
          <Link className="enki-btn" href="/release" style={{ marginTop: 18 }}>Create your first prompt</Link>
        </div>
      ) : (
        <div className="enki-masonry enki-desktop-feed" style={{ "--cols": 4 } as React.CSSProperties}>
          {cards.map((prompt) => (
            <EnkiCard key={prompt.id} prompt={prompt} faved={false} onOpen={setOpened} onFavorite={() => {}} />
          ))}
        </div>
      )}
      {opened && <EnkiDetailPanel prompt={opened} onClose={() => setOpened(null)} faved={false} onFavorite={() => {}} />}
    </>
  );
}
