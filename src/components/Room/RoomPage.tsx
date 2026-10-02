interface Props {
  room: any;
  onBack: () => void;
  userName?: string;
}

export default function RoomPage({ room, onBack, userName }: Props) {
  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "white", padding: "15px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ background: "#2b2b2b", border: "1px solid #555", color: "white", padding: "8px 16px", borderRadius: "20px" }}>← Back</button>
        <div style={{ fontSize: "14px", color: "#aaa" }}>User: {userName}</div>
      </div>

      <div style={{ marginTop: "20px", background: "#1a1a1a", borderRadius: "16px", padding: "16px", border: "1px solid #333" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 600 }}>{room?.name || "Laachi Room 1"}</h2>
        <p style={{ color: "#888", fontSize: "13px", marginTop: "4px" }}>ID: {room?.id}</p>
      </div>

      <div style={{ marginTop: "20px", width: "100%", height: "400px", background: "#111", borderRadius: "16px", border: "1px solid #333", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "50px" }}>🎤</div>
        <p style={{ color: "#888", marginTop: "10px" }}>Zego Room Yahan Connect Hoga</p>
        <p style={{ color: "#555", fontSize: "12px", marginTop: "5px" }}>Mic On karke baat karo janam!</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button style={{ flex: 1, height: "48px", borderRadius: "28px", background: "#2b2b2b", border: "1px solid #555", color: "white" }}>🎤 Mute</button>
        <button style={{ flex: 1, height: "48px", borderRadius: "28px", background: "linear-gradient(90deg,#ff3b3b,#ff0000)", border: "none", color: "white" }}>❌ Leave</button>
      </div>
    </div>
  );
}
