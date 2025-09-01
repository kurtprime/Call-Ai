import { getCachedSession } from "@/lib/cached-session";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getCachedSession();

  if (session) redirect("/");

  return <SignInView />;
}
