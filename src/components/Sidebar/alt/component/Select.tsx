"use client";
import { useAppDispatch } from "@/store/hooks";
import {
  setArray,
  setId as setWsId,
  setInboxId,
} from "@/slices/workspaceSlice";
import { TiTick } from "@react-icons/all-files/ti/TiTick";
import { FcHome } from "@react-icons/all-files/fc/FcHome";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Create from "@/components/Create/alt";
import { useMutations } from "@/functions/mutations";
import { WorkspaceWithBoards } from "@/types";
//Add useAppSelector to add and send workspace across the app
export default function SelectWorkspace({
  ws,
  collpase,
}: {
  ws: WorkspaceWithBoards[];
  collpase: boolean;
}) {
  const [isOpen, toggleOpen] = useState(false);
  const [selected, setSelected] = useState(
    ws[0] || {
      name: "Select a workspace",
      id: "@#2fadfs",
      boards: [],
    },
  );
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const {
    mutateAsync,
    isLoading,
    isSuccess: isCreateWorkspaceSuccess,
  } = useMutations(
    "create workspace",
    "workspaces",
    name,
    "",
    "",
    "create",
    "POST",
  );
  useEffect(() => {
    dispatch(setArray(selected?.boards));
    dispatch(setWsId(selected?.id));
    dispatch(setInboxId(selected?.inbox?.id));
  }, [selected, dispatch]);

  return (
    <div
      className="relative"
      onMouseEnter={() => toggleOpen(true)}
      onMouseLeave={() => toggleOpen(false)}
    >
      <div
        className="flex justify-between bg-[#11047A] hover:bg-[#271481] cursor-pointer text-white p-3  rounded-lg relative"
        onClick={() => toggleOpen(!isOpen)}
      >
        {" "}
        <div>
          <p className="flex gap-2 items-center p-2 m-2 h-5 text-xl">
            {" "}
            <FcHome />
            {!collpase && selected.name}
          </p>{" "}
        </div>
        <div
          className={`flex justify-center items-center transition-transform duration-300 ${
            !isOpen ? " " : " rotate-180"
          }`}
        >
          <BsChevronDown className="sticky" />
        </div>
      </div>
      <Transition
        show={isOpen}
        className={"transition-all duration-300"}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex absolute z-[100] flex-col p-3 text-black rounded-lg transition-transform duration-300 w-[20vw] bg-slate-200">
          {ws?.slice(1, ws.length)?.map((w) => (
            <div
              className={`p-2 flex justify-between items-center  rounded-lg w-full cursor-pointer hover:bg-slate-100 duration-300 ${
                selected.id === w.id ? "bg-slate-100" : ""
              } `}
              key={w.id}
              onClick={() => {
                setSelected(w);
                dispatch(setWsId(w.id));
                setTimeout(() => {
                  toggleOpen(false);
                }, 500);
              }}
            >
              {w.name}{" "}
              {selected.id === w.id && (
                <TiTick className="bg-green-300 rounded-lg" />
              )}
            </div>
          ))}
          <div className="flex justify-between items-center">
            <Create
              triggerPlaceholder="Add"
              buttonStyle="text-black rounded-lg hover:bg-slate-500 hover:text-white px-2 duration-300"
              submitBtnStyle="bg-[#422AFB]"
              bodyStyle="bg-slate-50  p-6 rounded-lg flex flex-col "
              headerStyle="text-xl font-semibold"
              header={<p>New board</p>}
              contentStyle="bg-slate-50 mb-4 mt-2 rounded-lg  "
              content={<p>Create a new board</p>}
              inputStyle="bg-slate-50 p-2 rounded-xl placeholder:text-slate-400"
              placeholder="Type list name here..."
              onChange={(e) => setName(e.target.value)}
              onSubmit={(e) => mutateAsync(e)}
            />
            <div
              onClick={() => toggleOpen(false)}
              className="py-2 px-4 m-5 rounded-full duration-200 cursor-pointer hover:bg-red-500"
            >
              X
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
