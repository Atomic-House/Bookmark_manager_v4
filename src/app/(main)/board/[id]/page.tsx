"use client";
import { useAuth } from "@/hooks/util";
export default function Page({ params }: { params: { id: string } }) {
  useAuth(params.id);
  return <div>{params.id}</div>;
}
