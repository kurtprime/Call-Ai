"use client";

import { useTRPC } from "@/trpc/client";
import { useMeetingsFilters } from "../../hooks/useMeetingsFilters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CommandSelect from "@/components/CommandSelect";
import { GeneratedAvatar } from "@/components/generated/generatedAvatar";

export default function AgentIdFilter() {
  const [filters, setFilter] = useMeetingsFilters();

  const trpc = useTRPC();

  const [agentSearch, setAgentSearch] = useState("");
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-4"
            />
            <span className="truncate">{agent.name}</span>
          </div>
        ),
      }))}
      onSelect={(value) => setFilter({ agentId: value })}
      onSearch={setAgentSearch}
      value={filters.agentId ?? ""}
    />
  );
}
