"use client";

import { useEffect, useState } from "react";
import { sessionAuthHeaders } from "@/lib/session-headers";

// Shared DM store, mirroring useNotifications: one module-level cache + one
// poll timer no matter how many components subscribe (sidebar badge + panel).
// Same rationale as notifications: our custom session model doesn't fit
// Supabase Realtime + RLS, so it's polling + focus refresh.

export type DmPeer = { id: string; handle: string; name: string | null; avatarUrl: string | null };
export type DmLast = { body: string | null; hasImage: boolean; mine: boolean; at: string };
export type DmThread = { id: string; peer: DmPeer; last: DmLast | null; unread: number };

type MsgState = { threads: DmThread[]; unreadTotal: number; loaded: boolean };

let cache: MsgState = { threads: [], unreadTotal: 0, loaded: false };
let inflight = false;
let subscribers = 0;
let timer: ReturnType<typeof setInterval> | null = null;

const POLL_MS = 15_000;
const EVENT = "enki-messages";
const emit = () => window.dispatchEvent(new Event(EVENT));

async function fetchNow() {
  if (inflight) return;
  inflight = true;
  try {
    const headers = sessionAuthHeaders();
    if (Object.keys(headers).length === 0) {
      cache = { threads: [], unreadTotal: 0, loaded: true };
      emit();
      return;
    }
    const res = await fetch("/api/messages", { headers });
    if (res.ok) {
      const data = (await res.json()) as { threads?: DmThread[]; unreadTotal?: number };
      cache = { threads: data.threads ?? [], unreadTotal: data.unreadTotal ?? 0, loaded: true };
      emit();
    }
  } catch {
    // keep the cached view; the next poll reconciles
  } finally {
    inflight = false;
  }
}

export function refreshMessages() {
  void fetchNow();
}

/**
 * Optimistically zero a thread's unread count and move the server cursor.
 * Pass `upTo` (the max created_at actually displayed, DB time) so clock skew
 * and the fetch→mark gap can't mark unseen messages read; server is forward-only.
 */
export function markThreadRead(threadId: string, upTo?: string | null) {
  const t = cache.threads.find((x) => x.id === threadId);
  if (t && t.unread > 0) {
    cache = {
      ...cache,
      threads: cache.threads.map((x) => (x.id === threadId ? { ...x, unread: 0 } : x)),
      unreadTotal: Math.max(0, cache.unreadTotal - t.unread),
    };
    emit();
  }
  void fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
    body: JSON.stringify({ threadId, markRead: true, upTo: upTo ?? null }),
  }).catch(() => {}); // failures are fine — the next poll reconciles
}

export function useMessages(enabled = true) {
  const [state, setState] = useState<MsgState>(cache);

  useEffect(() => {
    if (!enabled) return;
    const sync = () => setState({ ...cache });
    const onFocus = () => {
      if (document.visibilityState !== "hidden") void fetchNow();
    };
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
      if (subscribers <= 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, [enabled]);

  return state;
}
