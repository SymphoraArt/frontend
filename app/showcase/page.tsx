"use client";

import FilterBar from "@/components/FilterBar";
import PromptCard from "@/components/PromptCard";
import { useRouter } from "next/navigation";
import CompactPromptCreator from "@/components/CompactPromptCreator";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Showcase() {
  const router = useRouter();

  const PAGE_SIZE = 12;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const mockPrompts = [
    {
      id: "1",
      title: "Cyberpunk Cityscape",
      artist: "NeonArtist",
      price: 5,
      isFree: false,
      rating: 4.8,
      downloads: 1234,
      thumbnail: "",
      category: "Sci-Fi",
    },
    {
      id: "2",
      title: "Fantasy Portrait Magic",
      artist: "MagicCreator",
      price: 0,
      isFree: true,
      rating: 4.9,
      downloads: 2456,
      thumbnail: "",
      category: "Fantasy",
    },
    {
      id: "3",
      title: "Abstract Digital Dreams",
      artist: "ModernMind",
      price: 3,
      isFree: false,
      rating: 4.6,
      downloads: 876,
      thumbnail: "",
      category: "Abstract",
    },
    {
      id: "4",
      title: "Neon Samurai Warrior",
      artist: "CyberSensei",
      price: 8,
      isFree: false,
      rating: 4.9,
      downloads: 3421,
      thumbnail: "",
      category: "Sci-Fi",
    },
    {
      id: "5",
      title: "Ethereal Forest Spirit",
      artist: "NatureWhisperer",
      price: 0,
      isFree: true,
      rating: 4.7,
      downloads: 1876,
      thumbnail: "",
      category: "Fantasy",
    },
    {
      id: "6",
      title: "Geometric Void",
      artist: "ShapeShifter",
      price: 4,
      isFree: false,
      rating: 4.5,
      downloads: 654,
      thumbnail: "",
      category: "Abstract",
    },
    {
      id: "7",
      title: "Retro Futuristic Car",
      artist: "VehicleVision",
      price: 6,
      isFree: false,
      rating: 4.8,
      downloads: 2103,
      thumbnail: "",
      category: "Sci-Fi",
    },
    {
      id: "8",
      title: "Dragon's Realm",
      artist: "MythicMaster",
      price: 0,
      isFree: true,
      rating: 4.9,
      downloads: 4123,
      thumbnail: "",
      category: "Fantasy",
    },
  ];

  const visiblePrompts = useMemo(
    () => mockPrompts.slice(0, Math.min(visibleCount, mockPrompts.length)),
    [mockPrompts, visibleCount]
  );

  const hasMore = visibleCount < mockPrompts.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, mockPrompts.length));
      },
      { root: null, rootMargin: "800px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, mockPrompts.length]);

  return (
    <div className="min-h-screen bg-background pt-16">
      <FilterBar onFilterChange={(f) => console.log("Filters:", f)} />
      <main className="w-full px-2 py-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 auto-rows-[200px]">
          {visiblePrompts.map((prompt, idx) => {
            const spans =
              idx % 7 === 0
                ? "row-span-2 col-span-2"
                : idx % 5 === 0
                  ? "row-span-2"
                  : "";
            return (
              <div key={prompt.id} className={spans}>
                <PromptCard
                  {...prompt}
                  onClick={() => router.push(`/generator/${prompt.id}`)}
                />
              </div>
            );
          })}
        </div>

        <div ref={sentinelRef} className="h-10" />

        <div className="w-full py-4 flex items-center justify-center text-sm text-muted-foreground">
          {hasMore ? "Loading more..." : "You\"re all caught up."}
        </div>
      </main>
      <CompactPromptCreator />
    </div>
  );
}
