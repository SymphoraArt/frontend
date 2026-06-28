/**
 * Referral tracking (client-side store).
 *
 * A user refers a social link; the team reviews it ("suggested"), may rebuild
 * it into a prompt ("accepted", linked to the creation), and once it sells the
 * referrer earns a 50/50 revenue split with the artist ("earning").
 *
 * Backed by localStorage for now (no referral backend yet). Seeded with a few
 * example rows on first load so the Settings → Referrals table shows every
 * state; real submissions append as "suggested".
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

function seed(): Referral[] {
  return [
    { id: "seed-1", url: "https://instagram.com/p/Cv9x2Qk", platform: "Instagram", note: "Dreamy riverside golden-hour shot", status: "earning", revenue: 12.4, creationId: "riverside", createdAt: "2026-05-28T10:00:00Z" },
    { id: "seed-2", url: "https://x.com/artistry/status/1788", platform: "X", note: "Bold editorial terrace scene", status: "accepted", revenue: 0, creationId: "terrace", createdAt: "2026-06-06T14:30:00Z" },
    { id: "seed-3", url: "https://tiktok.com/@maker/video/772", platform: "TikTok", note: "Neon cyberpunk alley", status: "suggested", revenue: 0, createdAt: "2026-06-13T09:15:00Z" },
  ];
}

export function listReferrals(userKey?: string | null): Referral[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(keyFor(userKey));
    if (raw) return JSON.parse(raw) as Referral[];
  } catch { /* ignore */ }
  const s = seed();
  try { localStorage.setItem(keyFor(userKey), JSON.stringify(s)); } catch { /* ignore */ }
  return s;
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
