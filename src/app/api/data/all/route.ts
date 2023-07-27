import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/user/auth/signin");
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
    }
  })
  return NextResponse.json(bookmarks);
}
