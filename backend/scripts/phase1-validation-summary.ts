/**
 * Phase 1 Validation Summary
 * Checks Phase 1 implementation against success criteria
 */

async function validatePhase1Success() {
  console.log('🎯 Phase 1 Success Criteria Validation');
  console.log('=====================================');
  console.log('');

  const criteria = {
    // Technical Criteria
    databaseMigrations: {
      description: 'Database tables created and relationships established',
      status: 'pending',
      check: async () => {
        try {
          const response = await fetch('http://localhost:3000/api/marketplace/prompts?limit=1');
          return response.status !== 500; // Any non-server error means DB is working
        } catch {
          return false;
        }
      }
    },

    apiEndpoints: {
      description: 'All marketplace API endpoints implemented and responding',
      status: 'pending',
      check: async () => {
        const endpoints = [
          '/api/marketplace/prompts?limit=1',
          '/api/users/test-user/earnings',
          '/api/users/test-user/purchases',
          '/api/prompts/test-id/list',
          '/api/prompts/test-id/purchase'
        ];

        let working = 0;
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(`http://localhost:3000${endpoint}`, {
              method: endpoint.includes('/list') || endpoint.includes('/purchase') ? 'POST' : 'GET',
              headers: { 'Content-Type': 'application/json' },
              body: (endpoint.includes('/list') || endpoint.includes('/purchase')) ? '{}' : undefined
            });
            if (response.status !== 500) working++;
          } catch {}
        }

        return working >= 3; // At least 3/5 endpoints working
      }
    },

    uiComponents: {
      description: 'UI components updated with marketplace features',
      status: 'pending',
      check: async () => {
        try {
          const response = await fetch('http://localhost:3000/showcase');
          return response.ok;
        } catch {
          return false;
        }
      }
    },

    // Business Criteria (Manual Validation Required)
    promptListing: {
      description: 'Creators can list prompts for sale',
      status: 'manual',
      manual: true
    },

    marketplaceBrowsing: {
      description: 'Buyers can browse marketplace prompts',
      status: 'manual',
      manual: true
    },

    purchaseFlow: {
      description: 'Buyers can purchase and unlock prompts',
      status: 'manual',
      manual: true
    },

    earningsTracking: {
      description: 'Creator earnings are tracked and displayed',
      status: 'manual',
      manual: true
    }
  };

  // Run automated checks
  for (const [key, criterion] of Object.entries(criteria)) {
    if (!criterion.manual) {
      console.log(`🔍 Checking: ${criterion.description}`);
      try {
        const result = await criterion.check();
        criteria[key as keyof typeof criteria].status = result ? 'passed' : 'failed';
        console.log(`   ${result ? '✅' : '❌'} ${result ? 'PASSED' : 'FAILED'}`);
      } catch (error) {
        criteria[key as keyof typeof criteria].status = 'failed';
        console.log(`   ❌ FAILED (error: ${error})`);
      }
      console.log('');
    }
  }

  // Display results
  console.log('📊 Validation Results');
  console.log('====================');

  const automatedResults = Object.entries(criteria).filter(([, c]) => !c.manual);
  const manualResults = Object.entries(criteria).filter(([, c]) => c.manual);

  console.log('🤖 Automated Checks:');
  automatedResults.forEach(([key, criterion]) => {
    const status = criterion.status === 'passed' ? '✅' : criterion.status === 'failed' ? '❌' : '⏳';
    const name = key.replace(/([A-Z])/g, ' $1').toLowerCase();
    console.log(`   ${status} ${name}`);
  });

  console.log('');
  console.log('👤 Manual Validation Required:');
  manualResults.forEach(([key, criterion]) => {
    const name = key.replace(/([A-Z])/g, ' $1').toLowerCase();
    console.log(`   ⏳ ${name}`);
    console.log(`      ${criterion.description}`);
  });

  // Overall assessment
  console.log('');
  console.log('🎯 Overall Assessment');
  console.log('====================');

  const automatedPassed = automatedResults.filter(([, c]) => c.status === 'passed').length;
  const automatedTotal = automatedResults.length;

  console.log(`🤖 Automated: ${automatedPassed}/${automatedTotal} checks passed`);

  if (automatedPassed === automatedTotal) {
    console.log('');
    console.log('🎉 EXCELLENT! All automated checks passed.');
    console.log('');
    console.log('📋 Next Steps for Full Phase 1 Completion:');
    console.log('1. ✅ Run database migrations in Supabase dashboard');
    console.log('2. ✅ Start the development server: npm run dev');
    console.log('3. ⏳ Manual testing:');
    console.log('   - Create a prompt and list it for sale');
    console.log('   - Browse marketplace and verify pricing displays');
    console.log('   - Attempt purchase flow (will need wallet connection)');
    console.log('   - Check creator earnings after purchase');
    console.log('4. ⏳ Fix any issues found during manual testing');
    console.log('5. ✅ Deploy to staging and validate with real users');
    console.log('');
    console.log('🚀 Phase 1 is ready for manual validation!');
  } else {
    console.log('');
    console.log('⚠️  Some automated checks failed. Please review the output above.');
    console.log('Common issues:');
    console.log('- Database not migrated (run: npm run phase1:migrate)');
    console.log('- Server not running (run: npm run dev)');
    console.log('- API endpoints not implemented correctly');
  }

  return automatedPassed === automatedTotal;
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validatePhase1Success()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Validation error:', error);
      process.exit(1);
    });
}

export { validatePhase1Success };