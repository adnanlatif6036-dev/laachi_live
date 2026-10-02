import { useState, useEffect } from "react";

type User = { id:string; name:string; avatar:string; level:number; coins:number; diamonds:number; followers:number; following:number; bio:string; verified?:boolean; city?:string; gender?:string; };
type Room = { id:string; title:string; host:User; type:string; city:string; usersCount:number; mics:(User|null)[]; locked?:boolean; password?:string; };
type Gift = { id:string; name:string; icon:string; price:number; };
type ChatMsg = { user:string; text:string; time:string; };

const GIFTS: Gift[] = [
  {id:"1", name:"Rose", icon:"🌹", price:10}, {id:"2", name:"Heart", icon:"💖", price:30},
  {id:"3", name:"Teddy", icon:"🧸", price:50}, {id:"4", name:"Car", icon:"🏎️", price:100},
  {id:"5", name:"Crown", icon:"👑", price:500}, {id:"6", name:"Diamond", icon:"💎", price:1000},
  {id:"7", name:"Lion", icon:"🦁", price:2000}, {id:"8", name:"Rocket", icon:"🚀", price:5000},
];

export default function App(){
  const [user, setUser] = useState<User|null>(null);
  const [name, setName] = useState(""); const [pass, setPass] = useState("");
  const [page, setPage] = useState<"home"|"dm"|"wallet"|"profile"|"notif"|"admin">("home");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoom, setActiveRoom] = useState<Room|null>(null);
  const [roomChat, setRoomChat] = useState<ChatMsg[]>([]);
  const [chatText, setChatText] = useState("");
  const [isMuted, setIsMuted] = useState(true); const [onMic, setOnMic] = useState(false);
  const [showGifts, setShowGifts] = useState(false); const [giftAnim, setGiftAnim] = useState<string|null>(null);
  const [filterCity, setFilterCity] = useState("All"); const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false); const [newRoomTitle, setNewRoomTitle] = useState(""); const [newRoomType, setNewRoomType] = useState("Chit Chat"); const [newRoomCity, setNewRoomCity] = useState("Lahore");
  const [dmList] = useState([{id:"G1", name:"Ayesha Queen", msg:"Hi jani ❤️", city:"Lahore"}, {id:"G2", name:"Sana Doll", msg:"Room me aao", city:"Karachi"}]);
  const [notifs] = useState(["Ayesha followed you", "Sana sent you 🌹", "You got 100 coins daily bonus"]);
  const [selectedUser, setSelectedUser] = useState<User|null>(null);

  useEffect(()=>{
    const girls:User[] = [
      {id:"G1", name:"Ayesha Queen", avatar:"👩‍🦰", level:18, coins:5000, diamonds:1200, followers:5200, following:100, bio:"Lahore ki Shehzadi 👑", verified:true, city:"Lahore", gender:"Girl"},
      {id:"G2", name:"Sana Doll", avatar:"💃", level:22, coins:8000, diamonds:2000, followers:8500, following:80, bio:"Karachi Queen ❤️", verified:true, city:"Karachi"},
      {id:"G3", name:"Mahi Khan", avatar:"👸", level:15, coins:3000, diamonds:800, followers:3200, following:60, bio:"ISB Girl", city:"Islamabad"},
      {id:"G4", name:"Zoya Malik", avatar:"👩", level:12, coins:2500, diamonds:500, followers:2100, following:40, bio:"Faisalabad", city:"Faisalabad"},
      {id:"G5", name:"Noor Fatima", avatar:"🧕", level:20, coins:6000, diamonds:1500, followers:6200, following:90, bio:"Multan ki Hoor", verified:true, city:"Multan"},
      {id:"G6", name:"Alishba", avatar:"🌸", level:16, coins:4000, diamonds:900, followers:4100, following:70, bio:"Gujranwala", city:"Gujranwala"},
      {id:"G7", name:"Hoorain", avatar:"💖", level:14, coins:3500, diamonds:700, followers:2800, following:55, bio:"Sialkot Princess", city:"Sialkot"},
      {id:"G8", name:"Laiba Shah", avatar:"🦋", level:19, coins:5500, diamonds:1300, followers:5800, following:110, bio:"Rawalpindi", verified:true, city:"Rawalpindi"},
      {id:"G9", name:"Iqra Jaan", avatar:"🌙", level:25, coins:10000, diamonds:3000, followers:10200, following:150, bio:"Lahore Night Angel", verified:true, city:"Lahore"},
      {id:"G10", name:"Duaa Doll", avatar:"💋", level:13, coins:2800, diamonds:600, followers:2400, following:45, bio:"Karachi Doll", city:"Karachi"},
    ];
    setRooms([
      {id:"R1", title:"Late Night Gup Shup 💬", host:girls[0], type:"Chit Chat", city:"Lahore", usersCount:128, mics:[girls[0],null,null,null,null,null,null,null]},
      {id:"R2", title:"Dil Ki Baatein - Karachi Girls", host:girls[1], type:"Dating", city:"Karachi", usersCount:342, mics:[girls[1],girls[9],null,null,null,null,null,null]},
      {id:"R3", title:"Islamabad Chill Party 🎵", host:girls[2], type:"Music", city:"Islamabad", usersCount:89, mics:[girls[2],null,null,null,null,null,null,null]},
      {id:"R4", title:"Faisalabad Ki Mehfil 😍", host:girls[3], type:"Chit Chat", city:"Faisalabad", usersCount:56, mics:[girls[3],null,null,null,null,null,null,null]},
      {id:"R5", title:"Multan Ki Hoor - Voice Only", host:girls[4], type:"Friends", city:"Multan", usersCount:210, mics:[girls[4],null,null,null,null,null,null,null]},
      {id:"R6", title:"Gujranwala Night Talks 🌹", host:girls[5], type:"Chit Chat", city:"Gujranwala", usersCount:78, mics:[girls[5],null,null,null,null,null,null,null]},
      {id:"R7", title:"Sialkot Princess Live ✨", host:girls[6], type:"Dating", city:"Sialkot", usersCount:95, mics:[girls[6],null,null,null,null,null,null,null]},
      {id:"R8", title:"Pindi Boys vs Girls Debate 🔥", host:girls[7], type:"Games", city:"Rawalpindi", usersCount:165, mics:[girls[7],null,null,null,null,null,null,null]},
      {id:"R9", title:"Lahore Night - No Sleep 😘", host:girls[8], type:"Chit Chat", city:"Lahore", usersCount:412, mics:[girls[8],girls[0],null,null,null,null,null,null]},
      {id:"R10", title:"Karachi Late Night Fun", host:girls[9], type:"Music", city:"Karachi", usersCount:112, mics:[girls[9],null,null,null,null,null,null,null]},
    ]);
  },[]);

  const doLogin = ()=>{ if(!name||!pass) return alert("Name & Password likho"); setUser({id:Date.now().toString(), name, avatar:"😎", level:1, coins:1000, diamonds:0, followers:0, following:0, bio:"New in LaachiLive", city:"Lahore"}); };
  const joinRoom = (r:Room)=>{ setActiveRoom(r); setRoomChat([{user:"System", text:`Welcome to ${r.host.name} room from ${r.city}`, time:"now"}]); setOnMic(false); setIsMuted(true); };
  const requestMic = ()=>{ if(!activeRoom||!user) return; const idx=activeRoom.mics.findIndex(m=>m===null); if(idx===-1) return alert("Mics Full"); const nm=[...activeRoom.mics]; nm[idx]=user; setActiveRoom({...activeRoom, mics:nm}); setOnMic(true); setIsMuted(false); };
  const sendGift = (g:Gift)=>{ if(!user||user.coins<g.price) return alert("Coins khatam"); setUser({...user, coins:user.coins-g.price}); setGiftAnim(g.icon); setRoomChat(p=>[...p, {user:user.name, text:`sent ${g.icon} ${g.name} to ${activeRoom?.host.name}`, time:"now"}]); setTimeout(()=>setGiftAnim(null),2000); setShowGifts(false); };
  const createRoom = ()=>{ if(!newRoomTitle||!user) return alert("Title likho"); const nr:Room={id:"R"+Date.now(), title:newRoomTitle, host:user, type:newRoomType, city:newRoomCity, usersCount:1, mics:[user,null,null,null,null,null,null,null]}; setRooms([nr,...rooms]); setShowCreate(false); setNewRoomTitle(""); joinRoom(nr); };

  if(!user) return (
    <div style={{background:"#0a0a0a", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24}}>
      <div style={{width:"100%", maxWidth:360}}>
        <div style={{textAlign:"center", marginBottom:28}}>
          <div style={{width:120, height:120, borderRadius:60, background:"linear-gradient(135deg,#ff2e9a,#8a2be2)", padding:4, margin:"0 auto"}}><div style={{width:"100%", height:"100%", background:"#0a0a0a", borderRadius:60, display:"flex", alignItems:"center", justifyContent:"center"}}><span style={{fontSize:54, fontWeight:900, background:"linear-gradient(135deg,#ff2e9a,#7b2bff)", WebkitBackgroundClip:"text", color:"transparent", fontStyle:"italic"}}>L</span></div></div>
          <h1 style={{color:"#fff", fontSize:26, fontWeight:600, margin:"16px 0 4px"}}>LaachiLive</h1><p style={{color:"#777", fontSize:12, letterSpacing:2}}>Connect · Talk · Live</p>
        </div>
        <p style={{color:"#aaa", fontSize:12, marginBottom:6}}>Name</p><div style={{display:"flex", background:"#1e1e22", borderRadius:14, padding:"12px 14px", marginBottom:14, border:"1px solid #333"}}><span style={{marginRight:8}}>👤</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" style={{background:"transparent", border:0, color:"#fff", width:"100%", outline:"none"}}/></div>
        <p style={{color:"#aaa", fontSize:12, marginBottom:6}}>Password</p><div style={{display:"flex", background:"#1e1e22", borderRadius:14, padding:"12px 14px", border:"1px solid #333"}}><span style={{marginRight:8}}>🔒</span><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Enter your password" style={{background:"transparent", border:0, color:"#fff", width:"100%", outline:"none"}}/><span>👁️</span></div>
        <button onClick={doLogin} style={{width:"100%", marginTop:22, background:"linear-gradient(90deg,#ff5bbd,#8a2be2)", border:0, padding:13, borderRadius:14, color:"#fff", fontWeight:"bold", fontSize:16}}>Login</button>
        <p style={{textAlign:"center", color:"#ff5bbd", fontSize:13, marginTop:12}}>Forgot Password?</p><p style={{textAlign:"center", color:"#888", fontSize:13, marginTop:16}}>Don't have an account? <span style={{color:"#d36cff", fontWeight:"bold"}}>Sign up</span></p>
      </div>
    </div>
  );

  if(activeRoom) return (
    <div style={{background:"#000", minHeight:"100vh", display:"flex", flexDirection:"column", color:"#fff"}}>
      <div style={{display:"flex", justifyContent:"space-between", padding:14, borderBottom:"1px solid #222"}}><span onClick={()=>setActiveRoom(null)} style={{cursor:"pointer"}}>✕ Leave</span><div style={{textAlign:"center"}}><p style={{fontSize:13, fontWeight:"bold"}}>{activeRoom.title}</p><p style={{fontSize:10, color:"#ff5bbd"}}>📍 {activeRoom.city} · {activeRoom.host.name} {activeRoom.host.verified&&"✔️"}</p></div><span>👥 {activeRoom.usersCount}</span></div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, padding:20}}>{activeRoom.mics.map((m,i)=><div key={i} style={{textAlign:"center"}} onClick={()=> m && setSelectedUser(m)}><div style={{width:60, height:60, borderRadius:30, background: m? "linear-gradient(135deg,#ff1493,#8a2be2)" : "#1a1a1a", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", border: m? "2px solid #ff1493":"2px dashed #333"}}>{m? m.avatar : "+"}</div><p style={{fontSize:10, marginTop:4}}>{m? m.name.split(" ")[0] : `Mic ${i+1}`}</p><p style={{fontSize:8, color:"#ff5bbd"}}>{i===0? "HOST":""}</p></div>)}</div>
      {giftAnim && <div style={{position:"fixed", top:"35%", left:"50%", transform:"translate(-50%,-50%)", fontSize:100, zIndex:99}}>{giftAnim}</div>}
      {selectedUser && <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#1a1a1f", borderRadius:"20px 20px 0 0", padding:16, borderTop:"1px solid #333"}}><p style={{fontWeight:"bold"}}>{selectedUser.avatar} {selectedUser.name} {selectedUser.verified&&"✔️"}</p><p style={{fontSize:12, color:"#888"}}>📍 {selectedUser.city} · Lv.{selectedUser.level} · 👥 {selectedUser.followers} followers</p><p style={{fontSize:12, marginTop:6}}>{selectedUser.bio}</p><div style={{display:"flex", gap:8, marginTop:12}}><button style={{flex:1, background:"#222", border:0, padding:8, borderRadius:10, color:"#fff"}}>Follow</button><button style={{flex:1, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, padding:8, borderRadius:10, color:"#fff"}}>DM Chat</button><button onClick={()=>setSelectedUser(null)} style={{background:"#333", border:0, padding:8, borderRadius:10, color:"#fff"}}>Close</button></div></div>}
      <div style={{flex:1, background:"#0e0e12", borderRadius:"20px 20px 0 0", padding:12, display:"flex", flexDirection:"column"}}>
        <div style={{flex:1, overflowY:"auto", maxHeight:220}}>{roomChat.map((c,i)=><p key={i} style={{fontSize:13, margin:"6px 0"}}><span style={{color:"#ff5bbd"}}>{c.user}:</span> {c.text}</p>)}</div>
        <div style={{display:"flex", gap:8, marginTop:10}}><input value={chatText} onChange={e=>setChatText(e.target.value)} placeholder="Say something..." style={{flex:1, background:"#1e1e22", border:"1px solid #333", borderRadius:20, padding:"10px 14px", color:"#fff", outline:"none"}}/><button onClick={()=>{ if(chatText){ setRoomChat(p=>[...p, {user:user.name, text:chatText, time:"now"}]); setChatText(""); } }} style={{background:"#ff1493", border:0, borderRadius:20, padding:"0 16px", color:"#fff"}}>Send</button></div>
        <div style={{display:"flex", justifyContent:"space-around", marginTop:12, borderTop:"1px solid #222", paddingTop:12}}><button onClick={()=>setIsMuted(!isMuted)} style={{background: isMuted?"#222":"#ff1493", border:0, borderRadius:20, padding:"8px 14px", color:"#fff"}}>{isMuted?"🔇 Off":"🎙️ On"}</button><button onClick={requestMic} disabled={onMic} style={{background:"#222", border:0, borderRadius:20, padding:"8px 14px", color:"#fff"}}>🙋 Mic</button><button onClick={()=>setShowGifts(!showGifts)} style={{background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, borderRadius:20, padding:"8px 18px", color:"#fff"}}>🎁 Gift</button><button onClick={()=>{navigator.clipboard.writeText("LaachiLive Room: "+activeRoom.title); alert("Link Copied!");}} style={{background:"#222", border:0, borderRadius:20, padding:"8px 14px", color:"#fff"}}>🔗 Share</button></div>
        {showGifts && <div style={{display:"flex", gap:8, marginTop:10, overflowX:"auto"}}>{GIFTS.map(g=><div key={g.id} onClick={()=>sendGift(g)} style={{background:"#1e1e22", borderRadius:12, padding:10, minWidth:64, textAlign:"center", border:"1px solid #333"}}><div style={{fontSize:22}}>{g.icon}</div><p style={{fontSize:10}}>{g.price}</p></div>)}</div>}
      </div>
    </div>
  );

  return (
    <div style={{background:"#000", minHeight:"100vh", color:"#fff", paddingBottom:70}}>
      <div style={{padding:16, display:"flex", justifyContent:"space-between"}}><h2 style={{fontSize:18, fontWeight:"bold"}}>LaachiLive <span style={{fontSize:10, background:"linear-gradient(90deg,#ff1493,#8a2be2)", padding:"2px 8px", borderRadius:10}}>LIVE</span></h2><div style={{display:"flex", gap:12}}><span onClick={()=>setPage("notif")} style={{cursor:"pointer"}}>🔔</span><span onClick={()=>setPage("wallet")} style={{background:"#1e1e22", padding:"4px 10px", borderRadius:12, fontSize:12}}>💰 {user.coins}</span></div></div>

      {page==="home" && <>
        <div style={{display:"flex", gap:8, padding:"0 16px", overflowX:"auto"}}>{["All","Lahore","Karachi","Islamabad","Faisalabad","Multan","Gujranwala","Sialkot","Rawalpindi"].map(c=><span key={c} onClick={()=>setFilterCity(c)} style={{background: filterCity===c? "linear-gradient(90deg,#ff1493,#8a2be2)" : "#1e1e22", padding:"6px 12px", borderRadius:20, fontSize:11, whiteSpace:"nowrap", cursor:"pointer"}}>{c}</span>)}</div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search girls, city, ID..." style={{margin:"12px 16px", width:"calc(100% - 32px)", background:"#1e1e22", border:"1px solid #333", borderRadius:12, padding:"10px 14px", color:"#fff", outline:"none"}}/>
        <div style={{padding:"0 16px"}}>
          {rooms.filter(r=>(filterCity==="All"||r.city===filterCity)&& (r.title.toLowerCase().includes(search.toLowerCase())||r.host.name.toLowerCase().includes(search.toLowerCase()))).map(room=>(
            <div key={room.id} onClick={()=>joinRoom(room)} style={{background:"#12121a", borderRadius:16, padding:14, marginBottom:12, border:"1px solid #222", cursor:"pointer"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontSize:10, background:"#ff149322", color:"#ff5bbd", padding:"2px 8px", borderRadius:10}}>{room.type}</span><span style={{fontSize:11, color:"#ff5bbd"}}>📍 {room.city} · 👥 {room.usersCount}</span></div>
              <p style={{fontWeight:"bold", margin:"8px 0 4px", fontSize:14}}>{room.title}</p>
              <div style={{display:"flex", alignItems:"center", gap:8}}><div style={{width:30, height:30, borderRadius:15, background:"linear-gradient(135deg,#ff1493,#8a2be2)", display:"flex", alignItems:"center", justifyContent:"center"}}>{room.host.avatar}</div><div><p style={{fontSize:12}}>{room.host.name} {room.host.verified&&"✔️"}</p><p style={{fontSize:10, color:"#777"}}>Lv.{room.host.level} · {room.city} · {room.host.bio}</p></div></div>
            </div>
          ))}
        </div>
        <button onClick={()=>setShowCreate(true)} style={{position:"fixed", bottom:80, right:16, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, borderRadius:25, padding:"12px 20px", color:"#fff", fontWeight:"bold"}}>+ Create Room</button>
        {showCreate && <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:99}}><div style={{background:"#1a1a1f", borderRadius:16, padding:20, width:"90%", maxWidth:360}}><h3 style={{marginBottom:12}}>Create Room</h3><input value={newRoomTitle} onChange={e=>setNewRoomTitle(e.target.value)} placeholder="Room title e.g. Lahore Girls Chit Chat" style={{width:"100%", background:"#222", border:"1px solid #333", borderRadius:10, padding:10, color:"#fff", marginBottom:10}}/><select value={newRoomType} onChange={e=>setNewRoomType(e.target.value)} style={{width:"100%", background:"#222", border:"1px solid #333", borderRadius:10, padding:10, color:"#fff", marginBottom:10}}><option>Chit Chat</option><option>Dating</option><option>Music</option><option>Games</option><option>Friends</option></select><select value={newRoomCity} onChange={e=>setNewRoomCity(e.target.value)} style={{width:"100%", background:"#222", border:"1px solid #333", borderRadius:10, padding:10, color:"#fff", marginBottom:12}}><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Faisalabad</option><option>Multan</option><option>Gujranwala</option><option>Sialkot</option><option>Rawalpindi</option></select><div style={{display:"flex", gap:8}}><button onClick={()=>setShowCreate(false)} style={{flex:1, background:"#333", border:0, padding:10, borderRadius:10, color:"#fff"}}>Cancel</button><button onClick={createRoom} style={{flex:1, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, padding:10, borderRadius:10, color:"#fff"}}>Create</button></div></div></div>}
      </>}

      {page==="dm" && <div style={{padding:16}}><h3 style={{marginBottom:12}}>Private Chats 💬</h3>{dmList.map(d=><div key={d.id} style={{background:"#12121a", borderRadius:12, padding:12, marginBottom:10, border:"1px solid #222"}}><p style={{fontSize:13, fontWeight:"bold"}}>{d.name} 📍 {d.city}</p><p style={{fontSize:11, color:"#888"}}>{d.msg}</p></div>)}</div>}

      {page==="wallet" && <div style={{padding:16}}><h3>My Wallet 💰</h3><div style={{background:"linear-gradient(135deg,#ff1493,#8a2be2)", borderRadius:16, padding:16, marginTop:12}}><p>Coins: {user.coins}</p><p>Diamonds: {user.diamonds} 💎</p><p style={{fontSize:11, marginTop:8}}>Daily Check-in: +100 Coins (Claim)</p></div><button onClick={()=>setUser({...user, coins:user.coins+100})} style={{width:"100%", marginTop:12, background:"#222", border:"1px solid #333", padding:12, borderRadius:12, color:"#fff"}}>🎁 Claim Daily Bonus 100 Coins</button><button style={{width:"100%", marginTop:10, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, padding:12, borderRadius:12, color:"#fff"}}>Buy Coins</button></div>}

      {page==="profile" && <div style={{padding:16}}><div style={{textAlign:"center"}}><div style={{width:80, height:80, borderRadius:40, background:"linear-gradient(135deg,#ff1493,#8a2be2)", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32}}>{user.avatar}</div><h3 style={{marginTop:10}}>{user.name} ✔️</h3><p style={{fontSize:12, color:"#888"}}>ID: {user.id} · 📍 {user.city}</p><p style={{fontSize:12, color:"#888"}}>{user.bio}</p><p style={{fontSize:12, marginTop:8}}>Lv.{user.level} · 👥 {user.followers} Followers · {user.following} Following</p></div><div style={{marginTop:20}}><button style={{width:"100%", background:"#1e1e22", border:"1px solid #333", padding:12, borderRadius:12, color:"#fff", marginBottom:10}}>✏️ Edit Profile (Name, Bio, Gender, Age, DP)</button><button style={{width:"100%", background:"#1e1e22", border:"1px solid #333", padding:12, borderRadius:12, color:"#fff", marginBottom:10}}>🔒 My Rooms · Block List · Report</button><button onClick={()=>setPage("admin")} style={{width:"100%", background:"#1e1e22", border:"1px solid #333", padding:12, borderRadius:12, color:"#ff5bbd", marginBottom:10}}>⚙️ Admin Panel (Ban, Manage Gifts)</button><button onClick={()=>setUser(null)} style={{width:"100%", background:"#ff149322", border:"1px solid #ff1493", padding:12, borderRadius:12, color:"#ff5bbd"}}>Logout</button></div></div>}

      {page==="notif" && <div style={{padding:16}}><h3>Notifications 🔔</h3>{notifs.map((n,i)=><div key={i} style={{background:"#12121a", borderRadius:10, padding:12, marginTop:10, border:"1px solid #222"}}><p style={{fontSize:12}}>{n}</p></div>)}</div>}

      {page==="admin" && <div style={{padding:16}}><h3>Admin Panel ⚙️</h3><p style={{fontSize:12, color:"#888", marginTop:6}}>Only for Host / Owner</p><div style={{background:"#12121a", borderRadius:12, padding:12, marginTop:12}}><p style={{fontSize:12}}>• Ban Users</p><p style={{fontSize:12}}>• Manage Gifts Price</p><p style={{fontSize:12}}>• See Reports</p><p style={{fontSize:12}}>• Delete Rooms</p></div><button onClick={()=>setPage("profile")} style={{marginTop:12, background:"#333", border:0, padding:10, borderRadius:10, color:"#fff"}}>Back</button></div>}

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0a0a0f", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"12px 0"}}>
        <span onClick={()=>setPage("home")} style={{color: page==="home"? "#ff1493":"#777", cursor:"pointer", fontSize:12}}>🏠 Home</span>
        <span onClick={()=>setPage("dm")} style={{color: page==="dm"? "#ff1493":"#777", cursor:"pointer", fontSize:12}}>💬 DM</span>
        <span onClick={()=>setPage("wallet")} style={{color: page==="wallet"? "#ff1493":"#777", cursor:"pointer", fontSize:12}}>💰 Wallet</span>
        <span onClick={()=>setPage("profile")} style={{color: page==="profile"? "#ff1493":"#777", cursor:"pointer", fontSize:12}}>👤 Me</span>
      </div>
    </div>
  );
}
