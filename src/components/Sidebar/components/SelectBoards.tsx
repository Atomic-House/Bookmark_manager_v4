"use client";
import Add from "@/components/Add";
import { Board } from "@/schema/board";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { BiChevronUp } from "@react-icons/all-files/bi/BiChevronUp";
import { MdDashboard } from "@react-icons/all-files/md/MdDashboard";
import { useCreate } from "@/hooks/mutations";
export default function SelectBoards({
  boards,
  collapse,
  wsId,
  loading,
}: {
  wsId?: string;
  boards?: Board[];
  collapse?: boolean;
  loading?: React.JSX.Element;
}) {
  const [open, toggleOpen] = useState(true);
  const [name, setName] = useState("");
  const { mutateAsync, isLoading, isError, error, failureReason } = useCreate<
    Board,
    { name: string; icon: string }
  >(wsId!, { name: name, icon: "" }, "board", "create");
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
              onChange={(e) => setName(e.target.value)}
              onSubmit={mutateAsync}
              dropdownX={"dropdown-right"}
              dropdownY="dropdown-bottom"
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
        {boards?.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className={collapse ? "" : `flex gap-4`}
          >
            <Image
              src={board.icon!}
              width={collapse ? 25 : 20}
              height={collapse ? 25 : 20}
              alt={board.name}
            />
            {!collapse && board.name}
          </Link>
        ))}
      </Transition>
    </div>
  );
}
