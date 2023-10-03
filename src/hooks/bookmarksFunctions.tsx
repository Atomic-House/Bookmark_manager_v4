import { Bookmark } from "@/schema/bookmarks";
import { useFetch } from "./queries";
import { useCreate } from "./mutations";
import { useState } from "react";

export function useBookmarks(listId?: string) {
  const bookmarksData = useFetch<Bookmark[]>(listId!, "bookmarks", false);
  const [bookmark, setBookmark] = useState<Bookmark>();
  const createBookmark = useCreate<
    Bookmark,
    {
      listId: string;
      name?: string;
      url: string;
      isSnoozed?: boolean;
      snoozeTime?: Date | null;
    }
  >(
    "bookmark",
    {
      listId: listId!,
      name: bookmark?.name?.toString(),
      url: bookmark?.url?.toString()!,
      isSnoozed: Boolean(bookmark?.snoozeTime),
      snoozeTime: bookmark?.snoozeTime,
    },
    listId,
    bookmarksData?.data,
  );

  return { bookmarksData, createBookmark, setBookmark, bookmark };
}
