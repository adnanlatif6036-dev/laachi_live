import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqzckcg_BKLkkQQ54UhVaxFfFToFGha7E",
  authDomain: "chill-masti-live-make-friends.firebaseapp.com",
  projectId: "chill-masti-live-make-friends",
  storageBucket: "chill-masti-live-make-friends.firebasestorage.app",
  messagingSenderId: "5871111249525",
  appId: "1:587111249525:web:56688e8817f49424f42ea3c",
  measurementId: "G-1X9HY9LSSZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("laachi_user");
    return s ? JSON.parse(s) : null;
  });

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
      };
      localStorage.setItem("laachi_user", JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h1 style={{ color: '#ff00a0', fontSize: '32px', marginBottom: '20px' }}>Laachi Live</h1>
      {!user ? (
        <button onClick={googleLogin} style={{ background: '#fff', color: '#000', padding: '12px 24px', borderRadius: '25px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          Continue with Google
        </button>
      ) : (
        <h1>Welcome {user.name}</h1>
      )}
    </div>
  );
}

export default App;
