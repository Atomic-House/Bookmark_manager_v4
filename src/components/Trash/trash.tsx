import { useTrash } from "@/hooks/mutations";
import { useFetch } from "@/hooks/queries";
import { Board } from "@/schema/board";
import { Bookmark } from "@/schema/bookmarks";
import { List } from "@/schema/list";
import { useState } from "react";

interface ITrash {
  type: "bookmark" | "list" | "board" | "member";
}
export default function Trash() {
  const [id, setId] = useState("");
  // const lists = useFetch("");
  const trashBookmark = useTrash<Bookmark>("bookmark", id, true);
  const trashList = useTrash<List>("list", id, true);
  const trashBoard = useTrash<Board>("board", id, true);
  return <div></div>;
}
