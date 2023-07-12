import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { data: string[] } }) {
  const [id] = params.data;
  const tabs = await prisma.tab.findMany({
    where: {
      boardId: id,
    },
  });
  return NextResponse.json(tabs);
}
export async function POST(req: Request, { params }: { params: { data: string[] } }) {
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
            lists: {
              create: [
                {
                  name: "List",
                  boardId: id,
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
export async function PUT(req: Request, { params }: { params: { data: string[] } }) {
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
export async function PATCH(req: Request, { params }: { params: { data: string[] } }) {
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
export async function DELETE(req: Request, { params }: { params: { data: string[] } }) {
  const [id] = params.data;
  const tabs = await prisma.tab.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(tabs);
}
