import { useEffect, useState } from "react"
import RoomCard from "./components/Home/RoomCard"
import RoomPage from "./components/Room/RoomPage"
import { supabase } from "./lib/supabase"

export default function App(){
  const [rooms, setRooms] = useState<any[]>([])
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchRealRooms = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('rooms').select('*').eq('is_live', true).order('created_at', {ascending: false})
    if(!error && data) setRooms(data)
    setLoading(false)
  }

  useEffect(()=>{ fetchRealRooms() }, [])

  if(selectedRoom){
    return <RoomPage room={selectedRoom} onBack={()=>{ setSelectedRoom(null); fetchRealRooms() }} userName="Adnan" />
  }

  return (
    <div style={{minHeight:"100vh", background:"#0d0d0d", color:"white", padding:"16px"}}>
      <h1 style={{fontSize:20, fontWeight:700, marginBottom:12}}>Laachi Live 🔴</h1>
      {loading ? <div>Real Rooms Loading...</div> : 
        rooms.length === 0 ? <div style={{color:"#888", marginTop:20}}>Koi Real Room nahi hai. Create Room karo!</div> :
        rooms.map((room)=> <RoomCard key={room.id} room={room} onJoin={()=> setSelectedRoom(room)} />)
      }
    </div>
  )
}
