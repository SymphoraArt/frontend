"use client";

import React, { useRef } from "react";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EnkiFeaturedCarousel({ prompts }: { prompts: EnkiPrompt[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  if (!prompts || prompts.length === 0) return null;

  return (
    <div className="enki-carousel-container relative w-full pt-[104px] mb-8 group">
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/20 hover:bg-black/60"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-10 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="flex-shrink-0 w-[600px] h-[340px] rounded-2xl relative overflow-hidden snap-center cursor-pointer group/card"
            onClick={() => {}}
          >
            <img
              src={prompt.art.url}
              alt={prompt.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex gap-2 mb-3">
                {prompt.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight mb-2 font-serif drop-shadow-lg">
                {prompt.title}
              </h2>
              <p className="text-white/80 line-clamp-2 max-w-[80%] drop-shadow">
                {prompt.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/20 hover:bg-black/60"
      >
        <ChevronRight size={24} />
      </button>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
