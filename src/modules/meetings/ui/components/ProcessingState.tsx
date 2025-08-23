import EmptyState from "@/components/Empty";

export default function ProcessingState() {
  return (
    <div className="bg-background rounded-lg px-4 py-6 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting is Completed"
        description="This Meeting has been completed, a summary will appear soon."
      />
    </div>
  );
}
