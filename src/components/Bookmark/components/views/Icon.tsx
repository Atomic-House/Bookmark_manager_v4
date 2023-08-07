import { Bookmark } from "@prisma/client";
import { Draggable } from "react-beautiful-dnd";
import Link from "next/link";
import Image from "next/image";
import EditBookmarkOptions from "../EditBookmarkOptions";
export default function IconView({
  id,
  name,
  url,
  icon,
  favicon,
  index,
  mutateAsync,
}: Bookmark & {
  index: number;
  icon: string;
  mutateAsync: any;
}) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex gap-3 justify-between items-center m-2"
        >
          <Link href={url}>
            <Image
              src={favicon ? favicon : icon}
              width={30}
              alt={name!}
              height={30}
            />
          </Link>
        </div>
      )}
    </Draggable>
  );
}
