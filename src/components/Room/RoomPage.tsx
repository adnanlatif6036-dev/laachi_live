import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function RoomPage() {
  const { roomId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current ||!roomId) return;

    const appID = 854290603;
    const serverSecret = "fb2e60c721c96f79f77d12ee78c3f9e481d47292f731fb0624c5097a6bac4254";

    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "User_" + userID;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.LiveAudioRoom },
      showTextChat: true,
      showUserList: true,
      showPreJoinView: false,
    });

    return () => zp.destroy();
  }, [roomId]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}
