"use client";
import { Spinner, TabPanel } from "@chakra-ui/react";
import List from "@/components/List";
import { useFetchData } from "@/functions/queries";
import { useDnd, useMutations } from "@/functions/mutations";
import { useContext, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import AddClass from "@/components/Create/create";
import { ListsWithBookmarks, TabWithLists } from "@/types";
import Sort from "@/components/Sort";
import Filter from "@/components/Filter";
import Views from "@/components/View";
import {
  ListPrefContext,
  type ListPrefs,
} from "@/components/context/ListPrefContext";
export default function PanelTab({ id, lists }: TabWithLists) {
  const [name, setName] = useState("");
  const {
    data: listNow,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
    refetch,
  } = useFetchData<ListsWithBookmarks[]>("lists", id, false);
  //This saves the lists to operate DND
  //operations on it.
  // const [nList, setNList] = useState<ListsWithBookmarks[]>(listNow);
  const [listPrefs, setListPrefs] = useState<ListPrefs | undefined>();
  const { mutateAsync, isSuccess, isLoading } = useDnd(id);
  const {
    mutateAsync: createList,
    isLoading: isCreateListLoading,
    error: createListError,
    isError,
    isSuccess: createListSuccess,
  } = useMutations(
    "create lists",
    "lists",
    name,
    "",
    "",
    id,
    "POST",
    "tabs",
    id,
  );
  // useEffect(() => {
  //   refetch();
  //   // setNList(listNow);
  // }, [refetch, listNow]);

  if (isListError || isError) {
    return (
      <TabPanel>{JSON.stringify({ listError, createListError })}</TabPanel>
    );
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
    const { destination, source, draggableId } = result;
    console.log(result);
    // const array = [...nList];
    // if (!result.destination) {
    //   return; // Drop outside the list, do nothing
    // }
    // if (
    //   array.length === 0 ||
    //   array.find((l) => l.id === source.droppableId)?.bookmarks === undefined
    // ) {
    //   console.log("Nope!");
    // }
    // const [removed] = array
    //   .find((l) => l.id === source.droppableId)!
    //   .bookmarks.splice(source.index, 1);
    //
    // console.log("Before Removed:", removed);
    // removed.listId = destination?.droppableId!;
    // array
    //   .find((l) => l.id === destination?.droppableId)
    //   ?.bookmarks?.splice(destination!.index, 0, removed);
    // setNList(array);
    // mutateAsync({
    //   source: source.droppableId,
    //   destination: destination!.droppableId,
    //   bookmarkId: draggableId,
    // });
  };

  return (
    <>
      <TabPanel key={id}>
        <ListPrefContext.Provider value={{ listPrefs, setListPrefs }}>
          <div className="sticky flex items-center gap-5 z-10">
            <AddClass
              onSubmit={createList}
              add_edit={"New "}
              onChange={(e) => setName(e.target.value)}
              isLoading={isCreateListLoading}
              placeholder="+  Add a new list"
              category="lists"
              positionStyles="sticky"
              buttonStyles="dark:bg-blue-800 bg-[#11047A] mb-3 text-white p-2 flex justify-center items-center rounded-lg"
            />
            <Sort />
            <Filter />
            <Views />
          </div>
          <div className="grid grid-cols-1 flex-wrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            <DragDropContext onDragEnd={handleDragEnd}>
              {listNow
                ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((list: ListsWithBookmarks) => (
                  <List listPrefs={listPrefs} {...list} key={list.id} />
                ))}
            </DragDropContext>
          </div>
        </ListPrefContext.Provider>
      </TabPanel>
    </>
  );
}
