export type StoredCreation = {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
  /** Reference images (data URLs) used to create this image, if any. */
  referenceImages?: string[];
  /** Aspect ratio used for generation (e.g. "1:1") so re-generation matches. */
  aspectRatio?: string;
};

const STORAGE_PREFIX = "aigency:creations:";
const UPDATE_EVENT = "aigency:creations_updated";

// IndexedDB is the primary store: generated images (and reference images) are
// base64 data URLs when blob storage isn't configured, and those easily exceed
// localStorage's ~5MB quota — so a single creation with a reference image could
// fail to save entirely. IndexedDB has a far larger quota (hundreds of MB), so
// ALL creations persist. localStorage is kept only as a fallback / migration source.
const DB_NAME = "aigency";
const DB_VERSION = 1;
const STORE = "creations";

function getStorageKey(userKey: string) {
  return `${STORAGE_PREFIX}${userKey}`;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function stripRefs(c: StoredCreation): StoredCreation {
  if (!c.referenceImages) return c;
  const { referenceImages: _drop, ...rest } = c;
  return rest;
}

/**
 * Get user key from Thirdweb account
 */
export function getUserKeyFromAccount(account: { address: string } | null | undefined): string | null {
  if (!account?.address) return null;
  return account.address;
}

/**
 * @deprecated Use getUserKeyFromAccount instead
 * Kept for backward compatibility during migration
 */
export function getUserKeyFromPrivyUser(user: unknown): string | null {
  const u = user as any;
  if (!u) return null;
  // Try to extract wallet address if it's a Thirdweb account-like object
  if (u.address) return u.address;
  return (
    u.id ||
    u.userId ||
    u?.wallet?.address ||
    u?.email?.address ||
    u?.google?.email ||
    null
  );
}

/* ── IndexedDB helpers ───────────────────────────────────────────── */

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openDB(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    try {
      if (typeof indexedDB === "undefined") return resolve(null);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
}

async function idbGet(userKey: string): Promise<StoredCreation[] | null> {
  const db = await openDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(userKey);
      req.onsuccess = () => resolve(Array.isArray(req.result) ? (req.result as StoredCreation[]) : null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbSet(userKey: string, items: StoredCreation[]): Promise<boolean> {
  const db = await openDB();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(items, userKey);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/* ── localStorage fallback (graceful degrade when IndexedDB is unavailable) ── */

function lsWrite(userKey: string, items: StoredCreation[]): void {
  const key = getStorageKey(userKey);
  const tryWrite = (list: StoredCreation[]): boolean => {
    try {
      window.localStorage.setItem(key, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  };
  if (tryWrite(items)) return;
  // Reference images are the heaviest payload — drop them first.
  let slim = items.map(stripRefs);
  if (tryWrite(slim)) return;
  // Then drop the oldest entries until it fits.
  while (slim.length > 1) {
    slim = slim.slice(0, slim.length - 1);
    if (tryWrite(slim)) return;
  }
  // Last resort: only the newest, without references.
  if (slim.length) tryWrite([stripRefs(slim[0])]);
}

/* ── Read / write (IndexedDB first, migrate legacy localStorage) ──── */

async function readAll(userKey: string): Promise<StoredCreation[]> {
  if (typeof window === "undefined") return [];
  const fromIdb = await idbGet(userKey);
  if (fromIdb) return fromIdb;
  // Migrate any legacy localStorage data into IndexedDB the first time.
  const legacy = safeParse<StoredCreation[]>(window.localStorage.getItem(getStorageKey(userKey)), []);
  const items = Array.isArray(legacy) ? legacy : [];
  if (items.length) await idbSet(userKey, items);
  return items;
}

async function writeAll(userKey: string, items: StoredCreation[]): Promise<void> {
  if (typeof window === "undefined") return;
  const ok = await idbSet(userKey, items);
  if (!ok) lsWrite(userKey, items); // IndexedDB unavailable — degrade to localStorage
}

function emit(userKey: string) {
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { userKey } }));
}

/* ── Public API ──────────────────────────────────────────────────── */

export async function listCreations(userKey: string): Promise<StoredCreation[]> {
  return readAll(userKey);
}

export function addCreation(userKey: string, creation: StoredCreation): void {
  if (typeof window === "undefined") return;
  void (async () => {
    const existing = await readAll(userKey);
    await writeAll(userKey, [creation, ...existing]);
    emit(userKey);
  })();
}

export function removeCreation(userKey: string, id: string): void {
  if (typeof window === "undefined") return;
  void (async () => {
    const existing = await readAll(userKey);
    await writeAll(userKey, existing.filter((c) => c.id !== id));
    emit(userKey);
  })();
}

export function clearCreations(userKey: string): void {
  if (typeof window === "undefined") return;
  void (async () => {
    await idbSet(userKey, []);
    try {
      window.localStorage.removeItem(getStorageKey(userKey));
    } catch {
      /* ignore */
    }
    emit(userKey);
  })();
}

export function subscribeCreations(
  userKey: string,
  onChange: (items: StoredCreation[]) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const ce = e as CustomEvent<{ userKey?: string }>;
    if (ce?.detail?.userKey && ce.detail.userKey !== userKey) return;
    void readAll(userKey).then(onChange);
  };

  const storageHandler = (e: StorageEvent) => {
    if (e.key !== getStorageKey(userKey)) return;
    void readAll(userKey).then(onChange);
  };

  window.addEventListener(UPDATE_EVENT, handler as EventListener);
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(UPDATE_EVENT, handler as EventListener);
    window.removeEventListener("storage", storageHandler);
  };
}
