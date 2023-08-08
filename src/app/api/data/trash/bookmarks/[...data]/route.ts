import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//Gets all the bookmarks deleted/trashed by the user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const data = await prisma.bookmark.findMany({
    where: {
      email: session?.user?.email,
      isDeleted: true,
    },
  });
  return NextResponse.json(data);
}
//Restores the bookmark from trash to it's previous location
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const data = await prisma.bookmark.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: false,
    },
  });
  return NextResponse.json(data);
}
