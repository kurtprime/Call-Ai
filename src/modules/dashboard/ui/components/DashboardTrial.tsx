import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MAX_FREE_AGENTS,
  MAX_FREE_MEETINGS,
} from "@/modules/premium/constants";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardTrial() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

  if (!data) return null;

  return (
    <div className="border rounded-lg w-full bg-sidebar-accent flex flex-col gap-y-2 ">
      <div className="p-3 flex flex-col items-stretch gap-y-2">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4" />
          <p className="text-sm font-medium">Free Trial</p>
        </div>
        <div className="flex  flex-col gap-y-2">
          <p className="text-sm">
            {data.agentCount}/{MAX_FREE_AGENTS} Agents
          </p>
          <Progress value={(data.agentCount / MAX_FREE_AGENTS) * 100} />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm">
            {data.meetingCount}/{MAX_FREE_MEETINGS} Meetings
          </p>
          <Progress value={(data.meetingCount / MAX_FREE_MEETINGS) * 100} />
        </div>
      </div>
      <Button
        asChild
        variant="ghost"
        className="border-t  hover:bg-accent-foreground/10 rounded-t-none"
      >
        <Link href="/upgrade">Upgrade to Pro</Link>
      </Button>
    </div>
  );
}
