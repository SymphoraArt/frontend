/* Settings — Profile · Wallets · Recovery & 2FA · Billing (ported from app/settings) */
const Icon = window.Icon;
const { useState } = React;

const SET_TABS = [
  { id: "profile", label: "Profile" },
  { id: "wallets", label: "Wallets" },
  { id: "recovery", label: "Recovery & 2FA" },
  { id: "billing", label: "Billing" },
];

function SetSection({ num, title, children }) {
  return (
    <section className="set-section">
      <div className="set-section-head"><span className="set-section-num">{num}</span><h3 className="set-section-title">{title}</h3></div>
      <div className="set-section-body">{children}</div>
    </section>
  );
}
function SetToggle({ checked, disabled, onChange }) {
  return (
    <button type="button" className={"set-toggle" + (checked ? " on" : "") + (disabled ? " disabled" : "")} onClick={() => !disabled && onChange(!checked)}>
      <span className="set-toggle-knob" />
    </button>
  );
}
function SetRow({ icon, iconStyle, title, sub, children, style }) {
  return (
    <div className="set-row" style={style}>
      {icon && <div className="set-row-icon" style={iconStyle}>{icon}</div>}
      <div className="set-row-content"><div className="set-row-title">{title}</div>{sub && <div className="set-row-sub">{sub}</div>}</div>
      {children}
    </div>
  );
}

function Settings({ onClose, onToast, balance, onTopUp }) {
  const [tab, setTab] = useState("profile");
  const [lbGen, setLbGen] = useState(true);
  const [lbEarn, setLbEarn] = useState(true);
  const [extraCheck, setExtraCheck] = useState(true);
  const [threshold, setThreshold] = useState("2 of 3 required");
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState("stripe");
  const [guardians, setGuardians] = useState([
    { id: "g1", name: "@lune_lab", type: "handle", sub: "Enki Art User", status: "confirmed" },
    { id: "g2", name: "0xA1B2…C3D4", type: "wallet", sub: "Ethereum Wallet", status: "confirmed" },
    { id: "g3", name: "friend@email.com", type: "email", sub: "Trusted Email", status: "confirmed" },
  ]);
  const ping = (id) => { setGuardians((p) => p.map((g) => g.id === id ? { ...g, status: "pinged" } : g)); onToast("Ping sent to guardian"); };

  const titleMap = { profile: "Profile.", wallets: "Wallets.", recovery: "Recovery & 2FA.", billing: "Billing." };
  const descMap = {
    profile: "Manage your connected social accounts and visibility settings.",
    wallets: "Manage your connected Turnkey networks and external wallets.",
    recovery: "Keep more than one way to sign in — so you never lose your account. Turn on the extra check for a second confirmation before risky actions.",
    billing: "Top up your balance with the familiar Stripe or PayPal flow.",
  };
  const finalAmt = custom ? Number(custom) || 0 : amount;

  return (
    <div className="ek-view set-view">
      <div className="ek-view-top">
        <button className="ek-back" type="button" onClick={onClose}><Icon name="chevronLeft" size={17} stroke={2.2} /> Back</button>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--enki-ink-3)" }}>Settings › {SET_TABS.find((t) => t.id === tab).label}</div>
      </div>
      <div className="ek-view-scroll">
        <div className="set-wrap">
          <header className="set-header">
            <h1 className="set-title">{titleMap[tab]}</h1>
            <p className="set-desc">{descMap[tab]}</p>
          </header>

          <nav className="set-nav">
            {SET_TABS.map((t) => (
              <button key={t.id} className={"set-nav-btn" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </nav>

          {tab === "profile" && (
            <>
              <SetSection num="01" title="Social Connections">
                <div className="set-section-desc">Connect your socials. If you've previously posted prompts on X that generated revenue, you can claim your dormant X USDC once connected.</div>
                <SetRow icon={<Icon name="x" size={14} stroke={2.4} />} iconStyle={{ background: "#1da1f2", color: "#fff" }} title="Connect X (Twitter)" sub="Connect to claim dormant earnings from past generations.">
                  <button className="set-btn set-btn-outline" onClick={() => onToast("Opening X connect…")}>Connect</button>
                </SetRow>
                <SetRow icon={<Icon name="image" size={14} stroke={2} />} iconStyle={{ background: "linear-gradient(45deg,#f09433,#dc2743 50%,#bc1888)", color: "#fff" }} title="Connect Instagram" sub="Link your IG portfolio to your Enki Art profile.">
                  <button className="set-btn set-btn-outline" onClick={() => onToast("Opening Instagram connect…")}>Connect</button>
                </SetRow>
              </SetSection>

              <SetSection num="02" title="Leaderboard Visibility">
                <SetRow title={<span style={{ color: "var(--enki-ink-3)" }}>Show generations on leaderboard</span>} sub="Allow others to see your generation count (Coming Soon)">
                  <SetToggle checked={lbGen} disabled onChange={setLbGen} />
                </SetRow>
                <SetRow title={<span style={{ color: "var(--enki-ink-3)" }}>Show earnings on leaderboard</span>} sub="Allow others to see your total earnings (Coming Soon)">
                  <SetToggle checked={lbEarn} disabled onChange={setLbEarn} />
                </SetRow>
              </SetSection>

              <SetSection num="03" title="Danger Zone">
                <SetRow icon={<Icon name="bell" size={14} stroke={2} />} iconStyle={{ color: "#e23b3b", background: "#ffebeb" }} title={<span style={{ color: "#e23b3b" }}>Delete Account</span>} sub="Permanently delete your account and all associated data. Requires multi-factor confirmation.">
                  <button className="set-btn set-btn-danger" onClick={() => onToast("Check your email to confirm account deletion")}>Delete Account</button>
                </SetRow>
              </SetSection>
            </>
          )}

          {tab === "wallets" && (
            <SetSection num="01" title="Network Holdings">
              <div className="set-section-desc">Your assets, managed securely via Turnkey infrastructure.</div>
              {[
                { net: "Ethereum (Base)", active: true, addr: "0x71C…9B3f", amt: "0.45 ETH", usd: "~$1,204.50" },
                { net: "Solana", active: false, addr: "HN7c…k8W2", amt: "12.5 SOL", usd: "~$1,850.00" },
              ].map((w) => (
                <SetRow key={w.net} icon={<Icon name="card" size={14} stroke={2} />}
                  title={<>{w.net} {w.active && <span className="set-badge-dark">ACTIVE</span>}</>}
                  sub={<span className="mono">{w.addr}</span>}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{w.amt}</div>
                      <div style={{ fontSize: 11, color: "var(--enki-ink-3)" }}>{w.usd}</div>
                    </div>
                    <button className="set-btn set-btn-dark" onClick={() => onToast("Send from " + w.net)}><Icon name="arrowRight" size={13} stroke={2.2} /> Send</button>
                  </div>
                </SetRow>
              ))}
              <div className="set-section-desc" style={{ paddingTop: 14 }}>
                <button className="set-btn set-btn-outline" onClick={() => onToast("Connect an external wallet")}><Icon name="plus" size={13} stroke={2.2} /> Connect external wallet</button>
              </div>
            </SetSection>
          )}

          {tab === "recovery" && (
            <>
              <div className="set-banner">
                <div>
                  <p className="set-banner-t">Annual Guardians check</p>
                  <p className="set-banner-s">Please confirm your guardians are still up to date, or ping them to verify liveness.</p>
                </div>
                <button className="set-banner-x" onClick={() => onToast("Dismissed")}>Dismiss</button>
              </div>

              <SetSection num="01" title="Recovery Phrase">
                <div className="set-section-desc">Your 24-word BIP39 master key. Anyone who has it can access your account — store it offline only. Entering it at <strong>/recovery</strong> grants immediate access with no delay.</div>
                <SetRow icon={<Icon name="settings" size={14} stroke={2} />} iconStyle={{ color: "#276738", background: "#eaf6ee" }}
                  title={<>Recovery phrase <span className="set-pill set-pill-green">✓ Set</span></>} sub="Generated at account creation. Stored nowhere by us — only you have it.">
                  <button className="set-btn set-btn-secondary" onClick={() => onToast("Rotate phrase flow")}>Rotate phrase</button>
                </SetRow>
                <SetRow style={{ background: "var(--enki-paper-2)" }} icon={<Icon name="settings" size={14} stroke={2} />} iconStyle={{ color: "#5a3e8f", background: "#f0eafb" }}
                  title={<>Split Recovery Phrase <span className="mono set-mono-tag">SLIP-39</span> <span className="set-pill set-pill-grey">Coming soon</span></>} sub="Split your phrase into 5 shares, any 3 reconstruct it. Eliminates single-point-of-failure." />
              </SetSection>

              <SetSection num="02" title="Social Recovery">
                <div className="set-section-desc">A secondary recovery path. Add trusted friends, wallets, or emails as guardians. If you lose your phrase, you can restore access if enough guardians approve.</div>
                <div className="set-row" style={{ background: "var(--enki-paper-2)" }}>
                  <div className="set-row-content"><div className="set-row-title" style={{ fontSize: 13 }}>Your Guardians</div></div>
                  <button className="set-btn set-btn-secondary" onClick={() => onToast("Add guardian flow")}>+ Add guardian</button>
                </div>
                {guardians.map((g) => (
                  <SetRow key={g.id} icon={<Icon name={g.type === "handle" ? "more" : g.type === "wallet" ? "card" : "mail"} size={14} stroke={2} />} iconStyle={{ background: "var(--enki-paper-3)" }}
                    title={<>{g.type === "wallet" ? <span className="mono">{g.name}</span> : g.name} <span className={"set-pill " + (g.status === "pinged" ? "set-pill-amber" : "set-pill-green")}>{g.status === "pinged" ? "Pinged" : "Confirmed"}</span></>} sub={g.sub}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {g.status !== "pinged" && <button className="set-btn set-btn-outline" onClick={() => ping(g.id)}>Ping</button>}
                      <button className="set-btn set-btn-outline" onClick={() => setGuardians((p) => p.filter((x) => x.id !== g.id))}>Remove</button>
                    </div>
                  </SetRow>
                ))}
                <SetRow icon={<Icon name="userPlus" size={14} stroke={2} />} iconStyle={{ color: "#4a6fa5", background: "#eff6ff" }} title="Approval Threshold" sub="How many guardians must approve to restore access.">
                  <select className="set-btn set-btn-secondary set-select" value={threshold} onChange={(e) => setThreshold(e.target.value)}>
                    <option>2 of 3 required</option><option>3 of 3 required</option>
                  </select>
                </SetRow>
                <SetRow icon={<Icon name="settings" size={14} stroke={2} />} iconStyle={{ color: "#7c5cbf", background: "#f5f0fa" }}
                  title={<>Guardian Passcode <span className="mono set-mono-tag">ZK PROOF</span> <span className="set-pill set-pill-green">✓ Set</span></>} sub="The cryptographic hash of your passphrase + guardian set. Proves you initiated recovery without revealing your passphrase.">
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="set-btn set-btn-secondary" onClick={() => onToast("Verifying proof…")}>Verify</button>
                    <button className="set-btn set-btn-secondary" onClick={() => onToast("Rotate passcode")}>Rotate</button>
                  </div>
                </SetRow>
              </SetSection>

              <SetSection num="03" title="How you sign in">
                <div className="set-section-desc">Each device you add is a way back into your account. Add at least two — if you lose one, you can still get in with the other.</div>
                <div style={{ padding: "0 18px 14px" }}><button className="set-btn set-btn-dark" onClick={() => onToast("Add a device — verify on this device")}>+ Add a device</button></div>
                <SetRow icon={<Icon name="card" size={14} stroke={2} />} title={<>MacBook Pro · Touch ID <span className="set-badge-dark">THIS DEVICE</span></>} sub="Active now"><button className="set-btn set-btn-outline" onClick={() => onToast("Remove device")}>Remove</button></SetRow>
                <SetRow icon={<Icon name="card" size={14} stroke={2} />} title="iPhone 15 · Face ID" sub="Used 2 days ago"><button className="set-btn set-btn-outline" onClick={() => onToast("Remove device")}>Remove</button></SetRow>
                <SetRow style={{ background: "var(--enki-paper-2)" }} icon={<Icon name="mail" size={14} stroke={2} />} title={<>Recovery email <span className="mono" style={{ fontSize: 11, color: "var(--enki-ink-3)" }}>maya@enki.studio</span></>} sub="If all your devices are gone, we'll send a one-time code here so you can sign in again."><button className="set-btn set-btn-outline" onClick={() => onToast("Change recovery email")}>Change email</button></SetRow>
              </SetSection>

              <SetSection num="04" title="Extra check before risky actions">
                <SetRow style={{ borderBottom: "none" }} title={<span style={{ fontSize: 12.5, color: "var(--enki-ink-2)", lineHeight: 1.5, fontWeight: 400 }}>When this is on, we'll ask you to confirm once more on this device before something serious happens — deleting work, sending a payment. Stops accidents and anyone who briefly grabs your laptop.</span>}>
                  <SetToggle checked={extraCheck} onChange={setExtraCheck} />
                </SetRow>
                {["Deleting any of your work", "Selling or releasing a prompt", "Sending money out of your wallet"].map((t, i) => (
                  <div className="set-row set-row--sub" key={t}>
                    <div className={"set-check-circle" + (extraCheck ? " on" : "")}><Icon name="check" size={11} stroke={3} /></div>
                    <div className="set-row-content"><div className="set-row-title">{t}</div><div className="set-row-sub">{["Images, prompts, releases — once gone, it's gone.", "Anything that takes payment or goes public on-chain.", "Any transfer to an address that isn't yours."][i]}</div></div>
                  </div>
                ))}
              </SetSection>

              <SetSection num="05" title="Last Resort Recovery">
                <div className="set-section-desc">If you ever lose your device, seed phrase, and email at once, our team can manually verify your identity and restore access. No automated path — a real person reviews every case.</div>
                <SetRow icon="🔐" title={<>Recovery Evidence Hash <span className="set-pill set-pill-amber">Not set</span></>} sub="Optional but strong supporting evidence for manual review. You generate 3 secret phrases locally — the hash is stored, never the phrases.">
                  <button className="set-btn set-btn-secondary" onClick={() => onToast("Set up recovery evidence")}>Set up</button>
                </SetRow>
                <div className="set-row" style={{ background: "var(--enki-paper-2)", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
                  <div className="set-row-title" style={{ fontSize: 12 }}>📋 What helps during manual review</div>
                  <div className="set-evidence">{["Old connected email", "Known wallet address", "Prompts you own", "Recovery evidence hash", "Social account links", "Purchase receipts"].map((e) => <div key={e} className="set-row-sub" style={{ margin: 0 }}>· {e}</div>)}</div>
                </div>
                <SetRow style={{ background: "var(--enki-paper-2)" }} icon="🆘" iconStyle={{ color: "#c2692a", background: "#fef0e6" }} title="Lost all access?" sub="Submit a manual recovery request. A team member reviews within 2–5 business days.">
                  <button className="set-btn set-btn-secondary" onClick={() => onToast("Opening recovery request…")}>Request recovery <Icon name="arrowRight" size={12} stroke={2.2} /></button>
                </SetRow>
              </SetSection>
            </>
          )}

          {tab === "billing" && (
            <SetSection num="01" title="Add Funds">
              <div className="set-billing-bal">
                <span>Current balance</span>
                <span className="set-billing-balv mono">${balance.toFixed(2)}</span>
              </div>
              <div className="set-section-desc" style={{ paddingTop: 0 }}>Amount</div>
              <div style={{ padding: "0 18px" }}>
                <div className="ek-amt-grid">
                  {[10, 25, 50, 100, 250, 500].map((a) => (
                    <button key={a} className={"ek-amt" + (amount === a && !custom ? " active" : "")} onClick={() => { setAmount(a); setCustom(""); }}>${a}</button>
                  ))}
                </div>
                <div className="ek-amt-custom"><span>$</span><input type="number" placeholder="Custom amount" value={custom} onChange={(e) => { setCustom(e.target.value); setAmount(0); }} /><span style={{ fontSize: 13 }}>USD</span></div>
                <div className="set-section-desc" style={{ padding: "0 0 8px" }}>Pay with</div>
                <div className="ek-pay-methods">
                  <button className={"ek-pay" + (method === "stripe" ? " active" : "")} onClick={() => setMethod("stripe")}><Icon name="card" size={17} stroke={2} /> <span className="ek-pay-logo">Card</span></button>
                  <button className={"ek-pay" + (method === "paypal" ? " active" : "")} onClick={() => setMethod("paypal")}><span className="ek-pay-logo" style={{ color: "#003087" }}>Pay</span><span className="ek-pay-logo" style={{ color: "#0070e0", marginLeft: -3 }}>Pal</span></button>
                </div>
                <button className="ek-btn" style={{ minHeight: 50, marginBottom: 14 }} disabled={finalAmt <= 0} onClick={() => onTopUp(finalAmt, method)}>
                  <Icon name="check" size={17} stroke={2.2} /> Add ${finalAmt.toFixed(2)} via {method === "stripe" ? "Card" : "PayPal"}
                </button>
              </div>
            </SetSection>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Settings });
