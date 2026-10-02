import { User } from "../../types";
export default function WalletPage({user, setUser, setPage}: {user:User, setUser:any, setPage:any}){
  return (
    <div style={{padding:16, background:"#000", minHeight:"100vh", color:"#fff"}}>
      <h3>My Wallet 💰</h3>
      <div style={{background:"linear-gradient(135deg,#ff1493,#8a2be2)", borderRadius:16, padding:16, marginTop:12}}><p>Coins: {user.coins}</p><p>Diamonds: {user.diamonds} 💎</p><p style={{fontSize:11, marginTop:8}}>Daily Bonus Available</p></div>
      <button onClick={()=>setUser({...user, coins:user.coins+100})} style={{width:"100%", marginTop:12, background:"#222", border:"1px solid #333", padding:12, borderRadius:12, color:"#fff"}}>🎁 Claim Daily 100 Coins</button>
      <button onClick={()=>setPage("home")} style={{width:"100%", marginTop:10, background:"#333", border:0, padding:10, borderRadius:10, color:"#fff"}}>Back</button>
    </div>
  )
}
