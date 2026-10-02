import { User } from "../../types";
export default function ProfilePage({user, setPage, setUser}: {user:User, setPage:any, setUser:any}){
  return (
    <div style={{padding:16, background:"#000", minHeight:"100vh", color:"#fff", paddingBottom:80}}>
      <div style={{textAlign:"center"}}>
        <div style={{width:80, height:80, borderRadius:40, background:"linear-gradient(135deg,#ff1493,#8a2be2)", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32}}>{user.avatar}</div>
        <h3 style={{marginTop:10}}>{user.name} ✔️</h3><p style={{fontSize:12, color:"#888"}}>ID: {user.id} · 📍 {user.city}</p><p style={{fontSize:12, color:"#888"}}>{user.bio}</p><p style={{fontSize:12, marginTop:8}}>Lv.{user.level} · 👥 {user.followers} Followers</p>
      </div>
      <div style={{marginTop:20}}>
        <button style={{width:"100%", background:"#1e1e22", border:"1px solid #333", padding:12, borderRadius:12, color:"#fff", marginBottom:10}}>✏️ Edit Profile (Name, Bio, DP, Gender, Age)</button>
        <button style={{width:"100%", background:"#1e1e22", border:"1px solid #333", padding:12, borderRadius:12, color:"#fff", marginBottom:10}}>🔒 My Rooms · Block List</button>
        <button onClick={()=>setPage("admin")} style={{width:"100%", background:"#1e1e22", border:"1px solid #333", padding:12, borderRadius:12, color:"#ff5bbd", marginBottom:10}}>⚙️ Admin Panel</button>
        <button onClick={()=>setUser(null)} style={{width:"100%", background:"#ff149322", border:"1px solid #ff1493", padding:12, borderRadius:12, color:"#ff5bbd"}}>Logout</button>
        <button onClick={()=>setPage("home")} style={{width:"100%", marginTop:12, background:"#333", border:0, padding:10, borderRadius:10, color:"#fff"}}>Back to Home</button>
      </div>
    </div>
  )
}
