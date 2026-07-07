/* Messages view — conversation list + thread, with tipping */
const Icon = window.Icon;

const MSG_PEOPLE = [
  { name: "Ирина Volkova", handle: "ivolkova", time: "2m", prev: "the ashfall set is unreal 🔥", thread: [
    { who: "them", text: "hey! your ashfall cathedral prompt is incredible. mind if I remix it?" },
    { who: "me", text: "of course — go for it. would love to see what you make." },
    { who: "them", text: "amazing, thank you 🙏" },
    { tip: 5, from: "them" },
    { who: "them", text: "small tip for the inspiration ✨" },
  ] },
  { name: "Kojima Rei", handle: "kreidesign", time: "1h", prev: "shipped the editorial pack", thread: [
    { who: "them", text: "the saffron index palette is exactly what I needed for the editorial pack." },
    { who: "me", text: "glad it worked! the plaster texture variable does a lot of heavy lifting." },
  ] },
  { name: "Devansh Rao", handle: "drao", time: "3h", prev: "can we collab on a video set?", thread: [
    { who: "them", text: "neon monsoon is going viral. want to collab on a video set?" },
    { who: "me", text: "100%. let's scope it this week." },
  ] },
  { name: "Liang Mei", handle: "lmei", time: "1d", prev: "ty for the tip!", thread: [
    { who: "me", text: "your porcelain heir portraits are stunning — sending a little something." },
    { tip: 10, from: "me" },
    { who: "them", text: "ty for the tip! 🥹 means a lot." },
  ] },
];

function Messages({ onClose, onTip, avatarFor }) {
  const [active, setActive] = React.useState(0);
  const [draft, setDraft] = React.useState("");
  const [threads, setThreads] = React.useState(() => MSG_PEOPLE.map((p) => p.thread.slice()));
  const person = MSG_PEOPLE[active];

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const send = () => {
    if (!draft.trim()) return;
    setThreads((t) => t.map((th, i) => i === active ? [...th, { who: "me", text: draft.trim() }] : th));
    setDraft("");
  };

  const tipHere = () => onTip({ name: person.name, handle: person.handle, avatar: avatarFor(person.handle) }, (amt) => {
    setThreads((t) => t.map((th, i) => i === active ? [...th, { tip: amt, from: "me" }] : th));
  });

  return (
    <div className="ek-view">
      <div className="ek-view-top">
        <button className="ek-back" type="button" onClick={onClose}><Icon name="chevronLeft" size={17} stroke={2.2} /> Back</button>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 20 }}>Messages</div>
      </div>
      <div className="ek-msg">
        <div className="ek-msg-list">
          {MSG_PEOPLE.map((p, i) => (
            <div key={p.handle} className={"ek-msg-li" + (active === i ? " active" : "")} onClick={() => setActive(i)}>
              <img className="ek-msg-av" src={avatarFor(p.handle)} alt={p.name} />
              <div className="ek-msg-li-b">
                <div className="ek-msg-li-top"><span className="ek-msg-li-name">{p.name}</span><span className="ek-msg-li-time">{p.time}</span></div>
                <div className="ek-msg-li-prev">{p.prev}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ek-msg-thread">
          <div className="ek-msg-thead">
            <img className="ek-msg-av" style={{ width: 40, height: 40 }} src={avatarFor(person.handle)} alt={person.name} />
            <div>
              <div className="ek-msg-thead-name">{person.name}</div>
              <div className="ek-msg-thead-h">@{person.handle}</div>
            </div>
            <button className="ek-btn ek-btn-2" style={{ width: "auto", minHeight: 38, marginLeft: "auto" }} onClick={tipHere}><Icon name="gift" size={15} stroke={2} /> Send tip</button>
          </div>
          <div className="ek-msg-body">
            {threads[active].map((m, i) => m.tip
              ? <div key={i} className="ek-bub-tip"><Icon name="gift" size={15} stroke={2} /> {m.from === "me" ? "You sent" : person.name.split(" ")[0] + " sent you"} a ${m.tip}.00 tip</div>
              : <div key={i} className={"ek-bub " + m.who}>{m.text}</div>
            )}
          </div>
          <div className="ek-msg-compose">
            <button className="ek-msg-iconbtn" onClick={tipHere} title="Send a tip"><Icon name="gift" size={19} stroke={2} /></button>
            <input className="ek-msg-input" placeholder={"Message " + person.name.split(" ")[0] + "…"} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} />
            <button className="ek-msg-iconbtn ek-msg-send" onClick={send} title="Send"><Icon name="send" size={18} stroke={2} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Messages });
