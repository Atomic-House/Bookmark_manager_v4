"use client";
import { useFetchData } from "@/functions/queries";
import Bookmark from "../Bookmark";
import { Box, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import AddBookmark from "@/components/Create/bookmark";
import EditListOptions from "./components/EditListOptions";
import { useMutations } from "@/functions/mutations";
import { ListColorContext } from "../context/ListColorContext";
import { ListEmojiContext } from "../context/ListEmojiContext";
import { StrictModeDroppable } from "../Dnd/StrictModeDroppable";
import { ListsWithBookmarks } from "@/types";
import EmojiSelect from "../EmojiPicker";
import { ListPrefContext, type ListPrefs } from "../context/ListPrefContext";
import { Bookmark as BookmarkType } from "@prisma/client";
interface ListsWithBookmarksWithPrefs extends ListsWithBookmarks {
  listPrefs?: ListPrefs;
}

export default function List({
  name,
  id,
  color,
  emoji,
  bookmarks,
  listPrefs,
  ...listProps
}: ListsWithBookmarksWithPrefs) {
  const {
    data: lists,
    isLoading: isLoadingBookmarks,
    isSuccess,
    isError,
    isStale,
    isLoadingError,
    refetch,
    error,
  } = useFetchData<ListsWithBookmarks & ListPrefs>("bookmarks", id, false);
  const {
    mutateAsync: trashList,
    isLoading: isTrashListLoading,
    isSuccess: isTrashListSuccess,
  } = useMutations("delete list", "lists", "", "", "", id, "PUT");
  const [bookmarksList, setBookmarksList] = useState<BookmarkType[]>(bookmarks);

  const { listPrefs: prefs } = useContext(ListPrefContext);
  useEffect(() => {
    refetch();
    setBookmarksList(lists?.bookmarks!);
  }, [refetch, lists?.bookmarks]);
  const [listColor, setListColor] = useState<string>(color!);
  const [listEmoji, setListEmoji] = useState<string>(emoji ?? "");

  if (isError || isLoadingError) {
    console.error(error);
  }
  if (isLoadingBookmarks) {
    return <Spinner />;
  }
  if (isSuccess || isStale) {
    return (
      <ListColorContext.Provider value={{ listColor, setListColor }} key={id}>
        <ListEmojiContext.Provider value={{ listEmoji, setListEmoji }} key={id}>
          <StrictModeDroppable droppableId={id} key={id}>
            {(provided, snapshot) => (
              <Box
                key={id}
                className={`m-1 h-fit bg-[${listColor}] transition  duration-300 dark:bg-slate-900 p-4 `}
                zIndex={1}
                boxShadow={"md"}
                {...provided.droppableProps}
                bgColor={
                  listColor + (snapshot.isDraggingOver ? ".300" : ".200")
                }
                ref={provided.innerRef}
                rounded={"2xl"}
              >
                <div className="flex  justify-between items-center gap-6 sticky">
                  <EmojiSelect
                    color={color!}
                    name={name}
                    id={id}
                    {...listProps}
                    bookmarks={bookmarks}
                    emoji={emoji}
                  />

                  <div>{name}</div>
                  <div className="flex items-center">
                    <AddBookmark
                      listId={id}
                      buttonStyles=""
                      positionStyles=""
                      category="bookmarks"
                    />
                    <EditListOptions
                      id={lists?.id!}
                      onClickDelete={trashList}
                      isSuccess={isTrashListSuccess}
                      isLoading={isTrashListLoading}
                    />
                  </div>
                </div>
                <div>
                  {bookmarksList
                    ?.sort((a, b): any => {
                      if (prefs?.sort === "a_z") {
                        return a.title?.localeCompare(b.title!);
                      } else if (prefs?.sort == "z_a") {
                        return b.title?.localeCompare(a.title!);
                      } else if (prefs?.sort === "newest") {
                        return (
                          new Date(b.createdAt!).getTime() -
                          new Date(a.createdAt!).getTime()
                        );
                      } else {
                        return (
                          new Date(a.createdAt!).getTime() -
                          new Date(b.createdAt!).getTime()
                        );
                      }
                    })
                    ?.map((bm: BookmarkType, index: number) => (
                      <Bookmark key={index} index={index} {...bm} />
                    ))}
                  {provided.placeholder}
                </div>
              </Box>
            )}
          </StrictModeDroppable>
        </ListEmojiContext.Provider>
      </ListColorContext.Provider>
    );
  }
}
