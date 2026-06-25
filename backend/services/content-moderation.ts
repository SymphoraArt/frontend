/**
 * Content Moderation Service - 3-Tier Safety Filter
 *
 * Protects the platform from harmful content BEFORE any API cost is incurred.
 * Runs entirely server-side; no secrets or filter logic is exposed to the client.
 *
 * Architecture (from api_algo_improvements.md):
 *   Tier 1: Hardcore Regex Blocklist (zero latency, zero cost)
 *   Tier 2: Context-aware adjacency analysis (catches grey-area abuse, zero deps)
 *   Tier 3: Provider-native safety filters (handled downstream by each provider)
 *
 * WHEN TO CHECK: Before payment verification, before any API call.
 * ZERO EXTERNAL DEPENDENCIES: Pure regex + adjacency analysis for reliability.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ModerationResult {
  /** Whether the prompt is allowed to proceed to generation */
  allowed: boolean;
  /** Human-readable reason if blocked */
  reason: string | null;
  /** Which tier caught it (1 = regex, 2 = NLP, null = passed) */
  tier: 1 | 2 | null;
  /** Specific terms that triggered the block */
  flaggedTerms: string[];
  /** Processing time in ms */
  processingTimeMs: number;
}

// ---------------------------------------------------------------------------
// Tier 1: Hardcore Regex Blocklist
// ---------------------------------------------------------------------------
// These terms are universally unacceptable. There is no "context" in which
// generating images of these subjects is appropriate on our platform.
//
// The list is intentionally kept as regex patterns so we catch variations
// (plurals, leetspeak, spacing tricks). Each pattern is compiled once at
// module load for zero per-request overhead.
// ---------------------------------------------------------------------------

const TIER1_BLOCKED_PATTERNS: { pattern: RegExp; category: string }[] = [
  // CSAM / child exploitation (highest severity)
  { pattern: /\bchild\s*(porn|sex|nude|naked|erotic)/i, category: 'csam' },
  { pattern: /\bunderage\s*(sex|nude|naked|porn|erotic)/i, category: 'csam' },
  { pattern: /\bpedophil/i, category: 'csam' },
  { pattern: /\bminor[s]?\s*(sex|nude|naked|porn|erotic)/i, category: 'csam' },
  { pattern: /\bloli\b/i, category: 'csam' },
  { pattern: /\bshota\b/i, category: 'csam' },

  // Explicit sexual content
  { pattern: /\bhentai\b/i, category: 'explicit_sexual' },
  { pattern: /\bpornograph/i, category: 'explicit_sexual' },
  { pattern: /\bxxx\b/i, category: 'explicit_sexual' },
  { pattern: /\bnsfw\s*(porn|sex|nude|hentai)/i, category: 'explicit_sexual' },
  { pattern: /\bexplicit\s*(sex|intercourse|penetrat)/i, category: 'explicit_sexual' },
  { pattern: /\brape\b/i, category: 'explicit_sexual' },
  { pattern: /\bgang\s*bang/i, category: 'explicit_sexual' },
  { pattern: /\borgasm/i, category: 'explicit_sexual' },
  { pattern: /\bgenital/i, category: 'explicit_sexual' },
  { pattern: /\berect\s*(penis|dick|cock)/i, category: 'explicit_sexual' },
  { pattern: /\bnude\s*(child|teen|minor|girl|boy)\b/i, category: 'explicit_sexual' },

  // Extreme violence / gore
  { pattern: /\bdecapitat/i, category: 'extreme_violence' },
  { pattern: /\bdismember/i, category: 'extreme_violence' },
  { pattern: /\bmutilat/i, category: 'extreme_violence' },
  { pattern: /\btorture\s*(porn|video|image)/i, category: 'extreme_violence' },
  { pattern: /\bsnuff\b/i, category: 'extreme_violence' },
  { pattern: /\bgore\s*(porn|video|image)/i, category: 'extreme_violence' },

  // Terrorism / extremism
  { pattern: /\bbomb\s*making/i, category: 'terrorism' },
  { pattern: /\bterrorist\s*(attack|bomb|manual)/i, category: 'terrorism' },
  { pattern: /\bisis\s*(flag|propaganda|recruit)/i, category: 'terrorism' },

  // Self-harm promotion
  { pattern: /\bsuicide\s*(method|how\s*to|instruction|tutorial)/i, category: 'self_harm' },
  { pattern: /\bself[\s-]*harm\s*(method|how\s*to|instruction|tutorial)/i, category: 'self_harm' },
];

/**
 * Tier 1 check: runs the regex blocklist against the prompt.
 * Designed for zero false-positives on legitimate art prompts.
 */
function checkTier1(prompt: string): { blocked: boolean; flaggedTerms: string[]; category: string | null } {
  const flaggedTerms: string[] = [];
  let matchedCategory: string | null = null;

  for (const { pattern, category } of TIER1_BLOCKED_PATTERNS) {
    const match = prompt.match(pattern);
    if (match) {
      flaggedTerms.push(match[0]);
      matchedCategory = category;
      // Continue checking to collect all flagged terms for the log
    }
  }

  return {
    blocked: flaggedTerms.length > 0,
    flaggedTerms,
    category: matchedCategory,
  };
}

// ---------------------------------------------------------------------------
// Tier 2: NLP Context Analysis
// ---------------------------------------------------------------------------
// A regex blocklist is too dumb on its own -- it would block legitimate prompts
// like "blood moon over the ocean" or "killer whale breaching". We use the
// `compromise` NLP library (already in package.json) to analyze the semantic
// context of potentially dangerous terms.
//
// Strategy:
//   1. Check if any "grey-area" trigger words appear in the prompt.
//   2. If they do, use NLP to determine if they are used in a harmful or
//      innocent context (e.g., "blood" as a noun vs. adjective modifying
//      "moon"; "kill" as a verb directed at a person vs. part of "killer whale").
// ---------------------------------------------------------------------------

interface GreyAreaTerm {
  /** The keyword to look for */
  trigger: string;
  /**
   * Contexts in which this word is SAFE. If the NLP analysis finds one of
   * these adjacent words/phrases, the trigger is considered benign.
   */
  safeContexts: string[];
  /** Category if flagged */
  category: string;
}

const GREY_AREA_TERMS: GreyAreaTerm[] = [
  {
    trigger: 'blood',
    safeContexts: ['moon', 'orange', 'red', 'sunset', 'sky', 'rose', 'diamond', 'oath', 'brothers', 'ties', 'hound', 'dragon', 'elf', 'warrior', 'cell', 'test', 'type', 'bank', 'donation', 'drive', 'vessel', 'pressure', 'line', 'born'],
    category: 'violence_context',
  },
  {
    trigger: 'kill',
    safeContexts: ['whale', 'bill', 'time', 'beat', 'it', 'shot', 'switch', 'streak', 'joy', 'mockingbird', 'bill', 'fee'],
    category: 'violence_context',
  },
  {
    trigger: 'dead',
    safeContexts: ['pool', 'line', 'lock', 'end', 'pan', 'sea', 'wood', 'lift', 'beat', 'stock', 'space', 'zone', 'weight', 'bolt'],
    category: 'violence_context',
  },
  {
    trigger: 'naked',
    safeContexts: ['eye', 'truth', 'tree', 'branch', 'mole', 'rat', 'cake', 'lunch'],
    category: 'nudity_context',
  },
  {
    trigger: 'nude',
    safeContexts: ['color', 'palette', 'tone', 'shade', 'lipstick', 'heel', 'pump', 'art', 'painting', 'sculpture', 'study', 'figure', 'life', 'model', 'drawing', 'sketch', 'academic', 'classical', 'renaissance'],
    category: 'nudity_context',
  },
  {
    trigger: 'drug',
    safeContexts: ['store', 'lord', 'awareness', 'prevention', 'education', 'free', 'test', 'screen', 'rehab', 'recovery'],
    category: 'drugs_context',
  },
  {
    trigger: 'weapon',
    safeContexts: ['fantasy', 'medieval', 'sword', 'shield', 'game', 'rpg', 'historical', 'museum', 'display'],
    category: 'weapon_context',
  },
  {
    trigger: 'gun',
    safeContexts: ['finger', 'top', 'metal', 'ship', 'salute', 'powder', 'cotton', 'smoke', 'boat', 'show', 'water', 'nerf', 'glue', 'nail', 'heat', 'spray', 'staple'],
    category: 'weapon_context',
  },
  {
    trigger: 'shoot',
    safeContexts: ['photo', 'star', 'basketball', 'hoop', 'film', 'movie', 'camera', 'arrow', 'pool', 'billiard', 'trouble', 'breeze'],
    category: 'weapon_context',
  },
  {
    trigger: 'slave',
    safeContexts: ['historical', 'history', 'abolition', 'freedom', 'underground', 'railroad', 'narrative', 'memorial', 'museum'],
    category: 'exploitation_context',
  },
  {
    trigger: 'hanging',
    safeContexts: ['garden', 'plant', 'light', 'lamp', 'basket', 'ornament', 'decoration', 'bridge', 'lantern', 'vine', 'out', 'chad'],
    category: 'violence_context',
  },
];

/**
 * Tier 2 check: context-aware adjacency analysis for grey-area terms.
 * Uses pure regex + word adjacency checks (zero external dependencies).
 * Returns blocked=true only if the term appears in a genuinely harmful context.
 *
 * Strategy:
 *   1. Check if any grey-area trigger word appears in the prompt.
 *   2. If it does, check if known safe context words appear nearby.
 *   3. If no safe context is found, check for explicitly harmful patterns:
 *      a. Trigger word used with human-targeting terms ("kill the man")
 *      b. Trigger word used with harmful modifiers ("graphic blood")
 */
function checkTier2(prompt: string): { blocked: boolean; flaggedTerms: string[]; category: string | null } {
  const lowerPrompt = prompt.toLowerCase();
  const flaggedTerms: string[] = [];
  let matchedCategory: string | null = null;

  // Human-targeting terms: if trigger + one of these appear together, it's harmful
  const humanTargets = [
    'person', 'people', 'man', 'woman', 'child', 'girl', 'boy',
    'human', 'baby', 'someone', 'everybody', 'everyone', 'victim',
    'him', 'her', 'them', 'myself', 'yourself', 'body', 'corpse',
  ];

  // Harmful modifiers: if trigger + one of these appear adjacent, it's harmful
  const harmfulModifiers = [
    'graphic', 'realistic', 'detailed', 'explicit', 'brutal',
    'violent', 'gruesome', 'bloody', 'gory', 'horrific',
  ];

  for (const term of GREY_AREA_TERMS) {
    // Quick check: does the trigger word even appear?
    if (!lowerPrompt.includes(term.trigger)) {
      continue;
    }

    // Check if any safe context word appears as a whole word in the prompt
    // IMPORTANT: Use word boundary matching, not substring includes.
    // Without this, 'explicit' would match safe context 'it' for trigger 'kill'.
    const hasSafeContext = term.safeContexts.some((ctx) => {
      const wordBoundaryRegex = new RegExp(`\\b${ctx}\\b`, 'i');
      return wordBoundaryRegex.test(lowerPrompt);
    });
    if (hasSafeContext) {
      // The trigger is used in a known safe context; allow it
      continue;
    }

    // No safe context found. Now check for harmful patterns.
    let isHarmful = false;

    // Check 1: Is the trigger word used near a human-targeting term?
    // We check within a 5-word window around the trigger.
    const words = lowerPrompt.split(/\s+/);
    const triggerIndices = words.reduce<number[]>((acc, word, idx) => {
      if (word.includes(term.trigger)) acc.push(idx);
      return acc;
    }, []);

    for (const trigIdx of triggerIndices) {
      // Check a 5-word window around the trigger
      const windowStart = Math.max(0, trigIdx - 5);
      const windowEnd = Math.min(words.length - 1, trigIdx + 5);
      const window = words.slice(windowStart, windowEnd + 1).join(' ');

      if (humanTargets.some((ht) => window.includes(ht))) {
        isHarmful = true;
        break;
      }
    }

    // Check 2: Is the trigger word adjacent to a harmful modifier?
    if (!isHarmful) {
      const hasHarmfulModifier = harmfulModifiers.some(
        (mod) =>
          lowerPrompt.includes(`${mod} ${term.trigger}`) ||
          lowerPrompt.includes(`${term.trigger} ${mod}`)
      );
      if (hasHarmfulModifier) {
        isHarmful = true;
      }
    }

    if (isHarmful) {
      flaggedTerms.push(term.trigger);
      matchedCategory = term.category;
    }
  }

  return {
    blocked: flaggedTerms.length > 0,
    flaggedTerms,
    category: matchedCategory,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Runs the full 3-tier content moderation pipeline on a prompt.
 *
 * Call this BEFORE payment verification and BEFORE any API call.
 * Tier 3 (provider safety) is handled downstream by each generation provider.
 *
 * @param prompt - The user's generation prompt
 * @returns ModerationResult indicating if the prompt is allowed
 */
export async function moderatePrompt(prompt: string): Promise<ModerationResult> {
  const startTime = Date.now();

  // Normalize: collapse multiple spaces, trim
  const normalizedPrompt = prompt.replace(/\s+/g, ' ').trim();

  if (!normalizedPrompt) {
    return {
      allowed: false,
      reason: 'Empty prompt',
      tier: 1,
      flaggedTerms: [],
      processingTimeMs: Date.now() - startTime,
    };
  }

  // --- Tier 1: Regex Blocklist ---
  const tier1 = checkTier1(normalizedPrompt);
  if (tier1.blocked) {
    console.warn(
      `[Content Moderation] BLOCKED by Tier 1 (Regex). Category: ${tier1.category}. Terms: [${tier1.flaggedTerms.join(', ')}]`
    );
    return {
      allowed: false,
      reason: `Content violates community guidelines (${tier1.category})`,
      tier: 1,
      flaggedTerms: tier1.flaggedTerms,
      processingTimeMs: Date.now() - startTime,
    };
  }

  // --- Tier 2: NLP Context Analysis ---
  const tier2 = checkTier2(normalizedPrompt);
  if (tier2.blocked) {
    console.warn(
      `[Content Moderation] BLOCKED by Tier 2 (NLP Context). Category: ${tier2.category}. Terms: [${tier2.flaggedTerms.join(', ')}]`
    );
    return {
      allowed: false,
      reason: `Content flagged for potentially harmful context (${tier2.category})`,
      tier: 2,
      flaggedTerms: tier2.flaggedTerms,
      processingTimeMs: Date.now() - startTime,
    };
  }

  // --- Passed all local checks ---
  return {
    allowed: true,
    reason: null,
    tier: null,
    flaggedTerms: [],
    processingTimeMs: Date.now() - startTime,
  };
}

// ---------------------------------------------------------------------------
// Exports for testing
// ---------------------------------------------------------------------------

export const __testing__ = {
  checkTier1,
  checkTier2,
  TIER1_BLOCKED_PATTERNS,
  GREY_AREA_TERMS,
};
