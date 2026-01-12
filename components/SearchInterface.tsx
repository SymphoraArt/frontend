"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X, TrendingUp, Tag, FolderOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SearchSuggestion {
  type: 'query' | 'tag' | 'category';
  value: string;
  label: string;
  count?: number;
}

interface SearchInterfaceProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
  className?: string;
}

export function SearchInterface({
  query,
  onQueryChange,
  onSearch,
  placeholder = "Search prompts...",
  showSuggestions = true,
  className = ""
}: SearchInterfaceProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch search suggestions
  const { data: suggestionsData, isLoading: suggestionsLoading } = useQuery({
    queryKey: ['search-suggestions', query],
    queryFn: async () => {
      if (!query.trim() || query.length < 2) return { suggestions: [] };

      const response = await fetch(`/api/marketplace/search?query=${encodeURIComponent(query)}&limit=8`);
      if (!response.ok) throw new Error('Failed to fetch suggestions');

      return response.json();
    },
    enabled: showSuggestions && query.length >= 2,
    staleTime: 30000, // Cache for 30 seconds
  });

  const suggestions = suggestionsData?.suggestions || [];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || suggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            handleSuggestionClick(suggestions[selectedIndex]);
          } else {
            handleSearch();
          }
          break;
        case 'Escape':
          setIsFocused(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, selectedIndex, suggestions]);

  // Reset selection when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const handleInputChange = (value: string) => {
    onQueryChange(value);
    setSelectedIndex(-1);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onQueryChange(suggestion.value);
    onSearch(suggestion.value);
    setIsFocused(false);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    onQueryChange('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'tag':
        return <Tag className="h-4 w-4 text-blue-500" />;
      case 'category':
        return <FolderOpen className="h-4 w-4 text-green-500" />;
      case 'query':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder={placeholder}
          className="pl-10 pr-20"
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </Button>
          )}

          <Button
            onClick={handleSearch}
            size="sm"
            className="h-8 px-3"
            disabled={!query.trim()}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && isFocused && query.length >= 2 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-0">
            {suggestionsLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                Loading suggestions...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="max-h-64 overflow-y-auto">
                {suggestions.map((suggestion: SearchSuggestion, index: number) => (
                  <button
                    key={`${suggestion.type}-${suggestion.value}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full text-left px-4 py-3 hover:bg-muted flex items-center gap-3 transition-colors ${
                      index === selectedIndex ? 'bg-muted' : ''
                    }`}
                  >
                    {getSuggestionIcon(suggestion.type)}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{suggestion.label}</div>
                      {suggestion.count !== undefined && suggestion.count > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {suggestion.count} prompts
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : query.length >= 3 ? (
              <div className="p-4 text-center text-muted-foreground">
                No suggestions found for "{query}"
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Popular Searches (when no query) */}
      {showSuggestions && isFocused && !query && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Popular searches
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "cyberpunk portrait",
                "fantasy landscape",
                "abstract art",
                "character design",
                "sci-fi scene"
              ].map((popularQuery) => (
                <Badge
                  key={popularQuery}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSuggestionClick({
                    type: 'query',
                    value: popularQuery,
                    label: popularQuery
                  })}
                >
                  {popularQuery}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}