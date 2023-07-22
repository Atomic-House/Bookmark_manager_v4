"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { Avatar, Input, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import "@uploadthing/react/styles.css";
import UploadImage from "@/components/Modal/components/UploadProfile";
import { useGetUser } from "@/functions/queries";
import { User } from "@prisma/client";
export default function Left() {
  const { data: user, isLoading: isBgLoading, refetch }: {
    data: User;
    isLoading: boolean;
    refetch: () => void;
  } = useGetUser();
  const { data: session, status, update } = useSession();
  const [firstName, setFirstName] = useState(
    session?.user?.email?.split(" ")[0],
  );
  const [lastName, setLastName] = useState(session?.user?.email?.split(" ")[1]);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(session?.user?.image);
  const [bgImage, setBgImage] = useState(user?.background);
  useEffect(() => {
    refetch();
  }, [refetch, bgImage, user]);
  const {
    mutateAsync: updateUser,
    isLoading,
    isIdle,
    isSuccess,
    isPaused,
    isError,
    error,
  } = useMutation({
    mutationKey: ["update userinfo", session?.user?.email],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const data = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
        }),
      });
      return data.json();
    },
    onSuccess: () => {
      update();
    },
  });

  if (!session) {
    redirect("/auth/signin");
  }
  if (isBgLoading || isLoading) {
    return <Spinner />;
  }
  if (isError) {
    console.error(error);
  }
  if (isSuccess) {
    alert("Successfully updated");
  }
  return (
    <div className="w-[50%] flex flex-col drop-shadow-xl p-3 bg-slate-100">
      <section className="flex flex-col items-center relative">
        <Image
          src={bgImage!}
          alt="banner"
          width={300}
          height={80}
          className=" relative items-center object-cover w-full h-40"
          // className="w-[140vw] h-[150px] relative rounded-md"
        />
        <UploadImage
          image={image}
          onClientUploadComplete={(res) => {
            setImage(res?.at(0)?.fileUrl);
          }}
          onBgClientUploadComplete={(res) => {
            alert("bg updated Successfully");
            setBgImage(res?.at(0)?.fileUrl!);
          }}
        />
      </section>
      <section className="mt-14">
        <form onSubmit={updateUser}>
          <div className="grid gap-5 grid-cols-2 grid-rows-3">
            <div>
              {" "}
              <label htmlFor="firstName">First Name</label>
              <Input
                type="text"
                placeholder={session.user?.name?.split(" ")[0]}
                id="firstName"
                name="firstName"
                className="w-fit"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder={session.user?.name?.split(" ")[1]}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              {" "}
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
              />
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
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-800 text-white dark:text-black dark:bg-blue-600 p-2 rounded-lg flex items-center relative bottom-0 right-0 mt-4 float-right"
          >
            {isLoading ? <Spinner /> : null}
            Save changes
          </button>
        </form>
      </section>
    </div>
  );
}
