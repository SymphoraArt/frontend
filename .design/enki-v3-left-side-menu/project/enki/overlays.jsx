/* Overlays — Color Setup · Top-up (Stripe/PayPal) · Tip */
const Icon = window.Icon;
const { useState } = React;

function ModalShell({ icon, title, children, onClose }) {
  return (
    <div className="ek-modal-scrim" onClick={onClose}>
      <div className="ek-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ek-modal-head">
          {icon && <span className="ek-sheet-bolt" style={{ width: 32, height: 32 }}><Icon name={icon} size={17} stroke={2} fill="var(--cta-ink)" /></span>}
          <span className="ek-modal-title">{title}</span>
          <button className="ek-modal-x" onClick={onClose}><Icon name="x" size={17} stroke={2} /></button>
        </div>
        <div className="ek-modal-body">{children}</div>
      </div>
    </div>
  );
}

const THEME_OPTS_X = null;

function AmountPicker({ presets, value, onPick, custom, setCustom }) {
  return (
    <>
      <div className="ek-amt-grid">
        {presets.map((a) => (
          <button key={a} className={"ek-amt" + (value === a && !custom ? " active" : "")} onClick={() => { onPick(a); setCustom(""); }}>${a}</button>
        ))}
      </div>
      <div className="ek-amt-custom">
        <span>$</span>
        <input type="number" placeholder="Custom amount" value={custom} onChange={(e) => { setCustom(e.target.value); onPick(0); }} />
        <span style={{ fontSize: 13 }}>USD</span>
      </div>
    </>
  );
}

function PayMethods({ method, setMethod }) {
  return (
    <div className="ek-pay-methods">
      <button className={"ek-pay" + (method === "stripe" ? " active" : "")} onClick={() => setMethod("stripe")}>
        <Icon name="card" size={17} stroke={2} /> <span className="ek-pay-logo">Card</span>
      </button>
      <button className={"ek-pay" + (method === "paypal" ? " active" : "")} onClick={() => setMethod("paypal")}>
        <span className="ek-pay-logo" style={{ color: "#003087" }}>Pay</span><span className="ek-pay-logo" style={{ color: "#0070e0", marginLeft: -3 }}>Pal</span>
      </button>
    </div>
  );
}

function TopUpModal({ balance, onAdd, onClose }) {
  const [amt, setAmt] = useState(25);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState("stripe");
  const final = custom ? Number(custom) || 0 : amt;
  return (
    <ModalShell icon="dollar" title="Add funds" onClose={onClose}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, padding: "12px 16px", background: "var(--enki-paper-2)", border: "1px solid var(--enki-rule)", borderRadius: 12 }}>
        <span style={{ fontSize: 13, color: "var(--enki-ink-3)" }}>Current balance</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 600 }}>${balance.toFixed(2)}</span>
      </div>
      <span className="ek-ed-lab">Amount</span>
      <AmountPicker presets={[10, 25, 50, 100, 250, 500]} value={amt} onPick={setAmt} custom={custom} setCustom={setCustom} />
      <span className="ek-ed-lab">Pay with</span>
      <PayMethods method={method} setMethod={setMethod} />
      <button className="ek-btn" style={{ minHeight: 50 }} disabled={final <= 0} onClick={() => onAdd(final, method)}>
        <Icon name="check" size={17} stroke={2.2} /> Add ${final.toFixed(2)} via {method === "stripe" ? "Card" : "PayPal"}
      </button>
      <p style={{ fontSize: 11.5, color: "var(--enki-ink-3)", textAlign: "center", marginTop: 12 }}>Secured payment · funds available instantly for renders &amp; tips.</p>
    </ModalShell>
  );
}

function TipModal({ person, balance, onSend, onClose }) {
  const [amt, setAmt] = useState(5);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState("balance");
  const final = custom ? Number(custom) || 0 : amt;
  return (
    <ModalShell icon="gift" title={"Tip " + person.name.split(" ")[0]} onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <img src={person.avatar} alt={person.name} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div style={{ fontWeight: 600 }}>{person.name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--enki-ink-3)" }}>@{person.handle}</div>
        </div>
      </div>
      <span className="ek-ed-lab">Tip amount</span>
      <AmountPicker presets={[1, 5, 10, 25, 50, 100]} value={amt} onPick={setAmt} custom={custom} setCustom={setCustom} />
      <span className="ek-ed-lab">Pay from</span>
      <div className="ek-pay-methods">
        <button className={"ek-pay" + (method === "balance" ? " active" : "")} onClick={() => setMethod("balance")}>
          <Icon name="dollar" size={16} stroke={2} /> Balance ${balance.toFixed(2)}
        </button>
        <button className={"ek-pay" + (method === "stripe" ? " active" : "")} onClick={() => setMethod("stripe")}>
          <Icon name="card" size={16} stroke={2} /> Card
        </button>
      </div>
      <button className="ek-btn" style={{ minHeight: 50 }} disabled={final <= 0} onClick={() => onSend(final, method)}>
        <Icon name="send" size={16} stroke={2} /> Send ${final.toFixed(2)} tip
      </button>
    </ModalShell>
  );
}

Object.assign(window, { TopUpModal, TipModal, ReferModal });

function ReferModal({ onSubmit, onClose }) {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("auto");
  const [note, setNote] = useState("");
  const detected = (() => {
    const u = url.toLowerCase();
    if (/x\.com|twitter\.com/.test(u)) return "X";
    if (/instagram\.com/.test(u)) return "Instagram";
    if (/tiktok\.com/.test(u)) return "TikTok";
    if (/youtube\.com|youtu\.be/.test(u)) return "YouTube";
    if (/pinterest\./.test(u)) return "Pinterest";
    if (/reddit\.com/.test(u)) return "Reddit";
    return null;
  })();
  const valid = /^https?:\/\/.+\..+/.test(url.trim());
  return (
    <ModalShell icon="link" title="Refer a prompt" onClose={onClose}>
      <p style={{ fontSize: 13.5, color: "var(--enki-ink-3)", marginBottom: 16, lineHeight: 1.55 }}>
        Found a great AI image or prompt out in the wild? Drop the social link — our team reviews it and, if it's a fit, recreates it as a referrable prompt and credits you.
      </p>
      <span className="ek-ed-lab">Social media link</span>
      <div className={"ek-refer-input" + (url && !valid ? " err" : "")}>
        <Icon name="link" size={16} stroke={2} style={{ color: "var(--enki-ink-3)", flexShrink: 0 }} />
        <input type="url" placeholder="https://x.com/…  ·  instagram.com/p/…  ·  tiktok.com/@…" value={url} onChange={(e) => setUrl(e.target.value)} autoFocus />
        {detected && <span className="ek-refer-detected">{detected}</span>}
      </div>
      {url && !valid && <div className="ek-refer-hint">Enter a full link starting with https://</div>}

      <span className="ek-ed-lab" style={{ marginTop: 16 }}>Why is it worth adding? · optional</span>
      <textarea className="ek-refer-note" rows={3} placeholder="e.g. amazing cinematic lighting style, would love this as a reusable prompt…" value={note} onChange={(e) => setNote(e.target.value)} />

      <div className="ek-refer-steps">
        {["You submit the link", "We review & verify the source", "We rebuild it as a prompt — you're credited"].map((s, i) => (
          <div className="ek-refer-step" key={i}><span className="ek-refer-step-n">{i + 1}</span> {s}</div>
        ))}
      </div>

      <button className="ek-btn" style={{ minHeight: 50, marginTop: 4 }} disabled={!valid} onClick={() => onSubmit({ url: url.trim(), platform: detected || "Link", note: note.trim() })}>
        <Icon name="send" size={16} stroke={2} /> Submit for review
      </button>
      <p style={{ fontSize: 11.5, color: "var(--enki-ink-3)", textAlign: "center", marginTop: 12 }}>You'll get a message when your referral has been reviewed.</p>
    </ModalShell>
  );
}
