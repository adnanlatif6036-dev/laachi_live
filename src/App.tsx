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
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("laachi_user");
    return s ? JSON.parse(s) : null;
  });

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
       
