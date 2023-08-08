//Page for the each board for the user containing the tabs and list according to the board id in the route
"use client";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import AddClass from "@/components/Create/create";
import { useMutations } from "@/functions/mutations";
import { useFetchData } from "@/functions/queries";
import UserTabs from "@/components/Tabs";
import { TabWithLists } from "@/types";
import { Workspace } from "@prisma/client";
export default function Page({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  //gets the board id from route  params
  const id = params.id;
  //Creates a tab using custom useMutations hook
  const {
    mutateAsync: createTab,
    isLoading: isCreateTabLoading,
    isSuccess,
  } = useMutations("create tabs", "tabs", name, "", "", id, "POST");
  //Fetches the tabs using the useFetchData custom hook
  const {
    data: tabs,
    isLoading: isTabsLoading,
    isError: isTabsError,
    error: tabsError,
    isSuccess: isTabSuccess,
    isStale: isTabStale,
  } = useFetchData<TabWithLists[] & Workspace & { workspaceId: string }>(
    "tabs",
    id,
    false,
  );
  //return error on screen
  if (isTabsError) return <pre>{JSON.stringify(tabsError)}</pre>;
  if (isTabSuccess && isTabStale) {
    if (tabs?.length === 0) {
      //Returns this view when a board contains empty tabs
      return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div>Empty...</div>

          <AddClass
            add_edit={"Add a"}
            isLoading={isCreateTabLoading}
            category="tab"
            placeholder="Add a tab"
            buttonStyles="bg-blue-500 p-2"
            positionStyles=""
            onSubmit={createTab}
            onChange={(e) => setName(e.target.value)}
            isSuccess={isSuccess}
          />
        </div>
      );
    }
    //Returns this view when a board contains tabs with data
    return (
      <div>
        <div id="tabs">
          <UserTabs
            boardId={id}
            variant="unstyled"
            key={id}
            id={id}
            tabs={tabs!}
            isTabsError={isTabsError}
            isTabSuccess={isTabSuccess}
            isTabStale={isTabStale}
            isTabsLoading={isTabsLoading}
            tabsError={tabsError}
          />
          {isTabsLoading ? <Spinner /> : null}
        </div>
      </div>
    );
  }
}
