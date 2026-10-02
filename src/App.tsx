import { useState } from 'react'
import CityFilter from './components/Home/CityFilter'
import RoomCard from './components/Home/RoomCard'
import CreateRoomModal from './components/Room/CreateRoomModal'
import WalletPage from './components/Wallet/WalletPage'
import RoomPage from './components/Room/RoomPage'
import ProfilePage from './components/Profile/ProfilePage'
import fakeRoomsData from './data/fakeRooms'

export default function App(){
  const [isLogin, setIsLogin] = useState(false)
  const [view, setView] = useState('home')
  const [rooms, setRooms] = useState(fakeRoomsData)
  const [city, setCity] = useState('All')
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Chit Chat')
  const [city2, setCity2] = useState('Lahore')
  const [coins, setCoins] = useState(1250)
  const [chat, setChat] = useState([{user:"Ali", text:"Welcome ❤️"}, {user:"Sara", text:"Hi Lahore!"}])
  const [msg, setMsg] = useState('')
  const filtered = city==='All' ? rooms : rooms.filter((r:any)=>r.city===city)
  const handleCreate = () => {
    if(!title) return alert("Title likho")
    const newRoom = {id:Date.now(), title, city:city2, type, usersCount:1, mics:[{avatar:"😎"},null,null,null,null,null,null,null]}
    setRooms([newRoom, ...rooms]); setShowCreate(false); setTitle('')
  }
  if(!isLogin){
    return (
      <div style={{minHeight:"100vh", background:"#000", display:"flex", alignItems:"center", justifyContent:"center", padding:20}}>
        <div style={{background:"#1a1a1a", padding:30, borderRadius:20, width:"100%", maxWidth:340, textAlign:"center", border:"1px solid #333"}}>
          <h1 style={{color:"#ff1493", fontSize:36, margin:0}}>Laachi Live</h1>
          <p style={{color:"#aaa", marginTop:8}}>Pakistan Voice Chat</p>
          <button onClick={()=>setIsLogin(true)} style={{marginTop:20, width:"100%", padding:14, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, color:"#fff", borderRadius:12, fontWeight:"bold"}}>Enter App 🚀</button>
        </div>
      </div>
    )
  }
  if(view==='wallet') return <WalletPage coins={coins} onBack={()=>setView('home')} />
  if(view==='profile') return <ProfilePage coins={coins} onBack={()=>setView('home')} />
  if(view==='room' && selectedRoom){
  return <RoomPage room={selectedRoom} onBack={()=>setView('home')} />
                                                                  
    
  
  return (
    <div style={{minHeight:"100vh", background:"#000", color:"#fff", paddingBottom:80}}>
      <div style={{padding:16, background:"#111", position:"sticky", top:0, borderBottom:"1px solid #222"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h2 style={{margin:0, color:"#ff1493"}}>Laachi Live 🔴</h2>
          <div style={{display:"flex", gap:8}}>
            <button onClick={()=>setView('wallet')} style={{background:"#1a1a1a", color:"#FFD700", border:"1px solid #333", padding:"6px 10px", borderRadius:20}}>💰 {coins}</button>
            <button onClick={()=>setView('profile')} style={{background:"#1a1a1a", color:"#fff", border:"1px solid #333", padding:"6px 10px", borderRadius:20}}>👤</button>
          </div>
        </div>
        <CityFilter city={city} setCity={setCity} />
      </div>
      <div style={{padding:12}}>
        {filtered.map((room:any)=><div key={room.id} onClick={()=>{setSelectedRoom(room); setView('room')}}><RoomCard room={room} /></div>)}
      </div>
      <button onClick={()=>setShowCreate(true)} style={{position:"fixed", bottom:20, right:20, width:56, height:56, borderRadius:28, background:"linear-gradient(90deg,#ff1493,#8a2be2)", border:0, color:"#fff", fontSize:28}}>+</button>
      <CreateRoomModal show={showCreate} setShow={setShowCreate} title={title} setTitle={setTitle} type={type} setType={setType} city={city2} setCity={setCity2} onCreate={handleCreate} />
    </div>
  )
}
