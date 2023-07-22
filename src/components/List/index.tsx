"use client";
import { useFetchData } from "@/functions/queries";
import Bookmark from "../Bookmark";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddBookmark from "@/components/Create/bookmark";
import EditListOptions from "./components/EditListOptions";
import { useMutations } from "@/functions/mutations";
import { ListColorContext } from "../context/ListColorContext";
import { ListEmojiContext } from "../context/ListEmojiContext";
import { StrictModeDroppable } from "../Dnd/StrictModeDroppable";
import { ListsWithBookmarks } from "@/types";
export default function List({
  name,
  id,
  color,
  emoji,
  bookmarks,
}: ListsWithBookmarks) {
  const {
    data: lists,
    isLoading: isLoadingBookmarks,
    isSuccess,
    isError,
    isStale,
    isLoadingError,
    refetch,
    error,
  }: {
    data: ListsWithBookmarks;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isStale: boolean;
    isLoadingError: boolean;
    refetch: any;
    error: unknown;
  } = useFetchData("bookmarks", id, false);
  const {
    mutateAsync: trashList,
    isLoading: isTrashListLoading,
    isSuccess: isTrashListSuccess,
  } = useMutations("delete list", "lists", "", "", "", id, "PUT");

  const [bookmarksList, setBookmarksList] = useState(bookmarks);
  useEffect(() => {
    refetch();
    setBookmarksList(lists?.bookmarks);
  }, [refetch, lists, lists?.bookmarks]);
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
                className={`m-1 bg-[${listColor}] transition duration-300 dark:bg-slate-900 p-4 `}
                boxShadow={"md"}
                {...provided.droppableProps}
                bgColor={
                  listColor + (snapshot.isDraggingOver ? ".300" : ".200")
                }
                ref={provided.innerRef}
                rounded={"md"}
              >
                <div className="flex  justify-between items-center gap-6 sticky">
                  {/* <EmojiSelect color={color!} name={name} id={id} />
                   */}{" "}
                  <div>{name}</div>
                  <div className="flex items-center">
                    <AddBookmark
                      listId={id}
                      buttonStyles=""
                      positionStyles=""
                      category="bookmarks"
                    />
                    <EditListOptions
                      id={lists?.id}
                      onClickDelete={trashList}
                      isSuccess={isTrashListSuccess}
                      isLoading={isTrashListLoading}
                    />
                  </div>
                </div>
                <div>
                  {bookmarksList
                    ?.filter((data: { isDeleted: boolean }) => !data.isDeleted)
                    ?.map((bm, index) => <Bookmark key={index} index={index} {...bm} />)}
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
