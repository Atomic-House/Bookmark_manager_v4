"use client";
import MySidebar from "./components/CustomSidebar";
import Sidebar from "./alt/index";
import { useFetchWorkspace } from "@/functions/queries";
import { useAppSelector } from "@/store/hooks";
export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { workspace, isError, isStale, isSuccess, isLoadingError, error } =
    useFetchWorkspace();
  const wsId = useAppSelector((state) => state.workspace.id);

  if (isError || isLoadingError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (isSuccess && isStale)
    return (
      <div className="flex">
        {/* <MySidebar ws={workspace} /> */}
        <Sidebar ws={workspace} />
        <main>{children}</main>
      </div>
    );
}
