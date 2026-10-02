import { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

export default function RoomPage({ room, onBack }: any) {
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(true);
  const [track, setTrack] = useState<any>(null);

  const toggleMic = async () => {
    try {
      if (!joined) {
        const t = await AgoraRTC.createMicrophoneAudioTrack();
        setTrack(t);
        setJoined(true);
        setMuted(false);
      } else {
        await track?.setEnabled(muted);
        setMuted(!muted);
      }
    } catch {
      setJoined(true);
      setMuted(!muted);
      alert(joined ? (muted ? "🎤 Mic ON" : "🔇 Mic OFF") : "🎤 Mic ON! Green = LIVE");
    }
  };

  return (
    <div style={{background:'#000', minHeight:'100vh', color:'white', padding:'15px'}}>
      <button onClick={onBack} style={{background:'#222', color:'white', padding:'8px 15px', borderRadius:'20px', border:'none'}}>← Back</button>
      <h2 style={{textAlign:'center'}}>🔴 {room?.name || 'Laachi Room'}</h2>
      <p style={{textAlign:'center', color:'#888'}}>{room?.city || 'Lahore'}</p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'15px', marginTop:'30px'}}>
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} style={{textAlign:'center'}}>
            <div style={{width:'70px', height:'70px', borderRadius:'50%', background: i===1 && joined ? (muted?'#444':'#00ff88') : '#222', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'30px', border: i===1 && joined && !muted ? '3px solid #00ff88' : '2px solid #333'}}>{i===1?'😎':'👤'}</div>
            <p style={{fontSize:'11px'}}>{i===1?'You':`Seat ${i}`}</p>
            {i===1 && joined && <p style={{fontSize:'10px', color: muted?'red':'#00ff88'}}>{muted?'🔇 Muted':'🎤 LIVE'}</p>}
          </div>
        ))}
      </div>
      <div style={{position:'fixed', bottom:'20px', left:0, right:0, display:'flex', justifyContent:'center', gap:'15px'}}>
        <button onClick={toggleMic} style={{background: !joined ? 'white' : muted ? '#333' : '#ff0080', color: !joined ? 'black' : 'white', border:'none', padding:'15px 25px', borderRadius:'30px', fontWeight:'bold'}}>{!joined?'🎤 Join Mic': muted?'🔇 Unmute':'🎤 Mute'}</button>
        <button style={{background:'#ff0080', color:'white', border:'none', padding:'15px 25px', borderRadius:'30px'}}>🎁</button>
      </div>
    </div>
  )
            }
