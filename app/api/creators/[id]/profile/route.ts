/**
 * GET /api/creators/[id]/profile
 * Get creator profile with portfolio and stats
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { storage } from "@/backend/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: creatorId } = await params;

    const supabase = getSupabaseServerClient();

    // Get creator user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, username, display_name, avatar_url, created_at')
      .eq('id', creatorId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { success: false, error: 'Creator not found' },
        { status: 404 }
      );
    }

    // Get creator earnings
    const { data: earnings, error: earningsError } = await supabase
      .from('user_earnings')
      .select('*')
      .eq('user_id', creatorId)
      .single();

    // Handle missing table gracefully
    if (earningsError && earningsError.code !== 'PGRST116' && (earningsError.code === 'PGRST205' || earningsError.message?.includes('schema cache'))) {
      console.warn('[API] user_earnings table not found - using default earnings');
    } else if (earningsError && earningsError.code !== 'PGRST116') {
      console.error('[API] Error fetching earnings:', earningsError);
    }

    // Get creator's listed prompts from MongoDB
    // Use storage to get prompts by creator
    const allPrompts = await storage.getAllPrompts();
    const listedPrompts = allPrompts.filter((p: any) => {
      const matchesCreator = (p.userId === creatorId || p.artistId === creatorId);
      return matchesCreator && p.isListed && p.listingStatus === 'active';
    }).slice(0, 20);

    // Get recent sales
    const { data: recentSales, error: salesError } = await supabase
      .from('prompt_purchases')
      .select(`
        id,
        prompt_id,
        prompt_title,
        prompt_preview_image_url,
        amount_usd_cents,
        created_at
      `)
      .eq('seller_id', creatorId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(10);

    // Handle missing table gracefully
    if (salesError && (salesError.code === 'PGRST205' || salesError.message?.includes('schema cache'))) {
      console.warn('[API] prompt_purchases table not found - returning empty recent sales');
    } else if (salesError) {
      console.error('[API] Error fetching recent sales:', salesError);
    }

    // Calculate stats
    const stats = {
      totalEarnings: earnings?.total_earnings_cents || 0,
      totalSales: earnings?.total_sales || 0,
      activePrompts: listedPrompts?.length || 0,
      averageRating: 0, // Would calculate from reviews
      totalPrompts: listedPrompts?.length || 0,
    };

    // Enrich prompts with additional data
    const featuredPrompts = (listedPrompts || []).slice(0, 6).map((prompt: any) => ({
      id: prompt.id || prompt._id?.toString(),
      title: prompt.title,
      description: prompt.description,
      priceUsdCents: prompt.priceUsdCents,
      licenseType: prompt.licenseType,
      totalSales: prompt.totalSales || 0,
      totalRevenue: prompt.totalRevenue || 0,
      avgRating: prompt.avgRating || 0,
      previewImageUrl: prompt.previewImageUrl || prompt.showcaseImages?.[0]?.url,
      listedAt: prompt.listedAt,
    }));

    return NextResponse.json({
      creator: {
        id: userData.id,
        username: userData.username,
        displayName: userData.display_name || userData.username,
        avatarUrl: userData.avatar_url,
        joinedAt: userData.created_at,
      },
      stats,
      featuredPrompts,
      recentSales: ((salesError && (salesError.code === 'PGRST205' || salesError.message?.includes('schema cache'))) ? [] : (recentSales || [])).map((sale: any) => ({
        id: sale.id,
        promptId: sale.prompt_id,
        promptTitle: sale.prompt_title,
        promptPreviewImageUrl: sale.prompt_preview_image_url,
        amountCents: sale.amount_usd_cents,
        createdAt: sale.created_at,
      })),
    });

  } catch (error) {
    console.error('Error fetching creator profile:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
