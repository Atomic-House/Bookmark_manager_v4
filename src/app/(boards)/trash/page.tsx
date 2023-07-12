"use client";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { SiConvertio } from "react-icons/si";
export default function Page() {
  return (
    <div className="m-5">
      <h1 className="text-2xl mb-6">Trash</h1>
      <Tabs colorScheme="green" variant={"unstyled"}>
        <TabList>
          <Tab _selected={{ bgColor: "blue", textColor: "white" }} rounded={"lg"} px={"16"}>
            Lists
          </Tab>
          <Tab _selected={{ bgColor: "blue", textColor: "white" }} rounded={"lg"} px={"16"}>
            Bookmarks
          </Tab>

          <Tab _selected={{ bgColor: "blue", textColor: "white" }} rounded={"lg"} px={"16"}>
            Boards
          </Tab>
          <Tab _selected={{ bgColor: "blue", textColor: "white" }} rounded={"lg"} px={"16"}>
            Inbox
          </Tab>
        </TabList>
        <TabPanels>
          {/* Lists */}
          <TabPanel w={"75vw"} className="flex flex-col justify-between  w-[80vh]">
            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 1</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 2</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 3</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 4</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 5</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>
          </TabPanel>

          {/*Bookmarks*/}
          <TabPanel w={"75vw"} className="flex flex-col justify-between  w-[80vh]">
            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div>Bookmarks 1</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> Bookmarks 2</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> Bookmarks 3 </div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel w={"75vw"} className="flex flex-col justify-between  w-[80vh]">
            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> Board 1</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> Board 2</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> Board 3</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> Board 4</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> Board 5</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel w={"75vw"} className="flex flex-col justify-between  w-[80vh]">
            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 1</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 2</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 3</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 4</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 ">
              <div className="flex items-center gap-2">
                <SiConvertio />
                <div>
                  <div> List 5</div>
                  <div className="text-xs">Date: </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="underline text-blue-700">Restore</div>
                <div>
                  <BiSolidTrashAlt />
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
