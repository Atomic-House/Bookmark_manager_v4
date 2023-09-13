"use client"
import { Workspace } from "@/schema/workspace"
import { useState } from "react"
import { Transition } from "@headlessui/react"
import Image from "next/image"
import { BiChevronUp } from "@react-icons/all-files/bi/BiChevronUp"
export default function Select({ workspaces }: { workspaces: Workspace[] }) {
  const [selected, setSelected] = useState<Workspace>(workspaces[0])
  const [open, toggleOpen] = useState(false)
  return (
    <div className="relative w-full" onMouseLeave={() => toggleOpen(false)}>
      <button onClick={() => toggleOpen(!open)} className="flex items-center gap-2 bg-[#11047A] p-3 text-white relative w-full ">
        {/* Trigger */}
        <img className="avatar" src={selected.icon!} width={24} height={24} alt={selected.name} />
        <span>
          {selected.name}
        </span>
        <span>
          <BiChevronUp className={`${open ? "rotate-0" : "rotate-180"} transition-all duration-300`} />
        </span>
      </button>
      <div >
        {/* Options  */}

        <Transition show={open} className={`flex flex-col gap-2 duration-300 transition-all`} enterFrom="opacity-0" enterTo="opacity-100" leaveFrom="opacity-100 duration-300" leaveTo="opacity-0 duration-300" >
          <ul className={`z-10 absolute  dark:bg-slate-900  p-3 rounded-xl drop-shadow-lg duration-300 transition-all justify-center  `}>
            {workspaces.map((workspace) => (
              <li className="flex gap-2 cursor-pointer hover:bg-slate-950 p-2 rounded-lg duration-300" key={workspace.id} onClick={() => setSelected(workspace)}>
                <img className="avatar" loading="lazy" src={workspace.icon!} width={24} height={24} alt={selected.name} />
                <p>
                  {workspace.name}
                </p>
              </li>
            ))}
          </ul>

        </Transition>
      </div>
    </div>
  )
}

