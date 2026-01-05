/**
 * Environment Configuration
 *
 * Centralized environment variable management with validation and defaults
 */

import { z } from 'zod';

// Environment schema validation
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // AI/ML Services
  GOOGLE_GEMINI_API_KEY: z.string(),
  GEMINI_RATE_LIMIT_REQUESTS: z.string().transform(Number).default('50'),
  GEMINI_RATE_LIMIT_WINDOW: z.string().transform(Number).default('60'), // seconds

  // Blockchain/LUKSO
  THIRDWEB_SECRET_KEY: z.string(),
  TREASURY_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  LUKSO_RPC_URL: z.string().url().default('https://42.rpc.thirdweb.com'),
  LUKSO_TESTNET_RPC_URL: z.string().url().default('https://4201.rpc.thirdweb.com'),

  // Storage
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  IPFS_GATEWAY_URL: z.string().url().default('https://api.universalprofile.cloud/ipfs'),

  // External APIs
  LYX_PRICE_API_URL: z.string().url().optional(),
  COINGECKO_API_KEY: z.string().optional(),

  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

  // Security
  JWT_SECRET: z.string().min(32),
  SESSION_SECRET: z.string().min(32),
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost:5000'),

  // Rate Limiting
  RATE_LIMIT_REQUESTS: z.string().transform(Number).default('100'),
  RATE_LIMIT_WINDOW: z.string().transform(Number).default('15'), // minutes
  RATE_LIMIT_GENERATIONS: z.string().transform(Number).default('10'), // per hour
  RATE_LIMIT_UPLOADS: z.string().transform(Number).default('50'), // per hour

  // Monitoring
  SENTRY_DSN: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),

  // Email (future)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Feature Flags
  ENABLE_IPFS_STORAGE: z.string().transform(val => val === 'true').default('false'),
  ENABLE_LUKSO_PROFILES: z.string().transform(val => val === 'true').default('true'),
  ENABLE_PAYMENTS: z.string().transform(val => val === 'true').default('false'),
  ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),
});

export type EnvironmentConfig = z.infer<typeof envSchema>;

/**
 * Validate and parse environment variables
 */
export function validateEnvironment(): EnvironmentConfig {
  try {
    const env = envSchema.parse(process.env);
    console.log('✅ Environment configuration validated');
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:', error.errors);
    } else {
      console.error('❌ Environment validation failed:', error);
    }
    throw new Error('Invalid environment configuration');
  }
}

/**
 * Get current environment configuration
 */
let _config: EnvironmentConfig | null = null;

export function getConfig(): EnvironmentConfig {
  if (!_config) {
    // During build time or when env vars are missing, use safe defaults
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                        process.env.NEXT_PHASE === 'phase-development-build' ||
                        !process.env.DATABASE_URL;
    
    if (isBuildTime) {
      // Create a minimal config for build time
      // Use zod's safeParse with defaults
      const buildDefaults = {
        DATABASE_URL: 'postgresql://localhost:5432/aigency',
        GOOGLE_GEMINI_API_KEY: 'build-time-placeholder',
        THIRDWEB_SECRET_KEY: 'build-time-placeholder',
        TREASURY_ADDRESS: '0x0000000000000000000000000000000000000000',
        JWT_SECRET: 'build-time-placeholder-jwt-secret-min-32-chars-long',
        SESSION_SECRET: 'build-time-placeholder-session-secret-min-32-chars',
        ...process.env,
      };
      
      const result = envSchema.safeParse(buildDefaults);
      if (result.success) {
        _config = result.data;
      } else {
        // Fallback to minimal valid config with proper types
        // Parse with zod to get transformed values, but catch errors
        try {
          _config = envSchema.parse({
            DATABASE_URL: 'postgresql://localhost:5432/aigency',
            GOOGLE_GEMINI_API_KEY: 'build-time-placeholder',
            THIRDWEB_SECRET_KEY: 'build-time-placeholder',
            TREASURY_ADDRESS: '0x0000000000000000000000000000000000000000',
            JWT_SECRET: 'build-time-placeholder-jwt-secret-min-32-chars-long',
            SESSION_SECRET: 'build-time-placeholder-session-secret-min-32-chars',
            ...process.env,
          });
        } catch {
          // If parsing still fails, use a type-safe fallback
          // This should rarely happen, but ensures build doesn't fail
          _config = envSchema.parse({
            DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/aigency',
            GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY || 'build-time-placeholder',
            THIRDWEB_SECRET_KEY: process.env.THIRDWEB_SECRET_KEY || 'build-time-placeholder',
            TREASURY_ADDRESS: process.env.TREASURY_ADDRESS || '0x0000000000000000000000000000000000000000',
            JWT_SECRET: process.env.JWT_SECRET || 'build-time-placeholder-jwt-secret-min-32-chars-long',
            SESSION_SECRET: process.env.SESSION_SECRET || 'build-time-placeholder-session-secret-min-32-chars',
            NODE_ENV: process.env.NODE_ENV || 'production',
            PORT: process.env.PORT || '5000',
            NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
            LOG_LEVEL: process.env.LOG_LEVEL || 'info',
            RATE_LIMIT_REQUESTS: process.env.RATE_LIMIT_REQUESTS || '100',
            RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || '15',
            RATE_LIMIT_GENERATIONS: process.env.RATE_LIMIT_GENERATIONS || '10',
            RATE_LIMIT_UPLOADS: process.env.RATE_LIMIT_UPLOADS || '50',
            ENABLE_IPFS_STORAGE: process.env.ENABLE_IPFS_STORAGE || 'false',
            ENABLE_LUKSO_PROFILES: process.env.ENABLE_LUKSO_PROFILES || 'true',
            ENABLE_PAYMENTS: process.env.ENABLE_PAYMENTS || 'false',
            ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS || 'false',
            GEMINI_RATE_LIMIT_REQUESTS: process.env.GEMINI_RATE_LIMIT_REQUESTS || '50',
            GEMINI_RATE_LIMIT_WINDOW: process.env.GEMINI_RATE_LIMIT_WINDOW || '60',
            CORS_ORIGINS: process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:5000',
          });
        }
      }
    } else {
      _config = validateEnvironment();
    }
  }
  return _config;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getConfig().NODE_ENV === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getConfig().NODE_ENV === 'development';
}

/**
 * Check if running in test environment
 */
export function isTest(): boolean {
  return getConfig().NODE_ENV === 'test';
}

/**
 * Get database configuration
 */
export function getDatabaseConfig() {
  const config = getConfig();
  return {
    url: config.DATABASE_URL,
    supabase: config.SUPABASE_URL ? {
      url: config.SUPABASE_URL,
      serviceRoleKey: config.SUPABASE_SERVICE_ROLE_KEY!,
    } : null,
  };
}

/**
 * Get AI service configuration
 */
export function getAIServiceConfig() {
  const config = getConfig();
  return {
    gemini: {
      apiKey: config.GOOGLE_GEMINI_API_KEY,
      rateLimit: {
        requests: config.GEMINI_RATE_LIMIT_REQUESTS,
        window: config.GEMINI_RATE_LIMIT_WINDOW,
      },
    },
  };
}

/**
 * Get blockchain configuration
 */
export function getBlockchainConfig() {
  const config = getConfig();
  return {
    thirdweb: {
      secretKey: config.THIRDWEB_SECRET_KEY,
    },
    lukso: {
      mainnetRpc: config.LUKSO_RPC_URL,
      testnetRpc: config.LUKSO_TESTNET_RPC_URL,
      treasuryAddress: config.TREASURY_ADDRESS,
    },
  };
}

/**
 * Get storage configuration
 */
export function getStorageConfig() {
  const config = getConfig();
  return {
    blob: config.BLOB_READ_WRITE_TOKEN ? {
      token: config.BLOB_READ_WRITE_TOKEN,
    } : null,
    ipfs: {
      gatewayUrl: config.IPFS_GATEWAY_URL,
    },
  };
}

/**
 * Get rate limiting configuration
 */
export function getRateLimitConfig() {
  const config = getConfig();
  return {
    general: {
      requests: config.RATE_LIMIT_REQUESTS,
      window: config.RATE_LIMIT_WINDOW * 60 * 1000, // convert to milliseconds
    },
    generations: {
      requests: config.RATE_LIMIT_GENERATIONS,
      window: 60 * 60 * 1000, // 1 hour in milliseconds
    },
    uploads: {
      requests: config.RATE_LIMIT_UPLOADS,
      window: 60 * 60 * 1000, // 1 hour in milliseconds
    },
  };
}

/**
 * Get security configuration
 */
export function getSecurityConfig() {
  const config = getConfig();
  return {
    jwt: {
      secret: config.JWT_SECRET,
    },
    session: {
      secret: config.SESSION_SECRET,
    },
    cors: {
      origins: config.CORS_ORIGINS.split(',').map(origin => origin.trim()),
    },
  };
}

/**
 * Get monitoring configuration
 */
export function getMonitoringConfig() {
  const config = getConfig();
  return {
    sentry: config.SENTRY_DSN ? {
      dsn: config.SENTRY_DSN,
    } : null,
    logging: {
      level: config.LOG_LEVEL,
    },
  };
}

/**
 * Get feature flags
 */
export function getFeatureFlags() {
  const config = getConfig();
  return {
    ipfsStorage: config.ENABLE_IPFS_STORAGE,
    luksoProfiles: config.ENABLE_LUKSO_PROFILES,
    payments: config.ENABLE_PAYMENTS,
    analytics: config.ENABLE_ANALYTICS,
  };
}

/**
 * Validate required environment variables for production
 */
export function validateProductionEnvironment(): string[] {
  const config = getConfig();
  const missing: string[] = [];

  // Required for production
  const requiredVars = [
    'DATABASE_URL',
    'GOOGLE_GEMINI_API_KEY',
    'THIRDWEB_SECRET_KEY',
    'TREASURY_ADDRESS',
    'JWT_SECRET',
    'SESSION_SECRET',
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  // Feature-specific requirements
  if (config.ENABLE_PAYMENTS && !config.SUPABASE_SERVICE_ROLE_KEY) {
    missing.push('SUPABASE_SERVICE_ROLE_KEY (required for payments)');
  }

  if (config.ENABLE_IPFS_STORAGE && !config.BLOB_READ_WRITE_TOKEN) {
    missing.push('BLOB_READ_WRITE_TOKEN (required for IPFS storage)');
  }

  if (config.ENABLE_ANALYTICS && !process.env.ANALYTICS_API_KEY) {
    missing.push('ANALYTICS_API_KEY (required for analytics)');
  }

  return missing;
}
