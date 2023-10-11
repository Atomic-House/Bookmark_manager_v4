"use client";
import ViewTabs from "@/components/View";
import { usePageData } from "@/hooks/viewPageFunctions";
import Add from "@/components/Add";
import { useFetch } from "@/hooks/queries";
import { Board } from "@/schema/board";
import Link from "next/link";
export default function Page() {
  const { viewsData, boardName, icon, setView, view, createViews } =
    usePageData();
  const boards = useFetch<Board[]>(
    window.localStorage.getItem("defaultWs")!,
    "board",
    false,
  );
  return (
    <div>
      {boards.data?.map((board) => (
        <Link href={`/board/${board.id}`} key={board.id}>
          {board.name}
        </Link>
      ))}
    </div>
  );
}
