import { useState } from "react";

const ROOMS_DATA = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
];

const GIFTS_DATA = [
  { i: "🌹", n: "Rose", p: 100 }, { i: "💍", n: "Ring", p: 1000 },
  { i: "👑", n: "Crown", p: 3000 }, { i: "🦁", n: "Lion", p: 10000 },
];

export default function App(){
  const [sel,setSel]=useState<any>(null);
  const [tab,setTab]=useState("home");
  const [rooms,setRooms]=useState<any[]>(()=>{ const s=localStorage.getItem("laachi_rooms_v2"); return s?JSON.parse(s):ROOMS_DATA; });
  const [user,setUser]=useState<any>(()=>{ const s=localStorage.getItem("laachi_user"); return s?JSON.parse(s):null });
  const [name,setName]=useState(""); const [pass,setPass]=useState("");
  const [showCreate,setShowCreate]=useState(false);
  const [newRoomName,setNewRoomName]=useState(""); const [newRoomCat,setNewRoomCat]=useState("Desi");
  const [roomType,setRoomType]=useState("Public"); const [roomPass,setRoomPass]=useState(""); const [welcomeMsg,setWelcomeMsg]=useState("");
  const [seats,setSeats]=useState<any[]>(()=>Array(8).fill(null));
  const [lockedSeats,setLockedSeats]=useState<number[]>([]);
  const [msg,setMsg]=useState(""); const [chats,setChats]=useState<string[]>(["Welcome to LaachiLive! 🎉"]);
  const [coins,setCoins]=useState(9000); const [showGift,setShowGift]=useState(false); const [bigGift,setBigGift]=useState<any>(null);
  const [myId]=useState(()=> Math.floor(Math.random()*90000+1000));
  const [selectedSeat,setSelectedSeat]=useState<number|null>(null); // kick ke liye

  const saveRooms=(nr:any[])=>{ setRooms(nr); localStorage.setItem("laachi_rooms_v2", JSON.stringify(nr)); };
  const handleCreate=()=>{
    if(!newRoomName) return alert("Room ka naam likho!");
    if(roomType==="Private" &&!roomPass) return alert("Private room ke liye password lagao!");
    const newR={id:""+Date.now(), name:newRoomName, cat:newRoomCat, type:roomType, pass:roomPass, welcome:welcomeMsg, color:"#ff1493", viewers:"0", owner:user.name};
    saveRooms([newR,...rooms]); setShowCreate(false); setNewRoomName(""); setRoomPass(""); setWelcomeMsg(""); alert("Room Ban Gaya! Host aap ho.");
  };
  const openRoom=(r:any)=>{ setSel(r); setSeats(Array(8).fill(null)); setChats([r.welcome || `Welcome to ${r.name} room!`]); };
  const doSignUp=()=>{ if(!name||!pass) return alert("Naam likho!"); localStorage.setItem("laachi_user_"+name, pass); localStorage.setItem("laachi_user", JSON.stringify({name})); setUser({name}); };
  const doLogin=()=>{ const s=localStorage.getItem("laachi_user_"+name); if(s!==pass) return alert("Password ghalat!"); localStorage.setItem("laachi_user", JSON.stringify({name})); setUser({name}); };
  const logout=()=>{ localStorage.removeItem("laachi_user"); setUser(null); setSel(null); };
  const sit=(idx:number)=>{ if(lockedSeats.includes(idx)) return alert("Seat Locked hai!"); if(seats[idx]) return; if(seats.some((s:any)=>s?.name===user?.name)) return alert("Aap pehle se seat par ho!"); const ns=[...seats]; ns[idx]={name:user.name, muted:false}; setSeats(ns); };
  const leave=(idx:number)=>{ const ns=[...seats]; ns[idx]=null; setSeats(ns); setSelectedSeat(null); };

  // --- KICK / MUTE / LOCK FEATURES ---
  const isHost = seats[0]?.name === user?.name || sel?.owner === user?.name;
  const kickUser=(idx:number)=>{ if(!isHost) return alert("Sirf Host kick kar sakta hai!"); if(confirm(`${seats[idx]?.name} ko kick karna hai?`)){ const ns=[...seats]; ns[idx]=null; setSeats(ns); setChats(c=>[...c, `${seats[idx]?.name} ko Host ne kick kiya`]); setSelectedSeat(null);} };
  const muteUser=(idx:number)=>{ if(!isHost) return; const ns=[...seats]; ns[idx].muted=!ns[idx].muted; setSeats(ns); };
  const lockSeat=(idx:number)=>{ if(!isHost) return; if(lockedSeats.includes(idx)){ setLockedSeats(lockedSeats.filter(i=>i!==idx)); } else { setLockedSeats([...lockedSeats, idx]); } };

  const sendChat=()=>{ if(!msg) return; setChats([...chats, `${user.name}: ${msg}`]); setMsg(""); };
  const sendGift=(g:any)=>{ setBigGift(g); setTimeout(()=>setBigGift(null),2000); };

  if(sel){
    return<div style={{background:"#1a0033",color:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      {bigGift&&<div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><div style={{fontSize:80}}>{bigGift.i}</div></div>}
      <div style={{display:"flex",justifyContent:"space-between",padding:12,background:"#000"}}><b>{sel.name} {isHost&&"(HOST)"}</b><button onClick={()=>setSel(null)} style={{background:"#ff1493",border:0,color:"#fff",padding:"6px 12px",borderRadius:20}}>✕ Leave</button></div>

      <div style={{padding:12,display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10}}>
        {seats.map((s:any,i:number)=>(
          <div key={i} onClick={()=>s && setSelectedSeat(i)} style={{background:lockedSeats.includes(i)?"#440000":s?"linear-gradient(135deg,#ff1493,#8a2be2)":"#222",height:90,borderRadius:14,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"1px solid #333",position:"relative"}}>
            <div style={{width:44,height:44,borderRadius:22,background:s?"#fff":"#333",display:"flex",alignItems:"center",justifyContent:"center"}}>{lockedSeats.includes(i)?"🔒":s?s.muted?"🔇":"👤":"🎤"}</div>
            <div style={{fontSize:11,marginTop:4}}>{lockedSeats.includes(i)?"Locked":s?s.name:`Seat ${i+1}`}</div>
            {!s&&!lockedSeats.includes(i)&&<button onClick={(e)=>{e.stopPropagation(); sit(i)}} style={{fontSize:10,background:"#ff1493",color:"#fff",border:0,padding:"2px 8px",borderRadius:10,marginTop:3}}>Join</button>}
            {i===0&&<span style={{position:"absolute",top:3,left:5,fontSize:8,background:"gold",color:"#000",padding:"1px 5px",borderRadius:10}}>HOST</span>}
          </div>
        ))}
      </div>

      {/* KICK / MUTE POPUP */}
      {selectedSeat!==null && seats[selectedSeat!] && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:150,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"#111",padding:20,borderRadius:14,width:280,border:"1px solid #333",textAlign:"center"}}>
            <h4 style={{marginTop:0}}>{seats[selectedSeat!].name}</h4>
            <p style={{fontSize:12,color:"#aaa"}}>Seat {selectedSeat!+1}</p>
            {isHost? (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <button onClick={()=>muteUser(selectedSeat!)} style={{background:"#8a2be2",border:0,color:"#fff",padding:"10px",borderRadius:10}}>{seats[selectedSeat!].muted?"🔊 Unmute":"🔇 Mute"}</button>
                <button onClick={()=>lockSeat(selectedSeat!)} style={{background:"#444",border:0,color:"#fff",padding:"10px",borderRadius:10}}>🔒 Lock/Unlock Seat</button>
                <button onClick={()=>kickUser(selectedSeat!)} style={{background:"#ff0000",border:0,color:"#fff",padding:"10px",borderRadius:10}}>🚫 Kick Out</button>
                <button onClick={()=>setSelectedSeat(null)} style={{background:"#222",border:0,color:"#fff",padding:"10px",borderRadius:10}}>Cancel</button>
              </div>
            ) : (
              <div><p style={{fontSize:12}}>Host only can kick/mute</p><button onClick={()=>setSelectedSeat(null)} style={{background:"#333",border:0,color:"#fff",padding:"8px 16px",borderRadius:20}}>Close</button>{seats[selectedSeat!].name===user.name&&<button onClick={()=>leave(selectedSeat!)} style={{marginLeft:8,background:"#ff1493",border:0,color:"#fff",padding:"8px 16px",borderRadius:20}}>Leave Seat</button>}</div>
            )}
          </div>
        </div>
      )}

      <div style={{flex:1,padding:10,fontSize:12,overflowY:"auto",maxHeight:140}}>{chats.map((c,i)=><div key={i}>{c}</div>)}</div>
      <div style={{display:"flex",gap:6,padding:10,background:"#000"}}><button onClick={()=>setShowGift(!showGift)} style={{background:"#ff1493",border:0,padding:"8px 12px",borderRadius:20}}>🎁</button><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message..." style={{flex:1,background:"#222",border:0,borderRadius:20,padding:"8px 12px",color:"#fff"}}/><button onClick={sendChat} style={{background:"#8a2be2",border:0,padding:"8px 14px",borderRadius:20,color:"#fff"}}>Send</button></div>
    </div>
  }

  if(!user){ return<div style={{background:"#000",color:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><h1 style={{color:"#ff1493"}}>LaachiLive</h1><input value={name} onChange={e=>setName(e.target.value)} placeholder="Naam" style={{padding:10,borderRadius:10,border:0,margin:5,width:220}}/><input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" style={{padding:10,borderRadius:10,border:0,margin:5,width:220}}/><div style={{display:"flex",gap:8}}><button onClick={doLogin} style={{background:"#ff1493",border:0,padding:"10px 20px",borderRadius:20,color:"#fff"}}>Login</button><button onClick={doSignUp} style={{background:"#333",border:0,padding:"10px 20px",borderRadius:20,color:"#fff"}}>SignUp</button></div></div>}

  return<div style={{background:"#000",color:"#fff",minHeight:"100vh",paddingBottom:70}}>
    <div style={{display:"flex",justifyContent:"space-between",padding:15}}><b style={{color:"#ff1493"}}>LaachiLive</b><button onClick={logout} style={{background:"#222",border:0,color:"#fff",padding:"4px 10px",borderRadius:10}}>Logout</button></div>
    <div style={{padding:"10px 15px",display:"flex",justifyContent:"space-between"}}><h4 style={{margin:0}}>Rooms</h4><button onClick={()=>setShowCreate(true)} style={{background:"#ff1493",border:0,color:"#fff",padding:"7px 16px",borderRadius:20,fontWeight:"bold"}}>+ Create Room</button></div>

    {showCreate&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"#111",padding:20,borderRadius:14,width:320,border:"1px solid #333"}}>
      <h3 style={{marginTop:0}}>Create Room - All Options</h3>
      <input value={newRoomName} onChange={e=>setNewRoomName(e.target.value)} placeholder="Room Name" style={{padding:10,borderRadius:8,border:0,width:"100%",background:"#222",color:"#fff",marginBottom:8}}/>
      <select value={newRoomCat} onChange={e=>setNewRoomCat(e.target.value)} style={{padding:10,borderRadius:8,width:"100%",background:"#222",color:"#fff",border:0,marginBottom:8}}><option>Desi</option><option>Punjabi</option><option>New</option></select>
      <select value={roomType} onChange={e=>setRoomType(e.target.value)} style={{padding:10,borderRadius:8,width:"100%",background:"#222",color:"#fff",border:0,marginBottom:8}}><option>Public</option><option>Private</option></select>
      {roomType==="Private"&&<input value={roomPass} onChange={e=>setRoomPass(e.target.value)} placeholder="Password for Private Room" type="password" style={{padding:10,borderRadius:8,border:0,width:"100%",background:"#222",color:"#fff",marginBottom:8}}/>}
      <input value={welcomeMsg} onChange={e=>setWelcomeMsg(e.target.value)} placeholder="Welcome Message (Optional)" style={{padding:10,borderRadius:8,border:0,width:"100%",background:"#222",color:"#fff",marginBottom:12}}/>
      <div style={{display:"flex",gap:8}}><button onClick={handleCreate} style={{flex:1,background:"#ff1493",border:0,color:"#fff",padding:"10px",borderRadius:20}}>Create Room</button><button onClick={()=>setShowCreate(false)} style={{flex:1,background:"#333",border:0,color:"#fff",padding:"10px",borderRadius:20}}>Cancel</button></div>
    </div></div>}

    <div style={{padding:"0 15px",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>{rooms.map((r:any)=><div key={r.id} onClick={()=>openRoom(r)} style={{background:`linear-gradient(135deg,${r.color},#000)`,padding:28,borderRadius:16,textAlign:"center"}}><div style={{fontSize:28}}>🎙️</div><div style={{fontWeight:"bold"}}>{r.name}</div><div style={{fontSize:10}}>{r.type||"Public"} {r.pass?"🔒":""}</div></div>)}</div>
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0a0a0a",borderTop:"1px solid #222",display:"flex",justifyContent:"space-around",padding:"12px 0"}}><span onClick={()=>setTab("home")} style={{color:tab==="home"?"#ff1493":"#fff"}}>🏠 Home</span><span>👤 Me</span></div>
  </div>
}
