/* Image UI (Detail) — back-above-title, like by name, free/paid prompt,
   generator+ratio dropdowns, reference images, comments below, history panel right */
const Icon = window.Icon;
const { useState, useRef, useEffect } = React;

const DT_PASTEL = [
  { bg: "#FDE8E8", text: "#8B2E2E", border: "#E8A0A0" }, { bg: "#E8F4FD", text: "#1E4A6E", border: "#9CCAE8" },
  { bg: "#E8F8EE", text: "#1F5C38", border: "#9AD4B0" }, { bg: "#F3E8FD", text: "#4A2E6E", border: "#C4A0E8" },
  { bg: "#FDF6E8", text: "#6E4A1E", border: "#E8C89A" }, { bg: "#E8F8F8", text: "#1E5C5C", border: "#9AD4D4" },
];
const dtColor = (i) => DT_PASTEL[i % DT_PASTEL.length];

function dtPrompt(text) {
  const parts = text.split(/(\[[^\]\n]+\])/g); let ci = 0; const seen = {};
  return parts.map((p, i) => {
    if (/^\[[^\]\n]+\]$/.test(p)) { if (seen[p] === undefined) seen[p] = ci++; const c = dtColor(seen[p]); return <span key={i} className="ek-dt-tok" style={{ background: c.bg, color: c.text, boxShadow: "inset 0 0 0 1px " + c.border }}>{p}</span>; }
    return <span key={i}>{p}</span>;
  });
}

const REJECT_REASONS = ["Flagged: possible trademark (logo detected). Adjust the prompt and retry.", "Content policy: violent imagery. Soften the description.", "Face likeness blocked — remove the named person."];

function Detail({ prompt, generators, onClose, faved, onToggleFav, onToast }) {
  const free = !prompt.paid;
  const [active, setActive] = useState(prompt.img);
  const [gen, setGen] = useState(prompt.generator);
  const [ratio, setRatio] = useState("1:1");
  const [vals, setVals] = useState({});
  const [refs, setRefs] = useState([]);
  const [comment, setComment] = useState("");
  const [attach, setAttach] = useState(null);   // id of my generation to publish with the review
  const [pickerOpen, setPickerOpen] = useState(false);
  const [comments, setComments] = useState(() => ([
    { handle: "kreidesign", name: "Kojima Rei", time: "2h", text: "the variable control on this is chef's kiss — got 4 keepers first try.", likes: 12 },
    { handle: "drao", name: "Devansh Rao", time: "5h", text: "what resolution did you verify these at? the texture holds up incredibly well.", likes: 5 },
    { handle: "noaf", name: "Noa Friedman", time: "1d", text: "remixed this into a poster series, thank you for releasing it 🙏", likes: 23, result: prompt.versions[1] },
  ]));
  const [history, setHistory] = useState(() => ([
    { id: "h1", status: "done", img: prompt.versions[0] },
    { id: "h2", status: "done", img: prompt.versions[1] },
    { id: "h3", status: "rejected", img: prompt.versions[2], reason: REJECT_REASONS[0] },
    { id: "h4", status: "done", img: prompt.versions[3] },
  ]));
  const fileRef = useRef(null);
  const thumbs = [prompt.img, ...prompt.versions];

  useEffect(() => { const k = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);

  const onFiles = (e) => { Array.from(e.target.files || []).forEach((f) => { const r = new FileReader(); r.onload = () => setRefs((p) => [...p, r.result]); r.readAsDataURL(f); }); e.target.value = ""; };

  const useGenerate = () => {
    const id = "g" + Date.now();
    setHistory((h) => [{ id, status: "loading", img: null }, ...h]);
    onToast("Generating with " + (generators.find((g) => g.id === gen) || {}).short);
    setTimeout(() => {
      const img = window.ENKI.genResult(id, ratio);
      setHistory((h) => h.map((x) => x.id === id ? { ...x, status: "done", img } : x));
      setActive(img);
    }, 2200);
  };

  const addComment = () => {
    if (!comment.trim() && !attach) return;
    const mine = attach ? history.find((h) => h.id === attach) : null;
    setComments((c) => [{ handle: "maya", name: "Maya Sørensen", time: "now", text: comment.trim(), likes: 0, result: mine ? mine.img : null }, ...c]);
    setComment(""); setAttach(null); setPickerOpen(false);
    if (mine) onToast("Review posted · this result is now public");
  };
  const myResults = history.filter((h) => h.status === "done" && h.img);

  return (
    <div className="ek-dt">
      <div className="ek-dt-grid">
        {/* LEFT — prompt / settings */}
        <div className="ek-dt-left">
          <button className="ek-dt-back" type="button" onClick={onClose}><Icon name="chevronLeft" size={15} stroke={2.4} /> Back</button>
          <div className="ek-dt-titlerow">
            <span className="ek-dt-title">{prompt.title}</span>
            <button className={"ek-dt-like" + (faved ? " active" : "")} onClick={() => onToggleFav(prompt.id)} title="Like" type="button">
              <Icon name="heart" size={18} stroke={2} fill={faved ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="ek-dt-by">by <b>{prompt.artist}</b></div>

          <span className={"ek-dt-paidbadge " + (free ? "free" : "paid")}>{free ? <><Icon name="check" size={11} stroke={2.6} /> Free prompt</> : <><Icon name="dollar" size={11} stroke={2.6} /> Paid · ${prompt.price.toFixed(2)} / render</>}</span>

          {free ? (
            <>
              <span className="ek-ed-lab">Prompt</span>
              <div className="ek-dt-promptbox">{dtPrompt(prompt.prompt)}</div>
              {prompt.vars.length > 0 && (
                <>
                  <span className="ek-ed-lab">Fill variables</span>
                  <div style={{ marginBottom: 18 }}>
                    {prompt.vars.map((v, i) => { const c = dtColor(i); return (
                      <div className="mm-var-row" key={v} style={{ background: c.bg, border: "1px solid " + c.border, marginBottom: 8 }}>
                        <span className="mm-var-name" style={{ color: c.text, borderRightColor: c.border }}>{v}</span>
                        <input className="mm-var-input" style={{ color: c.text }} value={vals[v] || ""} onChange={(e) => setVals({ ...vals, [v]: e.target.value })} placeholder={"Enter " + v + "…"} />
                      </div>
                    ); })}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {prompt.vars.length > 0 ? (
                <>
                  <span className="ek-ed-lab">Variables</span>
                  <div style={{ marginBottom: 18 }}>
                    {prompt.vars.map((v, i) => { const c = dtColor(i); return (
                      <div className="mm-var-row" key={v} style={{ background: c.bg, border: "1px solid " + c.border, marginBottom: 8 }}>
                        <span className="mm-var-name" style={{ color: c.text, borderRightColor: c.border }}>{v}</span>
                        <input className="mm-var-input" style={{ color: c.text }} value={vals[v] || ""} onChange={(e) => setVals({ ...vals, [v]: e.target.value })} placeholder={"Enter " + v + "…"} />
                      </div>
                    ); })}
                  </div>
                </>
              ) : (
                <div className="ek-dt-locked"><Icon name="image" size={18} stroke={2} style={{ marginBottom: 6 }} /><br />Body locked. Add a reference image below, then generate.</div>
              )}
            </>
          )}

          <div className="ek-dt-2sel">
            <div>
              <span className="ek-ed-lab">Generator</span>
              <select className="ek-ed-select" value={gen} onChange={(e) => setGen(e.target.value)}>
                {generators.map((g) => <option key={g.id} value={g.id}>{g.short}</option>)}
              </select>
            </div>
            <div>
              <span className="ek-ed-lab">Aspect ratio</span>
              <select className="ek-ed-select" value={ratio} onChange={(e) => setRatio(e.target.value)}>
                {["1:1", "4:5", "3:4", "16:9", "9:16"].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <span className="ek-ed-lab">Reference images · optional</span>
          <div className="ek-dt-refgrid">
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onFiles} />
            <button className="ek-dt-refadd" onClick={() => fileRef.current && fileRef.current.click()}><Icon name="plus" size={16} stroke={2} /> Add</button>
            {refs.map((src, i) => <img key={i} className="ek-dt-refimg" src={src} alt="ref" />)}
          </div>

          <div className="ek-dt-actions">
            <button className="ek-btn" onClick={useGenerate}><Icon name="sparkles" size={17} stroke={2} fill="var(--cta-ink)" /> Use &amp; Generate · ${prompt.price.toFixed(2)}</button>
            <button className="ek-btn ek-btn-2"><Icon name="download" size={17} stroke={2} /> Download image</button>
          </div>
        </div>

        {/* CENTER — image + comments */}
        <div className="ek-dt-center">
          <div className="ek-dt-stage"><img src={active} alt={prompt.title} key={active} /></div>
          <div className="ek-dt-thumbs">
            {thumbs.map((t, i) => <img key={i} src={t} alt="" className={"ek-dt-thumb" + (active === t ? " active" : "")} onClick={() => setActive(t)} />)}
          </div>
          <div className="ek-dt-comments">
            <div className="ek-dt-comments-h"><Icon name="message" size={19} stroke={2} /> Comments <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--enki-ink-3)", fontWeight: 400 }}>· {comments.length}</span></div>
            <div className="ek-dt-comments-sub">Reviewed it? Drop a comment — and optionally publish one of your own results from this prompt.</div>
            <div className="ek-dt-review">
              {attach && (
                <div className="ek-dt-attach">
                  <img src={(history.find((h) => h.id === attach) || {}).img} alt="your result" />
                  <div className="ek-dt-attach-meta">
                    <span className="ek-dt-attach-tag"><span className="ek-dt-public-dot" /> Will be published publicly</span>
                    <span className="ek-dt-attach-sub">Your other results stay private.</span>
                  </div>
                  <button className="ek-dt-attach-x" onClick={() => setAttach(null)} title="Remove"><Icon name="x" size={14} stroke={2.4} /></button>
                </div>
              )}
              {pickerOpen && (
                <div className="ek-dt-picker">
                  <div className="ek-dt-picker-h">Pick a result to make public</div>
                  {myResults.length === 0 ? (
                    <div className="ek-dt-picker-empty">No finished results yet — run “Use &amp; Generate” first.</div>
                  ) : (
                    <div className="ek-dt-picker-grid">
                      {myResults.map((h) => (
                        <button key={h.id} className={"ek-dt-picker-item" + (attach === h.id ? " sel" : "")} onClick={() => { setAttach(h.id); setPickerOpen(false); }}>
                          <img src={h.img} alt="" />
                          {attach === h.id && <span className="ek-dt-picker-check"><Icon name="check" size={12} stroke={3} /></span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="ek-dt-cbar">
              <button className={"ek-dt-attachbtn" + (attach ? " on" : "")} onClick={() => setPickerOpen((o) => !o)} title="Attach one of your results (makes it public)" type="button">
                <Icon name="image" size={17} stroke={2} />
              </button>
              <input className="ek-dt-cinput" placeholder={attach ? "Write your review…" : "Add a comment or review…"} value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addComment(); }} />
              <button className="ek-btn" style={{ width: "auto", padding: "0 20px", minHeight: 44 }} onClick={addComment}>{attach ? "Post review" : "Post"}</button>
            </div>
            {comments.map((c, i) => (
              <div className="ek-dt-comment" key={i}>
                <img className="ek-dt-cav" src={window.ENKI.genResult(c.handle, "1:1")} alt={c.name} />
                <div className="ek-dt-cbody">
                  <div className="ek-dt-ctop"><span className="ek-dt-cname">{c.name}</span><span className="ek-dt-ctime">@{c.handle} · {c.time}</span></div>
                  <div className="ek-dt-ctext">{c.text}</div>
                  {c.result && (
                    <div className="ek-dt-cresult">
                      <img src={c.result} alt="published result" onClick={() => setActive(c.result)} />
                      <span className="ek-dt-cresult-tag"><span className="ek-dt-public-dot" /> Public result</span>
                    </div>
                  )}
                  <div className="ek-dt-clikes"><Icon name="heart" size={13} stroke={2} /> {c.likes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — history */}
        <div className="ek-dt-right">
          <div className="ek-dt-right-h">History</div>
          <div className="ek-hist">
            {history.map((h) => (
              <div key={h.id}>
                <div className={"ek-hist-item " + h.status} onClick={() => h.img && setActive(h.img)}>
                  {h.img ? <img src={h.img} alt="" /> : <div style={{ width: "100%", height: "100%" }} />}
                  {h.status === "loading" && <div className="ek-hist-loadov"><Icon name="refresh" size={22} stroke={2} className="ek-spin-ico" /></div>}
                  {h.status === "rejected" && <div className="ek-hist-rejov" />}
                  <span className={"ek-hist-badge " + h.status}>
                    {h.status === "done" && <Icon name="check" size={13} stroke={3} />}
                    {h.status === "loading" && <Icon name="refresh" size={12} stroke={2.4} className="ek-spin-ico" />}
                    {h.status === "rejected" && <Icon name="x" size={13} stroke={3} />}
                  </span>
                  {h.status === "rejected" && <div className="ek-hist-tip">{h.reason}</div>}
                </div>
                <div className="ek-hist-cap">{h.status === "loading" ? "generating…" : h.status === "rejected" ? "rejected" : "ready"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Detail });
