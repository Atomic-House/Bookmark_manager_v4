import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { board } from "@/schema/board";
import { db } from "@/server/db";
import { and, arrayContains, eq, or } from "drizzle-orm";
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
      or(
        and(
          eq(board.workspaceId, workspaceId),
          eq(board.isDeleted, isDeleted != "false"),
        ),
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

export async function PUT(
  request: Request,
  { params }: { params: { data: string[] } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const body: {
    id: string;
    isDeleting: boolean;
  } = await request.json();

  const ws = await db
    .update(board)
    .set({
      isDeleted: body.isDeleting,
    })
    .where(eq(board.isDeleted, body.isDeleting))
    .returning();
  return NextResponse.json(ws);
}
