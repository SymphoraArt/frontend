import { NextResponse } from "next/server";
import { storage } from "@/backend/storage";

/**
 * GET /api/artists
 *
 * Returns all artists in the system
 */
export async function GET() {
  try {
    const artists = await storage.getAllArtists();
    return NextResponse.json(artists);
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    return NextResponse.json(
      { error: "Failed to fetch artists" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/artists
 *
 * Creates a new artist
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const artist = await storage.createArtist(body);
    return NextResponse.json(artist, { status: 201 });
  } catch (error) {
    console.error("Failed to create artist:", error);
    return NextResponse.json(
      { error: "Failed to create artist" },
      { status: 400 }
    );
  }
}
