//Panels for collection of lists

"use client";
import { TabPanel } from "@chakra-ui/react";
import List from "@/components/List";
import { useFetchData } from "@/functions/queries";
import { useDnd, useMutations } from "@/functions/mutations";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import AddClass from "@/components/Create/create";
import { ListsWithBookmarks, TabWithLists } from "@/types";
import Sort from "@/components/Sort";
import Filter from "@/components/Filter";
import Views from "@/components/View";
import { ListPrefContext, type ListPrefs } from "@/components/context/ListPrefContext";
import Create from "@/components/Create/alt";
import { TiTick } from "@react-icons/all-files/ti/TiTick";
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
  const [listPrefs, setListPrefs] = useState<ListPrefs | undefined>();
  const { mutateAsync, isSuccess, isLoading } = useDnd(id);
  const {
    mutateAsync: createList,
    isLoading: isCreateListLoading,
    error: createListError,
    isError,
    isSuccess: createListSuccess,
  } = useMutations("create lists", "lists", name, "", "", id, "POST", "tabs", id);

  if (isListError || isError) {
    return (
      <TabPanel>
        <pre>{JSON.stringify("" || createListError || listError)}</pre>
      </TabPanel>
    );
  }
  const handleDragEnd = (result: DropResult) => {
    console.log(result);
  };

  if (isListLoading) {
    return (
      <>
        <TabPanel>
          <ListPrefContext.Provider value={{ listPrefs, setListPrefs }}>
            <div className="flex sticky z-10 gap-5 items-center">
              <AddClass
                onSubmit={createList}
                add_edit={"New "}
                onChange={(e) => setName(e.target.value)}
                isLoading={isCreateListLoading}
                placeholder="+  Add a new list"
                category="lists"
                positionStyles="sticky"
                buttonStyles="dark:bg-blue-800 bg-[#11047A] mb-3 text-white p-2 flex justify-center items-center rounded-lg"
                isSuccess={createListSuccess}
              />
              <Sort />
              <Filter />
              <Views />
            </div>
            <div
              className={`grid flex-wrap  gap-25 ${
                listPrefs?.view === "card" ? "sm:grid-cols-1" : "grid-cols-2"
              }`}
            >
              <DragDropContext onDragEnd={handleDragEnd}>
                {lists
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
  return (
    <>
      <TabPanel key={id}>
        <ListPrefContext.Provider value={{ listPrefs, setListPrefs }}>
          <div className="flex sticky z-10 gap-5 items-center">
            <Create
              triggerPlaceholder="+ Add a new list"
              // buttonStyle="text-black rounded-lg hover:bg-slate-200 duration-300 items-center p-2 relative  "

              buttonStyle="dark:bg-blue-800 bg-[#11047A]  mb-3 text-white p-2 flex justify-center items-center rounded-lg"
              submitBtnStyle="bg-[#422AFB]"
              bodyStyle="bg-slate-50  p-6 rounded-lg flex flex-col "
              headerStyle="text-xl font-semibold"
              header={<p>New List</p>}
              contentStyle="bg-slate-50 mb-4 mt-2 rounded-lg  "
              content={<p>Create a new list</p>}
              inputStyle="bg-slate-50 p-2 rounded-xl placeholder:text-slate-400"
              placeholder="Type list name here..."
              onChange={(e) => setName(e.target.value)}
              onSubmit={(e) => createList(e)}
              isSuccess={isSuccess}
              successElement={<TiTick />}
            />
            <Sort />
            <Filter />
            <Views />
          </div>
          <div
            className={`grid flex-wrap  gap-25 ${
              listPrefs?.view === "card" ? "sm:grid-cols-1" : "grid-cols-2"
            }`}
          >
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
