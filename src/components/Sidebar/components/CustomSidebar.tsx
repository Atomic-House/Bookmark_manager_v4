"use client";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdDashboard } from "@react-icons/all-files/md/MdDashboard";
import { MdInbox } from "@react-icons/all-files/md/MdInbox";
import Link from "next/link";
import Image from "next/image";
import Svg1 from "@/../public/Svg-01.svg";
import { useState } from "react";
import SwitchButton from "@/components/ThemeSwitch";
import { BsTrashFill } from "@react-icons/all-files/bs/BsTrashFill";
import Select from "@/components/Select";
import AddClass from "@/components/Create/create";
import MyBoards from "./AltBoards";
import { useMutations } from "@/functions/mutations";
import { useAppSelector } from "@/store/hooks";
import DeleteBoardModal from "@/components/Modal";
import { usePathname, useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";
export default function MySidebar({ ws }: { ws: any[] }) {
  const [closed, setClosed] = useState(false);
  const [name, setName] = useState("");
  const [boardName, setBoardName] = useState("");
  const wsId = useAppSelector((state) => state.workspace.id);
  const pathname = usePathname();
  const router = useRouter();
  const boardId = pathname.replace("/main/home/board/", "");
  const inbox = useAppSelector((state) => state.workspace.inboxId);

  const { mutateAsync, isLoading } = useMutations(
    "create workspace",
    "workspaces",
    name,
    "",
    "",
    "create",
    "POST",
  );
  const { mutateAsync: addBoad, isLoading: isBoardLoading } = useMutations(
    "create board",
    "boards",
    boardName,
    "",
    "",
    wsId,
    "POST",
  );
  const {
    mutateAsync: deleteBoard,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
  } = useMutations("delete board", "boards", "", "", "", boardId, "PUT");
  if (isDeleteSuccess) {
    router.push("/main/home");
  }

  return (
    <div className="relative drop-shadow-lg">
      {" "}
      <div
        className={`h-screen ${
          closed ? "w-16" : "w-64"
        } bg-white dark:bg-slate-900  flex flex-col transition-all duration-300 ease-in-out`}
      >
        <Link
          href={`/main/home`}
          passHref
          className={`flex text-blue-700  dark:text-white justify-center items-center py-[60px] flex-col transition-all text-xl font-bold duration-300 $`}
        >
          <Image src={Svg1} alt="atomic house logo" width={30} height={30} />
          {!closed && (
            <>
              <div>Atomic</div>
              <div>House</div>
            </>
          )}
        </Link>

        <AddClass
          add_edit={"Add a "}
          isLoading={isBoardLoading}
          category="boards"
          placeholder="+"
          buttonStyles="text-black p-1 "
          positionStyles="flex bg-white justify-center items-center"
          onSubmit={addBoad}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <DeleteBoardModal
          type="button"
          desc={<BsTrashFill />}
          func={deleteBoard}
          confirmation={"Move board to trash?"}
          isLoading={isDeleteLoading}
          isSuccess={isDeleteSuccess}
        />
        <ul className="text-black dark:text-white transition-all duration-300 mx-2 px-2">
          <Box
            color={`${pathname.includes("board") ? "blue" : ""}`}
            className="flex justify-between  py-4 text-xl transition-all ease-in gap-2"
          >
            {!closed && <MyBoards />}
            <span className="px-2 sticky">
              <MdDashboard className="flex justify-center items-center sticky" />
            </span>
          </Box>

          <Box
            color={`${
              !pathname.includes("board") && !pathname.includes("trash")
                ? "blue"
                : ""
            }`}
            className={
              "flex justify-between items-center py-4 text-xl transition-all ease-in "
            }
          >
            {!closed && <Link href={`/main/home`}>Inbox</Link>}
            <span className="px-2">
              <MdInbox />
            </span>
          </Box>
          <Box
            color={pathname.includes("trash") ? "red" : ""}
            as={Link}
            href={"/main/trash"}
            className={
              "flex cursor-pointer justify-between items-center py-4 text-xl transition-all ease-in "
            }
          >
            {!closed && <span>Trash</span>}
            <span className="px-2">
              <BsTrashFill />
            </span>
          </Box>
        </ul>
        <div className="flex flex-col justify-center items-center dark:text-white py-2 text-black transition-all duration-300 min-w-fit sticky top-96 text-2xl"></div>
        <div className="flex justify-between gap-9 absolute bottom-0">
          <Select collapsed={closed} ws={ws} />
        </div>
        <div
          onClick={() => setClosed(!closed)}
          className="hover:bg-cyan-400 w-fit p-2 rounded-full duration-300 transition-all "
        >
          {" "}
          <MdKeyboardArrowLeft
            className={`${
              closed ? "rotate-180" : ""
            } duration-300 transition-all`}
          />
        </div>

        <AddClass
          add_edit={"Add a "}
          isLoading={isLoading}
          category="workspaces"
          placeholder="+"
          positionStyles="absolute bottom-0 right-0"
          buttonStyles="py-[0.4rem] px-7 bg-blue-500"
          onChange={(e) => setName(e.target.value)}
          onSubmit={mutateAsync}
        />
      </div>
    </div>
  );
}
