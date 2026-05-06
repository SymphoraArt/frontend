import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/backend/storage";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/artists/[id]
 *
 * Returns a specific artist by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const artist = await storage.getArtist(id);

    if (!artist) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(artist);
  } catch (error) {
    console.error("Failed to fetch artist:", error);
    return NextResponse.json(
      { error: "Failed to fetch artist" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/artists/[id]
 *
 * Updates an artist — requires wallet auth + ownership
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await requireAuth(request);
    const { id } = await params;

    const artist = await storage.getArtist(id);
    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    const artistUserId = (artist as any).userId || (artist as any).walletAddress || (artist as any).id;
    if (artistUserId?.toLowerCase() !== authUser.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const updated = await storage.updateArtist(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Authentication failed")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Failed to update artist:", error);
    return NextResponse.json({ error: "Failed to update artist" }, { status: 500 });
  }
}

/**
 * DELETE /api/artists/[id]
 *
 * Deletes an artist — requires wallet auth + ownership
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await requireAuth(request);
    const { id } = await params;

    const artist = await storage.getArtist(id);
    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    const artistUserId = (artist as any).userId || (artist as any).walletAddress || (artist as any).id;
    if (artistUserId?.toLowerCase() !== authUser.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await storage.deleteArtist(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Authentication failed")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Failed to delete artist:", error);
    return NextResponse.json({ error: "Failed to delete artist" }, { status: 500 });
  }
}
