import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
//Handles DND operation to change the bookmark from one list to another
export async function GET(req: Request, { params }: { params: { data: string[] } }) {
  //gets source list id and destination list id and the bookmark id by params
  const [sourceId, destinationId, bmId] = params.data;
  const bookmarks = await prisma.bookmark.updateMany({
    where: {
      listId: sourceId,
      id: bmId,
    },
    data: {
      listId: destinationId,
    },
  });
  return NextResponse.json(bookmarks);
}
