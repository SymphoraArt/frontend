"use client";

/**
 * Central notification store — shared by the sidebar badge and the panel.
 *
 * Instant: the list is module-cached, so opening the panel paints from memory
 * (no "Loading…" on re-open) while a background refresh runs.
 *
 * Near-realtime: a single poll (every POLL_MS) runs while anything is mounted,
 * plus an immediate refresh whenever the tab regains focus — so a guardian
 * accept/decline (or any account event) shows up without a manual reload. Our
 * custom session model doesn't fit Supabase Realtime+RLS, so this poll is the
 * pragmatic, robust path; markSeen is optimistic so the badge clears at once.
 */
import { useEffect, useState } from "react";
import { sessionAuthHeaders } from "@/lib/session-headers";

export type Notif = {
  id: string;
  kind: string;
  title: string;
  body: string | null;
  targetType: string | null;
  targetId: string | null;
  count: number;
  seen: boolean;
  createdAt: string;
};

export type NotifState = { items: Notif[]; unseen: number; loaded: boolean };

const POLL_MS = 15_000;
const EVENT = "enki-notifications";

let cache: NotifState = { items: [], unseen: 0, loaded: false };
let inflight = false;
let subscribers = 0;
let timer: ReturnType<typeof setInterval> | null = null;

function emit() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

async function fetchNow() {
  if (inflight) return;
  const headers = sessionAuthHeaders();
  if (Object.keys(headers).length === 0) {
    cache = { items: [], unseen: 0, loaded: true };
    emit();
    return;
  }
  inflight = true;
  try {
    const res = await fetch("/api/notifications", { headers });
    if (res.ok) {
      const d = (await res.json()) as { items?: Notif[]; unseen?: number };
      cache = { items: d.items ?? [], unseen: d.unseen ?? 0, loaded: true };
      emit();
    }
  } catch {
    /* keep the cached view */
  } finally {
    inflight = false;
  }
}

export function refreshNotifications() {
  void fetchNow();
}

/** Optimistically clear the badge (single source of truth), then persist. */
export async function markNotificationsSeen(cutoff?: string | null) {
  cache = { ...cache, unseen: 0, items: cache.items.map((i) => ({ ...i, seen: true })) };
  emit();
  try {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
      body: JSON.stringify({ cutoff: cutoff ?? null }),
    });
  } catch {
    /* the next poll reconciles */
  }
}

export function useNotifications(enabled = true): NotifState {
  const [state, setState] = useState<NotifState>(cache);
  useEffect(() => {
    if (!enabled) return;
    const sync = () => setState({ ...cache });
    const onFocus = () => { if (document.visibilityState !== "hidden") void fetchNow(); };
    window.addEventListener(EVENT, sync);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    if (!cache.loaded) void fetchNow();
    else setState({ ...cache });
    subscribers++;
    if (!timer) timer = setInterval(fetchNow, POLL_MS);

    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
      subscribers--;
      if (subscribers <= 0 && timer) { clearInterval(timer); timer = null; }
    };
  }, [enabled]);
  return state;
}
