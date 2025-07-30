import ErrorState from "@/components/Error";
import LoadingState from "@/components/Loading";
import AgentViews from "@/modules/agents/ui/views/AgentViews";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
export default async function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Loading for agents" />}>
        <ErrorBoundary fallback={<ErrorState />}>
          <AgentViews />;
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
