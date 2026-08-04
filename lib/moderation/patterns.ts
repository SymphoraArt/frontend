/**
 * The curated rule set — ported from PR #54 (author: meetmarvelous), which did
 * the real triage work of deciding which terms are worth blocking at all.
 *
 * Four things changed in the port, each fixing a verified defect:
 *
 * 1. TRAILING \b ON EVERY ALTERNATION. PR #54 wrote /\bchild\s*(porn|sex|...)/
 *    with no closing boundary, so "sex" matched inside ordinary words. Verified
 *    false positives: "a child sextant engraving", "D minor sextet, chamber
 *    music poster", "erect cockerel at dawn" — all blocked, some as instant
 *    bans. Every group is now closed with \b.
 *
 * 2. THE AMBIGUOUS-YOUTH SPLIT. PR #54 put girl|boy|teen in the same hard rule
 *    as child|toddler|infant, so "nude girl reclining, classical oil painting"
 *    and "naked baby cherub, renaissance fresco" were instant permanent bans on
 *    an ART platform. Unambiguous minor terms stay hard; girl/boy/teen now
 *    require an explicit minority cue nearby.
 *
 * 3. NO RULE HERE CAN BAN. The worst a word list may do is block and ask a
 *    human. Bans come from the AI tier's high-confidence signal or from the
 *    council — never from a regex.
 *
 * 4. `joined` IS OPT-IN. Matching against separator-stripped text catches
 *    "c.h.i.l.d", but it also makes "grapefruit" contain "rape" and "crisis"
 *    contain "isis". Only compound-safe terms set it.
 *
 * Dropped from PR #54: /\bgore\s*(porn|video|image)/ — it fires on "Al Gore
 * video still". Graphic violence is exactly what the AI tier judges well, and a
 * surname is not something a word list can reason about.
 */
import type { Enforcement } from "./types";

export interface Rule {
  id: string;
  /** Matched against the space-normalised variants (\b anchors work). */
  spaced: RegExp;
  /** Optional: matched against separator-stripped variants. Compound-safe only. */
  joined?: RegExp;
  category: string;
  /** Never 'ban' — see the header. */
  enforcement: Extract<Enforcement, "review" | "log">;
}

/** Words that make "girl"/"boy"/"teen" unambiguously about a minor. */
const MINORITY_CUE = String.raw`(little|young|small|tiny|preteen|pre-teen|schoolgirl|schoolboy|primary school|elementary|kindergarten|[0-9]|1[0-7])`;

export const RULES: Rule[] = [
  // ── CSAM: unambiguous in any context. Block + human review, top priority. ──
  // `sex(?!t)` in the joined variants: the joined track has no word boundaries,
  // so "a child sextant engraving" collapses to "...childsextant..." and would
  // otherwise match "childsex". The guard rejects sextant/sextet while keeping
  // real compounds like "childsexual".
  {
    id: "csam.child_sexual",
    spaced: /\bchild(ren)?\s*(porn|sex|nude|naked|erotic|lewd)\b/,
    joined: /child(ren)?(porn|nude|naked|erotic|lewd|sex(?!t))/,
    category: "csam", enforcement: "review",
  },
  {
    id: "csam.underage_sexual",
    spaced: /\bunderage\s*(sex|nude|naked|porn|erotic|lewd)\b/,
    joined: /underage(porn|nude|naked|erotic|lewd|sex(?!t))/,
    category: "csam", enforcement: "review",
  },
  {
    id: "csam.minor_sexual",
    spaced: /\bminors?\s*(sex|nude|naked|porn|erotic|lewd)\b/,
    category: "csam", enforcement: "review",
  },
  {
    id: "csam.pedophile",
    spaced: /\bpedophil/,
    joined: /pedophil/,
    category: "csam", enforcement: "review",
  },
  { id: "csam.loli", spaced: /\bloli\b/, category: "csam", enforcement: "review" },
  {
    id: "csam.lolicon",
    spaced: /\blolicon\b/, joined: /lolicon/,
    category: "csam", enforcement: "review",
  },
  {
    id: "csam.shotacon",
    spaced: /\bshotacon\b/, joined: /shotacon/,
    category: "csam", enforcement: "review",
  },
  // "shota" is a common Japanese given name — only with a sexual term nearby.
  {
    id: "csam.shota_sexual",
    spaced: /\bshota\b(?=[\s\S]{0,40}\b(sex|nude|naked|erotic|porn|lewd|nsfw)\b)/,
    category: "csam", enforcement: "review",
  },
  // Unambiguous minor nouns: no art-prompt reading of "naked toddler".
  {
    id: "csam.nude_minor",
    spaced: /\b(nude|naked)\s*(child(ren)?|minors?|kids?|toddlers?|infants?)\b/,
    joined: /(nude|naked)(child(ren)?|minor|kid|toddler|infant)/,
    category: "csam", enforcement: "review",
  },
  // Ambiguous nouns — only with an explicit minority cue. Still review, never ban.
  //
  // "baby" sits here rather than in the hard rule above because the naked putto
  // is one of the most painted subjects in Western art: "naked baby cherub,
  // renaissance fresco" is an ordinary commission, and a word list cannot tell
  // it from a real one. That judgement is exactly what the AI tier is for.
  {
    id: "csam.nude_youth_with_cue",
    spaced: new RegExp(
      String.raw`\b(nude|naked)\s*(${MINORITY_CUE}\s*)+(girls?|boys?|teens?|teenagers?|bab(y|ies))\b` +
      "|" +
      String.raw`\b(nude|naked)\s*(girls?|boys?|teens?|teenagers?|bab(y|ies))\b(?=[\s\S]{0,30}\b${MINORITY_CUE}\b)`,
    ),
    category: "csam", enforcement: "review",
  },

  // ── Everything below: block the render, record it, punish nobody. ──
  {
    id: "sexual.pornographic",
    spaced: /\bpornograph/, joined: /pornograph/,
    category: "explicit_sexual", enforcement: "log",
  },
  { id: "sexual.nsfw_combo", spaced: /\bnsfw\s*(porn|sex|nude)\b/, category: "explicit_sexual", enforcement: "log" },
  { id: "sexual.explicit_act", spaced: /\bexplicit\s*(sex|intercourse|penetrat)\w*\b/, category: "explicit_sexual", enforcement: "log" },
  // No `joined`: "grapefruit" contains "rape" once separators are stripped.
  { id: "sexual.rape", spaced: /\brape\b/, category: "explicit_sexual", enforcement: "log" },
  { id: "sexual.gangbang", spaced: /\bgangbang\b/, category: "explicit_sexual", enforcement: "log" },
  // Trailing \b: PR #54 blocked "erect cockerel at dawn".
  { id: "sexual.erect", spaced: /\berect\s*(penis|dick|cock)\b/, category: "explicit_sexual", enforcement: "log" },

  { id: "violence.decapitation", spaced: /\bdecapitat/, category: "extreme_violence", enforcement: "log" },
  { id: "violence.dismemberment", spaced: /\bdismember/, category: "extreme_violence", enforcement: "log" },
  { id: "violence.mutilation", spaced: /\bmutilat/, category: "extreme_violence", enforcement: "log" },
  { id: "violence.torture_media", spaced: /\btorture\s*(porn|video|image)\b/, category: "extreme_violence", enforcement: "log" },
  { id: "violence.snuff", spaced: /\bsnuff\s*(film|movie|video)\b/, category: "extreme_violence", enforcement: "log" },

  { id: "terror.bomb_making", spaced: /\bbomb\s*making\b/, category: "terrorism", enforcement: "log" },
  { id: "terror.attack_manual", spaced: /\bterrorist\s*(attack|bomb|manual)\b/, category: "terrorism", enforcement: "log" },
  // No `joined`: "crisis" contains "isis".
  { id: "terror.isis", spaced: /\bisis\s*(flag|propaganda|recruit)\w*\b/, category: "terrorism", enforcement: "log" },

  { id: "selfharm.suicide_howto", spaced: /\bsuicide\s*(method|how\s*to|instruction|tutorial)\w*\b/, category: "self_harm", enforcement: "log" },
  { id: "selfharm.howto", spaced: /\bself\s*harm\s*(method|how\s*to|instruction|tutorial)\w*\b/, category: "self_harm", enforcement: "log" },
];
