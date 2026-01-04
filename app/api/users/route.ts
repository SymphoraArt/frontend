import { NextResponse } from "next/server";
import getMongoClient from "@/lib/db/mongodb";

type CreateUserBody = {
  username?: string;
  displayName?: string;
  bio?: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username"); 
  const limit = Math.min(Number(searchParams.get("limit") || "20"), 50);

  let client;
  try {
    client = await getMongoClient();
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `MongoDB not configured: ${message}` },
      { status: 503 }
    );
  }
  const db = client.db(process.env.MONGODB_DB);

  const query: any = {};
  if (username) query["profile.username"] = username;

  const users = await db
    .collection("users")
    .find(query, {
      projection: {
        walletAddresses: 0,
      },
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  const body = (await req.json()) as CreateUserBody;

  if (!body.username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  const now = new Date();

  const doc = {
    walletAddresses: [],
    profile: {
      username: body.username,
      displayName: body.displayName || body.username,
      bio: body.bio || "",
      avatar: "",
      banner: "",
      socialLinks: [],
    },
    stats: {
      totalCreations: 0,
      totalEarnings: 0,
      totalSpent: 0,
      showcasePrompts: 0,
      freePrompts: 0,
      paidPrompts: 0,
      totalGenerations: 0,
      followerCount: 0,
      followingCount: 0,
      followers: [],
      lastCalculated: now,
      calculationVersion: 1,
    },
    sellerProfile: {
      isActive: false,
      isSuspended: false,
      suspensionReason: "",
      suspendedUntil: null,
      rating: 0,
      totalSales: 0,
      totalReviews: 0,
      responseTime: 0,
      badges: [],
      specialties: [],
    },
    preferences: {},
    createdAt: now,
    updatedAt: now,
    lastActive: now,
  };

  let client;
  try {
    client = await getMongoClient();
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `MongoDB not configured: ${message}` },
      { status: 503 }
    );
  }
  const db = client.db(process.env.MONGODB_DB);

  try {
    const result = await db.collection("users").insertOne(doc);
    return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
  } catch (e: any) {
    if (e?.code === 11000) {
      return NextResponse.json({ error: "username already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "failed to create user" }, { status: 500 });
  }
}
