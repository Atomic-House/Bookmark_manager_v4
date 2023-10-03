"use client";
import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "@/schema/bookmarks";
export default function Card({
  preview,
  favicon,
  title,
  name,
  description,
  id,
  url,
}: Bookmark) {
  const nURL = new URL(url!);
  return (
    <Link href={url!} className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <Image src={preview?.toString()!} alt={name!} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Image
            src={favicon?.toString()!}
            alt={name ? name : title!}
            width={30}
            className="avatar rounded-full"
          />
          {title}
        </h2>
        <p>{nURL.hostname}</p>
      </div>
    </Link>
  );
}
