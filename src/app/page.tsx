"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/signin");
  } else if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <span className=" loading loading-dots loading-lg"></span>
      </div>
    );
  } else router.push("/workspace");
}
