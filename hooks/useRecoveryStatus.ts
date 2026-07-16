"use client";

/**
 * Shared "does this account have recovery?" state for the red warning banner
 * (shell + settings). One fetch per session, module-cached; RecoveryPanel
 * calls refreshRecoveryStatus() after add/remove/confirm so every banner
 * updates live.
 */
import { useEffect, useState } from "react";
import { sessionAuthHeaders } from "@/lib/session-headers";

export type RecoveryStatus = { total: number; confirmed: number };

let cache: RecoveryStatus | null = null;
let loading = false;
const EVENT = "enki-recovery-status";

async function load(): Promise<void> {
  if (loading) return;
  loading = true;
  try {
    const headers = sessionAuthHeaders();
    if (Object.keys(headers).length === 0) {
      cache = null;
    } else {
      const res = await fetch("/api/recovery/guardians", { headers });
      if (res.ok) {
        const data = (await res.json()) as { guardians?: { status: string }[] };
        const gs = data.guardians ?? [];
        cache = { total: gs.length, confirmed: gs.filter((g) => g.status === "confirmed").length };
      }
    }
  } catch {
    /* keep whatever we knew */
  } finally {
    loading = false;
    if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
  }
}

export function refreshRecoveryStatus() {
  void load();
}

/** null = unknown (not loaded / signed out) — banners stay hidden then. */
export function useRecoveryStatus(enabled = true): RecoveryStatus | null {
  const [status, setStatus] = useState<RecoveryStatus | null>(cache);
  useEffect(() => {
    const sync = () => setStatus(cache);
    window.addEventListener(EVENT, sync);
    if (enabled && cache === null) void load();
    return () => window.removeEventListener(EVENT, sync);
  }, [enabled]);
  return status;
}
