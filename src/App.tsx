import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

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

function App() {
  const [user, setUser] = useState<any>(null);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      alert("Login failed: " + error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
      <h1>Laachi Live</h1>
      {user ? (
        <div>
          <h2>Welcome {user.displayName} ❤️</h2>
          <img src={user.photoURL} width="90" style={{ borderRadius: "50%" }} />
          <p>{user.email}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      ) : (
        <button
          onClick={loginWithGoogle}
          style={{ padding: "14px 24px", fontSize: "18px", background: "black", color: "white", borderRadius: "8px", cursor: "pointer" }}
        >
          Login with Google
        </button>
      )}
    </div>
  );
}

export default App;
