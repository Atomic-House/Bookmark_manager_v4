"use client";
import { useFetchData } from "@/functions/queries";
import Bookmark from "../Bookmark";
import { BsPencilFill, BsFillPlusCircleFill } from "react-icons/bs";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import AddClass from "@/components/Create/bookmark";
import { StrictModeDroppable } from "@/components/Dnd/StrictModeDroppable";
export default function List({
  name,
  id,
  bookmarks,
  isLoading,
}: {
  name: string;
  id: string;
  bookmarks: { id: string; name: string; link: string }[];
  isLoading: boolean;
}) {
  const {
    data,
    isLoading: isLoadingBookmarks,
    isSuccess,
    isError,
    isStale,
    isPaused,
    isFetching,
    isLoadingError,
    refetch,
    error,
  } = useFetchData("bookmarks", id, 100);
  useEffect(() => {
    refetch();
  }, [refetch, data]);
  if (isError || isLoadingError) {
    console.error(error);
  }
  if (isLoadingBookmarks) {
    return <Spinner />;
  }
  if (isSuccess || isStale)
    return (
      <StrictModeDroppable droppableId={id} key={id}>
        {(provided) => (
          <div
            key={id}
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="m-5 bg-slate-100 dark:bg-slate-900 p-4"
          >
            <div className="flex  justify-between items-center gap-2">
              <div>{name}</div>
              <BsPencilFill className="text-xs  cursor-pointer" />
              <AddClass listId={id} buttonStyles="" positionStyles="" category="bookmarks" />
            </div>
            <div>
              {data?.bookmarks
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
                    index: number
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
                  )
                )}
              {/* {isLoading ? <Spinner /> : null} */}
            </div>
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    );
}
