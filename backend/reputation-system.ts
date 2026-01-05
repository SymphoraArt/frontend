import type { Db } from "mongodb";

/**
 * Reputation data structure
 */
export interface UserReputation {
  address: string;
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  totalSpent: number; // in USD
  firstPayment: Date;
  lastPayment: Date;
  chains: Record<string, {
    payments: number;
    spent: number;
  }>;
  score: number; // 0-5 stars
  trustLevel: 'New' | 'Active' | 'Trusted' | 'Verified' | 'VIP';
}

/**
 * Reputation System
 * Works across all chains - stores data in MongoDB
 */
export class ReputationSystem {
  private db: Db | null = null;

  /**
   * Initialize with database connection
   */
  initialize(db: Db) {
    this.db = db;
  }

  /**
   * Record a payment (successful or failed)
   */
  async recordPayment(params: {
    address: string;
    chain: string;
    amount: number; // USD amount
    success: boolean;
    category: string;
    timestamp: Date;
  }): Promise<void> {
    if (!this.db) {
      console.error('Reputation system not initialized with database');
      return;
    }

    const { address, chain, amount, success, category, timestamp } = params;

    // Get current reputation or create new
    let reputation = await this.getReputation(address);

    if (!reputation) {
      reputation = {
        address: address.toLowerCase(),
        totalPayments: 0,
        successfulPayments: 0,
        failedPayments: 0,
        totalSpent: 0,
        firstPayment: timestamp,
        lastPayment: timestamp,
        chains: {},
        score: 0,
        trustLevel: 'New',
      };
    }

    // Update counters
    reputation.totalPayments++;
    if (success) {
      reputation.successfulPayments++;
      reputation.totalSpent += amount;
    } else {
      reputation.failedPayments++;
    }

    // Update chain-specific data
    if (!reputation.chains[chain]) {
      reputation.chains[chain] = { payments: 0, spent: 0 };
    }
    reputation.chains[chain].payments++;
    if (success) {
      reputation.chains[chain].spent += amount;
    }

    // Update timestamps
    reputation.lastPayment = timestamp;

    // Calculate score (0-5 stars)
    reputation.score = this.calculateScore(reputation);

    // Determine trust level
    reputation.trustLevel = this.determineTrustLevel(reputation);

    // Save to database
    await this.updateReputation(reputation);
  }

  /**
   * Get reputation for an address
   */
  async getReputation(address: string): Promise<UserReputation | null> {
    if (!this.db) {
      console.error('Reputation system not initialized with database');
      return null;
    }

    const collection = this.db.collection('reputations');

    const doc = await collection.findOne({
      address: address.toLowerCase()
    });

    return doc as UserReputation | null;
  }

  /**
   * Update reputation in database
   */
  private async updateReputation(reputation: UserReputation): Promise<void> {
    if (!this.db) {
      console.error('Reputation system not initialized with database');
      return;
    }

    const collection = this.db.collection('reputations');

    await collection.updateOne(
      { address: reputation.address.toLowerCase() },
      { $set: reputation },
      { upsert: true }
    );
  }

  /**
   * Calculate reputation score (0-5 stars)
   */
  private calculateScore(reputation: UserReputation): number {
    if (reputation.totalPayments === 0) return 0;

    const successRate = reputation.successfulPayments / reputation.totalPayments;
    const paymentCount = reputation.totalPayments;

    // Base score on success rate
    let score = successRate * 5;

    // Penalty for low payment count (need 10+ for full score)
    if (paymentCount < 10) {
      score *= paymentCount / 10;
    }

    // Penalty for failed payments
    if (reputation.failedPayments > 3) {
      score -= 0.5;
    }

    return Math.max(0, Math.min(5, score));
  }

  /**
   * Determine trust level based on reputation
   */
  private determineTrustLevel(reputation: UserReputation): UserReputation['trustLevel'] {
    const { totalPayments, score, totalSpent } = reputation;

    if (totalPayments >= 100 && score >= 4.5 && totalSpent >= 100) {
      return 'VIP';
    } else if (totalPayments >= 50 && score >= 4.0) {
      return 'Verified';
    } else if (totalPayments >= 20 && score >= 3.5) {
      return 'Trusted';
    } else if (totalPayments >= 5) {
      return 'Active';
    } else {
      return 'New';
    }
  }

  /**
   * Get reputation display (stars + badge)
   */
  getReputationDisplay(reputation: UserReputation | null): {
    stars: string;
    badge: string;
    color: string;
  } {
    if (!reputation || reputation.totalPayments === 0) {
      return {
        stars: '☆☆☆☆☆',
        badge: 'New User',
        color: '#gray',
      };
    }

    const fullStars = Math.floor(reputation.score);
    const halfStar = reputation.score % 1 >= 0.5 ? '½' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = '⭐'.repeat(fullStars) +
                  (halfStar ? '⭐️' : '') +
                  '☆'.repeat(emptyStars);

    const badges = {
      'New': { badge: '🌱 New User', color: '#10b981' },
      'Active': { badge: '🔥 Active', color: '#3b82f6' },
      'Trusted': { badge: '✅ Trusted', color: '#8b5cf6' },
      'Verified': { badge: '✓ Verified', color: '#f59e0b' },
      'VIP': { badge: '💎 VIP', color: '#ef4444' },
    };

    return {
      stars,
      ...badges[reputation.trustLevel],
    };
  }

  /**
   * Get VIP discount based on reputation
   */
  getDiscount(reputation: UserReputation | null): number {
    if (!reputation) return 0;

    switch (reputation.trustLevel) {
      case 'VIP':
        return 0.20; // 20% off
      case 'Verified':
        return 0.15; // 15% off
      case 'Trusted':
        return 0.10; // 10% off
      case 'Active':
        return 0.05; // 5% off
      default:
        return 0; // No discount
    }
  }

  /**
   * Get top reputations (leaderboard)
   */
  async getTopReputations(limit: number = 10): Promise<UserReputation[]> {
    if (!this.db) {
      console.error('Reputation system not initialized with database');
      return [];
    }

    const collection = this.db.collection('reputations');

    const docs = await collection
      .find()
      .sort({ score: -1, totalPayments: -1 })
      .limit(limit)
      .toArray();

    return docs as unknown as UserReputation[];
  }
}

/**
 * Singleton instance
 */
export const reputationSystem = new ReputationSystem();
