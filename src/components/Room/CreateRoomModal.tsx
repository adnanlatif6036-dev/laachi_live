import styles from './CreateRoom.module.css'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function CreateRoom() {
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')

  const createRealRoom = async () => {
    if(!title) return alert('Title likho janam')
    const { error } = await supabase.from('rooms').insert({
      title, topic, is_live: true
    })
    if(!error) alert('Real Room Ban Gaya!')
  }

  return (
    <div className={styles.creamBg}>
      <div className={styles.card}>
        <h2>Room Title</h2>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Weekend Discussion" />
        <h2>Topic</h2>
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. Music, Talk" />
        <button onClick={createRealRoom}>Create Room</button>
      </div>
    </div>
  )
}
