import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load generator page within performance budget', async ({ page }) => {
    const startTime = Date.now();

    // Navigate to the generator page
    await page.goto('/generator');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Performance budget: page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);

    // Check that critical content is visible quickly
    const titleVisible = await page.locator('h1').filter({ hasText: 'AI Image Generator' }).isVisible();
    expect(titleVisible).toBe(true);

    console.log(`Page load time: ${loadTime}ms`);
  });

  test('should handle rapid generation requests without crashing', async ({ page }) => {
    await page.goto('/generator');

    // Mock rapid API responses
    await page.route('**/api/generations', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: `gen-${Date.now()}`,
            status: 'pending',
            createdAt: new Date().toISOString(),
          }),
        });
      }
    });

    // Fill required fields once
    await page.locator('button').filter({ hasText: 'Select Art Style' }).click();
    await page.locator('text=Cyberpunk').click();

    await page.locator('button').filter({ hasText: 'Select Time of Day' }).click();
    await page.locator('text=Night').click();

    // Rapid fire multiple generation requests
    const requests = [];
    for (let i = 0; i < 5; i++) {
      requests.push(
        page.locator('button').filter({ hasText: 'Generate Images' }).click()
      );
      await page.waitForTimeout(100); // Small delay between clicks
    }

    // Wait for all requests to complete
    await Promise.all(requests);

    // Page should still be functional
    await expect(page.locator('h1').filter({ hasText: 'AI Image Generator' })).toBeVisible();

    // Should not have crashed or become unresponsive
    const generateButton = page.locator('button').filter({ hasText: 'Generate Images' });
    await expect(generateButton).toBeEnabled();
  });

  test('should maintain performance with large variable sets', async ({ page }) => {
    await page.goto('/generator');

    const startTime = Date.now();

    // Simulate a prompt with many variables
    await page.evaluate(() => {
      // This would normally come from the API
      const largePrompt = {
        id: 'large-prompt',
        title: 'Complex Generation',
        description: 'A prompt with many variables',
        variables: Array.from({ length: 20 }, (_, i) => ({
          id: `var-${i}`,
          name: `variable${i}`,
          type: i % 4 === 0 ? 'text' : i % 4 === 1 ? 'select' : i % 4 === 2 ? 'checkbox' : 'slider',
          label: `Variable ${i}`,
          required: i < 15, // First 15 are required
          ...(i % 4 === 1 ? {
            options: [
              { label: `Option ${i}-1`, promptValue: `opt${i}-1` },
              { label: `Option ${i}-2`, promptValue: `opt${i}-2` },
            ]
          } : {}),
          ...(i % 4 === 3 ? { min: 1, max: 10 } : {}),
        })),
      };

      // Update the page with the large prompt
      (window as any).currentPrompt = largePrompt;
    });

    // Wait for UI to update
    await page.waitForTimeout(500);

    // Fill required fields
    for (let i = 0; i < 15; i++) {
      if (i % 4 === 0) {
        // Text input
        await page.locator(`input[name="variable${i}"]`).fill(`Value ${i}`);
      } else if (i % 4 === 1) {
        // Select
        await page.locator(`button[role="combobox"]:has-text("Select Variable ${i}")`).click();
        await page.locator(`text=Option ${i}-1`).click();
      } else if (i % 4 === 2) {
        // Checkbox
        await page.locator(`input[name="variable${i}"]`).check();
      } else {
        // Slider
        await page.locator(`input[name="variable${i}"][type="range"]`).fill('5');
      }
    }

    const setupTime = Date.now() - startTime;

    // Should complete form filling within reasonable time
    expect(setupTime).toBeLessThan(10000); // 10 seconds max

    console.log(`Large form setup time: ${setupTime}ms`);
  });

  test('should handle image gallery performance', async ({ page }) => {
    await page.goto('/generator');

    // Mock generation completion with multiple images
    await page.evaluate(() => {
      // Simulate completed generation with images
      (window as any).mockGeneration = {
        id: 'gen-gallery-test',
        status: 'completed',
        imageUrls: Array.from({ length: 10 }, (_, i) =>
          `https://picsum.photos/400/400?random=${i}`
        ),
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
    });

    const startTime = Date.now();

    // Wait for images to load
    await page.waitForSelector('img', { timeout: 10000 });

    const images = page.locator('img');
    const imageCount = await images.count();

    // Should load all images
    expect(imageCount).toBeGreaterThanOrEqual(10);

    const loadTime = Date.now() - startTime;

    // Should load images within reasonable time
    expect(loadTime).toBeLessThan(15000); // 15 seconds max

    console.log(`Image gallery load time: ${loadTime}ms for ${imageCount} images`);
  });

  test('should maintain responsiveness during polling', async ({ page }) => {
    await page.goto('/generator');

    // Mock generation that takes time to complete
    let pollCount = 0;
    await page.route('**/api/generations/gen-test', async route => {
      pollCount++;
      if (pollCount < 5) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'gen-test',
            status: 'generating',
            createdAt: new Date().toISOString(),
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'gen-test',
            status: 'completed',
            imageUrls: ['https://example.com/image1.png'],
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          }),
        });
      }
    });

    // Start a generation
    await page.locator('button').filter({ hasText: 'Select Art Style' }).click();
    await page.locator('text=Cyberpunk').click();

    await page.locator('button').filter({ hasText: 'Select Time of Day' }).click();
    await page.locator('text=Night').click();

    await page.locator('button').filter({ hasText: 'Generate Images' }).click();

    // UI should remain responsive during polling
    const startTime = Date.now();

    // Wait for completion
    await page.waitForSelector('text=Generation Complete!', { timeout: 15000 });

    const totalTime = Date.now() - startTime;

    // Should complete within reasonable time
    expect(totalTime).toBeLessThan(15000);

    // UI should still be interactive
    await expect(page.locator('button').filter({ hasText: 'Generate Images' })).toBeEnabled();

    console.log(`Generation polling time: ${totalTime}ms (${pollCount} polls)`);
  });

  test('should handle memory efficiently with large datasets', async ({ page }) => {
    await page.goto('/generations');

    // Mock a large number of generations
    await page.evaluate(() => {
      const largeGenerations = Array.from({ length: 100 }, (_, i) => ({
        id: `gen-${i}`,
        status: i % 4 === 0 ? 'completed' : i % 4 === 1 ? 'failed' : i % 4 === 2 ? 'generating' : 'pending',
        imageUrls: i % 4 === 0 ? [`https://example.com/image${i}.png`] : undefined,
        errorMessage: i % 4 === 1 ? 'Generation failed' : undefined,
        createdAt: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
        completedAt: i % 4 === 0 ? new Date().toISOString() : undefined,
        amountPaid: i % 10 === 0 ? '0.1' : undefined,
      }));

      (window as any).mockGenerations = largeGenerations;
    });

    const startTime = Date.now();

    // Wait for the page to render all generations
    await page.waitForSelector('[data-generation-id]', { timeout: 10000 });

    const loadTime = Date.now() - startTime;

    // Should render large dataset within reasonable time
    expect(loadTime).toBeLessThan(10000);

    // Should show generations
    const generationCards = page.locator('[data-generation-id]');
    const count = await generationCards.count();
    expect(count).toBeGreaterThan(50);

    console.log(`Large dataset render time: ${loadTime}ms for ${count} items`);
  });
});
