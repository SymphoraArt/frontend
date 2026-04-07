export type CreationStatus = "pending" | "completed" | "failed";

export type StoredCreation = {
  id: string;
  /** Set when status is 'completed' */
  imageUrl?: string;
  prompt: string;
  createdAt: string;
  /** Default 'completed' for backward compatibility */
  status?: CreationStatus;
  /** Optional: quick_create | prompt_editor */
  source?: "quick_create" | "prompt_editor";
  /** Optional: aspect ratio for regenerate, e.g. "1:1", "16:9" */
  aspectRatio?: string;
  /** Optional: resolution for regenerate */
  resolution?: "1K" | "2K" | "4K";
};

const STORAGE_PREFIX = "aigency:creations:";
const LIKES_PREFIX = "aigency:creations_likes:";
const UPDATE_EVENT = "aigency:creations_updated";

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

function normalizeCreation(c: StoredCreation): StoredCreation {
  if (c.status) return c;
  return { ...c, status: c.imageUrl ? "completed" : "pending" };
}

export function listCreations(userKey: string): StoredCreation[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(getStorageKey(userKey));
  const items = safeParse<StoredCreation[]>(raw, []);
  const list = Array.isArray(items) ? items : [];
  return list.map(normalizeCreation);
}

export function addCreation(userKey: string, creation: StoredCreation): void {
  if (typeof window === "undefined") return;
  const key = getStorageKey(userKey);
  const existing = listCreations(userKey);
  const normalized = normalizeCreation(creation);
  const next = [normalized, ...existing];
  window.localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { userKey } }));
}

export function updateCreation(
  userKey: string,
  id: string,
  patch: Partial<Pick<StoredCreation, "status" | "imageUrl" | "prompt" | "aspectRatio" | "resolution">>
): void {
  if (typeof window === "undefined") return;
  const key = getStorageKey(userKey);
  const existing = listCreations(userKey);
  const idx = existing.findIndex((c) => c.id === id);
  if (idx === -1) return;
  const updated = { ...existing[idx], ...patch };
  const next = [...existing];
  next[idx] = normalizeCreation(updated);
  window.localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { userKey } }));
}

export function removeCreation(userKey: string, id: string): void {
  if (typeof window === "undefined") return;
  const key = getStorageKey(userKey);
  const next = listCreations(userKey).filter((c) => c.id !== id);
  window.localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { userKey } }));
}

export function clearCreations(userKey: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getStorageKey(userKey));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { userKey } }));
}

export function subscribeCreations(
  userKey: string,
  onChange: (items: StoredCreation[]) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const ce = e as CustomEvent<{ userKey?: string }>;
    if (ce?.detail?.userKey && ce.detail.userKey !== userKey) return;
    onChange(listCreations(userKey));
  };

  const storageHandler = (e: StorageEvent) => {
    if (e.key !== getStorageKey(userKey)) return;
    onChange(listCreations(userKey));
  };

  window.addEventListener(UPDATE_EVENT, handler as EventListener);
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(UPDATE_EVENT, handler as EventListener);
    window.removeEventListener("storage", storageHandler);
  };
}

/** Get set of creation IDs liked by the user (localStorage) */
function getLikesKey(userKey: string) {
  return `${LIKES_PREFIX}${userKey}`;
}

export function getCreationLiked(userKey: string, creationId: string): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.localStorage.getItem(getLikesKey(userKey));
  const ids = safeParse<string[]>(raw, []);
  return Array.isArray(ids) && ids.includes(creationId);
}

export function toggleCreationLike(userKey: string, creationId: string): boolean {
  if (typeof window === "undefined") return false;
  const key = getLikesKey(userKey);
  const raw = window.localStorage.getItem(key);
  const ids = safeParse<string[]>(raw, []);
  const list = Array.isArray(ids) ? ids : [];
  const next = list.includes(creationId) ? list.filter((id) => id !== creationId) : [...list, creationId];
  window.localStorage.setItem(key, JSON.stringify(next));
  return next.includes(creationId);
}
