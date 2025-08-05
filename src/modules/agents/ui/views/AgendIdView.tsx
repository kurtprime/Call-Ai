"use client";
import ErrorState from "@/components/Error";
import LoadingState from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import AgentIdViewHeader from "../components/AgentIdViewHeader";
import { GeneratedAvatar } from "@/components/generated/generatedAvatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
  agentId: string;
}

export default function AgendIdView({ agentId }: Props) {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4 ">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="bg-card rounded-lg border">
        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              seed={data.name}
              variant="botttsNeutral"
              className="size-10"
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4 "
          >
            <VideoIcon className="text-blue-700" />
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "meeting" : "meetings"}
          </Badge>
          <div className="flex flex-col gap-y-4 ">
            <p className="text-lg font-medium">Instructions</p>
            <p className="text-neutral-500">{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AgentIdLoadingView = () => {
  return <LoadingState title="Loading your Agent" />;
};

export const AgentIdErrorView = () => {
  return <ErrorState title="Failed to load your agent" />;
};
