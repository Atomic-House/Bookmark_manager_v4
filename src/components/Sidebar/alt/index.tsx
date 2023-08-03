"use client";
import house from "../../../../public/house.svg";
import { Transition } from "@headlessui/react";
import { MdNaturePeople } from "@react-icons/all-files/md/MdNaturePeople";
import { BiTrashAlt } from "@react-icons/all-files/bi/BiTrashAlt";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";
import { AiFillLayout } from "@react-icons/all-files/ai/AiFillLayout";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { MdInbox } from "@react-icons/all-files/md/MdInbox";
import { FcHome } from "@react-icons/all-files/fc/FcHome";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AddClass from "@/components/Create/create";
import { ChakraProvider } from "@chakra-ui/react";
export default function Sidebar({ children }: { children: React.ReactNode }) {
  //Custom mutation hook which adds a board

  //Handle collapses
  const pathname = usePathname();
  const [isCollapsed, toggleCollapsed] = useState(false);
  const [clicked, setClicked] = useState(0);
  return (
    // This is the full container for sidebar and it's contents
    <div className="flex">
      <div className="rounded-2xl bg-slate-50 h-[100vh] drop-shadow-xl md:w-[23vw]">
        <div className="flex justify-center font-bold m-4 text-2xl text-[#422AFB] ">
          Brand
        </div>
        {/*  Navigation    */}
        <div
          className="flex bg-[#11047A] cursor-pointer text-white p-3 justify-between rounded-lg"
          onClick={() => toggleCollapsed(!isCollapsed)}
        >
          {" "}
          <div>
            <p className="flex gap-2 items-center text-xl">
              {" "}
              <FcHome /> Atomic House{" "}
            </p>{" "}
          </div>
          <div
            className={`flex justify-center items-center transition-transform duration-300 ${!isCollapsed ? " " : " rotate-180"
              }`}
          >
            <BsChevronDown className="sticky" />
          </div>
        </div>

        <Transition
          show={!isCollapsed}
          enter="transition-all duration-300"
          enterFrom="opacity-0 "
          enterTo="opacity-60"
          leave="transition-all duration-300"
          leaveFrom="opacity-60"
          leaveTo="opacity-0"
          className={"m-2"}
        >
          <div className="flex flex-col transition-all duration-300">
            {navList.map((nav) => (
              <Link
                href={nav.link}
                key={nav.id}
                className="flex gap-2 justify-start items-center m-4"
              >
                <nav.icon className="text-2xl text-slate-500" />
                <span className="font-semibold">{nav.name}</span>
              </Link>
            ))}
          </div>
        </Transition>
        <hr />
        {/* Boards   */}
        <div className="flex justify-between m-4">
          {" "}
          <div className="flex gap-2 items-center font-semibold text-[1.2rem]">
            <AiFillLayout className="text-slate-500" />
            <p>Boards</p>
          </div>
          <ChakraProvider>
            <AddClass
              category="boards"
              add_edit={"Add a "}
              placeholder={
                <AiOutlinePlus className="text-2xl cursor-pointer text-slate-500" />
              }
            />
          </ChakraProvider>
        </div>
        <div className="flex flex-col gap-2 m-4">
          {boards.map((board) => (
            <Link
              href={`/home/main/${board.id}`}
              key={board.id}
              //remove this on mouse over after testing
              onMouseOver={() => setClicked(board.id)}
              className={`flex justify-between duration-300  ${clicked === board.id ? "bg-blue-50  scale-[1.01] " : ""
                }
                  `}
            >
              <div className="flex gap-2 items-center">
                <AiFillLayout
                  className={clicked === board.id ? "text-[#422AFB]" : ""}
                />
                {board.name}
              </div>
              <div
                className={
                  clicked === board.id
                    ? "bg-orange-600 p-1 text-white rounded-md "
                    : "hidden"
                }
              >
                {board.count}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
//Keep this code for adding css to the board link clicked
// + pathname.includes(`${board.id}`)
//                   ? ""
//                   : ""
//
const boards = [
  {
    name: "Website design",
    id: 999,
    count: 3,
  },
  {
    name: "Inpirations",
    id: 88,
    count: 4,
  },
  {
    name: "New",
    id: 989,
    count: 0,
  },
];
const navList = [
  {
    name: "Inbox",
    id: 1,
    link: "/home",
    icon: MdInbox,
  },
  {
    name: "Members",
    id: 2,
    link: "/members",
    icon: MdNaturePeople,
  },
  {
    name: "Trash",
    id: 3,
    link: "/trash",
    icon: BiTrashAlt,
  },
  {
    name: "Settings",
    id: 4,
    link: "/settings",
    icon: AiFillSetting,
  },
];
