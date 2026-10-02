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
  const [name,setName]=useState(""); const [pass,setPass]=useState(""); const [showP,setShowP]=useState(false);
  const [showCreate,setShowCreate]=useState(false); const [newRoomName,setNewRoomName]=useState(""); const [newRoomCat,setNewRoomCat]=useState("Desi");
  const [seats,setSeats]=useState<any[]>(()=>Array(10).fill(null)); // 10 SEATS FIXED
  const [muted,setMuted]=useState(false);
  const [msg,setMsg]=useState(""); const [chats,setChats]=useState<string[]>(["Welcome to LaachiLive! 🎉"]);
  const [coins,setCoins]=useState(5000); const [diamonds,setDiamonds]=useState(10000);
  const [showGift,setShowGift]=useState(false); const [bigGift,setBigGift]=useState<any>(null);
  const [myId]=useState(()=> Math.floor(Math.random()*90000+1000));

  const saveRooms=(nr:any[])=>{ setRooms(nr); localStorage.setItem("laachi_rooms_v2", JSON.stringify(nr)); };
  const handleCreate=()=>{ if(!newRoomName) return alert("Room ka naam likho!"); const color="#ff1493"; const newR={id:""+Date.now(), name:newRoomName, cat:newRoomCat, color, viewers:"0"}; saveRooms([newR,...rooms]); setSel(newR); setSeats(Array(10).fill(null)); setShowCreate(false); setNewRoomName(""); };
  const openRoom=(r:any)=>{ setSel(r); setSeats(Array(10).fill(null)); setChats([`Welcome to ${r.name} room!`]); };
  const doSignUp=()=>{ if(!name||!pass) return alert("Naam likho!"); localStorage.setItem("laachi_user_"+name, pass); localStorage.setItem("laachi_user", JSON.stringify({name})); setUser({name}); };
  const doLogin=()=>{ if(!name||!pass) return alert("Naam likho!"); const s=localStorage.getItem("laachi_user_"+name); if(s!==pass) return alert("Password ghalat!"); localStorage.setItem("laachi_user", JSON.stringify({name})); setUser({name}); };
  const googleLogin=()=>{ const g="Unais Google"; localStorage.setItem("laachi_user", JSON.stringify({name:g})); setUser({name:g}); };
  const logout=()=>{ localStorage.removeItem("laachi_user"); setUser(null); setSel(null); setTab("home"); };
  const sit=(idx:number)=>{ if(seats[idx]) return; if(seats.some((s:any)=>s?.name===user?.name)) return alert("Aap pehle se seat par ho!"); const ns=[...seats]; ns[idx]={name:user.name, id:myId}; setSeats(ns); };
  const leave=(idx:number)=>{ const ns=[...seats]; ns[idx]=null; setSeats(ns); };
  const sendChat=()=>{ if(!msg) return; setChats([...chats, `${user?.name}: ${msg}`]); setMsg(""); };
  const sendGift=(g:any)=>{ if(coins<g.p) return alert(`Coins kam! Aapke pas ${coins} hain, ${g.p} chahiye`); setCoins(c=>c-g.p); setBigGift(g); setTimeout(()=>setBigGift(null),3000); setChats([...chats, `🎁 ${user?.name} sent ${g.n} ${g.i}`]); };

  if(sel){
    return<div style={{background:"linear-gradient(180deg,#1a0033 0%,#000 100%)",color:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      {bigGift&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><div style={{fontSize:80}}>{bigGift.i}</div><div style={{fontSize:22,fontWeight:"bold"}}>{bigGift.n} Sent!</div></div>}
      <div style={{display:"flex",justifyContent:"space-between",padding:"10px 15px",alignItems:"center",background:"rgba(0,0,0,0.4)"}}><b>{sel.name} - LIVE</b><button onClick={()=>setSel(null)} style={{background:"#ff1493",border:0,color:"#fff",padding:"6px 12px",borderRadius:20}}>✕ Leave</button></div>

      {/* FINAL 10 SEAT - 5 UPER 5 NEECHE */}
      <div style={{padding:10,display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:8}}>
        {seats.map((s:any, i:number)=>(
          <div key={i} style={{background:s?"linear-gradient(135deg,#ff1493,#8a2be2)":"rgba(255,255,255,0.08)",height:85,borderRadius:12,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:s?"2px solid #ff1493":"1px solid #333",position:"relative"}}>
            <div style={{width:42,height:42,borderRadius:50,background:s?"#fff":"#333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{s?"👤":"🎤"}</div>
            <div style={{fontSize:11,marginTop:4,textAlign:"center",width:"100%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{s?s.name:`Seat ${i+1}`}</div>
            {!s?<button onClick={()=>sit(i)} style={{fontSize:10,background:"#ff1493",border:0,color:"#fff",padding:"2px 8px",borderRadius:10,marginTop:2}}>Join</button>:s.name===user.name&&<button onClick={()=>leave(i)} style={{fontSize:9,background:"rgba(0,0,0,0.5)",border:0,color:"#fff",padding:"2px 6px",borderRadius:10,marginTop:2}}>Leave</button>}
            {i===0&&<span style={{position:"absolute",top:2,left:4,fontSize:8,background:"gold",color:"#000",padding:"1px 4px",borderRadius:10}}>HOST</span>}
          </div>
        ))}
      </div>

      <div style={{height:110,overflowY:"auto",padding:"8px 12px",fontSize:11}}>{chats.map((c,i)=><div key={i} style={{marginBottom:4}}>{c}</div>)}</div>
      {showGift&&<div style={{position:"absolute",bottom:70,left:0,right:0,background:"#111",borderTop:"2px solid #ff1493",padding:10}}><div style={{display:"flex",gap:6,overflowX:"auto"}}>{GIFTS_DATA.map(g=><div key={g.n} onClick={()=>sendGift(g)} style={{background:"#0a0a0a",padding:10,textAlign:"center",minWidth:65,borderRadius:10,border:"1px solid #333"}}><div style={{fontSize:22}}>{g.i}</div><div style={{fontSize:9}}>{g.n}</div><div style={{fontSize:8,color:"gold"}}>{g.p}</div></div>)}</div></div>}
      <div style={{display:"flex",gap:6,padding:10,background:"#0a0a0a",borderTop:"1px solid #222"}}><button onClick={()=>setShowGift(!showGift)} style={{background:"#ff1493",border:0,borderRadius:20,padding:"8px 12px"}}>🎁</button><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message likho..." style={{flex:1,background:"#222",border:0,borderRadius:20,padding:"8px 12px",color:"#fff"}}/><button onClick={sendChat} style={{background:"#8a2be2",border:0,borderRadius:20,padding:"8px 14px",color:"#fff"}}>Send</button></div>
    </div>
  }

  if(!user){ return<div style={{background:"#000",color:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
    <h1 style={{color:"#ff1493"}}>LaachiLive</h1><p>10 Seats Voice Rooms - Desi Fun</p>
    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Naam" style={{padding:10,borderRadius:10,border:0,marginBottom:8,width:220}}/>
    <input type={showP?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{padding:10,borderRadius:10,border:0,marginBottom:8,width:220}}/>
    <div style={{display:"flex",gap:8}}><button onClick={doLogin} style={{background:"#ff1493",border:0,padding:"10px 20px",borderRadius:20,color:"#fff"}}>Login</button><button onClick={doSignUp} style={{background:"#333",border:0,padding:"10px 20px",borderRadius:20,color:"#fff"}}>SignUp</button></div>
    <button onClick={googleLogin} style={{marginTop:12,background:"#fff",color:"#000",border:0,padding:"8px 18px",borderRadius:20}}>G Google Login</button>
  </div>}

  return<div style={{background:"#000",color:"#fff",minHeight:"100vh",paddingBottom:70}}>
    <div style={{display:"flex",justifyContent:"space-between",padding:"15px 20px",borderBottom:"1px solid #111",position:"sticky",top:0,background:"#000",zIndex:10}}><b style={{color:"#ff1493"}}>LaachiLive - {user.name}</b><button onClick={logout} style={{background:"#222",border:0,color:"#fff",padding:"5px 10px",borderRadius:10}}>Logout</button></div>
    <div style={{padding:"10px 15px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",gap:8}}><span style={{background:"#222",padding:"4px 10px",borderRadius:20,fontSize:12}}>Coins: {coins}</span><span style={{background:"#222",padding:"4px 10px",borderRadius:20,fontSize:12}}>💎 {diamonds}</span></div><button onClick={()=>setShowCreate(true)} style={{background:"#ff1493",border:0,color:"#fff",padding:"6px 12px",borderRadius:20}}>+ Create Room</button></div>
    {showCreate&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"#111",borderRadius:12,padding:25,border:"1px solid #333"}}><h3>Create Room</h3><input value={newRoomName} onChange={e=>setNewRoomName(e.target.value)} placeholder="Room Name" style={{padding:10,borderRadius:8,border:0,width:"100%",marginBottom:10}}/><select value={newRoomCat} onChange={e=>setNewRoomCat(e.target.value)} style={{padding:10,borderRadius:8,width:"100%",marginBottom:10}}><option>Desi</option><option>Punjabi</option><option>New</option><option>Trending</option></select><div style={{display:"flex",gap:8}}><button onClick={handleCreate} style={{background:"#ff1493",border:0,color:"#fff",padding:"8px 16px",borderRadius:20}}>Create</button><button onClick={()=>setShowCreate(false)} style={{background:"#333",border:0,color:"#fff",padding:"8px 16px",borderRadius:20}}>Cancel</button></div></div></div>}
    <div style={{display:"flex",gap:8,padding:"0 15px",overflowX:"auto"}}>{["All","Desi","Punjabi","New","Trending"].map(c=><button key={c} onClick={()=>setTab(c==="All"?"home":c)} style={{background:tab===c||(tab==="home"&&c==="All")?"#ff1493":"#222",border:0,color:"#fff",padding:"6px 14px",borderRadius:20,whiteSpace:"nowrap"}}>{c}</button>)}</div>
    <div style={{padding:15}}><div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:12}}>{rooms.filter((r:any)=>tab==="home"||r.cat===tab).map((r:any)=><div key={r.id} onClick={()=>openRoom(r)} style={{background:`linear-gradient(135deg,${r.color},#000)`,padding:25,borderRadius:15,textAlign:"center"}}><div style={{fontSize:28}}>🎙️</div><div style={{fontWeight:"bold"}}>{r.name}</div><div style={{fontSize:11}}>{r.cat} • {r.viewers}</div></div>)}</div></div>
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0a0a0a",borderTop:"1px solid #222",display:"flex",justifyContent:"space-around",padding:"10px 0"}}><span onClick={()=>setTab("home")}>🏠 Home</span><span onClick={()=>setTab("live")}>🔴 Live</span><span onClick={()=>setTab("message")}>💬 Msg</span><span onClick={()=>setTab("profile")}>👤 Me</span></div>
  </div>
      }
