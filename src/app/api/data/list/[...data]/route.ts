import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { list } from "@/schema/list";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const [viewId, isDeleted] = params.data;

  const lists = await db.query.list.findMany({
    where: and(
      eq(list.viewId, viewId),
      eq(list.isDeleted, isDeleted === "true"),
      eq(list.createdBy, session.user?.email!),
    ),
    with: {
      bookmarks: true,
    },
  });
  return NextResponse.json(lists);
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
    name: string;
    icon: string;
    viewId: string;
  } = await request.json();
  const lists = await db
    .insert(list)
    .values({
      name: body!.name!,
      viewId: body.viewId,
      icon: body.icon,
    })
    .returning();
  return NextResponse.json(lists[0]);
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
    name: string;
    icon: string;
    id: string;
    isDeleted: boolean;
  } = await request.json();
  const ws = await db
    .update(list)
    .set({ name: body.name, icon: body.icon, isDeleted: body.isDeleted })
    .where(eq(list.id, body.id));
  return NextResponse.json(ws);
}

export async function DELETE(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const body: {
    name: string;
    icon: string;
    id: string;
  } = await request.json();

  const ws = await db.delete(list).where(eq(list.id, body.id));
  return NextResponse.json(ws);
}
