"use client";
import { MdOutlineDashboard, MdOutlineInbox } from "react-icons/md";
import { HiArrowCircleRight } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import Svg1 from "@/../public/Svg-02.svg";
import Boards from "./Boards";
import { useState } from "react";
import SwitchButton from "@/components/ThemeSwitch";
export default function MySidebar() {
  const [closed, setClosed] = useState(false);

  return (
    <div
      className={`h-screen ${
        closed ? "w-16" : "w-64"
      } bg-white dark:bg-slate-900 flex flex-col transition-all duration-300 ease-in-out`}
    >
      <Link
        href={`/`}
        className="flex bg-blue-500 dark:bg-blue-800 dark:text-white justify-center items-center py-[60px] flex-col transition-all text-xl font-bold duration-300"
      >
        <Image src={Svg1} alt="atomic house logo" width={30} height={30} className="" />
        {!closed && (
          <>
            <div>Atomic</div>
            <div>House</div>
          </>
        )}
      </Link>
      <ul className="text-black dark:text-white transition-all duration-300">
        <li className="flex justify-around items-center py-4 text-xl">
          {" "}
          {!closed && (
            <span className="transition-all ease-in-out duration-300">
              <Boards />
            </span>
          )}
          <span>
            <MdOutlineDashboard />
          </span>
        </li>

        <li className="flex justify-around items-center py-4 text-xl transition-all ease-in ">
          {!closed && <span>Inbox</span>}
          <span>
            <MdOutlineInbox />
          </span>
        </li>
      </ul>
      <div className="flex flex-col justify-center items-center dark:text-white py-2 text-black transition-all duration-300 min-w-fit sticky top-96 text-2xl">
        <div className="hover:bg-cyan-400  p-2 rounded-full duration-300 ">
          {" "}
          <HiArrowCircleRight
            onClick={() => setClosed(!closed)}
            className={`${closed ? "rotate-180" : ""}`}
          />
        </div>
        <div>
          {" "}
          <SwitchButton />
        </div>
      </div>
      <div className="sticky top-32"> </div>
    </div>
  );
}
