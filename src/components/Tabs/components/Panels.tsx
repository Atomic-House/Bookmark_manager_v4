"use client";
import { Spinner, TabPanel } from "@chakra-ui/react";
import List from "@/components/List";
import { useFetchData } from "@/functions/queries";
import { useDnd, useMutations } from "@/functions/mutations";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import AddClass from "@/components/Create/create";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";
import { ListsWithBookmarks, TabWithLists } from "@/types";
import { onDragEnd } from "@/functions/helpers";
export default function PanelTab({ id, lists }: TabWithLists) {
  const [name, setName] = useState("");
  const {
    data: listNow,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
    refetch,
  }: {
    data: ListsWithBookmarks[];
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    refetch: any;
  } = useFetchData("lists", id, false);

  //This saves the lists to operate DND operations on it.
  const [nList, setNList] = useState<ListsWithBookmarks[]>(lists);
  const { mutateAsync, isSuccess } = useDnd(id);
  useEffect(() => {
    refetch();
    setNList(lists);
  }, [refetch, lists, isSuccess]);
  const {
    mutateAsync: createList,
    isLoading: isCreateListLoading,
    error: createListError,
    isError,
  } = useMutations("create lists", "lists", name, "", "", id, "POST");

  if (isListError || isError) {
    return <TabPanel>{JSON.stringify({ listError, createListError })}</TabPanel>;
  }
  if (isListLoading) {
    return (
      <>
        <TabPanel>
          <Spinner />
        </TabPanel>
      </>
    );
  }
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return; // Drop outside the list, do nothing
    }

    const sourceListIndex = nList.findIndex((list) => list.id === result.source.droppableId);
    const destinationListIndex = nList.findIndex(
      (list) => list.id === result.destination!.droppableId,
    );

    const sourceList = {
      ...nList[sourceListIndex],
      bookmarks: [...nList[sourceListIndex].bookmarks],
    };
    const bookmarkToMove = sourceList.bookmarks.splice(result.source.index, 1)[0];

    const destinationList = {
      ...nList[destinationListIndex],
      bookmarks: [...nList[destinationListIndex].bookmarks],
    };
    destinationList.bookmarks.splice(result.destination.index, 0, bookmarkToMove);

    const updatedLists = [...nList];
    updatedLists[sourceListIndex] = sourceList;
    updatedLists[destinationListIndex] = destinationList;
    setNList(updatedLists);
    mutateAsync({
      source: result.source.droppableId,
      destination: result.destination.droppableId,
      bookmarkId: result.draggableId,
    });
  };
  console.table(nList);
  return (
    <>
      <TabPanel key={id}>
        <div className="sticky flex items-center gap-5 z-10">
          <AddClass
            onSubmit={createList}
            add_edit={"Create a "}
            onChange={(e) => setName(e.target.value)}
            isLoading={isCreateListLoading}
            placeholder="+  Add a new list"
            category="lists"
            positionStyles="sticky"
            buttonStyles="dark:bg-blue-800 bg-blue-700 mb-3 text-white p-2 flex justify-center items-center rounded-lg"
          />
          <div className="p-1  bg-slate-200">
            <FaSortAmountDownAlt className="text-slate-800" />
          </div>

          <div className="p-1  bg-slate-200">
            <BiFilterAlt className="text-slate-800" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            {nList?.map((list: ListsWithBookmarks) => <List {...list} key={list.id} />)}
          </DragDropContext>
        </div>
      </TabPanel>
    </>
  );
}
