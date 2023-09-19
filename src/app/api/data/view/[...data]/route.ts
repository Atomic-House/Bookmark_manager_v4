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
  const body: { boardId: string; isDeleted: boolean } = await request.json();
  const lists = await db
    .select()
    .from(list)
    .where(
      and(eq(list.boardId, body.boardId), eq(list.isDeleted, body.isDeleted)),
    );
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
    boardId: string;
  } = await request.json();
  const ws = await db
    .insert(list)
    .values({
      name: body!.name!,
      boardId: body.boardId,
      icon: body.icon,
    })
    .returning({ id: list.id });
  return NextResponse.json(ws[0].id);
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
