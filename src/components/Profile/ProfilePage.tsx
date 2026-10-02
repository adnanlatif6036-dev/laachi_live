export default function ProfilePage({onBack, coins}:any){
  return (
    <div style={{minHeight:"100vh", background:"#000", color:"#fff", padding:16}}>
      <button onClick={onBack} style={{background:"#222", color:"#fff", border:0, padding:"8px 12px", borderRadius:10, marginBottom:16}}>← Back</button>
      <div style={{textAlign:"center", marginTop:20}}>
        <div style={{width:80, height:80, borderRadius:40, background:"linear-gradient(90deg,#ff1493,#8a2be2)", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32}}>👤</div>
        <h3 style={{marginTop:12}}>Laachi User</h3>
        <p style={{color:"#aaa"}}>ID: 10001 • {coins} Coins</p>
        <div style={{marginTop:20, display:"flex", flexDirection:"column", gap:10}}>
          <button style={{padding:12, background:"#1a1a1a", border:"1px solid #333", color:"#fff", borderRadius:12}}>My Profile</button>
          <button style={{padding:12, background:"#1a1a1a", border:"1px solid #333", color:"#fff", borderRadius:12}}>Settings</button>
          <button onClick={()=>alert("Logout Soon")} style={{padding:12, background:"#331111", border:"1px solid #552222", color:"#ff6666", borderRadius:12}}>Logout</button>
        </div>
      </div>
    </div>
  )
          }
