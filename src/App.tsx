import { useState } from "react";
import RoomPage from "./components/Room/RoomPage";

type Room = { id: string; name: string; host: string; count: number };

export default function App() {
  const [view, setView] = useState<"home" | "room" | "profile">("home");
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [userName, setUserName] = useState("User");
  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "Laachi Room 1", host: "Laachi", count: 5 },
    { id: "2", name: "Late Night Talk", host: "Billa", count: 12 },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginName, setLoginName] = useState("");

  const handleCreateRoom = () => {
    const newRoom = { id: Date.now().toString(), name: `Laachi Room ${rooms.length + 1}`, host: userName, count: 1 };
    setRooms([newRoom,...rooms]);
    setCurrentRoom(newRoom);
    setView("room");
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#1a1a1a", borderRadius: "24px", padding: "24px", width: "100%", maxWidth: "360px", border: "1px solid #333" }}>
          <img src="/logo.png" onError={(e:any)=>e.target.style.display='none'} style={{ width: "80px", margin: "0 auto 15px", display: "block" }} />
          <h1 style={{ color: "white", fontSize: "22px", fontWeight: 700, textAlign: "center" }}>Welcome to LaachiLive</h1>
          <input value={loginName} onChange={e=>setLoginName(e.target.value)} placeholder="Apna naam likho" style={{ width: "100%", marginTop: "20px", height: "48px", borderRadius: "28px", background: "#2b2b2b", border: "1px solid #444", color: "white", padding: "0 20px", outline: "none" }} />
          <button onClick={()=>{ if(loginName.trim()){ setUserName(loginName); setIsLoggedIn(true);} }} style={{ width: "100%", marginTop: "15px", height: "48px", borderRadius: "28px", background: "linear-gradient(90deg,#ff9a00,#ff6a00)", border: "none", color: "black", fontWeight: 700 }}>Enter Karo Janam</button>
        </div>
      </div>
    );
  }

  if (view === "room" && currentRoom) {
    return <RoomPage room={currentRoom} userName={userName} onBack={()=>setView("home")} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "white", paddingBottom: "80px" }}>
      {/* Header */}
      <div style={{ padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" onError={(e:any)=>e.target.style.display='none'} style={{ width: "32px", height: "32px", borderRadius: "8px" }} />
          <span style={{ fontWeight: 800, fontSize: "18px" }}>LaachiLive</span>
        </div>
        <span style={{ fontSize: "13px", color: "#aaa" }}>{userName}</span>
      </div>

      {/* Rooms */}
      <div style={{ padding: "15px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Live Rooms</h2>
          <button onClick={handleCreateRoom} style={{ background: "linear-gradient(90deg,#ff9a00,#ff6a00)", border: "none", borderRadius: "20px", padding: "8px 16px", fontWeight: 700, color: "black" }}>+ Create Room</button>
        </div>

        {rooms.map(r => (
          <div key={r.id} onClick={()=>{ setCurrentRoom(r); setView("room"); }} style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: "16px", padding: "14px", marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 600 }}>{r.name}</div>
              <div style={{ fontSize: "12px", color: "#ff9a00" }}>{r.count} 🔥</div>
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>Host: {r.host}</div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "65px", background: "#1a1a1a", borderTop: "1px solid #333", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <button onClick={()=>setView("home")} style={{ background: "none", border: "none", color: view==="home"?"#ff9a00":"#888" }}>🏠<br/><span style={{fontSize:"10px"}}>Home</span></button>
        <button onClick={handleCreateRoom} style={{ background: "linear-gradient(90deg,#ff9a00,#ff6a00)", border: "none", width: "50px", height: "50px", borderRadius: "50%", fontSize: "24px" }}>+</button>
        <button onClick={()=>setView("profile")} style={{ background: "none", border: "none", color: view==="profile"?"#ff9a00":"#888" }}>👤<br/><span style={{fontSize:"10px"}}>Profile</span></button>
      </div>

      {view==="profile" && (
        <div style={{ position: "fixed", inset: 0, background: "#0d0d0d", padding: "20px", zIndex: 10 }}>
          <button onClick={()=>setView("home")} style={{ background: "#2b2b2b", border: "1px solid #444", color: "white", padding: "8px 16px", borderRadius: "20px" }}>← Back</button>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#ff9a00", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>{userName[0]}</div>
            <h2 style={{ marginTop: "15px", fontSize: "20px" }}>{userName}</h2>
            <p style={{ color: "#888" }}>LaachiLive User</p>
          </div>
        </div>
      )}
    </div>
  );
}
