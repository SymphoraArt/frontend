import { test, expect } from '@playwright/test';

test.describe('AI Generation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the generator page
    await page.goto('/generator');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should load the generator interface', async ({ page }) => {
    // Check that the page title is visible
    await expect(page.locator('h1').filter({ hasText: 'AI Image Generator' })).toBeVisible();

    // Check that the prompt header is visible
    await expect(page.locator('h3').filter({ hasText: 'Futuristic Cityscape' })).toBeVisible();

    // Check that variable inputs are present
    await expect(page.locator('label').filter({ hasText: 'Art Style' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Time of Day' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Weather Effects' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Technology Intensity' })).toBeVisible();

    // Check that generation settings are present
    await expect(page.locator('label').filter({ hasText: 'Aspect Ratio' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Number of Images' })).toBeVisible();

    // Check that the generate button is present
    await expect(page.locator('button').filter({ hasText: 'Generate Images' })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to generate without filling required fields
    await page.locator('button').filter({ hasText: 'Generate Images' }).click();

    // Should show validation error
    await expect(page.locator('text=Validation Error')).toBeVisible();
    await expect(page.locator('text=Art Style is required')).toBeVisible();
  });

  test('should handle variable input interactions', async ({ page }) => {
    // Test select dropdown
    await page.locator('button').filter({ hasText: 'Select Art Style' }).click();
    await page.locator('text=Cyberpunk').click();
    await expect(page.locator('button').filter({ hasText: 'Cyberpunk' })).toBeVisible();

    // Test multi-select checkboxes
    await page.locator('text=Rain').check();
    await page.locator('text=Lightning').check();
    await expect(page.locator('span').filter({ hasText: 'Rain' })).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Lightning' })).toBeVisible();

    // Test slider interaction
    const slider = page.locator('input[type="range"]');
    await slider.fill('8');
    await expect(page.locator('text=8')).toBeVisible();

    // Test text input
    await page.locator('input[placeholder*="building"]').fill('skyscrapers, drones, neon lights');
    await expect(page.locator('input[placeholder*="building"]')).toHaveValue('skyscrapers, drones, neon lights');
  });

  test('should handle generation settings', async ({ page }) => {
    // Change aspect ratio
    await page.locator('button').filter({ hasText: 'Square (1:1)' }).click();
    await page.locator('text=Landscape (16:9)').click();
    await expect(page.locator('button').filter({ hasText: 'Landscape (16:9)' })).toBeVisible();

    // Change number of images
    await page.locator('button').filter({ hasText: '1 Image' }).click();
    await page.locator('text=2 Images').click();
    await expect(page.locator('button').filter({ hasText: '2 Images' })).toBeVisible();

    // Change AI model
    await page.locator('button').filter({ hasText: 'Gemini Pro Vision' }).click();
    await page.locator('text=Gemini 1.5 Pro').click();
    await expect(page.locator('button').filter({ hasText: 'Gemini 1.5 Pro' })).toBeVisible();
  });

  test('should handle free generation flow', async ({ page }) => {
    // Mock the API responses for free generation
    await page.route('**/api/generations', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'gen-123',
            status: 'pending',
            createdAt: new Date().toISOString(),
          }),
        });
      }
    });

    await page.route('**/api/generations/gen-123', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'gen-123',
          status: 'completed',
          imageUrls: [
            'https://example.com/image1.png',
            'https://example.com/image2.png',
          ],
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        }),
      });
    });

    // Fill required fields
    await page.locator('button').filter({ hasText: 'Select Art Style' }).click();
    await page.locator('text=Cyberpunk').click();

    await page.locator('button').filter({ hasText: 'Select Time of Day' }).click();
    await page.locator('text=Night').click();

    // Submit generation
    await page.locator('button').filter({ hasText: 'Generate Images' }).click();

    // Should show generation started message
    await expect(page.locator('text=Generation Started')).toBeVisible();
    await expect(page.locator('text=Your AI images are being generated')).toBeVisible();

    // Should show status polling
    await expect(page.locator('text=Generation Status')).toBeVisible();

    // Wait for completion (mock API will return completed status)
    await page.waitForTimeout(1000); // Give time for polling

    // Should show completed generation
    await expect(page.locator('text=Generation Complete!')).toBeVisible();
    await expect(page.locator('text=Successfully generated 2 images')).toBeVisible();

    // Should show generated images
    await expect(page.locator('img')).toHaveCount(2);
  });

  test('should handle paid generation flow', async ({ page }) => {
    // Mock a paid prompt
    await page.evaluate(() => {
      // Override the prompt data to include pricing
      (window as any).mockPrompt = {
        id: 'paid-prompt-123',
        title: 'Premium Art Generation',
        description: 'High-quality AI art generation',
        price: '0.5',
        creatorAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        variables: [
          {
            id: 'style',
            name: 'style',
            type: 'select',
            label: 'Art Style',
            required: true,
            options: [
              { label: 'Premium', promptValue: 'premium' },
              { label: 'Ultra Premium', promptValue: 'ultra-premium' },
            ],
          },
        ],
      };
    });

    // Mock payment modal interactions
    await page.route('**/api/payments/calculate*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          lyxAmount: '0.5',
          platformFee: '0.015',
          totalLYX: '0.515',
          usdEquivalent: 0.515 * 10, // Mock conversion
        }),
      });
    });

    // Fill required fields
    await page.locator('button').filter({ hasText: 'Select Art Style' }).click();
    await page.locator('text=Premium').click();

    // Submit generation - should show payment modal
    await page.locator('button').filter({ hasText: 'Generate Images' }).click();

    // Should show payment modal
    await expect(page.locator('text=Complete Payment')).toBeVisible();
    await expect(page.locator('text=Payment Summary')).toBeVisible();
    await expect(page.locator('text=0.5 LYX')).toBeVisible();
    await expect(page.locator('text=0.515 LYX')).toBeVisible();

    // Mock payment verification
    await page.route('**/api/payments/verify', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          verified: true,
          amountPaid: '0.515',
          transactionHash: '0x1234567890abcdef',
        }),
      });
    });

    // Enter transaction hash and verify
    await page.locator('input[placeholder="0x..."]').fill('0x1234567890abcdef');
    await page.locator('button').filter({ hasText: 'Verify Payment' }).click();

    // Should show verification success
    await expect(page.locator('text=Payment Verified!')).toBeVisible();
    await expect(page.locator('text=Payment verified! 0.515 LYX received')).toBeVisible();

    // Modal should close and show generation flow
    await expect(page.locator('text=Generation Started')).toBeVisible();
  });

  test('should handle generation errors', async ({ page }) => {
    // Mock API error
    await page.route('**/api/generations', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'AI service temporarily unavailable',
          }),
        });
      }
    });

    // Fill required fields and submit
    await page.locator('button').filter({ hasText: 'Select Art Style' }).click();
    await page.locator('text=Cyberpunk').click();

    await page.locator('button').filter({ hasText: 'Select Time of Day' }).click();
    await page.locator('text=Night').click();

    await page.locator('button').filter({ hasText: 'Generate Images' }).click();

    // Should show error message
    await expect(page.locator('text=Generation Failed')).toBeVisible();
    await expect(page.locator('text=AI service temporarily unavailable')).toBeVisible();
  });

  test('should be mobile responsive', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();

    // Check that mobile layout works
    await expect(page.locator('h1').filter({ hasText: 'AI Image Generator' })).toBeVisible();

    // Check that inputs are touch-friendly
    const inputs = page.locator('input, button, select');
    await expect(inputs.first()).toBeVisible();

    // Check that images display properly on mobile
    // (This would be tested after a successful generation)
  });

  test('should handle network connectivity issues', async ({ page }) => {
    // Mock network failure
    await page.route('**/api/generations', async route => {
      await route.abort();
    });

    // Fill required fields and submit
    await page.locator('button').filter({ hasText: 'Select Art Style' }).click();
    await page.locator('text=Cyberpunk').click();

    await page.locator('button').filter({ hasText: 'Select Time of Day' }).click();
    await page.locator('text=Night').click();

    await page.locator('button').filter({ hasText: 'Generate Images' }).click();

    // Should show network error
    await expect(page.locator('text=Generation Failed')).toBeVisible();
    await expect(page.locator('text=Failed to create generation')).toBeVisible();
  });
});
