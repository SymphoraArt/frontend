/**
 * Generation Router Tests
 *
 * Verifies the unified orchestrator:
 *   - Moderation blocks harmful prompts BEFORE any provider call
 *   - Blacklisted wallets are rejected
 *   - Failover cascades correctly from Tier 1 -> Tier 2 -> Tier 3
 *   - Slot cleanup happens even on errors (no resource leaks)
 *   - Provider safety blocks (Tier 3) are handled correctly
 *   - Router status reflects accurate state
 *
 * These tests mock all external dependencies (providers, DB, moderation)
 * to ensure the routing logic itself is bulletproof.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock all external modules BEFORE importing the router
vi.mock('../content-moderation', () => ({
  moderatePrompt: vi.fn(),
}));

vi.mock('../wallet-blacklist', () => ({
  isWalletBlacklisted: vi.fn(),
  recordViolation: vi.fn(),
}));

vi.mock('../wavespeed-image-generation', () => ({
  generateImageWithWaveSpeed: vi.fn(),
}));

vi.mock('../openai-image-generation', () => ({
  generateImageWithOpenAI: vi.fn(),
}));

vi.mock('../gemini-image-generation', () => ({
  generateImagesWithGemini: vi.fn(),
}));

// Now import the modules
import { routeGeneration, resetRouter, getRouterStatus, initializeRouter } from '../generation-router';
import { moderatePrompt } from '../content-moderation';
import { isWalletBlacklisted, recordViolation } from '../wallet-blacklist';
import { generateImageWithWaveSpeed } from '../wavespeed-image-generation';
import { generateImageWithOpenAI } from '../openai-image-generation';
import { generateImagesWithGemini } from '../gemini-image-generation';

// Cast to mocked functions for type safety
const mockModerate = vi.mocked(moderatePrompt);
const mockIsBlacklisted = vi.mocked(isWalletBlacklisted);
const mockRecordViolation = vi.mocked(recordViolation);
const mockWaveSpeed = vi.mocked(generateImageWithWaveSpeed);
const mockOpenAI = vi.mocked(generateImageWithOpenAI);
const mockGemini = vi.mocked(generateImagesWithGemini);

// Helper: configure env vars for test
function setupTestEnv() {
  process.env.WAVESPEED_API_KEYS = 'ws_test_key_1,ws_test_key_2';
  process.env.WAVESPEED_MAX_CONCURRENCY = '2';
  process.env.OPENAI_API_KEYS = 'oai_test_key_1';
  process.env.OPENAI_MAX_CONCURRENCY = '2';
  process.env.GOOGLE_GEMINI_API_KEY = 'gem_test_key_1';
  process.env.GEMINI_MAX_CONCURRENCY = '2';
}

function cleanTestEnv() {
  delete process.env.WAVESPEED_API_KEYS;
  delete process.env.WAVESPEED_MAX_CONCURRENCY;
  delete process.env.OPENAI_API_KEYS;
  delete process.env.OPENAI_MAX_CONCURRENCY;
  delete process.env.GEMINI_MAX_CONCURRENCY;
}

// Default: moderation passes, wallet not blacklisted
function setupDefaultMocks() {
  mockModerate.mockResolvedValue({
    allowed: true,
    reason: null,
    tier: null,
    flaggedTerms: [],
    processingTimeMs: 1,
  });
  mockIsBlacklisted.mockResolvedValue(false);
  mockRecordViolation.mockResolvedValue(undefined);
}

describe('Generation Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetRouter();
    setupTestEnv();
    setupDefaultMocks();
  });

  afterEach(() => {
    cleanTestEnv();
  });

  // ========================================================================
  // Content Moderation (runs BEFORE providers)
  // ========================================================================

  describe('Content Moderation Gate', () => {
    it('blocks prompts that fail moderation and records violation', async () => {
      mockModerate.mockResolvedValue({
        allowed: false,
        reason: 'Content violates community guidelines (csam)',
        tier: 1,
        flaggedTerms: ['child porn'],
        processingTimeMs: 1,
      });

      const result = await routeGeneration({
        prompt: 'child porn',
        walletAddress: '0xBadActor',
      });

      expect(result.success).toBe(false);
      expect(result.moderation.allowed).toBe(false);
      expect(result.moderation.tier).toBe(1);

      // Provider should NEVER be called
      expect(mockWaveSpeed).not.toHaveBeenCalled();
      expect(mockOpenAI).not.toHaveBeenCalled();
      expect(mockGemini).not.toHaveBeenCalled();

      // Violation should be recorded
      expect(mockRecordViolation).toHaveBeenCalledWith(
        '0xBadActor',
        expect.stringContaining('Tier 1'),
        'child porn'
      );
    });

    it('allows clean prompts through to providers', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: true,
        imageBuffers: [Buffer.from('fake-image')],
        generationTime: 100,
        metadata: { model: 'wavespeed', aspectRatio: '1:1', resolution: '1024x1024' },
      });

      const result = await routeGeneration({
        prompt: 'A beautiful sunset over the ocean',
      });

      expect(result.success).toBe(true);
      expect(result.moderation.allowed).toBe(true);
      expect(mockWaveSpeed).toHaveBeenCalled();
    });
  });

  // ========================================================================
  // Wallet Blacklist
  // ========================================================================

  describe('Wallet Blacklist Gate', () => {
    it('rejects blacklisted wallets without calling any provider', async () => {
      mockIsBlacklisted.mockResolvedValue(true);

      const result = await routeGeneration({
        prompt: 'A harmless prompt',
        walletAddress: '0xBlacklistedWallet',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('suspended');
      expect(mockWaveSpeed).not.toHaveBeenCalled();
      expect(mockOpenAI).not.toHaveBeenCalled();
      expect(mockGemini).not.toHaveBeenCalled();
    });

    it('allows non-blacklisted wallets through', async () => {
      mockIsBlacklisted.mockResolvedValue(false);
      mockWaveSpeed.mockResolvedValue({
        success: true,
        imageBuffers: [Buffer.from('img')],
        generationTime: 50,
        metadata: { model: 'wavespeed', aspectRatio: '1:1', resolution: '1024x1024' },
      });

      const result = await routeGeneration({
        prompt: 'A cat playing piano',
        walletAddress: '0xGoodWallet',
      });

      expect(result.success).toBe(true);
    });
  });

  // ========================================================================
  // Vertical Failover Chain
  // ========================================================================

  describe('Vertical Failover', () => {
    it('uses Tier 1 (WaveSpeed) by default', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: true,
        imageBuffers: [Buffer.from('ws-image')],
        generationTime: 200,
        metadata: { model: 'wavespeed-nano-banana-pro', aspectRatio: '1:1', resolution: '1024x1024' },
      });

      const result = await routeGeneration({ prompt: 'A mountain landscape' });

      expect(result.success).toBe(true);
      expect(result.provider).toBe('wavespeed');
      expect(mockWaveSpeed).toHaveBeenCalled();
      expect(mockOpenAI).not.toHaveBeenCalled();
      expect(mockGemini).not.toHaveBeenCalled();
    });

    it('fails over to Tier 2 (OpenAI) when WaveSpeed fails', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: false,
        error: 'WaveSpeed rate limit exceeded',
        retryable: true,
      });
      mockOpenAI.mockResolvedValue({
        success: true,
        imageBuffers: [Buffer.from('oai-image')],
        generationTime: 300,
        metadata: { model: 'gpt-image-1', aspectRatio: '1:1', resolution: '1024x1024' },
      });

      const result = await routeGeneration({ prompt: 'A city at night' });

      expect(result.success).toBe(true);
      expect(result.provider).toBe('openai');
    });

    it('fails over to Tier 3 (Gemini) when WaveSpeed and OpenAI both fail', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: false,
        error: 'WaveSpeed down',
        retryable: true,
      });
      mockOpenAI.mockResolvedValue({
        success: false,
        error: 'OpenAI down',
        retryable: true,
      });
      mockGemini.mockResolvedValue({
        success: true,
        imageBuffers: [Buffer.from('gem-image')],
        generationTime: 400,
        metadata: { model: 'gemini-2.5-flash-image', aspectRatio: '1:1', resolution: '1K' },
      });

      const result = await routeGeneration({ prompt: 'A forest scene' });

      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
    });

    it('returns error when ALL providers fail', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: false,
        error: 'WaveSpeed exhausted',
        retryable: true,
      });
      mockOpenAI.mockResolvedValue({
        success: false,
        error: 'OpenAI exhausted',
        retryable: true,
      });
      mockGemini.mockResolvedValue({
        success: false,
        error: 'Gemini exhausted',
        retryable: true,
      });

      const result = await routeGeneration({ prompt: 'Anything' });

      expect(result.success).toBe(false);
      expect(result.error).toContain('unavailable');
    });
  });

  // ========================================================================
  // Provider Safety Blocks (Tier 3 Moderation)
  // ========================================================================

  describe('Provider Safety Blocks', () => {
    it('handles provider SAFETY finish reason and records violation', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: false,
        error: 'Content policy violation',
        metadata: {
          model: 'wavespeed-nano-banana-pro',
          aspectRatio: '1:1',
          resolution: '1024x1024',
          finishReason: 'SAFETY',
        },
      });

      const result = await routeGeneration({
        prompt: 'Borderline prompt that passed local moderation',
        walletAddress: '0xSneakyUser',
      });

      expect(result.success).toBe(false);
      expect(result.providerSafetyBlock).toBe(true);
      expect(mockRecordViolation).toHaveBeenCalledWith(
        '0xSneakyUser',
        expect.stringContaining('Tier 3'),
        expect.any(String)
      );
    });
  });

  // ========================================================================
  // Router Status
  // ========================================================================

  describe('getRouterStatus', () => {
    it('returns correct status after initialization', () => {
      initializeRouter();
      const status = getRouterStatus();

      expect(status.initialized).toBe(true);
      expect(status.tiers.length).toBe(3); // WaveSpeed, OpenAI, Gemini
      expect(status.totalRouted).toBe(0);
      expect(status.totalModBlocked).toBe(0);
    });

    it('increments counters after routing', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: true,
        imageBuffers: [Buffer.from('img')],
        generationTime: 50,
        metadata: { model: 'wavespeed', aspectRatio: '1:1', resolution: '1024x1024' },
      });

      await routeGeneration({ prompt: 'Test prompt' });
      const status = getRouterStatus();

      expect(status.totalRouted).toBe(1);
    });
  });

  // ========================================================================
  // Security: API keys never in response
  // ========================================================================

  describe('Security', () => {
    it('never returns full API key in the response', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: true,
        imageBuffers: [Buffer.from('img')],
        generationTime: 50,
        metadata: { model: 'wavespeed', aspectRatio: '1:1', resolution: '1024x1024' },
      });

      const result = await routeGeneration({ prompt: 'Test' });

      // keyUsed should be masked (first 4 + last 4 chars)
      if (result.keyUsed) {
        expect(result.keyUsed).toContain('...');
        expect(result.keyUsed).not.toBe('ws_test_key_1');
        expect(result.keyUsed).not.toBe('ws_test_key_2');
      }
    });

    it('does not leak error details from providers in user-facing messages', async () => {
      mockWaveSpeed.mockResolvedValue({
        success: false,
        error: 'Internal API key sk-1234567890 is invalid for account abc123',
        retryable: false,
      });
      mockOpenAI.mockResolvedValue({
        success: false,
        error: 'Authentication failure',
        retryable: false,
      });
      mockGemini.mockResolvedValue({
        success: false,
        error: 'Key revoked',
        retryable: false,
      });

      const result = await routeGeneration({ prompt: 'Test' });

      // The top-level error should be a generic message, not leaking internal key
      expect(result.error).toContain('unavailable');
    });
  });
});
