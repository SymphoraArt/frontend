/**
 * Persistence for the prompt editor's "Verify" cards.
 *
 * Verify cards carry generated images and per-card reference images that
 * are usually base64 `data:` URLs — far too large for localStorage's
 * ~5MB quota (where the lightweight text draft lives). So they get their
 * own IndexedDB store, mirroring `lib/creations.ts`. This keeps the
 * editor session — variable values AND reference images for every
 * parked render — intact across refreshes without risking the main
 * draft save.
 */

export interface PersistedVersionCard {
  id: number;
  variableSnapshot: Record<string, string>;
  imageUrl: string | null;
  sourceUrl?: string | null;
  status: "idle" | "queued" | "generating" | "complete" | "failed";
  queuePosition?: number;
  referenceImages?: string[];
}

const DB_NAME = "enki-editor";
const DB_VERSION = 1;
const STORE = "verify-versions";
// The editor draft is a single global session (not per-user), so a fixed
// key is enough — it matches the single localStorage draft key.
const KEY = "current";

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

/** Loads the saved verify cards (empty array if none / unavailable). */
export async function loadEditorVersions(): Promise<PersistedVersionCard[]> {
  if (typeof window === "undefined") return [];
  const db = await openDB();
  if (!db) return [];
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () =>
        resolve(Array.isArray(req.result) ? (req.result as PersistedVersionCard[]) : []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

/** Persists the current verify cards (overwrites the previous set). */
export async function saveEditorVersions(
  versions: PersistedVersionCard[]
): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const db = await openDB();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(versions, KEY);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/** Clears all persisted verify cards (used by the editor's "New" action). */
export async function clearEditorVersions(): Promise<boolean> {
  return saveEditorVersions([]);
}
