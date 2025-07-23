"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onRequest: (ctx) => {
            // Show loading
          },
          onSuccess: (ctx) => {
            window.alert("Success");
          },
          onError: (ctx) => {
            // Display the error message
            window.alert(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };
  const handleLogin = async () => {
    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: (ctx) => {
            // Show loading
          },
          onSuccess: (ctx) => {
            window.alert("Success");
          },
          onError: (ctx) => {
            // Display the error message
            window.alert(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  if (session) {
    return (
      <div>
        <p>Log in as {session.user.name}</p>
        <Button
          onClick={() => {
            authClient.signOut();
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="text-2xl font-extrabold">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleSignUp}>Sign Up</Button>
      </div>
      <div className="text-2xl font-extrabold">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin}>Log In</Button>
      </div>
    </>
  );
}
