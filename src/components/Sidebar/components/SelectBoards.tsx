"use client";
import Add from "@/components/Add";
import { Board } from "@/schema/board";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronUp } from "@react-icons/all-files/bi/BiChevronUp";
import { MdDashboard } from "@react-icons/all-files/md/MdDashboard";
export default function SelectBoards({
  boards,
  collapse,
}: {
  boards: Board[];
  collapse?: boolean;
}) {
  const [open, toggleOpen] = useState(true);
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
              ? "xl:text-4xl md:text-3xl sm:text-2xl "
              : "sm:text-xl md:text-2xl"
          }`}
          onClick={() => toggleOpen(!open)}
        >
          <MdDashboard />
          {!collapse && <span> Boards {boards.length}</span>}
        </button>
        <span className={`flex items-center gap-2 pr-2 mr-3 `}>
          {!collapse && (
            <Add
              dropdownX={collapse ? "dropdown-right" : "dropdown-left"}
              dropdownY="dropdown-top"
              confirmBtnText="Add"
              cancelBtnText="Reset"
              triggerText="+"
              heading="New Board"
              inputPlaceholder="board name..."
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
        as="div"
        show={open}
        className={`grid grid-cols-1 ${collapse ? "" : "px-8"}  gap-3`}
      >
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className={collapse ? "" : `flex gap-4`}
          >
            <img
              src={board.icon!}
              width={collapse ? 25 : 20}
              alt={board.name}
            />
            {!collapse && board.name}
          </Link>
        ))}
      </Transition>
    </div>
  );
}
