"use client";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
export default function Search() {
  return (
    <>
      <div className="flex  items-center gap-3 dark:bg-slate-950 m-2 py-2 px-6 rounded-full">
        <label htmlFor="search">
          <AiOutlineSearch />
        </label>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="focus:outline-none w-fit focus:border-none input input-ghost dark:focus:bg-slate-950"
        />
      </div>
    </>
  );
}
