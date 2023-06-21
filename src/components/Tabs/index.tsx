"use client"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const style = { className: "flex justify-center items-center" };
export default function UserTabs() {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p {...style}>one!</p>
        </TabPanel>
        <TabPanel>
          <p {...style}>two!</p>
        </TabPanel>
        <TabPanel>
          <p {...style}>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
