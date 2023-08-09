//Main workspace component
"use client";
import { FullData, WorkspaceWithBoards } from "@/types";
import Sidebar from "./alt/index";
import { useFetchWorkspace } from "@/functions/queries";
import { Workspace } from "@prisma/client";
export default function SidebarLayout({
  children,
  ws,
}: {
  children: React.ReactNode;
  ws?:FullData[];
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
