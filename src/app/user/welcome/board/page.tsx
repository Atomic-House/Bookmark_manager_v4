"use client";
import { useEffect, useState } from "react";
import { IconPicker, iconList, IconPickerItem } from "react-fa-icon-picker";
import { useMutations } from "@/functions/mutations";
import { Transition } from "@headlessui/react";
import { TiTick } from "@react-icons/all-files/ti/TiTick";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { WorkspaceWithBoards } from "@/types";
import { useAppSelector } from "@/store/hooks";
export default function Page() {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const wsId = useAppSelector((state) => state.workspace.id);

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
  if (isSuccess) {
    router.push("/main/home/board/" + data?.id);
  }
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
        <span className="flex gap-3 items-center mb-4 text-red-400">
          <IconPicker value={icon} onChange={setIcon} />

          {iconList.slice(0, 10).map((icon, index) => (
            <div key={index}>
              <IconPickerItem
                icon={icon}
                size={24}
                color="#ed82bd"
                onClick={(v: string) => setIcon(v)}
              />
            </div>
          ))}
        </span>
        <button
          onClick={(e) => {
            mutateAsync(e);
            if (isSuccess) {
              router.push("/main/home/board" + data?.id);
            }
          }}
          className=" text-white bg-[#422AFB] p-4 rounded-lg"
        >
          Create board
          {isLoading ? <Spinner /> : ""}
          <Transition
            show={isSuccess}
            enterFrom="opacity-0 scale-0 transition-all duration-200"
            enterTo="opacity-100 scale-100 transition-all duration-200"
          >
            <TiTick />{" "}
          </Transition>
        </button>
      </form>
    </div>
  );
}
