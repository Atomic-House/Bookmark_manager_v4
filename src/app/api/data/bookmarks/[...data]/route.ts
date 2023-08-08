import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ogs from "open-graph-scraper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//Gets all the bookmarks which matches the given lists id and is not deleted
export async function GET(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const [id] = params.data;
  const bookmarks = await prisma.list.findFirst({
    where: {
      id: id,
      isDeleted: false,
      bookmarks: {
        every: {
          listId: id,
          isDeleted: false,
        },
      },
    },
    include: {
      bookmarks: {
        where: {
          isDeleted: false,
        },
      },
    },
  });
  return NextResponse.json(bookmarks);
}
//Creates a POST request to create a new board by adding the related lists id into the board along with user email and name
//Uses open graph scraper to automatically fetch metadata of the url and save it to the database
export async function POST(
  req: NextRequest,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  const body: { name: string | null; url: string } = await req.json();
  const url = new URL(body.url);
  const [id] = params.data;
  const { error, result } = await ogs({ url: body.url });
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
              favicon: `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=256`,
              title: result.ogTitle,
              description: result.ogDescription,
              email: session?.user?.email,
              preview: result?.ogImage?.at(0)?.url,
            },
          ],
        },
      },
    },
  });
  return NextResponse.json(bookmark);
}
//Updates a bookmark name, url, favicon
export async function PATCH(
  req: Request,
  { params }: { params: { data: string[] } },
) {
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
//Sends a bookmark to trash which can be restored
export async function PUT(
  req: Request,
  { params }: { params: { data: any[] } },
) {
  const [id] = params.data;
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
