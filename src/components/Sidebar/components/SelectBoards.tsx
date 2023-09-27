"use client";
import Add from "@/components/Add";
import { Board } from "@/schema/board";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { FormEventHandler, useState, ChangeEventHandler } from "react";
import { BiChevronUp } from "@react-icons/all-files/bi/BiChevronUp";
import { MdDashboard } from "@react-icons/all-files/md/MdDashboard";
export default function SelectBoards({
  boards,
  collapse,
  createBoard,
  onChange,
  isFetching,
  isSuccess,
  isError,
  error,
  isMutating,
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
            <Add
              // emojiSelector={<IconPicker icon="🔖" />}
              onChange={onChange}
              onSubmit={createBoard}
              dropdownX={"dropdown-right"}
              dropdownY="dropdown-bottom"
              confirmBtnText="Add"
              cancelBtnText="Reset"
              triggerText="+"
              heading="New Board"
              inputPlaceholder="board name..."
              isLoading={isMutating}
              isSuccess={isSuccess}
              isError={isError}
              error={error}
            />
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
