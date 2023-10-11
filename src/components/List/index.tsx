"use client";
import type { List } from "@/schema/list";
import IconPicker from "../Icon/iconpicker";
import Add from "../Add";
import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";
import EditListOptions from "./components/ListOptions";
import { BiDotsVerticalRounded } from "@react-icons/all-files/bi/BiDotsVerticalRounded";
import ListView from "../Bookmark/components/view/List";
import { useBookmarks } from "@/hooks/bookmarksFunctions";
export default function ListMain({ ...list }: List) {
  const { createBookmark, setBookmark, bookmarksData, bookmark } = useBookmarks(
    list?.id,
  );
  return (
    <li
      className={`p-4 flex flex-col gap-5 shadow-black hover:shadow-slate-900 duration-300 shadow-md   rounded-lg m-4 ${list.color} `}
    >
      {/* list name div */}
      <div className="flex justify-between items-center px-4">
        <span className="flex justify-between gap-2">
          <IconPicker icon={list.icon ? list.icon : "󰂺"} />
          {list.name}
        </span>
        <span className="flex justify-between gap-2 z-20">
          <Add
            inputPlaceholder="paste a link or url here..."
            confirmBtnText="Add"
            cancelBtnText="Reset"
            triggerText={
              <AiFillPlusCircle className="dark:text-blue-700 text-blue-500 " />
            }
            heading="New Bookmark"
            content=""
            onChange={(e) => setBookmark({ ...bookmark, url: e.target.value })}
            onSubmit={createBookmark.mutateAsync}
            isError={createBookmark.isError}
            isLoading={createBookmark.isLoading}
            isSuccess={createBookmark.isSuccess}
            error={createBookmark.error}
          />
          <EditListOptions id={list.id!} trigger={<BiDotsVerticalRounded />} />
        </span>
      </div>
      {/* bookmarks */}
      <ul className="grid grid-cols-1 gap-4 ">
        {bookmarksData.data?.map((bookmark) => (
          <ListView {...bookmark} key={bookmark.id!} />
        ))}
      </ul>
    </li>
  );
}
