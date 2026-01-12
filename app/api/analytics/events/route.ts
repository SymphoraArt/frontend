/**
 * POST /api/analytics/events
 * Track user interactions and analytics events
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { z } from "zod";

const analyticsEventSchema = z.object({
  eventType: z.enum([
    'view', 'preview_click', 'unlock_intent', 'unlock',
    'generation', 'rating', 'share', 'favorite', 'download'
  ]),
  promptId: z.string().optional(),
  creatorId: z.string().optional(),
  sessionId: z.string().optional(),
  referrer: z.string().optional(),
  source: z.string().default('marketplace'),
  campaign: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = analyticsEventSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid event data",
          details: validation.error.issues
        },
        { status: 400 }
      );
    }

    const {
      eventType,
      promptId,
      creatorId,
      sessionId,
      referrer,
      source,
      campaign,
      metadata = {}
    } = validation.data;

    // Get user info from request (if authenticated)
    // For now, we'll use anonymous tracking
    const userId = null; // Would extract from auth token

    // Extract request metadata
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Simple IP hashing for privacy (not cryptographically secure)
    const ipHash = ipAddress !== 'unknown'
      ? Buffer.from(ipAddress).toString('base64').slice(0, 16)
      : null;

    // Determine device type from user agent
    const deviceType = userAgent.toLowerCase().includes('mobile') ? 'mobile' :
                      userAgent.toLowerCase().includes('tablet') ? 'tablet' : 'desktop';

    // Basic country detection (simplified - would use GeoIP service in production)
    const country = null; // Would be determined by IP geolocation

    const supabase = getSupabaseServerClient();

    // Insert analytics event
    const { error: insertError } = await supabase
      .from('prompt_analytics_events')
      .insert({
        event_type: eventType,
        user_id: userId,
        session_id: sessionId,
        prompt_id: promptId,
        creator_id: creatorId,
        referrer,
        source,
        campaign,
        user_agent: userAgent,
        ip_hash: ipHash,
        country,
        device_type: deviceType,
        metadata,
        event_timestamp: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error inserting analytics event:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to track event' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully'
    });

  } catch (error) {
    console.error('Error tracking analytics event:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Rate limiting helper (would be implemented in middleware)
export async function GET(request: NextRequest) {
  // Health check endpoint
  return NextResponse.json({
    status: 'ok',
    message: 'Analytics tracking is active',
    timestamp: new Date().toISOString()
  });
}