import ErrorState from "@/components/Error";
import LoadingState from "@/components/Loading";
import { auth } from "@/lib/auth";
import MeetingsListHeader from "@/modules/meetings/ui/components/MeetingListHeader";
import MeetingView from "@/modules/meetings/ui/views/MeetingView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/modules/meetings/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Meetings({ searchParams }: Props) {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );
  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Loading Meetings" />}>
          <ErrorBoundary fallback={<ErrorState />}>
            <MeetingView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
