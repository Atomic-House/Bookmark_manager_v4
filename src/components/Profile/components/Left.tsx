"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { Avatar, Input, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "@uploadthing/react/styles.css";
import UploadImage from "@/components/Modal/components/UploadProfile";
import { useGetUser } from "@/functions/queries";
import { User, UserPreferences } from "@prisma/client";
export default function Left() {
  const { data: user, isLoading: isBgLoading, refetch } = useGetUser();
  const { data: session, update } = useSession();
  const [firstName, setFirstName] = useState(
    session?.user?.email?.split(" ")[0],
  );
  const queryClient = useQueryClient();
  const [lastName, setLastName] = useState(session?.user?.email?.split(" ")[1]);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(session?.user?.image);
  const [bgImage, setBgImage] = useState(user?.userPreferences?.background);
  useEffect(() => {
    refetch();
  }, [refetch, bgImage, user]);
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationKey: ["update userinfo", session?.user?.email],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const data = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          name: firstName + " " + lastName,
          username: username,
        }),
      });
      return data.json();
    },
    onSuccess: () => {
      update();
      queryClient.invalidateQueries(["user", session?.user?.email]);
    },
  });

  if (!session) {
    redirect("/user/auth/signin");
  }
  if (isBgLoading || isLoading) {
    return <Spinner />;
  }
  if (isError) {
    console.error(error);
  }
  if (isSuccess) {
    alert("Successfully updated");
    refetch();
  }
  return (
    <div className="w-[50%] flex flex-col drop-shadow-xl p-3 bg-slate-100 ">
      <section className="flex relative flex-col items-center">
        <Image
          src={
            bgImage
              ? bgImage
              : "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80"
          }
          alt="banner"
          width={300}
          height={80}
          className="object-cover relative items-center w-full h-40 rounded"
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
          <div className="grid grid-cols-2 grid-rows-3 gap-5">
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
            className="flex float-right relative right-0 bottom-0 items-center p-2 mt-4 text-white bg-blue-800 rounded-lg dark:text-black dark:bg-blue-600"
          >
            {isLoading ? <Spinner /> : null}
            Save changes
          </button>
        </form>
      </section>
    </div>
  );
}
