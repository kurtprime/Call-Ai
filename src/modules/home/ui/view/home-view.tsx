"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export function HomeView() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "BITGGER" }));

  return <div>{data?.greeting}</div>;
}
