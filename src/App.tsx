import { useState } from "react";

interface Props { room: any; onBack: () => void; userName?: string; }

export default function RoomPage({ room, onBack, userName }: Props) {
  const [muted, setMuted] = useState(false);
  const [msgs, setMsgs] = useState([{ user: "Laachi", text: "Welcome janam ❤️" }, { user: "Billa", text: "Hello guys" }]);
  const [txt, setTxt] = useState("");

  const send = () => { if (!txt.trim()) return; setMsgs([...msgs, { user: userName || "You", text: txt }]); setTxt(""); };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "white", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e1e1e" }}>
        <button onClick={onBack} style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", color: "white", padding: "8px 14px", borderRadius: "20px" }}>← Leave</button>
        <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: "14px" }}>{room?.name}</div><div style={{ fontSize: "10px", color: "#888" }}>ID: {room?.id}</div></div>
        <div style={{ fontSize: "12px", color: "#ff9a00" }}>{room?.count} online</div>
      </div>

      <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ aspectRatio: "1", background: i === 0? "#ff9a00" : "#171717", border: "1px solid #262626", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: i === 0? "black" : "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center" }}>{i === 0? userName?.[0] : "🎤"}</div>
            <div style={{ fontSize: "9px", marginTop: "6px", color: i === 0? "black" : "#888" }}>{i === 0? "You" : `Seat ${i+1}`}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, background: "#121212", borderTop: "1px solid #1e1e1e", borderRadius: "24px 24px 0 0", padding: "14px", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
          {msgs.map((m, i) => (<div key={i} style={{ fontSize: "13px", marginBottom: "8px" }}><span style={{ color: "#ff9a00", fontWeight: 700 }}>{m.user}: </span><span style={{ color: "#ccc" }}>{m.text}</span></div>))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Message likho..." style={{ flex: 1, height: "44px", borderRadius: "12px", background: "#1e1e1e", border: "1px solid #2a2a2a", color: "white", padding: "0 14px", outline: "none" }} />
          <button onClick={send} style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#ff9a00", border: "none" }}>➤</button>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button onClick={() => setMuted(!muted)} style={{ flex: 1, height: "46px", borderRadius: "14px", background: muted? "#ff3b3b" : "#1e1e1e", border: "1px solid #2a2a2a", color: "white" }}>{muted? "🔇 Muted" : "🎤 Mic"}</button>
          <button onClick={onBack} style={{ flex: 1, height: "46px", borderRadius: "14px", background: "linear-gradient(90deg,#ff3b3b,#ff0000)", border: "none", color: "white", fontWeight: 700 }}>❌ Leave</button>
        </div>
      </div>
    </div>
  );
}
