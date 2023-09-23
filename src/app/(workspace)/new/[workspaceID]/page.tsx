"use client";

import IconPicker from "@/components/Icon/iconpicker";
import ThemeProvider from "@/components/Theme/themeProvider";
import { IconContext } from "@/context/icon";
import { useCreate } from "@/hooks/mutations";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page({ params }: { params: { workspaceID: string } }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const router = useRouter();
  const [currState, setCurrState] = useState<
    "loading" | "success" | "error" | "stale"
  >("stale");
  const {
    mutateAsync,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    failureReason,
  } = useCreate<string, { name: string; icon: string; workspaceId: string }>(
    "board",
    {
      name: name,
      icon: icon,
      workspaceId: params.workspaceID,
    },
    "board",
  );
  console.log(name, icon);

  useEffect(() => {
    if (isLoading) {
      setCurrState("loading");
    } else if (isSuccess) {
      setCurrState("success");

      router.push(`/board/${data}`);
    } else if (isError) {
      setCurrState("error");
      console.error(error, failureReason);
    }
  }, [isLoading, isSuccess, isError, data, router, error, failureReason]);
  return (
    <main className="flex flex-col justify-center items-center gap-3 m-4 ">
      <ThemeProvider />

      <h1 className="text-4xl text-[#5D60EF] mb-10">Brand</h1>
      <p>Step 1/2</p>
      <h2 className="text-4xl font-semibold">Create a new board</h2>
      <p className="font-medium text-xs">
        Create a new Worksapce or add board link to send request
      </p>
      <form action="" onSubmit={mutateAsync} className="mt-5 w-[50vw]">
        <label htmlFor="name">
          <p>Enter your board name</p>
          <input
            type="text"
            className="input w-full"
            name="name"
            placeholder="board name..."
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div>
          <p>Choose any logo for your board</p>
          <IconContext.Provider value={{ icon: icon, setIcon: setIcon }}>
            <div className="flex gap-5 m-3 items-center">
              <IconPicker trigger={icon} />
              {workEmojis.map((e) => (
                <span
                  key={e}
                  className="cursor-pointer hover:bg-black rounded-md p-2"
                  onClick={() => {
                    setIcon(e);
                  }}
                >
                  {e}
                </span>
              ))}
            </div>
          </IconContext.Provider>
        </div>
        <button type="submit" className="btn btn-primary w-full mt-5">
          {currState === "stale" ? (
            "Create Board"
          ) : currState === "loading" ? (
            <span className="loading loading-ball loading-lg"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
      </form>
    </main>
  );
}

const workEmojis = ["👔", "💼", "📊", "🖋️", "💻"];
