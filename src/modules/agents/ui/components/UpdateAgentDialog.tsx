"use client";

import ResponsiveDialog from "@/components/responsige-dialog";
import AgentForm from "./AgentForm";
import { AgentGetOne } from "../../types";

type UpdateAgentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
};

export default function UpdateAgentDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="Update Agent"
      description="Edit a existing Agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}
