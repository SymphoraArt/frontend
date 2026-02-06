/**
 * GET /api/marketplace/search
 * Search suggestions and autocomplete for marketplace
 */

import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/backend/storage";
import { z } from "zod";

const searchSuggestionsSchema = z.object({
  query: z.string().min(1).max(100),
  limit: z.number().int().min(1).max(20).default(10),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    const validation = searchSuggestionsSchema.safeParse({ query, limit });
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: validation.error.issues
        },
        { status: 400 }
      );
    }

    const { query: searchQuery, limit: resultLimit } = validation.data;

    // Get popular tags for suggestions
    const popularTags = await storage.getPopularTags(20);

    // Filter tags that match the query
    const matchingTags = popularTags
      .filter((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, resultLimit / 2); // Reserve half for tags

    // Get categories for suggestions
    const categories = await storage.getCategories();
    const matchingCategories = categories
      .filter((cat: any) => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, Math.max(2, resultLimit / 4)); // Reserve some for categories

    // Create suggestions array
    type Suggestion = 
      | { type: 'tag'; value: string; label: string; count: number }
      | { type: 'category'; value: string; label: string; count: number }
      | { type: 'query'; value: string; label: string; count: number };
    
    const suggestions: Suggestion[] = [
      // Exact matches first
      ...matchingTags.map((tag: string) => ({
        type: 'tag' as const,
        value: tag,
        label: `Tag: ${tag}`,
        count: 0, // Could be populated with actual counts
      })),
      ...matchingCategories.map((cat: any) => ({
        type: 'category' as const,
        value: cat.id,
        label: `Category: ${cat.name}`,
        count: cat.promptCount || 0,
      })),
    ].slice(0, resultLimit);

    // Add some popular searches if we don't have enough suggestions
    if (suggestions.length < resultLimit) {
      const popularSearches = [
        "cyberpunk portrait",
        "fantasy landscape",
        "abstract art",
        "character design",
        "sci-fi scene",
        "nature photography",
        "product shot",
        "architecture",
      ].filter((search: string) =>
        search.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !suggestions.some(s => s.label.toLowerCase().includes(search.toLowerCase()))
      );

      const additionalSuggestions = popularSearches
        .slice(0, resultLimit - suggestions.length)
        .map(search => ({
          type: 'query' as const,
          value: search,
          label: search,
          count: 0,
        }));

      suggestions.push(...additionalSuggestions);
    }

    return NextResponse.json({
      query: searchQuery,
      suggestions,
      total: suggestions.length,
    });

  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}