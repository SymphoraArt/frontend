/** Free BLITZ (AI default) uses per wallet per UTC day. In-memory; resets on server restart. */

const FREE_PER_DAY = 7;

type DayBucket = { date: string; count: number };

const globalStore = globalThis as typeof globalThis & {
  __blitzQuota?: Map<string, DayBucket>;
};

function store(): Map<string, DayBucket> {
  if (!globalStore.__blitzQuota) {
    globalStore.__blitzQuota = new Map();
  }
  return globalStore.__blitzQuota;
}

function utcDay(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getBlitzQuota(userId: string): { remaining: number; used: number } {
  const d = utcDay();
  const key = userId.toLowerCase();
  let b = store().get(key);
  if (!b || b.date !== d) {
    b = { date: d, count: 0 };
    store().set(key, b);
  }
  return {
    remaining: Math.max(0, FREE_PER_DAY - b.count),
    used: b.count,
  };
}

/** Increment free-tier use after a successful BLITZ call. */
export function consumeBlitzFree(userId: string): void {
  const d = utcDay();
  const key = userId.toLowerCase();
  let b = store().get(key);
  if (!b || b.date !== d) {
    b = { date: d, count: 0 };
  }
  b.count += 1;
  store().set(key, b);
}
