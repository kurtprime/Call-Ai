"use client";

import { MeetingGetOne } from "@/modules/meetings/types";
import { Loader } from "lucide-react";
import CallConnect from "./CallConnect";
import GeneratedAvatarUri from "@/lib/avatar";

interface Props {
  meetingData: MeetingGetOne;
}

export default function CallProvider({ meetingData }: Props) {
  const { user } = meetingData;

  return (
    <CallConnect
      meetingId={meetingData.id}
      meetingName={meetingData.name}
      userId={user.id}
      userName={user.name}
      userImage={
        user.image ??
        GeneratedAvatarUri({
          seed: user.name,
          variant: "initials",
        })
      }
    />
  );
}

export const CallLoader = ({ title }: { title?: string }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
      <div className="flex flex-row items-center gap-4">
        <Loader className="animate-spin size-6 text-foreground" />
        {title && <p className="text-foreground">{title}</p>}
      </div>
    </div>
  );
};
