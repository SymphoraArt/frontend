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
  } catch (error: unknown) {
    console.error('❌ MongoDB connection failed:', error);
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('bad auth') || msg.includes('authentication failed')) {
      console.warn(
        '💡 Tip: If you copied the Atlas connection string, make sure:\n' +
          '  1. You replaced <password> with your actual database user password.\n' +
          '  2. If the password contains special characters (@ # : / ? etc.), URL-encode them (e.g. @ → %40, # → %23).\n' +
          '  3. In .env.local use MONGODB_URI="your-uri" with no extra spaces; the value is read as-is.'
      );
    }
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
    // App collections: core prompt/image data
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ username: 1 }, { unique: true, sparse: true });

    const artistsCollection = db.collection('artists');
    await artistsCollection.createIndex({ username: 1 }, { unique: true, sparse: true });

    const promptsCollection = db.collection('prompts');
    // Used by /api/prompts/by-slug/:slug (and avoids full scans)
    await promptsCollection.createIndex({ slug: 1 }, { sparse: true });
    // Common listing/filtering patterns
    await promptsCollection.createIndex({ createdAt: -1 });
    await promptsCollection.createIndex({ artistId: 1, createdAt: -1 });
    await promptsCollection.createIndex({ price: 1, createdAt: -1 });
    await promptsCollection.createIndex({ category: 1, createdAt: -1 });
    await promptsCollection.createIndex({ tags: 1 });

    const variablesCollection = db.collection('variables');
    await variablesCollection.createIndex({ promptId: 1, position: 1 });

    const artworksCollection = db.collection('artworks');
    await artworksCollection.createIndex({ artistId: 1, createdAt: -1 });
    await artworksCollection.createIndex({ isPublic: 1, createdAt: -1 });

    const generatedVariationsCollection = db.collection('generated_variations');
    await generatedVariationsCollection.createIndex({ artworkId: 1, createdAt: -1 });
    await generatedVariationsCollection.createIndex({ userId: 1, createdAt: -1 });

    const artworkCommentsCollection = db.collection('artwork_comments');
    await artworkCommentsCollection.createIndex({ artworkId: 1, createdAt: -1 });

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

    // Generated images (creator, prompt, showroom)
    const generatedImagesCollection = db.collection('generated_images');
    await generatedImagesCollection.createIndex({ creatorId: 1, createdAt: -1 });
    await generatedImagesCollection.createIndex({ promptId: 1, createdAt: -1 });
    await generatedImagesCollection.createIndex({ showroomPublished: 1, createdAt: -1 });
    await generatedImagesCollection.createIndex({ createdAt: -1 });

    // Image comments
    const imageCommentsCollection = db.collection('image_comments');
    await imageCommentsCollection.createIndex({ imageId: 1, createdAt: -1 });

    // Image likes (one like per user per image)
    const imageLikesCollection = db.collection('image_likes');
    await imageLikesCollection.createIndex({ imageId: 1, userId: 1 }, { unique: true });
    await imageLikesCollection.createIndex({ imageId: 1 });

    // Image ratings (one rating per user per image)
    const imageRatingsCollection = db.collection('image_ratings');
    await imageRatingsCollection.createIndex({ imageId: 1, userId: 1 }, { unique: true });
    await imageRatingsCollection.createIndex({ imageId: 1 });

    // ---- Symphora: prompts (marketplace = paid/free, showroom = showcase) ----
    const symphoraPrompts = db.collection('symphora_prompts');
    await symphoraPrompts.createIndex({ type: 1, createdAt: -1 });
    await symphoraPrompts.createIndex({ type: 1, category: 1, createdAt: -1 });
    await symphoraPrompts.createIndex({ creator: 1, createdAt: -1 });
    await symphoraPrompts.createIndex({ 'stats.likes': -1, createdAt: -1 });
    await symphoraPrompts.createIndex({ isFeatured: 1, type: 1 }, { sparse: true });

    // Symphora: generations (user gallery, by prompt)
    const symphoraGenerations = db.collection('symphora_generations');
    await symphoraGenerations.createIndex({ user: 1, createdAt: -1 });
    await symphoraGenerations.createIndex({ prompt: 1, createdAt: -1 });
    await symphoraGenerations.createIndex({ status: 1, createdAt: -1 });

    // Symphora: prompt likes (one like per user per prompt)
    const symphoraPromptLikes = db.collection('symphora_prompt_likes');
    await symphoraPromptLikes.createIndex({ promptId: 1, userId: 1 }, { unique: true });
    await symphoraPromptLikes.createIndex({ promptId: 1 });

    // Symphora: users (by wallet for lookup)
    const symphoraUsers = db.collection('symphora_users');
    await symphoraUsers.createIndex({ 'walletAddresses.address': 1 }, { sparse: true });
    await symphoraUsers.createIndex({ 'profile.username': 1 }, { unique: true, sparse: true });

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