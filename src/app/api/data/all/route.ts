import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET() {
  //gets all of the bookmarks which are not deleted to be used for fuzzy searching
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      email: session.user?.email,
      isDeleted: false,
    },
    select: {
      name: true,
      url: true,
      tags: true,
      title: true,
    },
  });
  const lists = await prisma.list.findMany({
    where: {
      email: session.user?.email,
      isDeleted: false,
    },
    select: {
      name: true,
      tags: true,
    },
  });
  return NextResponse.json(bookmarks);
}
