"use client";
import Link from "next/link";
import Image from "next/image";
import { useMutations } from "@/functions/mutations";
import { Spinner } from "@chakra-ui/react";
import EditBookmarkOptions from "./components/EditBookmarkOptions";
import { Draggable } from "react-beautiful-dnd";
import { Bookmark } from "@prisma/client";
interface BookmarkWithIndex extends Bookmark {
  index: number;
}
export default function Bookmark({
  name,
  id,
  url,
  favicon,
  title,
  description,
  index,
}: BookmarkWithIndex) {
  const { mutateAsync, isError, error, isLoading, isSuccess } = useMutations(
    "delete bookmark",
    "bookmarks",
    "",
    "",
    "",
    id,
    "PUT",
  );
  if (isSuccess) {
    console.log("successfully deleted");
  }
  if (isError) {
    console.error(error);
  }
  const icon = `https://www.google.com/s2/favicons?domain=${
    new URL(url).hostname
  }&sz=256`;

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={" flex justify-between items-center m-2 gap-3"}
          >
            <Image
              src={favicon ? favicon : icon}
              width={30}
              alt={name!}
              height={30}
            />
            <div className="  ">
              {" "}
              <Link href={url} target="_blank">
                {name ? name : title ? title.slice(0, 9) + "..." : ""}
              </Link>
            </div>
            <div className="flex items-center">
              {" "}
              <EditBookmarkOptions onClickDelete={mutateAsync} />
              {isLoading ? <Spinner /> : null}
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}
