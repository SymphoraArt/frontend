"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, X, Filter, RotateCcw } from "lucide-react";

interface Category {
  id: string;
  name: string;
  promptCount: number;
  featured: boolean;
}

interface MarketplaceFiltersProps {
  filters: {
    query?: string;
    categories?: string[];
    licenseType?: string[];
    tags?: string[];
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    minSales?: number;
    sortBy?: string;
  };
  onFiltersChange: (filters: MarketplaceFiltersProps['filters']) => void;
  categories: Category[];
  popularTags: string[];
  resultCount?: number;
  isLoading?: boolean;
}

const LICENSE_TYPES = [
  { value: 'personal', label: 'Personal Use' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'exclusive', label: 'Exclusive' },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'trending', label: 'Trending' },
];

const PRICE_RANGES = [
  { label: 'Under $1', min: 0, max: 100 },
  { label: '$1 - $5', min: 100, max: 500 },
  { label: '$5 - $10', min: 500, max: 1000 },
  { label: '$10 - $25', min: 1000, max: 2500 },
  { label: '$25+', min: 2500, max: null },
];

export function MarketplaceFilters({
  filters,
  onFiltersChange,
  categories,
  popularTags,
  resultCount,
  isLoading = false
}: MarketplaceFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0,
    filters.maxPrice || 10000
  ]);

  // Update price range when filters change
  useEffect(() => {
    setPriceRange([
      filters.minPrice || 0,
      filters.maxPrice || 10000
    ]);
  }, [filters.minPrice, filters.maxPrice]);

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters };

    if (value === undefined || value === null || value === '') {
      delete newFilters[key as keyof typeof newFilters];
    } else {
      (newFilters as any)[key] = value;
    }

    onFiltersChange(newFilters);
  };

  const toggleCategory = (categoryId: string) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];

    updateFilter('categories', newCategories.length > 0 ? newCategories : undefined);
  };

  const toggleLicenseType = (licenseValue: string) => {
    const currentLicenses = filters.licenseType || [];
    const newLicenses = currentLicenses.includes(licenseValue)
      ? currentLicenses.filter(license => license !== licenseValue)
      : [...currentLicenses, licenseValue];

    updateFilter('licenseType', newLicenses.length > 0 ? newLicenses : undefined);
  };

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];

    updateFilter('tags', newTags.length > 0 ? newTags : undefined);
  };

  const applyPriceRange = (range: [number, number]) => {
    updateFilter('minPrice', range[0] > 0 ? range[0] : undefined);
    updateFilter('maxPrice', range[1] < 10000 ? range[1] : undefined);
  };

  const setPricePreset = (min: number, max: number | null) => {
    updateFilter('minPrice', min > 0 ? min : undefined);
    updateFilter('maxPrice', max ? max : undefined);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    setPriceRange([0, 10000]);
  };

  const hasActiveFilters = Object.keys(filters).some(key =>
    key !== 'sortBy' && filters[key as keyof typeof filters] !== undefined
  );

  const activeFilterCount = Object.keys(filters).filter(key =>
    key !== 'sortBy' && filters[key as keyof typeof filters] !== undefined
  ).length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}

            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </div>

        {/* Sort and Results Summary */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 flex-1">
            <Label className="text-sm font-normal">Sort by:</Label>
            <Select
              value={filters.sortBy || 'relevance'}
              onValueChange={(value) => updateFilter('sortBy', value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {resultCount !== undefined && (
            <div className="text-sm text-muted-foreground">
              {isLoading ? 'Searching...' : `${resultCount} prompts found`}
            </div>
          )}
        </div>
      </CardHeader>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories
                  .filter(cat => cat.featured)
                  .map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={filters.categories?.includes(category.id) || false}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {category.name}
                        <span className="text-muted-foreground ml-1">
                          ({category.promptCount})
                        </span>
                      </Label>
                    </div>
                  ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Price Range</Label>

              {/* Price Presets */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {PRICE_RANGES.map(range => (
                  <Button
                    key={range.label}
                    variant={filters.minPrice === range.min && filters.maxPrice === range.max ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPricePreset(range.min, range.max)}
                    className="text-xs"
                  >
                    {range.label}
                  </Button>
                ))}
              </div>

              {/* Custom Price Range */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-20 h-8"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-20 h-8"
                  />
                  <span className="text-xs text-muted-foreground">USD</span>
                </div>
              </div>
            </div>

            {/* License Type */}
            <div>
              <Label className="text-sm font-medium mb-3 block">License Type</Label>
              <div className="space-y-2">
                {LICENSE_TYPES.map(license => (
                  <div key={license.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`license-${license.value}`}
                      checked={filters.licenseType?.includes(license.value) || false}
                      onCheckedChange={() => toggleLicenseType(license.value)}
                    />
                    <Label
                      htmlFor={`license-${license.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {license.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Popular Tags</Label>
              <div className="flex flex-wrap gap-2">
                {popularTags.slice(0, 12).map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.tags?.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {filters.tags?.includes(tag) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quality Filters */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Minimum Rating</Label>
                <Select
                  value={filters.minRating?.toString() || ''}
                  onValueChange={(value) => updateFilter('minRating', value ? Number(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any rating</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                    <SelectItem value="4.0">4.0+ stars</SelectItem>
                    <SelectItem value="3.5">3.5+ stars</SelectItem>
                    <SelectItem value="3.0">3.0+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Minimum Sales</Label>
                <Select
                  value={filters.minSales?.toString() || ''}
                  onValueChange={(value) => updateFilter('minSales', value ? Number(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any sales" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any sales</SelectItem>
                    <SelectItem value="10">10+ sales</SelectItem>
                    <SelectItem value="50">50+ sales</SelectItem>
                    <SelectItem value="100">100+ sales</SelectItem>
                    <SelectItem value="500">500+ sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}