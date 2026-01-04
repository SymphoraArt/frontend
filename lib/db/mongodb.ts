// src/lib/mongodb.ts
import { MongoClient } from "mongodb";

function missingMongoUriError() {
  return new Error("Missing MONGODB_URI in .env.local");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw missingMongoUriError();

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return await global._mongoClientPromise;
  }

  const client = new MongoClient(uri);
  return await client.connect();
}

export default getMongoClient;
