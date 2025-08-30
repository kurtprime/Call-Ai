"use client";

import LoadingState from "@/components/Loading";
import { authClient } from "@/lib/auth-client";
import ChatUi from "./ChatUi";

interface Props {
  meetingId: string;
  meetingName: string;
}

export default function ChatProvider({ meetingId, meetingName }: Props) {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data)
    return (
      <LoadingState
        title="Loading chat..."
        description="Please wait while we load the chat."
      />
    );
  return (
    <ChatUi
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? ""}
    />
  );
}
