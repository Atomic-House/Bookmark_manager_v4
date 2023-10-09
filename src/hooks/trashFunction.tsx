import { useState } from "react";
import { useGetTrash } from "./queries";
import { useTrash } from "./mutations";
import type { Bookmark } from "@/schema/bookmarks";
import type { List } from "@/schema/list";
import type { Board } from "@/schema/board";
export function useTrashFunction() {
  const [id, setId] = useState("");
  const bookmarks = useGetTrash<Bookmark[]>("bookmark");
  const list = useGetTrash<List[] & { title: string }[]>("list");
  const board = useGetTrash<Board[] & { title: string }[]>("board");
  const trashBookmark = useTrash<Bookmark>("bookmark", id, true);
  const trashList = useTrash<List>("list", id, true);
  const trashBoard = useTrash<Board>("board", id, true);
  return {
    bookmarks,
    list,
    board,
    trashBookmark,
    trashList,
    trashBoard,
    id,
    setId,
  };
}
