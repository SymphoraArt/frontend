/**
 * Prompt Content Route
 * 
 * API route for fetching prompt content by ID
 */

import { type ChainKey } from '@/shared/payment-config';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export interface PromptContentResponse {
  id: string;
  content: string;
  variables?: Array<{
    name: string;
    type: string;
    label: string;
    required: boolean;
  }>;
}

/**
 * GET /api/prompts/[id]/content
 * 
 * Fetch prompt content by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
): Promise<Response> {
  // Skip execution during build
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      !process.env.DATABASE_URL;
  
  if (isBuildTime) {
    return new Response(
      JSON.stringify({ id: 'build-time', content: '', variables: [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Handle both Promise and direct params (Next.js 15+ uses Promise)
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Prompt ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Implement prompt fetching from database
    // For now, return a placeholder response
    return new Response(
      JSON.stringify({
        id,
        content: '',
        variables: [],
      } as PromptContentResponse),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: `Failed to fetch prompt: ${errorMessage}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
