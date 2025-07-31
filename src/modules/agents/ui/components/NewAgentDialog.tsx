"use client";

import ResponsiveDialog from "@/components/responsige-dialog";
import AgentForm from "./AgentForm";

type NewAgentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function NewAgentDialog({
  open,
  onOpenChange,
}: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new Agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
