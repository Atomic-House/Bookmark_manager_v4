"use client";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Profile from "@/components/Profile";
export default function Page() {
  return (
    <div className="m-9">
      <h1 className="text-2xl text-blue-950">Account Settings</h1>
      <Tabs variant={"solid-rounded"} rounded={"sm"}>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Apps</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Profile />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
