"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();
  useEffect(() => setIsClient(true), []);
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/main/home");
    }
  }, [session, router]);
  if (!session) {
    return <div>SignUp or Login as Guest</div>;
  }
}
