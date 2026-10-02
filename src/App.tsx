import { useState } from "react";

const initialRooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];

const GIFTS = [
  { id: 1, icon: "🌹", name: "Rose", price: 100 },
  { id: 2, icon: "🧸", name: "Teddy", price: 500 },
  { id: 3, icon: "💍", name: "Ring", price: 1000 },
  { id: 4, icon: "🏎️", name: "Car", price: 2000 },
  { id: 5, icon: "👑", name: "Crown", price: 3000 },
  { id: 6, icon: "🚀", name: "Rocket", price: 5000 },
  { id: 7, icon: "🦁", name: "Lion", price: 10000 },
  { id: 8, icon: "🏰", name: "Castle", price: 20000 },
  { id: 9, icon: "🌌", name: "Universe", price: 50000 },
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
  const [coins, setCoins] = useState(5000);
  const [diamonds, setDiamonds] = useState(10000);
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [bigGift, setBigGift] = useState<any>(null);

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

  const sendGift = (gift: any) => {
    if (coins < gift.price) return alert(`Coins kam hain! Aapke pas ${coins} hain, ${gift.price} chahiye`);
    setCoins(c => c - gift.price);
    setDiamonds(d => d + Math.floor(gift.price / 2));
    setChats(prev => [...prev, `🎁 ${user.name} ne ${gift.icon} ${gift.name} bheja - ${gift.price} coins!`]);
    setBigGift(gift);
    setShowGiftPanel(false);
    setTimeout(() => setBigGift(null), 2500);
  };

  if (selected) {
    return (
      <div style={{ background: "linear-gradient(180deg,#1a0033 0%,#000 100%)", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
        {bigGift && <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}><div style={{ fontSize: 100, animation: "bounce 0.8s infinite" }}>{bigGift.icon}</div><div style={{ fontSize: 22, fontWeight: "bold", marginTop: 10, color: "#ff1493" }}>{bigGift.name} Sent!</div><div style={{ fontSize: 14, color: "gold" }}>-{bigGift.price} Coins</div></div>}

        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", alignItems: "center", background: "rgba(0,0,0,0.5)" }}>
          <button onClick={() => setSelected(null)} style={{ background: "#ff1493", color: "#fff", padding: "6px 15px", borderRadius: 20, border: "none" }}>← Back</button>
          <div style={{ textAlign: "center" }}><b style={{ fontSize: 14 }}>{selected.name}</b><div style={{ fontSize: 10, color: "#aaa" }}>ID: 107{myId}</div></div>
          <span style={{ background: "#222", padding: "5px 10px", borderRadius: 15, fontSize: 11 }}>🪙 {coins}</span>
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

        <div style={{ background: "rgba(0,0,0,0.6)", height: 85, overflowY: "auto", padding: "8px 12px", fontSize: 11 }}>{chats.map((c, i) => <div key={i} style={{ marginBottom: 3, color: c.includes("🎁")? "#ff69b4" : c.includes("Welcome")? "gold" : "#ccc" }}>{c}</div>)}</div>

        {showGiftPanel && (
          <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, background: "#111", borderTop: "2px solid #ff1493", borderRadius: "20px 20px 0 0", padding: 15, zIndex: 50, maxHeight: "55%", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><b>🎁 Send Gift</b><span style={{ fontSize: 12, background: "#222", padding: "3px 10px", borderRadius: 10 }}>🪙 {coins}</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {GIFTS.map(g => (
                <div key={g.id} onClick={() => sendGift(g)} style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, padding: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 30 }}>{g.icon}</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>{g.name}</div>
                  <div style={{ fontSize: 10, color: "gold", marginTop: 2 }}>🪙 {g.price}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowGiftPanel(false)} style={{ width: "100%", marginTop: 12, background: "#222", color: "#fff", border: "1px solid #333", padding: 10, borderRadius: 10 }}>Close</button>
          </div>
        )}

        <div style={{ background: "#0a0a0a", borderTop: "1px solid #222", padding: "10px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>
            <div onClick={() => setShowGiftPanel(!showGiftPanel)} style={{ background: showGiftPanel? "#ff1493" : "#1a1a1a", borderRadius: 10, padding: "6px 10px", fontSize: 11, textAlign: "center", border: "1px solid #222", minWidth: 45 }}><div>🎁</div><div style={{ fontSize: 8 }}>Gift</div></div>
            {[{ icon: "💎", label: "Diamonds" }, { icon: "🔒", label: "Lock" }, { icon: "👢", label: "Kick" }, { icon: "🎵", label: "Music" }].map(o => (<div key={o.label} style={{ background: "#1a1a1a", borderRadius: 10, padding: "6px 10px", fontSize: 11, textAlign: "center", border: "1px solid #222", minWidth: 45 }}><div>{o.icon}</div><div style={{ fontSize: 8 }}>{o.label}</div></div>))}
          </div>
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
            <button onClick={doLogin} style={{ width: "100%", background: "#ff1493", color: "#fff", border: "none", padding: 12, borderRadius: 25, fontWeight
