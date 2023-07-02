import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
import { useMutations } from "@/functions/mutations";
import { Spinner } from "@chakra-ui/react";
export default function Bookmark({
  name,
  id,
  link,
  image,
  title,
  description,
}: {
  name: string;
  id: string;
  link: string;
  image: string;
  title: string;
  description: string;
}) {
  const { mutateAsync, isError, error, isLoading, isSuccess } = useMutations(
    "delete bookmark",
    "bookmarks",
    "",
    "",
    id,
    "DELETE"
  );
  if (isSuccess) {
    console.log("successfully deleted");
  }
  if (isError) {
    console.error(error);
  }

  return (
    <div className=" flex justify-between items-center m-2 gap-1">
      <div className="mr-5 flex gap-3 ">
        {" "}
        <Image
          src={image ? image : ""}
          width={20}
          alt={name ? name : title ? title : description}
          height={20}
        />
        <Link href={link} target="_blank">
          {name ? name : title ? title : ""}
        </Link>
      </div>
      <div className="flex ">
        {" "}
        <BsPencilSquare />
        <AiFillDelete className="text-red-500" onClick={mutateAsync} />
        {isLoading ? <Spinner /> : null}
      </div>
    </div>
  );
}
