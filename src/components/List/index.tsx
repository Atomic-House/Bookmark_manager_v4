"use client";
import type { ListWithBookmarks } from "@/schema/list";
import IconPicker from "../Icon/iconpicker";
import Add from "../Add";
import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";
import EditListOptions from "./components/ListOptions";
import { BiDotsVerticalRounded } from "@react-icons/all-files/bi/BiDotsVerticalRounded";
import ListView from "../Bookmark/components/view/List";
export default function List({ ...list }: ListWithBookmarks) {
  return (
    <div
      className={`p-4 flex flex-col gap-5 shadow-black hover:shadow-slate-900 duration-300 shadow-xl  rounded-lg m-4 ${list.color} `}
    >
      {/* list name div */}
      <div className="flex justify-between items-center px-4">
        <span className="flex justify-between gap-2">
          <IconPicker icon={list.icon ? list.icon : ""} />
          {list.name}
        </span>
        <span className="flex justify-between gap-2 z-20">
          <Add
            inputPlaceholder="Bookmark name..."
            confirmBtnText="Add"
            cancelBtnText="Reset"
            triggerText={
              <AiFillPlusCircle className="dark:text-blue-700 text-blue-500 " />
            }
            heading="New Bookmark"
            content="Add a new bookmark"
          />
          <EditListOptions trigger={<BiDotsVerticalRounded />} />
        </span>
      </div>
      {/* bookmarks */}
      <ul className="grid grid-cols-1 gap-4 ">
        {list?.bookmarks?.map((bookmark) => (
          <ListView {...bookmark} key={bookmark.id} />
        ))}
      </ul>
    </div>
  );
}
