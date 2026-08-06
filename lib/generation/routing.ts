/**
 * Which host runs this generation, in what order, and under which settings.
 *
 * A plain ordered list of providers cannot express Kev's policy, because the
 * cheapest host changes with the SETTINGS. AceData charges one flat price for
 * gpt-image-2, so it loses at 1K low ($0.0105 against WaveSpeed's $0.010) and
 * wins from 2K up ($0.0105 against $0.020 and $0.030). "Cheapest here, absent
 * there" needs a condition, not a rank.
 *
 * So a route carries both:
 *   priority      lower is tried first
 *   appliesWhen   null = always; otherwise every key must match the request
 *
 * Everything here is pure. This decides where a paying customer's money goes,
 * and it must be testable without a database, a network or a provider.
 */

export type Audience = "public" | "enterprise" | "internal";

/** The request settings a route may be conditioned on. */
export interface RouteSettings {
  quality?: string | null;
  resolution?: string | null;
}

export interface RouteCandidate {
  /** model_providers row id — the key the circuit breaker is stored under. */
  id: string;
  providerId: string;
  providerKey: string;
  providerModel: string;
  role: string;
  priority: number;
  appliesWhen: Record<string, string[]> | null;
}

export interface RouteLink {
  id?: string | null;
  role?: string | null;
  provider_model?: string | null;
  active?: boolean | null;
  priority?: number | null;
  applies_when?: Record<string, string[]> | null;
  provider_id?: string | null;
  providers?: {
    id?: string | null;
    key?: string | null;
    audience?: string | null;
    active?: boolean | null;
  } | null;
}

/**
 * Does this route's condition accept the request?
 *
 * Fails CLOSED on a missing value. If a route is restricted to quality "low"
 * and the request did not say, we do not guess — an unstated quality means the
 * model's own default, which is not low, and routing on a guess would sell a
 * tier nobody asked for. Comparison is case-insensitive so a "2k" from one
 * caller and a "2K" in the row cannot silently send the buyer to the dearer
 * host.
 */
export function matchesConditions(
  appliesWhen: Record<string, string[]> | null | undefined,
  settings: RouteSettings,
): boolean {
  if (!appliesWhen) return true;

  for (const [key, accepted] of Object.entries(appliesWhen)) {
    if (!Array.isArray(accepted) || accepted.length === 0) return false;
    const value = (settings as Record<string, string | null | undefined>)[key];
    if (value === undefined || value === null || value === "") return false;
    const v = String(value).toLowerCase();
    if (!accepted.some((a) => String(a).toLowerCase() === v)) return false;
  }
  return true;
}

/**
 * Every route that could serve this request, best first.
 *
 * Ties on priority keep their input order, so a badly seeded table degrades
 * into "whatever the database returned" rather than into something random that
 * differs per request.
 */
export function eligibleRoutes(
  links: RouteLink[],
  settings: RouteSettings,
  role: string,
  audience: Audience = "public",
): RouteCandidate[] {
  return links
    .map((l, index) => ({ l, index }))
    .filter(({ l }) => {
      if (l.active === false) return false;
      if ((l.role ?? "normal") !== role) return false;
      const p = l.providers;
      if (!p?.key || p.active === false) return false;
      // An enterprise-only host must never be offered to a public caller —
      // the UI would advertise what it cannot deliver.
      const want = (p.audience as Audience) ?? "public";
      if (want !== "public" && want !== audience) return false;
      return matchesConditions(l.applies_when, settings);
    })
    .sort((a, b) => (a.l.priority ?? 100) - (b.l.priority ?? 100) || a.index - b.index)
    .map(({ l }) => ({
      id: String(l.id ?? ""),
      providerId: String(l.provider_id ?? l.providers?.id ?? ""),
      providerKey: String(l.providers!.key),
      providerModel: String(l.provider_model ?? ""),
      role: l.role ?? "normal",
      priority: l.priority ?? 100,
      appliesWhen: l.applies_when ?? null,
    }));
}

/**
 * The first route whose breaker is closed, plus the ones to probe on the way.
 *
 * `verdicts` answers "use" | "skip" | "probe" per route id — the caller owns
 * that because probing touches the network. A route to probe is returned as a
 * candidate rather than skipped: the probe is free and near-instant, so the
 * cheap host gets a chance to prove it is back before we spend more of the
 * buyer's money elsewhere.
 *
 * Returns every candidate in order when none is usable, because delivering the
 * image matters more than delivering it cheaply — "ordered means delivered".
 */
export function pickRoute(
  candidates: RouteCandidate[],
  verdict: (id: string) => "use" | "skip" | "probe",
): { chosen: RouteCandidate | null; probe: RouteCandidate[]; fallbacks: RouteCandidate[] } {
  const probe: RouteCandidate[] = [];
  for (const c of candidates) {
    const v = verdict(c.id);
    if (v === "use") {
      return { chosen: c, probe, fallbacks: candidates.filter((x) => x !== c) };
    }
    if (v === "probe") probe.push(c);
  }
  // Everything is down or awaiting a probe. Hand back the whole list rather
  // than nothing: a route believed dead is still better than no image.
  return { chosen: null, probe, fallbacks: candidates };
}
