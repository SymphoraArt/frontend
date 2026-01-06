/**
 * Test Script for Google Gemini Image Generation Integration
 *
 * This script tests the Gemini integration with various prompts and configurations.
 * Run with: node -r ts-node/register backend/services/test-gemini.ts
 *
 * Prerequisites:
 * 1. Set GOOGLE_GEMINI_API_KEY environment variable
 * 2. npm install ts-node (if not already installed)
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateImagesWithGemini, detectTextRequirement, estimateGeminiCost } from './gemini-image-generation';
import { generateWithRateLimit, getRateLimiterStats } from './gemini-rate-limiter';
import { generateWithRetry, RETRY_CONFIGS } from './gemini-retry-handler';
import type { ImageGenerationRequest } from './types';

// Test configuration
const OUTPUT_DIR = path.join(__dirname, '../../test-output/gemini');
const ENABLE_RATE_LIMITING = process.env.TEST_WITH_RATE_LIMIT === 'true';
const ENABLE_RETRY = process.env.TEST_WITH_RETRY === 'true';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Test cases for Gemini image generation
 */
const TEST_CASES: Array<{ name: string; request: ImageGenerationRequest }> = [
  {
    name: 'basic-landscape',
    request: {
      prompt: 'A serene mountain landscape at sunset with vibrant orange and purple sky',
      aspectRatio: '16:9',
      numImages: 1
    }
  },
  {
    name: 'text-rendering',
    request: {
      prompt: 'A neon sign that says "AIGENCY" in cyberpunk style with glowing pink and blue letters',
      aspectRatio: '1:1',
      numImages: 1
    }
  },
  {
    name: 'portrait',
    request: {
      prompt: 'Professional headshot portrait of a confident business person, neutral background, studio lighting',
      aspectRatio: '3:4',
      numImages: 1
    }
  },
  {
    name: 'abstract-art',
    request: {
      prompt: 'Abstract geometric patterns with flowing liquid metal effects in gold and silver',
      aspectRatio: '1:1',
      numImages: 1
    }
  },
  {
    name: 'multiple-images',
    request: {
      prompt: 'A cute robot mascot waving hello, friendly and approachable design',
      aspectRatio: '1:1',
      numImages: 2
    }
  }
];

/**
 * Saves image buffer to file
 */
function saveImage(buffer: Buffer, filename: string): string {
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`  ✅ Saved: ${filepath}`);
  return filepath;
}

/**
 * Runs a single test case
 */
async function runTestCase(testCase: { name: string; request: ImageGenerationRequest }) {
  console.log(`\n📸 Test: ${testCase.name}`);
  console.log(`  Prompt: ${testCase.request.prompt.substring(0, 60)}...`);
  console.log(`  Aspect Ratio: ${testCase.request.aspectRatio}`);
  console.log(`  Num Images: ${testCase.request.numImages}`);

  // Check if text rendering is needed
  const needsText = detectTextRequirement(testCase.request.prompt);
  console.log(`  Text Rendering: ${needsText ? 'Yes' : 'No'}`);

  // Estimate cost
  const cost = estimateGeminiCost('gemini-2.5-flash-image', '1K', testCase.request.numImages);
  console.log(`  Estimated Cost: $${cost.toFixed(4)}`);

  try {
    let result;

    if (ENABLE_RATE_LIMITING) {
      console.log('  Using rate-limited generation...');
      result = await generateWithRateLimit(testCase.request);
    } else if (ENABLE_RETRY) {
      console.log('  Using retry-enabled generation...');
      result = await generateWithRetry(
        generateImagesWithGemini,
        testCase.request,
        RETRY_CONFIGS.development
      );
    } else {
      console.log('  Using direct generation...');
      result = await generateImagesWithGemini(testCase.request);
    }

    if (result.success && result.imageBuffers) {
      console.log(`  ✅ SUCCESS (${result.generationTime}ms)`);

      // Save images
      result.imageBuffers.forEach((buffer, index) => {
        const filename = `${testCase.name}-${index + 1}.png`;
        saveImage(buffer, filename);
      });

      // Log metadata
      if (result.metadata) {
        console.log(`  Metadata:`, {
          model: result.metadata.model,
          aspectRatio: result.metadata.aspectRatio,
          finishReason: result.metadata.finishReason
        });
      }

      return { success: true, testCase: testCase.name };
    } else {
      console.log(`  ❌ FAILED: ${result.error}`);
      return { success: false, testCase: testCase.name, error: result.error };
    }
  } catch (error: any) {
    console.error(`  ❌ ERROR: ${error.message}`);
    return { success: false, testCase: testCase.name, error: error.message };
  }
}

/**
 * Runs all test cases
 */
async function runAllTests() {
  console.log('🚀 Starting Gemini Image Generation Tests\n');
  console.log('Configuration:');
  console.log(`  API Key: ${process.env.GOOGLE_GEMINI_API_KEY ? '✅ Set' : '❌ Not set'}`);
  console.log(`  Rate Limiting: ${ENABLE_RATE_LIMITING ? 'Enabled' : 'Disabled'}`);
  console.log(`  Retry Logic: ${ENABLE_RETRY ? 'Enabled' : 'Disabled'}`);
  console.log(`  Output Directory: ${OUTPUT_DIR}`);

  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('\n❌ ERROR: GOOGLE_GEMINI_API_KEY environment variable not set');
    console.error('Get your API key from: https://aistudio.google.com/apikey');
    process.exit(1);
  }

  const startTime = Date.now();
  const results = [];

  // Run tests sequentially to avoid rate limiting issues
  for (const testCase of TEST_CASES) {
    const result = await runTestCase(testCase);
    results.push(result);

    // Wait a bit between tests to avoid rate limits
    if (!ENABLE_RATE_LIMITING) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  const totalTime = Date.now() - startTime;

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Summary');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\nTotal Tests: ${results.length}`);
  console.log(`✅ Passed: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏱️  Total Time: ${(totalTime / 1000).toFixed(2)}s`);

  if (failed > 0) {
    console.log('\nFailed Tests:');
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`  - ${r.testCase}: ${r.error}`);
      });
  }

  if (ENABLE_RATE_LIMITING) {
    console.log('\n📊 Rate Limiter Stats:');
    const stats = getRateLimiterStats();
    console.log(stats);
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\nGenerated images saved to: ${OUTPUT_DIR}`);

  process.exit(failed > 0 ? 1 : 0);
}

/**
 * Interactive test mode
 */
async function interactiveTest() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('🎨 Interactive Gemini Test Mode\n');

  const prompt = await new Promise<string>(resolve => {
    rl.question('Enter your prompt: ', resolve);
  });

  const aspectRatio = await new Promise<string>(resolve => {
    rl.question('Aspect ratio (1:1, 16:9, 9:16, 4:3, 3:4) [1:1]: ', (answer: string) => {
      resolve(answer || '1:1');
    });
  });

  const numImages = await new Promise<number>(resolve => {
    rl.question('Number of images (1-4) [1]: ', (answer: string) => {
      resolve(parseInt(answer) || 1);
    });
  });

  rl.close();

  const testCase = {
    name: 'interactive-test',
    request: {
      prompt,
      aspectRatio: aspectRatio as any,
      numImages
    }
  };

  await runTestCase(testCase);
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--interactive') || args.includes('-i')) {
    interactiveTest().catch(console.error);
  } else {
    runAllTests().catch(console.error);
  }
}

export { runTestCase, runAllTests };
