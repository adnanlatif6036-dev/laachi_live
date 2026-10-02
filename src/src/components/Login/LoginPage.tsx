export default function LoginPage({name, setName, pass, setPass, doLogin}:any){
  return (
    <div style={{background:"#0a0a0a", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24}}>
      <div style={{width:"100%", maxWidth:360}}>
        <div style={{textAlign:"center", marginBottom:28}}>
          <div style={{width:120, height:120, borderRadius:60, background:"linear-gradient(135deg,#ff2e9a,#8a2be2)", padding:4, margin:"0 auto"}}><div style={{width:"100%", height:"100%", background:"#0a0a0a", borderRadius:60, display:"flex", alignItems:"center", justifyContent:"center"}}><span style={{fontSize:54, fontWeight:900, background:"linear-gradient(135deg,#ff2e9a,#7b2bff)", WebkitBackgroundClip:"text", color:"transparent", fontStyle:"italic"}}>L</span></div></div>
          <h1 style={{color:"#fff", fontSize:26, fontWeight:600, margin:"16px 0 4px"}}>LaachiLive</h1><p style={{color:"#777", fontSize:12, letterSpacing:2}}>Connect · Talk · Live</p>
        </div>
        <p style={{color:"#aaa", fontSize:12, marginBottom:6}}>Name</p><div style={{display:"flex", background:"#1e1e22", borderRadius:14, padding:"12px 14px", marginBottom:14, border:"1px solid #333"}}><span>👤</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" style={{background:"transparent", border:0, color:"#fff", width:"100%", outline:"none", marginLeft:8}}/></div>
        <p style={{color:"#aaa", fontSize:12, marginBottom:6}}>Password</p><div style={{display:"flex", background:"#1e1e22", borderRadius:14, padding:"12px 14px", border:"1px solid #333"}}><span>🔒</span><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Enter your password" style={{background:"transparent", border:0, color:"#fff", width:"100%", outline:"none", marginLeft:8}}/><span>👁️</span></div>
        <button onClick={doLogin} style={{width:"100%", marginTop:22, background:"linear-gradient(90deg,#ff5bbd,#8a2be2)", border:0, padding:13, borderRadius:14, color:"#fff", fontWeight:"bold", fontSize:16}}>Login</button>
      </div>
    </div>
  )
}
