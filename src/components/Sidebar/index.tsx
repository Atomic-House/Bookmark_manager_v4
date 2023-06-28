"use client";
import useWindowDimension from "@/hooks/window";
import DrawerMenu from "../Drawer";
import MySidebar from "./components/CustomSidebar";
import { Spinner } from "@chakra-ui/react";
import { useFetchWorkspace } from "@/functions/queries";
export default function Sidebar({ children, ws }: { children: React.ReactNode; ws: any[] }) {
  const { width } = useWindowDimension();
  const {
    workspace,
    isError,
    isStale,
    isSuccess,
    isLoading,
    isLoadingError,
    refetch,
    error,
  } = useFetchWorkspace();
  if (isError || isLoadingError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (isSuccess && isStale)
    return (
      <div className="flex">
        {width > 768 ? <MySidebar ws={workspace} /> : <DrawerMenu />}
        <main>{children}</main>
      </div>
    );
}
