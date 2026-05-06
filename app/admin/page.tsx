"use client";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = "imports" | "reports" | "feedback" | "friends" | "hunters" | "strikes" | "recovery";

const REASONS = ["Obscene", "Impersonation", "Hate", "Spam", "Copyright", "Other"];
const REJECT_REASONS = ["Duplicate", "Low quality", "Not a prompt", "Spam", "Policy violation", "Other"];

// ── Mock data ──────────────────────────────────────────────────────────────
const MOCK_IMPORTS = [
  { id: "i1", url: "https://x.com/artlover/status/123", name: "Moody Forest Fog", hunter: "@driftwood", tags: ["cinematic", "nature"], submitted: "2h ago" },
  { id: "i2", url: "https://instagram.com/p/abc123", name: "Neon Brutalism", hunter: "@nxrthx", tags: ["architecture", "neon"], submitted: "5h ago" },
  { id: "i3", url: "https://x.com/midjourney_fan/status/456", name: "Soft Editorial", hunter: "@lune_lab", tags: ["portrait", "editorial"], submitted: "1d ago" },
];

const MOCK_REPORTS = [
  { id: "r1", target: "Violent Dawn — prompt", flags: 7, reason: "Obscene", type: "prompt", reporter: "@anon", date: "1h ago" },
  { id: "r2", target: "@dr4gonfly — profile", flags: 3, reason: "Impersonation", type: "profile", reporter: "@trust_guard", date: "3h ago" },
  { id: "r3", target: "Teen Sirens — prompt", flags: 12, reason: "Obscene", type: "prompt", reporter: "multiple", date: "6h ago" },
];

const MOCK_FEEDBACK = [
  { id: "f1", name: "Arjun Mehta", email: "arjun@gmail.com", desc: "The generator hangs when I use more than 3 variables in a single prompt.", images: 1, date: "May 4", status: "unpaid" },
  { id: "f2", name: "Sophie Lindqvist", email: "sophie@hey.com", desc: "Would love dark mode for the settings panel — the white is harsh at night.", images: 0, date: "May 3", status: "paid" },
  { id: "f3", name: "Marco Fiori", email: "marco@proton.me", desc: "Bug: wallet disconnects every time I navigate away from the editor.", images: 2, date: "May 2", status: "unpaid" },
];

const MOCK_FRIENDS = [
  { id: "wl1", name: "Founding Artists", address: "0xabc...1234", type: "EOA", notes: "Core team wallets" },
  { id: "wl2", name: "Genesis Pass", address: "0xENKI...PASS", type: "Collection", notes: "Holders get early access" },
  { id: "wl3", name: "Beta Tester", address: "0xdef...5678", type: "EOA", notes: "Early beta participant" },
];

const MOCK_HUNTERS = [
  { id: "h1", handle: "@driftwood", total: 24, approved: 18, denied: 6, earnings: "$340" },
  { id: "h2", handle: "@nxrthx", total: 11, approved: 8, denied: 3, earnings: "$210" },
  { id: "h3", handle: "@lune_lab", total: 5, approved: 2, denied: 3, earnings: "$40" },
  { id: "h4", handle: "@pixel_sage", total: 31, approved: 29, denied: 2, earnings: "$780" },
];

const MOCK_STRIKES = [
  { id: "s1", handle: "@dr4gonfly", strikes: 2, status: "active", note: "Repeated impersonation", appealed: false },
  { id: "s2", handle: "@spam_lord", strikes: 3, status: "banned", note: "Mass spam via Hunt queue", appealed: true, appealNote: "I was hacked, please review." },
  { id: "s3", handle: "@shadow_poster", strikes: 1, status: "active", note: "Obscene content upload", appealed: false },
];

const MOCK_RECOVERY = [
  {
    id: "rc1", handle: "@mira_creates", contact: "mira.new@gmail.com",
    submitted: "1h ago", status: "pending",
    evidence: { email: "mira@proton.me", wallet: "0xA1B2...C3D4", socials: "@mira_creates on X", hasZkp: true, content: "Soft Editorial Vol.1, Neon Brutalism" },
    explanation: "My phone was stolen and my old Gmail was compromised in the same week. I have receipts from my Stripe purchase of the Genesis Pass and can name all 6 prompts I released.",
  },
  {
    id: "rc2", handle: "@pixel_sage", contact: "pixelsage.recovery@hey.com",
    submitted: "3h ago", status: "needs_info",
    evidence: { email: "", wallet: "0xF5E6...D7C8", socials: "", hasZkp: false, content: "" },
    explanation: "I lost access to everything. Please restore my account.",
  },
  {
    id: "rc3", handle: "@lune_lab", contact: "lune.backup@icloud.com",
    submitted: "1d ago", status: "approved",
    evidence: { email: "lune@hey.com", wallet: "0x9C8D...E1F2", socials: "@lune_lab on Instagram", hasZkp: true, content: "Moody Forest Fog, Coastal Haze, Drift #1-#4" },
    explanation: "Hardware wallet lost in house fire. Old email confirmed via recovery code. I can provide the ZKP hash I set in settings and describe all my work in detail.",
  },
];

// ── Shared UI ──────────────────────────────────────────────────────────────
const badge = (color: string, text: string) => (
  <span style={{
    padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600,
    fontFamily: "'Outfit', sans-serif",
    background: color === "red" ? "#fdecea" : color === "green" ? "#eaf6ee" : color === "yellow" ? "#fef9eb" : "#f0eeea",
    color:      color === "red" ? "#b03020" : color === "green" ? "#276738" : color === "yellow" ? "#7a5c10" : "#5a5248",
  }}>
    {text}
  </span>
);

const Btn = ({ label, color, onClick }: { label: string; color?: string; onClick?: () => void }) => (
  <button onClick={onClick} style={{
    padding: "4px 13px", fontSize: 12, borderRadius: 20, cursor: "pointer",
    fontFamily: "'Outfit', sans-serif", fontWeight: 500,
    border: "1px solid " + (color === "red" ? "#e8b4ae" : color === "green" ? "#9ecfac" : "#e0ddd5"),
    background:  color === "red" ? "#fdecea" : color === "green" ? "#eaf6ee" : "#f5f3ee",
    color:       color === "red" ? "#b03020" : color === "green" ? "#276738" : "#4a4540",
    transition: "opacity 0.15s",
  }}>
    {label}
  </button>
);

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th style={{
    padding: "9px 14px", textAlign: "left",
    fontSize: 10, fontFamily: "'Outfit', sans-serif",
    letterSpacing: "0.9px", textTransform: "uppercase",
    color: "#b0a898", fontWeight: 600,
    borderBottom: "1px solid #e8e5de", whiteSpace: "nowrap",
    background: "#f5f3ee",
  }}>
    {children}
  </th>
);
const Td = ({ children, mono, onClick }: { children?: React.ReactNode; mono?: boolean; onClick?: React.MouseEventHandler<HTMLTableCellElement> }) => (
  <td onClick={onClick} style={{
    padding: "11px 14px", fontSize: 13, color: "#3a3530",
    fontFamily: mono ? "monospace" : "'Outfit', sans-serif",
    borderBottom: "1px solid #f0ede6", verticalAlign: "middle",
  }}>
    {children}
  </td>
);

// ── Tab content components ────────────────────────────────────────────────

function PendingImports() {
  const [items, setItems] = useState(MOCK_IMPORTS);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState(REJECT_REASONS[0]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = items.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.hunter.toLowerCase().includes(search.toLowerCase())
  );
  const approve = (id: string) => { setItems(p => p.filter(x => x.id !== id)); setSelected(p => p.filter(x => x !== id)); };
  const reject = (id: string) => { setItems(p => p.filter(x => x.id !== id)); setRejectId(null); setSelected(p => p.filter(x => x !== id)); };
  const approveAll = () => { setItems(p => p.filter(x => !selected.includes(x.id))); setSelected([]); };
  const toggleSelect = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h2 style={h2}>Pending Imports</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {selected.length > 0 && (
            <>
              <span style={{ fontSize: 12, color: "#6b7280" }}>{selected.length} selected</span>
              <Btn label="Approve All" color="green" onClick={approveAll} />
              <Btn label="Reject All" color="red" onClick={() => { setItems(p => p.filter(x => !selected.includes(x.id))); setSelected([]); }} />
            </>
          )}
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
            style={{ padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", width: 180 }} />
        </div>
      </div>
      <p style={sub}>Hunt submissions awaiting admin review before entering the marketplace.</p>
      <table style={table}>
        <thead><tr><Th></Th><Th>PROMPT NAME</Th><Th>HUNTER</Th><Th>URL</Th><Th>TAGS</Th><Th>SUBMITTED</Th><Th>ACTIONS</Th></tr></thead>
        <tbody>
          {filtered.map(row => (
            <tr key={row.id} style={{ background: selected.includes(row.id) ? "#f0f9ff" : undefined }}>
              <Td><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} /></Td>
              <Td><strong>{row.name}</strong></Td>
              <Td mono>{row.hunter}</Td>
              <Td><a href={row.url} target="_blank" rel="noreferrer" style={{ color: "#6366f1", fontSize: 12, textDecoration: "none" }}>{row.url.slice(0, 34)}…</a></Td>
              <Td>{row.tags.map(t => <span key={t} style={{ marginRight: 4, padding: "2px 7px", background: "#f1f5f9", borderRadius: 4, fontSize: 11 }}>{t}</span>)}</Td>
              <Td mono>{row.submitted}</Td>
              <Td>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Btn label="Check Similarities" />
                  <Btn label="Edit" />
                  <Btn label="Approve" color="green" onClick={() => approve(row.id)} />
                  {rejectId === row.id ? (
                    <>
                      <select value={rejectReason} onChange={e => setRejectReason(e.target.value)} style={{ fontSize: 12, borderRadius: 6, border: "1px solid #d1d5db", padding: "3px 6px" }}>
                        {REJECT_REASONS.map(r => <option key={r}>{r}</option>)}
                      </select>
                      <Btn label="Confirm" color="red" onClick={() => reject(row.id)} />
                      <Btn label="Cancel" onClick={() => setRejectId(null)} />
                    </>
                  ) : (
                    <Btn label="Reject" color="red" onClick={() => setRejectId(row.id)} />
                  )}
                </div>
              </Td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>{search ? "No results match your search." : "Queue empty — all caught up ✓"}</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Reports() {
  const [items, setItems] = useState(MOCK_REPORTS);
  const remove = (id: string) => setItems(p => p.filter(x => x.id !== id));

  return (
    <div>
      <h2 style={h2}>Reports</h2>
      <p style={sub}>User-flagged prompts and profiles, grouped by target.</p>
      <table style={table}>
        <thead><tr><Th>FLAGS</Th><Th>TARGET</Th><Th>TYPE</Th><Th>REASON</Th><Th>REPORTER</Th><Th>DATE</Th><Th>ACTIONS</Th></tr></thead>
        <tbody>
          {items.map(row => (
            <tr key={row.id}>
              <Td><span style={{ fontWeight: 700, fontSize: 15, color: row.flags >= 7 ? "#b91c1c" : "#374151" }}>{row.flags}</span></Td>
              <Td><strong>{row.target}</strong></Td>
              <Td>{badge(row.type === "prompt" ? "blue" : "yellow", row.type)}</Td>
              <Td>{row.reason}</Td>
              <Td mono>{row.reporter}</Td>
              <Td mono>{row.date}</Td>
              <Td>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn label="Resolve" color="green" onClick={() => remove(row.id)} />
                  <Btn label="Dismiss" onClick={() => remove(row.id)} />
                  <Btn label="Delist" color="red" />
                  <Btn label="Issue Strike" color="red" />
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeedbackTab() {
  const [items, setItems] = useState(MOCK_FEEDBACK);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const markPaid = (id: string) => setItems(p => p.map(x => x.id === id ? { ...x, status: "paid" } : x));
  const filtered = items.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.desc.toLowerCase().includes(search.toLowerCase())
  );
  const unpaidCount = items.filter(x => x.status === "unpaid").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={h2}>Feedback</h2>
          {unpaidCount > 0 && <span style={{ padding: "2px 10px", background: "#fef9c3", color: "#854d0e", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{unpaidCount} unpaid</span>}
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
          style={{ padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", width: 200 }} />
      </div>
      <p style={sub}>Submissions from the "Earn $100 for feedback" prompt in the navbar. Click a row to expand.</p>
      <table style={table}>
        <thead><tr><Th>NAME</Th><Th>EMAIL</Th><Th>PREVIEW</Th><Th>IMAGES</Th><Th>DATE</Th><Th>STATUS</Th><Th>ACTION</Th></tr></thead>
        <tbody>
          {filtered.map(row => (
            <>
              <tr key={row.id} onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                style={{ cursor: "pointer", background: expanded === row.id ? "#f0fdf4" : row.status === "unpaid" ? "#fffbeb" : "#fff" }}>
                <Td><strong>{row.name}</strong></Td>
                <Td mono>{row.email}</Td>
                <Td><span style={{ display: "block", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#6b7280", fontSize: 12 }}>{row.desc}</span></Td>
                <Td>{row.images > 0 ? <span style={{ padding: "2px 8px", background: "#eff6ff", color: "#1d4ed8", borderRadius: 4, fontSize: 11 }}>{row.images} 📎</span> : "—"}</Td>
                <Td mono>{row.date}</Td>
                <Td>{badge(row.status === "paid" ? "green" : "yellow", row.status === "paid" ? "Paid" : "Unpaid")}</Td>
                <Td onClick={e => e.stopPropagation()}>
                  {row.status === "unpaid"
                    ? <Btn label="Mark as Paid" color="green" onClick={() => markPaid(row.id)} />
                    : <span style={{ fontSize: 12, color: "#9ca3af" }}>✓ Done</span>}
                </Td>
              </tr>
              {expanded === row.id && (
                <tr key={row.id + "-exp"}>
                  <td colSpan={7} style={{ padding: "16px 20px", background: "#f0fdf4", borderBottom: "1px solid #e5e7eb" }}>
                    <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: "0 0 8px", maxWidth: 700 }}>{row.desc}</p>
                    {row.images > 0 && (
                      <div style={{ display: "flex", gap: 8 }}>
                        {Array.from({ length: row.images }).map((_, i) => (
                          <div key={i} style={{ width: 80, height: 60, background: "#d1fae5", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🖼</div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </>
          ))}
          {filtered.length === 0 && <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>No feedback submissions yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Friends() {
  const [items, setItems] = useState(MOCK_FRIENDS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", type: "EOA", notes: "" });
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const add = () => {
    if (!form.name || !form.address) return;
    setItems(p => [...p, { id: `wl${Date.now()}`, ...form }]);
    setForm({ name: "", address: "", type: "EOA", notes: "" });
    setShowAdd(false);
  };

  const confirmDelete = (id: string) => {
    // Simulate Turnkey approval request sent to other devices
    setPendingDelete(id);
  };

  const executeDelete = () => {
    setItems(p => p.filter(x => x.id !== pendingDelete));
    setPendingDelete(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h2 style={{ ...h2, marginBottom: 4 }}>Friends (Whitelist)</h2>
          <p style={sub}>Whitelisted wallet addresses or NFT collections with elevated platform access.</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "8px 18px", background: "#111", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
          + Add Entry
        </button>
      </div>

      {showAdd && (
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, marginBottom: 20, display: "grid", gridTemplateColumns: "1fr 1fr 120px 1fr", gap: 12 }}>
          {[
            { ph: "Name", k: "name" }, { ph: "Address / Collection ID", k: "address" }, , { ph: "Notes", k: "notes" }
          ].map((f: any) => f && (
            <input key={f.k} placeholder={f.ph} value={(form as any)[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
              style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, outline: "none" }} />
          ))}
          <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13 }}>
            <option>EOA</option><option>Collection</option><option>Multi-sig</option>
          </select>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8 }}>
            <Btn label="Save Entry" color="green" onClick={add} />
            <Btn label="Cancel" onClick={() => setShowAdd(false)} />
          </div>
        </div>
      )}

      {/* Turnkey approval modal */}
      {pendingDelete && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, maxWidth: 400, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "1.5px", color: "#a09788", marginBottom: 8 }}>TURNKEY APPROVAL</p>
            <h3 style={{ margin: "0 0 12px", fontSize: 20, fontFamily: "Georgia, serif", fontStyle: "italic" }}>Confirm deletion</h3>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 24 }}>
              A Turnkey approval request has been sent to your other registered devices. Once approved, this whitelist entry will be permanently removed.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn label="Simulate Approve & Delete" color="red" onClick={executeDelete} />
              <Btn label="Cancel" onClick={() => setPendingDelete(null)} />
            </div>
          </div>
        </div>
      )}

      <table style={table}>
        <thead><tr><Th>NAME</Th><Th>ADDRESS / ID</Th><Th>TYPE</Th><Th>NOTES</Th><Th>ACTION</Th></tr></thead>
        <tbody>
          {items.map(row => (
            <tr key={row.id}>
              <Td><strong>{row.name}</strong></Td>
              <Td mono>{row.address}</Td>
              <Td>{badge("blue", row.type)}</Td>
              <Td>{row.notes || "—"}</Td>
              <Td><Btn label="Delete" color="red" onClick={() => confirmDelete(row.id)} /></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HunterTrust() {
  return (
    <div>
      <h2 style={h2}>Hunter Trust</h2>
      <p style={sub}>Overview of importers and their approval rates.</p>
      <table style={table}>
        <thead><tr><Th>HUNTER</Th><Th>TOTAL IMPORTS</Th><Th>APPROVED</Th><Th>DENIED</Th><Th>TRUST SCORE</Th><Th>EARNINGS</Th></tr></thead>
        <tbody>
          {MOCK_HUNTERS.map(row => {
            const score = Math.round((row.approved / row.total) * 100);
            return (
              <tr key={row.id}>
                <Td mono><strong>{row.handle}</strong></Td>
                <Td>{row.total}</Td>
                <Td>{badge("green", String(row.approved))}</Td>
                <Td>{badge("red", String(row.denied))}</Td>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 80, height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${score}%`, height: "100%", background: score >= 80 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444", borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, fontFamily: "monospace" }}>{score}%</span>
                  </div>
                </Td>
                <Td><strong>{row.earnings}</strong></Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StrikesSuspensions() {
  const [items, setItems] = useState(MOCK_STRIKES);
  const [strikingId, setStrikingId] = useState<string | null>(null);

  const issueStrike = (id: string) => setItems(p => p.map(x => x.id === id ? { ...x, strikes: x.strikes + 1, status: x.strikes + 1 >= 3 ? "banned" : x.status } : x));
  const revoke = (id: string) => setItems(p => p.map(x => x.id === id ? { ...x, strikes: Math.max(0, x.strikes - 1) } : x));
  const ban = (id: string) => setItems(p => p.map(x => x.id === id ? { ...x, status: "banned" } : x));
  const unban = (id: string) => setItems(p => p.map(x => x.id === id ? { ...x, status: "active", strikes: Math.max(0, x.strikes - 1) } : x));
  const permBan = (id: string) => setItems(p => p.map(x => x.id === id ? { ...x, status: "permbanned" } : x));

  return (
    <div>
      <h2 style={h2}>Strikes & Suspensions</h2>
      <p style={sub}>Users with active strikes, bans, and pending appeals.</p>
      <table style={table}>
        <thead><tr><Th>HANDLE</Th><Th>STRIKES</Th><Th>STATUS</Th><Th>NOTE</Th><Th>APPEAL</Th><Th>ACTIONS</Th></tr></thead>
        <tbody>
          {items.map(row => (
            <tr key={row.id}>
              <Td mono><strong>{row.handle}</strong></Td>
              <Td>
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: i < row.strikes ? "#ef4444" : "#f1f5f9" }} />
                  ))}
                  <span style={{ fontSize: 12, marginLeft: 4 }}>{row.strikes}/3</span>
                </div>
              </Td>
              <Td>{badge(row.status === "banned" || row.status === "permbanned" ? "red" : "yellow", row.status)}</Td>
              <Td><span style={{ fontSize: 12, color: "#6b7280" }}>{row.note}</span></Td>
              <Td>
                {row.appealed ? (
                  <span style={{ fontSize: 12, fontStyle: "italic", color: "#6366f1" }} title={row.appealNote}>📝 Appeal filed</span>
                ) : "—"}
              </Td>
              <Td>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {row.status !== "banned" && row.status !== "permbanned" && (
                    <Btn label="Strike" color="red" onClick={() => issueStrike(row.id)} />
                  )}
                  <Btn label="Revoke" onClick={() => revoke(row.id)} />
                  {row.status === "active" && <Btn label="Ban" color="red" onClick={() => ban(row.id)} />}
                  {row.status === "banned" && (
                    <>
                      <Btn label="Reinstate" color="green" onClick={() => unban(row.id)} />
                      <Btn label="Perm Ban" color="red" onClick={() => permBan(row.id)} />
                    </>
                  )}
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Shared styles — matches Enki Art warm editorial palette ───────────────
const CREAM = "#f5f3ee";
const CREAM_CARD = "#faf9f7";
const BORDER = "#e8e5de";

const h2: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontStyle: "italic", fontSize: 24, fontWeight: 700, color: "#111", margin: 0,
};
const sub: React.CSSProperties = {
  fontSize: 12.5, color: "#a09788", marginBottom: 22, marginTop: 5,
  fontFamily: "'Outfit', sans-serif",
};
const table: React.CSSProperties = {
  width: "100%", borderCollapse: "collapse",
  background: CREAM_CARD, borderRadius: 10, overflow: "hidden",
  border: `1px solid ${BORDER}`,
};

// ── Recovery Requests tab ─────────────────────────────────────────
function RecoveryRequests() {
  const [items, setItems] = useState(MOCK_RECOVERY);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const statusColor = (s: string) =>
    s === "approved" ? "green" : s === "needs_info" ? "yellow" : s === "rejected" ? "red" : "";
  const statusLabel = (s: string) =>
    s === "approved" ? "Approved" : s === "needs_info" ? "Needs info" : s === "rejected" ? "Rejected" : "Pending";

  const update = (id: string, status: string) =>
    setItems(p => p.map(x => x.id === id ? { ...x, status } : x));

  const filtered = items.filter(r =>
    r.handle.toLowerCase().includes(search.toLowerCase()) ||
    r.contact.toLowerCase().includes(search.toLowerCase())
  );
  const pending = items.filter(x => x.status === "pending").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={h2}>Recovery Requests</h2>
          {pending > 0 && <span style={{ padding: "2px 10px", background: "#fef9eb", color: "#7a5c10", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{pending} pending</span>}
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
          style={{ padding: "6px 12px", border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, outline: "none", width: 200 }} />
      </div>
      <p style={sub}>Manual account recovery requests from users who've lost all sign-in methods. Click a row to review evidence.</p>

      <table style={table}>
        <thead><tr><Th>HANDLE</Th><Th>CONTACT EMAIL</Th><Th>EVIDENCE</Th><Th>SUBMITTED</Th><Th>STATUS</Th><Th>ACTIONS</Th></tr></thead>
        <tbody>
          {filtered.map(row => (
            <>
              <tr key={row.id} onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                style={{ cursor: "pointer", background: expanded === row.id ? "#f0f4ff" : CREAM_CARD }}>
                <Td><strong>{row.handle}</strong></Td>
                <Td mono>{row.contact}</Td>
                <Td>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {row.evidence.email    && <span style={{ fontSize: 10, padding: "2px 6px", background: "#f0ede6", borderRadius: 4 }}>📧 email</span>}
                    {row.evidence.wallet   && <span style={{ fontSize: 10, padding: "2px 6px", background: "#f0ede6", borderRadius: 4 }}>🔗 wallet</span>}
                    {row.evidence.socials  && <span style={{ fontSize: 10, padding: "2px 6px", background: "#f0ede6", borderRadius: 4 }}>🐦 social</span>}
                    {row.evidence.hasZkp   && <span style={{ fontSize: 10, padding: "2px 6px", background: "#f0eafb", color: "#5a3e8f", borderRadius: 4 }}>🔐 ZKP hash</span>}
                    {row.evidence.content  && <span style={{ fontSize: 10, padding: "2px 6px", background: "#f0ede6", borderRadius: 4 }}>🖼 content</span>}
                    {!row.evidence.email && !row.evidence.wallet && !row.evidence.hasZkp && !row.evidence.content &&
                      <span style={{ fontSize: 11, color: "#d94f3d" }}>Minimal evidence</span>}
                  </div>
                </Td>
                <Td mono>{row.submitted}</Td>
                <Td>{badge(statusColor(row.status), statusLabel(row.status))}</Td>
                <Td onClick={e => e.stopPropagation()}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {row.status === "pending" && <>
                      <Btn label="Approve" color="green" onClick={() => update(row.id, "approved")} />
                      <Btn label="Need More" onClick={() => update(row.id, "needs_info")} />
                      <Btn label="Reject" color="red" onClick={() => update(row.id, "rejected")} />
                    </>}
                    {row.status === "needs_info" && <Btn label="Re-review" onClick={() => update(row.id, "pending")} />}
                    {row.status === "approved"   && <span style={{ fontSize: 12, color: "#276738" }}>✓ Access restored</span>}
                    {row.status === "rejected"   && <span style={{ fontSize: 12, color: "#b03020" }}>✗ Denied</span>}
                  </div>
                </Td>
              </tr>
              {expanded === row.id && (
                <tr key={row.id + "-exp"}>
                  <td colSpan={6} style={{ padding: "18px 20px", background: "#f0f4ff", borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px", marginBottom: 14 }}>
                      {[
                        { label: "Old email",      val: row.evidence.email   || "—" },
                        { label: "Wallet address", val: row.evidence.wallet  || "—" },
                        { label: "Social links",   val: row.evidence.socials || "—" },
                        { label: "Content owned",  val: row.evidence.content || "—" },
                        { label: "ZKP hash submitted", val: row.evidence.hasZkp ? "Yes — verify against stored hash" : "Not submitted" },
                      ].map(f => (
                        <div key={f.label}>
                          <p style={{ fontSize: 10, color: "#b0a898", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "monospace" }}>{f.label}</p>
                          <p style={{ fontSize: 13, color: "#3a3530", margin: 0 }}>{f.val}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: 10, color: "#b0a898", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "monospace" }}>Explanation</p>
                      <p style={{ fontSize: 13, color: "#3a3530", margin: 0, lineHeight: 1.65, maxWidth: 700 }}>{row.explanation}</p>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
          {filtered.length === 0 && <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#a09788" }}>No recovery requests.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

const TABS: { id: Tab; label: string; icon: string; count?: number }[] = [
  { id: "imports",  label: "Pending Imports",      icon: "📥", count: MOCK_IMPORTS.length },
  { id: "reports",  label: "Reports",               icon: "🚩", count: MOCK_REPORTS.length },
  { id: "feedback", label: "Feedback",              icon: "💬", count: MOCK_FEEDBACK.filter(f => f.status === "unpaid").length },
  { id: "friends",  label: "Friends (Whitelist)",   icon: "🔐" },
  { id: "hunters",  label: "Hunter Trust",          icon: "🎯" },
  { id: "strikes",  label: "Strikes & Suspensions", icon: "⚡", count: MOCK_STRIKES.filter(s => s.appealed).length },
  { id: "recovery", label: "Recovery Requests",     icon: "🆘", count: MOCK_RECOVERY.filter(r => r.status === "pending").length },
];

// Stat card — compact, warm, editorial
function StatsBar() {
  const stats = [
    { label: "Pending imports", value: MOCK_IMPORTS.length,                                     dot: "#e4a11b" },
    { label: "Open reports",    value: MOCK_REPORTS.length,                                      dot: "#d94f3d" },
    { label: "Unpaid feedback", value: MOCK_FEEDBACK.filter(f => f.status === "unpaid").length, dot: "#7c5cbf" },
    { label: "Active strikes",  value: MOCK_STRIKES.filter(s => s.status === "active").length,  dot: "#c2692a" },
    { label: "Pending appeals",    value: MOCK_STRIKES.filter(s => s.appealed).length,                 dot: "#4a6fa5" },
    { label: "Recovery requests",  value: MOCK_RECOVERY.filter(r => r.status === "pending").length,    dot: "#c2692a" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
      {stats.map(s => (
        <div key={s.label} style={{
          flex: 1, background: CREAM_CARD,
          borderRadius: 8, padding: "12px 14px",
          border: `1px solid ${BORDER}`,
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#a09788", letterSpacing: "0.6px", textTransform: "uppercase", fontFamily: "'Outfit', sans-serif" }}>
              {s.label}
            </span>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700, color: "#111", margin: 0, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("imports");

  return (
    <div style={{ display: "flex", height: "100vh", paddingTop: 52, fontFamily: "'Outfit', sans-serif", background: CREAM }}>

      {/* Sidebar */}
      <aside style={{ width: 228, flexShrink: 0, background: "#111", height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#555", margin: "0 0 4px" }}>ENKI ART</p>
          <p style={{ fontSize: 15, fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", color: "#fff", margin: 0 }}>Admin Panel</p>
        </div>
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "11px 20px", border: "none", cursor: "pointer",
              color: tab === t.id ? "#fff" : "#777", fontSize: 13, textAlign: "left",
              borderLeft: `3px solid ${tab === t.id ? "#f5c542" : "transparent"}`,
              background: tab === t.id ? "rgba(255,255,255,0.07)" : "transparent",
              transition: "all 0.15s",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span>{t.icon}</span><span>{t.label}</span>
              </span>
              {t.count != null && t.count > 0 && (
                <span style={{ background: tab === t.id ? "#f5c542" : "rgba(255,255,255,0.15)", color: tab === t.id ? "#111" : "#ccc", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 20, fontFamily: "monospace" }}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <a href="/leaderboard" style={{ display: "block", fontSize: 12, color: "#555", textDecoration: "none", marginBottom: 8 }}>📊 Leaderboard</a>
          <a href="/settings" style={{ fontSize: 12, color: "#555", textDecoration: "none" }}>← Back to Settings</a>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <StatsBar />
          {tab === "imports"  && <PendingImports />}
          {tab === "reports"  && <Reports />}
          {tab === "feedback" && <FeedbackTab />}
          {tab === "friends"  && <Friends />}
          {tab === "hunters"  && <HunterTrust />}
          {tab === "strikes"  && <StrikesSuspensions />}
          {tab === "recovery" && <RecoveryRequests />}
        </div>
      </main>
    </div>
  );
}



