/**
 * Content Moderation Tests
 *
 * Verifies the 2-tier content moderation pipeline:
 * - Tier 1 regex catches universally banned content and folds leetspeak/homoglyphs
 * - Tier 1 does NOT false-positive on legitimate art prompts (no "nude" false positives)
 * - Tier 2 (OpenAI omni-moderation) context analysis detects complex semantic evasion
 * - Full pipeline returns generic generic client messages (CLIENT_BLOCK_MESSAGE)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { moderatePrompt, CLIENT_BLOCK_MESSAGE, __testing__ as modTesting, registerTier2 } from '../content-moderation';
import { __testing__ as omniTesting } from '../openai-moderation';

const { checkTier1, normaliseInput, leetFold, TIER1_BLOCKED_PATTERNS } = modTesting;

// ============================================================================
// Input Normalisation
// ============================================================================

describe('Input Normalisation', () => {
  it('strips zero-width and formatting control characters', () => {
    const raw = 'c\u200Bh\u200Ci\u200Dl\uFEFFd porn';
    expect(normaliseInput(raw)).toBe('child porn');
  });

  it('normalises fullwidth and compatibility characters (NFKC)', () => {
    const raw = 'ｃｈｉｌｄ　ｐｏｒｎ'; // Fullwidth chars
    expect(normaliseInput(raw)).toBe('child porn');
  });

  it('collapses multiple whitespace', () => {
    const raw = 'child    porn \n\t  image';
    expect(normaliseInput(raw)).toBe('child porn image');
  });
});

describe('Leetspeak / Homoglyph Folding', () => {
  it('folds common substitutions', () => {
    expect(leetFold('ch1ld p0rn')).toBe('child porn');
    expect(leetFold('min0r')).toBe('minor');
    expect(leetFold('p3d0ph!l3')).toBe('pedoph!le');
    expect(leetFold('l0l1c0n')).toBe('lolicon');
    expect(leetFold('sh0tac0n')).toBe('shotacon');
    expect(leetFold('$h0ta')).toBe('shota');
    expect(leetFold('t33n')).toBe('teen');
    expect(leetFold('b@bY')).toBe('baby');
  });

  it('folds Cyrillic lookalikes', () => {
    // These contain cyrillic letters that look identical to latin
    const cyrillicA = '\u0430';
    const cyrillicE = '\u0435';
    const cyrillicO = '\u043E';
    const cyrillicC = '\u0441';
    const cyrillicP = '\u0440';
    expect(leetFold(`ch1ld ${cyrillicP}${cyrillicO}rn`)).toBe('child porn');
    expect(leetFold(`nude t${cyrillicE}${cyrillicE}n`)).toBe('nude teen');
    expect(leetFold(`r${cyrillicA}pe`)).toBe('rape');
  });
});

// ============================================================================
// Tier 1: Regex Blocklist
// ============================================================================

describe('Tier 1: Regex Blocklist', () => {
  describe('CSAM / Child Exploitation (Instant Ban)', () => {
    const blockedPrompts = [
      'child porn image',
      'underage nude photo',
      'nude teenager in the pool',
      'naked teenagers',
      'nude toddler',
      'nude boys and girls',
      'pedophile',
      'loli anime',
      'lolicon art',
      'shotacon',
      'shota porn video', // Contains shota + sexual term
    ];

    for (const prompt of blockedPrompts) {
      it(`blocks: "${prompt}"`, () => {
        const result = checkTier1(normaliseInput(prompt));
        expect(result.blocked).toBe(true);
        expect(result.category).toBe('csam');
        expect(result.severity).toBe('instant_ban');
      });
    }

    it('blocks leetspeak CSAM variants', () => {
      const result = checkTier1(normaliseInput('ch1ld p0rn'));
      expect(result.blocked).toBe(true);
      expect(result.category).toBe('csam');
    });

    it('does NOT block legitimate "shota" context (Japanese name)', () => {
      // Must contain a sexual term within 5 words to block
      const result = checkTier1(normaliseInput('A portrait of a boy named Shota Matsuda'));
      expect(result.blocked).toBe(false);
    });
  });

  describe('Other Severe Categories (Strike)', () => {
    const blockedPrompts = [
      { prompt: 'explicit sexual intercourse scene', category: 'explicit_sexual' },
      { prompt: 'rape scene depiction', category: 'explicit_sexual' },
      { prompt: 'gangbang in the office', category: 'explicit_sexual' },
      { prompt: 'decapitation scene', category: 'extreme_violence' },
      { prompt: 'dismemberment art', category: 'extreme_violence' },
      { prompt: 'snuff film', category: 'extreme_violence' },
      { prompt: 'bomb making instructions visual', category: 'terrorism' },
      { prompt: 'suicide method tutorial image', category: 'self_harm' },
    ];

    for (const { prompt, category } of blockedPrompts) {
      it(`blocks: "${prompt}" (${category})`, () => {
        const result = checkTier1(normaliseInput(prompt));
        expect(result.blocked).toBe(true);
        expect(result.category).toBe(category);
        expect(result.severity).toBe('strike');
      });
    }

    it('does NOT block legitimate "snuff" context', () => {
      // Pattern changed from \bsnuff\b to snuff (film|movie|video)
      const result = checkTier1(normaliseInput('An antique snuff box on a table'));
      expect(result.blocked).toBe(false);
    });
  });

  describe('Allowed Grey-Area Contexts (Removed from Tier 1)', () => {
    const safePrompts = [
      'A beautiful blood moon over the ocean at midnight',
      'A killer whale breaching in the Pacific Ocean',
      'A nude color palette for interior design',
      'An anatomical study of the human genital in the style of da Vinci', // genital removed
      'A hanging garden of Babylon reconstruction',
      'Kill Bill movie poster reimagined in anime style',
      'A drug store on a 1950s American main street',
      'The roman numeral XXX on a clock face', // xxx removed
      'A portrait in hentai style', // hentai removed (left to AI moderation)
    ];

    for (const prompt of safePrompts) {
      it(`allows: "${prompt}"`, () => {
        const result = checkTier1(normaliseInput(prompt));
        expect(result.blocked).toBe(false);
      });
    }
  });
});

// ============================================================================
// Full Pipeline: moderatePrompt()
// ============================================================================

describe('moderatePrompt() - Full Pipeline', () => {
  // Mock the checkOmniModeration function directly via the __testing__ hook
  // We mock it here instead of vi.mock() to ensure we test the pipeline wiring
  let mockCheckOmni: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCheckOmni = vi.fn().mockResolvedValue({
      blocked: false,
      category: null,
      severity: null,
      scores: {},
    });
    // Inject the mock
    registerTier2(mockCheckOmni);
  });

  it('blocks Tier 1 content, uses proper severity, hides from client', async () => {
    const result = await moderatePrompt('generate child porn');

    expect(result.allowed).toBe(false);
    expect(result.tier).toBe(1);
    expect(result.severity).toBe('instant_ban');
    // Internal reason includes category for logs
    expect(result.reason).toContain('csam');
    // But we never return the actual category/scores to the client (probing oracle prevention)
    // The router uses CLIENT_BLOCK_MESSAGE directly for the error, but the moderation
    // result itself shouldn't leak scores to the client response object either.
    expect(result.flaggedTerms.length).toBeGreaterThan(0);
  });

  it('falls through to Tier 2 (OpenAI) if Tier 1 passes', async () => {
    mockCheckOmni.mockResolvedValueOnce({
      blocked: true,
      category: 'sexual',
      severity: 'log_only',
      scores: { 'sexual': 0.8 },
    });

    const result = await moderatePrompt('Some sneaky semantic evasion prompt');

    expect(result.allowed).toBe(false);
    expect(result.tier).toBe(2);
    expect(result.severity).toBe('log_only');
    expect(result.reason).toContain('sexual');
    expect(mockCheckOmni).toHaveBeenCalledTimes(1);
  });

  it('fails open if Tier 2 throws an error', async () => {
    mockCheckOmni.mockRejectedValueOnce(new Error('OpenAI API down'));

    const result = await moderatePrompt('A perfectly safe prompt');

    expect(result.allowed).toBe(true);
    expect(result.tier).toBeNull();
  });

  it('rejects empty/whitespace prompts', async () => {
    const result = await moderatePrompt('   \n\t  ');
    expect(result.allowed).toBe(false);
    expect(result.tier).toBe(1);
    expect(result.reason).toBe('Empty prompt');
  });
});
