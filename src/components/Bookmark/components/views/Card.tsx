//Card view for lists preferences
"use client";
import { Draggable } from "react-beautiful-dnd";
import Link from "next/link";
// Change it to nextjs images
// import { Image } from "@chakra-ui/react";
import Image from "next/image";
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

export function AltCardView({
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
    <div className="card card-compact w-72 bg-base-100 shadow-xl">
      <Link href={url} target="_blank">
        <figure>
          <Image
            src="https://images.unsplash.com/photo-1531525727990-67532cd332c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
            alt="Shoes"
            width={150}
            height={150}
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
