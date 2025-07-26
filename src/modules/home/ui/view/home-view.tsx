"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function HomeView() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  return (
    <div>
      <p>Log in as {session ? session.user.name : "loading"}</p>
      <Button
        onClick={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.refresh(),
            },
          });
        }}
        className="mt-4"
      >
        Sign out
      </Button>
    </div>
  );
}
