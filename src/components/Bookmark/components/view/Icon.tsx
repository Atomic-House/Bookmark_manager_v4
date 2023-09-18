"use client";
import EditBookmarkOption from "../EditBookmarkOptions";
import { HiPencil } from "@react-icons/all-files/hi/HiPencil";
import Link from "next/link";
import Image from "next/image";
export default function Icon({
  preview,
  icon,
  title,
  name,
  description,
  id,
  url,
}: {
  preview?: string;
  title?: string;
  name?: string;
  description?: string;
  id: string;
  url?: URL | string;
  icon?: string;
}) {
  return (
    <div className="indicator ">
      <div className="z-20 indicator-item indicator-top ">
        <EditBookmarkOption
          rounded="rounded-lg"
          bg="bg-slate-900"
          trigger={<HiPencil />}
        />
      </div>

      <Link href={url!}>
        <Image src={icon} alt={title} width={`50`} className="-z-10 avatar " />
      </Link>
    </div>
  );
}
