"use client"
import type { ListWithBookmarks } from "@/schema/list";
import IconPicker from "../Icon/iconpicker";
import Add from "../Add";
import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle"
import EditListOptions from "./components/ListOptions";
import { BiDotsVerticalRounded } from "@react-icons/all-files/bi/BiDotsVerticalRounded"
export default function List({ ...props }: ListWithBookmarks) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center px-4">
        <span className="flex justify-between gap-2">
          <IconPicker />
          {props.name}
        </span>
        <span className="flex justify-between gap-2">
          <Add inputPlaceholder="List name..." confirmBtnText="Add" cancelBtnText="Reset" triggerText={<AiFillPlusCircle />} heading="New List" content="Add a new List" />
          <EditListOptions trigger={<BiDotsVerticalRounded />} />
        </span>
      </div>
      <div>
        {props?.bookmarks?.map((bookmark) => (
          <div key={bookmark.id}></div>
        ))}
      </div>
    </div>

  )
}
