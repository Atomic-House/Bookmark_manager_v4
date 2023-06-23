import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
export default function Bookmark({ name, id, link }: { name: string; id: string; link: string }) {
  return (
    <div className=" flex justify-between items-center m-2 gap-1">
      <div className="mr-5">
        {" "}
        <Link href={link}>{name}</Link>
      </div>
      <div className="flex ">
        {" "}
        <BsPencilSquare />
        <AiFillDelete className="text-red-500" />
      </div>
    </div>
  );
}
