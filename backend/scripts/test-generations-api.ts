#!/usr/bin/env tsx

import { encryptPrompt } from '../encryption.js';

/**
 * Simple test script to verify the generations API works
 */
async function testGenerationsAPI() {
  console.log('🧪 Testing Generations API...\n');

  try {
    // Test 1: Variable substitution (test with plain text for now)
    console.log('1️⃣ Testing variable substitution...');

    // Import the service dynamically to avoid module issues
    const { testUtils } = await import('../services/variable-substitution.js');

    // Test the core formatting logic
    const formatTest = testUtils.formatVariableValue(['red', 'blue']);
    if (formatTest === 'red, blue') {
      console.log('✅ Variable formatting works correctly');
    } else {
      console.log('❌ Variable formatting failed');
      return;
    }

    // Test finding unreplaced variables
    const unreplacedTest = testUtils.findUnreplacedVariables('A [color] [object] in the [color] sky with [size]');
    if (unreplacedTest.length === 3 && unreplacedTest.includes('color') && unreplacedTest.includes('object') && unreplacedTest.includes('size')) {
      console.log('✅ Variable detection works correctly');
    } else {
      console.log('❌ Variable detection failed:', unreplacedTest);
      return;
    }

    // Test 2: API endpoint structure
    console.log('\n2️⃣ Testing API endpoint structure...');

    // Check if the API route files exist and are properly structured
    const fs = await import('fs');
    const path = await import('path');

    const generationsRoute = path.join(process.cwd(), '../app/api/generations/route.ts');
    const individualRoute = path.join(process.cwd(), '../app/api/generations/[id]/route.ts');

    if (fs.existsSync(generationsRoute) && fs.existsSync(individualRoute)) {
      console.log('✅ API route files exist');
    } else {
      console.log('❌ API route files missing');
      return;
    }

    // Test 3: Validation schemas
    console.log('\n3️⃣ Testing validation schemas...');

    const { createGenerationSchema } = await import('../../app/middleware/validation.js');

    const validData = {
      userId: 'test-user',
      promptId: '123e4567-e89b-12d3-a456-426614174000',
      encryptedPrompt: 'test-encrypted-prompt',
      variableValues: [
        { variableName: 'color', value: 'red' }
      ],
      settings: {
        aspectRatio: '1:1',
        numImages: 1
      }
    };

    const validation = createGenerationSchema.safeParse(validData);
    if (validation.success) {
      console.log('✅ Validation schema works correctly');
    } else {
      console.log('❌ Validation schema failed:', validation.error);
      return;
    }

    console.log('\n🎉 All basic tests passed! The generations API foundation is ready.');
    console.log('\nNext steps:');
    console.log('- Run database migrations');
    console.log('- Test with real API calls');
    console.log('- Implement payment verification in Phase 2C');

  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testGenerationsAPI();
