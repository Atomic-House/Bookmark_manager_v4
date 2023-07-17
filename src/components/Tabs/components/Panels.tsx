"use client";
import { TabPanel, Spinner } from "@chakra-ui/react";
import { Lists } from "@/types";
import List from "@/components/List";
import { useFetchData } from "@/functions/queries";
import { useMutations } from "@/functions/mutations";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import AddClass from "@/components/Create/create";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";
import { List as IList } from "@prisma/client";
export default function PanelTab({
  id,
  boardId,
}: {
  id: string;
  boardId: string;
}) {
  const [name, setName] = useState("");
  const {
    data: lists,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
    refetch,
    isSuccess: isListSuccess,
    isStale: isListStale,
  } = useFetchData("lists", id, false);
  const {
    mutateAsync: createList,
    isLoading: isCreateListLoading,
    error: createListError,
    isError,
    isSuccess,
  } = useMutations(
    "create lists",
    "lists",
    name,
    "",
    "",
    `${id}/${boardId}`,
    "POST",
  );
  function handleDragEnd(result: DropResult) {
    console.log(result);
  }
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

  return (
    <>
      <TabPanel key={id}>
        <div className="sticky flex items-center gap-5 ">
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
        <div className="flex">
          <DragDropContext onDragEnd={handleDragEnd}>
            {lists
              ?.filter((l: { isDeleted: boolean }) => !l.isDeleted)
              ?.map((list: IList) => (
                <List
                  id={list.id}
                  name={list.name}
                  key={list.id}
                  color={list.color}
                />
              ))}
          </DragDropContext>
        </div>
      </TabPanel>
    </>
  );
}
