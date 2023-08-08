import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//Gets all the boards deleted/trashed by the user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const data = await prisma.board.findMany({
    where: {
      email: session?.user?.email,
      isDeleted: true,
    },
  });
  return NextResponse.json(data);
}
//Restores the board from trash to it's previous location
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {

  const [id] = params.data;
  const data = await prisma.board.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: false,
    },
  });
  return NextResponse.json(data);
}
