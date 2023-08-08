//Route made to handle requests related to using boards

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  //Gets all the boards which matches the given workspace Id and is not deleted and gets the nested tabs inside it
  const boards = await prisma.board.findMany({
    where: {
      wsId: id,
      isDeleted: false,
    },
    include: {
      tabs: {
        where: {
          isDeleted: false,
        },
      },
    },
  });

  return NextResponse.json(boards);
}
//Creates a POST request to create a new board by adding the related workspace id into the board along with user email and name
export async function POST(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  const body: { name: string } = await req.json();
  const [id] = params.data;
  const boards = await prisma.board.create({
    data: {
      name: body.name,
      email: session?.user?.email,
      wsId: id,
    },
  });
  return NextResponse.json(boards);
}
//Updates a board name
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
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
//Sends a board to trash which can be restored
export async function PUT(
  req: Request,
  { params }: { params: { data: any[] } },
) {
  const [id] = params.data;
  const workspace = await prisma.board.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: true,
    },
  });
  return NextResponse.json(workspace);
}
//Add a delete request here for deleting the board permanently
