export default function RoomCard({room, onJoin}:any){
  const mics = room.mics || room.avatars || []
  return (
    <div onClick={onJoin} style={{background:"#1a1a1a", borderRadius:16, padding:12, marginBottom:12, border:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <div>
        <div style={{fontWeight:"bold", fontSize:14, color:"#fff"}}>{room.title || "Laachi Room"}</div>
        <div style={{fontSize:11, color:"#aaa"}}>{room.city || room.topic || "Live"} • 👥 {room.usersCount || 1} Online</div>
        <div style={{marginTop:6, display:"flex", gap:4}}>
          {(mics.length ? mics : [1,2,3]).slice(0,4).map((m:any,i:number)=>
            <div key={i} style={{width:28, height:28, borderRadius:14, background:"#333", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#fff"}}>
              {typeof m === 'object' ? (m.avatar || "🎙️") : "🎙️"}
            </div>
          )}
        </div>
      </div>
      <div style={{background:"linear-gradient(90deg,#ff1493,#8a2be2)", padding:"6px 12px", borderRadius:20, fontSize:12, color:"#fff"}}>Join 🔒</div>
    </div>
  )
}
