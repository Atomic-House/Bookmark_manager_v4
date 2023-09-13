"use client"

import Attributes from "./components/Atrributes"
import { fakerBoards, fakerWorkspaces } from "@/functions/fakedata"
import Select from "./components/Select"
import SelectBoards from "./components/SelectBoards"
const ws = fakerWorkspaces(10)
const boards = fakerBoards(4)
export default function Sidebar() {

  return (
    <section className="transition-all duration-300 h-screen flex flex-col gap-3 lg:w-[20vw] drop-shadow-lg dark:bg-[#1A1A1A] rounded-3xl my-4">
      <h1 className="text-3xl font-bold text-black dark:text-white mx-2 my-4 py-5 text-center">Brand</h1>
      <Select workspaces={ws} />
      <Attributes />
      <hr className="dark:border-x-white border-x-black" />
      <SelectBoards boards={boards} />
    </section>
  )
}
