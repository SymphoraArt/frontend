/**
 * GET /api/prompts/[id]/content/secure
 * Secure content endpoint that requires access token
 * Returns decrypted prompt content only if token is valid and user has purchased
 */

import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/backend/storage";
import { getAccessTokenFromRequest, verifyContentAccess } from "@/lib/content-access-tokens";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: promptId } = await params;

    // Authenticate user
    const authUser = await requireAuth(request);

    // Get access token from request
    const token = getAccessTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { 
          error: 'Access token required. Use ?token=... or Authorization: Bearer ... header',
          hint: 'Get an access token from the purchase endpoint'
        },
        { status: 401 }
      );
    }

    // Verify token and access
    const accessCheck = await verifyContentAccess(token, promptId, authUser.userId);
    if (!accessCheck.hasAccess) {
      return NextResponse.json(
        { 
          error: accessCheck.error || 'Access denied',
          hint: 'Token may be expired or invalid. Purchase the prompt to get a new token.'
        },
        { status: 403 }
      );
    }

    // Get decrypted content
    const content = await storage.getPromptWithDecryptedContent(promptId);
    if (!content) {
      return NextResponse.json(
        { error: 'Prompt content not found' },
        { status: 404 }
      );
    }

    // Return decrypted content
    // Note: Content is still sent over HTTPS, but token provides access control
    return NextResponse.json({
      content: content.decryptedContent,
      promptId: promptId,
      accessedAt: new Date().toISOString(),
      // Include token expiration info
      expiresAt: accessCheck.payload?.expiresAt 
        ? new Date(accessCheck.payload.expiresAt * 1000).toISOString()
        : undefined,
    }, {
      // Add security headers
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    });

  } catch (error) {
    console.error('Error retrieving secure content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}