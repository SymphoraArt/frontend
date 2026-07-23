/**
 * Referral tracking (client-side store).
 *
 * A user refers a social link; the team reviews it ("suggested"), may rebuild
 * it into a prompt ("accepted", linked to the creation), and once it sells the
 * referrer earns a 50/50 revenue split with the artist ("earning").
 *
 * Backed by localStorage for now (no referral backend yet). Only real
 * submissions are stored (they append as "suggested"); rows from the old
 * example seeding are filtered out on read.
 */

export type ReferralStatus = "suggested" | "accepted" | "earning";
export type Referral = {
  id: string;
  url: string;
  platform: string;
  note: string;
  status: ReferralStatus;
  revenue: number; // the referrer's share (already the 50% split)
  creationId?: string; // present once accepted → links to the rebuilt prompt
  createdAt: string;
};

const PREFIX = "enki:referrals:";
const keyFor = (userKey?: string | null) => PREFIX + (userKey || "guest");

export function normalizeReferralUrl(u: string): string {
  return u.trim().toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[?#].*$/, "") // drop query / hash
    .replace(/\/+$/, "");   // drop trailing slash
}

export function listReferrals(userKey?: string | null): Referral[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(keyFor(userKey));
    // Early builds seeded example rows (ids "seed-…") — filter them out so
    // nobody keeps seeing mock referrals; only real submissions remain.
    if (raw) return (JSON.parse(raw) as Referral[]).filter((r) => !r.id.startsWith("seed-"));
  } catch { /* ignore */ }
  return [];
}

export function hasReferral(userKey: string | null | undefined, url: string): boolean {
  const n = normalizeReferralUrl(url);
  return listReferrals(userKey).some((r) => normalizeReferralUrl(r.url) === n);
}

/** Returns true if added, false if it was a duplicate. */
export function addReferral(userKey: string | null | undefined, r: { url: string; platform: string; note: string }): boolean {
  if (typeof window === "undefined") return false;
  const list = listReferrals(userKey);
  if (list.some((x) => normalizeReferralUrl(x.url) === normalizeReferralUrl(r.url))) return false;
  const item: Referral = { id: "ref-" + Date.now(), url: r.url, platform: r.platform, note: r.note, status: "suggested", revenue: 0, createdAt: new Date().toISOString() };
  try { localStorage.setItem(keyFor(userKey), JSON.stringify([item, ...list])); } catch { /* ignore */ }
  return true;
}
