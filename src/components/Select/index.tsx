"use client";
//Select workspace component
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCheckCircle, AiOutlineSelect } from "react-icons/ai";
import { HiChevronUpDown } from "react-icons/hi2";
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
  console.log(selected);

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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <AiFillCheckCircle
                          className="h-5 w-5"
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
        <Listbox.Button className="relative   cursor-default dark:bg-black dark:text-white bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {collapsed ? <AiOutlineSelect /> : selected?.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
      </div>
    </Listbox>
  );
}
