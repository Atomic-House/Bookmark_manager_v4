"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import { useRouter } from "next/router";
export default function Home() {
  // const router = useRouter();
  const { data: session } = useSession();
  if (!session) redirect("/user/auth/signin");
  redirect("/main/home");
}
