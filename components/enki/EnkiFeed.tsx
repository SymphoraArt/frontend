"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { getUserKeyFromAccount } from "@/lib/creations";
import { adaptMarketplacePrompt, buildFallbackPrompts, type EnkiPromptCard, type MarketplacePrompt } from "@/lib/enki-redesign";
import { ScrollArea } from "@/components/ui/scroll-area";
import EnkiCard from "@/components/enki/EnkiCard";
import EnkiDetailPanel from "@/components/enki/EnkiDetailPanel";
import EnkiFilters from "@/components/enki/EnkiFilters";

const pageSize = 24;
const fallbackCards = buildFallbackPrompts();

export default function EnkiFeed({
  mode = "all",
  query = "",
  title = <>
    <em>Discover</em> prompts<br />worth keeping.
  </>,
  eyebrow = "Curated / this week",
  hideHeader = false,
}: {
  mode?: "all" | "images" | "videos" | "favorites" | "search";
  query?: string;
  title?: React.ReactNode;
  eyebrow?: string;
  hideHeader?: boolean;
}) {
  const account = useActiveAccount();
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [opened, setOpened] = useState<EnkiPromptCard | null>(null);
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, fetchStatus, isError } = useQuery<{
    prompts: MarketplacePrompt[];
    nextCursor?: string;
  }>({
    queryKey: ["enki-redesign-marketplace", cursor, tags, userKey],
    queryFn: async () => {
      const url = new URL("/api/enki/prompts/marketplace", window.location.origin);
      url.searchParams.set("limit", String(pageSize));
      if (cursor) url.searchParams.set("cursor", cursor);
      if (tags[0]) url.searchParams.set("category", tags[0]);
      const response = await fetch(url.toString(), { credentials: "include" });
      if (!response.ok) throw new Error(`Marketplace failed: ${response.status}`);
      return response.json();
    },
  });

  const [prompts, setPrompts] = useState<MarketplacePrompt[]>([]);
  useEffect(() => {
    if (!data?.prompts) return;
    const next = data.prompts;
    // The feed keeps already-loaded pages for the infinite scroll cursor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cursor === null) setPrompts(next);
    else {
      setPrompts((current) => {
        const seen = new Set(current.map((prompt) => prompt.id || prompt._id));
        return [...current, ...next.filter((prompt) => !seen.has(prompt.id || prompt._id))];
      });
    }
  }, [data?.prompts, cursor]);

  const cards = useMemo(() => {
    let list = prompts.length > 0 ? prompts.map(adaptMarketplacePrompt) : fallbackCards;
    if (mode === "images") list = list.filter((prompt) => !prompt.isVideo);
    if (mode === "videos") list = list.filter((prompt) => prompt.isVideo);
    if (mode === "favorites") list = prompts.length > 0 ? list.filter((prompt) => favs[prompt.id]) : list.slice(0, 4);
    if (query.trim()) {
      const needle = query.toLowerCase();
      list = list.filter((prompt) =>
        [prompt.title, prompt.description, prompt.artist.name, prompt.artist.handle, ...prompt.tags]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      );
    }
    if (tags.length) list = list.filter((prompt) => tags.every((tag) => prompt.tags.includes(tag) || prompt.description.toLowerCase().includes(tag)));
    return list;
  }, [favs, mode, prompts, query, tags]);

  const hasMore = Boolean(data?.nextCursor);
  const isLoadingMore = fetchStatus === "fetching" && cursor !== null;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoadingMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && data?.nextCursor) setCursor(data.nextCursor);
    }, { rootMargin: "800px" });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [data?.nextCursor, hasMore, isLoadingMore]);

  const toggleTag = (tag: string) => setTags((state) => state.includes(tag) ? state.filter((item) => item !== tag) : [...state, tag]);
  const toggleFav = async (id: string) => {
    setFavs((state) => ({ ...state, [id]: !state[id] }));
    try {
      await fetch(`/api/enki/prompts/${encodeURIComponent(id)}/like`, { method: "POST", credentials: "include" });
    } catch {}
  };

  return (
    <main className="enki-main" data-enki-route="feed">
      {!hideHeader && (
        <>
          <div className="enki-page-title">
            <div className="enki-page-eyebrow">{eyebrow}</div>
            <h1 className="enki-page-h1 serif">{title}</h1>
          </div>
          <div className="enki-mobile-tabs">
            <Link href="/" className={mode === "all" ? "active" : ""}>All <span>{prompts.length}</span></Link>
            <Link href="/images" className={mode === "images" ? "active" : ""}>Images <span>{prompts.filter((p) => !adaptMarketplacePrompt(p).isVideo).length}</span></Link>
            <Link href="/videos" className={mode === "videos" ? "active" : ""}>Videos <span>{prompts.filter((p) => adaptMarketplacePrompt(p).isVideo).length}</span></Link>
          </div>
        </>
      )}
      <EnkiFilters active={tags} toggle={toggleTag} />
      {isError && prompts.length === 0 && (
        <div className="enki-live-note mono">Live marketplace is unavailable, showing the redesign reference set.</div>
      )}
      {cards.length === 0 ? (
        <div className="enki-empty">
          <div className="serif" style={{ fontSize: 28, color: "var(--ink)" }}>No prompts found.</div>
          <div style={{ marginTop: 8 }}>Try another tag or release a prompt.</div>
        </div>
      ) : (
        <>
          <div className="enki-masonry enki-desktop-feed" style={{ "--cols": 4 } as React.CSSProperties}>
            {cards.map((prompt) => (
              <EnkiCard key={prompt.id} prompt={prompt} faved={Boolean(favs[prompt.id])} onOpen={setOpened} onFavorite={toggleFav} />
            ))}
          </div>
          <div className="enki-mobile-feed">
            <div>
              {cards.filter((_, index) => index % 2 === 0).map((prompt) => (
                <EnkiCard key={prompt.id} prompt={prompt} faved={Boolean(favs[prompt.id])} onOpen={setOpened} onFavorite={toggleFav} />
              ))}
            </div>
            <div className="enki-mobile-feed-offset">
              {cards.filter((_, index) => index % 2 === 1).map((prompt) => (
                <EnkiCard key={prompt.id} prompt={prompt} faved={Boolean(favs[prompt.id])} onOpen={setOpened} onFavorite={toggleFav} />
              ))}
            </div>
          </div>
          <div ref={sentinelRef} className="h-10" />
          <div className="w-full py-4 flex items-center justify-center text-sm" style={{ color: "var(--ink-3)" }}>
            {isLoading && prompts.length === 0 ? "Loading live prompts..." : isLoadingMore ? "Loading more..." : hasMore ? "Scroll to load more..." : "You're all caught up."}
          </div>
        </>
      )}
      {opened && <EnkiDetailPanel prompt={opened} onClose={() => setOpened(null)} faved={Boolean(favs[opened.id])} onFavorite={toggleFav} />}
    </main>
  );
}
