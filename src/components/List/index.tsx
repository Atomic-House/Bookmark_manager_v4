"use client";
import Bookmark from "../Bookmark";
import { BsPencilFill } from "react-icons/bs";
export default function List({
  name,
  id,
  bookmarks,
}: {
  name: string;
  id: string;
  bookmarks: { id: string; name: string; link: string }[];
}) {
  return (
    <div className="m-5 bg-slate-100 dark:bg-slate-900 p-4">
      <div className="flex  justify-between items-center">
        {name}
        <BsPencilFill className="text-xs" />
      </div>
      <div>
        {bookmarks.map((bm) => (
          <Bookmark name={bm.name} id={bm.id} link={bm.link} key={bm.id} />
        ))}
      </div>
    </div>
  );
}
