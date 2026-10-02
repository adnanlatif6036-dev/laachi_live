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
  const [name, setName] = useState(""); const [pass, setPass] = useState(""); const [showPass, setShowPass] = useState(false);
  const [showCreate, setShowCreate] = useState(false); const [newRoomName, setNewRoomName] = useState(""); const [newRoomCat, setNewRoomCat] = useState("Desi");
  const [seats, setSeats] = useState<any[]>([]); const [isMuted, setIsMuted] = useState(false); const [chatMsg, setChatMsg] = useState(""); const [chats, setChats] = useState<string[]>(["Welcome to LaachiLive! 🎉"]);
  const myId = useState(() => Math.floor(Math.random()*90000)+10000)[0];

  const openRoom = (r: any) => {
    setSelected(r);
    // 20 seats, host = you on seat 0
    const initialSeats = Array.from({length:20}, (_,i) => i===0? { name: user.name, muted: false, isHost: true } : null);
    setSeats(initialSeats);
    setChats([`Welcome to ${r.name} room! 🎉`, `${user.name} joined as Host 👑`]);
  };

  const saveRooms = (nr: any[]) => { setRooms(nr); localStorage.setItem("laachi_rooms", JSON.stringify(nr)); };
  const handleCreateRoom = () => {
    if (!newRoomName) return alert("Room ka naam likho!");
    const colors = ["#ff1493","#8a2be2","#00bfff
