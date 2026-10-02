interface RoomPageProps {
  room: any;
  onBack: () => void;
  userName?: string;
}

export default function RoomPage({ room, onBack, userName }: RoomPageProps) {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <button onClick={onBack} className="bg-[#222] px-4 py-2 rounded-full">Back</button>
      <h2 className="text-2xl mt-6">Room: {room?.name || room?.id || "Test Room"}</h2>
      <p className="text-gray-400">User: {userName}</p>
      <div className="mt-6 w-full h-[400px] bg-[#111] rounded-xl flex items-center justify-center">
        Zego Room Yahan Ayega
      </div>
    </div>
  );
}
