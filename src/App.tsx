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
  const myId = useState(() => Math.floor(Math.random() * 90000) + 10000)[0];

  const openRoom = (r: any) => {
    setSelected(r);
    const initialSeats = Array.from({ length: 25 }, (_, i) => i === 0? { name: user.name, muted: false, isHost: true } : null);
    setSeats(initialSeats);
    setChats([`Welcome to ${r.name} room! 🎉`, `${user.name} joined as Host 👑`]);
  };

  const saveRooms = (nr: any[]) => { setRooms(nr); localStorage.setItem("laachi_rooms", JSON.stringify(nr)); };

  const handleCreateRoom = () => {
    if (!newRoomName) return alert("Room ka naam likho!");
    const colors = ["#ff1493", "#8a2be2", "#00bfff", "#ff8c00", "#00ff7f", "#ff4500"];
    const newRoom = { id: newRoomName[0].toUpperCase(), name: newRoomName, cat: newRoomCat, color: colors[Math.floor(Math.random() * 6)], viewers: "1", owner: user.name };
    saveRooms([newRoom,...rooms]); setNewRoomName(""); setShowCreate(false); setTab("home");
  };

  const doSignUp = () => { if (!name ||!pass) return alert("Naam likho"); if (localStorage.getItem(`user_${name}`)) return alert("Naam pehle se hai!"); localStorage.setItem(`user_${name}`, pass); localStorage.setItem("laachi_user", JSON.stringify({ name })); setUser({ name }); };
  const doLogin = () => { if (!name ||!pass) return alert("Naam likho"); const sp = localStorage.getItem(`user_${name}`); if (!sp) return alert("Naam nahi mila!"); if (sp!== pass) return alert("Password galat!"); localStorage.setItem("laachi_user", JSON.stringify({ name })); setUser({ name }); };
  const googleLogin = () => { const gName = "Umais Google"; localStorage.setItem("laachi_user", JSON.stringify({ name: gName })); setUser({ name: gName }); };
  const logout = () => { localStorage.removeItem("laachi_user"); setUser(null); setSelected(null); setTab("home"); };

  const sitOnSeat = (idx: number) => {
    if (seats[idx]) return;
    if (seats.some((s: any) => s?.name === user.name)) {
      return alert("Aap pehle se ek seat par baithe ho! Pehle wali seat choro phir dusri par baitho!");
    }
    const ns = [...seats]; ns[idx] = { name: user.name, muted: false, isHost: false }; setSeats(ns);
    setChats(prev => [...prev, `${user.name} sat on seat ${idx + 1} 🎤`]);
  };

  const leaveSeat = (idx: number) => {
    if (idx === 0) return alert("Host seat nahi chor sakta!");
    if (seats[idx]?.name!== user.name) return;
    const ns = [...seats]; ns[idx] = null; setSeats(ns);
    setChats(prev => [...prev, `${user.name} left seat ${idx + 1}`]);
  };

  const sendChat = () => { if (!chatMsg) return; setChats([...chats, `${user.name}: ${chatMsg}`]); setChatMsg(""); };

  if (selected) {
    return (
      <div style={{ background: "linear-gradient(180deg, #1a0033 0%, #000 100%)", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", alignItems: "center", background: "rgba(0,0,0,0.5)" }}>
          <button onClick={() => setSelected(null)} style={{ background: "#ff1493", color: "#fff", padding: "6px 15px", borderRadius: 20, border: "none" }}>← Back</button>
          <div style={{ textAlign: "center" }}><b style={{ fontSize: 14 }}>{selected.name}</b><div style={{ fontSize: 10, color: "#aaa" }}>ID: 107{myId} • Owner: {selected.owner || user.name}</div></div>
          <span style={{ background: "#222", padding: "5px 10px", borderRadius: 15, fontSize: 12 }}>👥 {seats.filter(Boolean).length}/25</span>
        </div>
        <div style={{ padding: 10, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, flex: 1, overflowY: "auto" }}>
          {seats.map((s, i) => (
            <div key={i} onClick={() => s? leaveSeat(i) : sitOnSeat(i)} style={{ background: s? (s.isHost? "rgba(255,215,0,0.2)" : "rgba(255,20,147,0.2)") : "rgba(255,255,255,0.05)", border: s? (s.isHost? "1px solid gold" : "1px solid #ff1493") : "1px dashed #333", borderRadius: 12, padding: "8px 3px", textAlign: "center" }}>
              <div style={{ width: 38, height: 38, background: s? (s.isHost? "gold" : "#ff1493") : "#222", borderRadius: 20, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: s?.isHost? "#000" : "#fff", fontWeight: "bold" }}>{s? s.name[0].toUpperCase() : "+"}</div>
              <div style={{ fontSize: 9, marginTop:
