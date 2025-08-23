import EmptyState from "@/components/Empty";

export default function CancelledState() {
  return (
    <div className="bg-background rounded-lg px-4 py-6 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting Cancelled"
        description="Meeting was cancelled."
      />
    </div>
  );
}
