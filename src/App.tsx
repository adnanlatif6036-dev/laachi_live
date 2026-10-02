import { useState } from "react";

const rooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("laachi_user");
    return s? JSON.parse(s) : null;
  });
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const myId = useState(() => Math.floor(Math.random()*90000)+10000)[0];

  const doSignUp = () => {
    if (!name ||!pass) return alert("نام اور پاسورڈ لکھیں");
    if (localStorage.getItem(`user_${name}`)) return alert("یہ نام پہلے سے بنا ہوا ہے!");
    localStorage.setItem(`user_${name}`, pass);
    localStorage.setItem("laachi_user", JSON.stringify({ name }));
    setUser({ name });
  };
  const doLogin = () => {
    if (!name ||!pass) return alert("نام اور پاسورڈ لکھیں");
    const savedPass = localStorage.getItem(`user_${name}`);
    if (!savedPass) return alert("یہ نام موجود نہیں ہے!");
    if (savedPass!== pass) return alert("پاسورڈ غلط ہے!");
    localStorage.setItem("laachi_user", JSON.stringify({ name }));
    setUser({ name });
  };
  const googleLogin = () => {
    const gName = "Google User";
    localStorage.setItem("laachi_user", JSON.stringify({ name: gName }));
    setUser({ name: gName });
  };
  const logout = () => {
    localStorage.removeItem("laachi_user");
    setUser(null); setSelected(null); setTab("home");
  };

  if (selected) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20 }}>
        <button onClick={() => setSelected(null)} style={{ background: "#ff1493", color: "#fff", padding: "8px 18px", borderRadius: 20, border: "none" }}>← Back</button>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div style={{ width: 90, height: 90, background: selected.color, borderRadius: 45, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 45 }}>{selected.id}</div>
          <h2>{selected.name} LIVE</h2>
          <p style={{ color: "#aaa" }}>{selected.viewers} watching • {user?.name}</p>
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
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Apna naam likhein" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #333", background: "#1e1e1e", color: "#fff", boxSizing: "border-box", marginBottom: 10 }} />
            <div style={{ position: "relative", marginBottom: 15 }}>
              <input value={pass} onChange={e => setPass(e.target.value)} type={showPass? "text" : "password"} placeholder="Password" style={{ width: "100%", padding: "12px 40px 12px 12px", borderRadius: 10, border: "1px solid #333", background: "#1e1e1e", color: "#fff", boxSizing: "border-box" }} />
              <span onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: 11, cursor: "pointer" }}>{showPass? "🙈" : "👁️"}</span>
            </div>
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
      <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", borderBottom: "1px solid #111", position: "sticky", top: 0, background: "#000" }}>
        <h2 style={{ margin: 0 }}><span style={{ color: "#ff1493" }}>Laachi</span>Live</h2>
        <span style={{ background: "#1a1a1a", padding: "6px 12px", borderRadius: 15, fontSize: 12 }}>👤 {user.name}</span>
      </div>
      {tab === "home" && (
        <div style={{ padding: 15 }}>
          <h3>🔥 Live Rooms</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {rooms.map(r => (<div key={r.id} onClick={() => setSelected(r)} style={{ background: "#111", borderRadius: 15, overflow: "hidden", border: "1px solid #222" }}><div style={{ background: r.color, height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{r.id}</div><div style={{ padding: 10 }}><b>{r.name}</b><div style={{ fontSize: 11, color: "#aaa" }}>{r.cat} • {r.viewers}</div></div></div>))}
          </div>
        </div>
      )}
      {tab === "profile" && (
        <div>
          <div style={{ background: "linear-gradient(135deg, #ff1493, #8a2be2)", padding: 25 }}>
            <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
              <div style={{ width: 75, height: 75, background: "#fff", borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "#000" }}>{user.name[0]?.toUpperCase()}</div>
              <div><h2 style={{ margin: 0, color: "#fff" }}>{user.name}</h2><div style={{ color: "#fff", fontSize: 12 }}>ID: 10{myId}</div></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: 18, background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "10px 0" }}>
              <div style={{ textAlign: "center" }}><b>1.2k</b><div style={{ fontSize: 11 }}>Fans</div></div>
              <div style={{ textAlign: "center" }}><b>342</b><div style={{ fontSize: 11 }}>Following</div></div>
              <div style={{ textAlign: "center" }}><b>89</b><div style={{ fontSize: 11 }}>Friends</div></div>
            </div>
          </div>
          <div style={{ margin: 15, background: "#111", borderRadius: 15, padding: 15, border: "1px solid #222", display: "flex", justifyContent: "space-between" }}>
            <div><div style={{ fontSize: 12, color: "#888" }}>🪙 My Coins</div><div style={{ fontSize: 20, fontWeight: "bold", color: "gold" }}>1,250</div></div>
            <button style={{ background: "#ff1493", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 20 }}>Recharge</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, margin: 15 }}>
            {[{icon:"🏪",name:"Store"},{icon:"🎁",name:"Gifts"},{icon:"🏆",name:"Level"},{icon:"💎",name:"Badge"},{icon:"🎯",name:"Tasks"},{icon:"👨‍👩‍👧",name:"Family"},{icon:"🔒",name:"Privacy"},{icon:"⚙️",name:"Settings"}].map(f=>(
              <div key={f.name} style={{ background: "#111", borderRadius: 12, padding: 14, textAlign: "center" }}><div style={{ fontSize: 22 }}>{f.icon}</div><div style={{ fontSize: 11, marginTop: 5 }}>{f.name}</div></div>
            ))}
          </div>
          <button onClick={logout} style={{ width: "90%", margin: "20px 5%", background: "#222", color: "#ff4d4d", border: "1px solid #333", padding: 13, borderRadius: 12 }}>Logout</button>
        </div>
      )}
      {tab!== "home" && tab!== "profile" && <div style={{ padding: 30, textAlign: "center" }}>Coming Soon</div>}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a0a0a", borderTop: "1px solid #222", display: "flex", justifyContent: "space-around", padding: "8px 0" }}>
        <button onClick={() => setTab("home")} style={{ background: "none", border: "none", color: tab === "home"? "#ff1493" : "#666" }}>🏠<br/>Home</button>
        <button onClick={() => setTab("live")} style={{ background: "none", border: "none", color: tab === "live"? "#ff1493" : "#666" }}>📹<br/>Live</button>
        <button onClick={() => setTab("message")} style={{ background: "none", border: "none", color: tab === "message"? "#ff1493" : "#666" }}>💬<br/>Msg</button>
        <button onClick={() => setTab("profile")} style={{ background: "none", border: "none", color: tab === "profile"? "#ff1493" : "#666" }}>👤<br/>Profile</button>
      </div>
    </div>
  );
}
