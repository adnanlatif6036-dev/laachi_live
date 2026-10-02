import { useState } from "react";

const initialRooms = [
  { id: "L", name: "Laachi Queen", cat: "Desi", color: "#ff1493", viewers: "2.1k" },
  { id: "J", name: "Jalalpur Doll", cat: "Punjabi", color: "#8a2be2", viewers: "1.8k" },
  { id: "G", name: "Gujrat Rose", cat: "New", color: "#00bfff", viewers: "890" },
  { id: "P", name: "Pari", cat: "Trending", color: "#ff8c00", viewers: "3.2k" },
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);
  const [tab, setTab] = useState("home");
  const [rooms, setRooms] = useState(() => {
    const s = localStorage.getItem("laachi_rooms");
    return s? JSON.parse(s) : initialRooms;
  });
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("laachi_user");
    return s? JSON.parse(s) : null;
  });
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomCat, setNewRoomCat] = useState("Desi");
  const [seats, setSeats] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chats, setChats] = useState<string[]>(["Welcome to LaachiLive! 🎉"]);
  const myId = useState(() => Math.floor(Math.random() * 90000) + 10000)[0];

  const openRoom = (r: any) => {
    setSelected(r);
    const init = Array.from({ length: 25 }, (_, i) => i === 0? { name: user.name, muted: false, isHost: true } : null);
    setSeats(init);
    setChats([`Welcome to ${r.name}! 🎉`, `${user.name} joined as Host 👑`]);
  };

  const saveRooms = (nr: any[]) => { setRooms(nr); localStorage.setItem("laachi_rooms", JSON.stringify(nr)); };

  const handleCreateRoom = () => {
    if (!newRoomName) return alert("Room ka naam likho!");
    const colors = ["#ff1493", "#8a2be2", "#00bfff", "#ff8c00", "#00ff7f"];
    const newRoom = { id: newRoomName[0].toUpperCase(), name: newRoomName, cat: newRoomCat, color: colors[Math.floor(Math.random() * 5)], viewers: "1", owner: user.name };
    saveRooms([newRoom,...rooms]);
    setNewRoomName(""); setShowCreate(false); setTab("home");
  };

  const doSignUp = () => { if (!name ||!pass) return alert("Naam likho"); if (localStorage.getItem(`user_${name}`)) return alert("Naam pehle se hai!"); localStorage.setItem(`user_${name}`, pass); localStorage.setItem("laachi_user", JSON.stringify({ name })); setUser({ name }); };
  const doLogin = () => { if (!name ||!pass) return alert("Naam likho"); const sp = localStorage.getItem(`user_${name}`); if (!sp) return alert("Naam nahi mila!"); if (sp!== pass) return alert("Password galat!"); localStorage.setItem("laachi_user", JSON.stringify({ name })); setUser({ name }); };
  const googleLogin = () => { const gName = "Umais Google"; localStorage.setItem("laachi_user", JSON.stringify({ name: gName })); setUser({ name: gName }); };
  const logout = () => { localStorage.removeItem("laachi_user"); setUser(null); setSelected(null); setTab("home"); };

  const sitOnSeat = (idx: number) => {
    if (seats[idx]) return;
    if (seats.some((s: any) => s?.name === user.name)) return alert("Aap pehle se ek seat par ho! Pehle wali choro");
    const ns = [...seats]; ns[idx] = { name: user.name, muted: false, isHost: false }; setSeats(ns);
