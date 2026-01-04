import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";

type PatchBody = {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  aiSettings?: { aspectRatio?: string; includeText?: boolean };
  pricing?: { pricePerGeneration?: number };
  isFeatured?: boolean;
  published?: boolean; // if true, sets publishedAt (keeps existing if already set)
};

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  let _id: ObjectId;
  try {
    _id = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const prompt = await db.collection("prompts").findOne({ _id });
  if (!prompt)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  return NextResponse.json({ prompt });
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

  const body = (await req.json()) as PatchBody;
  const update: any = { updatedAt: new Date() };

  if (typeof body.title === "string") update.title = body.title;
  if (typeof body.description === "string")
    update.description = body.description;
  if (typeof body.category === "string") update.category = body.category;
  if (Array.isArray(body.tags)) update.tags = body.tags;

  if (body.aiSettings) {
    update.aiSettings = {};
    if (body.aiSettings.aspectRatio)
      update.aiSettings.aspectRatio = body.aiSettings.aspectRatio;
    if (typeof body.aiSettings.includeText === "boolean")
      update.aiSettings.includeText = body.aiSettings.includeText;
  }

  if (body.pricing) update.pricing = body.pricing;

  if (typeof body.isFeatured === "boolean") update.isFeatured = body.isFeatured;

  if (body.published === true) {
    // if publishedAt doesn't exist, set it; if you want to keep existing value, use conditional logic instead of $setOnInsert
    update.publishedAt = new Date();
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const result = await db
    .collection("prompts")
    .updateOne({ _id }, { $set: update });

  if (result.matchedCount === 0)
    return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
