"use client";
import Attributes from "./components/Atrributes";
import Select from "./components/Select";
import SelectBoards from "./components/SelectBoards";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { SiLighthouse } from "@react-icons/all-files/si/SiLighthouse";
import { ReactNode, useEffect, useState } from "react";
import { useFetch } from "@/hooks/queries";
import { Workspace } from "@/schema/workspace";
import { WorkspaceContext } from "@/context/workspace";
import { useLoading } from "@/hooks/states";
import { Board } from "@/schema/board";
export default function Sidebar({ children }: { children: ReactNode }) {
  const [collapse, toggleCollapse] = useState(false);
  const {
    data: ws,
    isError,
    isSuccess,
    isLoading,
    refetch,
  } = useFetch<Workspace[]>("", "workspace");
  const [defaultWorkspace, setDefaultWorkpace] = useState<
    Workspace | undefined
  >(ws?.at(0));

  const {
    data: boards,
    isLoading: isBoardLoading,
    refetch: refetchBoards,
  } = useFetch<Board[] | undefined>(defaultWorkspace?.id!, "board");

  // const loading = useLoading(isLoading);
  // const boardLoading = useLoading(isBoardLoading);
  useEffect(() => {
    window.localStorage.getItem("defaultWs");
    window.localStorage.setItem("defaultWs", `${defaultWorkspace?.id}`);
    refetchBoards();
  }, [defaultWorkspace, ws, refetchBoards]);

  return (
    <main className="flex gap-2 ">
      <WorkspaceContext.Provider
        value={{
          defaultWorkspace: defaultWorkspace,
          setDefault: setDefaultWorkpace,
        }}
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
          <Select workspaces={ws} collapse={collapse} /* loading={loading} */ />
          <Attributes collapse={collapse} />
          <hr className="dark:border-x-white border-x-black" />
          <SelectBoards
            wsId={defaultWorkspace?.id}
            // loading={boardLoading}
            boards={boards}
            collapse={collapse}
          />
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
