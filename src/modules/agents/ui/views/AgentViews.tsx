"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/Columns";
import EmptyState from "@/components/Empty";
import { useAgentFilters } from "../../hooks/useAgentFilters";
import DataPagination from "../components/DataPagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";

export default function AgentViews() {
  const router = useRouter();
  const [filters, setFilter] = useAgentFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  const { items } = data;

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilter({ page })}
      />
      {items.length === 0 && (
        <EmptyState
          title="Create your first Agent"
          description="Create an Agent to join your meetings. Each agents will follow your instructions and can interact with your participants in the call"
        />
      )}
    </div>
  );
}
