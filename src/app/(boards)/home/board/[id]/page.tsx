"use client";
import List from "@/components/List";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddClass from "@/components/Create/create";
import { useDnd, useMutations } from "@/functions/mutations";
import { useFetchData } from "@/functions/queries";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useQueryClient } from "@tanstack/react-query";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
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
  useEffect(() => {
    setCurrList(lists);
    updateDndList();
    refetch();
  }, [updateDndList, refetch, currList, isDndMutationLoading, lists]);
  // //Handle Drag and drop for Drag drop context

  // function onDragEnd(result) {
  //   const { source, destination } = result;

  //   // dropped outside the list
  //   if (!destination) {
  //     return;
  //   }
  //   const sInd = +source.droppableId;
  //   const dInd = +destination.droppableId;

  //   if (sInd === dInd) {
  //     const items = reorder(state[sInd], source.index, destination.index);
  //     const newState = [...state];
  //     newState[sInd] = items;
  //     setState(newState);
  //   } else {
  //     const result = move(state[sInd], state[dInd], source, destination);
  //     const newState = [...state];
  //     newState[sInd] = result[sInd];
  //     newState[dInd] = result[dInd];

  //     setState(newState.filter((group) => group.length));
  //   }
  // }
  
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
    refetch()
    setCurrList(items);
    
  }
  if (isListLoading) {
    return <Spinner />;
  }
  if (isListError) return <pre>{JSON.stringify(error)}</pre>;
  if (isListSuccess || isListStale) {
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
            {currList?.map((list: { id: string; name: string; bookmarks: any[] }) => {
              return (
                <List
                  isLoading={isDndMutationLoading}
                  key={list.id}
                  name={list.name}
                  id={list.id}
                  bookmarks={list.bookmarks}
                />
              );
            })}
          </div>
        </DragDropContext>
      </div>
    );
  }
}
