"use client";
import List from "@/components/List";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddClass from "@/components/Create/create";
import { useMutations } from "@/functions/mutations";
import { useFetchData } from "@/functions/queries";
export default function Page({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
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
  } = useFetchData("lists", id);
  useEffect(() => {
    refetch();
  }, [refetch, mutateAsync]);
  if (isListLoading) {
    return <Spinner />;
  }
  if (isListError) console.error(error);
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
        <div
          id="lists"
          className="grid grid-cols-1 md:grid-cols-3 border-2 border-black w-full gap-3 m-5 place-items-center"
        >
          {lists?.lists?.map((list: { id: string; name: string; bookmarks: any[] }) => {
            return <List key={list.id} name={list.name} id={list.id} bookmarks={list.bookmarks} />;
          })}
        </div>
      </div>
    );
  }
}
