"use client";
import { MdOutlineDashboard, MdOutlineInbox } from "react-icons/md";
import { HiArrowCircleRight } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import Svg1 from "@/../public/Svg-02.svg";
import { useState } from "react";
import SwitchButton from "@/components/ThemeSwitch";
import { BsTrashFill } from "react-icons/bs";
import Select from "@/components/Select";
import AddClass from "@/components/Create/create";
import MyBoards from "./AltBoards";
import { useMutations } from "@/functions/mutations";
import { useAppSelector } from "@/store/hooks";
export default function MySidebar({ ws }: { ws: any[] }) {
  const [closed, setClosed] = useState(false);
  const [name, setName] = useState("");
  const [boardName, setBoardName] = useState("");
  const wsId = useAppSelector((state) => state.workspace.id);

  const { mutateAsync, isLoading } = useMutations(
    "create workspace",
    "workspaces",
    name,
    "create",
    "POST"
  );
  const { mutateAsync: addBoad, isLoading: isBoardLoading } = useMutations(
    "create board",
    "boards",
    boardName,
    wsId,
    "POST"
  );
  return (
    <div className="relative">
      {" "}
      <div
        className={`h-screen ${
          closed ? "w-16" : "w-64"
        } bg-white dark:bg-slate-900  flex flex-col transition-all duration-300 ease-in-out `}
      >
        <Link
          href={`/home`}
          className="flex bg-blue-500 dark:bg-blue-800 dark:text-white justify-center items-center py-[60px] flex-col transition-all text-xl font-bold duration-300"
        >
          <Image src={Svg1} alt="atomic house logo" width={30} height={30} />
          {!closed && (
            <>
              <div>Atomic</div>
              <div>House</div>
            </>
          )}
        </Link>

        <div className=" dark:bg-white bg-black dark:text-black text-white border-y-white flex justify-center text-xl font-bold">
          +
        </div>
        <AddClass
          category="boards"
          placeholder="new board"
          buttonStyles=""
          positionStyles=""
          onSubmit={addBoad}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <ul className="text-black dark:text-white transition-all duration-300 mx-2 px-2">
          <li className="flex justify-between items-center py-4 text-xl transition-all ease-in gap-2">
            {!closed && <MyBoards />}
            <span className="px-2">
              <MdOutlineDashboard className="flex justify-center items-center" />
            </span>
          </li>

          <li className="flex justify-between items-center py-4 text-xl transition-all ease-in ">
            {!closed && <Link href={`/board/inbox`}>Inbox</Link>}
            <span className="px-2">
              <MdOutlineInbox />
            </span>
          </li>
          <li className="flex justify-between items-center py-4 text-xl transition-all ease-in ">
            {!closed && <span>Trash</span>}
            <span className="px-2">
              <BsTrashFill />
            </span>
          </li>
        </ul>
        <div className="flex flex-col justify-center items-center dark:text-white py-2 text-black transition-all duration-300 min-w-fit sticky top-96 text-2xl">
          <div className="hover:bg-cyan-400  p-2 rounded-full duration-300 ">
            {" "}
            <HiArrowCircleRight
              onClick={() => setClosed(!closed)}
              className={`${closed ? "rotate-180" : ""}`}
            />
          </div>
          <div>
            {" "}
            <SwitchButton />
          </div>
        </div>
        <div className="flex justify-between gap-9 absolute bottom-0">
          <Select collapsed={closed} ws={ws} />
        </div>

        <AddClass
          category="workspaces"
          placeholder="+"
          positionStyles="absolute bottom-0 right-0"
          buttonStyles="py-[0.4rem] px-7"
          onChange={(e) => setName(e.target.value)}
          onSubmit={mutateAsync}
        />
      </div>
    </div>
  );
}
