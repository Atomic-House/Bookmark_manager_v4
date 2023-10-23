"use client";

import IconPicker from "@/components/Icon/iconpicker";
import ThemeProvider from "@/components/Theme/themeProvider";
import { useCreate } from "@/hooks/mutations";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<string>("");
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
  } = useCreate(
    "workspace",
    {
      name: name,
      icon: icon,
    },
    "read",
  );
  useEffect(() => {
    if (isLoading) {
      setCurrState("loading");
    } else if (isSuccess) {
      setCurrState("success");

      router.push(`/new/${data}`);
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
      <h2 className="text-4xl font-semibold">Create a new Workspace</h2>
      <p className="font-medium text-xs">
        Create a new Worksapce or add workspace link to send request
      </p>
      <form action="" onSubmit={mutateAsync} className="mt-5 w-[50vw]">
        <label htmlFor="name">
          <p>Enter your workspace name</p>
          <input
            type="text"
            className="input w-full"
            name="name"
            placeholder="Workspace name..."
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div>
          <p>Choose any logo for your workspace</p>

          <div className="flex gap-5 m-3 items-center">
            <IconPicker
              trigger={icon}
              icon={icon}
              onEmojiSelect={(e) => setIcon(e.native)}
            />
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
        </div>
        <button type="submit" className="btn btn-primary w-full mt-5">
          {currState === "stale" ? (
            "Create Workspace"
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
