import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCqzckg_BKLkkQ5U4NnWxfFoGha7E",
  authDomain: "chill-masti-live-make-friends.firebaseapp.com",
  projectId: "chill-masti-live-make-friends",
  storageBucket: "chill-masti-live-make-friends.firebasestorage.app",
  messagingSenderId: "587111249525",
  appId: "1:587111249525:web:56680e881749424f42ea3c",
  measurementId: "G-1X0HY9LSSZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const fakeRooms = [
  { id: 1, name: "Dil Walon Ki Mehfil ❤️", host: "Ayesha Queen", users: 124, img: "https://i.pravatar.cc/150?img=5" },
  { id: 2, name: "Punjab Da Chat Room 🔥", host: "Adnan Bhai", users: 98, img: "https://i.pravatar.cc/150?img=8" },
  { id: 3, name: "Late Night Gupshup 🌙", host: "Zainab", users: 76, img: "https://i.pravatar.cc/150?img=9" },
  { id: 4, name: "Friends Forever Club", host: "Ali Raza", users: 210, img: "https://i.pravatar.cc/150?img=12" },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRedirectResult(auth).catch(()=>{});
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = () => signInWithRedirect(auth, provider);

  if (loading) return <div style={{textAlign:'center', marginTop:100, fontFamily:'sans-serif'}}>Loading Laachi Live...</div>;

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif' }}>
        <div style={{ background:'white', padding: '40px 30px', borderRadius: '24px', textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.3)', maxWidth: '350px', width:'90%' }}>
          <h1 style={{ fontSize:'32px', margin:0 }}>Laachi Live</h1>
          <p style={{ color:'#666', marginTop:8 }}>Chill, Masti, Live - Make Friends</p>
          <div style={{ margin:'30px 0', fontSize:'50px' }}>🎙️✨</div>
          <button onClick={login} style={{ width:'100%', padding:'14px', fontSize:'16px', background:'black', color:'white', border:'none', borderRadius:'12px', cursor:'pointer', fontWeight:'bold' }}>
            Continue with Google
          </button>
          <p style={{ fontSize:'12px', color:'#999', marginTop:15 }}>Secure login with Firebase</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f5f5f7', fontFamily:'sans-serif' }}>
      <div style={{ background:'white', padding:'12px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 10px rgba(0,0,0,0.05)', position:'sticky', top:0 }}>
        <h2 style={{ margin:0 }}>Laachi Live 🔴</h2>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <img src={user.photoURL || ''} style={{ width:32, height:32, borderRadius:'50%' }} />
          <button onClick={()=>signOut(auth)} style={{ padding:'6px 12px', borderRadius:8, border:'1px solid #ddd', background:'white', cursor:'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ padding:'20px' }}>
        <h3>Welcome, {user.displayName?.split(' ')[0]} ❤️</h3>
        <p style={{ color:'#666', marginTop:-10 }}>{fakeRooms.length} Live Rooms • 1.2k Online Users</p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:20 }}>
          {fakeRooms.map(room => (
            <div key={room.id} style={{ background:'white', borderRadius:16, padding:12, boxShadow:'0 4px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <img src={room.img} style={{ width:40, height:40, borderRadius:'50%' }} />
                <div>
                  <div style={{ fontWeight:'bold', fontSize:'13px' }}>{room.host}</div>
                  <div style={{ fontSize:'11px', color:'#888' }}>🔴 LIVE</div>
                </div>
              </div>
              <div style={{ marginTop:10, fontWeight:'bold', fontSize:'14px' }}>{room.name}</div>
              <div style={{ marginTop:6, fontSize:'12px', color:'#666' }}>👥 {room.users} listening</div>
              <button style={{ marginTop:10, width:'100%', padding:'8px', background:'#7c3aed', color:'white', border:'none', borderRadius:8, cursor:'pointer' }}>Join Room</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
