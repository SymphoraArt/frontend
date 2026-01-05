import { MongoClient, Db } from 'mongodb';
import { reputationSystem } from './reputation-system';

let client: MongoClient | null = null;
let db: Db | null = null;
let isConnected = false;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || 'x402-payments';

if (MONGODB_URI) {
  client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000, // 5 second timeout
    socketTimeoutMS: 45000,
  });
} else {
  console.warn('⚠️  MONGODB_URI not set. Running in mock mode (no database persistence).');
}

export { client, db };

/**
 * Connect to MongoDB with retry logic
 */
export async function connectDB(): Promise<void> {
  if (!client) {
    console.warn('⚠️  MongoDB not configured. Skipping connection.');
    return;
  }

  if (isConnected) {
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    await client.connect();
    db = client.db(DB_NAME);
    isConnected = true;

    console.log(`✅ Connected to MongoDB database: ${DB_NAME}`);

    // Create indexes for better query performance
    await createIndexes();

    // Initialize reputation system with database
    if (db) {
      reputationSystem.initialize(db);
      console.log('✅ Reputation system initialized');
    }
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    console.warn('⚠️  Continuing without database persistence.');
    isConnected = false;
    db = null;
  }
}

/**
 * Create database indexes for optimal performance
 */
async function createIndexes(): Promise<void> {
  if (!db) return;

  try {
    // Payments collection indexes
    const paymentsCollection = db.collection('payments');
    await paymentsCollection.createIndex({ txHash: 1 }, { unique: true, sparse: true });
    await paymentsCollection.createIndex({ userAddress: 1, timestamp: -1 });
    await paymentsCollection.createIndex({ chainId: 1, timestamp: -1 });
    await paymentsCollection.createIndex({ tokenSymbol: 1, timestamp: -1 });

    // Reputation collection indexes
    const reputationCollection = db.collection('reputation');
    await reputationCollection.createIndex({ walletAddress: 1 }, { unique: true });
    await reputationCollection.createIndex({ score: -1 });

    // Risk history collection indexes
    const riskHistoryCollection = db.collection('risk_history');
    await riskHistoryCollection.createIndex({ tokenSymbol: 1, chainKey: 1, timestamp: -1 });
    await riskHistoryCollection.createIndex({ timestamp: -1 });

    console.log('✅ Database indexes created');
  } catch (error) {
    console.warn('⚠️  Failed to create indexes:', error);
  }
}

/**
 * Disconnect from MongoDB gracefully
 */
export async function disconnectDB(): Promise<void> {
  if (client && isConnected) {
    try {
      await client.close();
      isConnected = false;
      db = null;
      console.log('✅ MongoDB connection closed');
    } catch (error) {
      console.error('❌ Error closing MongoDB connection:', error);
    }
  }
}

/**
 * Check if database is connected
 */
export function isDbConnected(): boolean {
  return isConnected;
}

/**
 * Get database instance (returns null if not connected)
 */
export function getDb(): Db | null {
  return db;
}