/* Shared Icon (window.Icon) + Sidebar (with Color Setup dropdown) */

const Icon = ({ name, size = 22, stroke = 2, className, style, fill = "none" }) => {
  const path = window.EnkiIcons[name] || "";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}
      dangerouslySetInnerHTML={{ __html: path }} />
  );
};

const THEME_OPTS = [
  { id: "light", name: "Bright", sw: "linear-gradient(135deg,#faf8f4,#e8e2d6)" },
  { id: "dark", name: "Dark", sw: "linear-gradient(135deg,#0a1825,#16303f)" },
  { id: "purple", name: "Purple", sw: "linear-gradient(135deg,#1a1228,#6d28d9)" },
];

function Sidebar({ nav, active, onNav, rail, onCreate, onCreate2, onRefer, account, onToggleCollapse, collapsed, balance, onProfile, onTopUp, theme, setTheme }) {
  const [colorOpen, setColorOpen] = React.useState(false);
  const colorRef = React.useRef(null);
  React.useEffect(() => {
    if (!colorOpen) return;
    const onDoc = (e) => { if (colorRef.current && !colorRef.current.contains(e.target)) setColorOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [colorOpen]);

  return (
    <aside className="ek-sidebar">
      <button className="ek-collapse-btn" type="button" onClick={onToggleCollapse} aria-label={collapsed ? "Expand menu" : "Collapse menu"} title={collapsed ? "Expand menu" : "Collapse menu"}>
        <Icon name="chevronLeft" size={16} stroke={2.4} style={{ transform: collapsed ? "rotate(180deg)" : "none" }} />
      </button>

      <a className="ek-logo" onClick={() => onNav("home")}>
        {rail ? <span className="ek-logo-mark">e</span> : <img className="ek-logo-img" src="public/enki-art-logo.png" alt="Enki Art" />}
      </a>

      <nav className="ek-nav">
        {nav.map((item) => {
          if (item.id === "color") {
            return (
              <div key="color" ref={colorRef} style={{ position: "relative" }}>
                <button className={"ek-nav-item" + (colorOpen ? " active" : "")} onClick={() => setColorOpen((o) => !o)} type="button">
                  <span className="ek-nav-ico"><Icon name="palette" size={23} stroke={colorOpen ? 2.4 : 1.9} /></span>
                  {!rail && <span className="ek-nav-label">Color Setup</span>}
                  {!rail && <Icon name="chevronDown" size={15} stroke={2} style={{ transform: colorOpen ? "rotate(180deg)" : "none", color: "var(--enki-ink-3)" }} />}
                  {rail && <span className="ek-nav-tip">Color Setup</span>}
                </button>
                {colorOpen && (
                  <div className="ek-color-dd" style={{ left: rail ? 70 : 14, bottom: "auto", top: "auto", marginTop: 4, position: "absolute" }}>
                    <div className="ek-color-dd-h">Color setup</div>
                    {THEME_OPTS.map((t) => (
                      <button key={t.id} type="button" className={"ek-color-opt" + (theme === t.id ? " active" : "")} onClick={() => { setTheme(t.id); }}>
                        <span className="ek-color-sw" style={{ background: t.sw }} />
                        {t.name}
                        {theme === t.id && <span className="ek-color-check"><Icon name="check" size={16} stroke={2.4} /></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <button key={item.id} className={"ek-nav-item" + (active === item.id ? " active" : "")} onClick={() => onNav(item.id)} type="button">
              <span className="ek-nav-ico"><Icon name={item.icon} size={23} stroke={active === item.id ? 2.4 : 1.9} /></span>
              {!rail && <span className="ek-nav-label">{item.label}</span>}
              {item.badge && <span className="ek-nav-badge">{item.badge}</span>}
              {rail && <span className="ek-nav-tip">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <button className="ek-create" onClick={onCreate} type="button" title="Create Prompt">
        <Icon name="pen" size={20} stroke={2.2} />
        {!rail && <span className="ek-create-label">Create Prompt</span>}
        {rail && <span className="ek-nav-tip">Create Prompt</span>}
      </button>

      <button className="ek-create ek-create2" onClick={onCreate2} type="button" title="Create Prompt 2 — Node Creator">
        <Icon name="grid" size={19} stroke={2.2} />
        {!rail && <span className="ek-create-label">Create Prompt 2</span>}
        {rail && <span className="ek-nav-tip">Node Creator</span>}
      </button>

      <button className="ek-create ek-create2" onClick={onRefer} type="button" title="Refer a prompt — submit a social link for review">
        <Icon name="link" size={18} stroke={2.2} />
        {!rail && <span className="ek-create-label">Refer Prompt</span>}
        {rail && <span className="ek-nav-tip">Refer Prompt</span>}
      </button>

      <div className="ek-side-spacer" />

      <div className="ek-account" role="button" onClick={onProfile} title="View profile">
        <span className="ek-avatar">{account.initials}</span>
        {!rail && (
          <span className="ek-account-info">
            <span className="ek-account-nrow">
              <span className="ek-account-nametext">{account.name}</span>
              <span className="ek-balance" onClick={(e) => { e.stopPropagation(); onTopUp(); }} title="Add funds"><Icon name="dollar" size={11} stroke={2.4} />{balance.toFixed(2)}</span>
            </span>
            <span className="ek-account-handle">@{account.handle}</span>
          </span>
        )}
      </div>
    </aside>
  );
}

Object.assign(window, { Icon, Sidebar });
