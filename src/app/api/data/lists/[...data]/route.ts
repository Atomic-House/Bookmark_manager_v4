import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const lists = await prisma.list.findMany({
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
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const body: { name: string } = await req.json();
  const lists = await prisma.list.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(lists);
}
//to change it to deleted or not
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
