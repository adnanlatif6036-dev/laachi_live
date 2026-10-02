import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function RoomPage(props: any) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const roomID = props?.room?.id || window.location.pathname.split("/").pop() || "laachi123";
    const appID = 854290603;
    const serverSecret = "68aca8cef7ac7cc1df6165512e7c61d8";

    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "User_" + userID;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (divRef.current) {
      zp.joinRoom({
        container: divRef.current as any,
        scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
        showPreJoinView: false,
      } as any);
    }
  }, []);

  return <div ref={divRef} style={{ width: "100vw", height: "100vh" }} />;
}
