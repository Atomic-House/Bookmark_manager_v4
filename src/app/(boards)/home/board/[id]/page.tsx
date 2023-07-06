"use client";
import List from "@/components/List";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddClass from "@/components/Create/create";
import { useDnd, useMutations } from "@/functions/mutations";
import { useFetchData } from "@/functions/queries";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useQueryClient } from "@tanstack/react-query";
export default function Page({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const id = params.id;
  const { mutateAsync, isLoading } = useMutations("create lists", "lists", name, "", id, "POST");
  const {
    data: lists,
    isLoading: isListLoading,
    isError: isListError,
    error,
    refetch,
    isSuccess: isListSuccess,
    isStale: isListStale,
  } = useFetchData("lists", id, 100);

  const [currList, setCurrList] = useState<any[]>(lists);
  const [res, setResult] = useState<DropResult>();
  const {
    mutateAsync: updateDndList,
    error: dndError,
    isLoading: isDndMutationLoading,
    isError,
  } = useDnd(res?.source.droppableId, res?.destination?.droppableId, res?.draggableId);
  useEffect(() => {
    refetch();
  }, [refetch, mutateAsync, lists]);
  //update the list according to the drag and drop mutations
  useEffect(() => {
    setCurrList(lists);
    updateDndList();
    refetch();
  }, [updateDndList, refetch, currList, isDndMutationLoading, lists]);
  //DragDrop handle function
  function handleDragEnd(result: DropResult) {
    console.log(result);
    setResult(result);
    if (!result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) {
      return;
    }
    const items = Array.from(lists);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    queryClient.invalidateQueries(["lists"]);
    refetch();
    setCurrList(items);
  }
  //Loading state spinner
  if (isListLoading) {
    return <Spinner />;
  }
  //return error on screen
  if (isListError) return <pre>{JSON.stringify(error)}</pre>;
  if (isListSuccess && isListStale) {
    return (
      <div>
        <h1 className="text-3xl m-5 ">{lists?.name}</h1>
        <div className="bg-blue-500 p-2 m-2 w-fit flex justify-center items-center text-xl ">
          <span>
            <AddClass
              isLoading={isLoading}
              category="list"
              placeholder="Add a list"
              buttonStyles="bg-blue-500"
              positionStyles=""
              onSubmit={mutateAsync}
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span className="mx-2 "> + </span>
        </div>
        {/* Lists*/}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            id="lists"
            className="grid grid-cols-1 md:grid-cols-3 border-2 border-black w-full gap-3 m-5 place-items-center"
          >
            {currList
              ?.filter((l) => !l.isDeleted)
              ?.map((list: { id: string; name: string; bookmarks: any[] }) => {
                return <List key={list.id} name={list.name} id={list.id} />;
              })}
            {isListLoading ? <Spinner /> : null}
          </div>
        </DragDropContext>
      </div>
    );
  }
}
