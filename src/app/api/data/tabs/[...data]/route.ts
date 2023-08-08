import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
//Gets all the tabs matching the given list ids from the database
export async function GET(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const tabs = await prisma.tab.findMany({
    where: {
      boardId: id,
    },
    include: {
      lists: {
        where: {
          isDeleted: false,
        },
        include: {
          bookmarks: true,
        },
      },
    },
  });
  return NextResponse.json(tabs);
}
//Makes a new tab  with a list nested inside
export async function POST(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  const [id] = params.data;
  const body: { name: string } = await req.json();
  const tabs = await prisma.board.update({
    where: {
      id: id,
    },
    data: {
      tabs: {
        create: [
          {
            name: body.name,
            email: session?.user?.email,
            lists: {
              create: [
                {
                  name: "List",
                  email: session?.user?.email,
                },
              ],
            },
          },
        ],
      },
    },
  });
  return NextResponse.json(tabs);
}
//Sends the tab to the trash can
export async function PUT(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const tabs = await prisma.tab.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: true,
    },
  });
  return NextResponse.json(tabs);
}
//Updated the tab name
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const data: { name: string } = await req.json();
  const tabs = await prisma.tab.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
    },
  });
  return NextResponse.json(tabs);
}
export async function DELETE(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const tabs = await prisma.tab.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(tabs);
}
