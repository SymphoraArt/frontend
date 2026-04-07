"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PROMPT_CATEGORIES } from "@/lib/categories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsRight } from "lucide-react";

interface CategoriesBarProps {
  /** Currently selected category value, or undefined for "All" */
  selectedCategory?: string;
  onCategoryChange: (value: string | undefined) => void;
  /** Optional: use compact styling (e.g. on profile) */
  compact?: boolean;
  /** Optional: restrict to this subset of category values (e.g. profile only shows categories the user actually used) */
  allowedCategories?: string[];
}

const GAP = 6;
const MORE_BUTTON_WIDTH = 40;

export default function CategoriesBar({
  selectedCategory,
  onCategoryChange,
  compact,
  allowedCategories,
}: CategoriesBarProps) {
  const current = selectedCategory ?? "all";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(99);

  const orderedCategories =
    !allowedCategories || allowedCategories.length === 0
      ? PROMPT_CATEGORIES
      : PROMPT_CATEGORIES.filter((c) => allowedCategories.includes(c.value));

  const allItems = [{ value: undefined, label: "All" }, ...orderedCategories];
  const totalItems = allItems.length;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const updateVisible = () => {
      const available = container.clientWidth - MORE_BUTTON_WIDTH - GAP;
      const buttons = measure.querySelectorAll<HTMLElement>("[data-category-index]");
      if (buttons.length === 0) {
        setVisibleCount(totalItems);
        return;
      }
      let w = 0;
      let count = 0;
      for (let i = 0; i < buttons.length; i++) {
        const bw = (buttons[i] as HTMLElement).offsetWidth;
        if (w + bw + (count > 0 ? GAP : 0) <= available) {
          w += bw + (count > 0 ? GAP : 0);
          count++;
        } else break;
      }
      setVisibleCount(count);
    };

    updateVisible();
    const ro = new ResizeObserver(updateVisible);
    ro.observe(container);
    return () => ro.disconnect();
  }, [compact, totalItems, orderedCategories.length]);

  const hasOverflow = visibleCount < totalItems;
  const visibleItems = allItems.slice(0, visibleCount);
  const overflowItems = allItems.slice(visibleCount);

  return (
    <div className="w-full border-b bg-muted/30">
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-1">
        {/* Hidden row to measure button widths */}
        <div
          ref={measureRef}
          className="invisible absolute left-0 top-0 flex items-center gap-1.5 pointer-events-none"
          aria-hidden
        >
          <Button
            variant="ghost"
            size={compact ? "sm" : "default"}
            className="shrink-0 rounded-full whitespace-nowrap"
            data-category-index={0}
          >
            All
          </Button>
          {orderedCategories.map(({ value, label }, idx) => (
            <Button
              key={value}
              variant="ghost"
              size={compact ? "sm" : "default"}
              className="shrink-0 rounded-full whitespace-nowrap"
              data-category-index={idx + 1}
            >
              {label}
            </Button>
          ))}
        </div>
        <div ref={containerRef} className="min-w-0 flex-1 overflow-hidden flex items-center gap-1.5">
          {visibleItems.map((item, idx) => (
            <Button
              key={idx === 0 ? "all" : (item as { value: string }).value}
              variant={(item.value ?? "all") === current ? "default" : "ghost"}
              size={compact ? "sm" : "default"}
              className="shrink-0 rounded-full whitespace-nowrap"
              onClick={() => onCategoryChange(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        {hasOverflow && (
          <div className="shrink-0">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size={compact ? "sm" : "icon"}
                  className="shrink-0 rounded-full w-10"
                  aria-label="Weitere Kategorien"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {overflowItems.map((item) => {
                  const isSelected = (item.value ?? "all") === current;
                  return (
                    <DropdownMenuItem
                      key={item.value === undefined ? "all" : item.value}
                      onClick={() => onCategoryChange(item.value)}
                      className={isSelected ? "font-semibold" : ""}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
