/**
 * Health Check API
 *
 * Comprehensive health checks for all system components
 */

import { NextResponse } from 'next/server';

// Force dynamic rendering - don't try to statically generate this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { getConfig, validateProductionEnvironment } from '../../lib/config/environment';
import { healthCheck as dbHealthCheck } from '../../../backend/config/database';
import { logger } from '../../lib/config/logger';

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  services: {
    database: ServiceHealth;
    ai: ServiceHealth;
    blockchain: ServiceHealth;
    storage: ServiceHealth;
    external: ServiceHealth;
  };
  metrics: {
    memory: NodeJS.MemoryUsage;
    cpu?: any;
  };
  config: {
    valid: boolean;
    missingVars: string[];
  };
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
  details?: Record<string, any>;
  error?: string;
}

async function checkDatabaseHealth(): Promise<ServiceHealth> {
  // Skip database check during build
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build';
  if (isBuildTime) {
    return {
      status: 'healthy',
      details: { buildTime: true },
    };
  }

  try {
    const startTime = Date.now();
    const health = await dbHealthCheck();
    const responseTime = Date.now() - startTime;

    if (health.healthy) {
      return {
        status: 'healthy',
        responseTime,
        details: {
          connectionCount: health.connectionCount,
        },
      };
    } else {
      return {
        status: 'unhealthy',
        responseTime,
        error: 'Database connection failed',
      };
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      status: 'unhealthy',
      error: errorMessage,
    };
  }
}

async function checkAIServiceHealth(): Promise<ServiceHealth> {
  try {
    const config = getConfig();

    // Basic check - API key is configured
    if (!config.GOOGLE_GEMINI_API_KEY) {
      return {
        status: 'unhealthy',
        error: 'Gemini API key not configured',
      };
    }

    // TODO: Add actual API health check
    // For now, just check configuration
    return {
      status: 'healthy',
      details: {
        provider: 'google-gemini',
        configured: true,
      },
    };
  } catch (error: unknown) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function checkBlockchainHealth(): Promise<ServiceHealth> {
  try {
    const config = getConfig();

    // Basic check - Thirdweb key is configured
    if (!config.THIRDWEB_SECRET_KEY) {
      return {
        status: 'unhealthy',
        error: 'Thirdweb API key not configured',
      };
    }

    // TODO: Add actual RPC health check
    return {
      status: 'healthy',
      details: {
        provider: 'thirdweb',
        network: 'lukso',
        configured: true,
      },
    };
  } catch (error: unknown) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function checkStorageHealth(): Promise<ServiceHealth> {
  try {
    const config = getConfig();

    // Check Vercel Blob configuration
    const blobConfigured = !!config.BLOB_READ_WRITE_TOKEN;

    // TODO: Add actual storage health checks
    return {
      status: blobConfigured ? 'healthy' : 'degraded',
      details: {
        blobStorage: blobConfigured,
        ipfsGateway: config.IPFS_GATEWAY_URL,
      },
    };
  } catch (error: unknown) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function checkExternalServicesHealth(): Promise<ServiceHealth> {
  try {
    const results = await Promise.allSettled([
      // Check external APIs (add more as needed)
      fetch('https://api.coingecko.com/api/v3/ping', { signal: AbortSignal.timeout(5000) }).then(r => r.ok),
    ]);

    const healthy = results.every(result =>
      result.status === 'fulfilled' && result.value === true
    );

    return {
      status: healthy ? 'healthy' : 'degraded',
      details: {
        externalAPIs: results.length,
        healthyAPIs: results.filter(r => r.status === 'fulfilled' && r.value).length,
      },
    };
  } catch (error: unknown) {
    return {
      status: 'degraded',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function getOverallStatus(services: Record<string, ServiceHealth>): 'healthy' | 'degraded' | 'unhealthy' {
  const statuses = Object.values(services).map(s => s.status);

  if (statuses.includes('unhealthy')) {
    return 'unhealthy';
  }

  if (statuses.includes('degraded')) {
    return 'degraded';
  }

  return 'healthy';
}

export async function GET(request: Request) {
  const startTime = Date.now();

  // Skip health checks during build time
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-development-build' ||
                      process.env.NODE_ENV === undefined;
  
  if (isBuildTime) {
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: 'build',
      uptime: 0,
      services: {
        database: { status: 'healthy' as const, details: { buildTime: true } },
        ai: { status: 'healthy' as const, details: { buildTime: true } },
        blockchain: { status: 'healthy' as const, details: { buildTime: true } },
        storage: { status: 'healthy' as const, details: { buildTime: true } },
        external: { status: 'healthy' as const, details: { buildTime: true } },
      },
      metrics: {
        memory: process.memoryUsage(),
      },
      config: {
        valid: true,
        missingVars: [],
      },
    }, { status: 200 });
  }

  try {
    // Run all health checks in parallel
    const [database, ai, blockchain, storage, external] = await Promise.all([
      checkDatabaseHealth(),
      checkAIServiceHealth(),
      checkBlockchainHealth(),
      checkStorageHealth(),
      checkExternalServicesHealth(),
    ]);

    const services = { database, ai, blockchain, storage, external };
    const overallStatus = getOverallStatus(services);

    const config = getConfig();
    const missingVars = validateProductionEnvironment();

    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: config.NODE_ENV,
      uptime: process.uptime(),
      services,
      metrics: {
        memory: process.memoryUsage(),
      },
      config: {
        valid: missingVars.length === 0,
        missingVars,
      },
    };

    const responseTime = Date.now() - startTime;

    // Log health check results
    logger.info('Health check completed', {
      status: overallStatus,
      responseTime,
      services: Object.fromEntries(
        Object.entries(services).map(([key, service]) => [
          key,
          { status: service.status, error: service.error }
        ])
      ),
    });

    // Return appropriate HTTP status
    const httpStatus = overallStatus === 'healthy' ? 200 :
                      overallStatus === 'degraded' ? 207 : 503;

    return NextResponse.json(healthStatus, {
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache',
        'X-Health-Check-Time': responseTime.toString(),
      },
    });

  } catch (error: unknown) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    logger.error('Health check failed', {
      error: errorMessage,
      responseTime,
    });

    const errorResponse: Partial<HealthStatus> = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: { status: 'unhealthy', error: 'Health check failed' },
        ai: { status: 'unhealthy', error: 'Health check failed' },
        blockchain: { status: 'unhealthy', error: 'Health check failed' },
        storage: { status: 'unhealthy', error: 'Health check failed' },
        external: { status: 'unhealthy', error: 'Health check failed' },
      },
    };

    return NextResponse.json(errorResponse, {
      status: 503,
      headers: {
        'X-Health-Check-Time': responseTime.toString(),
      },
    });
  }
}

// Detailed health check endpoint
export async function POST(request: Request) {
  // Return same as GET but with more detailed information
  return GET(request);
}
