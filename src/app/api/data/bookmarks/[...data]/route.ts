import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fetch from "node-fetch";
export async function GET(req: NextRequest, { params }: { params: { data: string[] } }) {
  const [id] = params.data;
  const bookmarks = await prisma.list.findFirst({
    where: {
      id: id,
    },
    include: {
      bookmarks: true,
    },
  });
  return NextResponse.json(bookmarks);
}
export async function POST(req: NextRequest, { params }: { params: { data: string[] } }) {
  const body: { name: string | null; url: string } = await req.json();
  const [id] = params.data;
  await fetch("https://api.peekalink.io", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_PEEKALINK_KEY!,
    },
  });
  const bookmark = await prisma.list.update({
    where: {
      id: id,
    },
    data: {
      bookmarks: {
        createMany: {
          data: [
            {
              name: body.name,
              url: body.url,
            },
          ],
        },
      },
    },
  });
  return NextResponse.json(bookmark);
}
export async function PATCH(req: Request, { params }: { params: { data: string[] } }) {
  const [id] = params.data;
  const body = await req.json();
  const bookmark = await prisma.bookmark.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
      url: body.url,
      favicon:body.favicon
    },
  });
  return NextResponse.json(bookmark);
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
