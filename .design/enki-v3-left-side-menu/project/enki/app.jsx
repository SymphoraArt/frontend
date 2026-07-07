/* App root — state + wiring */
const { useState, useEffect, useRef, useCallback } = React;
const { Sidebar, TopBar, Feed, Detail, QuickCreate, PromptEditor, NodeCreator, Settings, Profile, Messages, TopUpModal, TipModal, ReferModal } = window;

const THEMES = ["light", "dark", "purple"];
const ACCOUNT = { name: "Maya Sørensen", handle: "maya", initials: "MS" };
const avatarFor = (h) => window.ENKI.genResult(h, "1:1");

function hashNum(s, min, max) {
  let n = 0; for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return min + (n % (max - min));
}
function buildPerson(name, handle, isSelf) {
  const banner = window.ENKI.genResult(handle + "banner", "16:9");
  if (isSelf) return {
    name, handle, avatar: avatarFor(handle), banner, country: "DK",
    bio: "Art director & prompt designer. Chasing light, texture and quiet drama across Nano Banana, GPT Image & Seedance.",
    location: "Copenhagen, DK", joined: "Mar 2024", followers: "12.4k", following: "318",
    promptsCount: 47, sales: 18230, earned: 9120, rating: 4.9, likes: "118.8k",
  };
  return {
    name, handle, avatar: avatarFor(handle), banner,
    country: ["PT", "KR", "DE", "IN"][hashNum(handle, 0, 4)],
    bio: "Independent prompt artist working in cinematic & editorial styles. Open for commissions and remixes.",
    location: ["Lisbon, PT", "Seoul, KR", "Berlin, DE", "Mumbai, IN"][hashNum(handle, 0, 4)],
    joined: ["Jan 2024", "Nov 2023", "Jun 2024", "Aug 2023"][hashNum(handle + "j", 0, 4)],
    followers: (hashNum(handle, 8, 64) / 10).toFixed(1) + "k", following: String(hashNum(handle + "f", 80, 600)),
    promptsCount: hashNum(handle + "p", 6, 40), sales: hashNum(handle + "s", 400, 9000),
    earned: hashNum(handle + "e", 300, 6000), rating: (4.3 + hashNum(handle + "r", 0, 6) / 10).toFixed(1),
    likes: (hashNum(handle + "l", 10, 240) / 10).toFixed(1) + "k",
  };
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("enki:theme") || "dark");
  const [narrow, setNarrow] = useState(() => window.innerWidth < 1100);
  const [collapsed, setCollapsed] = useState(false);

  const [activeNav, setActiveNav] = useState("home");
  const [view, setView] = useState("feed");           // feed | profile | messages
  const [activeGens, setActiveGens] = useState([]);   // [] = all
  const [sort, setSort] = useState("Trending");
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");
  const [topHidden, setTopHidden] = useState(false);

  const [items, setItems] = useState(window.ENKI.prompts);
  const [round, setRound] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [favs, setFavs] = useState(() => { try { return JSON.parse(localStorage.getItem("enki:favorites") || "{}"); } catch { return {}; } });
  const [selected, setSelected] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSeed, setEditorSeed] = useState(null);
  const [nodeOpen, setNodeOpen] = useState(false);
  const rail = narrow || collapsed || nodeOpen;
  const [qcSeed, setQcSeed] = useState(null);
  const [qcOpenTick, setQcOpenTick] = useState(0);

  const [balance, setBalance] = useState(() => { const v = localStorage.getItem("enki:balance"); return v ? Number(v) : 42.5; });
  const [modal, setModal] = useState(null);           // color | topup | tip
  const [tip, setTip] = useState(null);               // { person, cb }
  const [profilePerson, setProfilePerson] = useState(null);
  const [toast, setToast] = useState(null);

  const setBalanceP = (v) => { setBalance(v); localStorage.setItem("enki:balance", String(v)); };

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 1100);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rootClass = "enki-root" + (theme !== "light" ? " dark" : "") + (theme === "purple" ? " theme-purple" : "") + (rail ? " ek-root--rail" : "");

  /* scroll-hide top bar */
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setTopHidden(false);
      else if (y > lastY.current + 5) setTopHidden(true);
      else if (y < lastY.current - 5) setTopHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* infinite scroll */
  const obs = useRef(null);
  const sentinelRef = useCallback((node) => {
    if (obs.current) obs.current.disconnect();
    obs.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore && items.length < 240) {
        setLoadingMore(true);
        setTimeout(() => {
          setItems((prev) => [...prev, ...window.ENKI.morePrompts(round)]);
          setRound((r) => r + 1);
          setLoadingMore(false);
        }, 700);
      }
    }, { rootMargin: "600px" });
    if (node) obs.current.observe(node);
  }, [loadingMore, items.length, round]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  const applyTheme = (t) => { setTheme(t); localStorage.setItem("enki:theme", t); };

  const toggleFav = (id) => setFavs((cur) => { const next = { ...cur, [id]: !cur[id] }; localStorage.setItem("enki:favorites", JSON.stringify(next)); return next; });

  const goHome = () => { setView("feed"); setSelected(null); setEditorOpen(false); setNodeOpen(false); setProfilePerson(null); setActiveNav("home"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const onShare = (person) => showToast("Profile link copied · " + person.handle + ".enki.art");

  const onNav = (id) => {
    setNodeOpen(false);
    if (id === "home") { goHome(); return; }
    if (id === "messages") { setView("messages"); setSelected(null); setActiveNav("messages"); return; }
    if (id === "settings") { setView("settings"); setSelected(null); setActiveNav("settings"); return; }
    if (id === "search") { setActiveNav("search"); setView("feed"); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setActiveNav(id); setView("feed");
    if (["favorites", "leaderboard", "history"].includes(id)) { const lbl = (window.ENKI.NAV.find((n) => n.id === id) || {}).label || id; showToast(lbl + " — demo"); }
  };

  const openEditor = (s) => { setNodeOpen(false); setEditorSeed(s || null); setEditorOpen(true); };
  const remixInQuickCreate = (p) => { setQcSeed(p); setQcOpenTick((t) => t + 1); };
  const openProfile = (person) => { setNodeOpen(false); setProfilePerson(person); setView("profile"); setSelected(null); };
  const openTip = (person, cb) => { setTip({ person, cb }); setModal("tip"); };

  const addToFeed = (g) => {
    const gen = window.ENKI.GENERATORS.find((x) => x.id === g.model) || window.ENKI.GENERATORS[0];
    const item = { id: "new" + Date.now(), title: "Your generation", artist: ACCOUNT.name, handle: ACCOUNT.handle, category: "Abstract", generator: gen.id, generatorName: gen.short, isVideo: false, prompt: g.prompt, vars: [], tags: ["new"], ratio: 1, price: 0, downloads: 0, likes: 0, img: g.img, versions: [g.img, g.img, g.img, g.img] };
    setItems((prev) => [item, ...prev]);
    if (view !== "feed") goHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visible = items.filter((p) => {
    if (activeGens.length && !activeGens.includes(p.generator)) return false;
    if (activeCat !== "all" && p.category !== activeCat) return false;
    if (query) { const q = query.toLowerCase(); if (!p.title.toLowerCase().includes(q) && !p.prompt.toLowerCase().includes(q) && !p.tags.join(" ").toLowerCase().includes(q)) return false; }
    return true;
  });

  const pinsFor = (person) => {
    const own = items.filter((p) => p.handle === person.handle).slice(0, 4);
    return own.length >= 2 ? own : items.slice(0, 4);
  };

  return (
    <div className={rootClass}>
      <div className="ek-shell">
        <Sidebar nav={window.ENKI.NAV} active={activeNav} onNav={onNav} rail={rail}
          onCreate={() => openEditor(null)} account={ACCOUNT}
          onCreate2={() => { setNodeOpen(true); setSelected(null); }}
          onRefer={() => setModal("refer")}
          collapsed={rail} onToggleCollapse={() => { if (nodeOpen) setNodeOpen(false); else setCollapsed((c) => !c); }}
          balance={balance} onProfile={() => openProfile(buildPerson(ACCOUNT.name, ACCOUNT.handle, true))}
          onTopUp={() => setModal("topup")} theme={theme} setTheme={applyTheme} />

        <main className="ek-main">
          <TopBar generators={window.ENKI.GENERATORS} activeGens={activeGens}
            onToggleGen={(id) => setActiveGens((g) => g.includes(id) ? g.filter((x) => x !== id) : [...g, id])}
            onAllGen={() => setActiveGens([])} sort={sort} onSort={setSort}
            categories={window.ENKI.CATEGORIES} activeCat={activeCat} onCat={setActiveCat}
            hidden={topHidden} query={query} onQuery={setQuery} />
          <Feed prompts={visible} favs={favs} onToggleFav={toggleFav} onOpen={setSelected} sentinelRef={sentinelRef} loadingMore={loadingMore} />
        </main>
      </div>

      {view === "profile" && profilePerson && (
        <Profile person={profilePerson} onClose={goHome}
          generators={window.ENKI.GENERATORS} categories={window.ENKI.CATEGORIES}
          favs={favs} onToggleFav={toggleFav}
          onTip={(p) => openTip(p, null)} onShare={onShare}
          onMessage={() => { setView("messages"); setActiveNav("messages"); }}
          onOpenPrompt={(p) => { setSelected(p); }} />
      )}

      {view === "messages" && (
        <Messages onClose={goHome} avatarFor={avatarFor} onTip={(person, cb) => openTip(person, cb)} />
      )}

      {view === "settings" && (
        <Settings onClose={goHome} onToast={showToast} balance={balance}
          onTopUp={(amt, method) => { setBalanceP(balance + amt); showToast("Added $" + amt.toFixed(2) + " via " + (method === "stripe" ? "Card" : "PayPal")); }} />
      )}

      {selected && (
        <Detail prompt={selected} generators={window.ENKI.GENERATORS} onClose={() => setSelected(null)}
          faved={!!favs[selected.id]} onToggleFav={toggleFav} onToast={showToast} />
      )}

      {editorOpen && (
        <PromptEditor onClose={() => setEditorOpen(false)} seed={editorSeed}
          categories={window.ENKI.CATEGORIES} generators={window.ENKI.GENERATORS} onToast={showToast} />
      )}

      {nodeOpen && (
        <NodeCreator onClose={() => setNodeOpen(false)} onToast={showToast} theme={theme} />
      )}

      <QuickCreate onOpenEditor={() => openEditor(null)} onGenerated={addToFeed} onToast={showToast} seed={qcSeed} openTick={qcOpenTick} sidebarW={rail ? 78 : 256} pillHidden={editorOpen || nodeOpen || !!selected || view !== "feed"} />

      {modal === "refer" && <ReferModal onClose={() => setModal(null)} onSubmit={(r) => { setModal(null); showToast("Referral submitted for review · " + String(r.url || r).replace(/^https?:\/\//, "").slice(0, 32)); }} />}); }} />}
      {modal === "topup" && <TopUpModal balance={balance} onClose={() => setModal(null)}
        onAdd={(amt, method) => { setBalanceP(balance + amt); setModal(null); showToast("Added $" + amt.toFixed(2) + " via " + (method === "stripe" ? "Card" : "PayPal")); }} />}
      {modal === "tip" && tip && <TipModal person={tip.person} balance={balance} onClose={() => setModal(null)}
        onSend={(amt, method) => { if (method === "balance") setBalanceP(Math.max(0, balance - amt)); setModal(null); showToast("Sent $" + amt.toFixed(2) + " tip to " + tip.person.name.split(" ")[0]); tip.cb && tip.cb(amt); }} />}

      {toast && <div className="ek-toast"><Icon name="sparkles" size={16} stroke={2} fill="currentColor" /> {toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
