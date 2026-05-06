/**
 * GET /api/analytics/creators/[id]
 * Get comprehensive creator analytics and dashboard data
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import type { TimeSeriesSaleRow, PromptPurchaseSelect, PromptPurchaseRecentSelect, TopPrompt, RecentActivity } from "@shared/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';

    // Parse period
    const periodDays = period === '7d' ? 7 : period === '90d' ? 90 : 30;

    const supabase = getSupabaseServerClient();

    // Get basic creator info
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, username, display_name, created_at')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { success: false, error: 'Creator not found' },
        { status: 404 }
      );
    }

    // Get earnings data using the analytics function
    const { data: analyticsData, error: analyticsError } = await supabase
      .rpc('get_creator_analytics', {
        p_user_id: userId,
        p_period_days: periodDays
      });

    if (analyticsError) {
      console.error('Analytics query error:', analyticsError);
      // Fallback to manual calculation
    }

    // Get time series data for charts (last 30 days, daily)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: timeSeriesData, error: timeSeriesError } = await supabase
      .from('prompt_purchases')
      .select(`
        created_at,
        amount_usd_cents
      `)
      .eq('seller_id', userId)
      .eq('status', 'completed')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at');

    // Handle missing table gracefully
    if (timeSeriesError && (timeSeriesError.code === 'PGRST205' || timeSeriesError.message?.includes('schema cache'))) {
      console.warn('[API] prompt_purchases table not found - returning empty time series');
    } else if (timeSeriesError) {
      console.error('[API] Error fetching time series:', timeSeriesError);
    }

    // Aggregate by day
    const dailyEarnings: { [date: string]: number } = {};
    const dailySales: { [date: string]: number } = {};

    if (!timeSeriesError && timeSeriesData) {
      timeSeriesData.forEach((sale: TimeSeriesSaleRow) => {
        const date = new Date(sale.created_at).toISOString().split('T')[0];
        dailyEarnings[date] = (dailyEarnings[date] || 0) + sale.amount_usd_cents;
        dailySales[date] = (dailySales[date] || 0) + 1;
      });
    }

    // Convert to array format for charts
    const timeSeries = Object.entries(dailyEarnings)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, earnings]) => ({
        date,
        earnings: earnings / 100, // Convert to dollars
        sales: dailySales[date] || 0
      }));

    // Get top performing prompts
    // Fetch all purchases and aggregate in JavaScript since Supabase JS client doesn't support SQL aggregations
    const { data: allPurchases, error: topPromptsError } = await supabase
      .from('prompt_purchases')
      .select('prompt_id, amount_usd_cents')
      .eq('seller_id', userId)
      .eq('status', 'completed');

    // Handle missing table gracefully
    if (topPromptsError && (topPromptsError.code === 'PGRST205' || topPromptsError.message?.includes('schema cache'))) {
      console.warn('[API] prompt_purchases table not found - returning empty top prompts');
    } else if (topPromptsError) {
      console.error('[API] Error fetching top prompts:', topPromptsError);
    }

    // Aggregate by prompt_id
    const promptStats: { [key: string]: { revenue: number; sales: number } } = {};
    if (!topPromptsError && allPurchases) {
      allPurchases.forEach((purchase: PromptPurchaseSelect) => {
        const promptId = purchase.prompt_id;
        if (!promptStats[promptId]) {
          promptStats[promptId] = { revenue: 0, sales: 0 };
        }
        promptStats[promptId].revenue += purchase.amount_usd_cents;
        promptStats[promptId].sales += 1;
      });
    }

    // Convert to array and sort by revenue
    const topPromptsData = Object.entries(promptStats)
      .map(([prompt_id, stats]) => ({
        prompt_id,
        revenue: stats.revenue,
        sales: stats.sales
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Enrich with prompt titles from MongoDB
    const topPrompts: TopPrompt[] = [];
    if (topPromptsData && topPromptsData.length > 0) {
      const { storage } = await import('@/backend/storage');

      for (const promptData of topPromptsData) {
        try {
          const prompt = await storage.getPrompt(promptData.prompt_id);

          // Get view count for conversion rate calculation
          const { count: viewCount } = await supabase
            .from('prompt_analytics_events')
            .select('*', { count: 'exact', head: true })
            .eq('prompt_id', promptData.prompt_id)
            .eq('event_type', 'view');
          const conversionRate = (viewCount ?? 0) > 0
            ? (promptData.sales / (viewCount ?? 1)) * 100
            : 0;

          topPrompts.push({
            promptId: promptData.prompt_id,
            title: prompt?.title || `Prompt ${promptData.prompt_id.slice(-8)}`,
            sales: promptData.sales,
            revenue: promptData.revenue / 100, // Convert to dollars
            conversionRate: Math.round(conversionRate * 10) / 10
          });
        } catch (error) {
          console.error(`Failed to fetch prompt ${promptData.prompt_id}:`, error);
          // Include anyway with placeholder title
          topPrompts.push({
            promptId: promptData.prompt_id,
            title: `Prompt ${promptData.prompt_id.slice(-8)}`,
            sales: promptData.sales,
            revenue: promptData.revenue / 100,
            conversionRate: 0
          });
        }
      }
    }

    // Get recent sales activity with denormalized prompt_title
    const { data: recentSales, error: recentSalesError } = await supabase
      .from('prompt_purchases')
      .select(`
        id,
        prompt_id,
        prompt_title,
        amount_usd_cents,
        created_at
      `)
      .eq('seller_id', userId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(10);

    // Handle missing table gracefully
    if (recentSalesError && (recentSalesError.code === 'PGRST205' || recentSalesError.message?.includes('schema cache'))) {
      console.warn('[API] prompt_purchases table not found - returning empty recent sales');
    } else if (recentSalesError) {
      console.error('[API] Error fetching recent sales:', recentSalesError);
    }

    const recentActivity: RecentActivity[] = ((recentSalesError && (recentSalesError.code === 'PGRST205' || recentSalesError.message?.includes('schema cache'))) ? [] : (recentSales || [])).map((sale: PromptPurchaseRecentSelect) => ({
      type: 'sale' as const,
      promptTitle: sale.prompt_title || `Prompt ${sale.prompt_id.slice(-8)}`,
      amount: sale.amount_usd_cents / 100,
      timestamp: sale.created_at
    }));

    // Use analytics function result or fallback to manual calculation
    const analytics = analyticsData?.[0] || {
      total_earnings_cents: 0,
      period_earnings_cents: 0,
      total_sales: 0,
      period_sales: 0,
      total_prompts: 0,
      active_prompts: 0,
      avg_rating: 0,
      total_views: 0,
      total_unlocks: 0,
      conversion_rate: 0
    };

    const response = {
      creator: {
        id: userData.id,
        username: userData.username,
        displayName: userData.display_name || userData.username,
        joinedAt: userData.created_at
      },
      overview: {
        totalEarnings: analytics.total_earnings_cents / 100,
        monthlyEarnings: analytics.period_earnings_cents / 100,
        totalSales: analytics.total_sales,
        monthlySales: analytics.period_sales,
        totalPrompts: analytics.total_prompts,
        activePrompts: analytics.active_prompts,
        averageRating: analytics.avg_rating,
        totalViews: analytics.total_views,
        totalUnlocks: analytics.total_unlocks,
        conversionRate: analytics.conversion_rate
      },
      timeSeries,
      topPrompts,
      recentActivity,
      period: `${periodDays}d`,
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching creator analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}