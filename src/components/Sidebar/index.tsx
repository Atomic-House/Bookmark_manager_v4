"use client";
import MySidebar from "./components/CustomSidebar";
import { useFetchWorkspace } from "@/functions/queries";
export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { workspace, isError, isStale, isSuccess, isLoadingError, error } =
    useFetchWorkspace();
  if (isError || isLoadingError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (isSuccess && isStale)
    return (
      <div className="flex">
        <MySidebar ws={workspace} />
        <main>{children}</main>
      </div>
    );
}
