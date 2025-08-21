"use client";

import { DataTable } from "@/components/DataTable";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/Columns";
import EmptyState from "@/components/Empty";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/useMeetingsFilters";
import DataPagination from "@/components/DataPagination";

export default function MeetingView() {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4  px-4 md:px-8  flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time"
        />
      )}
    </div>
  );
}
