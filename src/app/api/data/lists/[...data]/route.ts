import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//Gets all the  lists which matches the given view id and is not deleted
export async function GET(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const lists = await prisma.list.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      tabId: id,
      isDeleted: false,
    },
    include: {
      bookmarks: true,
    },
  });
  return NextResponse.json(lists);
}
//Creates a POST request to create a new list by adding the related views id into the view along with user email and name
export async function POST(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const [tabId] = params.data;
  const lists = await prisma.tab.update({
    where: {
      id: tabId,
    },
    data: {
      lists: {
        createMany: {
          data: [
            {
              name: body.name,
              email: session?.user?.email,
            },
          ],
        },
      },
    },
  });
  return NextResponse.json(lists);
}
//Updates a list name, color, and icon
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const body: { name: string; emoji: string; color: string } = await req.json();
  const lists = await prisma.list.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
      color: body.color,
      emoji: body.emoji,
    },
  });
  return NextResponse.json(lists);
}
//Moves the list to trash
export async function PUT(
  req: Request,
  { params }: { params: { data: any[] } },
) {
  const [id] = params.data;
  const lists = await prisma.list.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: true,
    },
  });
  return NextResponse.json(lists);
}
//Permenantly deletes the list
export async function DELETE(
  req: Request,
  { params }: { params: { data: any[] } },
) {
  const [id] = params.data;
  const lists = await prisma.list.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(lists);
}
