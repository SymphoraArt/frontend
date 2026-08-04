/**
 * Tier 1 — the word-list pre-filter.
 *
 * Pure, synchronous, no I/O, no database. It runs before the AI tier so that
 * prompt text matching an unambiguous CSAM rule never leaves our infrastructure
 * to a third party, and so obvious cases cost no API call.
 *
 * It is a PRE-FILTER, not a judge: the strongest outcome it can produce is
 * "block this render and put the case in front of a human".
 */
import { matchVariants } from "./normalize";
import { RULES } from "./patterns";
import type { Enforcement, Tier1Result } from "./types";

/** Ranked so a CSAM hit is never relabelled by a later, milder match. */
const RANK: Record<Enforcement, number> = { none: 0, log: 1, review: 2, strike: 3, ban: 4 };

export function screenTier1(prompt: string): Tier1Result {
  const { spaced, joined } = matchVariants(prompt);

  const matchedRules: string[] = [];
  let category: string | null = null;
  let enforcement: Enforcement = "none";

  for (const rule of RULES) {
    const hit =
      spaced.some((v) => rule.spaced.test(v)) ||
      (rule.joined !== undefined && joined.some((v) => rule.joined!.test(v)));
    if (!hit) continue;

    matchedRules.push(rule.id);
    // Highest severity wins for BOTH fields. PR #54 advanced severity but
    // overwrote category on every match, so "loli rape scene" was recorded as
    // explicit_sexual while banning for CSAM — a corrupt audit trail on the one
    // category where the record matters most.
    if (RANK[rule.enforcement] > RANK[enforcement]) {
      enforcement = rule.enforcement;
      category = rule.category;
    }
  }

  return { blocked: matchedRules.length > 0, matchedRules, category, enforcement };
}
