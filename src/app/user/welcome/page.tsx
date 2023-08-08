"use client";
import { useEffect, useState } from "react";
import { useMutations } from "@/functions/mutations";
import { Transition } from "@headlessui/react";
import { TiTick } from "@react-icons/all-files/ti/TiTick";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { WorkspaceWithBoards } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { setId } from "@/slices/workspaceSlice";
export default function Page() {
  const [name, setName] = useState("");
  const router = useRouter();
  const { mutateAsync, isSuccess, isLoading, data } =
    useMutations<WorkspaceWithBoards>(
      "create a workspace",
      "workspaces",
      name,
      "",
      "",
      "create",
      "POST",
    );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setId(data?.id!));
      router.push("/user/welcome/board");
    }
  }, [dispatch, isSuccess, data?.id,router]);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#422AFB] font-semibold text-5xl my-12">BRAND</h1>
        <h3 className="text-slate-500">Step 1/2</h3>
        <h1 className="text-5xl font-bold">Create a new workspace</h1>
        <h2 className="m-4 text-slate-500">
          Create a new or add workspace link to send request
        </h2>
      </div>
      <form className="grid grid-cols-1 my-12 mx-56">
        <label htmlFor="workspace" className="">
          Enter your workspace name
        </label>

        <input
          type="text"
          name="workspace"
          placeholder="Workspace name..."
          className="p-4 my-4 rounded-lg bg-slate-100"
          onChange={(e) => setName(e.target.value)}
        />
        <p>Choose any logo void for your workspace</p>
        <span className="flex gap-3 items-center mb-4 text-red-400"></span>
        <button
          onClick={(e) => {
            mutateAsync(e);
            if (isSuccess) {
              router.push("/welcome/board/" + data?.id);
            }
          }}
          className="flex justify-center text-white bg-[#422AFB] p-4 rounded-lg"
        >
          Create workspace
          {isLoading ? <Spinner /> : ""}
          <Transition
            show={isSuccess}
            enterFrom="opacity-0 scale-0 transition-all duration-200"
            enterTo="opacity-100 scale-100 transition-all duration-200"
            className={"flex items-center"}
          >
            <TiTick />{" "}
          </Transition>
        </button>
      </form>
    </div>
  );
}
