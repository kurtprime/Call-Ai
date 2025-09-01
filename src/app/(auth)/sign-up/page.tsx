import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { redirect } from "next/navigation";
import { getCachedSession } from "@/lib/cached-session";

export default async function page() {
  const session = await getCachedSession();
  if (session) redirect("/");

  return <SignUpView />;
}
