import ErrorState from "@/components/Error";
import LoadingState from "@/components/Loading";
import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/agents/params";
import ListHeader from "@/modules/agents/ui/components/ListHeader";
import AgentViews from "@/modules/agents/ui/views/AgentViews";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function page({ searchParams }: Props) {
  const params = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...params })
  );

  return (
    <>
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Loading for agents" />}>
          <ErrorBoundary fallback={<ErrorState />}>
            <AgentViews />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
