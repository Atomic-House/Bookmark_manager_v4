"use client";
import { useFetch } from "@/hooks/queries";
import { Board } from "@/schema/board";
import Link from "next/link";
export default function Page() {
  const defaultId = () => {
    if (typeof window === "undefined") {
      return "";
    }
    return window.localStorage.getItem("defaultWs");
  };
  const boards = useFetch<Board[]>(defaultId()!, "board", false);
  console.log("Boards", boards?.data);

  return (
    <div className="flex flex-col justify-center items-center m-12">
      <h1 className="text-2xl">Go To Board</h1>
      <div className="flex gap-5 justify-center items-center flex-col">
        {boards.data?.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            className="btn btn-primary"
          >
            {board.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
