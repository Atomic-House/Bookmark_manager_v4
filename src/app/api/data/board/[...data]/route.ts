import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { board } from "@/schema/board";
import { workspace } from "@/schema/workspace";
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
  const [workspaceId, isDeleted] = params.data;
  const boards = await db
    .select()
    .from(board)
    .where(
      and(
        eq(board.workspaceId, workspaceId.toString()),
        eq(board.isDeleted, isDeleted != "false"),
      ),
    );
  return NextResponse.json(boards);
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
    workspaceId: string;
  } = await request.json();
  const bd = await db
    .insert(board)
    .values({
      name: body!.name!,
      workspaceId: body.workspaceId,
      icon: body.icon,
      createdBy: session.user?.email!,
    })
    .returning();
  return NextResponse.json(bd[0]);
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
    .update(board)
    .set({
      name: body.name,
      icon: body.icon,
      isDeleted: body.isDeleted,
    })
    .where(eq(board.id, body.id));
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

  const ws = await db.delete(board).where(eq(board.id, body.id));
  return NextResponse.json(ws);
}