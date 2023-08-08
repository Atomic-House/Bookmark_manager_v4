import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
//Handles post request to change the color of each list selected by the user
export async function POST(request: Request, { params }: { params: { data: string[] } }) {
  const [id, color] = params.data;
  const list = await prisma.list.update({
    where: {
      id: id,
    },
    data: {
      color: color,
    },
  });
  return NextResponse.json(list);
}
