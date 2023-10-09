"use client";
import Link from "next/link";
import { useTrashFunction } from "@/hooks/trashFunction";
import { useEffect } from "react";

type TrashType = "Bookmarks" | "Lists" | "Boards" | "Members";
export default function Trash({ type }: { type: TrashType }) {
  const {
    bookmarks,
    list,
    board,
    setId,
    id,
    trashList,
    trashBoard,
    trashBookmark,
  } = useTrashFunction();
  const empty = (
    <div className="flex flex-col items-center justify-center">
      Nothing in the trash here
    </div>
  );
  switch (type) {
    case "Bookmarks":
      return (
        <ul className="flex flex-col justify-between gap-5">
          {bookmarks.data?.length
            ? bookmarks.data.map((b) => (
                <div key={b.id} className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      {b.name ? b.name : b.title}
                    </span>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
              ))
            : empty}
        </ul>
      );
    case "Lists":
      return (
        <div>
          {list.data?.length
            ? list.data.map((l) => (
                <div key={l.id} className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">{l.name}</span>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
              ))
            : empty}
        </div>
      );
    case "Boards":
      return (
        <div>
          {board.data?.length
            ? board.data.map((b) => (
                <div key={b.id} className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">{b.name}</span>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
              ))
            : empty}
        </div>
      );
    case "Members":
      return <div>Member</div>;
    default:
      return (
        <div className="flex flex-col gap-5 items-center justify-center">
          <Link href="/trash?tab=Bookmarks">Bookmarks</Link>
          <Link href="/trash?tab=Lists">Lists</Link>
          <Link href="/trash?tab=Boards">Boards</Link>
          <Link href="/trash?tab=Members">Members</Link>
        </div>
      );
  }
}
