import { useState, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'

const APP_ID = "aab8b8f5a0cd4464a0a38d9b7a6f5e4d" // Temporary Test ID - baad me apna dalenge
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })

export default function RoomPage({ room, onBack }: any){
  const [isMuted, setIsMuted] = useState(false)
  const [joined, setJoined] = useState(false)
  const [localTrack, setLocalTrack] = useState<any>(null)
  const [coins, setCoins] = useState(1250)
  const [chat, setChat] = useState([{user:"System", text:"🎤 Voice ready - Join mic!"}])
  const [msg, setMsg] = useState('')

  // Join voice on mount
  useEffect(()=>{
    const join = async()=>{
      try{
        await client.join(APP_ID, room?.title || "testRoom", null, null)
        const micTrack = await AgoraRTC.createMicrophoneAudioTrack()
        await client.publish([micTrack])
        setLocalTrack(micTrack)
        setJoined(true)
        setChat(c=>[...c, {user:"System", text:"✅ Mic Connected!"}])
      }catch(e){
        console.log(e)
        setChat(c=>[...c, {user:"System", text:"⚠️ Mic permission do - Voice test mode"}])
      }
    }
    join()
    return ()=>{
      localTrack?.close()
      client.leave()
    }
  },[])

  const toggleMute = ()=>{
    if(localTrack){
      localTrack.setEnabled(isMuted)
    }
    setIsMuted(!isMuted)
  }

  const sendMsg = ()=>{
    if(!msg) return
    setChat([...chat, {user:"You", text:msg}])
    setMsg('')
  }

  return(
    <div style={{minHeight:"100vh", background:"#000", color:"#fff", display:"flex", flexDirection:"column"}}>
      <div style={{padding:12, background:"#111", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #222"}}>
        <button onClick={onBack} style={{background:"#222", border:"1px solid #333", color:"#fff", padding:"8px 14px", borderRadius:20}}>←</button>
        <div style={{fontWeight:"bold"}}>🔴 {room?.title} {joined? "• Connected" : "• Connecting..."}</div>
        <div style={{background:"#222", padding:"6px 10px", borderRadius:20, fontSize:12}}>🪙 {coins}</div>
      </div>

      <div style={{flex:1, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, padding:20}}>
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} style={{textAlign:"center"}}>
            <div style={{width:"100%", aspectRatio:"1", borderRadius:"50%", background: i===0? (isMuted? "#333" : "#00ff88") : "#1a1a1a", border: i===0 &&!isMuted? "3px solid #00ff88" : "2px solid #333", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, boxShadow: i===0 &&!isMuted? "0 0 15px #00ff88" : "none"}}>{i===0? "😎" : "👤"}</div>
            <div style={{fontSize:12, marginTop:6}}>{i===0? "You" : `Seat ${i+1}`}</div>
            <div style={{fontSize:10, color: i===0? (isMuted? "red" : "#0f0") : "#555"}}>{i===0? (isMuted? "Muted" : "LIVE") : "Empty"}</div>
          </div>
        ))}
      </div>

      <div style={{height:100, overflowY:"auto", padding:"0 16px", display:"flex", flexDirection:"column", gap:4}}>
        {chat.map((c,i)=><div key={i} style={{fontSize:13}}><b style={{color:"#0ff"}}>{c.user}:</b> {c.text}</div>)}
      </div>

      <div style={{padding:12, background:"#111", borderTop:"1px solid #222"}}>
        <div style={{display:"flex", gap:8, marginBottom:8}}>
          <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Chat..." style={{flex:1, background:"#1a1a1a", border:"1px solid #333", borderRadius:20, padding:"10px 14px", color:"#fff"}}/>
          <button onClick={sendMsg} style={{background:"#00d2ff", border:0, borderRadius:20, padding:"0 16px"}}>Send</button>
        </div>
        <div style={{display:"flex", gap:8}}>
          <button onClick={toggleMute} style={{flex:1, padding:14, borderRadius:25, border:0, background: isMuted? "#333" : "#ff1493", color:"#fff", fontWeight:"bold"}}>{isMuted? "🔇 Unmute" : "🎤 Mute"}</button>
          <button onClick={()=>{setCoins(c=>c-50); setChat([...chat,{user:"You", text:"🎁 Sent Rose"}])}} style={{flex:1, padding:14, borderRadius:25, border:0, background:"linear-gradient(90deg,#ff1493,#ff6a00)", color:"#fff", fontWeight:"bold"}}>🎁 Gift</button>
        </div>
      </div>
    </div>
  )
}
