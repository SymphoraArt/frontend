/**
 * Shared Type Definitions
 * Common types used across the codebase to avoid implicit any types
 */

import type { Variable } from './schema';

// ==================== Validation Error Types ====================
// Note: For Zod validation, use z.ZodIssue directly
// This type is for custom validation errors
export interface ValidationError {
  path: (string | number)[];
  message: string;
  code?: string;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

// ==================== Variable Definition Types ====================
export interface VariableDefinition {
  name: string;
  type: 'text' | 'slider' | 'number' | 'checkbox' | 'boolean' | 'single-select' | 'multi-select';
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  options?: string[];
}

// ==================== Database Row Types ====================
export interface PromptPurchaseRow {
  id: string;
  prompt_id: string;
  prompt_title?: string;
  amount_usd_cents: number;
  created_at: string;
  seller_id: string;
  status: string;
}

// Partial types for Supabase queries (only selected fields)
export interface PromptPurchaseSelect {
  prompt_id: string;
  amount_usd_cents: number;
}

export interface PromptPurchaseRecentSelect {
  id: string;
  prompt_id: string;
  prompt_title?: string;
  amount_usd_cents: number;
  created_at: string;
}

export interface TimeSeriesSaleRow {
  created_at: string;
  amount_usd_cents: number;
}

export interface PromptAnalyticsEventRow {
  id: string;
  prompt_id: string;
  event_type: string;
  created_at: string;
  country?: string;
  device_type?: string;
  source?: string;
}

// Partial types for Supabase queries (only selected fields)
export interface PromptAnalyticsEventSelect {
  created_at: string;
  event_type: string;
}

export interface PromptAnalyticsEventDemographicSelect {
  country: string | null;
  device_type: string | null;
  source: string | null;
}

export interface GenerationRow {
  id: string;
  user_id: string;
  prompt_id: string;
  status: string;
  created_at: string;
}

// Partial type for Supabase query (only selected fields)
export interface GenerationSelect {
  id: string;
  status: string;
  created_at: string;
}

export interface ReconciliationTaskRow {
  id: string;
  task_type: string;
  entity_id: string;
  entity_type: string;
  payload: Record<string, unknown>;
  attempt_count: number;
  max_attempts: number;
  status: string;
  error?: string;
  created_at: string;
  updated_at: string;
  next_retry_at?: string;
}

// ==================== Analytics Types ====================
export interface TopPromptData {
  prompt_id: string;
  revenue: number;
  sales: number;
}

export interface TopPrompt {
  promptId: string;
  title: string;
  sales: number;
  revenue: number;
  conversionRate: number;
}

export interface RecentActivity {
  type: 'sale';
  promptTitle: string;
  amount: number;
  timestamp: string;
}

export interface DailyMetrics {
  date: string;
  earnings: number;
  sales: number;
}

export interface DailyMetricRow {
  date: string;
  views: number;
  unlocks: number;
  generations: number;
}

export interface DemographicRow {
  country: string;
  device_type: string;
  source: string;
  count: number;
}

// ==================== Substitution Types ====================
export interface SubstitutionMap {
  [variableName: string]: string | number | boolean | string[];
}

// ==================== Error Types ====================
export type ErrorLike = Error | { message: string } | string | unknown;

// ==================== Chart Data Types ====================
export interface ChartDataPoint {
  date: string;
  views: number;
  unlocks: number;
  generations: number;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
}

export interface RegionData {
  country: string;
  percentage: number;
}

export interface DeviceData {
  device: string;
  percentage: number;
}

// ==================== Filter Types ====================
export interface MarketplaceFilters {
  priceFilter: 'all' | 'free' | 'paid';
  sortBy: string;
  category?: string;
  tags: string[];
}
