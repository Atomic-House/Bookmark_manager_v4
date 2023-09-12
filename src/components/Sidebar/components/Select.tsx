import { Workspace } from "@/schema/workspace"
import { Fragment, useState } from "react"
import { Transition } from "@headlessui/react"
import Image from "next/image"
export default function Select({ workspaces }: { workspaces: Workspace[] }) {
  const [selected, setSelected] = useState<Workspace>(workspaces[0])
  const [open, toggleOpen] = useState(false)
  return (
    <div className="relative w-full">
      <button onClick={() => toggleOpen(!open)} className="flex gap-2 bg-[#11047A] p-3 rounded-md text-white relative w-full ">
        {/* Trigger */}
        <img className="avatar" src={selected.icon!} width={24} height={24} alt={selected.name} />
        <p>

          {selected.name}
        </p>
      </button>
      <div >
        {/* Options  */}
        <ul className="absolute dark:bg-slate-900 bg-white  p-3 rounded-xl drop-shadow-lg duration-300 transition-all justify-center">
          <Transition show={open} className={`flex flex-col gap-2 duration-300`} enterFrom="opacity-0" enterTo="opacity-100" leaveFrom="opacity-100 " leaveTo="opacity-0 " >
            {workspaces.map((workspace) => (
              <li className="flex gap-2" key={workspace.id} onClick={() => setSelected(workspace)}>
                <img className="avatar" loading="lazy" src={workspace.icon!} width={24} height={24} alt={selected.name} />
                <p>
                  {workspace.name}
                </p>

              </li>
            ))}
          </Transition>
        </ul>
      </div>
    </div>
  )
}

