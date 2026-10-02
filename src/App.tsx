import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
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
      console.log("Login Success:", result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Laachi Live</h1>
      {user ? (
        <div>
          <h2>Welcome {user.displayName}</h2>
          <img src={user.photoURL} width="80" style={{ borderRadius: "50%" }} />
          <p>{user.email}</p>
        </div>
      ) : (
        <button
          onClick={loginWithGoogle}
          style={{ padding: "12px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Login with Google
        </button>
      )}
    </div>
  );
}

export default App;
