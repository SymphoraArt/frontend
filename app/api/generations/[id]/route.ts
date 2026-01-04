import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";
import { decryptString, type EncryptedPayload } from "@/lib/crypto";

type GenerationStatus = "pending" | "processing" | "completed" | "failed";

type PatchGenerationBody = {
  status?: GenerationStatus;

  // image/result when completed
  generatedImage?: any | null;

  // error when failed
  error?: any | null;

  // transaction info if paid
  transaction?: {
    txHash?: string;
    chain?: string;
    amount?: number;
    currency?: string;
    status?: "pending" | "confirmed" | "failed";
    timestamp?: string | Date;
  } | null;

  // public/private etc.
  isPrivate?: boolean;

  likes?: number;
  bookmarks?: number;

  // (optional) directly specify completedAt
  completedAt?: string | Date | null;
};

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { searchParams } = new URL(req.url);
  const decrypt = searchParams.get("decrypt") === "true";

  let _id: ObjectId;
  try {
    _id = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "symphora");

  const generation = await db.collection("generations").findOne({ _id });
  if (!generation)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  // If decrypt=true, decrypt the finalPrompt
  if (decrypt && generation.finalPrompt) {
    const payload = generation.finalPrompt as EncryptedPayload;
    if (payload.encrypted && payload.iv && payload.authTag) {
      try {
        const decrypted = decryptString(payload, "generations.finalPrompt");
        return NextResponse.json({
          generation: {
            ...generation,
            finalPrompt: decrypted,
            finalPromptDecrypted: true,
          },
        });
      } catch (e: any) {
        return NextResponse.json(
          { error: "Failed to decrypt finalPrompt", details: e.message },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ generation });
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  let _id: ObjectId;
  try {
    _id = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  const body = (await req.json()) as PatchGenerationBody;
  const update: any = {};

  if (body.status) update.status = body.status;

  if ("generatedImage" in body)
    update.generatedImage = body.generatedImage ?? null;
  if ("error" in body) update.error = body.error ?? null;
  if ("transaction" in body) update.transaction = body.transaction ?? null;

  if (typeof body.isPrivate === "boolean") update.isPrivate = body.isPrivate;
  if (typeof body.likes === "number") update.likes = body.likes;
  if (typeof body.bookmarks === "number") update.bookmarks = body.bookmarks;

  // completedAt handling: defaults to now when status changes to completed
  if ("completedAt" in body) {
    update.completedAt = body.completedAt ? new Date(body.completedAt) : null;
  } else if (body.status === "completed") {
    update.completedAt = new Date();
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "symphora");

  const result = await db
    .collection("generations")
    .updateOne({ _id }, { $set: update });

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
