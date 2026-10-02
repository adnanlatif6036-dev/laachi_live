export default function WalletPage({coins, onBack}:any){
  return (
    <div style={{minHeight:"100vh", background:"#000", color:"#fff", padding:16}}>
      <button onClick={onBack} style={{background:"#222", color:"#fff", border:0, padding:"8px 12px", borderRadius:10, marginBottom:16}}>← Back</button>
      <h2 style={{color:"#ff1493"}}>💰 Wallet</h2>
      <div style={{background:"#1a1a1a", padding:20, borderRadius:16, textAlign:"center", marginTop:20, border:"1px solid #333"}}>
        <div style={{fontSize:48, fontWeight:"bold", color:"#FFD700"}}>{coins}</div>
        <div style={{color:"#aaa"}}>Your Coins</div>
        <button onClick={()=>alert("JazzCash/Easypaisa Coming Soon!")} style={{marginTop:16, width:"100%", padding:12, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, color:"#fff", borderRadius:12, fontWeight:"bold"}}>Buy Coins</button>
      </div>
      <div style={{marginTop:20, fontSize:12, color:"#888"}}>1 Gift = 10 Coins | 1 Diamond = 100 Coins</div>
    </div>
  )
}
