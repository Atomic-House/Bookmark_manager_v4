//user profile page
"use client";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Profile from "@/components/Profile";
export default function Page() {
  return (
    <div className="m-9">
      <h1 className="text-2xl text-blue-950">Account Settings</h1>
      <Tabs variant={"solid-rounded"} rounded={"sm"}>
        <TabList>
          {/*  Tab buttons to navigate between profile and app  */}
          <Tab>Profile</Tab>
          <Tab>Apps</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/*  Profile tab panel*/}
            <Profile />
          </TabPanel>

          <TabPanel>
            {/*  app setting tab panel (to be edited)*/}
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
