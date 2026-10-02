import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function RoomPage() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    // Aapka REAL token jo abhi generate kiya
    const kitToken = "04AAAAAGrBbdgADMz6HDhKwCjXKL9p0ACuXbZydok84clVrlj9cV/66pOpESRbdzDKaYKtnMljB5wahQHIU8MsT2Rix+PibwNzJ1bShZTz8+n4vFjB8IvKMCfSKtHxkVompVG/Wai+bw/uHGPZDwdhKoaS/wfqdOfsHPCJqZnDsgbeIGxKifCh2CH4Mk3cT+soy/0G6eEbC/EOAihH+UVq2y+QYt3AKhSMk5dit2gK811bkBT5G8JzY5+C9bDLE4JtkFNM6UR2AQ==";

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    
    zp.joinRoom({
      container: divRef.current as any,
      scenario: { mode: ZegoUIKitPrebuilt.LiveAudioRoom },
      showPreJoinView: false,
    } as any);
  }, []);

  return <div ref={divRef} style={{width:"100vw",height:"100vh",background:"#000"}} />;
}
