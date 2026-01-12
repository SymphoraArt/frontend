/**
 * GET /api/marketplace/categories
 * Get available categories with prompt counts
 */

import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/backend/storage";

export async function GET(request: NextRequest) {
  try {
    const categories = await storage.getCategories();

    // Transform to API response format
    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      promptCount: category.promptCount || 0,
      featured: category.featured || false,
    }));

    return NextResponse.json({
      categories: formattedCategories,
      total: formattedCategories.length,
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}