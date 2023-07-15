"use client";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
import { useMutations } from "@/functions/mutations";
import { Spinner } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import EditBookmarkOptions from "./components/EditBookmarkOptions";
export default function Bookmark({
  name,
  id,
  link,
  image,
  title,
  description,
  index,
}: {
  name: string;
  id: string;
  link: string;
  image: string;
  title: string;
  description: string;
  index: number;
}) {
  const { mutateAsync, isError, error, isLoading, isSuccess } = useMutations(
    "delete bookmark",
    "bookmarks",
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

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided) => (
        <div
          className=" flex justify-between items-center m-2 gap-3"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Image
            src={image ? image : ""}
            width={30}
            alt={name ? name : title ? title : description}
            height={30}
          />
          <div className=" ">
            {" "}
            <Link href={link} target="_blank">
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
  );
}
