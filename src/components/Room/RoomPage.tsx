import { useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function RoomPage(props: any) {
  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    const roomFromPath = window.location.pathname.split("/").pop();
    const roomID = props?.room?.id || props?.room?.name || roomFromPath || urlParams.get("room") || "laachi123";

    const appID = 854290603;
    const serverSecret = "fb2e60c721c96f79f77d12ee78c3f9e481d47292f731fb0624c5097a6bac4254";

    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "User" + userID;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.getElementById("root") as HTMLElement,
      scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
      showPreJoinView: false,
    });
  }, []);

  return <div style={{ width: "100vw", height: "100vh" }} />;
}
