import { useState } from "react";

const ROOMS_DATA = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];

const GIFTS_DATA = [
  { i: "🌹", n: "Rose", p: 100 }, { i: "🧸", n: "Teddy", p: 500 },
  { i: "💍", n: "Ring", p: 1000 }, { i: "🚗", n: "Car", p: 2000 },
  { i: "👑", n: "Crown", p: 3000 }, { i: "🚀", n: "Rocket", p: 5000 },
  { i: "🦁", n: "Lion", p: 10000 }, { i: "🏰", n: "Castle", p: 20000 },
  { i: "🌌", n: "Universe", p: 50000 },
];

export default function App(){
  const [sel,setSel]=useState<any>(null);
  const [tab,setTab]=useState("home");
  const [rooms,setRooms]=useState<any[]>(()=>{ const s=localStorage.getItem("laachi_rooms_v2"); return s?JSON.parse(s):ROOMS_DATA; });
  const [user,setUser]=useState<any>(()=>{ const s=localStorage.getItem("laachi_user"); return s?JSON.parse(s):null });
  const [name,setName]=useState(""); const [pass,setPass]=useState("");
  const [showCreate,setShowCreate]=useState(false); const [newRoomName,setNewRoomName]=useState("");
  const [seats,setSeats]=useState<any[]>(()=>Array(8).fill(null)); // 8 SEATER
  const [msg,setMsg]=useState(""); const [chats,setChats]=useState<string[]>(["Welcome to LaachiLive! 🎉","Umais Google: Hi","🎁 Umais Google sent Rose 🌹"]);
  const [inbox,setInbox]=useState<string[]>(["System: Welcome to LaachiLive!","Admin: Apna profile complete karo","Support: Koi masla ho to rabta karo"]);
  const [coins,setCoins]=useState(9000); const [diamonds,setDiamonds]=useState(15000);
  const [showGift,setShowGift]=useState(false); const [bigGift,setBigGift]=useState<any>(null);
  const [myId]=useState(()=> Math.floor(Math.random()*90000+1000));
  const [bio,setBio]=useState("LaachiLive Queen | Jalalpur Jattan ❤️");
  const [editMode,setEditMode]=useState(false); const [newBio,setNewBio]=useState(bio);

  const saveRooms=(nr:any[])=>{ setRooms(nr); localStorage.setItem("laachi_rooms_v2", JSON.stringify(nr)); };
  const openRoom=(r:any)=>{ setSel(r); setSeats(Array(8).fill(null)); setChats([`Welcome to ${r.name} room!`]); };
  const doSignUp=()=>{ if(!name||!pass) return alert("Naam likho!"); localStorage.setItem("laachi_user_"+name, pass); localStorage.setItem("laachi_user", JSON.stringify({name})); setUser({name}); };
  const doLogin=()=>{ const s=localStorage.getItem("laachi_user_"+name); if(s!==pass) return alert("Password ghalat!"); localStorage.setItem("laachi_user", JSON.stringify({name})); setUser({name}); };
  const logout=()=>{ localStorage.removeItem("laachi_user"); setUser(null); setSel(null); setTab("home"); };
  const sit=(idx:number)=>{ if(seats[idx]) return; if(seats.some((s:any)=>s?.name===user?.name)) return alert("Aap pehle se seat par ho!"); const ns=[...seats]; ns[idx]={name:user.name}; setSeats(ns); setChats(c=>[...c, `${user.name} joined Seat ${idx+1}`]); };
  const leave=(idx:number)=>{ const ns=[...seats]; ns[idx]=null; setSeats(ns); };
  const sendChat=()=>{ if(!msg) return; setChats([...chats, `${user?.name}: ${msg}`]); setInbox(i=>[...i, `${user?.name}: ${msg}`]); setMsg(""); };
  const sendGift=(g:any)=>{ if(coins<g.p) return alert("Coins kam!"); setCoins(c=>c-g.p); setBigGift(g); setTimeout(()=>setBigGift(null),2500); setChats([...chats, `🎁 ${user?.name} sent ${g.n} ${g.i}`]); };

  if(sel){
    return<div style={{background:"linear-gradient(180deg,#1a0033,#000)",color:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      {bigGift&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><div style={{fontSize:90}}>{bigGift.i}</div><div style={{fontSize:22,fontWeight:"bold"}}>{bigGift.n}!</div></div>}
      <div style={{display:"flex",justifyContent:"space-between",padding:12,background:"rgba(0,0,0,0.5)"}}><b>{sel.name} - LIVE</b><button onClick={()=>setSel(null)} style={{background:"#ff1493",border:0,color:"#fff",padding:"6px 14px",borderRadius:20}}>✕ Leave</button></div>
      {/* 8 SEATER 4 UPER 4 NEECHE */}
      <div style={{padding:12,display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10}}>
        {seats.map((s:any,i:number)=>(
          <div key={i} style={{background:s?"linear-gradient(135deg,#ff1493,#8a2be2)":"#222",height:95,borderRadius:14,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:s?"2px solid #ff1493":"1px solid #333",position:"relative"}}>
            <div style={{width:46,height:46,borderRadius:23,background:s?"#fff":"#333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{s?"👤":"🎤"}</div>
            <div style={{fontSize:12,marginTop:5}}>{s?s.name:`Seat ${i+1}`}</div>
            {!s?<button onClick={()=>sit(i)} style={{fontSize:10,background:"#ff1493",color:"#fff",border:0,padding:"3px 10px",borderRadius:10,marginTop:4}}>Join</button>:s.name===user?.name&&<button onClick={()=>leave(i)} style={{fontSize:9,background:"#000",color:"#fff",border:0,padding:"3px 8px",borderRadius:10,marginTop:4}}>Leave</button>}
            {i===0&&<span style={{position:"absolute",top:3,left:5,fontSize:8,background:"gold",color:"#000",padding:"1px 5px",borderRadius:10}}>HOST</span>}
          </div>
        ))}
      </div>
      <div style={{flex:1,padding:10,fontSize:12,overflowY:"auto",maxHeight:160}}>{chats.map((c,i)=><div key={i} style={{marginBottom:5}}>{c}</div>)}</div>
      {showGift&&<div style={{display:"flex",gap:8,padding:10,overflowX:"auto",background:"#111",borderTop:"1px solid #ff1493"}}>{GIFTS_DATA.map(g=><div key={g.n} onClick={()=>sendGift(g)} style={{minWidth:70,background:"#222",padding:10,borderRadius:12,textAlign:"center",border:"1px solid #333"}}><div style={{fontSize:24}}>{g.i}</div><div style={{fontSize:10}}>{g.n}</div><div style={{fontSize:9,color:"gold"}}>{g.p}</div></div>)}</div>}
      <div style={{display:"flex",gap:6,padding:10,background:"#000"}}><button onClick={()=>setShowGift(!showGift)} style={{background:"#ff1493",border:0,padding:"8px 12px",borderRadius:20}}>🎁</button><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message likho..." style={{flex:1,background:"#222",border:0,borderRadius:20,padding:"8px 12px",color:"#fff"}}/><button onClick={sendChat} style={{background:"#8a2be2",border:0,padding:"8px 14px",borderRadius:20,color:"#fff"}}>Send</button></div>
    </div>
  }

  if(!user){ return<div style={{background:"#000",color:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><h1 style={{color:"#ff1493"}}>LaachiLive</h1><input value={name} onChange={e=>setName(e.target.value)} placeholder="Naam" style={{padding:10,borderRadius:10,border:0,margin:5,width:220}}/><input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" style={{padding:10,borderRadius:10,border:0,margin:5,width:220}}/><div style={{display:"flex",gap:8}}><button onClick={doLogin} style={{background:"#ff1493",border:0,padding:"10px 20px",borderRadius:20,color:"#fff"}}>Login</button><button onClick={doSignUp} style={{background:"#333",border:0,padding:"10px 20px",borderRadius:20,color:"#fff"}}>SignUp</button></div></div>}

  return<div style={{background:"#000",color:"#fff",minHeight:"100vh",paddingBottom:70}}>
    <div style={{display:"flex",justifyContent:"space-between",padding:15,background:"#000",position:"sticky",top:0,zIndex:10}}><b style={{color:"#ff1493"}}>LaachiLive</b><div style={{display:"flex",gap:8}}><span style={{background:"#222",padding:"4px 10px",borderRadius:20,fontSize:11}}>💰 {coins}</span><span style={{background:"#222",padding:"4px 10px",borderRadius:20,fontSize:11}}>💎 {diamonds}</span></div></div>

    {tab==="home"&&<div style={{padding:15,display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>{rooms.map((r:any)=><div key={r.id} onClick={()=>openRoom(r)} style={{background:`linear-gradient(135deg,${r.color},#000)`,padding:30,borderRadius:16,textAlign:"center"}}><div style={{fontSize:30}}>🎙️</div><div style={{fontWeight:"bold",marginTop:5}}>{r.name}</div><div style={{fontSize:11,opacity:0.8}}>{r.viewers} viewers</div></div>)}</div>}

    {tab==="live"&&<div style={{padding:15}}><h3>🔴 All Live Rooms</h3><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginTop:12}}>{rooms.map((r:any)=><div key={r.id} onClick={()=>openRoom(r)} style={{background:r.color,padding:25,borderRadius:15,textAlign:"center"}}><div>🎤 {r.name}</div><div style={{fontSize:11}}>{r.viewers} watching</div></div>)}</div></div>}

    {tab==="message"&&<div style={{padding:15}}><h3>💬 Messages - All Features</h3>
      <div style={{display:"flex",gap:8,marginTop:12}}><button style={{background:"#ff1493",border:0,color:"#fff",padding:"6px 12px",borderRadius:20,fontSize:12}}>All</button><button style={{background:"#222",border:0,color:"#fff",padding:"6px 12px",borderRadius:20,fontSize:12}}>Friends</button><button style={{background:"#222",border:0,color:"#fff",padding:"6px 12px",borderRadius:20,fontSize:12}}>System</button></div>
      <div style={{marginTop:15}}>{inbox.map((m,i)=><div key={i} style={{background:"#111",padding:12,borderRadius:10,marginBottom:8,display:"flex",gap:10,alignItems:"center"}}><div style={{width:40,height:40,background:"#333",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center"}}>💌</div><div><div style={{fontSize:13}}>{m}</div><div style={{fontSize:10,color:"#888"}}>2 min ago</div></div></div>)}</div>
      <div style={{marginTop:20,background:"#111",padding:12,borderRadius:12}}><h4 style={{margin:0}}>Chat History</h4>{chats.map((c,i)=><div key={i} style={{fontSize:12,padding:"6px 0",borderBottom:"1px solid #222"}}>{c}</div>)}</div>
    </div>}

    {tab==="profile"&&<div style={{padding:15}}><div style={{textAlign:"center",background:"linear-gradient(135deg,#ff1493,#8a2be2)",padding:20,borderRadius:16}}><div style={{width:85,height:85,background:"#fff",borderRadius:42,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40}}>👤</div><h2 style={{margin:"10px 0 5px"}}>{user.name}</h2><p style={{fontSize:12,margin:0}}>ID: {myId} | Jalalpur Jattan</p><p style={{fontSize:11,marginTop:8,background:"rgba(0,0,0,0.3)",padding:6,borderRadius:8}}>{bio}</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:12}}><div style={{background:"#111",padding:12,borderRadius:12,textAlign:"center"}}><div style={{fontSize:18}}>💰</div><div style={{fontSize:12}}>Coins</div><b>{coins}</b></div><div style={{background:"#111",padding:12,borderRadius:12,textAlign:"center"}}><div style={{fontSize:18}}>💎</div><div style={{fontSize:12}}>Diamonds</div><b>{diamonds}</b></div><div style={{background:"#111",padding:12,borderRadius:12,textAlign:"center"}}><div style={{fontSize:18}}>⭐</div><div style={{fontSize:12}}>Level</div><b>Lv.12</b></div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:8}}><div style={{background:"#111",padding:10,borderRadius:10,textAlign:"center",fontSize:12}}>👥 Followers<br/><b>1.2k</b></div><div style={{background:"#111",padding:10,borderRadius:10,textAlign:"center",fontSize:12}}>❤️ Following<br/><b>340</b></div><div style={{background:"#111",padding:10,borderRadius:10,textAlign:"center",fontSize:12}}>🏆 Gifts<br/><b>89</b></div></div>
      <div style={{marginTop:15,background:"#111",borderRadius:12}}><div style={{padding:12,borderBottom:"1px solid #222",display:"flex",justifyContent:"space-between"}}><span>📝 Edit Profile</span><button onClick={()=>{if(editMode){setBio(newBio); setEditMode(false);} else setEditMode(true);}} style={{background:"#ff1493",border:0,color:"#fff",padding:"4px 10px",borderRadius:10,fontSize:11}}>{editMode?"Save":"Edit"}</button></div>{editMode&&<div style={{padding:10}}><input value={newBio} onChange={e=>setNewBio(e.target.value)} style={{width:"100%",padding:8,borderRadius:8,border:0,background:"#222",color:"#fff"}}/></div>}<div style={{padding:12,borderBottom:"1px solid #222"}}>🏠 My Rooms</div><div style={{padding:12,borderBottom:"1px solid #222"}}>⚙️ Settings</div><div style={{padding:12,borderBottom:"1px solid #222"}}>🔒 Privacy</div><div style={{padding:12}}>📞 Help & Support</div></div>
      <button onClick={logout} style={{marginTop:15,width:"100%",background:"#222",border:0,color:"#ff1493",padding:12,borderRadius:12}}>Logout</button>
    </div>}

    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0a0a0a",borderTop:"1px solid #222",display:"flex",justifyContent:"space-around",padding:"12px 0"}}><span onClick={()=>setTab("home")} style={{color:tab==="home"?"#ff1493":"#fff"}}>🏠 Home</span><span onClick={()=>setTab("live")} style={{color:tab==="live"?"#ff1493":"#fff"}}>🔴 Live</span><span onClick={()=>setTab("message")} style={{color:tab==="message"?"#ff1493":"#fff"}}>💬 Msg</span><span onClick={()=>setTab("profile")} style={{color:tab==="profile"?"#ff1493":"#fff"}}>👤 Me</span></div>
  </div>
}
