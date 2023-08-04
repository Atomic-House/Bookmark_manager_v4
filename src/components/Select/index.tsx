"use client";
//Select workspace component
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";
import { AiOutlineSelect } from "@react-icons/all-files/ai/AiOutlineSelect";
import { HiChevronUp } from "@react-icons/all-files/hi/HiChevronUp";
import { useAppDispatch } from "@/store/hooks";
import { setArray, setId, setInboxId } from "@/slices/workspaceSlice";
import { Board, Inbox, Workspace } from "@prisma/client";
interface Ws extends Workspace {
  boards: Board[];
  inbox: Inbox;
}
export default function Select({
  collapsed,
  ws: workspaces,
}: {
  collapsed: boolean;
  ws: any[];
}) {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<Ws>(
    workspaces[0] || {
      name: "Select Workspace",
      id: "heloasjfldfsj",
      boards: [],
    },
  );
  useEffect(() => {
    dispatch(setArray(selected?.boards));
    dispatch(setId(selected?.id));
    dispatch(setInboxId(selected?.inbox?.id));
  }, [selected, dispatch]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`relative mt-1 max-h-60 ${
              collapsed ? "w-[20vw]" : "w-full"
            } overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
          >
            {workspaces.map((workspace, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={workspace}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {workspace.name}
                    </span>
                    {selected ? (
                      <span className="flex absolute inset-y-0 left-0 items-center pl-3 text-amber-600">
                        <AiFillCheckCircle
                          className="w-5 h-5"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
        <Listbox.Button className="relative py-2 pr-10 pl-3 text-left bg-white shadow-md cursor-default sm:text-sm dark:text-white dark:bg-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="block truncate">
            {collapsed ? <AiOutlineSelect /> : selected?.name}
          </span>
          <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
            <HiChevronUp className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
      </div>
    </Listbox>
  );
}
