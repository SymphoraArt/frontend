# AIgency Backend Services - Gemini Integration

Complete Google Gemini (Nano Banana) image generation integration with rate limiting, retry logic, and error handling.

## 📦 Installation

```bash
npm install @google/genai bottleneck
```

## 🔑 Setup

1. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

2. Add to your `.env` file:

```bash
GOOGLE_GEMINI_API_KEY=your_api_key_here
GEMINI_TIER=free  # or 'paid'
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { generateImagesWithGemini } from './services';

const result = await generateImagesWithGemini({
  prompt: 'A beautiful sunset over mountains',
  aspectRatio: '16:9',
  numImages: 1
});

if (result.success) {
  // result.imageBuffers contains Buffer[] of generated images
  console.log('Generated images:', result.imageBuffers.length);
}
```

### With Rate Limiting (Recommended)

```typescript
import { generateWithRateLimit } from './services';

// Automatically handles rate limits (2 images/min free, 10 images/min paid)
const result = await generateWithRateLimit({
  prompt: 'A neon sign that says "AIGENCY"',
  aspectRatio: '1:1',
  numImages: 1
});
```

### With Retry Logic

```typescript
import { generateWithRetry, RETRY_CONFIGS } from './services';

const result = await generateWithRetry(
  generateImagesWithGemini,
  {
    prompt: 'A futuristic cityscape',
    aspectRatio: '16:9'
  },
  RETRY_CONFIGS.production
);
```

### Complete Example (Production-Ready)

```typescript
import {
  generateWithRateLimit,
  generateWithRetryAndCircuitBreaker,
  detectTextRequirement,
  estimateGeminiCost
} from './services';

async function generateImage(prompt: string, aspectRatio: string = '1:1') {
  // Check if prompt needs text rendering
  const needsText = detectTextRequirement(prompt);
  console.log(`Text rendering needed: ${needsText}`);

  // Estimate cost
  const cost = estimateGeminiCost('gemini-2.5-flash-image', '1K', 1);
  console.log(`Estimated cost: $${cost.toFixed(4)}`);

  // Generate with rate limiting, retry, and circuit breaker
  const result = await generateWithRetryAndCircuitBreaker(
    generateWithRateLimit,
    { prompt, aspectRatio },
    { maxRetries: 3 }
  );

  if (result.success && result.imageBuffers) {
    // Save images to storage (Vercel Blob, S3, etc.)
    for (const buffer of result.imageBuffers) {
      await saveToStorage(buffer);
    }
    return result;
  } else {
    console.error('Generation failed:', result.error);
    throw new Error(result.error);
  }
}
```

## 📚 API Reference

### `generateImagesWithGemini(request)`

Generates images using Gemini without rate limiting or retry logic.

**Parameters:**
- `request: ImageGenerationRequest`
  - `prompt: string` - The text prompt for image generation
  - `aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'` - Image aspect ratio (default: '1:1')
  - `numImages?: number` - Number of images to generate 1-4 (default: 1)
  - `modelVersion?: string` - Model to use (default: 'gemini-2.5-flash-image')
  - `imageSize?: '1K' | '2K' | '4K'` - Resolution (only for Gemini 3 Pro)

**Returns:** `Promise<ImageGenerationResult>`
- `success: boolean` - Whether generation succeeded
- `imageBuffers?: Buffer[]` - Array of image buffers (PNG format)
- `error?: string` - Error message if failed
- `generationTime?: number` - Time taken in milliseconds
- `retryable?: boolean` - Whether the error is retryable
- `metadata?: object` - Additional metadata (model, aspect ratio, safety ratings)

**Example:**
```typescript
const result = await generateImagesWithGemini({
  prompt: 'A serene lake at dawn',
  aspectRatio: '16:9',
  numImages: 1
});
```

---

### `generateMultipleImagesWithGemini(request)`

Generates multiple images in parallel (Gemini generates 1 image per request).

**Example:**
```typescript
const result = await generateMultipleImagesWithGemini({
  prompt: 'A cute robot mascot',
  aspectRatio: '1:1',
  numImages: 4
});
// Returns up to 4 images in result.imageBuffers
```

---

### `generateWithRateLimit(request)`

Wraps generation with rate limiting to comply with Gemini API quotas.

**Rate Limits:**
- Free tier: 2 images/min, 250 requests/day
- Paid tier: 10 images/min, unlimited daily

**Example:**
```typescript
const result = await generateWithRateLimit({
  prompt: 'Abstract art',
  aspectRatio: '1:1'
});
```

---

### `generateWithRetry(generateFn, request, config)`

Adds exponential backoff retry logic to handle transient errors.

**Parameters:**
- `generateFn` - The generation function to wrap
- `request` - Image generation request
- `config` - Retry configuration (optional)
  - `maxRetries?: number` - Max retry attempts (default: 3)
  - `initialDelayMs?: number` - Initial delay (default: 1000ms)
  - `maxDelayMs?: number` - Max delay (default: 60000ms)
  - `backoffMultiplier?: number` - Backoff multiplier (default: 2)

**Example:**
```typescript
const result = await generateWithRetry(
  generateImagesWithGemini,
  { prompt: 'A landscape' },
  { maxRetries: 5, initialDelayMs: 2000 }
);
```

**Predefined Configs:**
- `RETRY_CONFIGS.rateLimitError` - For 429 errors (5 retries, long delays)
- `RETRY_CONFIGS.networkError` - For network issues (3 retries, moderate delays)
- `RETRY_CONFIGS.serviceError` - For 5xx errors (2 retries, quick delays)
- `RETRY_CONFIGS.production` - Balanced for production (3 retries)
- `RETRY_CONFIGS.development` - Fail fast for dev (1 retry)

---

### `generateWithRetryAndCircuitBreaker(generateFn, request, config)`

Combines retry logic with circuit breaker to prevent cascading failures.

**Circuit Breaker Settings:**
- Opens after 5 consecutive failures
- Stays open for 30 seconds
- Transitions to half-open to test recovery

**Example:**
```typescript
const result = await generateWithRetryAndCircuitBreaker(
  generateWithRateLimit,
  { prompt: 'A portrait' },
  RETRY_CONFIGS.production
);
```

---

### Utility Functions

#### `detectTextRequirement(prompt)`

Checks if a prompt requires text rendering (better with Gemini).

```typescript
const needsText = detectTextRequirement('A neon sign that says "HELLO"');
// Returns: true
```

#### `estimateGeminiCost(model, imageSize, numImages)`

Estimates the cost of generation.

```typescript
const cost = estimateGeminiCost('gemini-2.5-flash-image', '1K', 1);
// Returns: 0.0387 (dollars)
```

#### `getRecommendedModel(prompt, premium)`

Gets recommended model based on prompt and whether it's premium.

```typescript
const model = getRecommendedModel('A sign with text', true);
// Returns: 'gemini-2.5-flash-image'
```

#### `getRateLimiterStats()`

Gets current rate limiter statistics.

```typescript
const stats = getRateLimiterStats();
console.log(stats);
// {
//   tier: 'free',
//   config: { maxConcurrent: 1, imagesPerMinute: 2, ... },
//   current: { queued: 0, running: 0, ... },
//   reservoir: 250
// }
```

#### `isRateLimitDepleted()`

Checks if rate limit is exhausted.

```typescript
if (isRateLimitDepleted()) {
  console.log('Rate limit reached, please wait');
}
```

#### `estimateWaitTime()`

Estimates wait time for next available slot.

```typescript
const waitMs = await estimateWaitTime();
console.log(`Estimated wait: ${waitMs}ms`);
```

---

## 🧪 Testing

### Run Test Suite

```bash
# Set your API key
export GOOGLE_GEMINI_API_KEY=your_key_here

# Run all tests
npx ts-node backend/services/test-gemini.ts

# Run with rate limiting
TEST_WITH_RATE_LIMIT=true npx ts-node backend/services/test-gemini.ts

# Run with retry logic
TEST_WITH_RETRY=true npx ts-node backend/services/test-gemini.ts

# Interactive mode
npx ts-node backend/services/test-gemini.ts --interactive
```

Test output is saved to `test-output/gemini/`

---

## 💰 Pricing & Rate Limits

### Pricing

| Model | Resolution | Cost per Image | Best For |
|-------|-----------|----------------|----------|
| gemini-2.5-flash-image | 1024x1024 | $0.039 | Standard, fast generation |
| gemini-3-pro-image-preview | 1024x1024 | $0.134 | High-fidelity, text rendering |
| gemini-3-pro-image-preview | 2048x2048 | $0.134 | High resolution |
| gemini-3-pro-image-preview | 4096x4096 | $0.240 | Ultra high resolution |

### Rate Limits

**Free Tier:**
- 2 images per minute
- 10 requests per minute
- 250 requests per day
- 1,500 images per day (via AI Studio)

**Paid Tier 1:**
- 10 images per minute
- 150-300 requests per minute
- Unlimited daily quota

**Cost at Scale:**
- 1,000 generations: $39
- 10,000 generations: $390
- 50,000 generations: $1,950

---

## ⚠️ Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `API key not set` | Missing GOOGLE_GEMINI_API_KEY | Set environment variable |
| `Rate limit exceeded` | Too many requests | Use `generateWithRateLimit()` |
| `Invalid aspect ratio` | Unsupported ratio | Use: 1:1, 16:9, 9:16, 4:3, 3:4 |
| `Safety filter blocked` | Inappropriate prompt | Modify prompt content |
| `No image data received` | API error | Retry with `generateWithRetry()` |

### Retryable Errors

Automatically retried by `generateWithRetry()`:
- Rate limit errors (429)
- Network errors (ECONNREFUSED, timeout)
- Service errors (500, 503)
- Temporary unavailability

### Non-Retryable Errors

Fail immediately:
- Invalid API key (401)
- Invalid request (400)
- Safety filter blocked
- Invalid configuration

---

## 🎯 Best Practices

### 1. Always Use Rate Limiting in Production

```typescript
// ❌ Bad (will hit rate limits)
const result = await generateImagesWithGemini({ prompt });

// ✅ Good (handles rate limits automatically)
const result = await generateWithRateLimit({ prompt });
```

### 2. Use Retry Logic for Resilience

```typescript
// ✅ Production-ready with retry and circuit breaker
const result = await generateWithRetryAndCircuitBreaker(
  generateWithRateLimit,
  { prompt },
  RETRY_CONFIGS.production
);
```

### 3. Monitor Costs

```typescript
// Estimate cost before generation
const cost = estimateGeminiCost('gemini-2.5-flash-image', '1K', numImages);

if (cost > maxBudget) {
  throw new Error('Generation would exceed budget');
}
```

### 4. Choose Right Model

```typescript
// Detect if text rendering is needed
const needsText = detectTextRequirement(prompt);

const model = needsText
  ? 'gemini-2.5-flash-image'  // Better text rendering
  : 'gemini-2.5-flash-image'; // Standard (or use FAL.ai for lower cost)
```

### 5. Handle Errors Gracefully

```typescript
const result = await generateWithRateLimit({ prompt });

if (!result.success) {
  if (result.retryable) {
    // Queue for retry later
    await queueForRetry(prompt);
  } else {
    // Log and notify user
    console.error('Non-retryable error:', result.error);
    notifyUser('Generation failed, please try a different prompt');
  }
}
```

---

## 🔄 Upgrading from Free to Paid Tier

When upgrading, update the rate limiter:

```typescript
import { updateRateLimitTier } from './services';

// Upgrade to paid tier
updateRateLimitTier('paid');

// Now supports 10 images/min instead of 2 images/min
```

Or set in environment:

```bash
GEMINI_TIER=paid
```

---

## 📊 Monitoring

### Check Rate Limiter Status

```typescript
import { getRateLimiterStats, isRateLimitDepleted } from './services';

// Get detailed stats
const stats = getRateLimiterStats();
console.log('Current queue:', stats.current.queued);
console.log('Remaining requests:', stats.reservoir);

// Check if depleted
if (isRateLimitDepleted()) {
  console.warn('Rate limit reached!');
}
```

### Check Circuit Breaker Status

```typescript
import { geminiCircuitBreaker } from './services';

const state = geminiCircuitBreaker.getState();
console.log('Circuit breaker state:', state.state); // 'closed', 'open', 'half-open'
console.log('Failure count:', state.failureCount);
```

---

## 🚀 Production Deployment Checklist

- [ ] Set `GOOGLE_GEMINI_API_KEY` in production environment
- [ ] Set `GEMINI_TIER=paid` if using paid tier
- [ ] Use `generateWithRateLimit()` for all generations
- [ ] Implement retry logic with `generateWithRetry()`
- [ ] Monitor costs with `estimateGeminiCost()`
- [ ] Set up error logging (Sentry, etc.)
- [ ] Configure circuit breaker thresholds
- [ ] Test with production API key
- [ ] Set up billing alerts on Google Cloud
- [ ] Monitor rate limiter stats in production

---

## 📝 Example: Integration with Generations API

```typescript
// backend/routes/generations.ts
import { generateWithRateLimit, estimateGeminiCost } from '../services';

router.post('/api/generations', async (req, res) => {
  const { prompt, aspectRatio } = req.body;

  // Estimate cost
  const cost = estimateGeminiCost('gemini-2.5-flash-image', '1K', 1);
  console.log(`Generation will cost ~$${cost.toFixed(4)}`);

  // Generate with rate limiting
  const result = await generateWithRateLimit({
    prompt,
    aspectRatio,
    numImages: 1
  });

  if (result.success && result.imageBuffers) {
    // Store images to permanent storage
    const imageUrls = await storeImages(result.imageBuffers);

    res.json({
      success: true,
      imageUrls,
      generationTime: result.generationTime
    });
  } else {
    res.status(500).json({
      success: false,
      error: result.error,
      retryable: result.retryable
    });
  }
});
```

---

## 🆘 Troubleshooting

### Issue: "API key not set"

**Solution:** Set the environment variable:
```bash
export GOOGLE_GEMINI_API_KEY=your_key_here
```

### Issue: Rate limit exceeded constantly

**Solution:**
1. Upgrade to paid tier
2. Use rate limiting: `generateWithRateLimit()`
3. Reduce concurrent requests

### Issue: Circuit breaker opens frequently

**Solution:**
1. Check API key validity
2. Monitor Google Cloud status
3. Increase retry delays
4. Adjust circuit breaker thresholds

### Issue: Images not generating (safety filter)

**Solution:**
1. Review prompt content
2. Remove potentially sensitive terms
3. Use more neutral language
4. Check safety ratings in response metadata

---

## 📞 Support

- **Gemini API Docs:** https://ai.google.dev/gemini-api/docs/image-generation
- **Get API Key:** https://aistudio.google.com/apikey
- **Pricing:** https://ai.google.dev/gemini-api/docs/pricing
- **Rate Limits:** https://ai.google.dev/gemini-api/docs/rate-limits

---

## 📄 License

Part of AIgency Platform - See root LICENSE file
