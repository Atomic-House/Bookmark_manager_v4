"use client";
import Attributes from "./components/Atrributes";
import { fakerBoards, fakerWorkspaces } from "@/functions/fakedata";
import Select from "./components/Select";
import SelectBoards from "./components/SelectBoards";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { SiLighthouse } from "@react-icons/all-files/si/SiLighthouse";
import { ReactNode, useState } from "react";
import { useFetch } from "@/hooks/queries";
import { Workspace } from "@/schema/workspace";
import { WorkspaceContext } from "@/context/workspace";
const ws = fakerWorkspaces(10);
const boards = fakerBoards(4);
export default function Sidebar({ children }: { children: ReactNode }) {
  const [collapse, toggleCollapse] = useState(false);
  const [defaultId, setDefaultId] = useState(
    window.localStorage.getItem("defaultWs") || ws[0].id,
  );
  const { data, isError, isSuccess, isLoading, refetch } = useFetch<Workspace>(
    "",
    "workspace",
  );
  return (
    <main className="flex gap-2 ">
      <WorkspaceContext.Provider
        value={{ defaultWorkspaceId: defaultId, setDefault: setDefaultId }}
      >
        <section
          className={`transition-all shadow-lg dark:shadow-white shadow-slate-300 duration-300 h-fit pb-8 flex flex-col gap-3   drop-shadow-lg dark:bg-[#1A1A1A] rounded-3xl my-2 ${
            !collapse ? "lg:w-[20vw] md:w-[20vw]" : "lg:w-[6vw] "
          }`}
        >
          <h1
            className={`text-2xl font-bold text-black dark:text-white  mx-1 my-2 py-2 text-center`}
          >
            {collapse ? (
              <span className="flex items-center w-full justify-center ">
                <SiLighthouse className="" />
              </span>
            ) : (
              "Brand"
            )}
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
      </WorkspaceContext.Provider>
      <section>{children}</section>
    </main>
  );
}
