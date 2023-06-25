import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest, { params }: { params: { data: string[] } }) {
  const [id] = params.data;
  const lists = await prisma.board.findFirst({
    where: {
      id: id,
    },
    include: {
      lists: true,
    }
  });
  return NextResponse.json(lists);
}
export async function POST(req: NextRequest, { params }: { params: { data: string[] } }) {
  const body = await req.json();
  const [id] = params.data;
  const lists = await prisma.board.update({
    where: {
      id: id,
    },
    data: {
      lists: {
        create: [
          {
            name: body.name,
          },
        ],
      },
    },
  });
  return NextResponse.json(lists);
}
export async function PATCH(req: Request, { params }: { params: { data: string[] } }) {
  const [id, name] = params.data;
  const lists = await prisma.list.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  return NextResponse.json(lists);
}
//to change it to deleted or not
export async function DELETE(req: Request, { params }: { params: { data: any[] } }) {
  const [id, deleted] = params.data;
  const lists = await prisma.list.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: deleted,
    },
  });
  return NextResponse.json(lists);
}
