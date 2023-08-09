import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <Link
          href={"/user/auth/signin"}
          className="text-2xl bg-blue-300 p-2 rounded-lg duration-300 hover:bg-[#368ef2]"
        >
          {" "}
          Sign Up/Sign In{" "}
        </Link>{" "}
        <button className="text-2xl"> --- OR ---</button>{" "}
        <Link
          href={"/"}
          className="text-2xl bg-blue-300 p-2 rounded-lg duration-300 hover:bg-[#368ef2]"
        >
          Login as Guest
        </Link>
      </div>
    );
  }

  redirect("/main/home");
}
