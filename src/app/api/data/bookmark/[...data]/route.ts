import { bookmark } from "@/schema/bookmarks";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { getMetaData } from "@/functions/ogscraper";
export async function GET(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const [listId, isDeleted] = params.data;
  const bookmarks = await db.query.bookmark.findMany({
    where: and(
      eq(bookmark.listId, listId),
      eq(bookmark.isDeleted, isDeleted === "true"),
    ),
  });

  return NextResponse.json(bookmarks);
}
export async function POST(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const body: {
    listId: string;
    name?: string;
    url: string;
    isSnoozed: boolean;
    snoozeTime: Date;
  } = await request.json();
  const data = await getMetaData(body.url);
  const bm = await db.insert(bookmark).values({
    listId: body.listId,
    name: body?.name!,
    url: body.url,
    snoozeEnabled: body.isSnoozed,
    snoozeTime: body.snoozeTime,
    isDeleted: false,
    favicon: data.favicon,
    preview: data.preview,
    title: data.title,
    description: data.desciption,
  });
  return NextResponse.json(bm);
}
export async function PATCH(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const body: {
    bookmarkId: string;
    isDeleted: boolean;
    name: string;
    url: string;
    isSnoozed: boolean;
    snoozeTime: Date;
  } = await request.json();
  const bm = await db
    .update(bookmark)
    .set({
      name: body.name,
      url: body.url,
      snoozeEnabled: body.isSnoozed,
      snoozeTime: body.snoozeTime,
    })
    .where(eq(bookmark.id, body.bookmarkId));
  return NextResponse.json(bm);
}
export async function PUT(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const body: {
    bookmarkId: string;
    isDeleted: boolean;
    name: string;
    url: string;
    isSnoozed: boolean;
    snoozeTime: Date;
  } = await request.json();
  const bm = await db
    .update(bookmark)
    .set({ isDeleted: body.isDeleted })
    .where(eq(bookmark.id, body.bookmarkId));
  return NextResponse.json(bm);
}
export async function DELETE(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const body: {
    bookmarkId: string;
  } = await request.json();
  const bm = await db.delete(bookmark).where(eq(bookmark.id, body.bookmarkId));

  return NextResponse.json(bm);
}
