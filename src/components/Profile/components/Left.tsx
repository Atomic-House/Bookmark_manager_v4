"use client";
import Image from "next/image";
import { BsPencil } from "react-icons/bs";
import { Input, Avatar, AvatarBadge } from "@chakra-ui/react";
export default function Left() {
  return (
    <div className="w-[50%] flex flex-col drop-shadow-xl p-3 bg-slate-100">
      <section className="flex flex-col items-center relative">
        <Image
          src={`https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80`}
          alt="banner"
          width={120}
          height={60}
          className="w-[140vw] h-[150px] relative rounded-md"
        />
        <Avatar
          src={
            "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          }
          width={"100px"}
          height={"100px"}
          position={"absolute"}
          top={"24"}
          p={2}
          // className="rounded-full p-2 w-[100px] h-[100px] absolute top-24 "
        >
          {/* <AvatarBadge as={BsPencil} textColor={"black"} fontSize={2} boxSize={"1.5rem"} /> */}
        </Avatar>
      </section>
      <section className="mt-14">
        <form action="/">
          <div className="grid gap-5 grid-cols-2 grid-rows-3">
            <div>
              {" "}
              <label htmlFor="firstName">First Name</label>
              <Input type="text" id="firstName" name="firstName" className="w-fit" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Input type="text" id="lastName" name="lastName" />
            </div>
            <div>
              {" "}
              <label htmlFor="username">Username</label>
              <Input type="text" id="username" name="username" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" name="email" />
            </div>
            <div>
              <label htmlFor="passoword">Password</label>
              <Input type="password" id="password" name="password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input type="password" id="confirmPassword" name="confirmPassword" />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-800 text-white dark:text-black dark:bg-blue-600 p-2 rounded-lg flex items-center relative bottom-0 right-0 mt-4 float-right"
          >
            Save changes
          </button>
        </form>
      </section>
    </div>
  );
}
