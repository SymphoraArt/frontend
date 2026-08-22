"use client";

/**
 * The Bookmarks tab (Kev, 2026-08-22): all categories as a grid — each
 * wearing its FIRST bookmark as the logo — and inside a category every
 * bookmark in order, infinitely scrolled. The back arrow sits top-left,
 * leaves when reading scrolls down, and a brief scroll UP brings it back.
 * Drag & drop reorders; a drop between two neighbours takes their position
 * midpoint, so one PATCH moves one row and nothing renumbers.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Bookmark, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  listCategories, listBookmarks, moveBookmark, removeBookmark,
  type Bookmark as Mark, type BookmarkCategory,
} from "@/hooks/useBookmarks";
import "@/components/enki/bookmarks.css";

export default function BookmarksPanel() {
  const router = useRouter();
  const [cats, setCats] = useState<BookmarkCategory[] | null>(null);
  const [open, setOpen] = useState<BookmarkCategory | null>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    listCategories().then(setCats).catch(() => { setCats([]); setFailed(true); });
  }, []);

  const loadMore = useCallback(async (cat: BookmarkCategory, cur: number | null) => {
    setLoading(true);
    try {
      const page = await listBookmarks(cat.id, cur);
      setMarks((m) => (cur == null ? page.bookmarks : [...m, ...page.bookmarks]));
      setCursor(page.nextCursor);
      if (page.nextCursor == null) setDone(true);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const enter = (cat: BookmarkCategory) => {
    setOpen(cat); setMarks([]); setCursor(null); setDone(false); setFailed(false);
    void loadMore(cat, null);
  };
  const back = () => { setOpen(null); setMarks([]); listCategories().then(setCats).catch(() => {}); };

  /* Infinite scroll: a sentinel at the list's end asks for the next page.
     The scrolling element is this panel's own root. */
  const rootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open || done) return;
    const el = sentinelRef.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting) && !loading && cursor != null) void loadMore(open, cursor);
    }, { root: rootRef.current, rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, [open, cursor, loading, done, loadMore]);

  /* The back arrow: visible at the top, gone once reading scrolls down, back
     the moment the reader scrolls up even briefly. */
  const [arrowIn, setArrowIn] = useState(true);
  const lastY = useRef(0);
  const onScroll = () => {
    const y = rootRef.current?.scrollTop ?? 0;
    setArrowIn(y < 24 || y < lastY.current);
    lastY.current = y;
  };

  /* Drag & drop reorder. */
  const dragI = useRef<number | null>(null);
  const [overI, setOverI] = useState<number | null>(null);
  const drop = async (to: number) => {
    const from = dragI.current; dragI.current = null; setOverI(null);
    if (from == null || from === to || !marks[from]) return;
    const next = marks.slice();
    const [m] = next.splice(from, 1);
    const at = from < to ? to - 1 : to;
    next.splice(at, 0, m);
    // Midpoint of the new neighbours; falling off either end takes a step.
    const prev = next[at - 1]?.position;
    const after = next[at + 1]?.position;
    const pos = prev != null && after != null ? (prev + after) / 2 : prev != null ? prev + 1 : after != null ? after - 1 : m.position;
    setMarks(next.map((x, i) => (i === at ? { ...x, position: pos } : x)));
    try { await moveBookmark(m.id, pos); } catch { open && enter(open); /* re-sync on failure */ }
  };

  const remove = async (m: Mark) => {
    setMarks((all) => all.filter((x) => x.id !== m.id));
    try { await removeBookmark(m.id); } catch { open && enter(open); }
  };

  if (!open) {
    return (
      <div className="enki-bm-root" ref={rootRef}>
        {cats === null && <div className="enki-bm-note"><Loader2 size={14} className="enki-bmp-spin" /> Loading…</div>}
        {failed && <div className="enki-bm-note">Bookmarks are unavailable right now.</div>}
        {cats?.length === 0 && !failed && (
          <div className="enki-bm-note">
            <Bookmark size={15} /> Nothing saved yet — tap the bookmark on any image to start a category.
          </div>
        )}
        <div className="enki-bm-cats">
          {cats?.map((c) => (
            <button key={c.id} type="button" className="enki-bm-cat" onClick={() => enter(c)}>
              {c.logoUrl ? <img src={c.logoUrl} alt="" draggable={false} /> : <span className="enki-bm-cat-empty"><Bookmark size={18} /></span>}
              <span className="enki-bm-cat-name">{c.name}</span>
              <span className="enki-bm-cat-count mono">{c.count}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="enki-bm-root" ref={rootRef} onScroll={onScroll}>
      <button type="button" className={"enki-bm-back" + (arrowIn ? "" : " enki-bm-back--out")} onClick={back} aria-label="Back to categories">
        <ArrowLeft size={16} /> {open.name}
      </button>
      <div className="enki-bm-grid">
        {marks.map((m, i) => (
          <div key={m.id}
            className={"enki-bm-item" + (overI === i && dragI.current !== null && dragI.current !== i ? " over" : "")}
            draggable
            onDragStart={(e) => { e.dataTransfer.setData("text/plain", ""); e.dataTransfer.effectAllowed = "move"; dragI.current = i; }}
            onDragOver={(e) => { e.preventDefault(); if (overI !== i) setOverI(i); }}
            onDrop={(e) => { e.preventDefault(); void drop(i); }}
            onDragEnd={() => { dragI.current = null; setOverI(null); }}>
            {m.imageUrl
              ? <img src={m.imageUrl} alt="" draggable={false} onClick={() => router.push(`/generator/${m.promptId}`)} />
              : <span className="enki-bm-cat-empty"><Bookmark size={16} /></span>}
            <button type="button" className="enki-bm-x" title="Remove bookmark" onClick={() => void remove(m)}><Trash2 size={12} /></button>
          </div>
        ))}
      </div>
      {loading && <div className="enki-bm-note"><Loader2 size={14} className="enki-bmp-spin" /> Loading…</div>}
      {failed && <div className="enki-bm-note">Couldn't load more right now.</div>}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
