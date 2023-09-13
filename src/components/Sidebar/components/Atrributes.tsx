"use client"
import { MdInbox } from "@react-icons/all-files/md/MdInbox"
import { AiOutlineTeam } from "@react-icons/all-files/ai/AiOutlineTeam"
import { BsBarChart } from "@react-icons/all-files/bs/BsBarChart"
import { VscVmActive } from "@react-icons/all-files/vsc/VscVmActive"
import { BiTrashAlt } from "@react-icons/all-files/bi/BiTrashAlt"
import { MdDashboard } from "@react-icons/all-files/md/MdDashboard"
import { BiChevronUp } from "@react-icons/all-files/bi/BiChevronUp"
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting"
import { AiOutlineDotChart } from "@react-icons/all-files/ai/AiOutlineDotChart"
import { IoAppsOutline } from "@react-icons/all-files/io5/IoAppsOutline"
import { BiReceipt } from "@react-icons/all-files/bi/BiReceipt"
import { useState } from "react"
import Link from "next/link"
import { Transition } from "@headlessui/react"
export default function Atrributes() {
  const [isOpen, toggleOpen] = useState(true)
  return (
    <div className="flex flex-col gap-3">
      <button onClick={() => toggleOpen(!isOpen)} className="flex gap-2 justify-between items-center px-8">
        <span className="flex items-center gap-2">

          <MdDashboard className="text-xl" />
          Atrributes(6)
        </span>
        <span>
          <BiChevronUp className={`${isOpen ? "rotate-0" : "rotate-180"} transition-all duration-300`} />
        </span>
      </button>
      <Transition
        as="div"
        show={isOpen}
        className="flex flex-col gap-2 px-8"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        {attributes.map((attr) => (
          <Link key={attr.name} href={attr.url} className={`flex gap-2 cursor-pointer hover:bg-slate-950 p-2  rounded-lg duration-300 `}><attr.icon /> {attr.name}</Link>
        ))}
        <div className={`flex gap-2 cursor-pointer hover:bg-slate-950  rounded-lg duration-300`}>
          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title flex items-center gap-2">
              <AiOutlineSetting />
              Settings
            </div>
            <div className="collapse-content">
              {settings.map((s, index) => (
                <Link href={s.url} key={index} className="flex items-center gap-3 hover:bg-slate-800 duration-300 rounded-lg p-2 "><s.icon /> {s.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}


const attributes = [{
  name: "Inbox",
  url: "/inbox",
  icon: MdInbox
},
{
  name: "Members",
  url: "/members",
  icon: AiOutlineTeam
},
{
  name: "Statistics",
  url: "/statistics",
  icon: BsBarChart
},
{
  name: "Activity Log",
  url: "/logs",
  icon: VscVmActive
},
{
  name: "Trash",
  url: "/trash",
  icon: BiTrashAlt
},
]

const settings = [{
  name: "Workspace",
  url: "/workspace-settings",
  icon: AiOutlineDotChart,
}
  ,
{
  name: "App",
  url: "/app-settings",
  icon: IoAppsOutline
},
{
  name: "Billing & Invoice",
  url: "/billing-settings",
  icon: BiReceipt
}

]
