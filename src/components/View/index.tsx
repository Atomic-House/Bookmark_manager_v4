"use client";
import { ViewWithLists } from "@/schema/view";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import List from "../List";
import { fakeBookmarks } from "@/functions/fakedata";
import Add from "../Add";
import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
export default function ViewTabs({ views }: { views?: ViewWithLists[] }) {
  return (
    <div>
      <Tab.Group>
        <Tab.List className={"tabs"}>
          {views?.map((t, i) => (
            <Tab as={Fragment} key={i}>
              {({ selected }) => (
                <button
                  className={`tab tab-bordered ${selected ? "tab-active" : ""}`}
                >
                  {t.name.toString().slice(0, 15)}
                </button>
              )}
            </Tab>
          ))}
          <button className="">
            <Add
              triggerText={<AiOutlinePlus className="font-bold" />}
              dropdownX="dropdown-right"
              dropdownY="dropdown-bottom"
              heading="Add a new Layout"
              inputPlaceholder="Layout Name"
              content="Add a new layout"
              confirmBtnText="Add"
              cancelBtnText="Reset"
            />
          </button>
        </Tab.List>
        <Tab.Panels as="div">
          {views?.map((v) => (
            <Tab.Panel className={"grid grid-cols-4"} key={v.id}>
              {v?.lists?.map((l) => (
                <List {...l} key={l.id} bookmarks={fakeBookmarks(10)} />
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
