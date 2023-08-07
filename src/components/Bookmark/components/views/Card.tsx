"use client";
import { Draggable } from "react-beautiful-dnd";
import Link from "next/link";
// Change it to nextjs images
import { Image } from "@chakra-ui/react";
import { Bookmark } from "@prisma/client";
import EditBookmarkOptions from "../EditBookmarkOptions";
export default function CardView({
  id,
  name,
  url,
  preview,
  mutateAsync,
}: Bookmark & {
  index: number;
  icon: string;
  mutateAsync: any;
}) {
  return (
    <>
      <div className={" flex justify-between items-center m-2 gap-3"}>
        <div>
          {" "}
          <Link href={url} target="_blank" className="flex gap-3">
            <Image src={preview!} width={90} alt={name!} height={50} />
          </Link>
        </div>
        <div className="flex items-center">
          {" "}
          <EditBookmarkOptions onClickDelete={mutateAsync} />
        </div>
      </div>
    </>
  );
}
