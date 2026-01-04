// app/api/generations/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";
import {
  decryptString,
  encryptString,
  type EncryptedPayload,
} from "@/lib/crypto";

type GenerationStatus = "pending" | "processing" | "completed" | "failed";

type CreateGenerationBody = {
  userId: string;
  promptId: string;

  variableValues?: Array<{ variableName: string; value: any }>;
  referenceImages?: any[];
  usedSettings?: { aspectRatio?: string; includeText?: boolean };
  isPrivate?: boolean;

  // optional: TTL hours for finalPrompt (default 24)
  finalPromptTtlHours?: number;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  const promptId = searchParams.get("promptId");
  const status = searchParams.get("status") as GenerationStatus | null;

  const limit = Math.min(Number(searchParams.get("limit") || "20"), 50);
  const cursor = searchParams.get("cursor"); // ObjectId cursor pagination

  const query: any = {};

  if (userId) {
    try {
      query.user = new ObjectId(userId);
    } catch {
      return NextResponse.json({ error: "invalid userId" }, { status: 400 });
    }
  }

  if (promptId) {
    try {
      query.prompt = new ObjectId(promptId);
    } catch {
      return NextResponse.json({ error: "invalid promptId" }, { status: 400 });
    }
  }

  if (status) query.status = status;

  if (cursor) {
    try {
      query._id = { $lt: new ObjectId(cursor) };
    } catch {
      return NextResponse.json({ error: "invalid cursor" }, { status: 400 });
    }
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "symphora");

  const items = await db
    .collection("generations")
    .find(query)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .toArray();

  const nextCursor = items.length
    ? items[items.length - 1]._id.toString()
    : null;

  return NextResponse.json({ items, nextCursor });
}

export async function POST(req: Request) {
  const body = (await req.json()) as CreateGenerationBody;

  if (!body.userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  if (!body.promptId) {
    return NextResponse.json(
      { error: "promptId is required" },
      { status: 400 }
    );
  }

  let userObjectId: ObjectId;
  let promptObjectId: ObjectId;

  try {
    userObjectId = new ObjectId(body.userId);
  } catch {
    return NextResponse.json({ error: "invalid userId" }, { status: 400 });
  }

  try {
    promptObjectId = new ObjectId(body.promptId);
  } catch {
    return NextResponse.json({ error: "invalid promptId" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "symphora");

  const [user, prompt] = await Promise.all([
    db
      .collection("users")
      .findOne({ _id: userObjectId }, { projection: { _id: 1 } }),
    db.collection("prompts").findOne(
      { _id: promptObjectId },
      {
        projection: {
          _id: 1,
          aiSettings: 1,
          type: 1,
          pricing: 1,
          promptData: 1,
        },
      }
    ),
  ]);

  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  if (!prompt)
    return NextResponse.json({ error: "prompt not found" }, { status: 404 });

  const now = new Date();

  const doc: any = {
    user: userObjectId,
    prompt: promptObjectId,

    // required by validator
    status: "pending" as GenerationStatus,
    createdAt: now,
    updatedAt: now,

    // optional values
    variableValues: Array.isArray(body.variableValues)
      ? body.variableValues
      : [],
    referenceImages: Array.isArray(body.referenceImages)
      ? body.referenceImages
      : [],

    usedSettings: {
      aspectRatio:
        body.usedSettings?.aspectRatio ||
        prompt?.aiSettings?.aspectRatio ||
        "1:1",
      includeText:
        typeof body.usedSettings?.includeText === "boolean"
          ? body.usedSettings.includeText
          : !!prompt?.aiSettings?.includeText,
    },

    generatedImage: null,

    isPrivate: !!body.isPrivate,
    likes: 0,
    bookmarks: 0,

    completedAt: null,
  };

  // ---- Kev flow: decrypt encrypted segments + inject variables -> encrypt finalPrompt (with TTL)
  function buildFinalPrompt(
    promptDoc: any,
    variableValues: Array<{ variableName: string; value: any }>
  ) {
    const vvMap = new Map<string, any>();
    for (const vv of variableValues || []) vvMap.set(vv.variableName, vv.value);

    const segments = promptDoc?.promptData?.segments ?? [];
    const ordered = [...segments].sort(
      (a, b) => (a?.order ?? 0) - (b?.order ?? 0)
    );

    let out = "";

    for (const seg of ordered) {
      if (seg?.type === "encrypted") {
        const payload = seg.content as EncryptedPayload;

        // New data (encrypted payload)
        if (payload && payload.encrypted && payload.iv && payload.authTag) {
          out += decryptString(payload, "prompts.segments");
        } else {
          // Backward compatibility (plaintext content)
          out +=
            typeof seg.content === "string"
              ? seg.content
              : JSON.stringify(seg.content ?? "");
        }
        continue;
      }

      if (seg?.type === "variable") {
        const v = vvMap.get(seg.variableName);
        out +=
          v === undefined || v === null
            ? ""
            : typeof v === "string"
              ? v
              : JSON.stringify(v);
        continue;
      }
    }

    return out;
  }

  const finalPromptPlain = buildFinalPrompt(prompt, doc.variableValues);

  const ttlHours =
    typeof body.finalPromptTtlHours === "number" && body.finalPromptTtlHours > 0
      ? body.finalPromptTtlHours
      : 24;

  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  doc.finalPrompt = {
    ...encryptString(finalPromptPlain, "generations.finalPrompt"),
    expiresAt,
  };

  try {
    const result = await db.collection("generations").insertOne(doc);
    return NextResponse.json(
      { id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (e: any) {
    if (e?.code === 121) {
      // MongoDB validation error
      console.error("Validation error details:", {
        code: e.code,
        errInfo: JSON.stringify(e.errInfo, null, 2),
        failedFields: e.errInfo?.details,
        documentKeys: Object.keys(doc),
        document: JSON.stringify(doc, null, 2),
      });
      return NextResponse.json(
        {
          error: "Document validation failed",
          details: e.errInfo?.details || e.errInfo?.reason || e.message,
          code: e.code,
          errInfo: e.errInfo,
        },
        { status: 400 }
      );
    }
    console.error("Generation creation error:", e);
    return NextResponse.json(
      { error: "failed to create generation", details: e?.message },
      { status: 500 }
    );
  }
}
