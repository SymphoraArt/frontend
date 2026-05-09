"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, Mic } from "lucide-react";
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
      current.includes(tag) ? [] : [tag]
    ));
  };
  return (
    <>
      {/* Sticky Google-like Search Bar */}
      <div style={{ position: "sticky", top: 56, zIndex: 40, background: "rgba(247, 242, 235, 0.9)", backdropFilter: "blur(12px)", padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="w-full max-w-2xl mx-auto px-4 relative">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search for image styles, subjects, or concepts..." 
            className="w-full h-12 pl-12 pr-12 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5 text-base transition-shadow hover:shadow-md"
          />
          <Mic className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer hover:text-black transition-colors" />
        </div>
      </div>

      <main className="enki" style={{ paddingTop: 20 }}>
        {visible.length > 0 ? (
          <>
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

      <EnkiFilters active={tags} toggle={toggleTag} />
    </>
  );
}
