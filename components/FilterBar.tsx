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

          <Select value={sortBy} onValueChange={setSortBy}>
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

          <Select>
            <SelectTrigger className="w-[150px]" data-testid="select-category">
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
