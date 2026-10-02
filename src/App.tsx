import { useState } from "react";

const initialRooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);
  const [tab, setTab] = useState("home");
  const [rooms, setRooms] = useState(() => {
    const s = localStorage.getItem("laachi_rooms");
    return s? JSON.parse(s) : initialRooms;
  });
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("laachi_user");
    return s? JSON.parse(s) : null;
  });
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomCat, setNewRoomCat] = useState("Desi");
  const [seats, setSeats] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chats, setChats] = useState<string[]>(["Welcome to LaachiLive! 🎉"]);
  const [myId] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  const openRoom = (r: any) => {
    setSelected(r);
    const init = Array.from({ length: 25 }, (_, i) => i === 0? { name: user.name, muted: false, isHost: true } : null);
    setSeats(init);
    setChats([`Welcome to ${r.name}! 🎉`, `${user.name} joined as Host 👑`]);
  };

  const saveRooms = (nr: any[]) => { setRooms(nr); localStorage.setItem("laachi_rooms", JSON.stringify(nr)); };

  const handleCreateRoom = () => {
    if (!newRoomName) return alert("Room ka naam likho!");
    const colors = ["#ff1493", "#8a2be2", "#00bfff", "#ff8c00", "#00ff7f"];
    const newRoom = { id: newRoomName[0].toUpperCase(), name: newRoomName, cat: newRoomCat, color: colors[Math.floor(Math.random() * 5)], viewers: "1", owner: user.name };
    saveRooms([newRoom,...rooms]);
    setNewRoomName(""); setShowCreate(false); setTab("home");
  };

  const doSignUp = () => { if (!name ||!pass) return alert("Naam likho"); if (localStorage.getItem(`user_${name}`)) return alert("Naam pehle se hai!"); localStorage.setItem(`user_${name}`, pass); localStorage.setItem("laachi_user", JSON.stringify({ name })); setUser({ name }); };
  const doLogin = () => { if (!name ||!pass) return alert("Naam likho"); const sp = localStorage.getItem(`user_${name}`); if (!sp) return alert("Naam nahi mila!"); if (sp!== pass) return alert("Password galat!"); localStorage.setItem("laachi_user", JSON.stringify({ name })); setUser({ name }); };
  const googleLogin = () => { const gName = "Umais Google"; localStorage.setItem("laachi_user", JSON.stringify({ name: gName })); setUser({ name: gName }); };
  const logout = () => { localStorage.removeItem("laachi_user"); setUser(null); setSelected(null); setTab("home"); };

  const sitOnSeat = (idx: number) => {
    if (seats[idx]) return;
    if (seats.some((s: any) => s?.name === user.name)) return alert("Aap pehle se ek seat par ho!");
    const ns = [...seats]; ns[idx] = { name: user.name, muted: false, isHost: false }; setSeats(ns);
    setChats(prev => [...prev, `${user.name} sat on seat ${idx + 1} 🎤`]);
  };
  const leaveSeat = (idx: number) => {
    if (idx === 0) return alert("Host seat nahi chor sakta!"); if (seats[idx]?.name!== user.name) return;
    const ns = [...seats]; ns[idx] = null; setSeats(ns);
  };
  const sendChat = () => { if (!chatMsg) return; setChats([...chats, `${user.name}: ${chatMsg}`]); setChatMsg(""); };

  if (selected) {
    return (
      <div style={{ background: "linear-gradient(180deg,#1a0033 0%,#000 100%)", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", alignItems: "center", background: "rgba(0,0,0,0.5)" }}>
          <button onClick={() => setSelected(null)} style={{ background: "#ff1493", color: "#fff", padding: "6px 15px", borderRadius: 20, border: "none" }}>← Back</button>
          <div style={{ textAlign: "center" }}><b style={{ fontSize: 14 }}>{selected.name}</b><div style={{ fontSize: 10, color: "#aaa" }}>ID: 107{myId}</div></div>
          <span style={{ background: "#222", padding: "5px 10px", borderRadius: 15, fontSize: 12 }}>👥 {seats.filter(Boolean).length}/25</span>
        </div>
        <div style={{ padding: 10, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, flex: 1, overflowY: "auto" }}>
          {seats.map((s: any, i: number) => (
            <div key={i} onClick={() => s? leaveSeat(i) : sitOnSeat(i)} style={{ background: s? (s.isHost? "rgba(255,215,0,0.2)" : "rgba(255,20,147,0.2)") : "rgba(255,255,255,0.05)", border: s? (s.isHost? "1px solid gold" : "1px solid #ff1493") : "1px dashed #333", borderRadius: 12, padding: "8px 3px", textAlign: "center" }}>
              <div style={{ width: 38, height: 38, background: s? (s.isHost? "gold" : "#ff1493") : "#222", borderRadius: 20, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: s?.isHost? "#000" : "#fff", fontWeight: "bold" }}>{s? s.name[0].toUpperCase() : "+"}</div>
              <div style={{ fontSize: 9, marginTop: 4, color: s?.isHost? "gold" : "#fff", overflow: "hidden", whiteSpace: "nowrap" }}>{s? (s.isHost? "👑 " + s.name : s.name) : `Seat ${i + 1}`}</div>
              <div style={{ fontSize: 8, color: s? (s.muted? "#ff4444" : "#00ff7f") : "#666" }}>{s? (s.muted? "🔇" : "🎤 Live") : "Empty"}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(0,0,0,0.6)", height: 85, overflowY: "auto", padding: "8px 12px", fontSize: 11 }}>{chats.map((c, i) => <div key={i} style={{ marginBottom: 3, color: c.includes("Welcome")? "gold" : "#ccc" }}>{c}</div>)}</div>
        <div style={{ background: "#0a0a0a", borderTop: "1px solid #222", padding: "10px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>{[{ icon: "🎁", label: "Gift" }, { icon: "💎", label: "Diamonds" }, { icon: "🔒", label: "Lock" }, { icon: "👢", label: "Kick" }, { icon: "🎵", label: "Music" }, { icon: "🎲", label: "Game" }].map(o => (<div key={o.label} style={{ background: "#1a1a1a", borderRadius: 10, padding: "6px 10px", fontSize: 11, textAlign: "center", border: "1px solid #222", minWidth: 45 }}><div>{o.icon}</div><div style={{ fontSize: 8 }}>{o.label}</div></div>))}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><button onClick={() => setIsMuted(!isMuted)} style={{ background: isMuted? "#ff4444" : "#222", color: "#fff", border: "1px solid #333", padding: "10px 14px", borderRadius: 25 }}>{isMuted? "🔇" : "🎤"}</button><input value={chatMsg} onChange={e => setChatMsg(e.target.value)} placeholder="Say..." style={{ flex: 1, background: "#1a1a1a", border: "1px solid #333", borderRadius: 25, padding: "10px 15px", color: "#fff", fontSize: 12 }} /><button onClick={sendChat} style={{ background: "#ff1493", color: "#fff", border: "none", padding: "10px 18px", borderRadius: 25, fontWeight: "bold", fontSize: 12 }}>Send</button></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900 }}><span style={{ color: "#ff1493" }}>Laachi</span>Live</h1>
        <div style={{ width: 150, height: 150, marginTop: 15, borderRadius: 75, background: "radial-gradient(circle, #ff1493 0%, #8a2be2 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 65 }}>👩‍🦰</div>
        <div style={{ width: "100%", maxWidth: 340, marginTop: 18 }}>
          <div style={{ background: "#111", borderRadius: 18, padding: 20, border: "1px solid #222" }}>
            <h3 style={{ textAlign: "center" }}>Login / Signup</h3>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Apna naam" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #333", background: "#1e1e1e", color: "#fff", boxSizing: "border-box", marginBottom: 10 }} />
            <div style={{ position: "relative", marginBottom: 15 }}><input value={pass} onChange={e => setPass(e.target.value)} type={showPass? "text" : "password"} placeholder="Password" style={{ width: "100%", padding: "12px 40px 12px 12px", borderRadius: 10, border: "1px solid #333", background: "#1e1e1e", color: "#fff", boxSizing: "border-box" }} /><span onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: 11 }}>{showPass? "🙈" : "👁️"}</span></div>
            <button onClick={doLogin} style={{ width: "100%", background: "#ff1493", color: "#fff", border: "none", padding: 12, borderRadius: 25, fontWeight: "bold" }}>Sign In</button>
            <button onClick={doSignUp} style={{ width: "100%", marginTop: 10, background: "#222", color: "#fff", border: "1px solid #333", padding: 12, borderRadius: 25 }}>New Account</button>
            <button onClick={googleLogin} style={{ width: "100%", marginTop: 12, background: "#fff", color: "#000", border: "none", padding: 11, borderRadius: 25, fontWeight: "bold" }}>Continue with Google</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", paddingBottom: 70 }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", borderBottom: "1px solid #111", position: "sticky", top: 0, background: "#000", zIndex: 10 }}><h2 style={{ margin: 0 }}><span style={{ color: "#ff1493" }}>Laachi</span>Live</h2><span style={{ background: "#1a1a1a", padding: "6px 12px", borderRadius: 15, fontSize: 12 }}>👤 {user.name}</span></div>
      {showCreate && (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}><div style={{ background: "#111", borderRadius: 18, padding: 20, width: "100%", maxWidth: 320, border: "1px solid #333" }}><h3 style={{ marginTop: 0 }}>Create Room</h3><input value={newRoomName} onChange={e => setNewRoomName(e.target.value)} placeholder="Room Name" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #333", background: "#1e1e1e", color: "#fff", marginBottom: 12 }} /><select value={newRoomCat} onChange={e => setNewRoomCat(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #333", background: "#1e1e1e", color: "#fff", marginBottom: 15 }}><option>Desi</option><option>Punjabi</option><option>New</option><option>Trending</option></select><div style={{ display: "flex", gap: 10 }}><button onClick={() => setShowCreate(false)} style={{ flex: 1, background: "#222", color: "#fff", border: "1px solid #333", padding: 12, borderRadius: 25 }}>Cancel</button><button onClick={handleCreateRoom} style={{ flex: 1, background: "#ff1493", color: "#fff", border: "none", padding: 12, borderRadius: 25, fontWeight: "bold" }}>Create</button></div></div></div>)}
      {tab === "home" && (<div style={{ padding: 15 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><h3 style={{ margin: 0 }}>🔥 Live Rooms ({rooms.length})</h3><button onClick={() => setShowCreate(true)} style={{ background: "#ff1493", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>+ Create Room</button></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{rooms.map((r: any) => (<div key={r.name} onClick={() => openRoom(r)} style={{ background: "#111", borderRadius: 15, overflow: "hidden", border: "1px solid #222" }}><div style={{ background: r.color, height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{r.id}</div><div style={{ padding: 10 }}><b style={{ fontSize: 13 }}>{r.name}</b><div style={{ fontSize: 11, color: "#aaa" }}>{r.cat}</div></div></div>))}</div></div>)}
      {tab === "live" && (<div style={{ padding: 30, textAlign: "center" }}><h2>🎙️ Go Live</h2><button onClick={() => setShowCreate(true)} style={{ background: "#ff1493", color: "#fff", border: "none", padding: "12px 25px", borderRadius: 25, fontWeight: "bold" }}>+ Create My Room</button></div>)}
      {tab === "message" && <div style={{ padding: 20 }}><h3>💬 Messages</h3><p style={{ color: "#666" }}>No messages yet</p></div>}
      {tab === "profile" && (
        <div style={{ paddingBottom: 20 }}>
          <div style={{ background: "linear-gradient(135deg,#ff1493,#8a2be2)", padding: 25, borderRadius: "0 0 25px 25px" }}>
            <div style={{ display: "flex", gap: 15, alignItems: "center" }}><div style={{ width: 80, height: 80, background: "#fff", borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#000", fontWeight: "bold" }}>{user.name[0]?.toUpperCase()}</div><div><h2 style={{ margin: 0, fontSize: 20 }}>{user.name} 👑</h2><div style={{ fontSize: 12, opacity: 0.9 }}>ID: 107{myId} | Level 1</div><div style={{ fontSize: 11, marginTop: 4, background: "rgba(0,0,0,0.3)", padding: "3px 8px", borderRadius: 10, display: "inline-block" }}>🔥 Pakistan</div></div></div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}><div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 10, textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: "bold" }}>💎 10,000</div><div style={{ fontSize: 10 }}>Diamonds</div></div><div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 10, textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: "bold" }}>🪙 5,000</div><div style={{ fontSize: 10 }}>Coins</div></div><div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 10, textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: "bold" }}>🎁 12</div><div style={{ fontSize: 10 }}>Gifts</div></div></div>
          </div>
          <div style={{ padding: 15 }}>
            <div style={{ background: "#111", borderRadius: 15, overflow: "hidden", border: "1px solid #222" }}>
              <div style={{ padding: "14px 15px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between" }}><span>🎒 My Backpack</span><span>›</span></div>
              <div style={{ padding: "14px 15px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between" }}><span>🏆 My Level</span><span>›</span></div>
              <div style={{ padding: "14px 15px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between" }}><span>💰 My Earnings</span><span>›</span></div>
              <div style={{ padding: "14px 15px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between" }}><span>⚙️ Settings</span><span>›</span></div>
              <div style={{ padding: "14px 15px", display: "flex", justifyContent: "space-between" }}><span>📞 Help Center</span><span>›</span></div>
            </div>
            <button onClick={logout} style={{ width: "100%", marginTop: 15, background: "#1a0000", color: "#ff4d4d", border: "1px solid #331111", padding: 14, borderRadius: 12, fontWeight: "bold" }}>🚪 Logout</button>
          </div>
        </div>
      )}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a0a0a", borderTop: "1px solid #222", display: "flex", justifyContent: "space-around", padding: "8px 0" }}><button onClick={() => setTab("home")} style={{ background: "none", border: "none", color: tab === "home"? "#ff1493" : "#666" }}>🏠<br />Home</button><button onClick={() => setTab("live")} style={{ background: "none", border: "none", color: tab === "live"? "#ff1493" : "#666" }}>📹<br />Live</button><button onClick={() => setTab("message")} style={{ background: "none", border: "none", color: tab === "message"? "#ff1493" : "#666" }}>💬<br />Msg</button><button onClick={() => setTab("profile")} style={{ background: "none", border: "none", color: tab === "profile"? "#ff1493" : "#666" }}>👤<br />Profile</button></div>
    </div>
  );
}
