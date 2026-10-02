import { useState } from "react";
const rooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];
export default function App() {
  const [selected, setSelected] = useState<any>(null);
  if (selected) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20 }}>
        <button onClick={() => setSelected(null)} style={{ background: "#ff1493", color: "#fff", padding: "10px 20px", borderRadius: 20, border: "none" }}>← Back</button>
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <div style={{ width: 100, height: 100, background: selected.color, borderRadius: 50, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>{selected.id}</div>
          <h1>{selected.name} LIVE</h1>
          <p>{selected.viewers} watching</p>
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
      <h1 style={{ padding: 20, margin: 0 }}><span style={{ color: "#ff1493" }}>Laachi</span>Live</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, padding: 20 }}>
        {rooms.map(r => (
          <div key={r.id} onClick={() => setSelected(r)} style={{ background: "#111", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ background: r.color, height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>{r.id}</div>
            <div style={{ padding: 10 }}><b>{r.name}</b><div style={{ fontSize: 12, color: "#aaa" }}>{r.cat}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
