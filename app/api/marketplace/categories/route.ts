/**
 * GET /api/marketplace/categories
 * Get available categories with prompt counts
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Return mock categories since storage.getCategories is not implemented yet
    const categories = [
      { id: "1", name: "Cinematic", description: "Movie-like shots", icon: "🎬", promptCount: 15, featured: true },
      { id: "2", name: "Architecture", description: "Buildings and structures", icon: "🏛️", promptCount: 8, featured: false },
      { id: "3", name: "Portrait", description: "Character portraits", icon: "👤", promptCount: 22, featured: true },
    ];

    return NextResponse.json({
      categories,
      total: categories.length,
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}