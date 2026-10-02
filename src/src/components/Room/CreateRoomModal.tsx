export default function CreateRoomModal({show, setShow, title, setTitle, type, setType, city, setCity, onCreate}:any){
  if(!show) return null;
  return (
    <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:99}}>
      <div style={{background:"#1a1a1f", borderRadius:16, padding:20, width:"90%", maxWidth:360}}>
        <h3 style={{marginBottom:12, color:"#fff"}}>Create Room - Locked File</h3>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Room title e.g. Lahore Girls Chit Chat" style={{width:"100%", background:"#222", border:"1px solid #333", borderRadius:10, padding:10, color:"#fff", marginBottom:10}}/>
        <select value={type} onChange={e=>setType(e.target.value)} style={{width:"100%", background:"#222", border:"1px solid #333", borderRadius:10, padding:10, color:"#fff", marginBottom:10}}><option>Chit Chat</option><option>Dating</option><option>Music</option><option>Games</option><option>Friends</option></select>
        <select value={city} onChange={e=>setCity(e.target.value)} style={{width:"100%", background:"#222", border:"1px solid #333", borderRadius:10, padding:10, color:"#fff", marginBottom:12}}><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Faisalabad</option><option>Multan</option><option>Gujranwala</option><option>Sialkot</option><option>Rawalpindi</option></select>
        <div style={{display:"flex", gap:8}}><button onClick={()=>setShow(false)} style={{flex:1, background:"#333", border:0, padding:10, borderRadius:10, color:"#fff"}}>Cancel</button><button onClick={onCreate} style={{flex:1, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, padding:10, borderRadius:10, color:"#fff"}}>Create</button></div>
      </div>
    </div>
  )
                                                                                                                                 }
