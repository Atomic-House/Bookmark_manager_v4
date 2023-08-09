//Main workspace component
"use client";
import Sidebar from "./alt/index";
import { useFetchWorkspace } from "@/functions/queries";
export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { workspace, isError, isStale, isSuccess, isLoadingError, error } =
    useFetchWorkspace();

  if (isError || isLoadingError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (isSuccess && isStale) {
    return (
      <div className="flex">
        <Sidebar ws={workspace} />
        <main>{children}</main>
      </div>
    );
  }
}
