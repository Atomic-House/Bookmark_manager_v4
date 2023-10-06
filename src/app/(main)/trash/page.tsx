"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
export default function Page({
  searchParams,
}: {
  searchParams: { tab: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <h1>Main Page / </h1>
      <h2>Trash / {searchParams.tab} </h2>
      <ul className="flex gap-4 mt-12 tabs ">
        {tabs.map((tab, i) => (
          <Link
            href={`${pathname}?tab=${tab.name}`}
            key={i}
            className={` cursor-pointer  ${
              searchParams.tab === tab.name ? "border-b-2 border-b-black" : ""
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}

const tabs = [
  { name: "Bookmarks", icon: "" },
  { name: "Lists", icon: "" },
  { name: "Boards", icon: "" },
  { name: "Members", icon: "" },
];
