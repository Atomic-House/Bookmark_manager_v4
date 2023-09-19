"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function Page() {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/signin";
    }
  }, [status]);
  return <div></div>;
}
