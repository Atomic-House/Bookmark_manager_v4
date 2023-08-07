"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  const { data: session } = useSession();
  if (!session) redirect("/user/auth/signin");
  redirect("/main/home");
}
