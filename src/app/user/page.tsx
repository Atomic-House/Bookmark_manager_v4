"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  if (!session) redirect("/user/auth/signin");
  redirect("/main/home");
}
