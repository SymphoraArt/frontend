import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";
import { encryptString } from "@/lib/crypto";

type PromptType = "showcase" | "free" | "paid";

type CreatePromptBody = {
  creatorId: string;
  type: PromptType;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  aiSettings?: { aspectRatio?: string; includeText?: boolean };

  promptData?: {
    segments?: Array<
      | { type: "encrypted"; content: any; order: number }
      | { type: "variable"; variableName: string; order: number; content?: any }
    >;
    variables?: Array<{
      name: string;
      label: string;
      description?: string;
      type: "text" | "multiselect" | "singleselect" | "slider" | "checkbox";
      required: boolean;
      config?: Record<string, any>;
      defaultValue?: any;
      order: number;
    }>;
  };

  pricing?: { pricePerGeneration?: number };
  showcaseImages?: Array<{
    url: string;
    thumbnail?: string;
    usedVariables?: any[];
    isPrimary?: boolean;
  }>;

  isFeatured?: boolean;
  published?: boolean;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const creatorId = searchParams.get("creatorId");
  const type = searchParams.get("type") as PromptType | null;
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const featured = searchParams.get("featured"); // "true" | "false"
  const q = searchParams.get("q");
  const limit = Math.min(Number(searchParams.get("limit") || "20"), 50);

  const cursor = searchParams.get("cursor");

  const query: any = {};

  if (creatorId) {
    try {
      query.creator = new ObjectId(creatorId);
    } catch {
      return NextResponse.json({ error: "invalid creatorId" }, { status: 400 });
    }
  }
  if (type) query.type = type;
  if (category) query.category = category;
  if (tag) query.tags = tag;
  if (featured === "true") query.isFeatured = true;
  if (featured === "false") query.isFeatured = false;

  if (q) {
    query.title = { $regex: q, $options: "i" };
  }

  if (cursor) {
    try {
      query._id = { $lt: new ObjectId(cursor) };
    } catch {
      return NextResponse.json({ error: "invalid cursor" }, { status: 400 });
    }
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const items = await db
    .collection("prompts")
    .find(query)
    .sort({ publishedAt: -1, _id: -1 })
    .limit(limit)
    .toArray();

  const nextCursor = items.length
    ? items[items.length - 1]._id.toString()
    : null;

  return NextResponse.json({ items, nextCursor });
}

export async function POST(req: Request) {
  const body = (await req.json()) as CreatePromptBody;

  if (!body.creatorId)
    return NextResponse.json(
      { error: "creatorId is required" },
      { status: 400 }
    );
  if (!body.type || !["showcase", "free", "paid"].includes(body.type))
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  if (!body.title || typeof body.title !== "string")
    return NextResponse.json({ error: "title is required" }, { status: 400 });

  let creatorObjectId: ObjectId;
  try {
    creatorObjectId = new ObjectId(body.creatorId);
  } catch {
    return NextResponse.json({ error: "invalid creatorId" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const creatorExists = await db
    .collection("users")
    .findOne({ _id: creatorObjectId }, { projection: { _id: 1 } });
  if (!creatorExists)
    return NextResponse.json({ error: "creator not found" }, { status: 404 });

  const now = new Date();

  const rawSegments = body.promptData?.segments ?? [];
  const encryptedSegments = rawSegments.map((seg: any) => {
    if (seg?.type !== "encrypted") return seg;

    const plaintext =
      typeof seg.content === "string"
        ? seg.content
        : JSON.stringify(seg.content ?? "");

    return {
      ...seg,
      content: encryptString(plaintext, "prompts.segments"),
    };
  });

  const doc: any = {
    creator: creatorObjectId,
    type: body.type,
    title: body.title,
    description: body.description || "",
    category: body.category || "",
    tags: Array.isArray(body.tags) ? body.tags : [],
    aiSettings: {
      aspectRatio: body.aiSettings?.aspectRatio || "1:1",
      includeText: !!body.aiSettings?.includeText,
    },
    promptData: {
      segments: encryptedSegments,
      variables: body.promptData?.variables || [],
    },
    pricing: body.pricing || {},
    showcaseImages: body.showcaseImages || [],
    stats: {
      totalGenerations: 0,
      bookmarks: 0,
      likes: 0,
      reviews: {
        total: 0,
        averageRating: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    },
    isFeatured: !!body.isFeatured,
    createdAt: now,
    updatedAt: now,
  };

  if (body.published) doc.publishedAt = now;

  try {
    const result = await db.collection("prompts").insertOne(doc);
    return NextResponse.json(
      { id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "failed to create prompt", details: e?.message },
      { status: 500 }
    );
  }
}
