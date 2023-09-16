"use client";

import Attributes from "./components/Atrributes";
import { fakerBoards, fakerWorkspaces } from "@/functions/fakedata";
import Select from "./components/Select";
import SelectBoards from "./components/SelectBoards";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { ReactNode, useState } from "react";
const ws = fakerWorkspaces(10);
const boards = fakerBoards(4);
export default function Sidebar({ children }: { children: ReactNode }) {
  const [collapse, toggleCollapse] = useState(false);
  return (
    <main className="flex gap-2">
      <section
        className={`transition-all duration-300 h-screen flex flex-col gap-3 lg:w-[25vw] drop-shadow-lg dark:bg-[#1A1A1A] rounded-3xl my-4 ${
          !collapse ? "" : "lg:w-[6vw]"
        }`}
      >
        <h1 className="text-3xl font-bold text-black dark:text-white mx-2 my-4 py-5 text-center">
          Brand
        </h1>
        <Select workspaces={ws} collapse={collapse} />
        <Attributes collapse={collapse} />
        <hr className="dark:border-x-white border-x-black" />
        <SelectBoards boards={boards} collapse={collapse} />
        <div className="flex justify-evenly items-center">
          {!collapse && (
            <button className="dark:bg-yellow-700 dark:text-white  px-8 py-2 rounded-xl ">
              Upgrade Now
            </button>
          )}

          <MdKeyboardArrowLeft
            onClick={() => toggleCollapse(!collapse)}
            className={`${
              collapse ? "rotate-180" : "rotate-0"
            } transition-all duration-300 dark:bg-blue-700 text-4xl m-2 p-2 rounded-lg `}
          />
        </div>
      </section>
      <section>{children}</section>
    </main>
  );
}
