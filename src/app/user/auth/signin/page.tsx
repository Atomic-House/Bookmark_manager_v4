"use client";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { Input, useColorMode } from "@chakra-ui/react";
import { FormEvent, FormEventHandler, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Svg1 from "@/../public/Svg-01.svg";
import Svg2 from "@/../public/Svg-02.svg";
import Image from "next/image";
import { Checkbox } from "@chakra-ui/react";
export default function Page() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  if (session) {
    redirect("/main/home");
  }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent,
  ) => {
    e.preventDefault();
    await signIn("email", {
      email,
    });
  };
  const { colorMode } = useColorMode();
  return (
    <div className="grid grid-cols-2 border-2 border-white h-[100vh]">
      <div className="m-14">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <h2 className="text-xl">Subtitle</h2>
        <div
          className="flex gap-3 justify-center items-center py-6 my-4 bg-blue-200 cursor-pointer rounded-s"
          onClick={() => signIn("google")}
        >
          <span>
            {" "}
            <FcGoogle />
          </span>
          <span className="text-black">Continue with Google</span>
        </div>
        <div className="flex gap-3 justify-center my-4">or</div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@example.com"
            />
            <Checkbox mx={"2"} defaultChecked>
              Keep me logged in
            </Checkbox>
            <button className="py-4 bg-purple-700 rounded-s">Done</button>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center bg-blue-600">
        <div className="text-4xl font-extrabold">Bookmark Manager</div>
        <div className="flex flex-col justify-center items-center mt-32">
          <Link href={`http://atomichouse.co/`} className="font-bold">
            {" "}
            Made in Atomic House
          </Link>
          <Image
            src={colorMode === "light" ? Svg1 : Svg2}
            alt="logo"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}
