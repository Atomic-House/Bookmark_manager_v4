"use client";
import Link from "next/link";
import EditBookmarkOption from "../EditBookmarkOptions";
import { HiPencil } from "@react-icons/all-files/hi/HiPencil";
import { Bookmark } from "@/schema/bookmarks";
import Image from "next/image";
export default function ListView({ favicon, title, name, url }: Bookmark) {
  return (
    <div className="flex justify-around items-center gap-24 ">
      <div>
        <Link href={url!} className="flex items-center gap-2">
          <span>
            <Image
              src={favicon?.toString()!}
              alt={name!}
              width={50}
              height={50}
            />
          </span>
          <span className="flex flex-col items-center text-sm">
            <p className="font-semibold">
              {name
                ? name
                : title
                ? title.slice(0, 10).concat("...")
                : url?.toString()}
            </p>
            <p className="">
              <p className="tooltip" data-tip={url}>
                <button className="text-xs ">Link</button>
              </p>
            </p>
          </span>
        </Link>
      </div>
      <div>
        <EditBookmarkOption
          rounded="rounded-lg"
          bg="dark:bg-slate-900 bg-slate-100 drop-shadow-xl"
          trigger={<HiPencil />}
        />
      </div>
    </div>
  );
}
