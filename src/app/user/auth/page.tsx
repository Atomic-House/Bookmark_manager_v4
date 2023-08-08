"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Home() {
  //making the component run client side
  const [isClient, setIsClient] = useState(false);
  //set's to client side if hydration fails on initial render
  useEffect(() => setIsClient(true), []);
  const { data: session } = useSession();
  if (!session) redirect("/user/auth/signin");
  redirect("/main/home");
}
