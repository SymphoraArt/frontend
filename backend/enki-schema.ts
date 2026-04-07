/**
 * MongoDB Enki schema types – aligned with your collection structures.
 * Use these for prompts, generations, users, and leaderboard.
 */

import type { ObjectId } from "mongodb";

// ---- Prompt (prompt.txt) ----
export type PromptType = "showcase" | "free" | "paid";

export interface PromptSegment {
  type: "encrypted" | "variable" | "plaintext";
  content: unknown;
  variableName?: string;
  order: number;
}

export interface VariableOption {
  title: string;
  value: string;
  preview?: string;
}

export interface VariableConfig {
  placeholder?: string;
  maxLength?: number;
  options?: VariableOption[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  checkedValue?: string;
  uncheckedValue?: string;
}

export interface PromptVariable {
  name: string;
  description?: string;
  type: "text" | "multiselect" | "singleselect" | "slider" | "checkbox";
  required: boolean;
  config?: VariableConfig;
  defaultValue: unknown;
  order: number;
}

export interface PromptPromptData {
  segments: PromptSegment[];
  variables: PromptVariable[];
}

export interface ShowcaseImageUsedVar {
  variableName: string;
  value: unknown;
}

export interface ShowcaseImage {
  url: string;
  thumbnail?: string;
  usedVariables?: ShowcaseImageUsedVar[];
  isPrimary?: boolean;
}

export interface PromptStats {
  totalGenerations: number;
  bookmarks: number;
  likes: number;
  reviews: {
    total: number;
    averageRating: number;
    distribution: { 5?: number; 4?: number; 3?: number; 2?: number; 1?: number };
  };
}

export interface EnkiPrompt {
  _id?: ObjectId;
  creator: ObjectId | string; // User _id or wallet address
  type: PromptType;
  title: string;
  description?: string;
  category: string;
  aiSettings?: {
    aspectRatio?: string;
    includeText?: boolean;
  };
  promptData: PromptPromptData;
  pricing?: {
    pricePerGeneration: number;
  };
  showcaseImages?: ShowcaseImage[];
  stats?: PromptStats;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  isFeatured?: boolean;
}

// ---- Generation (generations.txt) ----
export interface GenVariableValue {
  variableName: string;
  value: unknown;
}

export interface GenReferenceImage {
  url: string;
  uploadedAt: Date;
}

export interface GenFinalPrompt {
  encrypted: string;
  iv: string;
  authTag: string;
  expiresAt?: Date;
}

export interface GenGeneratedImage {
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  format?: string;
}

export interface GenTransaction {
  txHash: string;
  chain: string;
  amount: number;
  currency: string;
  status: string;
  timestamp: Date;
}

export interface GenError {
  message: string;
  occurredAt: Date;
}

export interface EnkiGeneration {
  _id?: ObjectId;
  user: ObjectId | string;
  prompt: ObjectId | string;
  variableValues?: GenVariableValue[];
  referenceImages?: GenReferenceImage[];
  finalPrompt?: GenFinalPrompt;
  generatedImage?: GenGeneratedImage;
  usedSettings?: {
    aspectRatio?: string;
    includeText?: boolean;
  };
  transaction?: GenTransaction;
  status: "pending" | "processing" | "completed" | "failed";
  error?: GenError;
  isPrivate?: boolean;
  likes?: number;
  bookmarks?: number;
  createdAt: Date;
  completedAt?: Date;
}

// ---- User (User_collection.txt) ----
export interface WalletAddressEntry {
  chainId: number;
  chain: string;
  address: { encrypted: string; iv: string; authTag: string };
  isPrimary?: boolean;
  addedAt: Date;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface UserProfile {
  username?: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  banner?: string;
  socialLinks?: SocialLink[];
}

export interface UserStats {
  totalCreations?: number;
  totalEarnings?: number;
  totalSpent?: number;
  showcasePrompts?: number;
  freePrompts?: number;
  paidPrompts?: number;
  totalGenerations?: number;
  followerCount?: number;
  followingCount?: number;
  followers?: (ObjectId | string)[];
  reviewStats?: {
    reviewsWritten?: number;
    reviewsReceived?: number;
    averageRating?: number;
    ratingDistribution?: { 1?: number; 2?: number; 3?: number; 4?: number; 5?: number };
  };
  lastCalculated?: Date;
  calculationVersion?: number;
}

export interface EnkiUser {
  _id?: ObjectId;
  walletAddresses?: WalletAddressEntry[];
  profile?: UserProfile;
  stats?: UserStats;
  sellerProfile?: {
    isActive?: boolean;
    isSuspended?: boolean;
    suspensionReason?: string;
    suspendedUntil?: Date;
    rating?: number;
    totalSales?: number;
    totalReviews?: number;
    responseTime?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
  lastActive?: Date;
}

// ---- Seller Ranking Leaderboard ----
export interface LeaderboardMetrics {
  revenue: number;
  sales: number;
  averageRating: number;
  totalGenerations: number;
}

export interface LeaderboardEntry {
  seller: ObjectId | string;
  metrics: LeaderboardMetrics;
}

export interface EnkiLeaderboard {
  _id?: ObjectId;
  period: string;
  date: Date;
  category: string;
  rankings: LeaderboardEntry[];
  updatedAt: Date;
}

// ---- Prompt like (per-user, for "Like" on prompt) ----
export interface PromptLike {
  _id?: ObjectId;
  promptId: ObjectId | string;
  userId: ObjectId | string; // wallet address or User _id
  createdAt: Date;
}
