"use client";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import AddClass from "@/components/Create/create";
import { useAddTabsToInbox, useMutations } from "@/functions/mutations";
import { useFetchData } from "@/functions/queries";
import UserTabs from "@/components/Tabs";
import { useAppSelector } from "@/store/hooks";
import { Inbox } from "@prisma/client";
import { InboxWithTabs, TabWithLists } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Page({ params }: { params: { id: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const inboxId = useAppSelector((state) => state.workspace.inboxId);
  console.log(inboxId);

  const id = params.id;
  const {
    mutateAsync: createTab,
    isLoading: isCreateTabLoading,
    isSuccess,
    isError: isCreateTabError,
    error: createTabError,
  } = useAddTabsToInbox(inboxId, name);
  const {
    data: inbox,
    isLoading: isTabsLoading,
    isError: isTabsError,
    error: tabsError,
    isSuccess: isTabSuccess,
    isStale: isTabStale,
  } = useFetchData<InboxWithTabs>("inbox", inboxId, false);
  //Loading state spinner
  // if (isTabsLoading || status === "loading") {
  //   return <Spinner />;
  // }
  if (status === "unauthenticated") {
    router.push("/user/auth/signin");
  }
  //return error on screen
  if (isTabsError) console.error(tabsError);
  if (isTabSuccess && isTabStale) {
    if (inbox?.tabs?.length === 0) {
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
    return (
      <div>
        <div id="tabs">
          <UserTabs
            type="inbox"
            boardId={inboxId}
            variant="unstyled"
            key={id}
            id={id}
            tabs={inbox?.tabs}
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
