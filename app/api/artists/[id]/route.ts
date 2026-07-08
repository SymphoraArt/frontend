import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/backend/storage";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/artists/[id]
 *
 * Returns a specific artist by ID
 */
export async function GET(
  request: Request,
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
 * Updates an artist
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Require a valid session. NOTE: the Artist record has no owner/wallet field
  // (shared/schema.ts), so this cannot yet scope to the owning user — it only
  // stops anonymous edits. Tying an artist to a wallet (owner column) is a
  // follow-up data-model change needed for real per-owner authorization.
  try {
    await requireAuth(request);
  } catch {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const artist = await storage.updateArtist(id, body);

    if (!artist) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(artist);
  } catch (error) {
    console.error("Failed to update artist:", error);
    return NextResponse.json(
      { error: "Failed to update artist" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/artists/[id]
 *
 * Deletes an artist
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Require auth (stops anonymous deletion). Per-owner scoping is not possible
  // until Artist gains an owner field — see PATCH note.
  try {
    await requireAuth(request);
  } catch {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const deleted = await storage.deleteArtist(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete artist:", error);
    return NextResponse.json(
      { error: "Failed to delete artist" },
      { status: 500 }
    );
  }
}
