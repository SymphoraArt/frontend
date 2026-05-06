/**
 * GET /api/analytics/prompts/[id]
 * Get detailed analytics for a specific prompt
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { storage } from "@/backend/storage";
import { requireAuth } from "@/lib/auth";
import type { PromptAnalyticsEventSelect, PromptAnalyticsEventDemographicSelect, DailyMetricRow, DemographicRow } from "@/shared/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: promptId } = await params;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';

    // Parse period
    const periodDays = period === '7d' ? 7 : period === '90d' ? 90 : 30;

    // Authenticate user
    const authUser = await requireAuth(request);

    // Verify prompt exists and user has access (creator only)
    const prompt = await storage.getPrompt(promptId);
    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt not found' },
        { status: 404 }
      );
    }

    // Check if user is the creator
    if (prompt.userId !== authUser.userId && prompt.artistId !== authUser.userId) {
      return NextResponse.json(
        { success: false, error: 'You can only view analytics for your own prompts' },
        { status: 403 }
      );
    }

    const supabase = getSupabaseServerClient();

    // Get prompt analytics using the analytics function
    const { data: analyticsData, error: analyticsError } = await supabase
      .rpc('get_prompt_analytics', {
        p_prompt_id: promptId,
        p_period_days: periodDays
      });

    // Get time series data (daily metrics for the period)
    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - periodDays);

    // Fetch raw events and aggregate in JavaScript since Supabase JS client doesn't support SQL aggregations
    const { data: rawEvents, error: timeSeriesError } = await supabase
      .from('prompt_analytics_events')
      .select('created_at, event_type')
      .eq('prompt_id', promptId)
      .gte('created_at', periodStart.toISOString())
      .order('created_at');

    // Aggregate time series data by date and event type
    const dailyMetrics: { [date: string]: DailyMetricRow } = {};

    if (rawEvents) {
      rawEvents.forEach((event: PromptAnalyticsEventSelect) => {
        const date = new Date(event.created_at).toISOString().split('T')[0];
        if (!dailyMetrics[date]) {
          dailyMetrics[date] = { date, views: 0, unlocks: 0, generations: 0 };
        }
        if (event.event_type === 'view' || event.event_type === 'preview_click') {
          dailyMetrics[date].views += 1;
        } else if (event.event_type === 'unlock') {
          dailyMetrics[date].unlocks += 1;
        } else if (event.event_type === 'generation') {
          dailyMetrics[date].generations += 1;
        }
      });
    }

    const timeline = Object.values(dailyMetrics).sort((a: DailyMetricRow, b: DailyMetricRow) =>
      a.date.localeCompare(b.date)
    );

    // Get demographic data (simplified)
    // Fetch raw events and aggregate in JavaScript
    const { data: rawDemographicEvents, error: demographicError } = await supabase
      .from('prompt_analytics_events')
      .select('country, device_type, source')
      .eq('prompt_id', promptId)
      .not('country', 'is', null);

    // Aggregate demographic data
    const demographicData: DemographicRow[] = [];
    const demographicMap: { [key: string]: number } = {};

    if (rawDemographicEvents) {
      rawDemographicEvents.forEach((event: PromptAnalyticsEventDemographicSelect) => {
        const key = `${event.country || 'unknown'}|${event.device_type || 'unknown'}|${event.source || 'unknown'}`;
        demographicMap[key] = (demographicMap[key] || 0) + 1;
      });

      // Convert map to array format
      Object.entries(demographicMap).forEach(([key, count]) => {
        const [country, device_type, source] = key.split('|');
        demographicData.push({ country, device_type, source, count });
      });

      // Sort by count descending
      demographicData.sort((a, b) => b.count - a.count);
    }

    // Process demographic data
    const demographics = {
      topRegions: [] as Array<{ country: string; percentage: number }>,
      deviceTypes: [] as Array<{ device: string; percentage: number }>,
      referrerSources: [] as Array<{ source: string; count: number }>
    };

    if (demographicData) {
      // Top regions
      const regionTotals: { [country: string]: number } = {};
      let totalRegionEvents = 0;

      demographicData.forEach((row: DemographicRow) => {
        if (row.country) {
          regionTotals[row.country] = (regionTotals[row.country] || 0) + row.count;
          totalRegionEvents += row.count;
        }
      });

      demographics.topRegions = Object.entries(regionTotals)
        .map(([country, count]) => ({
          country,
          percentage: totalRegionEvents > 0 ? (count / totalRegionEvents) * 100 : 0
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);

      // Device types
      const deviceTotals: { [device: string]: number } = {};
      let totalDeviceEvents = 0;

      demographicData.forEach((row: DemographicRow) => {
        if (row.device_type) {
          deviceTotals[row.device_type] = (deviceTotals[row.device_type] || 0) + row.count;
          totalDeviceEvents += row.count;
        }
      });

      demographics.deviceTypes = Object.entries(deviceTotals)
        .map(([device, count]) => ({
          device,
          percentage: totalDeviceEvents > 0 ? (count / totalDeviceEvents) * 100 : 0
        }))
        .sort((a, b) => b.percentage - a.percentage);

      // Referrer sources
      const sourceTotals: { [source: string]: number } = {};

      demographicData.forEach((row: DemographicRow) => {
        if (row.source) {
          sourceTotals[row.source] = (sourceTotals[row.source] || 0) + row.count;
        }
      });

      demographics.referrerSources = Object.entries(sourceTotals)
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }

    // Use analytics function result or fallback
    const analytics = analyticsData?.[0] || {
      total_views: 0,
      period_views: 0,
      total_unlocks: 0,
      period_unlocks: 0,
      total_generations: 0,
      period_generations: 0,
      avg_rating: 0,
      rating_count: 0,
      conversion_rate: 0,
      revenue_cents: 0
    };

    // Calculate trends (comparing current period to previous period)
    const previousPeriodStart = new Date();
    previousPeriodStart.setDate(previousPeriodStart.getDate() - (periodDays * 2));
    const previousPeriodEnd = new Date();
    previousPeriodEnd.setDate(previousPeriodEnd.getDate() - periodDays);

    const { data: previousData, error: previousError } = await supabase
      .rpc('get_prompt_analytics', {
        p_prompt_id: promptId,
        p_period_days: periodDays
      });

    const previousAnalytics = previousData?.[0] || {
      total_views: 0,
      total_unlocks: 0,
      revenue_cents: 0
    };

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const trends = {
      viewsChange: calculateChange(analytics.total_views, previousAnalytics.total_views),
      salesChange: calculateChange(analytics.total_unlocks, previousAnalytics.total_unlocks),
      revenueChange: calculateChange(analytics.revenue_cents, previousAnalytics.revenue_cents)
    };

    const response = {
      promptId,
      period,
      metrics: {
        views: analytics.total_views,
        uniqueViewers: Math.floor(analytics.total_views * 0.7), // Estimate
        unlockIntents: Math.floor(analytics.total_views * 0.1), // Estimate
        unlocks: analytics.total_unlocks,
        generations: analytics.total_generations,
        conversionRate: analytics.conversion_rate,
        avgRating: analytics.avg_rating,
        totalRevenue: analytics.revenue_cents / 100
      },
      trends,
      timeline,
      demographics,
      prompt: {
        title: prompt.title,
        createdAt: prompt.createdAt,
        price: prompt.price || 0
      },
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching prompt analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}