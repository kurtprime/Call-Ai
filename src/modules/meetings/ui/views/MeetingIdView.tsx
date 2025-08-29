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
import UpcomingState from "../components/UpcomingState";
import ActiveState from "../components/ActiveState";
import CancelledState from "../components/CancelState";
import ProcessingState from "../components/ProcessingState";
import CompletedState from "../components/CompletedState";

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

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

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
        {isCancelled && <CancelledState />}
        {isCompleted && <CompletedState data={data} />}
        {isProcessing && <ProcessingState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {
              router.push("/meetings");
            }}
            isCancelling={false}
          />
        )}
      </div>
    </>
  );
}
