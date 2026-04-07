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
import { X, SlidersHorizontal, UserPlus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface FilterBarProps {
  onFilterChange?: (filters: { priceFilter?: "all" | "free" | "paid"; sortBy?: string; tags?: string[]; category?: string; followersOnly?: boolean }) => void;
  /** Hide Free/Paid filter (e.g. for Showroom) */
  hidePriceFilter?: boolean;
  /** Show "Only people I follow" toggle; requires user to be logged in */
  showFollowersFilter?: boolean;
  /** Controlled category (sync with CategoriesBar); pass with onCategoryChange */
  category?: string | undefined;
  onCategoryChange?: (value: string | undefined) => void;
}

export default function FilterBar({ onFilterChange, hidePriceFilter, showFollowersFilter, category: controlledCategory, onCategoryChange }: FilterBarProps) {
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">(
    "all"
  );
  const [sortBy, setSortBy] = useState("popular");
  const [internalCategory, setInternalCategory] = useState<string>("all");
  const category = onCategoryChange ? (controlledCategory ?? "all") : internalCategory;
  const setCategory = (v: string) => {
    if (onCategoryChange) onCategoryChange(v === "all" ? undefined : v);
    else setInternalCategory(v);
  };
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [followersOnly, setFollowersOnly] = useState(false);
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
    onFilterChange?.({ priceFilter: filter, sortBy, tags: selectedTags, category: category === "all" ? undefined : category, followersOnly });
  };

  const handleFollowersOnlyChange = (v: boolean) => {
    setFollowersOnly(v);
    onFilterChange?.({ priceFilter, sortBy, tags: selectedTags, category: category === "all" ? undefined : category, followersOnly: v });
  };

  const removeTag = (tag: string) => {
    const updated = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updated);
    onFilterChange?.({ priceFilter, sortBy, tags: updated, category: category === "all" ? undefined : category, followersOnly });
  };

  const resetFilters = () => {
    setPriceFilter("all");
    setSortBy("popular");
    setCategory("all");
    setSelectedTags([]);
    setFollowersOnly(false);
    onFilterChange?.({ priceFilter: "all", sortBy: "popular", tags: [], category: undefined, followersOnly: false });
  };

  return (
    <div
      className={`sticky top-16 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
        showFilters ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Filters:
            </span>
          </div>

          {!hidePriceFilter && (
            <div className="flex gap-2">
              <Button
                variant={priceFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handlePriceFilterChange("all")}
                className={priceFilter === "all" ? "" : "text-foreground"}
                data-testid="button-filter-all"
              >
                All
              </Button>
              <Button
                variant={priceFilter === "free" ? "default" : "outline"}
                size="sm"
                onClick={() => handlePriceFilterChange("free")}
                className={priceFilter === "free" ? "" : "text-foreground"}
                data-testid="button-filter-free"
              >
                Free
              </Button>
              <Button
                variant={priceFilter === "paid" ? "default" : "outline"}
                size="sm"
                onClick={() => handlePriceFilterChange("paid")}
                className={priceFilter === "paid" ? "" : "text-foreground"}
                data-testid="button-filter-paid"
              >
                Paid
              </Button>
            </div>
          )}
          {showFollowersFilter && (
            <Button
              variant={followersOnly ? "default" : "outline"}
              size="sm"
              onClick={() => handleFollowersOnlyChange(!followersOnly)}
              className="gap-1.5"
              title="Only show people I follow"
              data-testid="button-filter-followers"
            >
              <UserPlus className="h-4 w-4" />
              Following
            </Button>
          )}

          <Select value={sortBy} onValueChange={(v) => { setSortBy(v); onFilterChange?.({ priceFilter, sortBy: v, tags: selectedTags, category: category === "all" ? undefined : category, followersOnly }); }}>
            <SelectTrigger className="w-[150px]" data-testid="select-sort">
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

          {(priceFilter !== "all" || selectedTags.length > 0 || category !== "all" || followersOnly) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              data-testid="button-reset-filters"
            >
              Reset All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
