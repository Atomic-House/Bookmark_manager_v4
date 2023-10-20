"use client";
import { useState } from "react";
import { useCreate } from "./mutations";
import { useFetch } from "./queries";
import { ViewWithLists } from "@/schema/view";
import { useSearchParams } from "next/navigation";
export function usePageData(boardId: string) {
  const [view, setView] = useState({ name: "" });
  const searchParams = useSearchParams();
  const boardName = searchParams.get("name");
  const icon = searchParams.get("icon");
  const viewsData = useFetch<ViewWithLists[]>(boardId!, "view", false);
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
    viewsData.data,
  );

  return {
    viewsData,
    createViews,
    setView,
    boardName,
    icon,
    view,
  };
}
