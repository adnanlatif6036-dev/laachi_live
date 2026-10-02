export default function CreateRoomModal({show, setShow, title, setTitle, type, setType, city, setCity, onCreate}:any){
  if(!show) return null;
  return (
    <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:20}}>
      <div style={{background:"#1a1a1a", borderRadius:16, padding:20, width:"100%", maxWidth:350}}>
        <h3 style={{margin:"0 0 12px", color:"#fff"}}>Create Room</h3>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Room Title" style={{width:"100%", padding:10, background:"#222", border:"1px solid #333", color:"#fff", borderRadius:10, marginBottom:10}}/>
        <select value={type} onChange={e=>setType(e.target.value)} style={{width:"100%", padding:10, background:"#222", color:"#fff", borderRadius:10, marginBottom:10}}><option>Chit Chat</option><option>Dating</option><option>Music</option></select>
        <select value={city} onChange={e=>setCity(e.target.value)} style={{width:"100%", padding:10, background:"#222", color:"#fff", borderRadius:10, marginBottom:14}}><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Gujranwala</option></select>
        <div style={{display:"flex", gap:10}}><button onClick={()=>setShow(false)} style={{flex:1, padding:10, background:"#333", border:0, color:"#fff", borderRadius:10}}>Cancel</button><button onClick={onCreate} style={{flex:1, padding:10, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, color:"#fff", borderRadius:10}}>Create</button></div>
      </div>
    </div>
  )
          }
