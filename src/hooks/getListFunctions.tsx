import { ListWithBookmarks } from "@/schema/list";
import { useFetch } from "./queries";
import { useCreate } from "./mutations";
import { useEffect, useState } from "react";

export function useGetLists(viewId: string) {
  const data = useFetch<ListWithBookmarks[]>(viewId, "list", false);
  const [list, setList] = useState({ name: "", icon: "\ue627" });
  const createList = useCreate<
    ListWithBookmarks,
    { name: string; viewId: string }
  >("list", { name: list.name, viewId: viewId }, viewId, data.data);

  useEffect(() => {
    data.refetch();
  }, [viewId, data]);

  return {
    data,
    createList,
    setList,
    list,
  };
}
