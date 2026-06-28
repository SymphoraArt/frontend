/* Profile view — banner + left-aligned identity + filtered endless feed of creations */
const Icon = window.Icon;
const { useState, useRef, useCallback, useMemo, useEffect } = React;

function Profile({ person, onClose, onTip, onMessage, onShare, onOpenPrompt, favs, onToggleFav, generators, categories }) {
  const [items, setItems] = useState(() => window.ENKI.prompts.slice());
  const [round, setRound] = useState(1);
  const [gen, setGen] = useState(null);
  const [cat, setCat] = useState("all");
  const [tier, setTier] = useState("all");
  const [genOpen, setGenOpen] = useState(false);
  const genRef = useRef(null);

  useEffect(() => { const k = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  useEffect(() => {
    const onDoc = (e) => { if (genRef.current && !genRef.current.contains(e.target)) setGenOpen(false); };
    document.addEventListener("mousedown", onDoc); return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const obs = useRef(null);
  const sentinel = useCallback((node) => {
    if (obs.current) obs.current.disconnect();
    obs.current = new IntersectionObserver((es) => {
      if (es[0].isIntersecting && items.length < 120) { setItems((p) => [...p, ...window.ENKI.morePrompts(round)]); setRound((r) => r + 1); }
    }, { rootMargin: "500px" });
    if (node) obs.current.observe(node);
  }, [items.length, round]);

  const visible = useMemo(() => items.filter((p) => (!gen || p.generator === gen) && (cat === "all" || p.category === cat) && (tier === "all" || (tier === "paid" ? p.paid : !p.paid))), [items, gen, cat, tier]);
  const genLabel = gen ? generators.find((g) => g.id === gen).short : "All generators";

  return (
    <div className="ek-view">
      <div className="ek-view-top">
        <button className="ek-back" type="button" onClick={onClose}><Icon name="chevronLeft" size={17} stroke={2.2} /> Back</button>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--enki-ink-3)" }}>@{person.handle}</div>
      </div>

      <div className="ek-view-scroll">
        <div className="ek-pf2-banner"><img src={person.banner} alt="" /></div>
        <div className="ek-pf2">
          <div className="ek-pf2-headrow">
            <img className="ek-pf2-av" src={person.avatar} alt={person.name} />
            <div className="ek-pf2-actions">
              <button className="ek-btn" style={{ width: "auto", minHeight: 40, padding: "0 18px" }} onClick={() => onMessage(person)}><Icon name="mail" size={16} stroke={2} /> Message</button>
              <button className="ek-btn ek-btn-2" style={{ width: "auto", minHeight: 40, padding: "0 18px" }} onClick={() => onTip(person)}><Icon name="gift" size={16} stroke={2} /> Tip</button>
              <button className="ek-btn ek-btn-2" style={{ width: "auto", minHeight: 40, padding: "0 18px" }} onClick={() => onShare(person)}><Icon name="userPlus" size={15} stroke={2} /> Follow</button>
              <button className="ek-pf2-icon" onClick={() => onShare(person)} title="Share profile"><Icon name="link" size={17} stroke={2} /></button>
            </div>
          </div>

          <div className="ek-pf2-namerow">
            <span className="ek-pf2-name">{person.name}</span>
            <span className="ek-pf2-id">{person.country}</span>
          </div>
          <div className="ek-pf2-handle">@{person.handle}</div>
          <div className="ek-pf2-bio">{person.bio}</div>

          <div className="ek-pf2-meta">
            <span><Icon name="mapPin" size={14} stroke={2} /> {person.location}</span>
            <span><Icon name="link" size={14} stroke={2} /> <a style={{ color: "var(--enki-ember)" }}>{person.handle}.enki.art</a></span>
            <span><Icon name="calendar" size={14} stroke={2} /> Joined {person.joined}</span>
            <span><b>{person.followers}</b> Followers</span>
            <span><b>{person.following}</b> Following</span>
          </div>

          <div className="ek-pf2-stats">
            <div className="ek-pf2-stat"><b>{person.promptsCount}</b><span>Prompts</span></div>
            <div className="ek-pf2-stat"><b>{person.sales.toLocaleString()}</b><span>Renders sold</span></div>
            <div className="ek-pf2-stat"><b>${person.earned.toLocaleString()}</b><span>Earned</span></div>
            <div className="ek-pf2-stat"><b>{person.rating}</b><span>Avg rating</span></div>
            <div className="ek-pf2-stat"><b>{person.likes}</b><span>Likes</span></div>
          </div>

          {/* Filter bar (top-left): generators + categories */}
          <div className="ek-pf2-filter">
            <div className="ek-gendd" ref={genRef}>
              <button type="button" className={"ek-gendd-btn" + (genOpen ? " open" : "")} style={{ minWidth: 150 }} onClick={() => setGenOpen((o) => !o)}>
                <span className="ek-gen-dot" style={{ background: gen ? "var(--enki-ember)" : "var(--enki-ink-3)" }} />
                <span className="ek-gendd-val">{genLabel}</span>
                <Icon name="chevronDown" size={15} stroke={2} style={{ transform: genOpen ? "rotate(180deg)" : "none" }} />
              </button>
              {genOpen && (
                <div className="ek-gendd-menu">
                  <button type="button" className={"ek-gendd-item" + (!gen ? " active" : "")} onClick={() => { setGen(null); setGenOpen(false); }}><span className="ek-gen-dot" /> All generators</button>
                  {generators.map((g) => <button key={g.id} type="button" className={"ek-gendd-item" + (gen === g.id ? " active" : "")} onClick={() => { setGen(g.id); setGenOpen(false); }}><span className="ek-gen-dot" /> {g.name}</button>)}
                </div>
              )}
            </div>
            <div className="ek-pf2-tier">
              <button className={"ek-pf2-tierbtn" + (tier === "all" ? " active" : "")} onClick={() => setTier("all")}>All</button>
              <button className={"ek-pf2-tierbtn" + (tier === "free" ? " active" : "")} onClick={() => setTier("free")}>Free</button>
              <button className={"ek-pf2-tierbtn" + (tier === "paid" ? " active" : "")} onClick={() => setTier("paid")}>Paid</button>
            </div>
            <div className="ek-pf2-cats">
              <button className={"ek-cat" + (cat === "all" ? " active" : "")} onClick={() => setCat("all")} style={{ height: 40 }}><Icon name="grid" size={14} stroke={2} /> All</button>
              {categories.map((c) => <button key={c} className={"ek-cat" + (cat === c ? " active" : "")} onClick={() => setCat(c)} style={{ height: 40 }}>{c}</button>)}
            </div>
          </div>

          <section className="ek-masonry ek-pf2-feed">
            {visible.map((p) => <window.Card key={p.id} prompt={p} faved={!!favs[p.id]} onToggleFav={onToggleFav} onOpen={onOpenPrompt} />)}
          </section>
          <div ref={sentinel} style={{ height: 1 }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Profile });
