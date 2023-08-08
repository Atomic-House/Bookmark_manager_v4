//

"use client";
import { useMutations } from "@/functions/mutations";
import { Tab, TabIndicator, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddClass from "../Create/create";
import PanelTab from "./components/Panels";
import { TabWithLists } from "@/types";
export default function UserTabs({
  tabs,
  isTabsLoading,
  isTabsError,
  isTabSuccess,
  isTabStale,
  variant,
  id,
  boardId,
  type,
}: {
  variant: "unstyled" | "outline";
  id: string;
  tabs?: TabWithLists[];
  isTabsLoading: boolean;
  isTabSuccess: boolean;
  isTabStale: boolean;
  tabsError: any;
  isTabsError: boolean;
  boardId: string;
  type?: "board" | "inbox";
}) {
  const [name, setName] = useState("");
  const {
    mutateAsync: createTab,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutations("create tabs", "tabs", name, "", "", id, "POST");
  useEffect(() => {
    if (isError || isTabsError) {
      console.error(error);
    }
  }, [isError, isTabsError, error]);
  if (isTabSuccess && isTabStale) {
    return (
      <Tabs variant={variant} key={id}>
        <TabList className="flex gap-3 justify-between w-full">
          {tabs?.map((tab: TabWithLists) => (
            <Tab className="m-2" key={tab.id}>
              {tab.name}
            </Tab>
          ))}
          <AddClass
            add_edit={"Add a "}
            onSubmit={createTab}
            onChange={(e) => setName(e.target.value)}
            isLoading={isLoading}
            placeholder="+"
            category="tabs"
            positionStyles="flex items-center"
            buttonStyles="dark:bg-blue-800 bg-blue-400 hover:scale-90 rounded-md h-fit p-2 flex justify-center items-center rounded-md"
          />
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          mb={3}
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          {tabs?.map((tab: TabWithLists) => <PanelTab key={tab.id} {...tab} />)}
        </TabPanels>
      </Tabs>
    );
  }
}
