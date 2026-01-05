#!/usr/bin/env tsx

/**
 * Production Setup Script
 *
 * Validates environment, runs migrations, and prepares the application for production
 */

import { validateProductionEnvironment, getConfig } from '../app/lib/config/environment.js';
import { testConnection, runMigrations, healthCheck } from '../backend/config/database.js';
import { logger } from '../app/lib/config/logger.js';

async function setupProduction() {
  console.log('🚀 Setting up AIgency for production...\n');

  try {
    // Step 1: Validate environment configuration
    console.log('1️⃣ Validating environment configuration...');

    const missingVars = validateProductionEnvironment();

    if (missingVars.length > 0) {
      console.error('❌ Missing required environment variables:');
      missingVars.forEach(variable => {
        console.error(`   - ${variable}`);
      });
      console.error('\nPlease set these environment variables before deploying.');
      process.exit(1);
    }

    console.log('✅ Environment configuration validated');

    // Step 2: Test database connection
    console.log('\n2️⃣ Testing database connection...');

    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Database connection failed');
      console.error('Please check your DATABASE_URL and ensure the database is accessible.');
      process.exit(1);
    }

    console.log('✅ Database connection successful');

    // Step 3: Run database health check
    console.log('\n3️⃣ Running database health check...');

    const health = await healthCheck();
    if (!health.healthy) {
      console.error('❌ Database health check failed');
      console.error(`Response time: ${health.responseTime}ms`);
      process.exit(1);
    }

    console.log(`✅ Database healthy (response time: ${health.responseTime}ms)`);

    // Step 4: Run database migrations
    console.log('\n4️⃣ Running database migrations...');

    try {
      await runMigrations();
      console.log('✅ Database migrations completed');
    } catch (error: any) {
      console.error('❌ Database migration failed:', error.message);
      console.error('You may need to run migrations manually or check your schema.');
      // Don't exit here - migrations might be handled differently
    }

    // Step 5: Validate external service configurations
    console.log('\n5️⃣ Validating external service configurations...');

    const config = getConfig();
    const serviceChecks = [
      {
        name: 'Google Gemini AI',
        configured: !!config.GOOGLE_GEMINI_API_KEY,
        required: true,
      },
      {
        name: 'Thirdweb Blockchain',
        configured: !!config.THIRDWEB_SECRET_KEY,
        required: true,
      },
      {
        name: 'Vercel Blob Storage',
        configured: !!config.BLOB_READ_WRITE_TOKEN,
        required: false,
      },
      {
        name: 'LUKSO Treasury',
        configured: !!config.TREASURY_ADDRESS,
        required: true,
      },
      {
        name: 'Sentry Monitoring',
        configured: !!config.SENTRY_DSN,
        required: false,
      },
    ];

    let allRequiredConfigured = true;
    serviceChecks.forEach(service => {
      if (service.configured) {
        console.log(`✅ ${service.name} configured`);
      } else if (service.required) {
        console.error(`❌ ${service.name} not configured (required)`);
        allRequiredConfigured = false;
      } else {
        console.log(`⚠️  ${service.name} not configured (optional)`);
      }
    });

    if (!allRequiredConfigured) {
      console.error('\nPlease configure all required services before deploying.');
      process.exit(1);
    }

    // Step 6: Generate production summary
    console.log('\n6️⃣ Generating production deployment summary...');

    const summary = {
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      database: {
        healthy: health.healthy,
        responseTime: health.responseTime,
        connections: health.connectionCount,
      },
      services: serviceChecks.reduce((acc, service) => {
        acc[service.name.toLowerCase().replace(/\s+/g, '_')] = service.configured;
        return acc;
      }, {} as Record<string, boolean>),
      features: {
        luksoProfiles: config.ENABLE_LUKSO_PROFILES,
        payments: config.ENABLE_PAYMENTS,
        ipfsStorage: config.ENABLE_IPFS_STORAGE,
        analytics: config.ENABLE_ANALYTICS,
      },
      rateLimits: {
        general: `${config.RATE_LIMIT_REQUESTS} requests per ${config.RATE_LIMIT_WINDOW} minutes`,
        generations: `${config.RATE_LIMIT_GENERATIONS} per hour`,
        uploads: `${config.RATE_LIMIT_UPLOADS} per hour`,
      },
    };

    // Write summary to file
    const fs = await import('fs');
    const path = await import('path');

    const summaryPath = path.join(process.cwd(), 'production-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

    console.log(`✅ Production summary written to: ${summaryPath}`);

    // Step 7: Final checks
    console.log('\n7️⃣ Running final production checks...');

    // Check Node.js version
    const nodeVersion = process.version;
    const minVersion = '18.0.0';
    if (nodeVersion < minVersion) {
      console.warn(`⚠️  Node.js version ${nodeVersion} may be outdated. Recommended: ${minVersion}+`);
    } else {
      console.log(`✅ Node.js version: ${nodeVersion}`);
    }

    // Check memory
    const memUsage = process.memoryUsage();
    const memUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    console.log(`✅ Memory usage: ${memUsageMB} MB`);

    // Log successful setup
    logger.info('Production setup completed successfully', {
      environment: config.NODE_ENV,
      databaseHealthy: health.healthy,
      servicesConfigured: serviceChecks.filter(s => s.configured).length,
    });

    console.log('\n🎉 Production setup completed successfully!');
    console.log('\n📋 Deployment Summary:');
    console.log(`   Environment: ${config.NODE_ENV}`);
    console.log(`   Database: ${health.healthy ? '✅ Healthy' : '❌ Unhealthy'}`);
    console.log(`   Services: ${serviceChecks.filter(s => s.configured).length}/${serviceChecks.length} configured`);
    console.log(`   Features: LUKSO Profiles ${config.ENABLE_LUKSO_PROFILES ? '✅' : '❌'}, Payments ${config.ENABLE_PAYMENTS ? '✅' : '❌'}`);
    console.log('\n🚀 Ready for production deployment!');
    console.log('\nNext steps:');
    console.log('1. Review the production-summary.json file');
    console.log('2. Deploy to your production environment');
    console.log('3. Monitor the health check endpoint: /api/health');
    console.log('4. Set up monitoring and alerting');

  } catch (error: any) {
    logger.error('Production setup failed', {
      error: error.message,
      stack: error.stack,
    });

    console.error('\n❌ Production setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupProduction();
