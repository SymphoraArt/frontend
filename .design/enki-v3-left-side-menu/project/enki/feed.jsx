/* TopBar (sort + multi-select generators + search, scroll-hide) + Feed + Card */
const Icon = window.Icon;

function Dropdown({ label, dot, width, children, align }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div className="ek-gendd" ref={ref}>
      <button type="button" className={"ek-gendd-btn" + (open ? " open" : "")} style={width ? { minWidth: width } : undefined} onClick={() => setOpen((o) => !o)}>
        {dot}
        <span className="ek-gendd-val">{label}</span>
        <Icon name="chevronDown" size={15} stroke={2} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .18s ease" }} />
      </button>
      {open && <div className="ek-gendd-menu" style={align === "right" ? { right: 0, left: "auto" } : undefined}>{children(setOpen)}</div>}
    </div>
  );
}

const SORTS = ["Trending", "Newest", "Top rated", "Most tipped", "Following"];

function TopBar({ generators, activeGens, onToggleGen, onAllGen, sort, onSort, categories, activeCat, onCat, hidden, query, onQuery }) {
  const genLabel = activeGens.length === 0 ? "All"
    : activeGens.length === 1 ? generators.find((g) => g.id === activeGens[0]).short
    : activeGens.length + " generators";

  return (
    <header className={"ek-topbar" + (hidden ? " ek-topbar--hidden" : "")}>
      <div className="ek-topbar-row1">
        <span className="ek-genlabel">Sort</span>
        <Dropdown label={sort} width={150} dot={<Icon name="sliders" size={15} stroke={2} style={{ color: "var(--enki-ink-3)" }} />}>
          {(close) => SORTS.map((s) => (
            <button key={s} type="button" className={"ek-gendd-item" + (sort === s ? " active" : "")} onClick={() => { onSort(s); close(false); }}>{s}</button>
          ))}
        </Dropdown>

        <span className="ek-genlabel">Generator</span>
        <Dropdown label={genLabel} width={150}
          dot={<span className="ek-gen-dot" style={{ background: activeGens.length ? "var(--enki-ember)" : "var(--enki-ink-3)", boxShadow: activeGens.length ? "0 0 8px rgba(var(--ember-rgb),.7)" : "none" }} />}>
          {() => (
            <>
              <button type="button" className={"ek-gendd-item" + (activeGens.length === 0 ? " active" : "")} onClick={onAllGen}>
                <span className="ek-gen-dot" /> All
                {activeGens.length === 0 && <Icon name="check" size={15} stroke={2.4} style={{ marginLeft: "auto", color: "var(--enki-ember)" }} />}
              </button>
              {generators.map((g) => {
                const on = activeGens.includes(g.id);
                return (
                  <button key={g.id} type="button" className={"ek-gendd-item" + (on ? " active" : "")} onClick={() => onToggleGen(g.id)}>
                    <span className="ek-gen-dot" /> {g.name}
                    {on && <Icon name="check" size={15} stroke={2.4} style={{ marginLeft: "auto", color: "var(--enki-ember)" }} />}
                  </button>
                );
              })}
            </>
          )}
        </Dropdown>

        <div className="ek-search">
          <Icon name="search" size={16} stroke={2} style={{ color: "var(--enki-ink-3)", flexShrink: 0 }} />
          <input type="text" placeholder="Search prompts, styles, artists…" value={query} onChange={(e) => onQuery(e.target.value)} />
          <span className="ek-kbd">⌘K</span>
        </div>
      </div>

      <div className="ek-topbar-row2">
        <button className={"ek-cat" + (activeCat === "all" ? " active" : "")} onClick={() => onCat("all")} type="button">
          <Icon name="grid" size={14} stroke={2} /> All
        </button>
        <span className="ek-cat-divider" />
        {categories.map((c) => (
          <button key={c} type="button" className={"ek-cat" + (activeCat === c ? " active" : "")} onClick={() => onCat(c)}>{c}</button>
        ))}
      </div>
    </header>
  );
}

function Card({ prompt, faved, onToggleFav, onOpen }) {
  return (
    <article className="ek-card" onClick={() => onOpen(prompt)}>
      <div className="ek-card-img">
        <img src={prompt.img} alt={prompt.title} loading="lazy" />
        <span className="ek-card-badge">
          <Icon name={prompt.isVideo ? "film" : "image"} size={11} stroke={2}
            style={{ color: prompt.isVideo ? "var(--enki-ember)" : "#6b665e" }} />
          {prompt.generatorName}
        </span>
        <button className={"ek-heart" + (faved ? " active" : "")} type="button" aria-label="Favorite"
          onClick={(e) => { e.stopPropagation(); onToggleFav(prompt.id); }}>
          <Icon name="heart" size={15} stroke={2} fill={faved ? "currentColor" : "none"} />
        </button>
        {prompt.isVideo && <span className="ek-video-icon"><Icon name="play" size={15} fill="currentColor" stroke={0} /></span>}
        <div className="ek-card-overlay">
          <div className="ek-card-otitle">{prompt.title}</div>
          <div className="ek-card-oartist">{prompt.artist}</div>
          <div className="ek-card-ostats">
            <span><Icon name="heart" size={11} fill="currentColor" stroke={0} /> {prompt.downloads.toLocaleString()}</span>
            <span style={{ fontWeight: 600 }}>${prompt.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Feed({ prompts, favs, onToggleFav, onOpen, sentinelRef, loadingMore }) {
  return (
    <div className="ek-feed">
      <section className="ek-masonry">
        {prompts.map((p) => (
          <Card key={p.id} prompt={p} faved={!!favs[p.id]} onToggleFav={onToggleFav} onOpen={onOpen} />
        ))}
      </section>
      <div ref={sentinelRef} style={{ height: 1 }} />
      {loadingMore && (
        <section className="ek-masonry" style={{ marginTop: 14 }}>
          {[1.3, 0.7, 1.0, 1.2, 0.8, 1.4, 1.1, 0.9].map((r, i) => (
            <div key={i} className="ek-skel" style={{ height: 240 * r }} />
          ))}
        </section>
      )}
    </div>
  );
}

Object.assign(window, { TopBar, Feed, Card });
