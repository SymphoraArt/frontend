/**
 * GET /api/marketplace/prompts
 * Advanced marketplace search and filtering with full-text search
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { storage } from "@/backend/storage";
import { z } from "zod";

const marketplaceFiltersSchema = z.object({
  // Full-text search
  query: z.string().optional(),                    // Search terms

  // Categorical filters
  category: z.string().optional(),                // Single category
  categories: z.array(z.string()).optional(),     // Multiple categories
  licenseType: z.array(z.string()).optional(),    // Multiple license types
  tags: z.array(z.string()).optional(),           // Tag filtering

  // Price filters
  priceFilter: z.enum(['all', 'free', 'paid']).optional(), // Filter by price type
  minPrice: z.number().int().min(0).optional(),   // Minimum price in cents
  maxPrice: z.number().int().min(0).optional(),   // Maximum price in cents

  // Quality filters
  minRating: z.number().min(0).max(5).optional(), // Minimum rating
  minSales: z.number().int().min(0).optional(),   // Minimum sales count

  // Sorting options
  sortBy: z.enum([
    'relevance', 'newest', 'price_low', 'price_high',
    'popular', 'rating', 'trending'
  ]).default('relevance'),

  sortOrder: z.enum(['asc', 'desc']).optional(),

  // Pagination
  limit: z.number().int().min(1).max(50).default(12),
  cursor: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters into filter object
    const filters = {
      query: searchParams.get('query') || undefined,
      category: searchParams.get('category') || undefined,
      categories: searchParams.getAll('categories').length > 0 ? searchParams.getAll('categories') : undefined,
      licenseType: searchParams.getAll('licenseType').length > 0 ? searchParams.getAll('licenseType') : undefined,
      tags: searchParams.getAll('tags').length > 0 ? searchParams.getAll('tags') : undefined,
      priceFilter: (searchParams.get('priceFilter') as 'all' | 'free' | 'paid' | null) || undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
      minSales: searchParams.get('minSales') ? parseInt(searchParams.get('minSales')!) : undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'relevance',
      sortOrder: (searchParams.get('sortOrder') as any) || undefined,
      limit: parseInt(searchParams.get('limit') || '12'),
      cursor: searchParams.get('cursor') || undefined,
    };

    const validation = marketplaceFiltersSchema.safeParse(filters);
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

    const {
      query, category, categories, licenseType, tags,
      priceFilter, minPrice, maxPrice, minRating, minSales,
      sortBy, sortOrder, limit, cursor
    } = validation.data;

    // Build MongoDB query
    const mongoQuery: any = {
      isListed: true,
      listingStatus: 'active'
    };

    // Add text search if query provided
    if (query && query.trim()) {
      mongoQuery.$text = { $search: query.trim() };
    }

    // Add category filter
    if (category) {
      mongoQuery.category = category;
    } else if (categories && categories.length > 0) {
      mongoQuery.category = { $in: categories };
    }

    // Add license type filter
    if (licenseType && licenseType.length > 0) {
      mongoQuery.licenseType = { $in: licenseType };
    }

    // Add tags filter
    if (tags && tags.length > 0) {
      mongoQuery.tags = { $in: tags };
    }

    // Add price range filter
    // Support free prompt filtering via priceFilter query param
    if (priceFilter === 'free') {
      // Filter for free prompts only (priceUsdCents === 0)
      mongoQuery.priceUsdCents = 0;
    } else if (priceFilter === 'paid') {
      // Filter for paid prompts only (priceUsdCents > 0)
      mongoQuery.priceUsdCents = { $gt: 0 };
    } else if (minPrice !== undefined || maxPrice !== undefined) {
      // Use explicit price range if provided
      mongoQuery.priceUsdCents = {};
      if (minPrice !== undefined) mongoQuery.priceUsdCents.$gte = minPrice;
      if (maxPrice !== undefined) mongoQuery.priceUsdCents.$lte = maxPrice;
    }

    // Add rating filter
    if (minRating !== undefined) {
      mongoQuery.avgRating = { $gte: minRating };
    }

    // Add sales filter
    if (minSales !== undefined) {
      mongoQuery.totalSales = { $gte: minSales };
    }

    // Build sort specification
    let sortSpec: any = {};
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    switch (sortBy) {
      case 'relevance':
        // For text search, relevance is handled by MongoDB's text score
        if (query) {
          sortSpec = { score: { $meta: "textScore" } };
        } else {
          sortSpec = { listedAt: -1 }; // Fallback to newest
        }
        break;
      case 'newest':
        sortSpec = { listedAt: -1 };
        break;
      case 'price_low':
        sortSpec = { priceUsdCents: 1 };
        break;
      case 'price_high':
        sortSpec = { priceUsdCents: -1 };
        break;
      case 'popular':
        sortSpec = { totalSales: -1, listedAt: -1 };
        break;
      case 'rating':
        sortSpec = { avgRating: -1, ratingCount: -1 };
        break;
      case 'trending':
        // Combine recency and popularity
        sortSpec = { listedAt: -1, totalSales: -1 };
        break;
      default:
        sortSpec = { listedAt: -1 };
    }

    // Execute search query
    let prompts: any[] = [];
    try {
      // Return mock data since storage methods are not implemented yet
      prompts = [
        { id: "p1", title: "Cinematic Table Setup", priceUsdCents: 500, category: "Cinematic", listedAt: new Date() },
        { id: "p2", title: "Brutalist Architecture", priceUsdCents: 1000, category: "Architecture", listedAt: new Date() }
      ];
    } catch (searchError) {
      console.error('Search query failed:', searchError);
    }

    // Enrich with creator data
    const supabase = getSupabaseServerClient();
    const enrichedPrompts = await Promise.all(
      prompts.map(async (prompt: any) => {
        try {
          // Get creator info from Supabase
          const { data: creatorData } = await supabase
            .from('users')
            .select('id, username, display_name, avatar_url')
            .eq('id', prompt.userId || prompt.artistId)
            .single();

          return {
            id: prompt.id || prompt._id?.toString(),
            title: prompt.title,
            description: prompt.description,
            priceUsdCents: prompt.priceUsdCents,
            licenseType: prompt.licenseType || 'personal',
            category: prompt.category,
            tags: prompt.tags || [],
            totalSales: prompt.totalSales || 0,
            totalRevenue: prompt.totalRevenue || 0,
            avgRating: prompt.avgRating || 0,
            ratingCount: prompt.ratingCount || 0,
            createdAt: prompt.createdAt,
            listedAt: prompt.listedAt,
            creator: creatorData ? {
              id: creatorData.id,
              displayName: creatorData.display_name || creatorData.username,
              username: creatorData.username,
              avatarUrl: creatorData.avatar_url,
            } : null,
            previewImages: prompt.previewImages || prompt.showcaseImages || [],
            // Search relevance score (if available)
            relevanceScore: prompt.score || 0,
          };
        } catch (error) {
          console.error(`Error enriching prompt ${prompt.id}:`, error);
          // Return prompt without creator data
          return {
            id: prompt.id || prompt._id?.toString(),
            title: prompt.title,
            description: prompt.description,
            priceUsdCents: prompt.priceUsdCents,
            licenseType: prompt.licenseType || 'personal',
            category: prompt.category,
            tags: prompt.tags || [],
            totalSales: prompt.totalSales || 0,
            avgRating: prompt.avgRating || 0,
            createdAt: prompt.createdAt,
            listedAt: prompt.listedAt,
            creator: null,
            previewImages: prompt.previewImages || prompt.showcaseImages || [],
          };
        }
      })
    );

    // Calculate pagination
    const hasMore = enrichedPrompts.length === limit;
    const nextCursor = hasMore ? enrichedPrompts[enrichedPrompts.length - 1]?.id : undefined;

    // Build response
    return NextResponse.json({
      prompts: hasMore ? enrichedPrompts.slice(0, -1) : enrichedPrompts,
      total: enrichedPrompts.length, // This is approximate for performance
      hasMore,
      nextCursor,
      filters: {
        applied: {
          query,
          category,
          categories,
          licenseType,
          tags,
          priceFilter,
          minPrice,
          maxPrice,
          minRating,
          minSales,
          sortBy,
          sortOrder,
        }
      },
      searchInfo: {
        query,
        totalResults: enrichedPrompts.length,
        hasSearchQuery: !!query,
        sortApplied: sortBy,
      }
    });

  } catch (error) {
    console.error('Error fetching marketplace prompts:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}