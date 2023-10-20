"use client";

import ThemeProvider from "@/components/Theme/themeProvider";
import { useAddMembers } from "@/hooks/mutations";
import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page({ params }: { params: { boardId: string } }) {
  const [members, setMembers] = useState<string[]>([]);
  const [memberName, setMemberName] = useState("");
  const pathname = usePathname();
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
  } = useAddMembers(params.boardId, members);

  useEffect(() => {
    if (isLoading) {
      setCurrState("loading");
    } else if (isSuccess) {
      setCurrState("success");
      console.log("successfull done");

      router.push(`/board/${params.boardId}`);
    } else if (isError) {
      setCurrState("error");
      console.error(error, failureReason);
    }
  }, [
    isLoading,
    params.boardId,
    isSuccess,
    isError,
    data,
    router,
    error,
    failureReason,
    pathname,
  ]);
  return (
    <main className="flex flex-col justify-center items-center gap-3 m-4 ">
      <ThemeProvider />

      <h1 className="text-4xl text-[#5D60EF] mb-10">Brand</h1>
      <p>Step 3/3</p>
      <h2 className="text-4xl font-semibold">
        Invite members or Create a Group
      </h2>
      <div className="font-medium text-xs flex gap-2">
        {members.map((m, i) => (
          <span key={i} className="badge badge-info gap-3">
            {m}{" "}
            <p
              className="cursor-pointer font-light"
              onClick={() => setMembers(_.without(members, m))}
            >
              x
            </p>
          </span>
        ))}
      </div>

      <div className="mt-5 w-[50vw] form-control items-center">
        <span className="join">
          <input
            type="email"
            name="members"
            className="input input-bordered join-item"
            onChange={(e) => setMemberName(e.target.value)}
            value={memberName}
          />
          <button
            className=" btn join-item"
            onClick={() => {
              setMemberName("");
              setMembers(_.uniq([...members, memberName]));
              if (memberName === "") {
                return;
              }
            }}
          >
            + Add
          </button>
        </span>
        <button className="btn btn-primary w-full mt-5" onClick={mutateAsync}>
          {currState === "stale" ? (
            "Done"
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

        <button
          className="btn btn-primary w-full mt-5"
          onClick={() => router.push(`/board?id=${params.boardId}`)}
        >
          I&apos;ll do it later
        </button>
      </div>
    </main>
  );
}
