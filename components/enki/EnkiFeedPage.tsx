"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EnkiCard from "@/components/enki/EnkiCard";
import EnkiDetailPanel from "@/components/enki/EnkiDetailPanel";
import EnkiFilters from "@/components/enki/EnkiFilters";
import EnkiQuickCreate from "@/components/enki/EnkiQuickCreate";
import EnkiFeaturedCarousel from "@/components/enki/EnkiFeaturedCarousel";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";
import {
  getFallbackEnkiPrompts,
  mapMarketplacePromptToEnkiPrompt,
} from "@/lib/enkiPromptAdapter";

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
      if (typeof window !== "undefined") {
        localStorage.setItem("enki:favorites", JSON.stringify(next));
      }
      return next;
    });
  };

  return { favs, toggleFav };
}

export default function EnkiFeedPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [open, setOpen] = useState<EnkiPrompt | null>(null);
  const { favs, toggleFav } = useLocalFavorites();

  const { data, isError } = useQuery({
    queryKey: ["/api/marketplace/prompts", "home"],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "30", sortBy: "trending" });
      const res = await fetch(`/api/marketplace/prompts?${params.toString()}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load marketplace prompts");
      return res.json();
    },
    staleTime: 60_000,
  });

  const prompts = useMemo<EnkiPrompt[]>(() => {
    const live = Array.isArray(data?.prompts)
      ? data.prompts.map((item: unknown, index: number) => mapMarketplacePromptToEnkiPrompt(item, index))
      : [];
    return live.length && !isError ? live : getFallbackEnkiPrompts(24);
  }, [data, isError]);

  const visible = useMemo<EnkiPrompt[]>(() => {
    if (!tags.length) return prompts;
    return prompts.filter((prompt) => tags.every((tag) => prompt.tags.includes(tag)));
  }, [prompts, tags]);

  const toggleTag = (tag: string) => {
    setTags((current) => (
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    ));
  };
  return (
    <>
      <main className="enki">
        {visible.length > 0 ? (
          <>
            <EnkiFeaturedCarousel prompts={visible.slice(0, 5)} />
            <EnkiFilters active={tags} toggle={toggleTag} />
            <section className="enki-masonry">
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
          </>
        ) : (
          <section className="enki-empty-state">
            <div className="enki-account-card">
              <div className="serif" style={{ fontSize: 28, marginBottom: 8 }}>No prompts here yet.</div>
              <p style={{ margin: 0, color: "var(--enki-ink-2)" }}>
                Adjust your filters to widen the results.
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
    </>
  );
}
