import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { bookmark } from "@/schema/bookmarks";
export async function GET(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const bookmarks = await db.query.bookmark.findMany({
    where: and(
      eq(bookmark.isDeleted, true),
      eq(bookmark.createdBy, session.user?.email!),
    ),
  });
  return NextResponse.json(bookmarks);
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
    id: string;
    isDeleting: boolean;
  } = await request.json();
  const bookmarks = await db
    .update(bookmark)
    .set({ isDeleted: body.isDeleting })
    .where(eq(bookmark.id, body.id))
    .returning();
  return NextResponse.json(bookmarks[0]);
}
