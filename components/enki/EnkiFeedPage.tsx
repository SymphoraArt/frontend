"use client";

import type React from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import EnkiCard from "@/components/enki/EnkiCard";
import EnkiDetailPanel from "@/components/enki/EnkiDetailPanel";
import EnkiFilters from "@/components/enki/EnkiFilters";
import EnkiQuickCreate from "@/components/enki/EnkiQuickCreate";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";
import {
  getFallbackEnkiPrompts,
  mapMarketplacePromptToEnkiPrompt,
} from "@/lib/enkiPromptAdapter";

type FeedKind = "home" | "images" | "videos" | "favorites" | "search";

type EnkiFeedPageProps = {
  kind: FeedKind;
  query?: string;
};

const TITLES: Record<FeedKind, { eyebrow: string; title: React.ReactNode; lede?: string }> = {
  home: { eyebrow: "Curated / this week", title: <><em>Discover</em> prompts<br />worth keeping.</> },
  images: {
    eyebrow: "Images",
    title: <><em>Stills</em>, frames &amp;<br />fixed compositions.</>,
    lede: "Hand-tuned image prompts from artists who release reference renders before they ship.",
  },
  videos: {
    eyebrow: "Video",
    title: <><em>Motion</em>, time &amp;<br />the moving frame.</>,
    lede: "Cinematic clips, looping b-roll, and slow-motion vignettes prepared as reusable prompts.",
  },
  favorites: {
    eyebrow: "Your favorites",
    title: <><em>Saved</em> prompts<br />for later.</>,
    lede: "The prompts you keep coming back to. Favorites are local until account sync is wired.",
  },
  search: {
    eyebrow: "Search",
    title: <><em>Search</em> prompts,<br />tags &amp; artists.</>,
    lede: "Results combine live marketplace data with local filtering fallback.",
  },
};

function useLocalFavorites() {
  const [favs, setFavs] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("enki:favorites") || "{}");
    } catch {
      return {};
    }
  });

  const toggleFav = (id: string) => {
    setFavs((current) => {
      const next = { ...current, [id]: !current[id] };
      if (typeof window !== "undefined") localStorage.setItem("enki:favorites", JSON.stringify(next));
      return next;
    });
  };

  return { favs, toggleFav };
}

export default function EnkiFeedPage({ kind, query = "" }: EnkiFeedPageProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [open, setOpen] = useState<EnkiPrompt | null>(null);
  const { favs, toggleFav } = useLocalFavorites();
  const title = TITLES[kind];

  const { data, isError } = useQuery({
    queryKey: ["/api/marketplace/prompts", query],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "30", sortBy: "trending" });
      if (query) params.set("query", query);
      const res = await fetch(`/api/marketplace/prompts?${params.toString()}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load marketplace prompts");
      return res.json();
    },
    staleTime: 60_000,
  });

  const prompts = useMemo(() => {
    const live = Array.isArray(data?.prompts)
      ? data.prompts.map((item: unknown, index: number) => mapMarketplacePromptToEnkiPrompt(item, index))
      : [];
    return live.length && !isError ? live : getFallbackEnkiPrompts(24);
  }, [data, isError]);

  const visible = useMemo(() => {
    let list: EnkiPrompt[] = prompts;
    if (kind === "images") list = list.filter((prompt) => !prompt.isVideo);
    if (kind === "videos") list = list.filter((prompt) => prompt.isVideo);
    if (kind === "favorites") list = list.filter((prompt) => favs[prompt.id]);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((prompt) =>
        [prompt.title, prompt.artist.name, prompt.artist.handle, ...prompt.tags].join(" ").toLowerCase().includes(q)
      );
    }
    if (tags.length) list = list.filter((prompt) => tags.every((tag) => prompt.tags.includes(tag)));
    return list;
  }, [favs, kind, prompts, query, tags]);

  const toggleTag = (tag: string) => {
    setTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  };

  return (
    <main className="enki">
      <section className="enki-page-title">
        <div className="enki-page-eyebrow">{title.eyebrow} / {visible.length} prompts</div>
        <h1 className="enki-page-h1 serif">{title.title}</h1>
        {title.lede && <div className="enki-page-lede">{title.lede}</div>}
      </section>

      <nav className="enki-tabs" aria-label="Prompt type">
        <Link href="/" className={kind === "home" ? "active" : ""}>All</Link>
        <Link href="/images" className={kind === "images" ? "active" : ""}>Images</Link>
        <Link href="/videos" className={kind === "videos" ? "active" : ""}>Videos</Link>
      </nav>

      <EnkiFilters active={tags} toggle={toggleTag} />

      {visible.length > 0 ? (
        <section className="enki-masonry" style={{ columnCount: 4 }}>
          {visible.map((prompt) => (
            <EnkiCard
              key={prompt.id}
              prompt={prompt}
              onOpen={setOpen}
              faved={Boolean(favs[prompt.id])}
              toggleFav={toggleFav}
            />
          ))}
        </section>
      ) : (
        <section className="enki-empty-state">
          <div className="enki-account-card">
            <div className="serif" style={{ fontSize: 28, marginBottom: 8 }}>No prompts here yet.</div>
            <p style={{ margin: 0, color: "var(--enki-ink-2)" }}>
              Favorite prompts from Discover or adjust your filters to widen the results.
            </p>
          </div>
        </section>
      )}

      <EnkiQuickCreate />
      {open && (
        <EnkiDetailPanel
          prompt={open}
          onClose={() => setOpen(null)}
          faved={Boolean(favs[open.id])}
          toggleFav={toggleFav}
        />
      )}
    </main>
  );
}
