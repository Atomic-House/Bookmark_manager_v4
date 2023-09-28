"use client";
import { useState } from "react";
import { useCreate } from "./mutations";
import { useFetch } from "./queries";
import { View } from "@/schema/view";
import { ViewWithLists } from "@/schema/view";
import { useSearchParams } from "next/navigation";
import { List, ListWithBookmarks } from "@/schema/list";
export function usePageData(viewId?: string) {
  const [view, setView] = useState({ name: "" });
  const [list, setList] = useState({ name: "", icon: "" });
  const boardId = useSearchParams().get("id");
  const boardName = useSearchParams().get("name");
  const icon = useSearchParams().get("icon");
  const viewsData = useFetch<ViewWithLists[]>(boardId!, "view", false);
  console.log("Views data", viewsData.data);

  const createViews = useCreate<
    ViewWithLists,
    typeof view & { boardId: string }
  >(
    "view",
    {
      name: view.name,
      boardId: boardId!,
    },
    boardId!,
    { id: boardId!, parentType: "view" },
    viewsData.data,
  );

  const listsData = useFetch<ListWithBookmarks[]>(viewId!, "list", false);

  const createList = useCreate<List, typeof list & { viewId: string }>(
    "list",
    {
      name: list.name,
      icon: list.icon,
      viewId: viewId!,
    },
    viewId!,
    { id: viewId!, parentType: "list" },
    listsData.data,
  );

  return {
    viewsData,
    createViews,
    setView,
    boardName,
    icon,
    view,
    listsData,
    createList,
    setList,
    list,
    viewId,
  };
}
