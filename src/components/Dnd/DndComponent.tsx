import { useEffect, useState } from "react";
import { useFetchData } from "@/functions/queries";
import { useMutations, useDnd } from "@/functions/mutations";
import { DropResult } from "react-beautiful-dnd";
import { useQueryClient } from "@tanstack/react-query";
export default function DndComponent({ id, name }: { id: string; name: string }) {
  const queryClient = useQueryClient();
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

  return <div>DndComponentDndComponent</div>;
}
