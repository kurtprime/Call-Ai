"use client";

import ResponsiveDialog from "@/components/responsige-dialog";
import MeetingForm from "./MeetingForm";
import { MeetingGetOne } from "../../types";

type NewAgentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
};

export default function UpdateMeetingDialog({
  open,
  onOpenChange,
  initialValues,
}: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit a Meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}
