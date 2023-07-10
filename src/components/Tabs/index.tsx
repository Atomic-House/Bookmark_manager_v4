"use client";
import { useMutations } from "@/functions/mutations";
import { Tabs, TabList, Spinner, TabPanels, Tab, TabIndicator } from "@chakra-ui/react";
import { useState } from "react";
import AddClass from "../Create/create";
import { useFetchData } from "@/functions/queries";
import { TabsInterface } from "@/types";
import PanelTab from "./components/Panels";
const style = { className: "flex justify-center items-center" };
export default function UserTabs({
  tabs,
  isTabsLoading,
  tabsError,
  isTabsError,
  isTabSuccess,
  isTabStale,
  variant,
  id,
  boardId,
}: {
  variant: "unstyled" | "outline";
  id: string;
  tabs: TabsInterface[];
  isTabsLoading: boolean;
  isTabSuccess: boolean;
  isTabStale: boolean;
  tabsError: any;
  isTabsError: boolean;
  boardId: string;
}) {
  const [name, setName] = useState("");
  const {
    mutateAsync: createTab,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutations("create tabs", "tabs", name, "", id, "POST");

  const {
    mutateAsync: createList,
    isLoading: isCreateListLoading,
    error: createListError,
    isError: isCreateListError,
    isSuccess: isCreateListSuccess,
  } = useMutations("create lists", "lists", name, "", `${id}/${boardId}`, "POST");
  if (isError || isTabsError || isCreateListError) {
    console.error(error, createListError);
  }
  if (isTabSuccess && isTabStale) {
    return (
      <Tabs variant={variant} key={id}>
        <TabList className="flex gap-3 justify-between w-full ">
          {tabs.map((tab: TabsInterface) => (
            <Tab className="m-2" key={tab.id}>
              {tab.name}
            </Tab>
          ))}
          {isLoading || isTabsLoading ? <Spinner /> : ""}
          <AddClass
            onSubmit={createTab}
            onChange={(e) => setName(e.target.value)}
            isLoading={isLoading}
            placeholder="+"
            category="tabs"
            positionStyles=""
            buttonStyles="dark:bg-blue-800 p-2 flex justify-center items-center rounded-md"
          />
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
        <TabPanels>
          {tabs.map((tab: TabsInterface) => (
            <PanelTab id={tab.id} key={tab.id} boardId={id} />
          ))}
        </TabPanels>
      </Tabs>
    );
  }
}
