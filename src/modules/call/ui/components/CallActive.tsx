import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export default function CallActive({ onLeave, meetingName }: Props) {
  return (
    <div className="flex flex-col bg-primary-foreground justify-between p-4 h-full text-foreground ">
      <div className="bg-secondary rounded-full p-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center justify-center p-1 bg-secondary/10 rounded-full w-fit"
        >
          <Image src="/logo.svg" width={22} height={22} alt="Logo" />
        </Link>
        <h4 className="text-base ">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className="bg-secondary rounded-lg px-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
}
