import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqzckg_BKLkkQ5U4NnWxfFoGha7E",
  authDomain: "chill-masti-live-make-friends.firebaseapp.com",
  projectId: "chill-masti-live-make-friends",
  storageBucket: "chill-masti-live-make-friends.firebasestorage.app",
  messagingSenderId: "587111249525",
  appId: "1:587111249525:web:56680e881749424f42ea3c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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

  useEffect(() => {
    getRedirectResult(auth).catch(()=>{});
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const u = { name: fbUser.displayName || "Google User", photo: fbUser.photoURL };
        localStorage.setItem("laachi_user", JSON.stringify(u));
        setUser(u);
      }
    });
    return () => unsub();
  }, []);

  const doSignUp = () => {
    if (!name ||!pass) return alert("نام اور پاسورڈ لکھیں");
    if (localStorage.getItem(`user_${name}`)) return alert("یہ نام پہلے سے بنا ہوا ہے! Sign In کریں");
    localStorage.setItem(`user_${name}`, pass);
    localStorage.setItem("laachi_user", JSON.stringify({ name }));
    setUser({ name });
  };

  const doLogin = () => {
    if (!name ||!pass) return alert("نام اور پاسورڈ لکھیں");
    const savedPass = localStorage.getItem(`user_${name}`);
    if (!savedPass) return alert("یہ نام موجود نہیں ہے! پہلے Sign Up کریں");
    if (savedPass!== pass) return alert("نام یا پاسورڈ غلط ہے!");
    localStorage.setItem("laachi_user", JSON.stringify({ name }));
    setUser({ name });
  };

  const googleLogin = () => signInWithRedirect(auth, provider);

  const logout = () => {
    fbSignOut(auth);
    localStorage.removeItem("laachi_user");
    setUser(null);
    setSelected(null);
    setTab("home");
  };

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
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "sans-serif", padding: 20 }}>
        <h1 style={{ marginTop: 10, fontSize: 32, fontWeight: 900 }}><span style={{ color: "#ff1493", textShadow: "0 0 15px #ff1493" }}>Laachi</span><span style={{ color: "#fff" }}>Live</span></h1>
        <div style={{ width: 150, height: 150, marginTop: 15, borderRadius: 75, background: "radial-gradient(circle, #ff1493 0%, #8a2be2 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 65, boxShadow: "0 0 30px #ff149399", border: "3px solid #ff1493" }}>👩‍🦰</div>
        <p style={{ color: "#ff8cb5", marginTop: 12, fontSize: 11, letterSpacing: 3 }}>WELCOME TO LAACHI LIVE</p>
        <div style={{ width: "100%", maxWidth: 340, marginTop: 18 }}>
          <div style={{ background: "#111", borderRadius: 18, padding: 20, border: "1px solid #222" }}>
            <h3 style={{ margin: "0 0 15px 0", textAlign: "center" }}>Login / Signup</h3>
            <label style={{ fontSize: 11, color: "#888" }}>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Apna naam likhein" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #333", marginTop: 5, marginBottom: 10, background: "#1e1e1e", color: "#fff", boxSizing: "border-box" }} />
            <label style={{ fontSize: 11, color: "#888" }}>Password</label>
            <div style={{ position: "relative", marginTop: 5, marginBottom: 15 }}>
              <input value={pass} onChange={e => setPass(e.target.value)} type={showPass? "text" : "password"} placeholder="Password likhein" style={{ width: "100%", padding: "12px 40px 12px 12px", borderRadius: 10, border: "1px solid #333", background: "#1e1e1e", color: "#fff", boxSizing: "border-box" }} />
              <span onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: 11, cursor: "pointer", fontSize: 16 }}>{showPass? "🙈" : "👁️"}</span>
            </div>
            <button onClick={doLogin} style={{ width: "100%", background: "#ff1493", color: "#fff", border: "none", padding: 12, borderRadius: 25, fontWeight: "bold", fontSize: 15 }}>Sign In - لاگ ان</button>
            <button onClick={doSignUp} style={{ width: "100%", marginTop: 10, background: "#222", color: "#fff", border: "1px solid #333", padding: 12, borderRadius: 25, fontWeight: "bold", fontSize: 14 }}>New Account - نیا اکاؤنٹ بنائیں</button>
            <div style={{ display: "flex", alignItems: "center", margin: "15px 0", gap: 10 }}><div style={{ flex: 1, height: 1, background: "#222" }}></div><span style={{ fontSize: 11, color: "#555" }}>OR</span><div style={{ flex: 1, height: 1, background: "#222" }}></div></div>
            <button onClick={googleLogin} style={{ width: "100%", background: "#fff", color: "#000", border: "none", padding: 11, borderRadius: 25, fontWeight: "bold", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span>G</span> Continue with Google (Real)</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: 70 }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", alignItems: "center", borderBottom: "1px solid #111", position: "sticky", top: 0, background: "#000", zIndex: 10 }}>
        <h2 style={{ margin: 0 }}><span style={{ color: "#ff1493" }}>Laachi</span>Live</h2>
        <span style={{ background: "#1a1a1a", padding: "6px 12px", borderRadius: 15, fontSize: 12, border: "1px solid #333" }}>👤 {user.name} • 🪙 1000</span>
      </div>

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
      {tab === "live" && <div style={{ padding: 30, textAlign: "center" }}><h2>Go Live</h2><p style={{ color: "#888", fontSize: 13 }}>Agora baad me lagayenge</p></div>}
      {tab === "message" && <div style={{ padding: 20 }}><h3>💬 Messages</h3><p style={{ color: "#666", fontSize: 12 }}>No messages yet</p></div>}

      {tab === "profile" && (
        <div style={{ padding: 0 }}>
          <div style={{ background: "linear-gradient(135deg, #ff1493, #8a2be2)", padding: "25px 20px 20px 20px" }}>
            <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
              <div style={{ width: 75, height: 75, background: "#fff", borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: "3px solid gold" }}>{user.name[0]?.toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, color: "#fff", fontSize: 18 }}>{user.name} <span style={{ background: "gold", color: "#000", fontSize: 10, padding: "2px 6px", borderRadius: 10, marginLeft: 5 }}>LV 5</span></h2>
                <div style={{ fontSize: 12, color: "#fff", opacity: 0.9, marginTop: 3 }}>ID: 10{myId}</div>
                <div style={{ fontSize: 11, color: "#ffd6e8", marginTop: 4 }}>Bio: Chill & Masti lover from Lahore ❤️</div>
              </div>
              <button style={{ background: "#fff", color: "#ff1493", border: "none", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>Edit</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: 18, background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "10px 0" }}>
              <div style={{ textAlign: "center" }}><div style={{ fontWeight: "bold", color: "#fff" }}>1.2k</div><div style={{ fontSize: 11, color: "#eee" }}>Fans</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontWeight: "bold", color: "#fff" }}>342</div><div style={{ fontSize: 11, color: "#eee" }}>Following</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontWeight: "bold", color: "#fff" }}>89</div><div style={{ fontSize: 11, color: "#eee" }}>Friends</div></div>
            </div>
          </div>

          <div style={{ margin: "15px", background: "#111", borderRadius: 15, padding: 15, border: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 12, color: "#888" }}>🪙 My Coins</div><div style={{ fontSize: 20, fontWeight: "bold", color: "gold", marginTop: 2 }}>1,250</div></div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ background: "#ff1493", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>Recharge</button>
              <button style={{ background: "#222", color: "#fff", border: "1px solid #333", padding: "8px 16px", borderRadius: 20, fontSize: 12 }}>Withdraw</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "0 15px" }}>
            <div style={{ background: "linear-gradient(135deg, #ffd700, #ffb700)", borderRadius: 12, padding: 12, color: "#000" }}>
              <div style={{ fontSize: 14, fontWeight: "bold" }}>👑 VIP</div><div style={{ fontSize: 11, marginTop: 2 }}>Special badge & entry</div><div style={{ fontSize: 11, fontWeight: "bold", marginTop: 6, background: "#000", color: "gold", display: "inline-block", padding: "2px 8px", borderRadius: 10 }}>Buy VIP</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #8a2be2, #4b0082)", borderRadius: 12, padding: 12, color: "#fff" }}>
              <div style={{ fontSize: 14, fontWeight: "bold" }}>💎 SVIP</div><div style={{ fontSize: 11, marginTop: 2 }}>All
