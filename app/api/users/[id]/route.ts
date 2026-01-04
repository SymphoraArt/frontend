import { NextResponse } from "next/server";
import getMongoClient from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  let _id: ObjectId;
  try {
    _id = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

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
  const db = client.db(process.env.MONGODB_DB || "symphora");

  const user = await db.collection("users").findOne(
    { _id },
    { projection: { walletAddresses: 0 } }
  );

  if (!user) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ user });
}
