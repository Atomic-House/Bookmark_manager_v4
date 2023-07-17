"use client";
import { useFetchData } from "@/functions/queries";
import Bookmark from "../Bookmark";
import { BsPencilFill, BsFillPlusCircleFill } from "react-icons/bs";
import { BiLink } from "react-icons/bi";
import { Spinner, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddBookmark from "@/components/Create/bookmark";
import { StrictModeDroppable } from "@/components/Dnd/StrictModeDroppable";
import EditListOptions from "./components/EditListOptions";
import { useMutations } from "@/functions/mutations";
import { ListColorContext } from "../context/ListColorContext";
import { List as InterfaceList } from "@prisma/client";
export default function List({ name, id, color }: InterfaceList) {
  const {
    data: lists,
    isLoading: isLoadingBookmarks,
    isSuccess,
    isError,
    isStale,
    isPaused,
    isFetching,
    isLoadingError,
    refetch,
    error,
  } = useFetchData("bookmarks", id, false);
  const {
    mutateAsync: trashList,
    isLoading: isTrashListLoading,
    isSuccess: isTrashListSuccess,
  } = useMutations("delete list", "lists", "", "", "", id, "PUT");
  useEffect(() => {
    refetch();
  }, [refetch, lists]);
  const [listColor, setListColor] = useState<string>(lists?.color);
  console.log(listColor);

  if (isError || isLoadingError) {
    console.error(error);
  }
  if (isLoadingBookmarks) {
    return <Spinner />;
  }
  if (isSuccess || isStale)
    return (
      <ListColorContext.Provider
        value={{ listColor, setListColor }}
        key={lists.id}
      >
        <StrictModeDroppable droppableId={id} key={id}>
          {(provided) => (
            <Box
              key={id}
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`m-1 bg-[${listColor}]  dark:bg-slate-900 p-4 "`}
              bgColor={listColor + ".200"}
              rounded={"md"}
            >
              <div className="flex  justify-between items-center gap-6 sticky">
                <div>{name}</div>
                <div className="flex items-center">
                  <AddBookmark
                    listId={id}
                    buttonStyles=""
                    positionStyles=""
                    category="bookmarks"
                  />
                  <EditListOptions
                    onClickDelete={trashList}
                    isSuccess={isTrashListSuccess}
                    isLoading={isTrashListLoading}
                  />
                </div>
              </div>
              <div>
                {lists?.bookmarks
                  ?.filter((data: { isDeleted: boolean }) => !data.isDeleted)
                  ?.map(
                    (
                      bm: {
                        name: string;
                        id: string;
                        url: string;
                        title: string;
                        description: string;
                        favicon: string;
                      },
                      index: number,
                    ) => (
                      <Bookmark
                        index={index}
                        name={bm.name}
                        id={bm.id}
                        link={bm.url}
                        key={bm.id}
                        title={bm.title}
                        image={bm.favicon}
                        description={bm.description}
                      />
                    ),
                  )}
                {/* {isLoading ? <Spinner /> : null} */}
              </div>
              {provided.placeholder}
            </Box>
          )}
        </StrictModeDroppable>
      </ListColorContext.Provider>
    );
}
