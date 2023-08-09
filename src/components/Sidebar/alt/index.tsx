// Custom sidebar component

"use client";
import { AiOutlineTeam } from "@react-icons/all-files/ai/AiOutlineTeam";
import { BiTrashAlt } from "@react-icons/all-files/bi/BiTrashAlt";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";
import { AiFillLayout } from "@react-icons/all-files/ai/AiFillLayout";
import { AiOutlineDoubleLeft } from "@react-icons/all-files/ai/AiOutlineDoubleLeft";
import { MdInbox } from "@react-icons/all-files/md/MdInbox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SelectWorkspace from "./component/Select";
import Create from "@/components/Create/alt";
import { BiBuildingHouse } from "@react-icons/all-files/bi/BiBuildingHouse";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useMutations } from "@/functions/mutations";
import { BoardWithTabs, WorkspaceWithBoards } from "@/types";
import { useFetchData } from "@/functions/queries";
import { TiTick } from "@react-icons/all-files/ti/TiTick";

export default function Sidebar({
  ws,
}: {
  ws?: WorkspaceWithBoards[] | undefined;
}) {
  const pathname = usePathname();
  //Set which nav is selected by inferring from pathname

  const [mouseOver, onMouseOver] = useState("");
  const [collapse, toggleCollapse] = useState(false);
  //Functions and hooks to execute

  const [boardName, setBoardName] = useState("");
  const wsId = useAppSelector((state) => state.workspace.id);
  const boards = useAppSelector((state) => state.workspace.array);
  const router = useRouter();
  //Extracts board id from pathname
  const boardId = pathname.replace("/main/home/board/", "");
  //Custom mutation hook which adds a board
  const { mutateAsync, isSuccess } = useMutations(
    "create board",
    "boards",
    boardName,
    "",
    "",
    wsId,
    "POST",
  );
  //Custom hook to fetch boards from the selected workspace
  const { data: boardsArray, refetch } = useFetchData<BoardWithTabs[]>(
    "boards",
    wsId,
    false,
  );
  const {
    mutateAsync: deleteBoard,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
  } = useMutations("delete board", "boards", "", "", "", boardId, "PUT");
  const [boardsList, setBoardsList] = useState<BoardWithTabs[] | undefined>(
    boardsArray || boards,
  );
  useEffect(() => {
    refetch();
    setBoardsList(boardsArray);
  }, [wsId, refetch, boardsArray]);
  if (isDeleteSuccess) {
    router.push("/main/home");
  }

  return (
    // This is the full container for sidebar and it's contents
    <div
      className={`rounded-2xl transition-all duration-300 bg-white h-[100vh] drop-shadow-2xl ${
        collapse ? "w-[5vw]" : "w-[18vw]"
      }`}
    >
      <div className="flex justify-center font-semibold mx-4 my-6 text-2xl text-[#422AFB] ">
        {collapse ? <BiBuildingHouse /> : "Brand"}
      </div>
      {/* Select Workspace */}
      <SelectWorkspace collpase={collapse} ws={ws!} />
      {/*  Navigation    */}
      <div className="flex flex-col">
        {navList.map((nav) => (
          <Link
            href={nav.link}
            key={nav.id}
            className={`flex gap-2 justify-start items-center p-2 m-4 rounded-lg duration-300 text-slate-400 hover:text-slate-800 hover:bg-slate-100 ${
              pathname === nav.link ? "bg-blue-100" : ""
            }`}
          >
            <nav.icon
              className={`text-2xl ${
                pathname.includes("trash") && nav.link === "/main/trash"
                  ? "text-red-500"
                  : ""
              }`}
            />

            {!collapse && <span className="font-semibold">{nav.name}</span>}
          </Link>
        ))}
      </div>
      <hr />
      {/* Boards   */}
      <div className="flex justify-between mx-4 my-2">
        {" "}
        <div className="flex gap-1 justify-center items-center font-semibold text-[1.2rem]">
          <AiFillLayout className="text-slate-500" />
          {!collapse && <p>Boards</p>}
        </div>
        {!collapse && (
          <Create
            triggerPlaceholder="+"
            buttonStyle="text-black rounded-lg hover:bg-slate-200 duration-300 items-center p-2 relative  "
            submitBtnStyle="bg-[#422AFB]"
            bodyStyle="bg-slate-50  p-6 rounded-lg flex flex-col "
            headerStyle="text-xl font-semibold"
            header={<p>New board</p>}
            contentStyle="bg-slate-50 mb-4 mt-2 rounded-lg  "
            content={<p>Create a new board</p>}
            inputStyle="bg-slate-50 p-2 rounded-xl placeholder:text-slate-400"
            placeholder="Type list name here..."
            onChange={(e) => setBoardName(e.target.value)}
            onSubmit={(e) => mutateAsync(e)}
            isSuccess={isSuccess}
            successElement={<TiTick />}
          />
        )}
      </div>
      <div className="flex flex-col mx-4 gap-2 p-2 ">
        {boardsList?.map((board) => (
          <Link
            href={`/main/home/board/${board.id}`}
            key={board.id}
            //remove this on mouse over after testing
            onMouseOver={() => onMouseOver(board.id)}
            className={`flex justify-between duration-300 p-1 ${
              mouseOver === board.id ? "bg-slate-100 " : ""
            } ${
              boardId === board.id ? "bg-blue-100 scale-[1.01] rounded-lg" : ""
            }
              `}
          >
            <div className="flex gap-2 items-center">
              <AiFillLayout
                className={boardId === board.id ? "text-[#422AFB]" : ""}
              />
              {!collapse && board.name}
            </div>
            <div
              className={
                mouseOver === board.id
                  ? "bg-orange-600 p-0.5 text-white rounded-md "
                  : "hidden"
              }
            >
              {/* {board.count} */}
              <p>{board?.tabs?.length}</p>
            </div>
          </Link>
        ))}
      </div>
      <div
        className={`float-right sticky top-16 p-2 m-3 text-2xl text-white bg-violet-700 rounded-lg  transition-all duration-300 ${
          collapse ? "rotate-180" : ""
        }`}
        onClick={() => toggleCollapse(!collapse)}
      >
        <AiOutlineDoubleLeft className={``} />
      </div>
    </div>
  );
}
//Keep this code for adding css to the board link clicked
// + pathname.includes(`${board.id}`)
//                   ? ""
//                   : ""
//

const navList = [
  {
    name: "Inbox",
    id: 1,
    link: "/main/home",
    icon: MdInbox,
  },
  {
    name: "Members",
    id: 2,
    link: "/main/members",
    icon: AiOutlineTeam,
  },
  {
    name: "Trash",
    id: 3,
    link: "/main/trash",
    icon: BiTrashAlt,
  },
  {
    name: "Settings",
    id: 4,
    link: "/main/settings",
    icon: AiFillSetting,
  },
];
