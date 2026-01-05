#!/usr/bin/env tsx

/**
 * Comprehensive Test Runner
 *
 * Runs all test suites in the correct order with proper setup
 */

import { execSync, spawn } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';

interface TestResult {
  name: string;
  success: boolean;
  duration: number;
  output?: string;
  error?: string;
}

class TestRunner {
  private results: TestResult[] = [];
  private startTime = Date.now();

  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Comprehensive Test Suite...\n');

    try {
      // 1. Unit Tests
      await this.runUnitTests();

      // 2. Integration Tests
      await this.runIntegrationTests();

      // 3. E2E Tests
      await this.runE2ETests();

      // 4. Performance Tests
      await this.runPerformanceTests();

      // 5. Generate Report
      this.generateReport();

    } catch (error) {
      console.error('❌ Test suite failed:', error);
      process.exit(1);
    }
  }

  private async runUnitTests(): Promise<void> {
    console.log('📝 Running Unit Tests...');

    const testResult = await this.runCommand('npm run test:unit');
    this.results.push({
      name: 'Unit Tests',
      ...testResult,
    });

    if (testResult.success) {
      console.log('✅ Unit tests passed');
    } else {
      console.log('❌ Unit tests failed');
    }
  }

  private async runIntegrationTests(): Promise<void> {
    console.log('\n🔗 Running Integration Tests...');

    const testResult = await this.runCommand('npm run test:integration');
    this.results.push({
      name: 'Integration Tests',
      ...testResult,
    });

    if (testResult.success) {
      console.log('✅ Integration tests passed');
    } else {
      console.log('❌ Integration tests failed');
    }
  }

  private async runE2ETests(): Promise<void> {
    console.log('\n🌐 Running E2E Tests...');

    // Check if Playwright is available
    if (!existsSync(resolve('node_modules/.bin/playwright'))) {
      console.log('⚠️  Playwright not found, installing browsers...');
      execSync('npx playwright install', { stdio: 'inherit' });
    }

    const testResult = await this.runCommand('npm run test:e2e');
    this.results.push({
      name: 'E2E Tests',
      ...testResult,
    });

    if (testResult.success) {
      console.log('✅ E2E tests passed');
    } else {
      console.log('❌ E2E tests failed');
    }
  }

  private async runPerformanceTests(): Promise<void> {
    console.log('\n⚡ Running Performance Tests...');

    const artilleryInstalled = existsSync(resolve('node_modules/.bin/artillery'));
    if (!artilleryInstalled) {
      console.log('⚠️  Artillery not found, skipping load tests');
      return;
    }

    // Run Playwright performance tests
    const playwrightPerfResult = await this.runCommand('npm run test:performance');
    this.results.push({
      name: 'Performance Tests (Playwright)',
      ...playwrightPerfResult,
    });

    // Run Artillery load tests (if backend is running)
    try {
      const artilleryResult = await this.runCommand('npm run test:load');
      this.results.push({
        name: 'Load Tests (Artillery)',
        ...artilleryResult,
      });
    } catch (error) {
      console.log('⚠️  Load tests skipped (backend not running)');
      this.results.push({
        name: 'Load Tests (Artillery)',
        success: true,
        duration: 0,
        output: 'Skipped - backend not running',
      });
    }
  }

  private async runCommand(command: string): Promise<{ success: boolean; duration: number; output?: string; error?: string }> {
    const startTime = Date.now();

    return new Promise((resolve) => {
      try {
        const [cmd, ...args] = command.split(' ');
        const child = spawn(cmd, args, {
          stdio: ['inherit', 'pipe', 'pipe'],
          shell: true,
        });

        let stdout = '';
        let stderr = '';

        child.stdout?.on('data', (data) => {
          stdout += data.toString();
        });

        child.stderr?.on('data', (data) => {
          stderr += data.toString();
        });

        child.on('close', (code) => {
          const duration = Date.now() - startTime;
          const success = code === 0;

          resolve({
            success,
            duration,
            output: stdout,
            error: stderr,
          });
        });

        child.on('error', (error) => {
          const duration = Date.now() - startTime;
          resolve({
            success: false,
            duration,
            error: error.message,
          });
        });

      } catch (error: any) {
        const duration = Date.now() - startTime;
        resolve({
          success: false,
          duration,
          error: error.message,
        });
      }
    });
  }

  private generateReport(): void {
    const totalDuration = Date.now() - this.startTime;
    const passed = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;
    const total = this.results.length;

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUITE RESULTS');
    console.log('='.repeat(60));

    this.results.forEach(result => {
      const status = result.success ? '✅ PASS' : '❌ FAIL';
      const duration = `(${result.duration}ms)`;
      console.log(`${status} ${result.name} ${duration}`);

      if (!result.success && result.error) {
        console.log(`   Error: ${result.error.slice(0, 100)}${result.error.length > 100 ? '...' : ''}`);
      }
    });

    console.log('\n' + '-'.repeat(60));
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${total > 0 ? Math.round((passed / total) * 100) : 0}%`);
    console.log(`Total Duration: ${totalDuration}ms`);
    console.log('='.repeat(60));

    if (failed === 0) {
      console.log('\n🎉 All tests passed! Ready for production.');
    } else {
      console.log(`\n⚠️  ${failed} test suite(s) failed. Please fix before deploying.`);
      process.exit(1);
    }
  }
}

// Update package.json scripts
console.log('📦 Checking package.json test scripts...');

// Check if test scripts exist in package.json
const packageJson = require('../package.json');
const requiredScripts = {
  'test': 'vitest run',
  'test:watch': 'vitest',
  'test:ui': 'vitest --ui',
  'test:unit': 'vitest run backend/services/__tests__/ --reporter=verbose',
  'test:integration': 'vitest run backend/__tests__/ --reporter=verbose',
  'test:e2e': 'playwright test',
  'test:performance': 'playwright test e2e/performance.spec.ts',
  'test:load': 'artillery run performance/generation-load.yml',
  'test:coverage': 'vitest run --coverage',
};

const missingScripts: string[] = [];
for (const [scriptName, scriptCommand] of Object.entries(requiredScripts)) {
  if (!packageJson.scripts?.[scriptName]) {
    missingScripts.push(`${scriptName}: "${scriptCommand}"`);
  }
}

if (missingScripts.length > 0) {
  console.log('⚠️  Missing test scripts in package.json:');
  missingScripts.forEach(script => console.log(`   ${script}`));
  console.log('\nPlease add these scripts to your package.json');
}

// Run the test suite
const runner = new TestRunner();
runner.runAllTests();
