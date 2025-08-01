"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/DataTable";
import { columns } from "../components/Columns";
import EmptyState from "@/components/Empty";

export default function AgentViews() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first Agent"
          description="Create an Agent to join your meetings. Each agents will follow your instructions and can interact with your participants in the call"
        />
      )}
    </div>
  );
}
