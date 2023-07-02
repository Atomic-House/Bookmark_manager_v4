"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Home() {
  const { status } = useSession();
  if (status === "authenticated") redirect(`/home/board/inbox`);
  if (status === "unauthenticated") redirect("/auth/signin");
  return <main>loading...</main>;
}
