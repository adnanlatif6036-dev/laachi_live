import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function RoomPage() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!el.current) return;
    const roomID = "laachi123";
    const token = "YAHAN_NAYA_TOKEN_PASTE_KARNA"; // <-- yahan naya 04AAAA wala
    const zp = ZegoUIKitPrebuilt.create(token);
    zp.joinRoom({
      container: el.current,
      scenario: { mode: ZegoUIKitPrebuilt.LiveAudioRoom },
      showPreJoinView: false,
    } as any);
  }, []);
  return <div ref={el} style={{width:"100vw",height:"100vh",background:"#000"}} />;
}
