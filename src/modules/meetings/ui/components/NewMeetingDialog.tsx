"use client";

import ResponsiveDialog from "@/components/responsige-dialog";
import MeetingForm from "./MeetingForm";
import { useRouter } from "next/navigation";

type NewAgentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function NewMeetingDialog({
  open,
  onOpenChange,
}: NewAgentDialogProps) {
  const router = useRouter();

  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
