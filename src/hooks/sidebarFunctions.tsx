import { Workspace } from "@/schema/workspace";
import { Board } from "@/schema/board";
import { useCreate } from "./mutations";
import { useFetch } from "./queries";
import { useEffect, useState } from "react";
import { useLoading } from "./states";
export function useSidebar() {
  const {
    data: ws,
    isError,
    isSuccess,
    isLoading,
    refetch,
  } = useFetch<Workspace[] & Board[]>("", "workspace");
  const [defaultWorkspace, setDefaultWorkpace] = useState<
    Workspace | undefined
  >(ws?.at(0));
  const loading = useLoading(isLoading);
  useEffect(() => {
    window.localStorage.getItem("defaultWs");
    window.localStorage.setItem("defaultWs", `${defaultWorkspace?.id}`);
    refetch();
  }, [defaultWorkspace, ws, refetch]);
  return {
    defaultWorkspace,
    ws,
    loading,
  };
}
