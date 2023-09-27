"use client";
import { useState } from "react";
import { useCreate } from "./mutations";
import { useFetch } from "./queries";
import { View } from "@/schema/view";
import { ViewWithLists } from "@/schema/view";
import { useSearchParams } from "next/navigation";
export function usePageData() {
  const [view, setView] = useState({ name: "", icon: "" });
  const boardId = useSearchParams().get("id");
  const boardName = useSearchParams().get("name");
  const icon = useSearchParams().get("icon");
  const viewsData = useFetch<ViewWithLists[]>(boardId!, "view");
  const createViews = useCreate<View, typeof view>(
    "view",
    {
      name: view.name,
      icon: view.icon,
    },
    boardId!,
    { id: boardId!, parentType: "view" },
    viewsData.data,
  );

  return {
    viewsData,
    createViews,
    setView,
    boardName,
    icon,
  };
}
