"use client";
import { useEffect, useState } from "react";
import { useMutations } from "@/functions/mutations";
import { Transition } from "@headlessui/react";
import { TiTick } from "@react-icons/all-files/ti/TiTick";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { WorkspaceWithBoards } from "@/types";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
export default function Page() {
  const [name, setName] = useState("");
  const router = useRouter();
  //Grabs the workspace id from the redux store and brings it here for the board to be added to this workspace
  const wsId = useAppSelector((state) => state.workspace.id);
  //Custom useMutations hook which created a board
  const { mutateAsync, isSuccess, isLoading, data } =
    useMutations<WorkspaceWithBoards>(
      "create a board",
      "boards",
      name,
      "",
      "",
      wsId,
      "POST",
    );
  useEffect(() => {
    //Routes to the main app with the current board created
    if (isSuccess) {
      router.push("/main/home/board" + data?.id);
    }
  }, [router, isSuccess,data?.id]);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#422AFB] font-semibold text-5xl my-12">BRAND</h1>
        <h3 className="text-slate-500">Step 2/2</h3>
        <h1 className="text-5xl font-bold">Create a new board</h1>
        <h2 className="m-4 text-slate-500">
          Create a new or add board link to send request
        </h2>
      </div>
      <form className="grid grid-cols-1 my-12 mx-56">
        <label htmlFor="board" className="">
          Enter your board name
        </label>

        <input
          type="text"
          name="board"
          placeholder="board name..."
          className="p-4 my-4 rounded-lg bg-slate-100"
          onChange={(e) => setName(e.target.value)}
        />
        <p>Choose any logo for your board</p>
        <span className="flex gap-3 items-center mb-4 text-red-400"></span>
        <button
          onClick={(e) => {
            mutateAsync(e);
            if (isSuccess) {
              router.push("/main/home/board" + data?.id);
            }
          }}
          className="flex transition-all duration-300 items-center justify-center text-white bg-[#422AFB] p-4 rounded-lg"
        >
          Create board
          {isLoading ? <Spinner /> : ""}
          {/*  Brings it if the board was successfully created  */}
          <Transition
            show={isSuccess}
            enterFrom="opacity-0 scale-0 transition-all duration-200"
            enterTo="opacity-100 scale-100 transition-all duration-200"
            className="flex gap-2 items-center"
          >
            <TiTick className="bg-green-500 rounded-full" />{" "}
            <Link
              className="p-2 mx-5 bg-purple-500 rounded duration-300 hover:bg-purple-600"
              href={"/main/home/"}
            >
              Go to dashboard
            </Link>
          </Transition>
        </button>
      </form>
    </div>
  );
}
