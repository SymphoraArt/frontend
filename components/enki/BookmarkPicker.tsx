"use client";

/**
 * The popup behind a card's bookmark button (Kev, 2026-08-22): every
 * category listed, "create new category" AT THE TOP; that opens a minimal
 * name field where Enter or Create files the bookmark into the fresh
 * category. Picking an existing category files it there directly.
 */
import { useEffect, useRef, useState } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import { listCategories, createCategory, addBookmark, bookmarksProblem, type BookmarkCategory } from "@/hooks/useBookmarks";
import "@/components/enki/bookmarks.css";

export default function BookmarkPicker({ promptId, imageUrl, onDone, onClose }: {
  promptId: string;
  imageUrl?: string | null;
  onDone?: (categoryName: string) => void;
  onClose: () => void;
}) {
  const [cats, setCats] = useState<BookmarkCategory[] | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [savingTo, setSavingTo] = useState<string | null>(null);
  const [savedTo, setSavedTo] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listCategories().then(setCats).catch((e) => { setCats([]); setFailed(bookmarksProblem(e)); });
  }, []);

  // Outside click / ESC close — capture, so the card's own link never fires.
  useEffect(() => {
    const onDown = (e: PointerEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) onClose(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("pointerdown", onDown, true); window.removeEventListener("keydown", onKey, true); };
  }, [onClose]);

  const saveInto = async (cat: BookmarkCategory) => {
    if (savingTo) return;
    setSavingTo(cat.id);
    try {
      await addBookmark(cat.id, promptId, imageUrl);
      setSavedTo(cat.id);
      onDone?.(cat.name);
      window.setTimeout(onClose, 650); // let the check register, then leave
    } catch {
      setSavingTo(null);
      setFailed("Bookmarks are unavailable right now.");
    }
  };

  const createAndSave = async () => {
    const n = name.trim();
    if (!n || savingTo) return;
    try {
      const cat = await createCategory(n);
      await saveInto(cat);
    } catch {
      setFailed("Bookmarks are unavailable right now.");
    }
  };

  return (
    <div ref={rootRef} className="enki-bmp" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
      {creating ? (
        <div className="enki-bmp-create">
          <input
            autoFocus value={name} maxLength={60} placeholder="Category name…"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") createAndSave(); }}
          />
          <button type="button" className="enki-bmp-go" disabled={!name.trim()} onClick={createAndSave}>Create</button>
        </div>
      ) : (
        <button type="button" className="enki-bmp-row enki-bmp-new" onClick={() => setCreating(true)}>
          <Plus size={13} /> Create new category
        </button>
      )}
      <div className="enki-bmp-list">
        {cats === null && <div className="enki-bmp-note"><Loader2 size={13} className="enki-bmp-spin" /> Loading…</div>}
        {cats?.length === 0 && !failed && <div className="enki-bmp-note">No categories yet — create one above.</div>}
        {failed && <div className="enki-bmp-note">{failed}</div>}
        {cats?.map((c) => (
          <button key={c.id} type="button" className="enki-bmp-row" disabled={!!savingTo} onClick={() => saveInto(c)}>
            {c.logoUrl
              ? <img src={c.logoUrl} alt="" className="enki-bmp-logo" draggable={false} />
              : <span className="enki-bmp-logo enki-bmp-logo-empty" />}
            <span className="enki-bmp-name">{c.name}</span>
            {savedTo === c.id
              ? <Check size={13} className="enki-bmp-ok" />
              : <span className="enki-bmp-count mono">{c.count}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
