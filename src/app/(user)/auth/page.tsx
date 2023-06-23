"use client";
import SignIn from "@/components/Account/SignIn";
import SignUp from "@/components/Account/SignUp";
import { useSession } from "next-auth/react";
export default function Page() {
  const { data: session } = useSession();
  if (!session) {
    return <SignIn />;
  }
  return <SignUp />;
}
