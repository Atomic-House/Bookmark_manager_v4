"use client";
import useWindowDimension from "@/hooks/window";
import NavSearch from "../Search";
import Notification from "./components/Notification";
// import ProfileMenu from "./components/ProfileMenu";
import ProfileMenu from "./components/AltProfileMenu";
import Image from "next/image";
import Svg1 from "@/../public/Svg-01.svg";
import Svg2 from "@/../public/Svg-02.svg";
import { useColorMode } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";
import { redirect } from "next/navigation";
import Preferences from "../Preferences/Dropdown";
import { useFetchData, useGetUser } from "@/functions/queries";
export default function Navbar() {
  const { width } = useWindowDimension();
  const { data: session } = useSession();
  const { colorMode } = useColorMode();
  const { data: user, isError, isLoading, refetch } = useGetUser();
  if (!session) {
    redirect("/user/auth/signin");
  }
  if (width < 768) {
    return <div></div>;
  }
  return (
    <div className="absolute flex gap-2 right-0 top-0 m-0 md:mx-8 md:my-6 ">
      <NavSearch />
      <div className="flex md:gap-3 items-center">
        {" "}
        <div className="sticky"></div>
        <Notification />
        <Preferences />
        <ProfileMenu
          background={user?.background}
          image={
            session?.user?.image
              ? session.user.image
              : colorMode === "light"
              ? Svg1
              : Svg2
          }
          display={
            <Image
              src={
                session?.user?.image
                  ? session.user.image
                  : colorMode === "light"
                  ? Svg1
                  : Svg2
              }
              alt="image"
              width={30}
              height={30}
              className="rounded-full"
            />
          }
        />
      </div>
    </div>
  );
}
