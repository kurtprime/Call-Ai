import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import CallLobby from "./CallLobby";
import CallActive from "./CallActive";
import CallEnded from "./CallEnded";

interface Props {
  meetingName: string;
}

export default function CallUi({ meetingName }: Props) {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    await call.join();

    setShow("call");
  };

  const handleLeave = async () => {
    if (!call) return;
    call.endCall();

    setShow("ended");
  };

  return (
    <StreamTheme className="h-full ">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
}
