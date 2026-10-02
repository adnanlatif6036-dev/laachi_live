import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function RoomPage(props: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const join = async () => {
      if (!containerRef.current) return;

      const roomID = props?.room?.id || window.location.pathname.split("/").pop() || "laachi123";
      
      const appID = 854290603;
      const serverSecret = "68aca8cef7ac7cc1df6165512e7c61d8";

      const userID = Math.floor(Math.random() * 10000) + "";
      const userName = "User_" + userID;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current as Element,
        scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
        showPreJoinView: false,
        showScreenSharingButton: false,
      });
    };
    join();
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh", background: "#000" }} />;
}
