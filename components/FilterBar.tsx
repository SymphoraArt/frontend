"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, SlidersHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">(
    "all"
  );
  const [sortBy, setSortBy] = useState("popular");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    // Guard against SSR
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
        setShowFilters(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setShowFilters(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mockTags = ["Cyberpunk", "Portrait", "Nature"];

  const handlePriceFilterChange = (filter: "all" | "free" | "paid") => {
    setPriceFilter(filter);
    onFilterChange?.({ priceFilter: filter, sortBy, tags: selectedTags });
  };

  const removeTag = (tag: string) => {
    const updated = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updated);
    onFilterChange?.({ priceFilter, sortBy, tags: updated });
  };

  const resetFilters = () => {
    setPriceFilter("all");
    setSortBy("popular");
    setSelectedTags([]);
    onFilterChange?.({ priceFilter: "all", sortBy: "popular", tags: [] });
  };

  return (
    <div className={`sticky top-[70px] z-40 flex justify-center pt-[10px] px-[20px] transition-transform duration-300 ${showFilters ? "translate-y-0" : "-translate-y-full"}`}>
      <div
        className="flex items-center gap-[6px] p-[5px_10px] rounded-[12px] border border-[rgba(255,255,255,0.07)] bg-[rgba(13,22,45,0.45)] shadow-[0_2px_12px_rgba(0,0,0,0.2)] backdrop-blur-[28px] backdrop-saturate-[180%]"
        style={{ WebkitBackdropFilter: "saturate(180%) blur(28px)" }}
      >
        <div className="flex flex-wrap items-center gap-[6px]">
          <div className="flex items-center justify-center pl-1 pr-2">
            <SlidersHorizontal className="h-[14px] w-[14px] text-[rgba(255,255,255,0.4)]" />
          </div>

          <div className="flex items-center gap-[2px]">
            <button
              onClick={() => handlePriceFilterChange("all")}
              className={`px-[12px] py-[4px] rounded-[20px] text-[12px] font-[500] transition-all duration-150 ${priceFilter === "all" ? "text-white bg-[rgba(99,102,241,0.20)] shadow-[0_0_0_1px_rgba(99,102,241,0.35)]" : "text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.06)]"}`}
              data-testid="button-filter-all"
            >
              All
            </button>
            <button
              onClick={() => handlePriceFilterChange("free")}
              className={`px-[12px] py-[4px] rounded-[20px] text-[12px] font-[500] transition-all duration-150 ${priceFilter === "free" ? "text-white bg-[rgba(99,102,241,0.20)] shadow-[0_0_0_1px_rgba(99,102,241,0.35)]" : "text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.06)]"}`}
              data-testid="button-filter-free"
            >
              Free
            </button>
            <button
              onClick={() => handlePriceFilterChange("paid")}
              className={`px-[12px] py-[4px] rounded-[20px] text-[12px] font-[500] transition-all duration-150 ${priceFilter === "paid" ? "text-white bg-[rgba(99,102,241,0.20)] shadow-[0_0_0_1px_rgba(99,102,241,0.35)]" : "text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.06)]"}`}
              data-testid="button-filter-paid"
            >
              Paid
            </button>
          </div>
          
          <div className="w-[1px] h-[14px] bg-[rgba(255,255,255,0.07)] mx-[2px]"></div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex items-center gap-[4px] px-[10px] py-[4px] h-auto border-none bg-transparent hover:bg-[rgba(255,255,255,0.07)] rounded-[8px] text-[rgba(255,255,255,0.45)] hover:text-[rgba(255,255,255,0.75)] text-[12px] font-medium w-auto focus:ring-0 [&>svg]:w-[9px] [&>svg]:h-[9px] [&>svg]:opacity-40 transition-all cursor-pointer" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="flex items-center gap-[4px] px-[10px] py-[4px] h-auto border-none bg-transparent hover:bg-[rgba(255,255,255,0.07)] rounded-[8px] text-[rgba(255,255,255,0.45)] hover:text-[rgba(255,255,255,0.75)] text-[12px] font-medium w-auto focus:ring-0 [&>svg]:w-[9px] [&>svg]:h-[9px] [&>svg]:opacity-40 transition-all cursor-pointer" data-testid="select-category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
              <SelectItem value="scifi">Sci-Fi</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
            </SelectContent>
          </Select>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1"
                  data-testid={`badge-tag-${tag}`}
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}

          <div className="flex-1" />

          {(priceFilter !== "all" || selectedTags.length > 0) && (
            <button
              className="ml-2 text-[11.5px] text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] transition-all flex items-center px-2 py-1 hover:bg-[rgba(255,255,255,0.05)] rounded-md"
              onClick={resetFilters}
              data-testid="button-reset-filters"
            >
              Reset All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
