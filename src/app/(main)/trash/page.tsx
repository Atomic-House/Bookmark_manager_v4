"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Trash from "@/components/Trash/trash";

type TrashType = "Bookmarks" | "Lists" | "Boards" | "Members";

export default function Page({
  searchParams,
}: {
  searchParams: { tab: TrashType };
}) {
  const pathname = usePathname();
  const [selectData, setSelectData] = useState<TrashType>(searchParams.tab);
  return (
    <div>
      <h1>Main Page / </h1>
      <h2>Trash / {searchParams.tab} </h2>
      <div>
        <ul className="flex gap-4 mt-12 tabs ">
          {tabs.map((tab, i) => (
            <Link
              href={`${pathname}?tab=${tab.name}`}
              key={i}
              onClick={() => setSelectData(tab.name)}
              className={` cursor-pointer  ${
                searchParams.tab === tab.name ? "border-b-2 border-b-black" : ""
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </ul>
      </div>
      <div></div>

      <Trash type={selectData} />
    </div>
  );
}
const tabs: {
  name: TrashType;
  icon: string;
}[] = [
  { name: "Bookmarks", icon: "" },
  { name: "Lists", icon: "" },
  { name: "Boards", icon: "" },
  { name: "Members", icon: "" },
];
