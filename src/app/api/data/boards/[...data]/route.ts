import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest, { params }: { params: { data: string[] } }) {
  const [id] = params.data;
  const boards = await prisma.workspace.findFirst({
    where: {
      id: id,
    },
    include: {
      boards: true,
    },
  });
  return NextResponse.json(boards);
}
export async function POST(req: NextRequest, { params }: { params: { data: string[] } }) {
  const body: { name: string } = await req.json();
  const [id] = params.data;
  const boards = await prisma.workspace.update({
    where: {
      id: id,
    },
    data: {
      boards: {
        create: [
          {
            name: body.name,
          },
        ],
      },
    },
  });
  return NextResponse.json(boards);
}
export async function PATCH(req: Request, { params }: { params: { data: string[] } }) {
  const [id, name] = params.data;
  const boards = await prisma.board.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  return NextResponse.json(boards);
}
//to change it to deleted or not
export async function DELETE(req: Request, { params }: { params: { data: any[] } }) {
  const [id, deleted] = params.data;
  const workspace = await prisma.board.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: deleted,
    },
  });
  return NextResponse.json(workspace);
}
