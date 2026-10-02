import { useState, useEffect } from "react";

type User = { id: string; name: string; avatar: string; level: number; coins: number; diamonds: number; following: number; followers: number; bio: string; verified?: boolean; city?: string; };
type Room = { id: string; title: string; host: User; type: string; mics: (User|null)[]; city: string; usersCount: number; };
type Gift = { id: string; name: string; icon: string; price: number };

const GIFTS: Gift[] = [
  { id: "1", name: "Rose", icon: "🌹", price: 10 },
  { id: "2", name: "Heart", icon: "💖", price: 30 },
  { id: "3", name: "Teddy", icon: "🧸", price: 50 },
  { id: "4", name: "Car", icon: "🏎️", price: 100 },
  { id: "5", name: "Crown", icon: "👑", price: 500 },
  { id: "6", name: "Lion", icon: "🦁", price: 1000 },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [roomChat, setRoomChat] = useState<{user:string,text:string}[]>([]);
  const [chatText, setChatText] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [onMic, setOnMic] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [giftAnim, setGiftAnim] = useState<string|null>(null);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("All");

  useEffect(() => {
    const girls: User[] = [
      { id: "G1", name: "Ayesha Queen", avatar: "👩‍🦰", level: 18, coins: 5000, diamonds: 1200, following: 100, followers: 5200, bio: "Lahore ki Shehzadi", verified: true, city: "Lahore" },
      { id: "G2", name: "Sana Doll", avatar: "💃", level: 22, coins: 8000, diamonds: 2000, following: 80, followers: 8500, bio: "Karachi Queen", verified: true, city: "Karachi" },
      { id: "G3", name: "Mahi Khan", avatar: "👸", level: 15, coins: 3000, diamonds: 800, following: 60, followers: 3200, bio: "Islamabad Girl", verified: false, city: "Islamabad" },
      { id: "G4", name: "Zoya Malik", avatar: "👩", level: 12, coins: 2500, diamonds: 500, following: 40, followers: 2100, bio: "Faisalabad", verified: false, city: "Faisalabad" },
      { id: "G5", name: "Noor Fatima", avatar: "🧕", level: 20, coins: 6000, diamonds: 1500, following: 90, followers: 6200, bio: "Multan ki Hoor", verified: true, city: "Multan" },
      { id: "G6", name: "Alishba", avatar: "🌸", level: 16, coins: 4000, diamonds: 900, following: 70, followers: 4100, bio: "Gujranwala", verified: false, city: "Gujranwala" },
      { id: "G7", name: "Hoorain", avatar: "💖", level: 14, coins: 3500, diamonds: 700, following: 55, followers: 2800, bio: "Sialkot", verified: false, city: "Sialkot" },
      { id: "G8", name: "Laiba Shah", avatar: "🦋", level: 19, coins: 5500, diamonds: 1300, following: 110, followers: 5800, bio: "Rawalpindi", verified: true, city: "Rawalpindi" },
      { id: "G9", name: "Iqra Jaan", avatar: "🌙", level: 25, coins: 10000, diamonds: 3000, following: 150, followers: 10200, bio: "Lahore Night", verified: true, city: "Lahore" },
      { id: "G10", name: "Duaa Doll", avatar: "💋", level: 13, coins: 2800, diamonds: 600, following: 45, followers: 2400, bio: "Karachi", verified: false, city: "Karachi" },
    ];

    const fakeRooms: Room[] = [
      { id: "R1", title: "Late Night Gup Shup 💬", host: girls[0], type: "Chit Chat", city: "Lahore", usersCount: 128, mics: [girls[0], null, null, null, null, null, null, null] },
      { id: "R2", title: "Dil Ki Baatein - Karachi Girls", host: girls[1], type: "Dating", city: "Karachi", usersCount: 342, mics: [girls[1], girls[9], null, null, null, null, null, null] },
      { id: "R3", title: "Islamabad Chill Party 🎵", host: girls[2], type: "Music", city: "Islamabad", usersCount: 89, mics: [girls[2], null, null, null, null, null, null, null] },
      { id: "R4", title: "Faisalabad Ki Mehfil 😍", host: girls[3], type: "Chit Chat", city: "Faisalabad", usersCount: 56, mics: [girls[3], null, null, null, null, null, null, null] },
      { id: "R5", title: "Multan Ki Hoor - Voice Only", host: girls[4], type: "Friends", city: "Multan", usersCount: 210, mics: [girls[4], null, null, null, null, null, null, null] },
      { id: "R6", title: "Gujranwala Night Talks 🌹", host: girls[5], type: "Chit Chat", city: "Gujranwala", usersCount: 78, mics: [girls[5], null, null, null, null, null, null, null] },
      { id: "R7", title: "Sialkot Princess Live ✨", host: girls[6], type: "Dating", city: "Sialkot", usersCount: 95, mics: [girls[6], null, null, null, null, null, null, null] },
      { id: "R8", title: "Pindi Boys vs Girls Debate 🔥", host: girls[7], type: "Games", city: "Rawalpindi", usersCount: 165, mics: [girls[7], null, null, null, null, null, null, null] },
      { id: "R9", title: "Lahore Night - No Sleep 😘", host: girls[8], type: "Chit Chat", city: "Lahore", usersCount: 412, mics: [girls[8], girls[0], null, null, null, null, null, null] },
      { id: "R10", title: "Karachi Late Night Fun", host: girls[9], type: "Music", city: "Karachi", usersCount: 112, mics: [girls[9], null, null, null, null, null, null, null] },
    ];
    setRooms(fakeRooms);
  }, []);

  const doLogin = () => {
    if(!name ||!pass) return alert("Name aur Password likho bhai");
    setUser({ id: Date.now().toString(), name, avatar: "😎", level: 1, coins: 1000, diamonds: 0, following: 0, followers: 0, bio: "New user" });
  };

  const joinRoom = (room: Room) => {
    setActiveRoom(room);
    setRoomChat([{user:"System", text:`Welcome to ${room.host.name}'s room from ${room.city}`}]);
    setOnMic(false);
  };

  const requestMic = () => {
    if(!activeRoom ||!user) return;
    const idx = activeRoom.mics.findIndex(m=>m===null);
    if(idx===-1) return alert("All mics full");
    const newMics = [...activeRoom.mics];
    newMics[idx] = user;
    setActiveRoom({...activeRoom, mics: newMics});
    setOnMic(true);
    setIsMuted(false);
  };

  const sendGift = (gift: Gift) => {
    if(!user || user.coins < gift.price) return alert("Coins khatam! Buy karo");
    setUser({...user, coins: user.coins - gift.price});
    setGiftAnim(gift.icon);
    setRoomChat(p=>[...p, {user: user.name, text:`sent ${gift.icon} ${gift.name} to ${activeRoom?.host.name}`}]);
    setTimeout(()=>setGiftAnim(null), 2200);
    setShowGifts(false);
  };

  // FINAL LOGIN DESIGN - AS PER YOUR IMAGE
  if(!user){
    return (
      <div style={{background:"#0a0a0a", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"sans-serif"}}>
        <div style={{width:"100%", maxWidth:360}}>
          <div style={{textAlign:"center", marginBottom:28}}>
            <div style={{width:120, height:120, borderRadius:60, background:"linear-gradient(135deg,#ff2e9a,#8a2be2)", padding:4, margin:"0 auto", boxShadow:"0 0 30px rgba(255,46,154,0.5)"}}>
              <div style={{width:"100%", height:"100%", background:"#0a0a0a", borderRadius:60, display:"flex", alignItems:"center", justifyContent:"center"}}>
                <span style={{fontSize:54, fontWeight:900, background:"linear-gradient(135deg,#ff2e9a,#7b2bff)", WebkitBackgroundClip:"text", color:"transparent", fontStyle:"italic", letterSpacing:2}}>L</span>
              </div>
            </div>
            <h1 style={{color:"#fff", fontSize:28, fontWeight:600, margin:"18px 0 4px", letterSpacing:0.5}}>LaachiLive</h1>
            <p style={{color:"#888", fontSize:13, letterSpacing:1.5}}>Connect · Talk · Live</p>
          </div>

          <label style={{color:"#aaa", fontSize:13, marginBottom:6, display:"block"}}>Name</label>
          <div style={{display:"flex", alignItems:"center", background:"#1e1e22", borderRadius:14, padding:"13px 14px", marginBottom:16, border:"1px solid #2a2a30"}}>
            <span style={{marginRight:10, opacity:0.6}}>👤</span>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" style={{background:"transparent", border:0, color:"#fff", width:"100%", outline:"none", fontSize:14}}/>
          </div>

          <label style={{color:"#aaa", fontSize:13, marginBottom:6, display:"block"}}>Password</label>
          <div style={{display:"flex", alignItems:"center", background:"#1e1e22", borderRadius:14, padding:"13px 14px", border:"1px solid #2a2a30"}}>
            <span style={{marginRight:10, opacity:0.6}}>🔒</span>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Enter your password" style={{background:"transparent", border:0, color:"#fff", width:"100%", outline:"none", fontSize:14}}/>
            <span style={{opacity:0.6}}>👁️</span>
          </div>

          <button onClick={doLogin} style={{width:"100%", marginTop:22, background:"linear-gradient(90deg,#ff5bbd,#8a2be2)", border:0, padding:"13px", borderRadius:14, color:"#fff", fontWeight:"bold", fontSize:16, cursor:"pointer"}}>Login</button>
          <p style={{textAlign:"center", color:"#ff5bbd", fontSize:13, marginTop:14, cursor:"pointer"}}>Forgot Password?</p>
          <p style={{textAlign:"center", color:"#888", fontSize:13, marginTop:18}}>Don't have an account? <span onClick={()=>setIsSignup(!isSignup)} style={{color:"#d36cff", fontWeight:"bold", cursor:"pointer"}}>Sign up</span></p>
        </div>
      </div>
    );
  }

  // AUDIO ROOM PAGE
  if(activeRoom){
    return (
      <div style={{background:"#000", minHeight:"100vh", display:"flex", flexDirection:"column", color:"#fff"}}>
        <div style={{display:"flex", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #222", alignItems:"center"}}>
          <span onClick={()=>setActiveRoom(null)} style={{fontSize:20, cursor:"pointer"}}>✕</span>
          <div style={{textAlign:"center"}}><p style={{fontSize:14, fontWeight:"bold"}}>{activeRoom.title}</p><p style={{fontSize:10, color:"#ff5bbd"}}>📍 {activeRoom.city} · Host: {activeRoom.host.name}</p></div>
          <span style={{fontSize:12}}>👥 {activeRoom.usersCount}</span>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, padding:20}}>
          {activeRoom.mics.map((m,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{width:62, height:62, borderRadius:31, background: m? "linear-gradient(135deg,#ff1493,#8a2be2)" : "#1a1a1a", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", border: m? "2px solid #ff1493" : "2px dashed #333", fontSize:24}}>{m? m.avatar : "+"}</div>
              <p style={{fontSize:10, marginTop:6, color: m? "#fff" : "#555"}}>{m? m.name.split(" ")[0] : `Mic ${i+1}`}</p>
              {m && <p style={{fontSize:8, color:"#ff5bbd"}}>{i===0? "HOST" : "Speaker"}</p>}
            </div>
          ))}
        </div>

        {giftAnim && <div style={{position:"fixed", top:"38%", left:"50%", transform:"translate(-50%,-50%)", fontSize:110, zIndex:50}}>{giftAnim}</div>}

        <div style={{flex:1, background:"#0e0e12", borderRadius:"20px 20px 0 0", padding:12, display:"flex", flexDirection:"column"}}>
          <div style={{flex:1, overflowY:"auto", maxHeight:260}}>
            {roomChat.map((c,i)=><p key={i} style={{fontSize:13, margin:"7px 0"}}><span style={{color:"#ff5bbd", fontWeight:"bold"}}>{c.user}:</span> {c.text}</p>)}
          </div>
          <div style={{display:"flex", gap:8, marginTop:10}}>
            <input value={chatText} onChange={e=>setChatText(e.target.value)} placeholder={`Message in ${activeRoom.city}...`} style={{flex:1, background:"#1e1e22", border:"1px solid #333", borderRadius:20, padding:"10px 14px", color:"#fff", outline:"none"}}/>
            <button onClick={()=>{ if(chatText){ setRoomChat(p=>[...p,{user:user.name, text:chatText}]); setChatText(""); } }} style={{background:"#ff1493", border:0, borderRadius:20, padding:"0 18px", color:"#fff"}}>Send</button>
          </div>
          <div style={{display:"flex", justifyContent:"space-around", marginTop:14, paddingTop:12, borderTop:"1px solid #222"}}>
            <button onClick={()=>setIsMuted(!isMuted)} style={{background: isMuted? "#222" : "#ff1493", border:0, borderRadius:20, padding:"8px 14px", color:"#fff", fontSize:12}}>{isMuted? "🔇 Off" : "🎙️ On"}</button>
            <button onClick={requestMic} disabled={onMic} style={{background: onMic? "#333" : "#2a2a30", border:0, borderRadius:20, padding:"8px 14px", color:"#fff", fontSize:12}}>🙋 Request Mic</button>
            <button onClick={()=>setShowGifts(!showGifts)} style={{background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, borderRadius:20, padding:"8px 18px", color:"#fff", fontSize:12}}>🎁 Gift</button>
          </div>
          {showGifts && <div style={{display:"flex", gap:8, marginTop:10, overflowX:"auto", paddingBottom:6}}>{GIFTS.map(g=><div key={g.id} onClick={()=>sendGift(g)} style={{background:"#1e1e22", borderRadius:12, padding:10, textAlign:"center", minWidth:64, cursor:"pointer", border:"1px solid #333"}}><div style={{fontSize:22}}>{g.icon}</div><p style={{fontSize:9, marginTop:4}}>{g.name}</p><p style={{fontSize:10, color:"#ff5bbd"}}>{g.price}</p></div>)}</div>}
        </div>
      </div>
    );
  }

  // HOME PAGE WITH GIRLS + CITIES
  return (
    <div style={{background:"#000", minHeight:"100vh", color:"#fff", paddingBottom:70}}>
      <div style={{padding:16, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2 style={{fontSize:20, fontWeight:"bold"}}>LaachiLive <span style={{fontSize:10, background:"linear-gradient(90deg,#ff1493,#8a2be2)", padding:"3px 8px", borderRadius:10, marginLeft:6}}>LIVE</span></h2>
        <span style={{background:"#1e1e22", padding:"5px 12px", borderRadius:12, fontSize:12}}>💰 {user.coins}</span>
      </div>

      <div style={{display:"flex", gap:8, padding:"0 16px", overflowX:"auto", paddingBottom:4}}>
        {["All","Lahore","Karachi","Islamabad","Faisalabad","Multan","Gujranwala","Sialkot","Rawalpindi"].map(c=><span key={c} onClick={()=>setFilterCity(c)} style={{background: filterCity===c? "linear-gradient(90deg,#ff1493,#8a2be2)" : "#1e1e22", padding:"6px 14px", borderRadius:20, fontSize:12, whiteSpace:"nowrap", cursor:"pointer"}}>{c}</span>)}
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search rooms, girls, city..." style={{margin:"12px 16px", width:"calc(100% - 32px)", background:"#1e1e22", border:"1px solid #2a2a30", borderRadius:12, padding:"11px 14px", color:"#fff", outline:"none"}}/>

      <div style={{padding:"0 16px 16px"}}>
        {rooms.filter(r => (filterCity==="All" || r.city===filterCity) && r.title.toLowerCase().includes(search.toLowerCase())).map(room=>(
          <div key={room.id} onClick={()=>joinRoom(room)} style={{background:"#12121a", borderRadius:16, padding:14, marginBottom:12, border:"1px solid #222", cursor:"pointer"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <span style={{fontSize:10, background:"#ff149322", color:"#ff5bbd", padding:"3px 8px", borderRadius:10}}>{room.type}</span>
              <span style={{fontSize:11, color:"#ff5bbd"}}>📍 {room.city}</span>
            </div>
            <p style={{fontWeight:"bold", margin:"8px 0 4px", fontSize:14}}>{room.title}</p>
            <div style={{display:"flex", alignItems:"center", gap:8, marginTop:6}}>
              <div style={{width:32, height:32, borderRadius:16, background:"linear-gradient(135deg,#ff1493,#8a2be2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16}}>{room.host.avatar}</div>
              <div>
                <p style={{fontSize:13, fontWeight:"500"}}>{room.host.name} {room.host.verified && "✔️"}</p>
                <p style={{fontSize:10, color:"#777"}}>LIVE from {room.city} · 👥 {room.usersCount} · Lv.{room.host.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button style={{position:"fixed", bottom:80, right:16, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, borderRadius:25, padding:"12px 20px", color:"#fff", fontWeight:"bold", boxShadow:"0 4px 15px rgba(255,20,147,0.4)"}}>+ Create Room</button>

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0a0a0f", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"12px 0"}}>
        <span style={{color:"#ff1493"}}>🏠 Home</span><span style={{color:"#666"}}>💬 Chat</span><span style={{color:"#666"}}>💰 Wallet</span><span style={{color:"#666"}}>👤 Me</span>
      </div>
    </div>
  );
}
