/**
 * Username (users.handle) validation shared by the handle API (first-time
 * pick) and the profile API (later renames).
 */
export const HANDLE_VALID = /^[a-z0-9_]{3,20}$/;

export const HANDLE_RESERVED = new Set([
  "admin", "administrator", "enki", "enkiart", "enki_art", "guest", "support",
  "help", "api", "root", "system", "mod", "moderator", "team", "official",
  "settings", "wallet", "payment", "payments", "recovery", "billing", "everyone",
]);

export const normalizeHandle = (raw: string) => raw.trim().toLowerCase();
export const usableHandle = (h: string) => HANDLE_VALID.test(h) && !HANDLE_RESERVED.has(h);
