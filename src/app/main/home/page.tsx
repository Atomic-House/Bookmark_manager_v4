"use client";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import AddClass from "@/components/Create/create";
import { useAddTabsToInbox, useMutations } from "@/functions/mutations";
import { useFetchData } from "@/functions/queries";
import UserTabs from "@/components/Tabs";
import { useAppSelector } from "@/store/hooks";
import { Inbox } from "@prisma/client";
import { TabWithLists } from "@/types";
export default function Page({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  const inboxId = useAppSelector((state) => state.workspace.inboxId);
  const id = params.id;
  const {
    mutateAsync: createTab,
    isLoading: isCreateTabLoading,
    isSuccess,
    isError: isCreateTabError,
    error: createTabError,
  } = useAddTabsToInbox(inboxId, name);
  const {
    data: tabs,
    isLoading: isTabsLoading,
    isError: isTabsError,
    error: tabsError,
    isSuccess: isTabSuccess,
    isStale: isTabStale,
  } = useFetchData<Inbox  &  TabWithLists[]>("inbox", id, false);
  //Loading state spinner
  if (isTabsLoading) {
    return <Spinner />;
  }
  //return error on screen
  if (isTabsError) console.error(tabsError);
  if (isTabSuccess && isTabStale) {
    if (tabs?.length === 0) {
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
          />
        </div>
      );
    }
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
        </div>
      </div>
    );
  }
}