import { useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import RoomPage from "./components/Room/RoomPage";

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  if (!user) {
    return <LoginPage onLogin={(name: string) => setUser(name)} />;
  }

  if (selectedRoom) {
    return <RoomPage room={selectedRoom} onBack={() => setSelectedRoom(null)} userName={user} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl">Welcome {user}</h1>
      <button onClick={() => setSelectedRoom({ id: "123", name: "Laachi Room 1" })} className="mt-6 bg-gradient-to-r from-[#ff5ca8] to-[#8e2cff] px-6 py-3 rounded-full">
        Join Room
      </button>
    </div>
  );
}

export default App;
