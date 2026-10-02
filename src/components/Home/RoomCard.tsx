export default function RoomCard({room, onJoin}:any){
  return (
    <div onClick={onJoin} style={{background:"#1a1a1a", borderRadius:16, padding:12, marginBottom:12, border:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <div>
        <div style={{fontWeight:"bold", fontSize:14, color:"#fff"}}>{room.title}</div>
        <div style={{fontSize:11, color:"#aaa"}}>{room.city} • {room.type} • 👥 {room.usersCount}</div>
        <div style={{marginTop:6, display:"flex", gap:4}}>{room.mics.map((m:any,i:number)=><div key={i} style={{width:28, height:28, borderRadius:14, background:"#333", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#fff"}}>{m? m.avatar : "+"}</div>)}</div>
      </div>
      <div style={{background:"linear-gradient(90deg,#ff1493,#8a2be2)", padding:"6px 12px", borderRadius:20, fontSize:12, color:"#fff"}}>Join 🔒</div>
    </div>
  )
}
