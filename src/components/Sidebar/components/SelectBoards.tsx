"use client";
import Add from "@/components/Add";
import { Board } from "@/schema/board";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { FormEventHandler, useState, ChangeEventHandler } from "react";
import { BiChevronUp } from "@react-icons/all-files/bi/BiChevronUp";
import { MdDashboard } from "@react-icons/all-files/md/MdDashboard";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineFolderAdd } from "@react-icons/all-files/ai/AiOutlineFolderAdd";
export default function SelectBoards({
  boards,
  collapse,
  isFetching,
  isSuccess,
  isError,
  error,
  isMutating,
  wsId,
  currBoard,
}: {
  wsId?: string;
  boards?: Board[];
  collapse?: boolean;
  createBoard: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isFetching?: boolean;
  isMutating?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: unknown;
  currBoard?: { icon: string; name: string };
}) {
  const [open, toggleOpen] = useState(true);
  console.log(currBoard);

  return (
    <div>
      {/* Trigger  */}
      <div
        className={`flex items-center  mb-4 ${
          collapse ? "flex-col justify-center" : "justify-between"
        }`}
      >
        <button
          className={`px-8  flex items-center gap-2 duration-300 ${
            collapse
              ? "xl:text-3xl md:text-2xl sm:text-1xl "
              : "sm:text-md md:text-md"
          }`}
          onClick={() => toggleOpen(!open)}
        >
          <MdDashboard />
          {!collapse && <span> Boards {boards?.length}</span>}
        </button>
        <span className={`flex items-center gap-2 pr-2 mr-3 `}>
          {!collapse && (
            <div className="dropdown">
              <label tabIndex={0} className=" m-1">
                +
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={`/new/${wsId}`}>
                    <AiOutlinePlus className="font-bold text-2xl" /> Create a
                    new board
                  </Link>
                </li>
                <li>
                  <Link href={`/folder`}>
                    <AiOutlineFolderAdd className="font-bold text-2xl" />
                    Add a folder
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <BiChevronUp
            onClick={() => toggleOpen(!open)}
            className={`${
              open ? "rotate-0" : "rotate-180"
            } transition-all duration-300 flex `}
          />
        </span>
      </div>
      {/* Options  */}
      <Transition
        as="ul"
        show={open}
        className={`grid grid-cols-1 ${collapse ? "" : "px-8"}  gap-3`}
      >
        {boards?.map((board) => (
          <Link
            key={board.id}
            href={`/board?id=${board.id}&name=${board.name}&icon=${board.icon}`}
            className={collapse ? "" : `flex gap-4`}
          >
            <span>{board.icon}</span>
            {!collapse && board.name}
          </Link>
        ))}

        {isFetching ? (
          <span className="loading  loading-md loading-ring" />
        ) : (
          ""
        )}
      </Transition>
    </div>
  );
}
