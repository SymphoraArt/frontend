/**
 * Content Moderation Service - 2-Tier Safety Filter
 *
 * Protects the platform from harmful content BEFORE any API cost is incurred.
 * Runs entirely server-side; no secrets or filter logic is exposed to the client.
 *
 * Architecture (PR #54 review - final):
 *   Tier 1: Hardcore Regex Blocklist (zero latency, zero cost, NFKC-normalised)
 *   Tier 2: OpenAI Omni-Moderation API (multilingual, semantic, FREE endpoint)
 *   Tier 3: Provider-native safety filters (handled downstream by each provider)
 *
 * Input normalisation pipeline (runs BEFORE Tier 1):
 *   1. NFKC normalisation  — folds fullwidth/compatibility chars (ｃｈｉｌｄ → child)
 *   2. Strip zero-width/format chars (\p{Cf}, U+200B-U+200D, U+FEFF)
 *      NFKC alone does NOT remove these.
 *   3. Collapse whitespace + trim
 *   4. Leetspeak/homoglyph fold on CSAM patterns ONLY (0→o, 1→i/l, 3→e, @→a, $→s)
 *      Applied only to the CSAM category to avoid false positives elsewhere.
 *
 * WHEN TO CHECK: Before payment verification, before any API call.
 * ZERO EXTERNAL DEPENDENCIES for Tier 1 (Tier 2 uses OpenAI moderation API).
 *
 * Client-facing messages: NEVER return the category or matched terms to the client.
 * The client always sees: "Your prompt violates our content guidelines."
 * Category, scores, and matched patterns go to server logs ONLY.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Violation severity determines enforcement action */
export type ViolationSeverity =
  | 'instant_ban'   // CSAM hit or sexual/minors >= 0.7
  | 'human_review'  // sexual/minors 0.2-0.7
  | 'strike'        // Standard Tier 1 hit or provider SAFETY block (3 strikes = ban)
  | 'log_only';     // Soft AI block (other categories) - no strike

export interface ModerationResult {
  /** Whether the prompt is allowed to proceed to generation */
  allowed: boolean;
  /** Internal reason (server logs ONLY, never sent to client) */
  reason: string | null;
  /** Which tier caught it (1 = regex, 2 = omni-moderation, null = passed) */
  tier: 1 | 2 | null;
  /** Specific terms that triggered the block (server logs ONLY) */
  flaggedTerms: string[];
  /** Processing time in ms */
  processingTimeMs: number;
  /** Enforcement severity for the violation */
  severity: ViolationSeverity | null;
  /** OpenAI omni-moderation scores (server logs ONLY, null if Tier 1 caught it) */
  omniScores?: Record<string, number> | null;
}

// ---------------------------------------------------------------------------
// Input Normalisation
// ---------------------------------------------------------------------------

/**
 * Normalises input to defeat evasion techniques:
 *   1. NFKC fold (fullwidth, compatibility decomposition)
 *   2. Strip zero-width and format control characters
 *   3. Collapse whitespace
 */
function normaliseInput(raw: string): string {
  // Step 1: NFKC normalisation
  let text = raw.normalize('NFKC');

  // Step 2: Strip zero-width and Unicode format characters (\p{Cf})
  // This covers: U+200B (zero-width space), U+200C (ZWNJ), U+200D (ZWJ),
  //              U+FEFF (BOM/ZWNBS), U+00AD (soft hyphen), and all other Cf chars.
  text = text.replace(/\p{Cf}/gu, '');

  // Step 3: Collapse multiple whitespace and trim
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Applies leetspeak and homoglyph folding for CSAM pattern detection.
 * Only used against the CSAM category to avoid false positives.
 *
 * Folds: 0→o, 1→i, 3→e, @→a, $→s, 5→s, 7→t, 4→a
 * Also folds common Cyrillic lookalikes: а→a, е→e, о→o, і→i, с→c, р→p
 */
function leetFold(text: string): string {
  const lowerText = text.toLowerCase();
  let folded = '';
  for (const char of lowerText) {
    switch (char) {
      case '0': folded += 'o'; break;
      case '1': folded += 'i'; break;
      case '3': folded += 'e'; break;
      case '4': folded += 'a'; break;
      case '5': folded += 's'; break;
      case '7': folded += 't'; break;
      case '@': folded += 'a'; break;
      case '$': folded += 's'; break;
      // Cyrillic homoglyphs (visually identical to Latin)
      case '\u0430': folded += 'a'; break; // а
      case '\u0435': folded += 'e'; break; // е
      case '\u043E': folded += 'o'; break; // о
      case '\u0456': folded += 'i'; break; // і
      case '\u0441': folded += 'c'; break; // с
      case '\u0440': folded += 'p'; break; // р
      default: folded += char;
    }
  }
  return folded;
}

// ---------------------------------------------------------------------------
// Tier 1: Hardcore Regex Blocklist
// ---------------------------------------------------------------------------
// These terms are universally unacceptable. There is no "context" in which
// generating images of these subjects is appropriate on our platform.
//
// Pattern design rules (PR #54 review):
//   - Use \b word boundaries to prevent substring matches
//   - Each pattern is compiled once at module load (zero per-request overhead)
//   - CSAM patterns are also checked against leet-folded input
//   - Patterns were triaged: xxx, orgasm, genital, hentai REMOVED (see review)
// ---------------------------------------------------------------------------

interface BlockedPattern {
  pattern: RegExp;
  category: string;
  /** If true, this pattern is also checked against leet-folded input */
  checkLeet: boolean;
  /** Severity of the violation */
  severity: ViolationSeverity;
}

const TIER1_BLOCKED_PATTERNS: BlockedPattern[] = [
  // ===== CSAM / child exploitation (highest severity - instant ban) =====
  { pattern: /\bchild\s*(porn|sex|nude|naked|erotic)/i, category: 'csam', checkLeet: true, severity: 'instant_ban' },
  { pattern: /\bunderage\s*(sex|nude|naked|porn|erotic)/i, category: 'csam', checkLeet: true, severity: 'instant_ban' },
  { pattern: /\bpedophil/i, category: 'csam', checkLeet: true, severity: 'instant_ban' },
  { pattern: /\bminor[s]?\s*(sex|nude|naked|porn|erotic)/i, category: 'csam', checkLeet: true, severity: 'instant_ban' },
  { pattern: /\bloli\b/i, category: 'csam', checkLeet: true, severity: 'instant_ban' },
  { pattern: /\blolicon\b/i, category: 'csam', checkLeet: true, severity: 'instant_ban' },
  { pattern: /\bshotacon\b/i, category: 'csam', checkLeet: true, severity: 'instant_ban' },
  // nude + child/teen/minor variant (PR #54 fix: catches "nude teenager")
  {
    pattern: /\bnude\s*(child(ren)?|teen(ager)?s?|minor|kid|toddler|infant|bab(y|ies)|girl|boy)s?\b/i,
    category: 'csam', checkLeet: true, severity: 'instant_ban',
  },
  // shota + sexual term within a 5-word window (PR #54 fix: common Japanese name)
  {
    pattern: /\bshota\b(?=[\s\S]{0,40}\b(sex|nude|naked|erotic|porn|lewd|nsfw)\b)/i,
    category: 'csam', checkLeet: true, severity: 'instant_ban',
  },

  // ===== Explicit sexual content (strike) =====
  { pattern: /\bpornograph/i, category: 'explicit_sexual', checkLeet: false, severity: 'strike' },
  { pattern: /\bnsfw\s*(porn|sex|nude)/i, category: 'explicit_sexual', checkLeet: false, severity: 'strike' },
  { pattern: /\bexplicit\s*(sex|intercourse|penetrat)/i, category: 'explicit_sexual', checkLeet: false, severity: 'strike' },
  { pattern: /\brape\b/i, category: 'explicit_sexual', checkLeet: false, severity: 'strike' },
  { pattern: /\bgangbang\b/i, category: 'explicit_sexual', checkLeet: false, severity: 'strike' },
  { pattern: /\berect\s*(penis|dick|cock)/i, category: 'explicit_sexual', checkLeet: false, severity: 'strike' },

  // ===== Extreme violence / gore (strike) =====
  { pattern: /\bdecapitat/i, category: 'extreme_violence', checkLeet: false, severity: 'strike' },
  { pattern: /\bdismember/i, category: 'extreme_violence', checkLeet: false, severity: 'strike' },
  { pattern: /\bmutilat/i, category: 'extreme_violence', checkLeet: false, severity: 'strike' },
  { pattern: /\btorture\s*(porn|video|image)/i, category: 'extreme_violence', checkLeet: false, severity: 'strike' },
  { pattern: /snuff\s*(film|movie|video)/i, category: 'extreme_violence', checkLeet: false, severity: 'strike' },
  { pattern: /\bgore\s*(porn|video|image)/i, category: 'extreme_violence', checkLeet: false, severity: 'strike' },

  // ===== Terrorism / extremism (strike) =====
  { pattern: /\bbomb\s*making/i, category: 'terrorism', checkLeet: false, severity: 'strike' },
  { pattern: /\bterrorist\s*(attack|bomb|manual)/i, category: 'terrorism', checkLeet: false, severity: 'strike' },
  { pattern: /\bisis\s*(flag|propaganda|recruit)/i, category: 'terrorism', checkLeet: false, severity: 'strike' },

  // ===== Self-harm promotion (strike) =====
  { pattern: /\bsuicide\s*(method|how\s*to|instruction|tutorial)/i, category: 'self_harm', checkLeet: false, severity: 'strike' },
  { pattern: /\bself[\s-]*harm\s*(method|how\s*to|instruction|tutorial)/i, category: 'self_harm', checkLeet: false, severity: 'strike' },
];

/**
 * Tier 1 check: runs the regex blocklist against the normalised prompt.
 * CSAM patterns are also checked against leet-folded input.
 */
function checkTier1(prompt: string): {
  blocked: boolean;
  flaggedTerms: string[];
  category: string | null;
  severity: ViolationSeverity | null;
} {
  const flaggedTerms: string[] = [];
  let matchedCategory: string | null = null;
  let matchedSeverity: ViolationSeverity | null = null;

  // Pre-compute leet-folded version once
  const leetPrompt = leetFold(prompt);

  for (const { pattern, category, checkLeet, severity } of TIER1_BLOCKED_PATTERNS) {
    // Check the normalised prompt
    let match = prompt.match(pattern);

    // If not found and this pattern should check leet, try leet-folded version
    if (!match && checkLeet) {
      match = leetPrompt.match(pattern);
    }

    if (match) {
      flaggedTerms.push(match[0]);
      matchedCategory = category;
      // Use the highest severity found (instant_ban > strike)
      if (!matchedSeverity || severity === 'instant_ban') {
        matchedSeverity = severity;
      }
    }
  }

  return {
    blocked: flaggedTerms.length > 0,
    flaggedTerms,
    category: matchedCategory,
    severity: matchedSeverity,
  };
}

// ---------------------------------------------------------------------------
// Tier 2: OpenAI Omni-Moderation (implemented in openai-moderation.ts)
// ---------------------------------------------------------------------------
// Imported and called in the moderatePrompt() pipeline below.
// See openai-moderation.ts for the API integration.
// ---------------------------------------------------------------------------

// Forward declaration - will be imported after openai-moderation.ts is created
let checkOmniModeration: ((prompt: string) => Promise<{
  blocked: boolean;
  category: string | null;
  severity: ViolationSeverity | null;
  scores: Record<string, number>;
}>) | null = null;

/**
 * Registers the Tier 2 moderation function.
 * Called by openai-moderation.ts on import to inject the dependency.
 */
export function registerTier2(fn: typeof checkOmniModeration): void {
  checkOmniModeration = fn;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generic client-facing message. NEVER return the category, scores, or
 * matched terms to the client. This prevents probing oracles.
 */
export const CLIENT_BLOCK_MESSAGE = 'Your prompt violates our content guidelines.';

/**
 * Runs the full content moderation pipeline on a prompt.
 *
 * Call this BEFORE payment verification and BEFORE any API call.
 * Tier 3 (provider safety) is handled downstream by each generation provider.
 *
 * @param prompt - The user's generation prompt (raw, un-normalised)
 * @returns ModerationResult indicating if the prompt is allowed
 */
export async function moderatePrompt(prompt: string): Promise<ModerationResult> {
  const startTime = Date.now();

  // --- Normalise input ---
  const normalised = normaliseInput(prompt);

  if (!normalised) {
    return {
      allowed: false,
      reason: 'Empty prompt',
      tier: 1,
      flaggedTerms: [],
      processingTimeMs: Date.now() - startTime,
      severity: null,
      omniScores: null,
    };
  }

  // --- Tier 1: Regex Blocklist (with normalisation + leet fold for CSAM) ---
  const tier1 = checkTier1(normalised);
  if (tier1.blocked) {
    console.warn(
      `[Moderation] BLOCKED Tier 1. Category: ${tier1.category}. ` +
      `Severity: ${tier1.severity}. Terms: [${tier1.flaggedTerms.join(', ')}]`
    );
    return {
      allowed: false,
      reason: `Tier 1 block: ${tier1.category}`,
      tier: 1,
      flaggedTerms: tier1.flaggedTerms,
      processingTimeMs: Date.now() - startTime,
      severity: tier1.severity,
      omniScores: null,
    };
  }

  // --- Tier 2: OpenAI Omni-Moderation API ---
  if (checkOmniModeration) {
    try {
      const tier2 = await checkOmniModeration(normalised);
      if (tier2.blocked) {
        console.warn(
          `[Moderation] BLOCKED Tier 2 (omni-moderation). Category: ${tier2.category}. ` +
          `Severity: ${tier2.severity}. Scores: ${JSON.stringify(tier2.scores)}`
        );
        return {
          allowed: false,
          reason: `Tier 2 block: ${tier2.category}`,
          tier: 2,
          flaggedTerms: tier2.category ? [tier2.category] : [],
          processingTimeMs: Date.now() - startTime,
          severity: tier2.severity,
          omniScores: tier2.scores,
        };
      }
    } catch (err: any) {
      // Tier 2 fail-open for text moderation (PR #54 review decision)
      console.error(
        `[Moderation] Tier 2 (omni-moderation) FAILED, failing open: ${err.message}`
      );
    }
  }

  // --- Passed all checks ---
  return {
    allowed: true,
    reason: null,
    tier: null,
    flaggedTerms: [],
    processingTimeMs: Date.now() - startTime,
    severity: null,
    omniScores: null,
  };
}

// ---------------------------------------------------------------------------
// Exports for testing
// ---------------------------------------------------------------------------

export const __testing__ = {
  checkTier1,
  normaliseInput,
  leetFold,
  TIER1_BLOCKED_PATTERNS,
};
