"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { getUserKeyFromAccount } from "@/lib/creations";
import { adaptMarketplacePrompt, buildFallbackPrompts, type EnkiPromptCard } from "@/lib/enki-redesign";
import type { Prompt, Artist } from "../../shared/schema";
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
  eyebrow = "Curated this week",
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

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
  const displayEyebrow = eyebrow === "Curated this week" ? `${eyebrow} · ${dateStr}` : eyebrow;

  const { data: promptsData, isLoading, fetchStatus, isError } = useQuery<{
    items: Prompt[];
    nextCursor: string | null;
  }>({
    queryKey: ["/api/prompts"],
  });

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ["/api/artists"],
  });

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  useEffect(() => {
    if (!promptsData?.items) return;
    setPrompts(promptsData.items);
  }, [promptsData?.items]);

  const cards = useMemo(() => {
    let list = prompts.length > 0 ? prompts.map(p => adaptMarketplacePrompt(p, artists.find(a => a.id === p.artistId))) : fallbackCards;
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

  const hasMore = false; // Disable infinite scroll for now until fully ported
  const isLoadingMore = false;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoadingMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Infinite scroll disabled temporarily
    }, { rootMargin: "800px" });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [promptsData?.nextCursor, hasMore, isLoadingMore]);

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
            <div className="enki-page-eyebrow" style={{ textTransform: "uppercase" }}>{displayEyebrow}</div>
            <h1 className="enki-page-h1 serif">{title}</h1>
          </div>
          <div className="enki-mobile-tabs">
            <Link href="/" className={mode === "all" ? "active" : ""}>All <span>{prompts.length}</span></Link>
            <Link href="/images" className={mode === "images" ? "active" : ""}>Images <span>{prompts.filter((p) => !(p.promptType === "video")).length}</span></Link>
            <Link href="/videos" className={mode === "videos" ? "active" : ""}>Videos <span>{prompts.filter((p) => p.promptType === "video").length}</span></Link>
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
