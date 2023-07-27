"use client";
import { Draggable } from "react-beautiful-dnd";
import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "@prisma/client";
import EditBookmarkOptions from "../EditBookmarkOptions";
import { Spinner } from "@chakra-ui/react";
export default function ListView({
  id,
  name,
  url,
  icon,
  favicon,
  title,
  index,
  mutateAsync,
}: Bookmark & {
  index: number;
  icon: string;
  mutateAsync: any;
}) {
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={" flex justify-between items-center m-2 gap-3"}
          >
            <div>
              {" "}
              <Link href={url} target="_blank" className="flex gap-3">
                <Image
                  src={favicon ? favicon : icon}
                  width={30}
                  alt={name!}
                  height={30}
                />
                {name ? name : title ? title.slice(0, 9) + "..." : ""}
              </Link>
            </div>
            <div className="flex items-center">
              {" "}
              <EditBookmarkOptions onClickDelete={mutateAsync} />
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}
