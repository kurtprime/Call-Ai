"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import MeetingIdViewHeader from "../components/MeetingIdViewHeader";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import UpdateMeetingDialog from "../components/UpdateMeetingDialog";

interface Props {
  meetingId: string;
}

export default function MeetingIdView({ meetingId }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [updateMeetingDialog, setUpdateMeetingDialog] = useState(false);
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you Sure?",
    "The following action will remove this meeting"
  );

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialog}
        onOpenChange={setUpdateMeetingDialog}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4 ">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialog(true)}
          onRemove={handleRemoveMeeting}
        />
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
}
