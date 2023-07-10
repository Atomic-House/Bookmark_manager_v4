"use client";
import { TabPanel, Spinner } from "@chakra-ui/react";
import { Lists } from "@/types";
import List from "@/components/List";
import { useFetchData } from "@/functions/queries";
import { useMutations } from "@/functions/mutations";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import AddClass from "@/components/Create/create";
export default function PanelTab({ id, boardId }: { id: string; boardId: string }) {
  const [name, setName] = useState("");
  const {
    data: lists,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
    refetch,
    isSuccess: isListSuccess,
    isStale: isListStale,
  } = useFetchData("lists", id, 200);
  const {
    mutateAsync: createList,
    isLoading: isCreateListLoading,
    error: createListError,
    isError,
    isSuccess,
  } = useMutations("create lists", "lists", name, "", `${id}/${boardId}`, "POST");
  function handleDragEnd(result: DropResult) {
    console.log(result);
  }
  if (isListError || isError) {
    return <TabPanel>{JSON.stringify({ listError, createListError })}</TabPanel>;
  }
  if (isListLoading) {
    return (
      <TabPanel>
        <Spinner />
      </TabPanel>
    );
  }

  return (
    <>
           <TabPanel key={id}>
 <AddClass
        onSubmit={createList}
        onChange={(e) => setName(e.target.value)}
        isLoading={isCreateListLoading}
        placeholder="Add list"
        category="lists"
        positionStyles="flex justify-center items-center"
        buttonStyles="dark:bg-blue-800 p-2 flex justify-center items-center rounded-md"
      />


        <div className="flex">
          <DragDropContext onDragEnd={handleDragEnd}>
            {lists?.map((list: Lists) => (
              <List id={list.id} name={list.name} key={list.id} />
            ))}
          </DragDropContext>
        </div>
      </TabPanel>
    </>
  );
}
