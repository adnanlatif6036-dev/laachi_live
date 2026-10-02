import { useState } from "react";
const rooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];
export default function App() {
  const [selected, setSelected] = useState<any>(null);
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("laachi_user");
    return s ? JSON.parse(s) : null;
  });
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const handleSignUp = () => {
    if(!name || !pass){ alert("Naam aur Password likho"); return; }
    localStorage.setItem("laachi_user", JSON.stringify({name}));
    localStorage.setItem(`user_${name}`, pass);
    setUser({name}); setShowAuth(false); setName(""); setPass("");
  };
  const handleSignIn = () => {
    const saved = localStorage.getItem(`user_${name}`);
    if(saved === pass){
      localStorage.setItem("laachi_user", JSON.stringify({name}));
      setUser({name}); setShowAuth(false);
    } else { alert("Ghalat naam ya password"); }
  };
  const logout = () => { localStorage.removeItem("laachi_user"); setUser(null); };
  if (selected) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20 }}>
        <button onClick={() => setSelected(null)} style={{ background: "#ff1493", color: "#fff", padding: "10px 20px", borderRadius: 20, border: "none" }}>← Back</button>
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <div style={{ width: 100, height: 100, background: selected.color, borderRadius: 50, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>{selected.id}</div>
          <h1>{selected.name} LIVE</h1>
          <p>{selected.viewers} watching</p>
          {user ? <p style={{color:"#0f0"}}>Welcome {user.name}</p> : <p style={{color:"#ff0"}}>Guest - Sign In karo</p>}
          <div style={{ marginTop: 30, background: "#222", padding: 20, borderRadius: 15 }}>
            <p>🎤 Voice Chat Connected - Mic ON</p>
            <button style={{ marginTop: 15, background: "#ff1493", color: "#fff", padding: "12px 30px", borderRadius: 20, border: "none" }}>Join Voice</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: 20, alignItems: "center" }}>
        <h1 style={{ margin: 0 }}><span style={{ color: "#ff1493" }}>Laachi</span>Live</h1>
        {user ? (
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <span style={{background:"#222", padding:"8px 12px", borderRadius:20, fontSize:14}}>👤 {user.name}</span>
            <button onClick={logout} style={{background:"#444", color:"#fff", border:"none", padding:"8px 12px", borderRadius:20}}>Logout</button>
          </div>
        ) : (
          <button onClick={()=>setShowAuth(true)} style={{background:"#ff1493", color:"#fff", border:"none", padding:"10px 18px", borderRadius:20, fontWeight:"bold"}}>Sign In / Sign Up</button>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, padding: 20 }}>
        {rooms.map(r => (
          <div key={r.id} onClick={() => setSelected(r)} style={{ background: "#111", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ background: r.color, height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>{r.id}</div>
            <div style={{ padding: 10 }}><b>{r.name}</b><div style={{ fontSize: 12, color: "#aaa" }}>{r.cat}</div></div>
          </div>
        ))}
      </div>
      {showAuth && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#000d", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99 }}>
          <div style={{ background: "#1a1a1a", padding: 25, borderRadius: 20, width: "85%", maxWidth: 350 }}>
            <h2 style={{marginTop:0}}>{isSignUp ? "Sign Up - ID Banao" : "Sign In - Login"}</h2>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Naam likho" style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", marginBottom: 10, background:"#2a2a2a", color:"#fff", boxSizing:"border-box" }} />
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password likho" style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", marginBottom: 15, background:"#2a2a2a", color:"#fff", boxSizing:"border-box" }} />
            <button onClick={isSignUp ? handleSignUp : handleSignIn} style={{ width: "100%", background: "#ff1493", color: "#fff", border: "none", padding: 12, borderRadius: 10, fontWeight:"bold" }}>{isSignUp ? "Sign Up" : "Sign In"}</button>
            <p style={{textAlign:"center", marginTop:12}}><span onClick={()=>setIsSignUp(!isSignUp)} style={{color:"#ff1493", cursor:"pointer"}}>{isSignUp ? "ID hai? Sign In" : "Nai ID? Sign Up"}</span></p>
            <button onClick={()=>setShowAuth(false)} style={{ width: "100%", background: "#333", color: "#fff", border: "none", padding: 10, borderRadius: 10, marginTop:5 }}>Band karo</button>
          </div>
        </div>
      )}
    </div>
  );
}
