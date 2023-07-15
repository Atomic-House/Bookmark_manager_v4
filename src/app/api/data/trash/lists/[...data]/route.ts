import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const data = await prisma.list.findMany({
    where: {
      email: session?.user?.email,
      isDeleted: true,
    },
  });
  return NextResponse.json(data);
}
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const data = await prisma.list.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: false,
    },
  });
  return NextResponse.json(data);
}
