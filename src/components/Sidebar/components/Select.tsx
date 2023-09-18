"use client";
import { Workspace } from "@/schema/workspace";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BiChevronUp } from "@react-icons/all-files/bi/BiChevronUp";
export default function Select({
  workspaces,
  collapse,
}: {
  workspaces: Workspace[];
  collapse?: boolean;
}) {
  const [selected, setSelected] = useState<Workspace>(
    workspaces.find(
      (w) => w.id === window.localStorage.getItem("defaultWs")!,
    ) || workspaces[0],
  );
  useEffect(() => {
    window.localStorage.setItem("defaultWs", `${selected.id}`);
  }, [selected]);
  return (
    <div className="relative dropdown w-full">
      <label
        tabIndex={0}
        className="flex items-center  gap-2 bg-[#11047A] p-3 text-white relative w-full "
      >
        {/* Trigger */}
        <img
          className="avatar"
          src={selected.icon!}
          width={!collapse ? 24 : 30}
          height={24}
          alt={selected.name}
        />
        {!collapse && (
          <>
            {" "}
            <span>{selected.name}</span>
            <span>
              <BiChevronUp className={` transition-all duration-300`} />
            </span>
          </>
        )}
      </label>

      {/* Options  */}

      <ul
        tabIndex={0}
        className={` ${
          collapse ? "w-[24vw]" : ""
        } absolute dropdown-content z-50 flex flex-col gap-4 dark:bg-slate-900  p-3 rounded-xl drop-shadow-lg duration-300 transition-all justify-center  `}
      >
        <li className="flex items-center justify-center">
          <Link
            href={"/create_workspace"}
            className="flex items-center gap-2 dark:bg-slate-950 px-8 py-2 rounded-sm text-[#5d4af9]"
          >
            {" "}
            <span className="text-2xl">+</span> Create workspace
          </Link>
        </li>
        {workspaces.map((workspace) => (
          <li
            className="flex gap-2 cursor-pointer hover:bg-slate-950 p-2 rounded-lg duration-300"
            key={workspace.id}
            onClick={() => setSelected(workspace)}
          >
            <img
              className="avatar "
              loading="lazy"
              src={workspace.icon!}
              width={24}
              height={24}
              alt={selected.name}
            />
            <p>{workspace.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
