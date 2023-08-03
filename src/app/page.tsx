"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  router.push("/main/home");
  if (!session) router.push("/user/auth/signin");
}
