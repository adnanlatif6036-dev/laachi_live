import styles from './CreateRoom.module.css'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function CreateRoomModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')

  const createRoom = async () => {
    if(!title) return alert('Title likho')
    const { error } = await supabase.from('rooms').insert([{ title, topic, is_live: true }])
    if(!error){ alert('Real Room Ban Gaya!'); onClose() }
  }

  return (
    <div className={styles.creamBg}>
      <div className={styles.card}>
        <h2>Room Title</h2>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Weekend Talk" />
        <h2>Topic</h2>
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Music, Chat" />
        <button onClick={createRoom}>Create Room</button>
        <button onClick={onClose} style={{background:'#ddd', color:'#000', marginTop:'10px'}}>Close</button>
      </div>
    </div>
  )
}
