import { useState } from "react";

const rooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);
  const [tab, setTab] = useState("home"); // home | live | message | profile
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("laachi_user");
    return s? JSON.parse(s) : null;
  });
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const doSignUp = () => {
    if (!name ||!pass) return alert("نام اور پاسورڈ لکھیں");
    localStorage.setItem("laachi_user", JSON.stringify({ name }));
    setUser({ name });
  };
  const logout = () => { localStorage.removeItem("laachi_user"); setUser(null); setSelected(null); setTab("home"); };

  if (selected) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20, fontFamily: "sans-serif" }}>
        <button onClick={() => setSelected(null)} style={{ background: "#ff1493", color: "#fff", padding: "8px 18px", borderRadius: 20, border: "none" }}>← Back</button>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div style={{ width: 90, height: 90, background: selected.color, borderRadius: 45, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 45 }}>{selected.id}</div>
          <h2>{selected.name} LIVE</h2>
          <p style={{ color: "#aaa" }}>{selected.viewers} watching • {user?.name}</p>
          <div style={{ marginTop: 25, background: "#111", padding: 20, borderRadius: 15, border: "1px solid #222" }}>
            <p>🎤 Voice Chat - Ready</p>
            <button style={{ marginTop: 15, background: "#ff1493", color: "#fff", padding: "12px 30px", borderRadius: 25, border: "none", fontWeight: "bold" }}>Join Voice (Coming Soon)</button>
            <p style={{fontSize:11, color:"#666", marginTop:10}}>Agora 10,000 mins free baad me jorein ge</p>
          </div>
        </div>
      </div>
    );
  }

  // LOGIN PAGE
  if (!user) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "sans-serif", padding: 20 }}>
        <h1 style={{ marginTop: 10, fontSize: 32, fontWeight: 900 }}>
          <span style={{ color: "#ff1493", textShadow: "0 0 15px #ff1493" }}>Laachi</span><span style={{ color: "#fff" }}>Live</span>
        </h1>
        <div style={{ width: 180, height: 180, marginTop: 10, borderRadius: 90, background: "radial-gradient(circle, #ff1493 0%, #8a2be2 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, boxShadow: "0 0 30px #ff149399", border: "3px solid #ff1493" }}>👩‍🦰</div>
        <p style={{ color: "#ff8cb5", marginTop: 12, fontSize: 12, letterSpacing: 2 }}>WELCOME TO LAACHI LIVE</p>
        <div style={{ width: "100%", maxWidth: 340, marginTop: 20 }}>
          <div style={{ background: "#111", borderRadius: 15, padding: 20, border: "1px solid #222" }}>
            <h3 style={{ margin: "0 0 15px 0", textAlign: "center" }}>Sign In / Sign Up</h3>
            <label style={{ fontSize: 12, color: "#888" }}>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Apna naam likhein" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #333", marginTop: 5, marginBottom: 10, background: "#1e1e1e", color: "#fff", boxSizing: "border-box" }} />
            <label style={{ fontSize: 12, color: "#888" }}>Password</label>
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password likhein" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #333", marginTop: 5, marginBottom: 15, background: "#1e1e1e", color: "#fff", boxSizing: "border-box" }} />
            <button onClick={doSignUp} style={{ width: "100%", background: "#ff1493", color: "#fff", border: "none", padding: 12, borderRadius: 25, fontWeight: "bold", fontSize: 16 }}>Continue</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: 70 }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", alignItems: "center", borderBottom: "1px solid #111", position: "sticky", top: 0, background: "#000", zIndex: 10 }}>
        <h2 style={{ margin: 0 }}><span style={{ color: "#ff1493" }}>Laachi</span>Live</h2>
        <span style={{ background: "#1a1a1a", padding: "6px 12px", borderRadius: 15, fontSize: 12, border: "1px solid #333" }}>👤 {user.name} • 🪙 1000</span>
      </div>

      {/* CONTENT */}
      {tab === "home" && (
        <div style={{ padding: 15 }}>
          <h3 style={{ margin: "5px 0 12px 0" }}>🔥 Live Rooms</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {rooms.map(r => (
              <div key={r.id} onClick={() => setSelected(r)} style={{ background: "#111", borderRadius: 15, overflow: "hidden", border: "1px solid #222" }}>
                <div style={{ background: r.color, height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{r.id}</div>
                <div style={{ padding: 10 }}><b style={{ fontSize: 13 }}>{r.name}</b><div style={{ fontSize: 11, color: "#aaa" }}>{r.cat} • {r.viewers}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "live" && (
        <div style={{ padding: 30, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, background: "#ff1493", borderRadius: 40, margin: "20px auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>📹</div>
          <h2>Go Live</h2>
          <p style={{ color: "#888", fontSize: 13 }}>Yahan se aap apna Live Room start karenge. Agora connect karne ke baad ye chalu hoga.</p>
          <button style={{ marginTop: 15, background: "#ff1493", padding: "12px 30px", borderRadius: 25, border: "none", color: "#fff", fontWeight: "bold" }}>Start Live (Soon)</button>
        </div>
      )}

      {tab === "message" && (
        <div style={{ padding: 20 }}>
          <h3>💬 Messages</h3>
          <div style={{ background: "#111", padding: 15, borderRadius: 12, marginTop: 10, border: "1px solid #222" }}>
            <p style={{ margin: 0, fontSize: 13 }}>No messages yet</p><p style={{ margin: "5px 0 0 0", fontSize: 11, color: "#666" }}>Jab koi aap ko gift bhejega to yahan ayega</p>
          </div>
        </div>
      )}

      {tab === "profile" && (
        <div style={{ padding: 20, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, background: "#ff1493", borderRadius: 40, margin: "10px auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{user.name[0]?.toUpperCase()}</div>
          <h2 style={{ margin: "10px 0 5px 0" }}>{user.name}</h2>
          <p style={{ color: "#aaa", fontSize: 13, margin: 0 }}>ID: {user.name}_123 • Level 1</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 20 }}>
            <div style={{ background: "#111", padding: 12, borderRadius: 12, border: "1px solid #222" }}><div style={{ color: "#ff1493", fontWeight: "bold" }}>1000</div><div style={{ fontSize: 11, color: "#888" }}>Coins</div></div>
            <div style={{ background: "#111", padding: 12, borderRadius: 12, border: "1px solid #222" }}><div style={{ color: "#ff1493", fontWeight: "bold" }}>0</div><div style={{ fontSize: 11, color: "#888" }}>Followers</div></div>
            <div style={{ background: "#111", padding: 12, borderRadius: 12, border: "1px solid #222" }}><div style={{ color: "#ff1493", fontWeight: "bold" }}>0</div><div style={{ fontSize: 11, color: "#888" }}>Following</div></div>
          </div>
          <button onClick={logout} style={{ width: "100%", marginTop: 25, background: "#222", color: "#fff", border: "1px solid #333", padding: 12, borderRadius: 12 }}>Logout</button>
        </div>
      )}

      {/* BOTTOM 4 BUTTONS - FIXED */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a0a0a", borderTop: "1px solid #222", display: "flex", justifyContent: "space-around", padding: "8px 0 12px 0" }}>
        <button onClick={() => setTab("home")} style={{ background: "none", border: "none", color: tab === "home"? "#ff1493" : "#666", display: "flex", flexDirection: "column", alignItems: "center", fontSize: 11 }}>
          <span style={{ fontSize: 22 }}>🏠</span>Home
        </button>
        <button onClick={() => setTab("live")} style={{ background: "none", border: "none", color: tab === "live"? "#ff1493" : "#666", display: "flex", flexDirection: "column", alignItems: "center", fontSize: 11 }}>
          <span style={{ fontSize: 22 }}>📹</span>Live
        </button>
        <button onClick={() => setTab("message")} style={{ background: "none", border: "none", color: tab === "message"? "#ff1493" : "#666", display: "flex", flexDirection: "column", alignItems: "center", fontSize: 11 }}>
          <span style={{ fontSize: 22 }}>💬</span>Message
        </button>
        <button onClick={() => setTab("profile")} style={{ background: "none", border: "none", color: tab === "profile"? "#ff1493" : "#666", display: "flex", flexDirection: "column", alignItems: "center", fontSize: 11 }}>
          <span style={{ fontSize: 22 }}>👤</span>Profile
        </button>
      </div>
    </div>
  );
}
