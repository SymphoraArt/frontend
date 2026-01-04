import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;
let db: any = null;

if (process.env.MONGODB_URI) {
  client = new MongoClient(process.env.MONGODB_URI);
  db = client.db();
} else {
  console.warn('⚠️  MONGODB_URI not set. Running in mock mode (no database).');
}

export { client, db };

export async function connectDB() {
  if (!client) {
    console.warn('⚠️  MongoDB not configured. Skipping connection.');
    return;
  }

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed. Continuing without database.');
  }
}