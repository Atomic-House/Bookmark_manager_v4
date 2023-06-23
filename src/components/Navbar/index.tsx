"use client";
import useWindowDimension from "@/hooks/window";
import NavSearch from "../Search";
import Notification from "./components/Notification";
import ProfileMenu from "./components/ProfileMenu";
import Image from "next/image";
export default function Navbar() {
  const { width } = useWindowDimension();
  if (width < 768) {
    return <div></div>;
  }
  return (
    <div className="absolute right-0 top-0 m-0 md:mx-8 md:my-6 ">
      <div className="flex md:gap-3">
        {" "}
        <NavSearch iconPosition="left" />
        <ProfileMenu
          display={
            <Image
              src={
                "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=415&q=80"
              }
              alt="image"
              width={40}
              height={30}
              className="rounded-full"
            />
          }
        />
        <Notification />
      </div>
    </div>
  );
}
