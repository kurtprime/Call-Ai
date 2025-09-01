import { getCachedSession } from "@/lib/cached-session";
import { HomeView } from "@/modules/home/ui/view/home-view";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getCachedSession();
  if (!session) redirect("/sign-in");

  return <HomeView />;
}
