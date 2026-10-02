import { Room } from "../../types";
export default function RoomCard({room, onJoin}:{room:Room, onJoin:()=>void}){
  return (
    <div onClick={onJoin} style={{background:"#12121a", borderRadius:16, padding:14, marginBottom:12, border:"1px solid #222", cursor:"pointer"}}>
      <div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontSize:10, background:"#ff149322", color:"#ff5bbd", padding:"2px 8px", borderRadius:10}}>{room.type}</span><span style={{fontSize:11, color:"#ff5bbd"}}>📍 {room.city} · 👥 {room.usersCount}</span></div>
      <p style={{fontWeight:"bold", margin:"8px 0 4px", fontSize:14, color:"#fff"}}>{room.title}</p>
      <div style={{display:"flex", alignItems:"center", gap:8}}><div style={{width:30, height:30, borderRadius:15, background:"linear-gradient(135deg,#ff1493,#8a2be2)", display:"flex", alignItems:"center", justifyContent:"center"}}>{room.host.avatar}</div><div><p style={{fontSize:12, color:"#fff"}}>{room.host.name} {room.host.verified&&"✔️"}</p><p style={{fontSize:10, color:"#777"}}>Lv.{room.host.level} · {room.host.bio}</p></div></div>
    </div>
  )
}
