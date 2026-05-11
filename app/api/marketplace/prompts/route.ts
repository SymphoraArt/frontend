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
      const supabase = getSupabaseServerClient();

      // Build Supabase query
      let dbQuery = supabase.from("prompts").select("*");

      if (category) {
        dbQuery = dbQuery.eq("category", category);
      }

      if (tags && tags.length > 0) {
        dbQuery = dbQuery.overlaps("tags", tags);
      }

      if (priceFilter === "free") {
        dbQuery = dbQuery.eq("price", 0);
      } else if (priceFilter === "paid") {
        dbQuery = dbQuery.gt("price", 0);
      } else if (minPrice !== undefined || maxPrice !== undefined) {
        if (minPrice !== undefined) dbQuery = dbQuery.gte("price", minPrice);
        if (maxPrice !== undefined) dbQuery = dbQuery.lte("price", maxPrice);
      }

      if (query && query.trim()) {
        dbQuery = dbQuery.ilike("title", `%${query.trim()}%`);
      }

      // Sort
      switch (sortBy) {
        case "newest":
          dbQuery = dbQuery.order("created_at", { ascending: false });
          break;
        case "popular":
          dbQuery = dbQuery.order("downloads", { ascending: false });
          break;
        case "price_low":
          dbQuery = dbQuery.order("price", { ascending: true });
          break;
        case "price_high":
          dbQuery = dbQuery.order("price", { ascending: false });
          break;
        case "trending":
        default:
          dbQuery = dbQuery.order("created_at", { ascending: false });
          break;
      }

      dbQuery = dbQuery.limit(limit);

      const { data: dbPrompts, error: dbError } = await dbQuery;

      if (dbError) {
        console.error("Supabase query error:", dbError);
        throw dbError;
      }

      if (Array.isArray(dbPrompts) && dbPrompts.length > 0) {
        prompts = dbPrompts.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.public_prompt_text || "",
          promptTemplate: p.public_prompt_text || "",
          priceUsdCents: typeof p.price === "number" ? p.price : 0,
          category: p.category || "",
          tags: Array.isArray(p.tags) ? p.tags : [],
          totalSales: typeof p.downloads === "number" ? p.downloads : 0,
          avgRating: typeof p.rating === "number" ? p.rating : 0,
          createdAt: p.created_at,
          listedAt: p.created_at,
          userId: p.user_id,
          previewImages: Array.isArray(p.uploaded_photos)
            ? p.uploaded_photos.map((url: string) => ({ url }))
            : [],
          showcaseImages: Array.isArray(p.uploaded_photos)
            ? p.uploaded_photos.map((url: string) => ({ url }))
            : [],
          aiModel: p.ai_model,
          model: p.ai_model,
          aspectRatio: p.aspect_ratio,
          resolution: p.resolution,
          isFreeShowcase: Boolean(p.is_free_showcase),
          promptType: p.prompt_type,
          isVideo: false,
        }));
      }

    } catch (searchError) {
      console.error('Search query failed:', searchError);
    }

    // Enrich with creator data and variables
    const supabase = getSupabaseServerClient();

    // Batch-fetch variables for all returned prompts
    const promptIds = prompts.map((p: any) => p.id).filter(Boolean);
    let variablesMap: Record<string, any[]> = {};
    if (promptIds.length > 0) {
      try {
        const { data: varsData } = await supabase
          .from("variables")
          .select("prompt_id,name,label,description,type,default_value,required,position")
          .in("prompt_id", promptIds)
          .order("position", { ascending: true });
        if (Array.isArray(varsData)) {
          varsData.forEach((v) => {
            const pid = String(v.prompt_id);
            if (!variablesMap[pid]) variablesMap[pid] = [];
            variablesMap[pid].push({
              name: String(v.name ?? ""),
              label: String(v.label ?? v.name ?? ""),
              description: String(v.description ?? ""),
              type: String(v.type ?? "text"),
              defaultValue: v.default_value ?? null,
              required: Boolean(v.required ?? false),
              position: typeof v.position === "number" ? v.position : 0,
            });
          });
        }
      } catch (e) {
        console.error("Variable fetch error:", e);
      }
    }

    const enrichedPrompts = await Promise.all(
      prompts.map(async (prompt: any) => {
        try {
          const { data: creatorData } = await supabase
            .from('users')
            .select('id, username, display_name, avatar_url')
            .eq('id', prompt.userId || prompt.artistId)
            .single();

          return {
            id: prompt.id || prompt._id?.toString(),
            title: prompt.title,
            description: prompt.description,
            promptTemplate: prompt.promptTemplate || prompt.description,
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
            showcaseImages: prompt.showcaseImages || prompt.previewImages || [],
            model: prompt.model || prompt.aiModel,
            aspectRatio: prompt.aspectRatio,
            resolution: prompt.resolution,
            isFreeShowcase: prompt.isFreeShowcase,
            promptType: prompt.promptType,
            isVideo: prompt.isVideo,
            variables: variablesMap[prompt.id] || [],
            relevanceScore: prompt.score || 0,
          };
        } catch (error) {
          console.error(`Error enriching prompt ${prompt.id}:`, error);
          return {
            id: prompt.id || prompt._id?.toString(),
            title: prompt.title,
            description: prompt.description,
            promptTemplate: prompt.promptTemplate || prompt.description,
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
            showcaseImages: prompt.showcaseImages || prompt.previewImages || [],
            model: prompt.model || prompt.aiModel,
            aspectRatio: prompt.aspectRatio,
            resolution: prompt.resolution,
            isFreeShowcase: prompt.isFreeShowcase,
            promptType: prompt.promptType,
            isVideo: prompt.isVideo,
            variables: variablesMap[prompt.id] || [],
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
