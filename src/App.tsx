
import { useState } from "react";

const rooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("laachi_user");
    return s ? JSON.parse(s) : null;
  });
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const handleSignUp = () => {
    if(!name || !pass){ alert("نام اور پاسورڈ لکھیں"); return; }
    localStorage.setItem("
