import { useState } from "react";

const rooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi • Live", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi • Live", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New • Live", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("laachi_user");
    return s ? JSON.parse(s) : null;
  });
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const doSignUp = () => {
    if (!name || !pass) return alert("نام اور پاسورڈ لکھیں");
    localStorage.setItem("laachi_user", JSON.stringify({ name }));
    localStorage.setItem(`user_${name}`, pass);
    setUser({ name });
  };

  const logout = () => {
    localStorage.removeItem("laachi_user");
    setUser(null);
    setSelected(null);
  };

  // ROOM PAGE
  if (selected) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20, fontFamily: "sans-serif" }}>
        <button onClick={() => setSelected(null)} style={{ background: "#ff1493", color: "#fff", padding: "8px 18px", borderRadius: 20, border: "none" }}>← Back</button>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div style={{ width: 90, height: 90, background: selected.color, borderRadius: 45, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 45 }}>{selected.id}</div>
          <h2 style={{ marginBottom: 5 }}>{selected.name} LIVE</h2>
          <p style={{ margin: 5, color: "#aaa" }}>{selected.viewers} watching • Welcome {user?.name}</p>
          <div style={{ marginTop: 25, background: "#111", padding: 20, borderRadius: 15, border: "1px solid #222" }}>
            <p style={{ margin: 0 }}>🎤 Voice Chat Connected</p>
            <button style={{ marginTop: 15, background: "#ff1493", color: "#fff", padding: "12px 30px", borderRadius: 25, border: "none", fontWeight: "bold" }}>Join Voice</button>
          </div>
        </div>
      </div>
    );
  }

  // IF NOT LOGGED IN - SHOW NEW FRONT PAGE LIKE PHOTO
  if (!user) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "sans-serif", padding: 20 }}>
        {/* Logo */}
        <h1 style={{ marginTop: 20, fontSize: 34, fontWeight: 900, letterSpacing: 1 }}>
          <span style={{ color: "#ff1493", textShadow: "0 0 15px #ff1493" }}>Laachi</span>
          <span style={{ color: "#fff" }}>Live</span>
        </h1>

        {/* Girl Image Placeholder - Neon Style */}
        <div style={{ 
          width: 220, height: 220, marginTop: 10,
          borderRadius: 110, 
          background: "radial-gradient(circle, #ff1493 0%, #8a2be2 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 90, boxShadow: "0 0 40px #ff149399",
          border: "3px solid #ff1493"
        }}>
          👩‍🦰
        </div>

        <p style={{ color: "#ff8cb5", marginTop: 15, fontSize: 13, letterSpacing: 2 }}>WELCOME TO LAACHI LIVE</p>

        {/* Form */}
        <div style={{ width: "100%", maxWidth: 340, marginTop: 25 }}>
          <div style={{ background: "#111", borderRadius: 15, padding: 20, border: "1px solid #222" }}>
            <h3 style={{ margin: "0 0 15px 0", textAlign: "center" }}>Sign In / Sign Up</h3>
            
            <label style={{ fontSize: 12, color: "#888" }}>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Apna naam likhein" 
              style={{ width: "100%", padding: 13, borderRadius: 10, border: "1px solid #333", marginTop: 5, marginBottom: 12, background: "#1e1e1e", color: "#fff", boxSizing: "border-box", outline: "none" }} />
            
            <label style={{ fontSize: 12, color: "#888" }}>Password</label>
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password likhein" 
              style={{ width: "100%", padding: 13, borderRadius: 10, border: "1px solid #333", marginTop: 5, marginBottom: 18, background: "#1e1e1e", color: "#fff", boxSizing: "border-box", outline: "none" }} />
            
            <button onClick={doSignUp} 
              style={{ width: "100%", background: "#ff1493", color: "#fff", border: "none", padding: 13, borderRadius: 25, fontWeight: "bold", fontSize: 16, boxShadow: "0 0 15px #ff149366" }}>
              Continue
            </button>

            <p style={{ textAlign: "center", fontSize: 11, color: "#666", marginTop: 15, lineHeight: 1.4 }}>
              Continue par click karke aap hamari Terms & Privacy se agree karte hain
            </p>
          </div>
        </div>
      </div>
    );
  }

  // IF LOGGED IN - SHOW ROOMS
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", alignItems: "center", borderBottom: "1px solid #111" }}>
        <h2 style={{ margin: 0 }}><span style={{ color: "#ff1493" }}>Laachi</span>Live</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ background: "#1a1a1a", padding: "6px 12px", borderRadius: 15, fontSize: 13, border: "1px solid #333" }}>👤 {user.name}</span>
          <button onClick={logout} style={{ background: "#222", color: "#fff", border: "1px solid #333", padding: "6px 10px", borderRadius: 15, fontSize: 12 }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: 15 }}>
        <h3 style={{ margin: "10px 0" }}>🔥 Live Rooms</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {rooms.map(r => (
            <div key={r.id} onClick={() => setSelected(r)} style={{ background: "#111", borderRadius: 15, overflow: "hidden", border: "1px solid #222" }}>
              <div style={{ background: r.color, height: 130, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{r.id}</div>
              <div style={{ padding: 10 }}><b style={{ fontSize: 14 }}>{r.name}</b><div style={{ fontSize: 11, color: "#aaa" }}>{r.cat} • {r.viewers}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
