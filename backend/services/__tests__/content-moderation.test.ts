/**
 * Content Moderation Tests
 *
 * Verifies the 3-tier content moderation pipeline:
 * - Tier 1 regex catches universally banned content
 * - Tier 1 does NOT false-positive on legitimate art prompts
 * - Tier 2 NLP context analysis differentiates harmful vs safe usage
 * - Full pipeline returns correct metadata
 */

import { describe, it, expect } from 'vitest';
import { moderatePrompt, __testing__ } from '../content-moderation';

const { checkTier1, checkTier2 } = __testing__;

// ============================================================================
// Tier 1: Regex Blocklist
// ============================================================================

describe('Tier 1: Regex Blocklist', () => {
  describe('should BLOCK universally banned content', () => {
    const blockedPrompts = [
      { prompt: 'child porn image', category: 'csam' },
      { prompt: 'underage nude photo', category: 'csam' },
      { prompt: 'generate hentai art', category: 'explicit_sexual' },
      { prompt: 'create pornographic image', category: 'explicit_sexual' },
      { prompt: 'xxx rated content', category: 'explicit_sexual' },
      { prompt: 'explicit sexual intercourse scene', category: 'explicit_sexual' },
      { prompt: 'rape scene depiction', category: 'explicit_sexual' },
      { prompt: 'decapitation scene', category: 'extreme_violence' },
      { prompt: 'dismemberment art', category: 'extreme_violence' },
      { prompt: 'torture porn image', category: 'extreme_violence' },
      { prompt: 'bomb making instructions visual', category: 'terrorism' },
      { prompt: 'suicide method tutorial image', category: 'self_harm' },
    ];

    for (const { prompt, category } of blockedPrompts) {
      it(`blocks: "${prompt}" (${category})`, () => {
        const result = checkTier1(prompt);
        expect(result.blocked).toBe(true);
        expect(result.flaggedTerms.length).toBeGreaterThan(0);
      });
    }
  });

  describe('should ALLOW legitimate art prompts (zero false positives)', () => {
    const safePrompts = [
      'A beautiful blood moon over the ocean at midnight',
      'A killer whale breaching in the Pacific Ocean',
      'A dead tree in a misty forest landscape',
      'A nude color palette for interior design',
      'An anatomical study of the human body in the style of da Vinci',
      'A medieval knight with a sword and shield',
      'A sunset over a battlefield memorial',
      'A cyberpunk cityscape with neon lights at night',
      'A portrait of a woman with dramatic lighting',
      'An ancient Egyptian temple with hieroglyphics',
      'A dark fantasy castle on a stormy cliff',
      'A photorealistic render of a gun metal grey sports car',
      'A watergun fight on a sunny beach',
      'A hanging garden of Babylon reconstruction',
      'A historical painting of a gladiator arena',
      'Kill Bill movie poster reimagined in anime style',
    ];

    for (const prompt of safePrompts) {
      it(`allows: "${prompt.substring(0, 60)}..."`, () => {
        const result = checkTier1(prompt);
        expect(result.blocked).toBe(false);
        expect(result.flaggedTerms).toHaveLength(0);
      });
    }
  });
});

// ============================================================================
// Tier 2: NLP Context Analysis
// ============================================================================

describe('Tier 2: NLP Context Analysis', () => {
  describe('should ALLOW safe contextual usage of grey-area terms', () => {
    const safePrompts = [
      'A blood moon rising over ancient ruins',
      'A killer whale swimming through bioluminescent waters',
      'A dead pool of water reflecting the night sky',
      'A nude color palette for a minimalist room',
      'Shoot a photo of the Milky Way galaxy',
      'A gun metal grey Porsche 911 turbo',
      'A hanging lantern festival in Chiang Mai',
      'A drug store on a 1950s American main street',
      'A medieval sword and shield display in a museum',
      'A water gun battle on a summer afternoon',
    ];

    for (const prompt of safePrompts) {
      it(`allows: "${prompt.substring(0, 60)}..."`, () => {
        const result = checkTier2(prompt);
        expect(result.blocked).toBe(false);
      });
    }
  });

  describe('should FLAG harmful contextual usage', () => {
    const harmfulPrompts = [
      'graphic blood covering a person in realistic detail',
      'brutal kill scene with explicit violence',
      'detailed dead body in realistic setting',
    ];

    for (const prompt of harmfulPrompts) {
      it(`flags: "${prompt.substring(0, 60)}..."`, () => {
        const result = checkTier2(prompt);
        expect(result.blocked).toBe(true);
        expect(result.flaggedTerms.length).toBeGreaterThan(0);
      });
    }
  });
});

// ============================================================================
// Full Pipeline: moderatePrompt()
// ============================================================================

describe('moderatePrompt() - Full Pipeline', () => {
  it('blocks Tier 1 content and returns correct metadata', async () => {
    const result = await moderatePrompt('generate child porn');
    expect(result.allowed).toBe(false);
    expect(result.tier).toBe(1);
    expect(result.reason).toContain('csam');
    expect(result.flaggedTerms.length).toBeGreaterThan(0);
    expect(result.processingTimeMs).toBeGreaterThanOrEqual(0);
  });

  it('allows clean prompts and returns correct metadata', async () => {
    const result = await moderatePrompt('A serene Japanese garden with cherry blossoms and a koi pond');
    expect(result.allowed).toBe(true);
    expect(result.tier).toBeNull();
    expect(result.reason).toBeNull();
    expect(result.flaggedTerms).toHaveLength(0);
    expect(result.processingTimeMs).toBeGreaterThanOrEqual(0);
  });

  it('rejects empty prompts', async () => {
    const result = await moderatePrompt('');
    expect(result.allowed).toBe(false);
    expect(result.tier).toBe(1);
    expect(result.reason).toBe('Empty prompt');
  });

  it('rejects whitespace-only prompts', async () => {
    const result = await moderatePrompt('   \n\t  ');
    expect(result.allowed).toBe(false);
    expect(result.tier).toBe(1);
  });

  it('handles prompts with excessive whitespace correctly', async () => {
    const result = await moderatePrompt('A    beautiful    sunset    over    the    ocean');
    expect(result.allowed).toBe(true);
  });

  it('handles very long safe prompts', async () => {
    const longPrompt = 'A beautiful landscape painting in the style of Claude Monet, '.repeat(50);
    const result = await moderatePrompt(longPrompt);
    expect(result.allowed).toBe(true);
  });

  it('catches harmful content even with spacing tricks', async () => {
    const result = await moderatePrompt('child  porn  image');
    expect(result.allowed).toBe(false);
    expect(result.tier).toBe(1);
  });

  it('processes moderation quickly (under 100ms for typical prompts)', async () => {
    const result = await moderatePrompt('A futuristic city skyline at dusk with flying cars');
    expect(result.processingTimeMs).toBeLessThan(100);
  });
});
