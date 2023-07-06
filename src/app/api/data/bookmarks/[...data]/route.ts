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
  const url = new URL(body.url);
  const [id] = params.data;
  const data = await fetch("https://api.peekalink.io", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_PEEKALINK_KEY!,
    },
    body: JSON.stringify({
      link: url,
    }),
  });
  const metadata: any = await data.json();

  const d = JSON.stringify(metadata);
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
              favicon: `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=40`,
              title: metadata.title,
              description: metadata.description,
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
      favicon: body.favicon,
    },
  });
  return NextResponse.json(bookmark);
}
//to change it to deleted or not
export async function DELETE(req: Request, { params }: { params: { data: any[] } }) {
  const [id, deleted] = params.data;
  const bookmarks = await prisma.bookmark.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: true,
    },
  });
  return NextResponse.json(bookmarks);
}
