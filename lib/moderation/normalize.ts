/**
 * Match-only normalisation.
 *
 * PR #54's normaliser was NFKC + strip format chars + collapse whitespace.
 * Verified holes (all of these reached the image provider):
 *   child-porn   child_porn   child.porn   "ch ild porn"   "p e d o p h i l e"
 *   chíld pörn (diacritics)   pοrn (Greek omicron)
 *
 * The fix is two tracks, because neither alone works:
 *   spaced — separators collapse to ONE space, so \b anchors still mean
 *            something. Catches "child - porn".
 *   joined — every separator removed. Catches "c.h.i.l.d". But \b is
 *            meaningless here and substrings collide ("grapefruit" contains
 *            "rape"), so a rule must OPT IN to being matched this way.
 *
 * Nothing produced here is ever displayed, stored, or sent to a provider — it
 * exists only to be matched against.
 */

/**
 * Confusable folds. Applied to the whole string: folding everything means
 * `p0rn0graph` is caught too, and there is no downside because the folded text
 * is only ever used for matching.
 */
const FOLD: Record<string, string> = {
  "0": "o", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", "$": "s", "+": "t",
  // Cyrillic look-alikes
  "а": "a", "е": "e", "о": "o", "і": "i", "с": "c", "р": "p", "х": "x", "у": "y",
  "к": "k", "м": "m", "н": "h", "т": "t", "в": "b",
  // Greek look-alikes (missing from PR #54 — "pοrn" with a Greek omicron passed)
  "α": "a", "ε": "e", "ο": "o", "ι": "i", "ν": "v", "ρ": "p", "τ": "t", "υ": "u",
  "κ": "k", "χ": "x",
};

/**
 * `1` and `|` are ambiguous: `i` in "ch1ld", but `l` in "1o1i". A single fold
 * has to guess and therefore always loses one of them — PR #54 chose `i` and
 * so never caught the l-form. We emit BOTH readings instead and match against
 * each. Cost is one extra string.
 */
const AMBIGUOUS: Record<string, [string, string]> = {
  "1": ["i", "l"],
  "|": ["i", "l"],
  "!": ["i", "i"],
};

function fold(text: string, pick: 0 | 1): string {
  let out = "";
  for (const ch of text) {
    const amb = AMBIGUOUS[ch];
    if (amb) { out += amb[pick]; continue; }
    out += FOLD[ch] ?? ch;
  }
  return out;
}

/** Strip diacritics and invisibles, lowercase. NFKD also folds fullwidth forms. */
function baseNormalise(raw: string): string {
  return raw
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")            // combining marks: chíld -> child
    .replace(/[\p{Cf}\p{Cc}]/gu, "")    // zero-width, BOM, soft hyphen, controls
    .toLowerCase();
}

export interface MatchVariants {
  /** Separators collapsed to one space — \b anchors work here. */
  spaced: string[];
  /** All separators removed — substring matching only, opt-in per rule. */
  joined: string[];
}

export function matchVariants(raw: string): MatchVariants {
  const base = baseNormalise(raw);
  const folds = new Set([fold(base, 0), fold(base, 1)]);

  const spaced = new Set<string>();
  const joined = new Set<string>();
  for (const f of folds) {
    spaced.add(f.replace(/[^\p{L}\p{N}]+/gu, " ").trim());
    joined.add(f.replace(/[^\p{L}\p{N}]+/gu, ""));
  }
  return { spaced: [...spaced], joined: [...joined] };
}

/**
 * The display/logging form: readable, not aggressive. Used for the prompt hash
 * so the same prompt always hashes the same way regardless of invisibles.
 */
export function normaliseForHash(raw: string): string {
  return raw.normalize("NFKC").replace(/[\p{Cf}\p{Cc}]/gu, "").replace(/\s+/gu, " ").trim().toLowerCase();
}
