import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { data: string[] } }) {
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
