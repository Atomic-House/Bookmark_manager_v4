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
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <button className="text-2xl bg-blue-300 p-2 rounded-lg duration-300 hover:bg-[#368ef2]">
          {" "}
          SignUp{" "}
        </button>{" "}
        <button className="text-2xl bg-blue-300 p-2 rounded-lg duration-300 hover:bg-[#368ef2]">
          {" "}
          or{" "}
        </button>{" "}
        <button className="text-2xl bg-blue-300 p-2 rounded-lg duration-300 hover:bg-[#368ef2]">
          Login as Guest
        </button>
      </div>
    );
  }
}
